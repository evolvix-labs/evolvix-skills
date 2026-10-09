---
name: answer-messages
description: >
  Drafts replies to an Evolvix coach's unread client messages in the coach's own voice and
  language, checks plan questions against the client's real plan, attaches a document, program or
  plan as a card when the reply points to one, and sends each reply only after the coach approves
  it. Use whenever an Evolvix coach asks to answer or catch up on messages, draft replies, clear the
  inbox, see who is waiting for a reply, reply to a named client, or send a client a document,
  program or plan in chat, even if they never say chat. Dutch: "beantwoord mijn berichten", "wie
  wacht op antwoord", "maak conceptreacties", "stuur Dennis zijn peak week planner".
---

# Answer messages

Replying to clients is the biggest daily time cost for an online coach. This skill reads every unread conversation, drafts one reply each in the coach's voice, and sends the replies the coach approves. Anything that needs the coach personally is flagged instead of drafted. When a reply points at a document, program or plan, it goes with a card that opens the item in the client's app.

## Ground rules

- **Find the client, never guess.** Resolve a name with `list_clients`. When more than one client matches, ask which. Tools take the client's relationship id as `clientId`.
- **Read before you write.** Load the current state first. When a tool has a preview or a dry run, use it and show the result before the real call.
- **Nothing reaches a client without a yes.** Draft first, show the draft, and send only after the coach approves it. For a batch, show the count and two examples, then ask once.
- **Health red flags stop the playbook.** Pain, injury, illness, pregnancy, a medication change, signs of disordered eating, or weight loss faster than the plan allows: do not change training or nutrition and draft nothing to the client. Tell the coach what you saw, and offer a private note with `add_client_note` and a task with `create_task`.
- **A missing tool is a missing permission.** If a tool this skill needs is not available, tell the coach which permission to tick when they reconnect Evolvix (listed under Before you start) and stop. Never work around it with another tool.
- **Write like the coach, in the client's language.** Before drafting, read the coach's last few messages to that client with `get_messages` and match their length, warmth and sign-off. Write in the language the client uses with the coach; with no messages yet, use the coach's language from `get_me`. No emoji unless the coach uses them.

## Before you start

- `get_me` gives the coach's name and language.
- Sending needs "Send messages to clients for you." on the Evolvix consent screen. It starts unticked. Without it, draft only, show the drafts, and say how to grant it: reconnect Evolvix and tick that line.
- Tasks need "Create, change, and delete tasks." Notes need "Add and update clients, their notes, tags, and invitations."
- A card goes with the same permission as the message. Showing a hidden item to the client in the same step needs one more, by type: "Add, change, and delete documents and folders." for a document, "Create and change day types, foods, recipes, and library plans." for a resource, and "Create and change packages, coupons, and applications." for a collection (starts unticked). Without it, a hidden item cannot be shared from here.

## Steps

