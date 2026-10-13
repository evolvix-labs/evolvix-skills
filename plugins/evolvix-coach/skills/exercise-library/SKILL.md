---
name: exercise-library
description: >
  Builds and maintains a coach's Evolvix exercise library from a sentence, a pasted list or a
  described movement: looks up the allowed equipment, muscles and types first, checks the library
  for an existing exercise, drafts the exercise with instructions, and saves it only after a yes.
  Also corrects an exercise, adapts a shared Evolvix exercise through a copy, and archives
  exercises that should leave the pickers. Use whenever an Evolvix coach wants to add, import,
  fix, rename, copy or retire an exercise, or says the library is missing a movement, even if
  they never say library. Dutch: "oefening toevoegen", "mijn oefeningenlijst importeren",
  "pas deze oefening aan", "archiveer deze oefening".
---

# Exercise library

Every exercise a coach saves shows up in the pickers of every workout and program in the company, and the exercises in use feed the logbook and personal records. This skill adds exercises that fit the library's own values, avoids duplicates, and changes an exercise without damaging the plans that use it.

## Ground rules

- **Find before you make.** Search the library for the movement under the names a coach might use before creating anything.
- **Values come from the library.** Equipment, muscles, type, level, mechanic, force and tracking use the values from `get_exercise_facets`. Never invent a muscle or equipment value. When nothing fits, pick the closest allowed one (equipment other) and say so.
- **Nothing is saved without a yes.** Show the exercise as a draft and wait for the coach to approve it. For a list, show the whole list once and ask once.
- **Shared exercises are read-only.** Exercises from Evolvix itself cannot be edited or archived. Copy one with `duplicate_exercise` and change the copy.
- **Archive, never delete.** There is no delete. `archive_exercise` removes an exercise from pickers and search while plans and logs keep it.
- **A missing tool is a missing permission.** If a tool this skill needs is not available, tell the coach which permission to tick when they reconnect Evolvix (listed under Before you start) and stop. Never work around it with another tool.
- **Write in the coach's language.** Names and instructions go in the language the coach writes in. Keep the name short, the way it would show in a workout: "Cable woodchop", not "The cable woodchop exercise".

## Before you start

- Creating and changing exercises needs "Create and change day types, foods, recipes, library plans, and check-in forms." on the Evolvix consent screen. Reading the library needs "See the library of foods, exercises, and forms."
- Pictures cannot be added through Claude. Tell the coach to add them in the Evolvix app afterwards; changing an exercise here keeps the pictures it has.
- A Google Sheet is read through the Google Drive connector in Claude. Without it, ask the coach to paste the rows or attach the file.

## What an exercise holds

| Field | What to put in it |
| --- | --- |
| name | Short and unique in the company. A second exercise with the same name answers name_taken. |
| description | The instructions: setup, movement and one or two cues, in a few short sentences. Leave it empty rather than guess. |
| type | strength unless the movement is cardio, stretching, plyometrics, powerlifting, olympic weightlifting or strongman. |
| equipment | One value from the facets. Bodyweight movements are body only. |
| muscles | At least one primary muscle, then secondary ones. A muscle is listed once. |
| mechanic and force | Compound or isolation; push, pull or static. Set them only when the movement is clear. |
| level | Beginner, intermediate or expert. Leave it out when unsure. |
| tracking | How sets are logged: weight and reps, reps only, time, distance and time, or time only. Leave it out for the default of the type, and set it for a plank (time) or a bodyweight movement (reps). |
| unilateral | True when each side is done on its own. |
| videoUrl | Only a link the coach gave. |

## Steps: one new exercise

1. **Look up the values.** `get_exercise_facets` for the type, level, equipment and muscle choices.
2. **Search first.** `search_exercises` with a word or two of the name, then with the equipment or muscle. If the movement exists, say so and offer to use it. If a shared exercise is close, offer `duplicate_exercise` and an edit.
3. **Draft it** in the table below. Fill what the coach gave, infer the muscles and equipment only when the movement makes them certain, and ask about the rest in one message.
4. **Ask for the yes.** Wait for an explicit yes or for changes.
5. **Create it** with `create_exercise`, then `get_exercise` and confirm it matches the draft.

## Steps: a list of exercises

1. Read the pasted list, sheet or description and call `get_exercise_facets` once.
2. Run `search_exercises` for each line and split the lines into new, already there, and unclear.
3. Show one table: name, equipment, primary and secondary muscles, tracking, and the lines that already exist or need an answer. Ask once for a yes on the new ones.
4. Create them one at a time with `create_exercise`. On an error, fix it from the message or set that line aside, and carry on with the rest.
5. End with a summary: created, skipped because they existed, failed or waiting for an answer. Remind the coach that pictures are added in the app.

## Steps: changing an exercise

1. **Read it.** `get_exercise` for the current fields and where it is used (usedIn).
2. **Say what the change does.** Every workout, program and client plan that uses the exercise shows the change. Show the before and after and the usage, and ask first.
3. **Send the whole exercise.** `update_exercise` replaces everything: send every writable field from `get_exercise` with the change, or the fields you leave out are reset. Do not send id, companyId, imageUrl, images, custom, readOnly, archivedAt, usedIn or the timestamps. Leave imageUploadIds out to keep the pictures.
4. **Confirm** from the answer.

- An exercise with readOnly true is shared: offer `duplicate_exercise`, then edit the copy. The copy is named with (copy) after the name; rename it in the same update.
- Do not turn an exercise into a different movement. If "Bench press" should become "Incline press", create the new one and archive the old.

## Steps: retiring an exercise

1. `get_exercise` to see usedIn. Plans and logs that use it keep it.
2. Ask first, then `archive_exercise`. `unarchive_exercise` brings it back, unless another exercise now has its name.

## What to show

```text
New exercise
Cable woodchop
  Type strength, equipment cable, mechanic compound, force pull
  Primary: core. Secondary: shoulders
  Tracking: weight and reps
  Instructions: Set the cable high. Rotate and pull diagonally down across the body, arms long. Keep the hips square.
Create it?
```

## When something is missing

- A muscle or equipment the coach names is not in the facets: use the nearest allowed value, say which, and let the coach decide.
- The server rejects a field: fix it from the error, or ask the coach when the fix changes the meaning.
- The coach wants an exercise deleted: say there is no delete, and offer `archive_exercise`.
- The coach wants a picture or video uploaded: pictures are added in the Evolvix app; a video needs a link.
