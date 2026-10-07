---
name: nutrition-by-training-day
description: >
  Sets an Evolvix client's calorie and macro targets per day type (training, rest, legs, or the
  coach's own named days such as push, pull, high, low or refeed), maps weekdays to day types, and
  handles one-off days, always with a week preview before anything is saved. Use whenever an
  Evolvix coach wants to set or change a client's targets, says things like "2,100 on training days
  and 1,800 on rest days", "legs plus 300", "make Saturday a refeed", "she travels Thursday, treat
  it as rest", or wants to start a client on a plan set. Dutch: "macro's instellen", "trainingsdag
  en rustdag", "zet haar op 1800 kcal".
---

# Nutrition by training day

In Evolvix the day type decides the targets: a training day can carry more calories than a rest day, and a leg day more again. When the client trains from a program, the training calendar decides each day's type; weekday rules decide the days training does not. This skill sets the numbers per day type, the weekday rules and one-off overrides, and shows a normal week before saving anything.

## Ground rules

- **Find the client, never guess.** Resolve a name with `list_clients`. When more than one client matches, ask which. Tools take the client's relationship id as `clientId`.
- **Read before you write.** Load the current state first. When a tool has a preview or a dry run, use it and show the result before the real call.
- **Nothing reaches a client without a yes.** Draft first, show the draft, and send only after the coach approves it. For a batch, show the count and two examples, then ask once.
- **Health red flags stop the playbook.** Pain, injury, illness, pregnancy, a medication change, signs of disordered eating, or weight loss faster than the plan allows: do not change training or nutrition and draft nothing to the client. Tell the coach what you saw, and offer a private note with `add_client_note` and a task with `create_task`.
- **A missing tool is a missing permission.** If a tool this skill needs is not available, tell the coach which permission to tick when they reconnect Evolvix (listed under Before you start) and stop. Never work around it with another tool.
- **Write like the coach, in the client's language.** Before drafting, read the coach's last few messages to that client with `get_messages` and match their length, warmth and sign-off. Write in the language the client uses with the coach; with no messages yet, use the coach's language from `get_me`. No emoji unless the coach uses them.

## Before you start

- Target and rule changes need "Change client nutrition setups, plans, day types, and food logs." A new day type needs "Create and change day types, foods, recipes, and library plans." Both start ticked.
- `get_client` shows whether the client's nutrition module is on. The numbers save either way, but the client sees nothing while it is off: say so.
- Every write takes effect from today. Evolvix has no "from Monday": to start later, keep today's numbers and bridge the days in between with overrides, or make the change on the day.

## Steps

1. **Read the current state and keep it.** `get_nutrition_setup` (a 404 means there is no setup yet), `get_day_rules`, `list_day_types`, and `get_day_calendar` with `include` nutrition for the next 14 days. The calendar gives each date's day type, why it has that type (scheduled or performed training, a weekday rule, the default, an override) and its target. Keep the setup you read: it is the undo.
2. **Pick the route.**
   - The same numbers every day: `set_everyday_targets`. It replaces a day-type setup with all its plan links. It runs as a dry run first and returns the days whose numbers change: show them, and what will be lost, then call again with `dryRun` false after a yes.
   - Start from one of the coach's templates: `list_plan_sets`, show the chosen set's day types, numbers and weekday rules, then `assign_plan_set`. Pass `scaleToRestKcal` when the coach names a rest-day calorie number; every target scales to it. It replaces the client's setup and, when the set has rules, the weekday rules. It runs as a dry run first: show the changed days and their nutrition, then call again with `dryRun` false after a yes.
   - Different numbers per day type: steps 3 to 7. If the client's setup is "same every day" (the mode in `get_nutrition_setup`), `set_daily_targets` refuses until the setup is by day type. Switch it in one `set_nutrition_setup` call after the preview: mode by day type, today as the start date, one slot per day type with its target written in the same shape as the targets you read, and the rest of the document as you read it. Then continue with step 5.
