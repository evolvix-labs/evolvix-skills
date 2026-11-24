# The exercise library

Every exercise a coach saves shows up in the pickers of every workout and program in the company, and exercises in use feed the logbook and records. Add exercises that fit the library's own values, avoid duplicates, and change an exercise without damaging the plans that use it.

- **Find before you make.** Search under the names a coach might use before creating anything.
- **Values come from the library.** Type, level, equipment and muscles come from `getExerciseFacets`. Never invent one; when nothing fits, pick the closest (equipment other) and say so.
- **Shared exercises are read-only.** An exercise with `readOnly` true comes from Evolvix: copy it with `duplicateExercise` and change the copy (rename the "(copy)" in the same update).
- **Archive, never delete.** `archiveExercise` removes it from pickers while plans and logs keep it; `unarchiveExercise` brings it back unless another exercise took its name.
- **The coach's language.** Short names as they would show in a workout: "Cable woodchop".
- Pictures are added in the Evolvix app; a video needs a link the coach gave. A Google Sheet is read with the Google Drive connector, or the coach pastes the rows.

## What an exercise holds

| Field | What to put in it |
| --- | --- |
| name | Short and unique in the company (a duplicate answers name_taken). |
| description | Setup, movement and one or two cues. Empty rather than guessed. |
| type | strength unless cardio, stretching, plyometrics, powerlifting, olympic weightlifting or strongman. |
| equipment | One value from the facets. Bodyweight is body only. |
| muscles | At least one primary, then secondary ones, each once. |
| mechanic, force | Compound or isolation; push, pull or static. Only when clear. |
| level | Beginner, intermediate or expert. Out when unsure. |
| tracking | Out for the type's default; time for a plank, reps for a bodyweight movement. |
| unilateral | True when each side is done on its own. |

## Add one or a list

```ts
const lines = ["Cable woodchop", "Landmine press"];
const facets = await evolvix.getExerciseFacets({});
const found = await Promise.all(lines.map((q) => evolvix.searchExercises({ q, limit: 5 })));
return {
  equipment: facets.equipment.map((f) => f.value), muscles: facets.muscles.map((f) => f.value), types: facets.types.map((f) => f.value),
  lines: lines.map((line, i) => ({ line, existing: found[i].items.map((e) => ({ id: e.id, name: e.name, shared: !e.custom, equipment: e.equipment })) })),
};
```

Tools: `get_exercise_facets`, `search_exercises` per line (also by equipment or muscle).

Split the lines into new, already there and unclear. Draft the new ones in one table, infer muscles and equipment only when the movement makes them certain, and ask once. After the yes, a write script with `createExercise` per new line. On an error for one line, fix it from the message or set it aside and carry on. End with created, skipped because they existed, and waiting for an answer.

## Change or retire one

```ts
const ex = await evolvix.getExercise({ id: "<exercise id>" });
return { ex: { ...ex, images: ex.images.length }, usedIn: ex.usedIn };
```

Tools: `get_exercise`, then `update_exercise`, `duplicate_exercise` or `archive_exercise`.

Every workout, program and client plan that uses it shows the change: show before and after with the usage, and ask. `updateExercise` replaces everything, so send every writable field from `getExercise` with the change (`name`, `description`, `type`, `equipment`, `muscles`, `mechanic`, `force`, `level`, `tracking`, `unilateral`, `countsFor1rm`, `videoUrl`); leave `imageUploadIds` out to keep the pictures. Do not turn an exercise into a different movement: create the new one and archive the old.

```text
New exercise
Cable woodchop
  Type strength, equipment cable, mechanic compound, force pull
  Primary: core. Secondary: shoulders
  Tracking: weight and reps
  Instructions: Set the cable high. Rotate and pull diagonally down across the body, arms long. Keep the hips square.
Create it?
```
