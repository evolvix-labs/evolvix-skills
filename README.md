# Evolvix skills for Claude

Skills that teach Claude to do the weekly coaching work in [Evolvix](https://evolvix.app): reviewing check-ins, answering messages, setting nutrition by training day, building programs, and, for clients, logging a day from one sentence.

The Evolvix connector gives Claude the tools. These skills give it the playbook: which tools to call in which order, what good coaching judgment looks like, and when to stop and ask. Claude drafts and previews. Nothing reaches a client, changes a plan, or deletes anything until you say yes.

## What's inside

Two plugins, one for each side of the coaching relationship. Each skill is one recurring job.

**Evolvix for coaches** (`evolvix-coach`)

| Skill | Ask Claude something like |
| --- | --- |
| coach-morning-brief | "What needs me today?" "Who has gone quiet?" |
| answer-messages | "Answer my messages." "Who is waiting for a reply?" |
| weekly-checkin-review | "Review this weekend's check-ins." |
| client-review | "How is Ada doing?" "Make a 12-week report for Ben." |
| nutrition-by-training-day | "Put Ada on 2,100 on training days and 1,800 on rest days, legs plus 300." |
| program-builder | "Build Ben a 4-day upper/lower for 8 weeks and start him Monday." |
| add-clients | "Add Ada, ada@example.com." "Here's my client list from HubFit." |

**Evolvix for clients** (`evolvix-client`)

| Skill | Ask Claude something like |
| --- | --- |
| log-my-day | "Two eggs and toast, squat 3x5 at 80, weight 74.8, water done." |
| my-plan-today | "What's my plan today?" "Move legs to Friday." |
| do-my-checkin | "Do my check-in: 5 workouts, energy 7, slept badly." |

Check-in feedback that Claude writes is saved as a draft in Evolvix; the coach sends it from the app with one tap.

## Install

You need an Evolvix account. Coaches install **Evolvix for coaches**; clients of an Evolvix coach install **Evolvix for clients**.

### Claude on the web, the desktop app, and Cowork

1. Open **Customize > Plugins**, choose **Add > Add marketplace**, and enter `nilpntr/evolvix-skills`.
2. Add **Evolvix for coaches** or **Evolvix for clients**.
3. Open the plugin's **Connectors** tab, add the Evolvix connector, and sign in with your Evolvix account.

The plugin is saved to your Claude account, so it is also available in Cowork and Claude Code.

### Claude Code

```text
/plugin marketplace add nilpntr/evolvix-skills
/plugin install evolvix-coach@evolvix
```

Use `evolvix-client@evolvix` for the client plugin. Run `/mcp`, pick `evolvix`, and sign in.

### Other MCP clients

Add the Evolvix MCP server at `https://api.evolvix.app/mcp` (OAuth sign-in), then copy the skill folders you want from `plugins/*/skills/` into your client's skills directory.

## Permissions

When you connect, Evolvix asks what Claude may do. Permissions that send things to people or touch sensitive data start unticked. Tick them only if you want the skills that need them:

| Permission on the consent screen | Starts | Needed for |
| --- | --- | --- |
| Send messages to clients for you. | unticked | Sending replies and nudges (answer-messages, coach-morning-brief, client-review); a client's message to their coach |
| Fill in and submit check-ins, review them, and send feedback to clients. | unticked | Saving feedback drafts (weekly-checkin-review), reopening or excusing a check-in (coach-morning-brief), assigning a check-in form (add-clients), a client's own check-in (do-my-checkin) |
| Add and update clients, their notes, tags, and invitations. | ticked | add-clients, notes and follow-ups in every coach skill |
| Create, change, and delete tasks. | ticked | Follow-up tasks in every coach skill |
| Change client nutrition setups, plans, day types, and food logs. | ticked | nutrition-by-training-day, food in log-my-day and my-plan-today |
| Schedule, move, and skip client workouts, assign programs, and log sessions. | ticked | program-builder, workouts in log-my-day and my-plan-today |
| Create and change day types, foods, recipes, and library plans. | ticked | New day types, programs and workouts (program-builder, nutrition-by-training-day) |
| Log and change measurements and their goals. | ticked | Weight and measurements in log-my-day |
| Assign habits and log them. | ticked | Habits in add-clients and log-my-day |

Everything the skills read is covered by the read permissions, which start ticked.

If a skill needs a permission you did not grant, Claude says which one and how to reconnect. It never works around it with another tool.

## How the skills behave

- **You approve every send.** Messages, check-in feedback, invitations and plan changes are drafted first and sent only after your yes. Batches show a count and two examples before one yes.
- **Previews before changes.** Tools that move workouts, assign programs, or change day types run as a dry run first, so you see what changes (including the nutrition of affected days) before anything is saved.
- **Health comes first.** Pain, illness, injury, pregnancy, medication changes, signs of disordered eating, or weight loss faster than the plan allows stop the playbook. Claude tells the coach and drafts nothing to the client.
- **Your voice and language.** Drafts follow the length, warmth and sign-off of your own recent messages, and the language of the person they are for (English or Dutch).

## Data

The skills are text instructions. They store nothing and send nothing anywhere. Claude reads and writes your Evolvix data only through the Evolvix connector, with the permissions you granted, and every call is recorded in your company's audit log. See the [Evolvix privacy policy](https://evolvix.app/privacy).

## Development

```text
python3 scripts/check.py --report
```

The check validates the marketplace, both plugins, every skill's frontmatter, and that every tool a skill names exists in `catalog/tools.json`. The catalog is generated from the Evolvix server's tool registry, so a renamed or removed tool fails the check instead of silently breaking a skill.

## License

[MIT](LICENSE)
