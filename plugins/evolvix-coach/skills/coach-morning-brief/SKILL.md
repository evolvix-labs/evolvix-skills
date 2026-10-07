---
name: coach-morning-brief
description: >
  Plans an Evolvix coach's day: who needs attention, which check-ins wait for review, who is
  waiting for a reply, which tasks are due, and which clients have gone quiet, ranked into one
  short list with the next action for each. Use whenever an Evolvix coach asks what to do today,
  what needs them, who needs attention, what is overdue, how the week looks, who has gone quiet,
  who missed a check-in or who is dropping off, even if they never say brief. Dutch: "wat moet ik
  vandaag doen", "wie heeft aandacht nodig", "wie is stil geworden".
---

# Coach morning brief

The coach starts the day with one short list: the people who need them, in the order that matters, with the next step for each. On Mondays, or when the coach asks who has gone quiet, the brief adds a sweep of quiet clients with a personal nudge drafted for each.

## Ground rules

- **Find the client, never guess.** Resolve a name with `list_clients`. When more than one client matches, ask which. Tools take the client's relationship id as `clientId`.
- **Read before you write.** Load the current state first. When a tool has a preview or a dry run, use it and show the result before the real call.
- **Nothing reaches a client without a yes.** Draft first, show the draft, and send only after the coach approves it. For a batch, show the count and two examples, then ask once.
- **Health red flags stop the playbook.** Pain, injury, illness, pregnancy, a medication change, signs of disordered eating, or weight loss faster than the plan allows: do not change training or nutrition and draft nothing to the client. Tell the coach what you saw, and offer a private note with `add_client_note` and a task with `create_task`.
- **A missing tool is a missing permission.** If a tool this skill needs is not available, tell the coach which permission to tick when they reconnect Evolvix (listed under Before you start) and stop. Never work around it with another tool.
- **Write like the coach, in the client's language.** Before drafting, read the coach's last few messages to that client with `get_messages` and match their length, warmth and sign-off. Write in the language the client uses with the coach; with no messages yet, use the coach's language from `get_me`. No emoji unless the coach uses them.

## Before you start

Call `get_me` once. It gives the coach's name, role, language and time zone. Write the brief in that language and use the coach's local date.

The brief itself only reads. The follow-ups need these permissions on the Evolvix consent screen:

- Snoozing a reason, notes, and a client's dates: "Add and update clients, their notes, tags, and invitations."
- Tasks: "Create, change, and delete tasks."
- Nudges to quiet clients: "Send messages to clients for you." This one starts unticked.
- Reopening or excusing a check-in: "Fill in and submit check-ins, review them, and send feedback to clients." This one starts unticked.

## Steps

1. `get_coach_today` gives the counts (check-ins to review, tasks due, unread messages), one attention row per client with the reason and how long, the tasks due today, recent conversations, and the clients starting soon or ending soon. Start from it; it is one call instead of twenty.
2. `list_conversations` with `unread` true shows who is waiting for a reply and since when. Today's attention list only flags a message after 24 hours, so this catches the fresh ones.
3. When the counts show check-ins to review, `list_checkin_inbox` gives the oldest waiting ones. Note how many and how old the oldest is.
4. When more tasks are due than Today listed, or the coach asks about overdue work, `list_tasks` with `status` open and `dueTo` today.
5. Confirm the top three to five people before ranking them: `get_client_overview` and `list_client_notes`. A missed weigh-in from a client whose note says they are travelling is not urgent.
6. Write the brief (format under What to show).
7. Offer the follow-ups and wait for a yes on each:
   - Hide a reason for 1, 3 or 7 days with `snooze_attention`. It has no undo, so name what it hides.
   - Tasks: `create_task`, `complete_task`, or `bulk_update_tasks` to reschedule or complete several at once.
   - A client past their end date: extend with `update_client` (a new `plannedEndDate`). Ending or archiving a client is done in the app.
   - Replies hand over to the answer-messages skill. Check-ins hand over to the weekly-checkin-review skill.

## Quiet clients

Run this on Mondays, or when the coach asks who has gone quiet, who missed a check-in, or who is dropping off.

1. Collect the signals: `list_missed_checkins` (check-ins whose window closed unsent in the last 30 days), `find_clients_missing_habits` with `days` 7 and `below` 50, and the inactive and weigh-in rows from step 1.
2. Merge them by client and leave out anyone who should not be chased: whose check-in assignment is paused (`list_checkin_assignments`), whom the coach wrote to in the last three days (`get_messages`), or whose notes mention a holiday, illness or a planned break (`list_client_notes`).
3. Rank: silent everywhere first, then two or more missed check-ins in a row, then one miss with other signs, then habits slipping on their own. One missed check-in from someone who trains and logs every day is fine; leave them off.
4. For the top ten, read the last check-in so the nudge can mention something real: `list_client_checkins`, then `get_checkin`.
5. If the last check-in carries a red flag (illness, injury, very low mood, high stress, a hard life event), draft no nudge. Tell the coach and offer a note and a task.
6. Draft one personal nudge per client: one real detail from their last check-in, one small ask ("send me today's weight"), no guilt and no template feel.
7. Show the list. After the coach approves, send each with `send_message`, one at a time with an `idempotencyKey`. Then do the follow-ups the coach picked:
   - Give a missed check-in a new window with `reopen_checkin_due` and a `closesOn` date. It notifies the client.
   - Excuse a check-in (holiday, illness) with `skip_checkin_due` and a reason. If the server refuses because the window has closed, offer to reopen it instead.
   - A follow-up task with `create_task`, linked to the client.

## Judgment

- Rank by impact on the client, not by tool. A client silent for a week outranks an overdue admin task.
- A pending check-in and an unanswered message are people waiting for the coach. Never offer to snooze those two reasons.
- Keep the brief to about ten lines. Put the rest under Can wait as counts.
- Clients starting this week need a plan and a first check-in. Clients ending within two weeks need a renewal conversation, not a nudge.
- Take counts and reasons from the tools. Do not recount. Paused, invited and onboarding clients never get attention rows, so do not report them as quiet.
- A nudge asks for one small thing. Long messages to quiet clients go unread.

## What to show

```text
Today, Tuesday 8 October

Do first
1. Ada Jansen: check-in waiting 2 days. Review it.
2. Ben de Vries: asked about his rest-day carbs yesterday. Reply.

Contact today
3. Cleo Smit: no weigh-in for 9 days, notes say back from holiday Sunday. Nudge.

Can wait
4 tasks due later this week, 2 check-ins under a day old.

Want me to: draft the replies, open Ada's check-in, or snooze Cleo for 3 days?
```

For the quiet sweep, one line per client: name, the signal, days quiet, then the draft nudge below it.

## When something is missing

- `get_coach_today` is not available: the coach needs "See your company, team, and practices." Say so and stop.
- `send_message` is not available: draft the nudges only and say that sending needs "Send messages to clients for you."
- Nothing needs attention: say so in one line and offer the quiet-client sweep.
- A tool returns an error for one client: report it, skip that client, and carry on with the rest.
