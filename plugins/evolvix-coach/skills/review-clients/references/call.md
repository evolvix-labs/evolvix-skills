# Call prep

A call is where a week of data turns into agreements. Evolvix keeps a record of each call: the brief gathers the agenda, the record holds the notes and agreements, and finishing it saves a private note, turns agreements into tasks and, only when the coach says so, sends the client a short summary. Starting, flagging and a draft summary are for the coach only.

Two modes. `mode` call is a conversation with the client (the default). `mode` review is going through one client's check-in without them; written feedback then belongs to [checkins.md](checkins.md). "Since last time" counts from the last finished record of the same mode.

## Read the brief

```ts
const clientId = "<relationship id>";
const [me, brief, notes, timeline] = await Promise.all([
  evolvix.getMe({}),
  evolvix.getCallBrief({ clientId, mode: "call" }),
  evolvix.listClientNotes({ clientId }),
  evolvix.getClientTimeline({ clientId }),
]);
return {
  coach: { firstName: me.firstName, locale: me.locale },
  brief,
  phase: timeline.current, dates: timeline.events.filter((e) => e.date >= timeline.today).slice(0, 5),
  notes: notes.slice(0, 8).map((n) => `${n.title}: ${n.body.slice(0, 200)}`),
};
```

Tools: `get_me`, `get_call_brief`, `list_client_notes`, `get_client_timeline`.

The brief holds the header (program, week, planned end, phase), what changed since the last call (7-day weight average then and now, measurements, photo dates), the latest check-in with the answers that moved most, adherence of the last days (training, food days logged and on target, habits, cardio against its goal), unanswered messages and open tasks, what the coach flagged, the last call's agreements with their done state, and an open call if there is one. A section that is empty or off is missing: say so, never fill it in. For a daily check-in form, add `getCheckinWeek` for the week's grid.

Write the prep, quoting the brief's numbers. Then three questions and one agreement:

- The questions are for the coach to ask, in the client's language. Each starts from something in the brief and cannot be answered yes or no. What the coach flagged comes first; on a health item, the first question is how the client is.
- One suggested agreement: small, concrete, doable within a week, at most 120 characters, preferably the one still open from last time. It is a suggestion, never a change to targets or the program.

## During the call

When the coach says it begins, run a write script with `evolvix.startCall({ clientId, mode: "call" })` and apply it; the call's id is in the apply result (or the brief's `call.id`). If the brief already shows an open call, use that id. Say nothing was sent and that you keep the notes.

Keep two lists in the conversation: notes (facts, decisions, reasons) and agreements (who does what by when, at most 120 characters each). Confirm each addition in one line. Nothing is saved until the call is finished: say so once.

## Finish

Show the notes, the agreements (each becomes a task for the coach), and the draft summary, and ask once: a finished call cannot be edited here.

```ts
await evolvix.finishCall({
  id: "<call id>",
  notes: "Energy is low because of night shifts; sleep first, then food.",
  agreements: [{ text: "Dennis eats 160 g of protein every day." }, { text: "Dennis logs every meal until Sunday." }],
  createTasks: true,
  summary: { body: "Thanks for the call, Dennis. We agreed: ...", send: false },
});
return "finish collected";
```

Tools: `start_call`, then `finish_call`.

It saves the notes as a private note dated the call, makes a task of each agreement, closes the flagged items the call showed, and keeps the summary as a draft. Say the client has seen nothing. Leave `summary` out when the coach wants none.

Send the summary only after its own yes, with the final text shown: a second `finishCall` with the same `id` and `summary: { body, send: true }`. With tools, use a new `idempotencyKey` for it.

## Flag for next time

Whenever the coach says something should come up next call, offer `flagForCall` and run it after a yes. `text` is the reminder in one line. `sourceType` and `sourceId`: `checkin_answer` with the check-in id, a colon and the question key; `message` with the message id; `metric_entry` with the key, a colon and the date (bodyweight:2026-10-06); `food_day` with the date; `note`, or `other` with no `sourceId`.

## Judgment

- **Prep, not a report.** Lead with what the coach flagged and what moved most; leave the rest as counts. Hand a deeper look to [one-client.md](one-client.md).
- **Follow-through before new asks.** Open agreements from last time make the first question "what got in the way?".
- **Phase from the brief or the timeline,** never from a tag or a note. Ask the coach if both are empty; with a yes, `setClientPhase` records it and `addClientEvent` adds a show or a photoshoot.
- **The summary is the coach's voice.** Short, warm, the agreements as a list, nothing the call did not settle. After a call about pain, injury, illness, pregnancy, medication or eating, draft no summary.
- **Notes come from the coach,** never from what the prep suggested. Plan changes come after the call, with their own previews.

## What to show

```text
Call with Dennis Visser (Upper lower, week 6 of 12, planned end in 72 days). Last call 2 Oct.

In short: weight on pace, energy down, one thing to ask first.

Raise first
- His check-in says "my knee hurts on squats". I suggest no change to training from my side.
  A private note and a task for this?

Since last time
- Weight: 7-day average 81.4 kg, down 0.7 (6 weigh-ins). Waist 84.0 cm, down 1.5. Photos from 5 Oct.
- Check-in 4 Oct: energy 7 to 5, sleep 7.5 to 6.8 hours.

Follow-through (3 to 9 Oct)
- Training 3 of 4. Food logged 5 of 7 days, 3 on target. Habits 86 percent.
- Last agreement: 160 g of protein a day (still open).

Open
- Unanswered since 8 Oct: "Can I swap the Friday workout?"

Questions
1. How is the knee on stairs and in squats, and since when?
2. Energy is down two points: what changed in sleep, work or food?
3. What makes 160 g of protein hard on a normal day?

Suggested agreement: "Log every meal until Sunday and send me the protein total."
Tell me when the call starts and I will keep the notes.
```

## When something is missing

- `finishCall` refused for "Create, change, and delete tasks.": the call stays open. Ask whether to tick it, or finish with `createTasks` false.
- The summary cannot be sent (no send permission, messaging off, client archived): it stays a draft. Show the text so the coach can send it.
- The call is over and none was started: start and finish it in two scripts.
