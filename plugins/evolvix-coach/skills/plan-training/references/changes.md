# Changing what exists

Each change previews or is shown first, and each changes day types and so nutrition days: say so.

**Without a program** (a coach who plans week by week): `scheduleWorkout` puts a library workout on a date (`from: { templateId }`, `scheduledOn`, optional weekly `repeat`, `include` nutrition), then `periodiseClientWorkouts` progresses the coming weeks (`clientWorkoutIds`, `weeks`, `progression`). Both run as dry runs in a script.

**One client's copy** (swap an exercise for this client only):

```ts
const clientId = "<relationship id>";
const copy = await evolvix.getClientWorkout({ clientId, cwId: "<client workout id>" });
return { name: copy.name, on: copy.scheduledOn, revision: copy.workout.revision, blocks: copy.workout.blocks };
```

Tools: `get_client_workout`, then `edit_client_workout`.

Then a write script sends the whole document back with `editClientWorkout`: the changed `blocks`, the `name`, its `baseRevision` and `include` nutrition.

**Fix a library or program workout** (do not archive and rebuild): read it with `getWorkoutTemplate` (a library workout's id from `listWorkouts`; a program workout's id from its placement in `getProgram`) and send the whole document back with `updateWorkout` and its `baseRevision`, keeping each line's `progression` and each back-off set's `backoffPct`. A library edit reaches only new placements. A program workout reaches clients who have it only after a push:

```ts
const copies = await evolvix.listProgramCopies({ id: "<program id>", placementId: "<placement id>" });
return copies.map((c) => ({ client: c.clientName, on: c.scheduledOn, eligible: c.eligible, customised: c.customised, done: c.hasSession }));
```

Tools: `list_program_copies`, then `push_program_changes`.

Show the list. After a yes, `pushProgramChanges` with the `placementId` and no `clientWorkoutIds`: performed and customised copies are left alone. Send `clientWorkoutIds` only for clients the coach names, since that also overwrites their customised copies. `removeProgramWorkout` takes a workout off a program (clients keep their copies until a push); `archiveWorkout` retires a library workout and `unarchiveWorkout` undoes it.

**Switch the training mode** (Calendar is workouts on dates, Fixed an ordered list): read `getTrainingSettings` and send its `visibilityWeeks` and client permissions back with `setTrainingMode`, or they reset. Calendar to Fixed turns upcoming workouts without a session into the list and finishes calendar programs. Fixed to Calendar needs `switch` with a `startDate` and the `weekdays`, and finishes fixed programs. It runs as a dry run: show the workouts that move and the day types and calories that change. Then assign the program.

**Rename a program** (extending a block never renames it): `updateProgramDetails` with the new `name` and the `baseRevision` from `getProgram`. Clients who already have it keep their copy and its old name.

**Undo an assignment:** `removeProgramFromClient` with the assignment id (`aid`) from `listProgramAssignments`, a `from` date and `include` nutrition, as a dry run first. Finished sessions stay.
