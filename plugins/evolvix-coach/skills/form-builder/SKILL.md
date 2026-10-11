---
name: form-builder
description: >
  Builds and changes Evolvix check-in forms and questionnaires from a sentence, a list, a photo or
  a coach's spreadsheet: picks the right question type for each line, sets scales, choices, units
  and follow-up questions, shows the whole form before saving, and assigns it only after a yes.
  Also adds, removes, reorders or changes questions on a live form without cutting old answers off
  from their trends. Use whenever an Evolvix coach wants to make, copy, rebuild, tidy or change a
  check-in, daily check-in, intake questionnaire or form, or match a form to a sheet they already
  use, even if they never say form. Dutch: "check-in formulier maken", "vraag toevoegen",
  "schaal van 1 tot 5", "maak mijn dagelijkse check-in zoals deze sheet".
---

# Form builder

A check-in form is what every assigned client fills in, often every day, and its answers feed the coach's week grid, trends and call briefs. This skill drafts the form as a table the coach can read in one look, saves it only after a yes, and changes a live form in a way that keeps the history usable.

## Ground rules

- **Find the client, never guess.** Resolve a name with `list_clients`. When more than one client matches, ask which. Tools take the client's relationship id as `clientId`.
- **Read before you write.** Load the current state first. When a tool has a preview or a dry run, use it and show the result before the real call.
- **Nothing reaches a client without a yes.** Draft first, show the draft, and send only after the coach approves it. For a batch, show the count and two examples, then ask once.
- **A missing tool is a missing permission.** If a tool this skill needs is not available, tell the coach which permission to tick when they reconnect Evolvix (listed under Before you start) and stop. Never work around it with another tool.
- **Write in the coach's language.** Question labels, help text and options go in the language the coach writes in, or the language of the sheet they share. No emoji unless the coach uses them.

## Before you start

- Building and changing forms needs "Create and change day types, foods, recipes, library plans, and check-in forms." on the Evolvix consent screen. Metric questions also need "See measurements." Assigning a form needs "Fill in and submit check-ins, review them, and send feedback to clients."
- A Google Sheet is read through the Google Drive connector in Claude. Without it, ask the coach to paste the rows or attach the file.

## Question types

Pick the type from what the answer is, not from how the sheet looks.

| The line asks for | Type | Settings worth setting |
| --- | --- | --- |
| A score, "rate 1 to 10" | scale | scaleLowLabel and scaleHighLabel (short, at most 24 characters), scaleDirection higher, lower or neutral, and the range with scaleMin (0 or 1) and scaleMax (3 to 10) when it is not 1 to 10 |
| A star rating | stars | scaleDirection |
| Body weight, steps, waist, sleep hours the coach charts | metric | metricId from `list_metrics`; the answer lands in the client's chart |
| Any other count or amount | number | numberUnit, numberDecimals, numberMin, numberMax |
| One answer from a list | choice | options with a label each |
| Several answers from a list | choice | allowMultiple true, maxChoices |
| Yes or no | yes_no | yesLabel and noLabel only when the coach words them differently |
| Free text | text | textLength short or long |
| A date | date | dateLimit |
| Progress photos | progress_photos | poses |
| Files or video | media | mediaAccept, mediaMaxFiles |
| Agreement to terms | signature | signatureStatement |

- A measurement the coach wants on a chart is a metric question, never a number question. Check `list_metrics` for the match (weight, steps, waist) before falling back to a number question.
- scaleDirection says which end is good: higher for energy and sleep quality, lower for stress, soreness, hunger and cravings, neutral when neither end is better. The week grid colours by it.
- Mark a question required only when the coach says it is, or when the form is short. Long daily forms with everything required get skipped.
- To ask a question only after an earlier answer, give it showIf with the earlier question's key: op equals with yes for a yes/no, any_of with option keys for a choice, gte or lte with a value for a scale, stars, number or metric.

## Steps: a new form

1. **Read the source.** The coach's sentence, list, photo or sheet. For a sheet, read the header row and a few filled rows so the type of each column is clear.
2. **Check what exists.** `list_forms` for a form with the same or a similar name. If one exists, offer to change or duplicate it (`duplicate_form`) instead of adding a second. For a generic weekly check-in or intake, `list_form_templates` gives ready-made forms to start from with `use_form_template`.
3. **Draft the form as a table**: number, label, type, required, and the settings in plain words (for example "1 to 5, Exhausted to Full of energy, higher is better"). Add the name, check-in or questionnaire, and a default schedule if the coach gave one. Ask about anything the source leaves open, in one message.
4. **Ask for the yes.** Show the table. Wait for an explicit yes or for changes.
5. **Create it** with `create_form`, every question in that one call. Then `get_form` and confirm the question count and keys match the table.
6. **Schedule.** For a daily or weekly form, set the default schedule with `update_form` if the coach gave one.
7. **Assign only when asked.** `assign_form_to_clients` notifies every client on it: show the client names and the schedule, ask, then assign.

## Steps: changing a live form

1. **Read it.** `get_form` for the questions and keys, how many clients use it (inUse) and how many check-ins were made on this revision (answers).
2. **Say what the change does.** Every change reaches every client the form is assigned to from their next check-in. Show the change and the number of clients, and ask first.
3. **Make the smallest change.** `update_form_question` for wording, labels, range or follow-ups; `add_form_question` for a new question, at a position when it belongs in the middle; `remove_form_question` to drop one; `reorder_form_questions` with every key once. Send the form's current revision as baseRevision; a stale one answers 409, so read `get_form` again and retry.
4. **Confirm** with `get_form`.

- A form with answers keeps them. A save makes a new revision and old check-ins keep the questions they were answered on.
- Changing a question's type starts a new key, so its trend restarts and conditions that pointed at it are cleared. Say so before doing it. Changing only the wording keeps the key and the trend.
- Changing a scale's range on a form with answers puts old 1 to 10 scores next to new 1 to 5 scores in the same trend. When the form has answers, offer `duplicate_form` with the new range instead and ask which the coach wants.
- `archive_form` retires a form: it cannot be assigned again, but running assignments keep going. `unarchive_form` undoes it. Deleting a form is done in the app.

## What to show

```text
Daily check-in (check-in, 14 questions)
 1  Weight upon waking        metric: Bodyweight (kg)
 2  Energy levels             scale 1-5, Exhausted to Full of energy, higher is better, required
 3  Mental and emotional stress  scale 1-5, Calm to Very stressed, lower is better, required
 4  Scheduled cardio done?    yes/no
 5  Cardio duration           number, min; only when 4 is yes
 ...
14  General comments          long text
Create it?
```

## When something is missing

- No metric matches a measurement the coach charts: offer a number question and say it will not appear in the client's charts.
- The server rejects a question (a label too long, a setting the type cannot carry): fix it from the error, or ask the coach when the fix changes the meaning.
- The coach wants a form deleted: say deleting is done in the app, and offer `archive_form`.
