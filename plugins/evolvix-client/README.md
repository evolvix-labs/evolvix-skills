# Evolvix for clients

Three skills for clients of an [Evolvix](https://evolvix.app) coach: log a whole day from one sentence, see today's plan and make the small changes your coach allows, and fill in your check-in by talking to Claude.

## Use it

Connect the Evolvix connector from the plugin's Connectors tab (or `/mcp` in Claude Code), sign in with the account your coach invited, then ask in your own words:

| Skill | Ask something like |
| --- | --- |
| log-my-day | "Two eggs and toast, squat 3x5 at 80, weight 74.8, water done." |
| my-plan-today | "What's my plan today?" "Move legs to Friday." "What do I need to buy this week?" |
| do-my-checkin | "Do my check-in: 5 workouts, energy 7, slept badly." |

Claude shows what it will save and asks first. It never answers a question about how you feel for you, and anything about pain, illness or eating goes to your coach instead of a change to your plan.

## Data

The skills are instructions; they store and send nothing themselves. Claude reads and writes your Evolvix data through the Evolvix MCP server at `https://api.evolvix.app/mcp`, only with the permissions you grant when you connect. Your coach sees what you log, as they do in the app. See the [Evolvix privacy policy](https://evolvix.app/privacy).
