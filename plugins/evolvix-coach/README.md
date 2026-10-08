# Evolvix for coaches

Eight skills that let Claude do the weekly coaching work in [Evolvix](https://evolvix.app) through the Evolvix connector: plan the day, answer messages, review check-ins, review one client, set nutrition by training day, build and assign programs, add or import clients, and design automations.

## Use it

Connect the Evolvix connector from the plugin's Connectors tab (or `/mcp` in Claude Code), then ask in your own words:

| Skill | Ask something like |
| --- | --- |
| coach-morning-brief | "What needs me today?" "Who has gone quiet?" |
| answer-messages | "Answer my messages." |
| weekly-checkin-review | "Review this weekend's check-ins." |
| client-review | "How is Ada doing?" |
| nutrition-by-training-day | "Put Ada on 2,100 on training days and 1,800 on rest days." |
| program-builder | "Build Ben a 4-day upper/lower for 8 weeks." |
| add-clients | "Here is my client list from my old app." |
| automation-designer | "When a client misses two check-ins, message them and give me a task." |

Claude drafts and previews. Nothing reaches a client, changes a plan, or is published until you say yes. Check-in feedback is saved as a draft that you send from the Evolvix app.

## Data

The skills are instructions; they store and send nothing themselves. Claude reads and writes your Evolvix data through the Evolvix MCP server at `https://api.evolvix.app/mcp`, only with the permissions you grant when you connect, and every call is recorded in your company's audit log. See the [Evolvix privacy policy](https://evolvix.app/privacy).
