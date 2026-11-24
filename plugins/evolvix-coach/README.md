# Evolvix for coaches

Six skills that let Claude do the weekly coaching work in [Evolvix](https://evolvix.app) through the Evolvix connector: run the day and the inbox, review clients, calls and check-ins, plan training and nutrition, add clients with their history, and build forms and automations.

## Use it

Connect the Evolvix connector from the plugin's Connectors tab (or `/mcp` in Claude Code), then ask in your own words:

| Skill | Ask something like |
| --- | --- |
| coach-today | "What needs me today?" "Who has gone quiet?" "Answer my messages." "Send Dennis his peak week planner." |
| review-clients | "How is Ada doing?" "Prep my call with Dennis." "Review this weekend's check-ins." |
| plan-training | "Build Ben a 4-day upper/lower for 8 weeks." "Voeg een kabel woodchop toe." |
| plan-nutrition | "Put Ada on 2,100 on training days and 1,800 on rest days." "Put her training-day menu in." |
| add-clients | "Here is my client list from my old app." "Import Dennis's weights from this sheet." "Ada stops." |
| forms-and-automations | "Make my daily check-in like this sheet." "When a client misses two check-ins, message them and give me a task." |

Claude drafts and previews. Nothing reaches a client, changes a plan, or is published until you say yes. Check-in feedback is saved as a draft that you send from the Evolvix app, and the summary of a call stays a draft until you say to send it.

## Code mode

When the Evolvix connector offers code mode (`search_api`, `execute`, `apply_changes`), Claude does each read in one script on Evolvix's server and gets back only what it needs, and every write comes back as a list of steps that runs only after your yes. On the classic tools the same skills call the tools one by one.

## Data

The skills are instructions; they store and send nothing themselves. Claude reads and writes your Evolvix data through the Evolvix MCP server at `https://api.evolvix.app/mcp`, only with the permissions you grant when you connect, and every call is recorded in your company's audit log. See the [Evolvix privacy policy](https://evolvix.app/privacy).
