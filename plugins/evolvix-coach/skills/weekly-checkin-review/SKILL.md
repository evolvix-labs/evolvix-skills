---
name: weekly-checkin-review
description: >
  Reviews the Evolvix check-ins that wait for a coach's review, usually the weekly one: reads the
  week of daily check-ins behind it, compares it with the client's earlier check-ins and 7-day
  weight averages, adds training, food and habit context, screens for health red flags, and saves
  feedback drafts in the coach's voice, with the Loom link the coach recorded when there is one, for
  the coach to send from the app. Use whenever an Evolvix coach asks to review check-ins, go through
  what came in this weekend, see how a client's check-in went, compare a client's last weeks, or
  keep daily check-ins out of their review list, even if they only say "Monday reviews". Dutch:
  "check-ins nakijken", "wat is er binnengekomen", "hoe ging de check-in van Ada", "dagelijkse
  check-in alleen bijhouden".
---

# Weekly check-in review

Reviewing check-ins is the biggest weekly job for an online coach. This skill reads every check-in that waits for review, puts each one next to the client's history, and writes a short feedback draft per client. The drafts are saved in Evolvix; the coach opens each check-in in the app, adjusts if needed, and presses Send.

Many clients fill in a daily check-in and a weekly one. The daily one is usually only logged: it counts in the week and never lands in the coach's list. The weekly one is the check-in moment. It waits for review, and the feedback is written from the week of daily answers behind it.

Feedback written through Claude is always a draft: Evolvix does not let a connected app send it. Never tell the coach a reply was sent.

## Ground rules

- **Find the client, never guess.** Resolve a name with `list_clients`. When more than one client matches, ask which. Tools take the client's relationship id as `clientId`.
- **Read before you write.** Load the current state first. When a tool has a preview or a dry run, use it and show the result before the real call.
- **Nothing reaches a client without a yes.** Draft first, show the draft, and send only after the coach approves it. For a batch, show the count and two examples, then ask once.
- **Health red flags stop the playbook.** Pain, injury, illness, pregnancy, a medication change, signs of disordered eating, or weight loss faster than the plan allows: do not change training or nutrition and draft nothing to the client. Tell the coach what you saw, and offer a private note with `add_client_note` and a task with `create_task`.
- **A missing tool is a missing permission.** If a tool this skill needs is not available, tell the coach which permission to tick when they reconnect Evolvix (listed under Before you start) and stop. Never work around it with another tool.
- **Write like the coach, in the client's language.** Before drafting, read the coach's last few messages to that client with `get_messages` and match their length, warmth and sign-off. Write in the language the client uses with the coach; with no messages yet, use the coach's language from `get_me`. No emoji unless the coach uses them.
- **Never invent a link.** A video link comes from the coach, pasted in this conversation. Without one, the draft is text only.

## Before you start

- `get_me` gives the coach's name and language.
- Saving drafts, marking check-ins reviewed and taking a daily check-in out of the list need "Fill in and submit check-ins, review them, and send feedback to clients." on the Evolvix consent screen. It starts unticked. Without it, show the summaries and drafts in chat only.
- Red-flag notes and tasks need "Add and update clients, their notes, tags, and invitations." and "Create, change, and delete tasks."

## Steps

1. **Find what to review.** `list_checkin_inbox` lists check-ins waiting for review, oldest first; follow `cursor` for more. For one named client, use `list_client_checkins` with `status` submitted and `review` pending. Both leave out check-ins that are only logged, which the daily ones usually are. Note the flags on each row (photos, video, a low score) and whether it came in late. Review at most about ten in one run and offer the rest after.
2. **Read the check-in.** `get_checkin` returns the questions, the answers, comments, earlier feedback and the previous check-in's id. If a feedback draft already sits on it, show that draft, with its video link if it has one, and do not add a second one.
3. **Read the week behind it.** The daily check-ins are only logged, so they are not in the list. Read them before you write: `get_checkin_week` with `clientId`, `start` the check-in's date and, when the client has more than one daily form, `formId` (the answer lists them as `forms`). It shows a calendar week as a grid, a row per question and a cell per day, with the week's average or most common answer against the week before. You want the seven days up to the check-in: when the grid begins on its date, ask again with `start` the day before, and when those days fall in two weeks, read both. An empty day has no check-in. Say "nothing on Thursday", never read it as zero. No daily form, or nothing sent that week: review the weekly check-in on its own.
4. **What changed.** `compare_checkins` with the previous check-in's id and this one (up to four ids; older ids come from `list_client_checkins`). For a scale question such as energy, sleep or hunger over a longer run, `get_checkin_question_trend` with the form id and the question key.
5. **Weight as 7-day averages.** `get_metric_trend` with `key` bodyweight, `from` six days before the check-in date and `to` the check-in date. Compare `average` with `previousAverage` (the seven days before). Always pass both dates: without them the window is 90 days. `get_metric_week` gives waist and other measurements in one call.
6. **Context, only when the answers point to it.** Training: `get_training_stats` with `range` 7d. Food: `get_nutrition_summary` with `days` 7. Habits: `get_habit_summary`. Steps and sleep from a wearable: `get_activity_summary`. Practice (lifestyle or physique), profile and phase: `get_client`, `list_client_tags` (a phase tag such as phase:cut) and `list_client_notes`.
7. **Red-flag screen, before any draft**, over the weekly answers and every day of the week. Pain, injury, illness, dizziness, a medication change, pregnancy, talk of bingeing or restricting, very low mood or very high stress scores, or a 7-day average falling faster than the client's phase allows (by default more than about 1 percent of bodyweight a week; the coach's own rule wins). On a hit: no draft for that client. Write a private note with `add_client_note` and a task with `create_task`, and list the client first in the summary.
8. **Learn the voice.** Read the coach's last two or three sent feedback texts (earlier feedback in `get_checkin`, or check-ins from `list_checkin_inbox` with `review` reviewed) and recent messages to the client with `get_messages`. Match length, warmth, sign-off and language. Feedback that is only a video has no text to learn from; look further back.
9. **Draft one reply per client.** One real win, one focus for the coming week, one concrete action. Use the 7-day numbers, not single weigh-ins, and the days that show the pattern ("sleep under six hours on four nights"), not the whole grid. Keep it short enough to read on a phone.
10. **Video, when the coach records one.** Many coaches answer the weekly check-in with a Loom video. Then give the points to cover instead of a text: the win, the focus and the action, with the numbers from the week. Ask the coach for the link once it is recorded, before you save: Claude cannot change a saved draft. The link can be the whole reply or sit under a line of text.
11. **Show the batch.** One list, red flags first, then clients off track, then on track. For each: two lines on what changed, one on the week, then the draft. The coach edits, approves or skips each.
12. **Save approved drafts.** `draft_checkin_feedback` with the client's id, the check-in id as `cid`, the text as `body`, and the check-in id as `idempotencyKey`. With a link from the coach, add it as `videoUrl` (one https link; a Loom share link plays for the client as a video, any other link shows as a link) and `body` may be empty. A link Evolvix refuses comes back as a `videoUrl` error: show it, ask for the link again, and retry with a new `idempotencyKey`, because the refusal used up the first one. Then say plainly: "Saved as drafts. Open each check-in in Evolvix and press Send." Leave those check-ins pending: Send in the app marks them reviewed.
13. **Close the rest.** Check-ins the coach wants closed without a reply: list them, ask once, then `mark_checkins_reviewed` with their ids.

