# One client

On demand: at the end of a block, when something feels off, or before a renewal. Agree the window first: "how is she doing" is the last 7 days, a block report the block's dates (from `listProgramAssignments`), a renewal report since the start.

## Read

```ts
const clientId = "<relationship id>";
const from = "2026-09-30";
const to = "2026-10-06";
const days = Math.min(92, Math.round((Date.now() - Date.parse(from)) / 86400e3) + 1);
const [client, overview, notes] = await Promise.all([
  evolvix.getClient({ clientId }),
  evolvix.getClientOverview({ clientId, from, to }),
  evolvix.listClientNotes({ clientId }),
]);
const on = (key: string) => client.modules.some((m) => m.module === key && m.enabled);
const [food, training, programs, metrics, habits, checkins] = await Promise.all([
  on("nutrition_log") ? evolvix.getNutritionSummary({ clientId, days }) : null,
  on("training_log") ? evolvix.getTrainingStats({ clientId, range: "custom", from, to }) : null,
  evolvix.listProgramAssignments({ clientId }),
  on("metrics") ? evolvix.listClientMetrics({ clientId }) : null,
  on("habits") ? evolvix.getHabitSummary({ clientId, week: to }) : null,
  evolvix.listClientCheckins({ clientId, from, to, status: "submitted" }),
]);
const weight = metrics?.some((m) => m.key === "bodyweight")
  ? await evolvix.getMetricTrend({ clientId, key: "bodyweight", from, to })
  : null;
return {
  client: { name: `${client.firstName} ${client.lastName}`, practice: client.practiceName, week: client.week, off: client.modules.filter((m) => !m.enabled).map((m) => m.module) },
  attention: overview.attention, latestMessage: overview.latestMessage,
  notes: notes.slice(0, 8).map((n) => `${n.title}: ${n.body.slice(0, 200)}`),
  food: food && { averages: food.averages, days: food.days.filter((d) => d.date >= from && d.date <= to).map((d) => ({ date: d.date, type: d.dayTypeLabel, target: d.target, logged: d.logged })) },
  training: training && { kpis: training.kpis, prs: training.prs.map((p) => `${p.exerciseName} ${p.latestOn}`), muscles: training.muscles.map((m) => ({ name: m.name, sets: m.sets, before: m.previousSets })) },
  program: programs.assignments.filter((a) => a.status === "active").map((a) => ({ name: a.programName, start: a.startDate, end: a.endDate, done: a.doneCount, of: a.workoutCount })),
  weight: weight?.summary,
  other: metrics?.filter((m) => m.key !== "bodyweight").map((m) => ({ key: m.key, latest: m.latest, goal: m.target })),
  habits: habits && { rate: habits.average.rate, rows: habits.rows.map((r) => ({ habit: r.habit.name, done: r.done, of: r.scheduled })) },
  checkins: checkins.items.map((c) => ({ id: c.id, date: c.checkinDate, review: c.reviewState })),
};
```

Tools: `get_client`, `get_client_overview`, `list_client_notes`, `get_nutrition_summary`, `get_training_stats` (range custom), `list_program_assignments`, `list_client_metrics`, `get_habit_summary`, `list_client_checkins`, `get_metric_trend` (key bodyweight).

For a quick "how's Ada?", the overview and notes are often enough: return only those. Then open only what the answer points to, in a second script: `getFoodLog` for at most three days that stand out (meals, quick adds, skipped meals, the client's note), `getDayCalendar` when a day type looks odd, `listSessions` and `getSession` for notable sessions, `getExerciseHistory` for a main lift, `getMetricWeek` for all measurements in a week, `getActivitySummary` for cardio minutes and wearable data, and `compareCheckins` with the first and latest check-in ids. For a block, call `getHabitSummary` for the first and the last week.

A cardio habit counts watch workouts, Evolvix training and manual entries. Short cardio from a client without a watch may be missing entries, not missing effort: say so.

## Then

Write the report, then offer one short message to the client in the coach's voice. After a yes, a write script with `sendMessage`; offer `createTask` for a promised follow-up and `addClientNote` for a fact worth keeping.

Suggestions: at most three, each with its reason, each small enough for this week. A goal far away gets a next step, not a verdict.

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
Habits: water 7/7, steps 4/7. Cardio 110 of 150 minutes.

Next
1. Add a protein breakfast on rest days (she logs yoghurt already; double it).
2. Move the Saturday session to Sunday.
3. Keep targets as they are; the trend is on pace.

Want me to draft a short message to Ada?
```