1. `list_conversations` with `unread` true. Follow `cursor` until there are no more pages. An owner who wants the whole team's inbox passes `scope` all. Work oldest waiting first.
2. Learn the voice once: `list_saved_replies` (the coach's own wording, with tokens such as {first_name}), then the coach's own messages in the first few threads. Note length, warmth, greeting, sign-off, emoji and language.
3. For each conversation, `get_messages` with a `limit` of about 20. Find everything the client wrote since the coach last replied, and note the id of the newest message.
4. Add facts only when a question needs them:
   - "What do I eat today?", "can I swap my lunch?": `get_nutrition_day` for that date.
   - "What's my workout?", "can I move legs to Friday?": `get_training_calendar` for those dates.
   - Context on the person: `get_client_overview` and `list_client_notes`.
   - A question about a document, program or plan the client should have: find it as described under Pointing at a document, program or plan.
   Quote the plan. Never answer a plan question from memory.
5. Draft one reply per conversation. Mark it **needs you** instead of drafting when the message is about health (see the ground rules), is emotional or a complaint, or is about price, contract, refunds or ending the coaching. When the reply points at a document, program or plan, show the card in the draft.
6. Show all drafts in one list (format below). The coach approves, edits or skips each one. "Send them all" counts only after every draft was shown.
7. For each approved draft, `send_message` with the text, any `references` and an `idempotencyKey`. Sending a reply also marks the thread read, so it leaves the unread list. For a thread the coach wants cleared without a reply, `mark_conversation_read` with the newest message's id as `lastReadMessageId`.
8. When a reply promises something ("I'll look at your plan tonight"), offer a task with `create_task` linked to the client. Offer `add_client_note` for facts worth keeping (a new injury, a holiday, a schedule change).
9. Close with counts: sent, skipped, needs you.

## Pointing at a document, program or plan

When a reply is about something the client can open in Evolvix, such as "where is my peak week planner?" or "is my new program ready?", attach it as a card instead of describing it or pasting a link. The card opens the item in the client's app. A message carries up to 5 cards, each once. When the coach asks for it directly ("stuur Dennis zijn peak week planner"), skip the inbox: resolve the client, read the last messages for the voice, and draft the sentence around the card.

1. **Find the item and its id. Never guess one.**
   - A document: the client's documents resource, `coaching://clients/{id}/documents` with the client's relationship id. It gives each document's id and name and whether the client can see it. If this chat cannot read resources, say so and leave the card to the coach.
   - A program: `list_programs` (filter with `q`). `list_program_assignments` shows whether the client has it.
   - A nutrition plan: `list_nutrition_plans` for this client.
   - A check-in form: `list_forms`. `list_checkin_assignments` shows whether the client has it.
   - A habit, resource, recipe or collection has no lookup here: the coach attaches those in the Evolvix chat.
2. **Show the card in the draft** on its own line, with its type and, when you know it, that the client cannot open it yet.
3. **Send** with `send_message`: the `body`, `references` (a list of `type` and `id`, where `type` is one of document, resource, program, nutrition_plan, form, habit, recipe or collection) and an `idempotencyKey`. The answer lists each card with its title.
4. **When the answer is not_shared**, nothing was sent. It names each item with a code:
   - not_shared: the client cannot open it yet, but a message can share it. The answer itself says to send again with `shareIfNeeded`; do that only after the coach's yes. Tell the coach what sharing does (a document becomes visible to this client, a resource is added to their documents, a collection is shared with everything in it) and ask. After a yes, send again with `shareIfNeeded` true and a new `idempotencyKey`: the first answer is stored under the old key, and a different request with the same key is refused. Never set `shareIfNeeded` on the first attempt or without a yes.
   - not_shareable: a message cannot share it. A program, plan, form or habit has to be assigned to the client first, and a recipe has to be in a recipe book or collection shared with them. Say which, offer to do it with the program-builder, nutrition-by-training-day or add-clients skill, and offer to send the text without the card. While any card in the message is not_shareable, nothing in it is shared.
5. **Sharing refused for a permission** (the answer says the token lacks a scope): name the permission under Before you start, or suggest sharing it in the app, and stop.

## Judgment

- Answer what was asked, first. One question, one short answer. Clients read replies on a phone.
- A reply that changes the plan ("move legs to Friday") is a promise until the change is made. Offer to make the change as a separate step (nutrition through the nutrition-by-training-day skill, training through the program-builder skill), or say the coach will do it.
- If the client sent several messages, answer them together in one reply, in their order.
- Praise effort before results, and keep corrections to one point per reply.
- Use a saved reply when it fits the question well. Fill its tokens yourself and adjust it to the thread; never paste one that only half fits.
- Photos, videos and files cannot be seen or sent here. When the client sent a form-check video or photos, say so and leave that reply to the coach. A document that already sits in Evolvix can go as a card.
- A card is not an explanation. Keep a sentence around it that says what it is and what to do with it. `get_messages` shows the cards already in the thread: do not send the same one again unless the client asks.

## What to show

```text
1. Ada Jansen (waiting 6 h)
   Ada: "Can I swap tonight's pasta for the rice bowl?"
   Draft: "Hi Ada! Yes, the rice bowl is option 2 for dinner today and fits your training-day numbers. Enjoy! - Sam"

2. Ben de Vries (waiting 1 day): needs you
   Ben mentions his knee hurts after Saturday's squats. Not drafted. Want a private note and a task to call him?

3. Dennis Visser (waiting 2 h)
   Dennis: "Where can I find my peak week planner?"
   Draft: "Hi Dennis, it's right here. Read it before Thursday and tell me what is unclear. - Sam"
   Card: Peak week planner (document), hidden from Dennis for now. I will ask before showing it to him.
```

## When something is missing

- `send_message` is not available: deliver the drafts only, and say that sending needs "Send messages to clients for you."
- The send fails because the client is archived or their Messaging module is off: report it for that client and carry on.
- A card is refused as an item that cannot be sent in this chat (the answer points at references and its number): the id is wrong or belongs to someone else. Look it up again; never retry with a guessed id.
- A 429 response means the rate limit (about 20 writes a minute for connected apps). Wait for the time it gives, then continue. Never send a reply twice; the `idempotencyKey` protects a retry.
- No unread conversations: say the inbox is clear.
