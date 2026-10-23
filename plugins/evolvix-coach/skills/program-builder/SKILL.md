---
name: program-builder
description: >
  Builds an Evolvix training program from a description (days per week, split, equipment, weeks,
  goal), fills it with exercises from the library, progresses it week by week with deloads, and
  assigns it to a client with a preview of the calendar and the day types and calories it changes.
  Use whenever an Evolvix coach asks to build, write or design a program or training block, put a
  client on a program, start a new block, or progress a client's next weeks, even if they just say
  "4-day upper/lower for Ada". Dutch: "maak een schema", "trainingsprogramma voor Ada", "nieuw
  blok".
---

# Program builder

The coach describes the block in a sentence; this skill turns it into an Evolvix program, checks it against the client's history and injuries, progresses it, and puts it on the client's calendar. Every step that changes something shows a preview first. Because the training calendar decides each day's type, assigning a program also changes the client's nutrition on those days: the preview shows that too.

## Ground rules

- **Find the client, never guess.** Resolve a name with `list_clients`. When more than one client matches, ask which. Tools take the client's relationship id as `clientId`.
- **Read before you write.** Load the current state first. When a tool has a preview or a dry run, use it and show the result before the real call.
- **Nothing reaches a client without a yes.** Draft first, show the draft, and send only after the coach approves it. For a batch, show the count and two examples, then ask once.
- **Health red flags stop the playbook.** Pain, injury, illness, pregnancy, a medication change, signs of disordered eating, or weight loss faster than the plan allows: do not change training or nutrition and draft nothing to the client. Tell the coach what you saw, and offer a private note with `add_client_note` and a task with `create_task`.
- **A missing tool is a missing permission.** If a tool this skill needs is not available, tell the coach which permission to tick when they reconnect Evolvix (listed under Before you start) and stop. Never work around it with another tool.
- **Write like the coach, in the client's language.** Before drafting, read the coach's last few messages to that client with `get_messages` and match their length, warmth and sign-off. Write in the language the client uses with the coach; with no messages yet, use the coach's language from `get_me`. No emoji unless the coach uses them.

## Before you start

- Building programs and workouts needs "Create and change day types, foods, recipes, and library plans." Putting a program on a client needs "Schedule, move, and skip client workouts, assign programs, and log sessions." Both start ticked.
- Know the brief: days per week, the split, equipment, number of weeks, start date, goal and level. Ask once for what is missing; do not interview the coach.

## Steps

1. **The client's file.** `get_client`, `list_client_notes` (injuries, limits, preferences), `list_program_assignments` (what runs now and how far along), and `get_training_calendar` for the next four weeks. An injury or pain in the notes stops the build: tell the coach.
2. **The baseline.** `get_training_stats` with `range` 90d, `list_personal_records`, and `list_performed_exercises` (what the client really does). Loads come from here.
3. **Reuse first.** `list_programs` (filter with `q` and `type` calendar or fixed) and `list_workouts`. If one fits as it is, skip to step 9 with that program.
4. **Day types.** `list_day_types`. Give each workout a day type (push, pull, legs, upper, lower, or training) so nutrition follows the training day. A missing type is created with `create_day_type` after a yes, with `kind` training and `fallbackDayTypeId` set to the training type.
5. **The outline.** Show weeks, days, workouts, and per exercise the sets, reps, load or effort, and rest. Wait for a yes.
6. **Exercises.** Write each workout as lines such as "Back squat 4x6 92.5kg, rest 120s" and call `parse_workout_text`. It matches every line to the library and returns `blocks` ready for the next step. For a line without a confident match, pick from its `candidates` or use `search_exercises` with `q` and `equipment`.
7. **Build week 1.** `create_program` with a `name`, `type` (calendar or fixed) and optional `tags`; it comes with an empty first week. Then per workout, `create_workout` with the `blocks` from step 6, a `name` and its `dayTypeId`, and `add_workout_to_program` with the program `id`, the first week's `weekId`, `from` holding `templateId` set to the new workout's id, a `dayIndex` from 1 to 7 (Calendar only; Fixed programs take no day) and the program's current `baseRevision` (each answer returns the next revision).
8. **Progress the weeks.** `periodise_program` with the week 1 `placementIds`, `copyWeeks` (the number of weeks minus one), and the rules: `weight` (mode kg or percent with an `amount`), `reps` (mode add or double with `step`, `cap` and, for double, `resetTo`), `sets` (`add` every `every` weeks up to `max`), effort as `rpe` (mode rpe or rir with a `step`), and `deload` (`every` n weeks with a `weightFactor` and `setsFactor`). It runs as a dry run first: show the preview (it lists only the first ten exercise lines; say so) and ask. Then call again with `dryRun` false and the current `baseRevision`. There is no undo after the dry run, so the preview is the check.
9. **Read it back.** `get_program`, shown as a table of weeks and days.
10. **Assign with a preview.** `assign_program` with the `programId`, a `startDate` (a Monday, since day 1 falls on it), `startWeek` 1, `conflict` keep, and `include` nutrition. It runs as a dry run first: show the clashing workouts, every date whose day type changes, and that date's calories before and after. After a yes, call again with `dryRun` false. If the client already runs this program, the server asks to confirm: pass `importAnyway` only after a yes. A mode mismatch means the client trains in the other mode (Calendar or Fixed): see **Switch the training mode** below.
11. **Confirm.** `get_training_calendar` for the first two weeks: each day's workout, day type and what it means for food. Offer a short message to the client; send nothing without a yes.