3. **Get the numbers.** Use the coach's. Without them, `suggest_targets` with the latest bodyweight (`get_metric_trend` with `key` bodyweight), a goal of lose or maintain, and an activity of sedentary, light, moderate or high. Say it is a rough start (bodyweight times 30 to 40 kcal, minus 20 percent to lose, protein 1.6 g and fat 0.8 g per kg) and let the coach adjust. Make the grams add up: protein x 4 + carbohydrate x 4 + fat x 9 = kcal.
4. **Day types.** Every key you pass must exist in `list_day_types`. A missing one (legs, high, refeed) is created first with `create_day_type` after a yes: a `key`, a `label`, `kind` training or rest, and `fallbackDayTypeId` set to the training (or rest) type so its days fall back sensibly.
5. **Weekdays.** If the calendar shows training deciding the days (scheduled or performed workouts), leave the rules alone: the program already says which days are training. If the days come from rules or the default, build the full weekday list for `set_day_rules` (weekday 0 is Sunday), starting from what `get_day_rules` returned.
6. **Preview.** `set_daily_targets` (one call per day type, with `dayTypeKey` and the grams) and `set_day_rules` run as dry runs first: each returns the days whose type or numbers change, with their nutrition before and after, and saves nothing. Combine them into one table for a normal week: date, weekday, day type and why, kcal now and after, protein, carbohydrate and fat after, and the week's average now and after. Ask for a yes.
7. **Apply in this order**, each call again with `dryRun` false: `create_day_type` for new types first, then `set_daily_targets` for training and rest and the other types after (so no day is ever left without numbers), then `set_day_rules` with the full list and `include` nutrition.
8. **Verify.** `get_day_calendar` with `include` nutrition for the same dates. Compare with the preview and report any difference.

**One-off days** (a wedding, a race, travel, a refeed): `set_day_override` with the date, the `dayTypeKey` and `include` nutrition. It runs as a dry run first: show which days change and their calories before and after, then call again with `dryRun` false after a yes. Undo with `clear_day_override`.

**A meal plan on a day type** (physique clients with a full menu per day): find the plan id with `list_nutrition_plans`, then `set_daily_targets` with the `dayTypeKey` and `mealPlanId`. Leave the grams out to keep that day type's numbers. Preview with the dry run, then save with `dryRun` false.

**Undo** any of the above with `set_nutrition_setup` and the setup you kept in step 1, after a yes.

## Judgment

- Protein and fat stay steady across day types; carbohydrate carries the difference. Leg days carry the most carbohydrate.
- The weekly average matters more than any single day. Show it in every preview.
- Flag any change above about 10 percent of a day's current calories and give the reason. Coaches usually move in steps of 100 to 200 kcal and then wait a week.
- Physique coaches run named days (push, pull, legs, high, low, refeed). Keep their names; never collapse them into training and rest.
- Refeeds and diet breaks are day types or overrides, not a new setup.
- Never set water, sodium or peak-week manipulation. That is the coach's protocol, outside these tools.
- A target far below what `suggest_targets` gives for the client's weight, or a client with signs of disordered eating in the notes, stops the playbook: tell the coach, change nothing.

## What to show

```text
Ada Jansen: training 2,100, rest 1,800, legs 2,400 (from today)

| Date | Day | Type (why) | kcal now > after | P / C / F after |
| Wed 9 Oct | Wed | Legs (program) | 2,000 > 2,400 | 140 / 300 / 70 |
| Thu 10 Oct | Thu | Rest (rule) | 2,000 > 1,800 | 140 / 175 / 60 |
| ... |
Week average: 2,000 > 2,060 kcal

Saves: legs as a new day type (falls back to training), three day-type targets. Weekday rules stay: the program decides training days.
Save it?
```

## When something is missing

- `set_daily_targets` refuses because the client's setup is not by day type: show the current setup and offer `assign_plan_set` or a full `set_nutrition_setup` instead, after a yes.
- A day type key is unknown: create it first (step 4). Never pass a guessed key.
- The client has no bodyweight entries and the coach gives no numbers: ask for the numbers or the weight. Do not guess.
- A write fails halfway: read the state again, report what was saved and what was not, and offer to restore the kept setup.
