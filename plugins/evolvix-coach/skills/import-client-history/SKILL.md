---
name: import-client-history
description: >
  Brings a client's past weights and measurements into Evolvix from any export: HubFit, Trainerize,
  a coach's own spreadsheet or a Google Sheet. Reads the layout (a date column with one column per
  measurement, or one tab per week with the dates across), maps the columns to the client's metrics,
  converts Dutch dates, decimal commas and units, shows a dry run, writes after a yes, and leaves a
  client note with what was and was not imported. Use whenever an Evolvix coach wants to import,
  move or add a client's old weights, weigh-ins, measurements or progress history, pastes a table of
  weights, or shares a sheet or export with them, even if they never say import. Dutch: "gewichten
  importeren", "oude metingen overzetten", "geschiedenis van Dennis toevoegen".
---

# Import client history

A coach who moves to Evolvix brings months of daily weights and measurements. Without them the charts, the 7-day averages and the first review start from nothing. This skill reads the coach's file, matches it to the metrics the client tracks, shows what an import would do as a dry run, and writes it after a yes. Imported entries show in the charts like any other, are marked as imports, and trigger no automations or notifications.

## Ground rules

- **Find the client, never guess.** Resolve a name with `list_clients`. When more than one client matches, ask which. Tools take the client's relationship id as `clientId`.
- **Read before you write.** Load the current state first. When a tool has a preview or a dry run, use it and show the result before the real call.
- **Nothing reaches a client without a yes.** Draft first, show the draft, and send only after the coach approves it. For a batch, show the count and two examples, then ask once.
- **Health red flags stop the playbook.** Pain, injury, illness, pregnancy, a medication change, signs of disordered eating, or weight loss faster than the plan allows: do not change training or nutrition and draft nothing to the client. Tell the coach what you saw, and offer a private note with `add_client_note` and a task with `create_task`.
- **A missing tool is a missing permission.** If a tool this skill needs is not available, tell the coach which permission to tick when they reconnect Evolvix (listed under Before you start) and stop. Never work around it with another tool.
- **Write like the coach, in the client's language.** Before drafting, read the coach's last few messages to that client with `get_messages` and match their length, warmth and sign-off. Write in the language the client uses with the coach; with no messages yet, use the coach's language from `get_me`. No emoji unless the coach uses them.

## Before you start

- Importing needs "Log and change measurements and their goals." on the Evolvix consent screen. The note afterwards needs "Add and update clients, their notes, tags, and invitations." Both start ticked.
- A Google Sheet is read through the Google Drive connector in Claude. Without it, ask the coach to paste the cells or attach the file as CSV or Excel.
- The client has to exist in Evolvix already. The add-clients skill creates clients and hands their history to this skill.
- Know the client, the file and the unit of every measurement. Ask once for what is missing.

## Steps

1. **The client and the file.** `list_clients` for the client. The file is pasted cells, an attached CSV or Excel file, or a Google Sheet. For a sheet, open only the file the coach names or links and read every tab: the text the connector returns can stop early in a large workbook, so check that the last tab and the last date are there. With many tabs, read and convert them in groups.
2. **What the client tracks.** `list_client_metrics` gives each metric's key, name, unit and latest value. The keys go into the import; never make one up. A column that matches no metric waits until the coach adds that metric to the client in Evolvix (Add metric on the client's Metrics page, Metingen in Dutch), after which it shows up in this list.
3. **Read the layout** as described in [references/layouts.md](references/layouts.md): the header, the date column or the day columns, which columns or rows are measurements, and which are averages, comments or check-in answers to leave out. Convert dates, decimal commas and units as that page says. Keep a map from each row you build to its place in the file (tab, row, column) so you can point at a problem later.
4. **Ask once.** Gather everything unclear into one question: the date order when every date is ambiguous, a column without a unit, a column that may be an average, two weigh-ins on one day, a column that matches no metric. Do not stop for each cell.
5. **Build the rows.** One row per value: `date` as YYYY-MM-DD, the metric's `key`, the `value` as a plain number with a dot, and `unit` only when the file is in lb or in. No row for an empty cell, and one value per metric per day. A call takes at most 2,000 rows: split a longer history by date and treat the parts as one import.
6. **Dry run.** `import_metric_history` with `clientId` and `rows`. It saves nothing unless `dryRun` is false. The answer has `accepted` (the rows it would write), `conflicts` (days that already have a value, with the value in Evolvix and in the file, in the client's unit), `invalid` (each row's `index`, counted from 0 within that call, the field and the reason) and the totals `conflictCount` and `invalidCount`. Each list shows the first 100 rows only. Run every part before you show anything.
7. **Show the result** (format below): the counts, the date range, two examples of conflicts and two of invalid rows. Invalid rows usually share one cause, such as a text value, a unit or a tab laid out differently. Fix the reading and run the dry run again instead of listing hundreds of rows.
8. **Conflicts.** A day that already has a value is skipped by default, so nothing in Evolvix is overwritten. Ask whether to keep what is there or replace it with the file's value. For replace, run the dry run again with `onConflict` replace and show the new counts, including how many values it overwrites.
9. **Write after a yes.** The question names the count, the metrics, the date range and the note. Then call `import_metric_history` again for every part with `dryRun` false and the same rows and `onConflict` the coach saw. `written` should equal `accepted`.
10. **Check.** `get_metric_trend` for the main metric with `from` and `to` set to the imported range: the entries and the first and last values should match the file, apart from days the client already had.
11. **Leave a note.** `add_client_note` (staff only), titled with the source, listing the file and tabs read, the date range, the metrics with the number written for each, how conflicts were handled, the rows left out and why, and what could not be imported: old daily check-in answers (energy, hunger, stress and the like), comments, photos and training logs, which stay in the file. Write it after the write, from `written`, not from the preview.
12. **Close** with the counts in two lines, then offer a look at the trend with the client-review skill, or the next client.

