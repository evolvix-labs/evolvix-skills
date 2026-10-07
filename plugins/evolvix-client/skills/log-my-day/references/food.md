# Logging food

Read this before logging any food.

## 1. Read the day once

- `get_nutrition_settings` once per conversation. It says how this coach wants food logged:
  - `loggingStyle` full: foods, planned meals and numbers are all fine.
  - `loggingStyle` checkoff: planned meals only. Do not log free foods; tell the client their coach asked for meals from the plan.
  - `loggingStyle` totals: numbers only (calories and macros per meal).
  - `showTargets` false: never mention targets, goals, calories left or how the day compares. Report what was logged, nothing more.
  - `logEditWindowDays`: how many days back the client may change.
  - `canSwapOptions`: whether the client may pick another option for a planned meal.
- `get_nutrition_day` for the date gives the day type, the target and the planned meals with their options. For today it also records the day's target.
- `get_food_log` for the date gives what is already logged, the meal groups, and the `choices`: which option the client picked for each planned meal today.

## 2. Pick a meal

Use the meal the client names. Without one, take it from the time of day in the client's time zone: before 10:30 Breakfast, before 15:00 Lunch, before 17:00 Snacks, later Dinner. Say which meal you used. A planned meal has an id (from `get_nutrition_day`); a free meal is a `mealKey` name such as Breakfast.

## 3. Pick the path per meal

**The planned meal was eaten.** `log_planned_meal` with the `date`, the `mealId`, and the `optionId` from that meal's entry in `choices` (pass it every time; without it the default option is logged). `portion` scales it from 0.25 to 2 ("I ate half" is 0.5).

**The same as another day.** `copy_food_log` with `fromDate`, `toDate` and the `mealKeys` to copy (leave them out to copy the whole day).

**Foods in words.**
1. Rewrite the description as comma-separated lines of quantity, unit and food, with digits for quantities: "2 eggs, 1 slice wholegrain bread, 250 ml semi-skimmed milk". Keep the client's food names; the catalog knows Dutch and English names.
2. `log_food_from_text` with that `text`, the `mealKey` and the `date`. It saves nothing; it returns a draft with each line's matched food, amount and confidence.
3. For a line without a match, or a doubtful one, `search_log_foods` with `q` and a `limit` of 5, and let the client pick.
4. Show the lines. After a yes, `confirm_food_log_draft` with the `draftId` and every line to keep (`foodId` and `amount`, or `servings` or `portionId`). The lines you send replace the draft's own, so send all of them.

**Numbers only, or a food the catalog does not have.** `log_food` with the `mealKey` (or `mealId`) and one item holding a `name`, `kcal`, `proteinG`, `carbohydrateG` and `fatG`.

Every write takes an `idempotencyKey`.

## 4. Swapping a planned dish

"I'll have option 2 for dinner instead": `choose_meal_option` with the `date`, the `mealId` and the `optionId`, only when `canSwapOptions` is true. `wholeWeek` repeats the choice on the later days of this week, only when the client asks.

## 5. After saving

Read the day back with `get_food_log` and confirm one line per meal: what was saved and its calories and protein. When `showTargets` is true, add what is left for today against the target.
