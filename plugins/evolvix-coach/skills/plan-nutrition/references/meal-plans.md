# Build a meal plan

For a coach who describes a menu or shares a sheet with meals per day type. The client sees a plan only once a day type links to it, so building is safe; linking is the step that needs a yes.

1. **Read the menu and check it.** List each day type's meals with time and every line as food, amount and unit. Lines joined by "or" are alternatives for one meal. Show one table per day type with the day total against that day type's target from the setup, and ask once.
2. **Find the foods**, and look for an earlier import of the same plan:

```ts
const clientId = "<relationship id>";
const lines = ["oats", "whey protein", "banana", "chicken breast", "basmati rice"];
const [plans, ...found] = await Promise.all([
  evolvix.listNutritionPlans({ clientId, kind: "meal" }),
  ...lines.map((q) => evolvix.searchFoods({ q, limit: 3 })),
]);
return {
  existing: plans.map((p) => ({ id: p.id, name: p.name })),
  foods: lines.map((line, i) => ({ line, matches: found[i].map((f) => ({ id: f.id, name: f.name, brand: f.brand, per: `${f.servingAmount} ${f.servingUnit}`, kcal: f.kcal, portions: f.portions })) })),
};
```

Tools: `list_nutrition_plans`, `search_foods` per line (`search_recipes` for a recipe from the coach's library).

Pick the match that fits the name, brand and macros. When no match is confident, list two or three candidates and ask. A plan with the same name is probably an earlier import: ask whether to add to it or start a new one.

3. **Create the plan**, one per day type: a script with `createNutritionPlan` (`kind` meal, a name the coach knows, "Training day"), applied. Its id and revision are in the apply result.
4. **Meals, then dishes**, in two scripts, since dishes need the meal ids:

```ts
const clientId = "<relationship id>";
const planId = "<plan id>";
const plan = await evolvix.getNutritionPlan({ clientId, planId });
const meals = [
  { name: "Breakfast", time: "07:30" },
  { name: "Post-workout", time: "13:00", note: "Eat within an hour of training." },
];
// Each write raises the plan revision by one, so the changeset counts ahead.
for (const [i, m] of meals.entries()) await evolvix.addMeal({ clientId, planId, ...m, baseRevision: plan.revision + i });
return { revision: plan.revision, meals: meals.length };
```

Tools: `get_nutrition_plan`, `add_meal` per meal, then `add_meal_option` per dish (each answer returns the next `baseRevision`).

After applying, the second script reads the plan again for the meal ids and adds a dish per meal with `addMealOption`: `foods` as `{ foodId, amount }` in the food's unit or `{ foodId, portionId }` for "2 eggs", a `recipeId` with `servings` for a library recipe, `description` for preparation or swap notes, and `manual` numbers only when a food cannot be found (say which lines). Alternatives become extra options on the same meal; the first stays the default. A stale revision stops `apply_changes`: read the plan and continue from the first dish missing.

5. **Compare.** `getNutritionPlan` returns the day totals and `comparisons` with the day type's target. Report any macro more than 5 percent off and the line causing it. Do not change amounts to make it fit: the coach's menu is the plan.
6. **Link.** `setDailyTargets` with the `dayTypeKey` and the `mealPlanId`, grams left out to keep the targets. Show the days that will follow the plan, then apply after a yes.

Fix one dish with `updateMealOption` and a meal's name, time or note with `updateMeal` (an empty `note` clears it), each with the latest `baseRevision`.