## Daily check-ins in the list

A daily check-in is in the list when its assignment is set to review, and older assignments all are. You see it by the form on the row; `list_checkin_assignments` confirms it as `frequency` daily with `reviewMode` review. Do not write feedback on each daily one. Review the weekly check-in with its week, then ask once, with the names when several clients have it, in the coach's words: "Ada's daily check-in lands in your list every day. Do you want to review it every time, or only keep track of it? Then it counts in her week and stays out of your list." On "only keep track" and a yes, call `update_checkin_schedule` with the assignment's `id` as `aid` and a `schedule` holding only `reviewMode` log. Check-ins already in the list stay there: close them with `mark_checkins_reviewed` after another yes. If the coach wants to review the daily ones, leave the assignment alone.

## Judgment

- A single weigh-in is noise. Compare 7-day averages. One week in the wrong direction is noise; two in a row is a trend.
- Judge weight against the client's goal and phase, not against "lower is better". A lifestyle client maintaining is doing well. For physique clients read [references/physique.md](references/physique.md): the phase decides what a good week looks like, and the scale never decides alone.
- Adherence below about 70 percent on training or food usually calls for a simpler plan, not stricter targets. Say that in the focus.
- Falling sleep, energy or mood across two or more check-ins matters more than any single number. Name it gently.
- The daily answers show what the week was like; the weekly check-in shows how the client sees it. When they disagree (energy 8 on Sunday after four tired days), name it gently and ask.
- Praise consistency before accuracy. A client who logged every day at 10 percent off target is doing better than one who logged twice.
- Feedback answers what the client wrote. If they asked a question in the check-in, the reply answers it first.
- Photos reach Claude as links only. Say photos exist and from which dates; never describe a body.
- Health answers are sensitive. Summarise them for the coach in a few words; do not quote them at length or paste them elsewhere.

## What to show

```text
Needs you (no draft)
- Cleo Smit: mentions dizziness on Thursday and Friday; 7-day average down 1.4 kg. Private note and task to call her? 

Off track
1. Ben de Vries, weekly check-in (2 days waiting)
   Changed: training 2 of 4 sessions, energy 5 to 3 over two check-ins, average weight flat.
   Week: 5 of 7 daily check-ins, sleep under 6 hours on 4 nights, nothing on Friday and Saturday.
   Draft: "Ben, two solid sessions despite a busy week, that counts. This week the only goal is all four sessions, even if short. Book them in your calendar tonight. - Sam"

On track
2. Ada Jansen, weekly check-in
   Changed: average down 0.4 kg (on pace), sleep up to 7 hours, all habits done.
   Week: 7 of 7 daily check-ins, stress low, no sleep under 7 hours.
   Video points: the 0.4 kg, the seven good nights, the new squat record. Paste the Loom link once you have recorded it.
```

## When something is missing

- `draft_checkin_feedback` is not available: show the drafts in chat and say saving them needs "Fill in and submit check-ins, review them, and send feedback to clients."
- No bodyweight entries in the window: say "no weigh-ins this week" and judge on the other answers. Do not treat missing data as zero.
- No daily check-ins that week: say so and review the weekly one on its own. Do not ask the client for more.
- The coach has no link yet: the draft is text only, or wait for the link. Never make one up.
- The inbox is empty: say so, and offer to look at missed check-ins with the coach-morning-brief skill.
- An error for one check-in: report it and continue with the rest.
