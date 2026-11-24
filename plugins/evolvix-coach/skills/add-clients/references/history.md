# Import a client's history

A coach who moves to Evolvix brings months of weights and measurements. Without them the charts, 7-day averages and first review start from nothing. Read the file, match it to the client's metrics, dry-run the import, write after a yes, and leave a note. Imported entries show in charts, are marked as imports, and trigger no automations.

- **Only the file the coach names.** Never search the coach's Drive for other sheets. A Google Sheet is read with the Google Drive connector (check that the last tab and last date came through; read many tabs in groups); without it, ask for pasted cells or a CSV or Excel file.
- **Existing days win.** Skip is the default. Replace only when the coach asks, and say how many values it overwrites.
- **Never fill in.** No averaging two days, no copying a neighbour, no 0 for a blank. A weekly average is not a weigh-in: leave average rows and columns out.
- **Check the name and the unit.** A file titled with another name gets a question. The server accepts 20 to 400 kg, so a weight in lb read as kg passes: compare the file's newest weights with the client's latest; a gap of about 20 percent or more is for the coach to decide.
- **Bookkeeping, not review.** Health text in the file (pain, injury, illness, pregnancy, medication, eating trouble) or weight falling faster than about 1 percent a week: tell the coach in one line and keep it out of the import note.

## Read and dry-run

Read the layout as [layouts.md](layouts.md) says: header, date column or day columns, which rows are measurements and which are averages, comments or check-in answers. Convert dates, decimal commas and units. Keep a map from each row to its tab, row and column. Ask once about everything unclear.

```ts
const clientId = "<relationship id>";
const rows = [
  { date: "2025-03-12", key: "bodyweight", value: "82.4" },
  { date: "2025-03-12", key: "waist", value: "88.5" },
];
const [metrics, preview] = await Promise.all([
  evolvix.listClientMetrics({ clientId }),
  evolvix.importMetricHistory({ clientId, rows, onConflict: "skip" }),
]);
return {
  metrics: metrics.map((m) => ({ key: m.key, name: m.name, unit: m.unit, latest: m.latest })),
  accepted: preview.accepted,
  conflicts: { count: preview.conflictCount, examples: preview.conflicts.slice(0, 2) },
  invalid: { count: preview.invalidCount, examples: preview.invalid.slice(0, 3) },
  warnings: preview.warnings,
};
```

Tools: `list_client_metrics`, then `import_metric_history` (a dry run until `dryRun` is false).

Run `listClientMetrics` alone first when you do not know the keys yet: never make one up. A column with no matching metric waits until the coach adds it on the client's Metrics page (Metingen). One row per value, `value` as a plain number with a dot, `unit` only for lb or in. A call takes 2,000 rows at most: split by date and treat the parts as one import, one dry-run call per part in the same script. Invalid rows usually share one cause: fix the reading and run again instead of listing hundreds.

Show the counts, the date range, and two examples each of conflicts and invalid rows. For replace, run again with `onConflict` replace and show how many values it overwrites. After the yes (naming the count, the metrics, the range and the note), apply: `written` should equal `accepted`. Then check `getMetricTrend` over the imported range and save one staff note with `addClientNote`: the source, tabs read, date range, the count per metric from `written`, how conflicts were handled, rows left out and why, and what stays in the file (old daily check-in answers, comments, photos, training logs).

**Several clients in one file:** resolve each, dry-run each, show one table of counts per client and ask one yes for the group.

```text
Dennis Visser, from "Tracker 2025" (3 tabs, 12 Mar to 5 Oct 2025)

How I read it
| Column | Metric | Note |
| Datum | date | day first: 12-03-2025 is 12 March 2025 |
| Gewicht | Bodyweight, kg | decimal commas |
| Taille | Waist, cm | |
| Gem. | left out | weekly average |

Dry run (nothing is saved yet)
- 412 new measurements: bodyweight 198, waist 214
- 6 days already have a value, kept unless you want them replaced
  12 Mar, bodyweight: 82.0 in Evolvix, 82.4 in the file
- 3 rows cannot be imported
  Week 31, Gewicht, Sun: 8.24 is outside 20 to 400 kg (82.4?)

Import the 412 new measurements and save a note on Dennis's file with this overview?
```
