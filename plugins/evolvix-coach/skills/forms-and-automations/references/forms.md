# Forms

A check-in form's answers feed the coach's week grid, trends and call briefs. Pick each question's type from what the answer is, not from how the sheet looks.

| The line asks for | Type | Settings worth setting |
| --- | --- | --- |
| A score, "rate 1 to 10" | scale | `scaleLowLabel` and `scaleHighLabel` (at most 24 characters), `scaleDirection`, `scaleMin` (0 or 1) and `scaleMax` (3 to 10) when not 1 to 10 |
| A star rating | stars | `scaleDirection` |
| Weight, steps, waist, sleep hours the coach charts | metric | `metricId` from `listMetrics`; the answer lands in the client's chart |
| Any other count or amount | number | `numberUnit`, `numberDecimals`, `numberMin`, `numberMax` |
| One or several answers from a list | choice | `options`; `allowMultiple` and `maxChoices` for several |
| Yes or no | yes_no | `yesLabel`, `noLabel` only when worded differently |
| Free text | text | `textLength` short or long |
| A date | date | `dateLimit` |
| Progress photos | progress_photos | `poses` |
| Files or video | media | `mediaAccept`, `mediaMaxFiles` |
| Agreement to terms | signature | `signatureStatement` |

- A measurement the coach wants on a chart is a metric question, never a number question.
- `scaleDirection` says which end is good: higher for energy and sleep quality, lower for stress, soreness, hunger and cravings, neutral otherwise. The week grid colours by it.
- Mark a question required only when the coach says so or the form is short. Long daily forms with everything required get skipped.
- A follow-up question gets `showIf` with the earlier question's key: equals yes for a yes/no, any of option keys for a choice, at least or at most a value for a scale, stars, number or metric.

## A new form

```ts
const [forms, templates, metrics] = await Promise.all([
  evolvix.listForms({ q: "daily" }),
  evolvix.listFormTemplates({}),
  evolvix.listMetrics({}),
]);
return {
  similar: forms.map((f) => ({ id: f.id, name: f.name, kind: f.kind, questions: f.questionCount, clients: f.inUse })),
  templates: templates.map((t) => t.name),
  metrics: metrics.map((m) => ({ id: m.id, key: m.key, name: m.name, unit: m.unit })),
};
```

Tools: `list_forms`, `list_form_templates`, `list_metrics`.

A form with the same or a similar name: offer to change it or copy it (`duplicateForm`) instead of adding a second. A generic weekly check-in or intake can start from a template with `useFormTemplate`. Draft the form as a table (number, label, type, required, settings in plain words such as "1 to 5, Exhausted to Full of energy, higher is better"), ask about what the source leaves open in one message, and wait for the yes. Then one write script with `createForm` holding every question, plus `updateForm` for a default schedule if the coach gave one. After applying, `getForm` confirms the question count and keys.

```text
Daily check-in (check-in, 14 questions)
 1  Weight upon waking           metric: Bodyweight (kg)
 2  Energy levels                scale 1-5, Exhausted to Full of energy, higher is better, required
 3  Mental and emotional stress  scale 1-5, Calm to Very stressed, lower is better, required
 4  Scheduled cardio done?       yes/no
 5  Cardio duration              number, min; only when 4 is yes
 ...
Create it?
```

Assign only when asked: `assignFormToClients` notifies every client on it.

## Changing a live form

```ts
const form = await evolvix.getForm({ id: "<form id>" });
return {
  name: form.name, revision: form.revision, clients: form.inUse, answers: form.answers,
  questions: form.questions.map((q) => ({ key: q.key, label: q.label, type: q.type, required: q.required, scale: q.type === "scale" ? `${q.scaleMin}-${q.scaleMax}` : undefined })),
};
```

Tools: `get_form`, then `update_form_question`, `add_form_question`, `remove_form_question` or `reorder_form_questions`.

Every change reaches every assigned client from their next check-in: show the change and the client count, and ask. Make the smallest change, with the form's `revision` as `baseRevision`; a stale one answers 409, so read again. `reorderFormQuestions` takes every key once.

- Old check-ins keep the questions they were answered on; a save makes a new revision.
- Changing a question's type starts a new key: its trend restarts and conditions pointing at it are cleared. Say so first. Changing only the wording keeps the key and the trend.
- Changing a scale's range on a form with answers mixes old 1 to 10 scores with new 1 to 5 ones in one trend. Offer `duplicateForm` with the new range instead and ask.
- `archiveForm` retires a form (running assignments keep going); `unarchiveForm` undoes it. Deleting is done in the app.
