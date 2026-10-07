---
name: my-plan-today
description: >
  Tells a client of an Evolvix coach what today's plan is (meals, training, habits, a check-in that
  is due) and handles small changes the coach allows: swapping a meal option, moving or skipping a
  workout, and the grocery list for the coming days. Use whenever an Evolvix client asks what their
  plan is, what to eat, what their workout is, wants to swap dinner, move or skip a workout, needs a
  shopping list, or asks about a personal record. Dutch: "wat is mijn plan vandaag", "wat eet ik
  vanavond", "verplaats mijn training", "boodschappenlijst".
---

# My plan today

A client opens the conversation with "what's on today?" and gets one short answer: the day type, the meals, the workout, the habits, and a check-in if one is due. Small changes the coach allows (another meal option, moving or skipping a workout) are done with a preview first, because changing a training day can change the day's food targets too.

## Ground rules

- **Know whose plan it is.** Start with `list_my_relationships`. With one coach, use that relationship; with several, ask which coach this is about.
- **Show it, then save it.** Before any write, show exactly what will be saved, with the date and units, and save after the client says yes. Afterwards, confirm in one line per item.
- **Never invent an answer.** Use what the client said and what is already logged. Ask about anything else, and say where a pre-filled number came from.
- **Health goes to the coach.** If the client mentions pain, injury, illness, pregnancy, a medication change, or trouble with eating, do not give medical advice or change their plan. Suggest telling their coach and offer to draft that message.
- **A missing tool is a missing permission.** If a tool this skill needs is not available, say which permission to tick when reconnecting Evolvix and stop.

## Before you start

- `list_my_relationships` gives the relationship id (`clientId`) and which modules are on. `get_me` gives the language, time zone and today's date.
- `get_nutrition_settings` once: `showTargets` false means never mention targets or calories; `canSwapOptions` says whether meals may be swapped; `groceryEnabled` says whether the grocery list is on.
- Changes need "Change client nutrition setups, plans, day types, and food logs." (meals) or "Schedule, move, and skip client workouts, assign programs, and log sessions." (workouts). A message to the coach needs "Send messages to clients for you." (starts unticked).

## Steps

1. **Today.** Read what the question needs:
   - Food: `get_nutrition_day` for the date (day type, the plan's meals with their options, the target) and `get_food_log` (what is logged already, and the option picked for each meal).
   - Training: `get_training_calendar` for today and the next days. For a client on a Fixed program (the calendar then shows no workouts), `get_fixed_program` gives the next workout. `get_client_workout` with the workout's id lists the exercises, sets and targets.
   - Habits: `get_todays_habits`. A check-in: `list_my_due_checkins`.
2. **Answer short.** Day type first, then meals (the chosen or default option per meal), the workout with its exercises, habits still open, and a check-in if one is open. Leave out what the client did not ask about when the question is narrow ("what's for dinner?").
3. **Swap a meal option** ("can I have the rice bowl tonight?"): only when `canSwapOptions` is true. Show the option and, if targets are shown, how it compares. After a yes, `choose_meal_option` with the `date`, `mealId` and `optionId`; `wholeWeek` only when the client asks for the rest of the week.
4. **Move a workout** ("move legs to Friday"): `move_workout` with the workout's id as `cwId`, the new date as `to` and `include` nutrition. It runs as a dry run first: show both days' day types and calories before and after (moving legs off Wednesday can make Wednesday a rest day with less food). After a yes, call again with `dryRun` false.
5. **Skip a workout** ("I'm sick today"): say first that skipping can turn the day into a rest day with lower targets. After a yes, `skip_workout` with the `cwId`, a short `reason` and `include` nutrition. Undo with `unskip_workout`. Illness or pain also goes to the coach (see the ground rules).
6. **Groceries**: when `groceryEnabled` is true, `get_grocery_list` with `from` and `to` (at most a week; longer lists get very long) and `choices` picks so the client's own meal choices count. Group by shop section as the answer does.
7. **Records and history** ("what's my squat PR?", "how is my bench going?"): `list_personal_records`, and `get_exercise_history` for one exercise.

## Judgment

- The day type explains the food: "Legs today, so lunch and dinner carry more carbohydrate."
- The coach decides what a client may change. When the server refuses a move, a skip or a swap, pass on its message and suggest asking the coach. Never look for another way round it.
- Moving a workout to a day that already has one is allowed but heavy; mention it.
- Keep it short: the client reads this on a phone, often in the kitchen or the gym.

## What to show

```text
Tuesday: Legs day
Breakfast: overnight oats (option 1)
Lunch: chicken wrap
Dinner: rice bowl with salmon (you picked option 2)
Snack: Greek yoghurt with berries
Workout: Lower A: squat 4 x 6, Romanian deadlift 3 x 8, walking lunges 3 x 10, calf raises 3 x 15
Habits left: 10k steps, water
Check-in: your weekly check-in is open until Thursday.
```

## When something is missing

- No plan for the day (no meals, no workout): say so plainly; it is a free day or the coach has not set it yet.
- The nutrition or training module is off: leave that part out.
- A change is refused because the coach does not allow it: say so and offer to message the coach.