**Several clients in one file** (a client column, or a tab per client): resolve each with `list_clients`, run steps 5 to 7 per client, show one table with the counts per client, and ask one yes for the group.

## Judgment

- **Existing days win.** Skip is the default. Replace only when the coach asks for it, and say how many values it overwrites.
- **Never fill in.** A day without a value stays without one: no averaging two days, no copying a neighbour, no 0 for a blank.
- **A weekly average is not a weigh-in.** Leave out average rows, columns and tabs. If the file has only averages, ask first and say that each would show as one weigh-in on its date.
- **Check the unit against the client.** The server accepts a wide range (20 to 400 kg for weight), so a weight in lb read as kg passes it. When the client already has weights, compare the file's newest ones with the latest value from `list_client_metrics`. A gap of about 20 percent or more is a unit slip, the wrong person's file or a real change: the coach decides before anything is written.
- **Check the name.** A file titled with another name than the client you picked gets a question, not an import.
- **Importing is bookkeeping, not review.** Do not judge the trend here; client-review does that. If the file mentions pain, injury, illness, pregnancy, medication or eating trouble, or the latest weeks show weight falling faster than about 1 percent a week, tell the coach in one line and offer a private note and a task. The numbers can still be imported; keep the health text out of the import note.
- **Only the file the coach names.** Never search the coach's Drive for other clients' sheets.

## What to show

```text
Dennis Visser, from "Tracker 2025" (3 tabs, 12 Mar to 5 Oct 2025)

How I read it
| Column | Metric | Note |
| Datum | date | day first: 12-03-2025 is 12 March 2025 |
| Gewicht | Bodyweight, kg | decimal commas |
| Taille | Waist, cm | |
| Gem. | left out | weekly average |
| Opmerking | left out | comments |

Dry run (nothing is saved yet)
- 412 new measurements: bodyweight 198, waist 214
- 6 days already have a value, kept unless you want them replaced
  12 Mar, bodyweight: 82.0 in Evolvix, 82.4 in the file
  13 Mar, bodyweight: 81.8 in Evolvix, 82.1 in the file
- 3 rows cannot be imported
  Week 14, Slaap, Wed: "n.v.t." is not a number
  Week 31, Gewicht, Sun: 8.24 is outside 20 to 400 kg (82.4?)
Left out on purpose: daily check-in answers (energy, hunger, stress).

Import the 412 new measurements and save a note on Dennis's file with this overview?
```

After the write: "Imported 412 measurements for Dennis (bodyweight 198, waist 214). Note saved."

## When something is missing

- `import_metric_history` is not available: the coach needs "Log and change measurements and their goals." Say so and stop. The coach can also paste or upload the table under Import history on the client's Metrics page.
- No Google Drive connector, or the sheet is not shared with the coach's Google account: ask for the cells or an export instead.
- Every row comes back invalid: stop, show the first reasons and read the layout again instead of trying variations.
- A write times out or fails in one part: run the dry run again for that part. Days that now show as conflicts with the same value were written. Skip is the default, so nothing can end up twice.
- A 429 response: the rate limit is about 20 writes a minute for connected apps. Wait the time it gives and continue.
