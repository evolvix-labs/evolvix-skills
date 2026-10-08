---
name: automation-designer
description: >
  Builds an Evolvix automation from a sentence ("when a client misses two check-ins, message them
  and give me a task"), tests it against a real client, and publishes it only after the coach
  approves every message; also puts clients on a sequence and switches automations off. Use
  whenever an Evolvix coach wants to automate a message, reminder, task or follow-up, set up a
  welcome or check-in journey, put clients on a sequence, or stop an automation, even if they never
  say automation. Dutch: "automatisch een bericht sturen", "automatisering maken", "zet Ada op de
  reeks".
---

# Automation designer

Automations send messages in the coach's name to real clients, so this skill treats a published rule like a message to everyone it will ever catch. It builds the rule as a draft, checks it, shows exactly when each step would run for a real client and what that client would read, and publishes only after the coach says yes.

## Ground rules

- **Find the client, never guess.** Resolve a name with `list_clients`. When more than one client matches, ask which. Tools take the client's relationship id as `clientId`.
- **Read before you write.** Load the current state first. When a tool has a preview or a dry run, use it and show the result before the real call.
- **Nothing reaches a client without a yes.** Draft first, show the draft, and send only after the coach approves it. For a batch, show the count and two examples, then ask once.
- **Health red flags stop the playbook.** Pain, injury, illness, pregnancy, a medication change, signs of disordered eating, or weight loss faster than the plan allows: do not change training or nutrition and draft nothing to the client. Tell the coach what you saw, and offer a private note with `add_client_note` and a task with `create_task`.
- **A missing tool is a missing permission.** If a tool this skill needs is not available, tell the coach which permission to tick when they reconnect Evolvix (listed under Before you start) and stop. Never work around it with another tool.
- **Write like the coach, in the client's language.** Before drafting, read the coach's last few messages to that client with `get_messages` and match their length, warmth and sign-off. Write in the language the client uses with the coach; with no messages yet, use the coach's language from `get_me`. No emoji unless the coach uses them.

## Before you start

- Creating, changing and publishing automations needs "Create and change automations and onboarding." on the Evolvix consent screen. It starts unticked.
- Only an owner or an admin may change automations, unless the company lets coaches do it. If the server says so, tell the coach and stop.
- Reading the rule structure: [references/rules.md](references/rules.md). Read it before building a rule.

## Steps

1. **Say the rule back** in one plain sentence: what starts it, who it covers, what happens and when. Ask one question only if a piece is missing.
2. **Learn the exact names.** `list_automation_triggers` and `list_automation_actions` give every trigger, its filter, every action and its parameters. Never guess a name. For a journey over weeks, `list_automation_templates` gives the ready-made sequences (3, 6 and 9 months) to start from.
3. **Check what exists.** `list_automations` with `kind` event_rule for rules or sequence for journeys (without `kind` it also lists internal rules). If a similar rule is live, offer to change it (`get_automation`) instead of adding a second one.
4. **Collect the ids the rule needs**: tags (`list_client_tags`), check-in forms (`list_forms`), habit templates (`list_habit_templates`).
5. **Build the draft.** `create_automation_rule` with the `kind`, a `name`, the `trigger` with its filter, the `anchor` (trigger_time for event rules, relationship_start for sequences) and the steps. It saves a draft and sends nothing. Write message steps in the coach's voice, using only the tokens {first_name}, {last_name}, {coach_first_name} and {company_name}. Repeating triggers (a missed check-in, no logs for days) re-enroll a client after the previous run finished; one-time triggers (a new client, an accepted invite) catch each client once.
6. **Check it.** `test_automation_rule` with the rule's id returns errors and the plain summary of what it does. Fix errors with `update_automation_rule`: read the rule with `get_automation` and send the whole rule back with its `baseRevision`; anything left out resets.
7. **Test on a real client.** `test_automation_rule` again with a client's `relationshipId`: it shows when each step would run in that client's time zone (the preview covers the next 14 days). Fill in the tokens yourself to show the exact text that client would get. Message, email and notification steps wait for the company's quiet hours; tasks do not.
8. **Who it would catch.** For a missed check-in rule, `list_missed_checkins` shows how many clients have that many misses in a row right now. For other triggers, say it cannot be previewed.
9. **Ask for the yes.** Show the name, the trigger in words, every step with its exact text and timing, who it covers (every current and future client unless filtered), and how to switch it off. Wait for an explicit yes.
10. **Publish** with `publish_automation_rule`. For a rule that already has clients on it, ask whether the change should reach them: mode future rebuilds their scheduled runs, the default new_only leaves them on the version they have.
11. **Sequences: put clients on it.** For each client, `apply_sequence` with the rule's id and the client's `relationshipId`. It is a dry run unless `dryRun` is false: show the run count and first dates, ask once for the group, then call again with `dryRun` false. For a client who started before today, the default skips steps already in the past; `startFrom` day0 starts the journey now instead. Leave `conflict` at skip unless the coach says restart.
12. **Close** with what exists now: the name, the status, and who is on it (`list_enrollments`).

**Switching off.** `archive_automation_rule` stops the rule and every enrollment; there is no undo, so show the count from `list_enrollments` and get a yes that names the rule. For one client only, find the enrollment with `list_client_enrollments` and use `stop_enrollment` after a yes.

## Judgment

- Automated messages go out in the coach's name and clients cannot tell they are automated. Keep them rare, warm, short and specific. One client-facing message per trigger.
- When unsure whether a message helps, make the step a task for the coach instead. A person deciding beats an automatic message.
- Anything about weight, body, food intake, injury, illness, pregnancy, medication or eating is never automated: make it a task for the coach and draft nothing to the client.
- A scheduled rule (schedule.cron) messages every active client at once. Show the count with `list_clients` and ask twice.
- Steps that change what clients see or can use (tags, check-in forms, habits, module access, shared content) need the number of people affected in the summary.
- Create is safe; publish and apply are not. Never create and publish in the same turn.

## What to show

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

## When something is missing

- The server refuses the change because of the caller's role: only an owner or admin may change automations here. Say so and stop.
- `test_automation_rule` returns errors you cannot fix from the coach's sentence: show them and ask.
- A trigger needs data the company does not use yet (packages and payments, for example): say the trigger will not fire until that is in use.
