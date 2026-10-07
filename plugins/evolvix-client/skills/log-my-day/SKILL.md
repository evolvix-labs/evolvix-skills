---
name: log-my-day
description: >
  Logs a client's day in Evolvix from one message: food (described in words, a planned meal, the
  same as yesterday, or just numbers), a finished workout, measurements such as weight or waist,
  and habits. Shows one line per item and saves after one yes. Use whenever a client of an Evolvix
  coach tells what they ate, trained, weighed or did, such as "two eggs and toast", "squat 3x5 at
  80", "weight 74.8", "water done", "I ate my planned lunch", or "same breakfast as yesterday".
  Dutch: "ik heb gegeten", "log mijn lunch", "gewicht 74,8", "training gedaan".
---

# Log my day

Logging is the chore that makes clients quit. This skill turns one message into the right logs: food, a workout, measurements and habits. It shows what it will save in one short list, saves after a single yes, and confirms in one line per item.

## Ground rules

- **Know whose plan it is.** Start with `list_my_relationships`. With one coach, use that relationship; with several, ask which coach this is about.
- **Show it, then save it.** Before any write, show exactly what will be saved, with the date and units, and save after the client says yes. Afterwards, confirm in one line per item.
- **Never invent an answer.** Use what the client said and what is already logged. Ask about anything else, and say where a pre-filled number came from.
- **Health goes to the coach.** If the client mentions pain, injury, illness, pregnancy, a medication change, or trouble with eating, do not give medical advice or change their plan. Suggest telling their coach and offer to draft that message.
- **A missing tool is a missing permission.** If a tool this skill needs is not available, say which permission to tick when reconnecting Evolvix and stop.

## Before you start

- `list_my_relationships` gives the relationship id that every tool takes as `clientId`, and which modules (nutrition, training, metrics, habits) are on. Skip a part whose module is off and say so.
- `get_me` gives the client's language, time zone and today's date. "This morning" and "yesterday" are in the client's time zone.
- Permissions on the Evolvix consent screen: food needs "Change client nutrition setups, plans, day types, and food logs.", workouts "Schedule, move, and skip client workouts, assign programs, and log sessions.", measurements "Log and change measurements and their goals.", habits "Assign habits and log them.", and a message to the coach "Send messages to clients for you." (starts unticked).

## Steps

1. **Split the message** into food, training, measurements and habits. Keep the client's own words for each item.
2. **Food.** Follow [references/food.md](references/food.md): read the coach's logging settings once, then for each meal pick the path (a planned meal, the same as another day, foods described in words, or numbers only).
3. **Training.** For each exercise, find its id in what the client has done before with `list_performed_exercises` (`q` with the name); only a new exercise needs `search_exercises`. Build the sets: reps and weight in kilograms (1 lb is 0.4536 kg), and any effort the client gave. If the workout was on the plan, find it in `get_training_calendar` for that date and pass its id as `clientWorkoutId`, so the plan marks it done. The date can be today or up to seven days back.
4. **Measurements.** `list_client_metrics` gives the keys and units the client tracks (bodyweight, waist and so on). Match the client's words to them. A value for a date that already has one replaces it: say so.
5. **Habits.** `get_todays_habits` (or with a `date`) gives each habit's id, whether it is a yes-or-no or an amount habit, today's amount and the streak. "Two more glasses" means today's amount plus two.
6. **Show one list** with one line per item and the date, and ask once: "Save all of this?" Ask at most one question about anything unclear (a portion, which exercise, which meal).
7. **Save**, each write with an `idempotencyKey` so a retry cannot log twice:
   - Food: see the reference.
   - Training: `log_workout` with `performedOn`, the `exercises` and their `sets`, and optional `name`, `durationSeconds`, `difficulty` (1 to 5) and `note`.
   - Measurements: `log_metrics` with `recordedOn` and the `items` (key, value, unit).
   - Habits: `log_habit` per habit with the `date`, and the `amount` for an amount habit (a yes-or-no habit takes no amount).
8. **Confirm** in one line per item. For a workout, mention any new record the answer shows. Show what is left of today's food targets only if the coach shows targets (see the reference).

## Fixing a mistake

- Food: `update_food_log_entry` (a new amount, servings or meal) or `delete_food_log_entry`. A client can change only entries they added, and only within the coach's edit window.
- Workout: `delete_session` (the client's own, within seven days), then log it again.
- Measurement: `delete_metric_entry` with the date and key, or log the right value for the same date.
- Habit: `unlog_habit` for a yes-or-no habit; an amount habit is corrected by logging the right amount, and an amount of 0 removes it.
Ask before deleting, and name what goes.

## Judgment

- Ask about a portion only when it changes the numbers a lot ("a bowl of pasta"); otherwise use the default portion and say so.
- Never invent a food, an amount or a weight. If nothing matches, ask, or log the numbers the client gives.
- Log what happened, not what was planned: a skipped meal is not a planned meal eaten.
- No diet advice and no comments on body or weight. If the client logs very little day after day, mentions bingeing, or mentions pain, suggest telling their coach, offer to draft the message, and leave it there. Send it with `send_message` only after a yes.

## What to show

```text
Save this for today, Tue 8 Oct?
- Breakfast: 2 eggs, 1 slice wholegrain bread, coffee with milk (about 290 kcal)
- Workout: squat 3 x 5 at 80 kg, bench 3 x 8 at 60 kg (planned: Lower A)
- Weight: 74.8 kg (replaces nothing; first weigh-in this week)
- Water: done
```

After saving: one line each, for example "Breakfast saved: 290 kcal, 21 g protein."

## When something is missing

- A module is off: say that part is not used with this coach and skip it.
- The day is outside the coach's edit window, or in the future: say the client cannot change that day and suggest asking the coach.
- A tool is refused for a permission: name the consent line above and stop.
