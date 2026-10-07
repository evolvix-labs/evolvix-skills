---
name: do-my-checkin
description: >
  Fills in a client's due Evolvix check-in from what they say ("5 workouts, energy 7, weight
  74.8, slept badly"), asks only for what is still missing, shows every answer, and sends it to the
  coach after a yes. Also reads the coach's feedback on earlier check-ins. Use whenever a client of
  an Evolvix coach wants to do, fill in or finish their check-in, answers check-in questions in
  chat, or asks what their coach said about their check-in. Dutch: "doe mijn check-in", "check-in
  invullen", "wat zei mijn coach".
---

# Do my check-in

The weekly check-in is how a coach follows a client. This skill opens the due check-in, fills in what the client said, asks for anything still missing, and sends it after the client sees every answer. Photo, video and signature questions are finished in the Evolvix app.

## Ground rules

- **Know whose plan it is.** Start with `list_my_relationships`. With one coach, use that relationship; with several, ask which coach this is about.
- **Show it, then save it.** Before any write, show exactly what will be saved, with the date and units, and save after the client says yes. Afterwards, confirm in one line per item.
- **Never invent an answer.** Use what the client said and what is already logged. Ask about anything else, and say where a pre-filled number came from.
- **Health goes to the coach.** If the client mentions pain, injury, illness, pregnancy, a medication change, or trouble with eating, do not give medical advice or change their plan. Suggest telling their coach and offer to draft that message.
- **A missing tool is a missing permission.** If a tool this skill needs is not available, say which permission to tick when reconnecting Evolvix and stop.

## Before you start

Filling in and sending a check-in needs "Fill in and submit check-ins, review them, and send feedback to clients." on the Evolvix consent screen. It starts unticked: if the tools are missing, say the client can tick it when they reconnect Evolvix, or do the check-in in the app.

## Steps

1. **Find the check-in.** `list_my_due_checkins` lists open and upcoming check-ins with their state and window. None open: say when the next one opens and stop. Several open: ask which. When none is due and the client wants an extra one, a form may allow it: ask the client which form.
2. **Open it.** `start_checkin` with the due check-in's relationship as `clientId` and its `dueId`. It returns the questions, any answers saved so far, and context such as the last values and today's logged entries. Calling it again returns the same draft.
3. **Map the client's words to the questions**, by question key and type: a number, text, yes or no, a scale, stars, choices, a date, or a metric value with its unit (weight, waist). Use numbers already logged this week only when the client agrees, and say where each came from.
4. **Ask for what is missing**: every required question still empty, in one short list. Never answer a question about feelings, energy, mood, sleep quality or adherence for the client.
5. **Photo, video and signature questions** cannot be answered here. If they are optional, mark them skipped when the client wants. If one is required, save the rest and tell the client to finish it in the app, then stop before sending.
6. **Save** with `save_checkin_answers`: the check-in id as `cid` and one answer per question, holding the question's `key` and only the field for its type (`number`, `text`, `yes`, `scale`, `stars`, `options`, `date`, or `value` with `unit` for a metric).
7. **Show every answer** and say which ones go onto the client's chart (a weight answer becomes that day's weigh-in and replaces one already logged). Ask: "Send it to your coach?"
8. **Send** with `submit_checkin` (the `cid` and an `idempotencyKey`) after a yes. If it answers that values would be overwritten, show the listed values and pass `confirmOverwrite` true only after the client agrees.
9. **Confirm** it is sent. If the client mentioned something for the coach that does not fit a question, offer a short message with `send_message` after a yes.

**What did my coach say?** `list_client_checkins` with the client's relationship gives the sent check-ins, newest first; `get_checkin` with one of them shows the coach's feedback and comments.

## Judgment

- Short questions get short answers. Do not turn the check-in into an interview.
- Units: weight in the unit the question asks for; convert pounds to kilograms only when the question is in kilograms, and say so.
- A sent check-in the coach has not reviewed can still be changed: save the new answers and send again.
- If an answer mentions pain, illness, a hard week emotionally, or trouble with eating, record it as the client said it, add no advice, and suggest also messaging the coach.

## What to show

```text
Your weekly check-in (closes Thursday)
- Weight: 74.8 kg (goes on your chart for today)
- Workouts this week: 5
- Energy (1-10): 7
- Sleep quality (1-10): 4 ("slept badly")
- Anything else for your coach: (empty, optional)
- Front, side and back photos: please add these in the app

Send it to your coach?
```

## When something is missing

- No open check-in: give the date the next one opens.
- A required photo or signature: everything else is saved; the client finishes in the app.
- The check-in window has closed: say so and suggest asking the coach to reopen it.
