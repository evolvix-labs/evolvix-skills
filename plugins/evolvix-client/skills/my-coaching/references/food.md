# Logging food

Read this before logging any food.

## 1. Read the day once

- `getNutritionSettings` once per conversation. It says how this coach wants food logged:
  - `loggingStyle` full: foods, planned meals and numbers are all fine.
  - `loggingStyle` checkoff: planned meals only. Do not log free foods; tell the client their coach asked for meals from the plan.
  - `loggingStyle` totals: numbers only (calories and macros per meal).
  - `showTargets` false: never mention targets, goals, calories left or how the day compares. Report what was logged, nothing more.
  - `logEditWindowDays`: how many days back the client may change.
  - `canSwapOptions`: whether the client may pick another option for a planned meal.
- `getNutritionDay` for the date gives the day type, the target and the planned meals with their options. For today it also records the day's target.
- `getFoodLog` for the date gives what is already logged, the meal groups, and the `choices`: which option the client picked for each planned meal today.

## 2. Pick a meal

Use the meal the client names. Without one, take it from the time of day in the client's time zone: before 10:30 Breakfast, before 15:00 Lunch, before 17:00 Snacks, later Dinner. Say which meal you used. A planned meal has an id (from `get_nutrition_day`); a free meal is a `mealKey` name such as Breakfast.

## 3. Pick the path per meal

**The planned meal was eaten.** `logPlannedMeal` with the `date`, the `mealId`, and the `optionId` from that meal's entry in `choices` (pass it every time; without it the default option is logged). `portion` scales it from 0.25 to 2 ("I ate half" is 0.5).

**The same as another day.** `copyFoodLog` with `fromDate`, `toDate` and the `mealKeys` to copy (leave them out to copy the whole day).

**Foods in words.**
1. Rewrite the description as lines of quantity, unit and food with digits: "2 eggs, 1 slice wholegrain bread, 250 ml semi-skimmed milk". Keep the client's food names; the catalog knows Dutch and English.
2. Match every line in one script and log the picks after the yes:

```ts
const clientId = "<relationship id>";
const lines = [{ q: "egg", amount: 2, unit: "piece" }, { q: "wholegrain bread", amount: 1, unit: "slice" }];
const found = await Promise.all(lines.map((l) => evolvix.searchLogFoods({ clientId, q: l.q, limit: 5 })));
return lines.map((l, i) => ({
  line: l, matches: found[i].map((f) => ({ id: f.id, name: f.name, brand: f.brand, per: `${f.servingAmount} ${f.servingUnit}`, kcal: f.nutrients.find((n) => n.key === "kcal")?.amountPerServing, portions: f.portions.map((p) => ({ id: p.id, name: p.name })) })),
}));
```

Tools: `log_food_from_text` (a draft that saves nothing), `search_log_foods` for doubtful lines, then `confirm_food_log_draft` with the `draftId` and every line to keep.

3. A doubtful line gets two or three matches for the client to pick. After the yes, `logFood` with the `mealKey` (or `mealId`), the `date` and `items` of `foodId` with `amount` in the food's unit, or `portionId` with `servings`.

**Numbers only, or a food the catalog does not have.** `logFood` with the `mealKey` (or `mealId`) and one item holding a `name`, `kcal`, `proteinG`, `carbohydrateG` and `fatG`.

## 4. Swapping a planned dish

"I'll have option 2 for dinner instead": `chooseMealOption` with the `date`, the `mealId` and the `optionId`, only when `canSwapOptions` is true. `wholeWeek` repeats the choice on the later days of this week, only when the client asks.

## 5. After saving

Read the day back with `getFoodLog` and confirm one line per meal: what was saved and its calories and protein. When `showTargets` is true, add what is left for today against the target.
