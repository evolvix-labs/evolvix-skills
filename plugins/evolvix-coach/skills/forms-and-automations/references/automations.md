# Automations

Automations send messages in the coach's name to real clients, so a published rule is a message to everyone it will ever catch. Build it as a draft, check it, show exactly when each step would run for a real client and what that client would read, and publish only after a yes. Read [rules.md](rules.md) before building.

## 1. Say it back and look around

Say the rule back in one plain sentence: what starts it, who it covers, what happens and when. Ask one question only if a piece is missing.

```ts
const [triggers, actions, templates, existing, tags, forms, habits] = await Promise.all([
  evolvix.listAutomationTriggers({}),
  evolvix.listAutomationActions({}),
  evolvix.listAutomationTemplates({}),
  evolvix.listAutomations({ kind: "event_rule" }),
  evolvix.listClientTags({}),
  evolvix.listForms({ kind: "checkin" }),
  evolvix.listHabitTemplates({}),
]);
return {
  triggers: triggers.triggers, actions: actions.actions, templates,
  existing: existing.items.map((r) => ({ id: r.id, name: r.name, status: r.status, trigger: r.trigger, summary: r.summary })),
  tags, forms: forms.map((f) => ({ id: f.id, name: f.name })), habits,
};
```

Tools: `list_automation_triggers`, `list_automation_actions`, `list_automation_templates`, `list_automations` (kind event_rule or sequence), `list_client_tags`, `list_forms`, `list_habit_templates`.

Never guess a trigger, action or parameter name. A similar live rule: offer to change it (`getAutomation`) instead of adding a second. For a journey over weeks, start from a template (3, 6 and 9 months).

## 2. Create the draft

```ts
await evolvix.createAutomationRule({
  kind: "event_rule", name: "Missed two check-ins in a row", anchor: "trigger_time",
  trigger: { type: "checkin.missed", filter: { consecutive: 2 } },
  steps: [
    { offset: { days: 0 }, action: { type: "send_chat_message", params: { body: "Hi {first_name}, I missed your check-in this week and last. Everything OK? Send me a quick update when you can. - {coach_first_name}" } } },
    { offset: { days: 0 }, action: { type: "create_task", params: { title: "Call {first_name}", dueInDays: 1 } } },
  ],
});
return "draft collected";
```

Tools: `create_automation_rule`.

Creating saves a draft and sends nothing, so it may be applied once the coach agrees with the sentence. Message steps use only the tokens {first_name}, {last_name}, {coach_first_name} and {company_name}. Repeating triggers (a missed check-in, no logs for days) re-enroll a client after the previous run finished; one-time triggers (a new client, an accepted invite) catch each client once.

## 3. Test on a real client

```ts
const id = "<rule id>";
const [check, onClient, missed] = await Promise.all([
  evolvix.testAutomationRule({ id }),
  evolvix.testAutomationRule({ id, relationshipId: "<relationship id>" }),
  evolvix.listMissedCheckins({}),
]);
const streaks = new Map<string, number>();
for (const m of missed.items) streaks.set(m.relationshipId, (streaks.get(m.relationshipId) ?? 0) + 1);
return {
  ok: check.ok, errors: check.errors, summary: check.summary,
  runs: onClient.preview.map((r) => ({ at: r.dueAt, action: r.action, text: r.text ?? r.summary })),
  wouldCatchNow: [...streaks.values()].filter((n) => n >= 2).length,
};
```

Tools: `test_automation_rule` (without and with `relationshipId`), `list_missed_checkins`.

Fix errors with `updateAutomationRule`: send the whole rule from `getAutomation` back with its `baseRevision`; anything left out resets. The client preview covers the next 14 days in that client's time zone; fill in the tokens yourself to show the exact text. Message, email and notification steps wait for quiet hours; tasks do not. `listMissedCheckins` counts who a missed check-in rule would catch now; other triggers cannot be previewed: say so.

## 4. Publish

Show the name, the trigger in words, every step with its exact text and timing, who it covers (every current and future client unless filtered), and how to switch it off. After an explicit yes, `publishAutomationRule`. For a rule that already has clients, ask whether the change should reach them: `mode` future rebuilds their scheduled runs, the default new_only leaves them on their version.

**Journeys:** put clients on a sequence with `applySequence` per client (`id`, `relationshipId`). It is a dry run in a script: show the run count and first dates, ask once for the group, then apply. A client who started before today skips past steps by default; `startFrom` day0 starts the journey now. Leave `conflict` at skip unless the coach says restart. Close with `listEnrollments`.

**Switching off:** `archiveAutomationRule` stops the rule and every enrollment, with no undo: show the count from `listEnrollments` and get a yes that names the rule. For one client, find the enrollment with `listClientEnrollments` and use `stopEnrollment`.

## Judgment

- Clients cannot tell a message is automated. Keep automated messages rare, warm, short and specific: one client-facing message per trigger.
- When unsure whether a message helps, make the step a task for the coach. A person deciding beats an automatic message.
- A scheduled rule (schedule.cron) messages every active client at once: show the count from `listClients` and ask twice.
- Steps that change what clients see or can use (tags, forms, habits, module access, shared content) carry the number of people affected.
- A trigger needing data the company does not use yet (packages, payments) will not fire: say so.

```text
Missed two check-ins in a row (event rule, all current and future clients)
When: a client misses 2 check-ins in a row
1. Right away (after quiet hours): chat message from their coach
   "Hi Ada, I missed your check-in this week and last. Everything OK? Send me a quick update when you can. - Sam"
2. Right away: task for their coach, "Call Ada", due tomorrow
Right now this would catch 2 clients (Ada Jansen, Ben de Vries).
Switch off any time with "turn off the missed check-in automation".
Publish it?
```