**Without a program** (a coach who plans week by week): put library workouts on dates with `schedule_workout` (`from` with a `templateId`, a `scheduledOn` date, optional weekly `repeat`), then progress the coming weeks with `periodise_client_workouts` (`clientWorkoutIds`, `weeks`, and a `progression`). Both preview first.

**One client's copy:** to swap an exercise for this client only, read it with `get_client_workout` and save it with `edit_client_workout`: the whole document back with its `baseRevision` and `include` nutrition.

**Fix a workout (do not archive and rebuild):** read it with `get_workout_template` (a library workout by its id from `list_workouts`; a workout in a program by the id inside its placement in `get_program`) and save the whole document back with `update_workout` and its `baseRevision`, keeping each line's `progression` and each back-off set's `backoffPct`. Show what changes and ask first. A library edit reaches only new placements and schedules: programs and clients who already have the workout keep their copy. A program workout reaches clients who already have it only after a push: `list_program_copies` shows which copies are eligible (performed and customised ones are not), show that list, and after a yes call `push_program_changes` with the `placementId` and no `clientWorkoutIds`. Send `clientWorkoutIds` only for clients the coach names, since that also overwrites their customised copies. A push changes day types and so nutrition days; say so. To take a workout off a program use `remove_program_workout` after a yes (clients keep their copies until a push), and to retire a library workout use `archive_workout`; `unarchive_workout` undoes it.

**Switch the training mode** (Calendar means workouts on dates, Fixed an ordered list the client works through): read `get_training_settings` and keep its `visibilityWeeks` and permissions, then `set_training_mode` with the new `mode` and those values sent back, or they reset. Calendar to Fixed turns the upcoming workouts without a session into the list and finishes the calendar programs. Fixed to Calendar needs `switch` with a `startDate` and the `weekdays` to train on, and finishes the fixed programs. It runs as a dry run first: show the workouts that move (`switched`) and the day types and calories that change, name the client and the new mode, and call again with `dryRun` false only after a yes. Then assign the program.

**Rename a program** (a block extended from 8 to 12 weeks keeps its old name, since extending or `periodise_program` never renames): `update_program_details` with the new `name` (or `description`) and the `baseRevision` from `get_program`. It changes the library program only: clients who already have it keep their copy and its old name.

**Undo an assignment:** `remove_program_from_client` with the assignment id from `list_program_assignments` and a `from` date, as a dry run first. Finished sessions stay.

## Judgment

- **Volume.** Roughly 10 to 20 hard sets per muscle per week for trained clients, fewer for beginners. Spread it over two sessions per muscle where the days allow.
- **Progression.** Progress load or reps, not both in the same week. Double progression (add reps to a cap, then add load and reset) suits most hypertrophy work.
- **Deloads.** Every 4 to 6 weeks in a longer block: about 60 percent of the sets and 90 percent of the load.
- **Loads.** Never invent a load. Use records and recent history; without them, write effort targets (RPE 7 or 2 to 3 reps in reserve) and say the first week sets the numbers.
- **Swaps** keep the movement pattern and respect the equipment and the notes (a knee issue means no deep loaded knee flexion until the coach says so).
- **Day types matter.** Leg days usually carry the most food. If the client's nutrition has no slot for a day type you use, those days fall back to training: mention it and hand over to the nutrition-by-training-day skill.
- **Conflict replace** deletes every scheduled workout without a session in the date range, from any program. Only with an explicit yes that names the count and the dates.

## What to show

```text
Ada: Upper/Lower, 4 days, 8 weeks, full gym, from Mon 14 Oct

Week 1
| Day | Workout | Day type | Exercises |
| Mon | Upper A | upper | Bench 4x6-8 @ 60 kg, Row 4x8-10 @ 50 kg, ... |
| Tue | Lower A | legs | Squat 4x6-8 @ 85 kg, RDL 3x8-10 @ 70 kg, ... |
...
Progression: double progression to the top of the range, then +2.5 kg. Deload in week 5.
Assigning changes 32 dates: 16 become training or legs (kcal +300 or +600), 16 stay rest. No clashes.
Build and assign?
```

## When something is missing

- `create_program` answers that the name is taken: suggest the same name with the client's name or the date added.
- A preview shows clashes: list them and ask whether to keep both or replace (replace only with an explicit yes).
- An exercise does not exist in the library: say so and use the closest match after a yes; creating new exercises is done in the app.
- The client has no history: build with effort targets and suggest a test week.
