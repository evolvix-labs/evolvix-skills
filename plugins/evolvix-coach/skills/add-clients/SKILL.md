---
name: add-clients
description: >
  Adds clients to Evolvix from a sentence or a pasted spreadsheet (moving from HubFit, Trainerize,
  Excel or another tool), checks every email first, imports up to 200 at a time, saves intake notes,
  and then sets each client up with a check-in, habits and a first task. Invitations go out only
  after the coach says so. Use whenever an Evolvix coach wants to add, import or move clients, says
  "new client", "here is my client list", "add Ada, ada@example.com", or wants to invite clients,
  even if they never say import. Dutch: "nieuwe klant toevoegen", "klanten importeren", "nodig Ada
  uit".
---

# Add clients

Adding a client is the first job in Evolvix, and moving a whole client list over is what decides whether a coach switches. This skill turns a sentence or a pasted table into clients, previews every row before writing, and sets the new clients up. Clients are added without an email by default; the invitation goes out when the coach is ready, usually after the plan is in place.

## Ground rules

- **Find the client, never guess.** Resolve a name with `list_clients`. When more than one client matches, ask which. Tools take the client's relationship id as `clientId`.
- **Read before you write.** Load the current state first. When a tool has a preview or a dry run, use it and show the result before the real call.
- **Nothing reaches a client without a yes.** Draft first, show the draft, and send only after the coach approves it. For a batch, show the count and two examples, then ask once.
- **Health red flags stop the playbook.** Pain, injury, illness, pregnancy, a medication change, signs of disordered eating, or weight loss faster than the plan allows: do not change training or nutrition and draft nothing to the client. Tell the coach what you saw, and offer a private note with `add_client_note` and a task with `create_task`.
- **A missing tool is a missing permission.** If a tool this skill needs is not available, tell the coach which permission to tick when they reconnect Evolvix (listed under Before you start) and stop. Never work around it with another tool.
- **Write like the coach, in the client's language.** Before drafting, read the coach's last few messages to that client with `get_messages` and match their length, warmth and sign-off. Write in the language the client uses with the coach; with no messages yet, use the coach's language from `get_me`. No emoji unless the coach uses them.

## Before you start

- Adding clients, notes, tags and invitations needs "Add and update clients, their notes, tags, and invitations." Tasks need "Create, change, and delete tasks." Both start ticked.
- The setup at the end needs "Fill in and submit check-ins, review them, and send feedback to clients." for check-in forms (starts unticked) and "Assign habits and log them." for habits.
- Every client needs a first name, a last name and an email. Never guess an email or how a full name splits; ask once for what is missing.

## Steps

1. **Read the input.** Turn the sentence or the pasted table into rows: first name, last name, email, and any tag names. Map the coach's columns (for a HubFit or Trainerize export, name, email and tags are usually enough). Show what you read and ask once about anything unclear.
2. **Choices that apply to all rows.** `list_practices`: always send a `practiceId`, and ask lifestyle or physique when the company has several and the text does not say. Owners with a team: `list_team` for the coaches (`coachUserIds`, `primaryCoachUserId`). `list_client_tags` to match tag names. Ask for a start date and a planned end date if the coach wants them.
3. **Check before writing.** One client: `check_client_email`. Many: `preview_client_import` with all rows and the shared `defaults` (up to 200 rows). Each email comes back as new or ready, a duplicate in the file, invalid, already a client here, already on the team here, archived here, or an existing Evolvix account elsewhere.
4. **Show the table**: name, email, state, practice, coach, tags, start date, and access. Rows that cannot be added are listed with the reason and left out:
   - A client here or a teammate here is skipped.
   - Archived here: restoring is done in the app; do not create a second record.
   - An existing Evolvix account (a client of another coach, say) can be added; the person keeps the name stored on their account.
   Ask for a yes.
5. **Access.** Access later is the default and sends no email. Use access invite only when the coach asks for it, and list the exact addresses and the count before the call.
6. **Write.** One client: `create_client` with an `idempotencyKey`. Many: `import_clients` with the ready rows, the `defaults` and an `idempotencyKey`. Import creates unknown tags by name.
7. **Dates per client.** Import rows cannot carry their own dates. When the sheet has a start or end date per client, set them afterwards with `update_client` (`startDate`, `plannedEndDate`), one client at a time.
8. **Intake notes.** Goals, injuries, allergies, diet, schedule and anything else from the input become one pinned staff note per client with `add_client_note` (`visibility` staff unless the coach wants the client to see it).
9. **Report** what was added, what was skipped and why, and who was emailed.
10. **Set them up**, each after a yes:
    - A check-in form: `list_forms` with `kind` checkin, then `assign_form_to_clients` with the form, the clients and a `schedule` (for example `frequency` weekly with a `weekday` and a `startDate`). It notifies each client, so show the list first.
    - Habits: `assign_habits` per client, up to 20 at once, from a template or written out (a name and a `goal` such as an amount of 8 glasses a day, or a yes-or-no habit on chosen days).
    - Tags after the fact: `tag_clients` with tag ids for many clients at once.
    - A first task per client with `create_task`, for example "Check in with Ada" three days out, linked to the client.
11. **Invite.** Ask separately whether to invite the clients added with access later now or once their plans are ready. Then `send_client_invitation` per client. When an invitation already exists (a client says the link expired), `resend_invitation` with the invitation id; it allows three resends an hour.

Nutrition targets and programs for the new clients belong to the nutrition-by-training-day and program-builder skills. Offer them after the setup.

## Judgment

- Preview every write. A pasted list always goes through `preview_client_import` first, and only the ready rows are imported.
- Ask only for what is missing. A coach moving 60 clients does not want 60 questions; collect the gaps into one question.
- An invitation is the client's first impression. Send it when there is something to see: a plan, a check-in, a welcome message.
- Copy the coach's usual setup: if the coach has a standard check-in form and habits, offer the same for each new client instead of designing new ones.
- Passwords are never set from Claude. The client sets their own from the invitation.

## What to show

```text
Ready to add (practice Lifestyle, coach Sam, access later: no emails)
| Name | Email | State | Tags |
| Ada Jansen | ada@example.com | new | January |
| Ben de Vries | ben@example.com | existing account | January |

Skipped
| Cleo Smit | cleo@example.com | already a client here |

Add these 2 clients?
```

## When something is missing

- Over 200 rows: split the list and import in parts.
- A timeout during an import: check `list_clients` before retrying, or retry with the same `idempotencyKey`. Never import the same rows twice.
- A 429 response: the rate limit is about 20 writes a minute for connected apps. Wait the time it gives and continue; per-client steps like dates and notes take a few minutes for a large list.
- A write refused for lack of permission: name the permission line above and stop.
