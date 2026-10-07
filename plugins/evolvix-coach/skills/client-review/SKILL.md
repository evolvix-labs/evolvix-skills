---
name: client-review
description: >
  Answers how one Evolvix client is doing: food logged against the targets per day type, training
  done against the plan, weight and measurement trends, habits and check-ins, with at most three
  suggestions and an optional message draft. Use whenever an Evolvix coach asks how a client is
  doing, wants to prepare for a call, asks for a progress or end-of-block report, or asks whether a
  client is eating enough, training enough or losing weight, even for a quick "how's Ada?". Dutch:
  "hoe gaat het met Ada", "voortgangsrapport", "eet ze genoeg".
---

# Client review

One client, on demand: before a call, at the end of a training block, when something feels off, or before a renewal. The skill starts from one overview call and opens only the areas the question or the overview points to, then reports what changed, what is working and what to try next.

## Ground rules

- **Find the client, never guess.** Resolve a name with `list_clients`. When more than one client matches, ask which. Tools take the client's relationship id as `clientId`.
- **Read before you write.** Load the current state first. When a tool has a preview or a dry run, use it and show the result before the real call.
- **Nothing reaches a client without a yes.** Draft first, show the draft, and send only after the coach approves it. For a batch, show the count and two examples, then ask once.
- **Health red flags stop the playbook.** Pain, injury, illness, pregnancy, a medication change, signs of disordered eating, or weight loss faster than the plan allows: do not change training or nutrition and draft nothing to the client. Tell the coach what you saw, and offer a private note with `add_client_note` and a task with `create_task`.
- **A missing tool is a missing permission.** If a tool this skill needs is not available, tell the coach which permission to tick when they reconnect Evolvix (listed under Before you start) and stop. Never work around it with another tool.
- **Write like the coach, in the client's language.** Before drafting, read the coach's last few messages to that client with `get_messages` and match their length, warmth and sign-off. Write in the language the client uses with the coach; with no messages yet, use the coach's language from `get_me`. No emoji unless the coach uses them.

## Before you start

- Agree the window. "How is she doing" means the last 7 days; a block report means the block's dates (ask, or take the program's dates from `list_program_assignments`); a renewal report usually means since the start.
- The review only reads. Sending the optional message needs "Send messages to clients for you." (starts unticked). Notes and tasks need "Add and update clients, their notes, tags, and invitations." and "Create, change, and delete tasks."

## Steps

1. **The client.** `get_client` gives the practice (lifestyle or physique), coaches, profile, the current week and the effective modules. Skip any area whose module is off.
2. **The overview.** `get_client_overview` with `from` and `to` for the window. It holds today, the nutrition and training week, metrics, habits, activity, what is next and the latest message. For "quick how's Ada", this call plus `list_client_notes` is often enough.
3. **Open only what the question or the overview points to.**
   - **Food.** `get_nutrition_summary` with `days` for the window (up to 92). Per day it gives the day type, the target the client saw, and what was logged, or null when nothing was logged. Then open at most three days that stand out with `get_food_log`: meals, entries, quick adds against real foods, skipped meals, the client's note. `get_day_calendar` shows overrides when a day type looks odd.
   - **Training.** `get_training_stats` with `range` 7d or 30d, or custom dates: planned, done, skipped, adherence, volume against the period before, sets per muscle, records. `list_program_assignments` names the program and how far along it is. For notable sessions, `list_sessions` (difficulty, notes) and `get_session`. New records: `list_personal_records` with `since`. A main lift over the block: `get_exercise_history` with `from`.
   - **Body.** `list_client_metrics` gives what the client tracks and any open goal. `get_metric_trend` per metric with `from` and `to`: compare the average of the last 7 days with the 7 days before, and the first week of the window with the last. `get_metric_week` shows all measurements for one week.
   - **Habits.** `get_habit_summary` for the week; for a block, call it for the first and the last week.
   - **Activity.** `get_activity_summary` with `period` week or month, when the client shares a wearable.
   - **Check-ins.** `list_client_checkins` in the window, then `compare_checkins` with the first and the latest.
4. **Red-flag screen** across notes, check-ins, food logs and the latest message. On a hit, the report leads with it and the skill drafts nothing to the client.
5. **Write the report** (format below).
6. **Optional message.** Offer one short message to the client in the coach's voice. Send with `send_message` only after a yes. Offer a task (`create_task`) for follow-ups the coach promises and a note (`add_client_note`) for facts worth keeping.

Changing targets belongs to the nutrition-by-training-day skill. Changing the program belongs to the program-builder skill. Hand over instead of changing anything here.

## Judgment

- **Consistency before accuracy.** First say how many days were logged, trained and weighed in. If most days were not logged, the finding is the logging, not the numbers.
- **Unlogged is not zero.** A day with nothing logged is "not logged". Average only the logged days, and say how many there were.
- **Past days are judged against the target the client saw then**, which `get_nutrition_summary` already returns. Do not judge last week by today's targets.
- **Per day type, not per week.** Report food against target separately for training, rest and any named day types (legs, high, low). Protein should be steady across them; carbohydrate moves with training.
- **A week is a sample, four weeks a trend.** Say which one you are looking at.
- **Weight on 7-day averages.** Single weigh-ins swing with water and salt.
- **Physique clients are judged by phase.** Off-season gains slowly, a cut loses about 0.5 to 1 percent a week, maintenance stays flat, and peak week is the coach's protocol only. Read the scale together with measurements, strength on the main lifts and photo dates. Strength dropping two weeks in a row in a cut means recovery is slipping.
- **Training.** Two weeks of the same weekday missed points to a scheduling problem, not motivation: suggest moving that session. Adherence below about 70 percent calls for a simpler plan.
- **Suggestions.** At most three, each with its reason, each small enough to do this week. A goal the client is far from gets a next step, not a verdict.
- **Photos** reach Claude as links only. Mention which dates have photos; never describe a body.

## What to show

```text
Ada Jansen, lifestyle, week 9 (30 Sep to 6 Oct)

In short: logging well, protein low on rest days, weight on pace.

Food (6 of 7 days logged)
| Day type | Days | Avg kcal | Target | Protein avg | Target |
| Training | 3 | 2,050 | 2,100 | 128 g | 130 g |
| Rest | 3 | 1,720 | 1,800 | 96 g | 130 g |
Pattern: protein drops at breakfast on rest days.

Training: 3 of 4 sessions, Saturday skipped twice in a row. New record: squat 85 kg x 5.
Body: 7-day average 71.8 kg, down 0.4 kg on the week before (on pace for 68 kg by December).
Habits: water 7/7, steps 4/7.

Next
1. Add a protein breakfast on rest days (she logs yoghurt already; double it).
2. Move the Saturday session to Sunday.
3. Keep targets as they are; the trend is on pace.

Want me to draft a short message to Ada?
```

## When something is missing

- No logs, sessions or weigh-ins in the window: say so plainly and suggest the coach asks why, rather than judging the plan.
- A module is off for the client: leave that area out and say it is off.
- A read fails: report it, carry on with the other areas, and do not guess the missing part.
