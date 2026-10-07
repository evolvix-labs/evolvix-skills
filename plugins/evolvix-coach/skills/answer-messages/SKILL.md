---
name: answer-messages
description: >
  Drafts replies to an Evolvix coach's unread client messages in the coach's own voice and
  language, checks plan questions against the client's real plan, and sends each reply only after
  the coach approves it. Use whenever an Evolvix coach asks to answer or catch up on messages, draft
  replies, clear the inbox, see who is waiting for a reply, or reply to a named client, even if they
  never say chat. Dutch: "beantwoord mijn berichten", "wie wacht op antwoord", "maak conceptreacties".
---

# Answer messages

Replying to clients is the biggest daily time cost for an online coach. This skill reads every unread conversation, drafts one reply each in the coach's voice, and sends the replies the coach approves. Anything that needs the coach personally is flagged instead of drafted.

## Ground rules

- **Find the client, never guess.** Resolve a name with `list_clients`. When more than one client matches, ask which. Tools take the client's relationship id as `clientId`.
- **Read before you write.** Load the current state first. When a tool has a preview or a dry run, use it and show the result before the real call.
- **Nothing reaches a client without a yes.** Draft first, show the draft, and send only after the coach approves it. For a batch, show the count and two examples, then ask once.
- **Health red flags stop the playbook.** Pain, injury, illness, pregnancy, a medication change, signs of disordered eating, or weight loss faster than the plan allows: do not change training or nutrition and draft nothing to the client. Tell the coach what you saw, and offer a private note with `add_client_note` and a task with `create_task`.
- **A missing tool is a missing permission.** If a tool this skill needs is not available, tell the coach which permission to tick when they reconnect Evolvix (listed under Before you start) and stop. Never work around it with another tool.
- **Write like the coach, in the client's language.** Before drafting, read the coach's last few messages to that client with `get_messages` and match their length, warmth and sign-off. Write in the language the client uses with the coach; with no messages yet, use the coach's language from `get_me`. No emoji unless the coach uses them.

## Before you start

- `get_me` gives the coach's name and language.
- Sending needs "Send messages to clients for you." on the Evolvix consent screen. It starts unticked. Without it, draft only, show the drafts, and say how to grant it: reconnect Evolvix and tick that line. Marking a conversation read needs the same permission.
- Tasks need "Create, change, and delete tasks." Notes need "Add and update clients, their notes, tags, and invitations."

## Steps

1. `list_conversations` with `unread` true. Follow `cursor` until there are no more pages. An owner who wants the whole team's inbox passes `scope` all. Work oldest waiting first.
2. Learn the voice once: `list_saved_replies` (the coach's own wording, with tokens such as {first_name}), then the coach's own messages in the first few threads. Note length, warmth, greeting, sign-off, emoji and language.
3. For each conversation, `get_messages` with a `limit` of about 20. Find everything the client wrote since the coach last replied, and note the id of the newest message.
4. Add facts only when a question needs them:
   - "What do I eat today?", "can I swap my lunch?": `get_nutrition_day` for that date.
   - "What's my workout?", "can I move legs to Friday?": `get_training_calendar` for those dates.
   - Context on the person: `get_client_overview` and `list_client_notes`.
   Quote the plan. Never answer a plan question from memory.
5. Draft one reply per conversation. Mark it **needs you** instead of drafting when the message is about health (see the ground rules), is emotional or a complaint, or is about price, contract, refunds or ending the coaching.
6. Show all drafts in one list (format below). The coach approves, edits or skips each one. "Send them all" counts only after every draft was shown.
7. For each approved draft, `send_message` with the text and an `idempotencyKey`. Then `mark_conversation_read` with the id of the message you just sent as `lastReadMessageId`, so the thread leaves the unread list.
8. When a reply promises something ("I'll look at your plan tonight"), offer a task with `create_task` linked to the client. Offer `add_client_note` for facts worth keeping (a new injury, a holiday, a schedule change).
9. Close with counts: sent, skipped, needs you.

## Judgment

- Answer what was asked, first. One question, one short answer. Clients read replies on a phone.
- A reply that changes the plan ("move legs to Friday") is a promise until the change is made. Offer to make the change as a separate step (nutrition through the nutrition-by-training-day skill, training through the program-builder skill), or say the coach will do it.
- If the client sent several messages, answer them together in one reply, in their order.
- Praise effort before results, and keep corrections to one point per reply.
- Use a saved reply when it fits the question well. Fill its tokens yourself and adjust it to the thread; never paste one that only half fits.
- Photos, videos and files cannot be seen or sent here. When the client sent a form-check video or photos, say so and leave that reply to the coach.

## What to show

```text
1. Ada Jansen (waiting 6 h)
   Ada: "Can I swap tonight's pasta for the rice bowl?"
   Draft: "Hi Ada! Yes, the rice bowl is option 2 for dinner today and fits your training-day numbers. Enjoy! - Sam"

2. Ben de Vries (waiting 1 day): needs you
   Ben mentions his knee hurts after Saturday's squats. Not drafted. Want a private note and a task to call him?
```

## When something is missing

- `send_message` is not available: deliver the drafts only, and say that sending needs "Send messages to clients for you."
- The send fails because the client is archived or their Messaging module is off: report it for that client and carry on.
- A 429 response means the rate limit (about 20 writes a minute for connected apps; each reply is two writes). Wait for the time it gives, then continue. Never send a reply twice; the `idempotencyKey` protects a retry.
- No unread conversations: say the inbox is clear.
