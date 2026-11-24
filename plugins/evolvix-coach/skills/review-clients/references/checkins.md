# Check-in batch

Reviewing check-ins is the biggest weekly job for an online coach. Read every check-in waiting for review, put each next to the client's history, and write one short feedback draft per client. Drafts are saved in Evolvix; the coach opens each check-in in the app, adjusts it and presses Send.

## Read the inbox

```ts
const inbox = await evolvix.listCheckinInbox({});
const rows = inbox.items.slice(0, 10);
const reviews = await Promise.all(rows.map(async (row) => {
  const clientId = row.relationshipId;
  const [brief, checkin] = await Promise.all([
    evolvix.getCheckinBrief({ clientId, cid: row.checkinId }),
    evolvix.getCheckin({ clientId, cid: row.checkinId }),
  ]);
  const label = new Map(checkin.questions.map((q) => [q.key, q.label]));
  return {
    clientId, cid: row.checkinId, name: `${row.client.firstName} ${row.client.lastName}`, form: row.form,
    date: row.checkinDate, late: row.late, flags: row.flags,
    brief: { header: brief.header, weights: brief.weights, changes: brief.changes, energy: brief.energy, thisWeek: brief.thisWeek, questions: brief.questions, flags: brief.flags, followUps: brief.followUps },
    answers: checkin.answers.map((a) => ({ q: label.get(a.key) ?? a.key, text: a.text, number: a.number, scale: a.scale, yes: a.yes, photos: a.photos.length })),
    previousId: checkin.previous?.id,
    existingDraft: checkin.feedback.find((f) => f.status === "draft")?.body,
    coachVoice: checkin.feedback.filter((f) => f.mine && f.sentAt).map((f) => f.body).slice(-2),
  };
}));
return { waiting: inbox.items.length, more: !!inbox.nextCursor, reviews };
```

Tools: `list_checkin_inbox` (follow `cursor`), then per check-in `get_checkin_brief` and `get_checkin`.

For one named client, use `listClientCheckins` with `status` submitted and `review` pending instead of the inbox. Review about ten per run and offer the rest after. If the answer grows too big, return fewer check-ins per script.

The brief is the map: open more only for what it points to, in a second script: `compareCheckins` with `ids` of the previous and this check-in (up to four), `getCheckinQuestionTrend` for a scale question over a longer run, `getMetricTrend` with `key` bodyweight and both `from` and `to` (without them the window is 90 days), `getMetricWeek` for waist and other measurements, `getTrainingStats` with `range` 7d, `getNutritionSummary` with `days` 7, `getHabitSummary`, `getActivitySummary`, and `listClientNotes`. A section of the brief that is empty means nothing to report there.

If a draft already sits on a check-in, show it and do not add a second. With no earlier feedback of the coach's own, read their recent messages for the voice.

## Draft and save

Red-flag screen first: a hit means no draft for that client, a private note and a task instead, and that client first in the list. Then one reply per client: one real win, one focus for the coming week, one concrete action, using 7-day numbers, short enough for a phone. If the client asked a question in the check-in, the reply answers it first.

After the coach approves, edits or skips each:

```ts
const approved: { clientId: string; cid: string; body: string }[] = [];
for (const d of approved) await evolvix.draftCheckinFeedback({ clientId: d.clientId, cid: d.cid, body: d.body });
const closeWithoutReply: string[] = [];
if (closeWithoutReply.length) await evolvix.markCheckinsReviewed({ checkinIds: closeWithoutReply });
return { drafts: approved.length, closed: closeWithoutReply.length };
```

Tools: `draft_checkin_feedback` per client (with tools, the check-in id as `idempotencyKey`), `mark_checkins_reviewed`.

Then say plainly: "Saved as drafts. Open each check-in in Evolvix and press Send." Leave drafted check-ins pending: Send in the app marks them reviewed. Only check-ins the coach wants closed without a reply go to `markCheckinsReviewed`, after its own yes.

## What to show

```text
Needs you (no draft)
- Cleo Smit: mentions dizziness on Thursday and Friday; 7-day average down 1.4 kg. Private note and task to call her?

Off track
1. Ben de Vries, weekly check-in (2 days waiting)
   Changed: training 2 of 4 sessions, energy 5 to 3 over two check-ins, average weight flat.
   Draft: "Ben, two solid sessions despite a busy week, that counts. This week the only goal is all four sessions, even if short. Book them in your calendar tonight. - Sam"

On track
2. Ada Jansen, weekly check-in
   Changed: average down 0.4 kg (on pace), sleep up to 7 hours, all habits done.
   Draft: "..."
```

## When something is missing

- `draftCheckinFeedback` is missing: show the drafts in chat; saving needs "Fill in and submit check-ins, review them, and send feedback to clients."
- No weigh-ins in the window: say "no weigh-ins this week" and judge on the other answers.
- The inbox is empty: say so, and offer the quiet-client sweep of the coach-today skill.
