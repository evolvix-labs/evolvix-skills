# Evolvix skills for Claude

Skills that teach Claude to do the weekly coaching work in [Evolvix](https://evolvix.app): planning the day and answering messages, reviewing clients, calls and check-ins, setting nutrition by training day, building programs, adding clients with their history, building check-in forms and automations, and, for clients, logging a day from one sentence.

The Evolvix connector gives Claude the tools. These skills give it the playbook: the script or tools for each job, what good coaching judgment looks like, and when to stop and ask. Claude drafts and previews. Nothing reaches a client, changes a plan, or deletes anything until you say yes.

## What's inside

Two plugins, one for each side of the coaching relationship. Each skill is one recurring job; a skill with several modes keeps each mode on its own page.

**Evolvix for coaches** (`evolvix-coach`)

| Skill | Ask Claude something like |
| --- | --- |
| coach-today | "What needs me today?" "Who has gone quiet?" "Answer my messages." "Send Dennis his peak week planner." |
| review-clients | "How is Ada doing?" "Make a 12-week report for Ben." "Prep my call with Dennis." "Review this weekend's check-ins." |
| plan-training | "Build Ben a 4-day upper/lower for 8 weeks and start him Monday." "Voeg een kabel woodchop toe." |
| plan-nutrition | "Put Ada on 2,100 on training days and 1,800 on rest days, legs plus 300." "Put her training-day and rest-day menus in." |
| add-clients | "Add Ada, ada@example.com." "Here's my client list from HubFit." "Zet de gewichten uit mijn Excel over." "Ada stops." |
| forms-and-automations | "Make my daily check-in like this sheet." "When a client misses two check-ins, message them and give me a task." |

**Evolvix for clients** (`evolvix-client`)

| Skill | Ask Claude something like |
| --- | --- |
| my-coaching | "Two eggs and toast, squat 3x5 at 80, weight 74.8, water done." "What's my plan today?" "Move legs to Friday." "Do my check-in: 5 workouts, energy 7, slept badly." |

Check-in feedback that Claude writes is saved as a draft in Evolvix; the coach sends it from the app with one tap.

## Install

You need an Evolvix account. Coaches install **Evolvix for coaches**; clients of an Evolvix coach install **Evolvix for clients**. The marketplace is this repository, `evolvix-labs/evolvix-skills`, and it is named `evolvix`.

### Claude on the web, the desktop app, and Cowork

1. Open **Customize > Plugins**, choose **Add > Add marketplace**, and enter `evolvix-labs/evolvix-skills`.
2. Add **Evolvix for coaches** or **Evolvix for clients**.
3. Open the plugin's **Connectors** tab, add the Evolvix connector, and sign in with your Evolvix account.

The plugin is saved to your Claude account, so it is also available in Cowork and in Claude Code signed in to the same account.

### Claude Code, from the plugin panel

1. Run `/plugin` and open the **Marketplaces** tab.
2. Choose **Add marketplace** and enter `evolvix-labs/evolvix-skills`.
3. On the **Discover** tab, open **Evolvix for coaches** or **Evolvix for clients** and install it.
4. Run `/mcp`, pick `evolvix`, and sign in with your Evolvix account.

In the desktop app's **Code** tab the same panel is under **+ > Plugins > Add plugin**.

### Claude Code, from the command line

```text
/plugin install evolvix-coach --marketplace evolvix-labs/evolvix-skills
```

or in two steps, also from a shell with `claude plugin`:

```text
/plugin marketplace add evolvix-labs/evolvix-skills
/plugin install evolvix-coach@evolvix
```

Use `evolvix-client` for the client plugin. Turn on auto-update for the `evolvix` marketplace on the **Marketplaces** tab to get new skills as they ship.

### Other agents

`npx skills add evolvix-labs/evolvix-skills` installs the skills into other coding agents. Add the Evolvix MCP server at `https://api.evolvix.app/mcp` (OAuth sign-in) to the agent as well; the skills call its tools.

## Permissions

When you connect, Evolvix asks what Claude may do. Permissions that send things to people or touch sensitive data start unticked. Tick them only if you want the skills that need them:

| Permission on the consent screen | Starts | Needed for |
| --- | --- | --- |
| Send messages to clients for you. | unticked | Sending replies, cards and nudges (coach-today, review-clients) and the summary of a call (review-clients); a client's message to their coach |
| Fill in and submit check-ins, review them, and send feedback to clients. | unticked | Saving feedback drafts (review-clients), reopening or excusing a check-in (coach-today), assigning a check-in form (add-clients, forms-and-automations), a client's own check-in (my-coaching) |
| Add and update clients, their notes, tags, and invitations. | ticked | add-clients, starting, flagging and finishing a call (review-clients), notes and follow-ups in every coach skill |
| Create, change, and delete tasks. | ticked | Follow-up tasks in every coach skill, and the tasks made from a call's agreements (review-clients) |
| Change client nutrition setups, plans, day types, and food logs. | ticked | plan-nutrition, food in my-coaching |
| Schedule, move, and skip client workouts, assign programs, and log sessions. | ticked | plan-training, workouts in my-coaching |
| Create and change day types, foods, recipes, and library plans. | ticked | New day types, programs, workouts and exercises (plan-training, plan-nutrition), forms (forms-and-automations); showing a hidden library item to a client from a message (coach-today) |
| Log and change measurements and their goals. | ticked | Weight and measurements in my-coaching; importing a client's history (add-clients) |
| Assign habits and log them. | ticked | Habits in add-clients and my-coaching |
| Add, change, and delete documents and folders. | ticked | Showing a hidden document to a client from a message (coach-today) |
| Create and change packages, coupons, and applications. | unticked | Sharing a collection with a client from a message (coach-today) |
| Create and change automations and onboarding. | unticked | Automations in forms-and-automations (owners and admins) |

Everything the skills read is covered by the read permissions, which start ticked.

If a skill needs a permission you did not grant, Claude says which one and how to reconnect. It never works around it with another tool or function.

## How the skills behave

- **You approve every send.** Messages, call summaries, check-in feedback, invitations and plan changes are drafted first and sent only after your yes, and so is showing a hidden document to a client. Batches show a count and two examples before one yes.
- **Previews before changes.** In code mode every write comes back as a changeset of steps that runs only after your yes. Tools that move workouts, assign programs, or change day types run as a dry run first, so you see what changes (including the nutrition of affected days) before anything is saved. A history import does the same: you see how many measurements are new, which days already have a value and which rows cannot be read.
- **Health comes first.** Pain, illness, injury, pregnancy, medication changes, signs of disordered eating, or weight loss faster than the plan allows stop the playbook. Claude tells the coach and drafts nothing to the client.
- **Your voice and language.** Drafts follow the length, warmth and sign-off of your own recent messages, and the language of the person they are for (English or Dutch).

## Data

The skills are text instructions. They store nothing and send nothing anywhere. Claude reads and writes your Evolvix data only through the Evolvix connector, with the permissions you granted, and every call is recorded in your company's audit log. See the [Evolvix privacy policy](https://evolvix.app/privacy).

## Code mode and the classic tools

The Evolvix connector is moving to code mode: instead of about 290 tools it offers `search_api`, `execute` (one TypeScript script against the typed `evolvix` SDK, run on Evolvix's server) and `apply_changes` (applies the writes a script collected, after the person says yes). Each skill gives its reads as one script and its writes as a second one, and names the classic tools of the same names on one line under each script, so it works on both while the connector switches. The classic tools stay at `https://api.evolvix.app/mcp/classic`.

## Development

```text
python3 scripts/check.py --report
```

The check validates the marketplace, both plugins and every skill's frontmatter; that every tool or SDK method a skill names exists in `catalog/tools.json` and `catalog/evolvix.d.ts`; that every `ts` block type-checks with `tsc --strict` against `catalog/evolvix.d.ts`, as the body of an async function; and that the shared rules block is the same in every skill. It uses `tsc` on the PATH, or `npx typescript`; set `TSC` to choose another. Both catalog files are generated from the Evolvix server's tool registry (288 curated tools, each with its `method` name), so a renamed or removed tool fails the check instead of silently breaking a skill.

## License

[MIT](LICENSE)
