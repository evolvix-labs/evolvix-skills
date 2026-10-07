# Physique clients: judge the week by the phase

Read this when the client's practice is physique, or a tag or note names a phase (off-season, maintenance, cut or prep, peak week, reverse). These are defaults; a coach's own rules win.

## The phase decides what a good week looks like

| Phase | Weight change per week | What matters most | Do not |
| --- | --- | --- | --- |
| Off-season or improvement | Slow gain, about +0.25 to 0.5 percent | Strength going up, waist staying in check, appetite, recovery | Treat a gain as a problem |
| Maintenance or diet break | Flat, within about 0.25 percent | Recovery, hunger, sleep, energy | Push for change |
| Cut or prep | About -0.5 to -1 percent | Rate of loss, strength kept, photos, hunger, sleep, digestion | Cut faster to catch up |
| Peak week | Not the measure | The coach's own protocol only | Touch water, sodium or carbohydrate yourself |
| Post-show or reverse | Controlled gain | Calories up in small steps, the pace of regain | Treat regain as failure |

## Where the phase comes from

There is no phase field. Read it, in order, from the coach's own notes (`list_client_notes`), an open bodyweight goal with its dates (`get_metric_trend` shows the open goal), a client tag such as phase:cut (`list_client_tags` and the client's tags in `get_client`), and otherwise ask the coach.

## Judging a physique week

- Weekly average weight against the phase target, read together with measurements (`get_metric_week`), strength on the main lifts (`get_training_stats`, and the records it lists) and the dates of progress photos. The scale never decides alone. A flat scale with a smaller waist and rising strength is a good week.
- Strength dropping two weeks in a row during a cut means recovery is slipping. Flag it before suggesting more cardio or fewer calories.
- Adjust in small steps: about 100 to 200 kcal, or one carbohydrate change on high or low days, then wait at least a week. Name the next adjustment, or "hold", with its reason.
- Refeeds and diet breaks are day types or one-off overrides, not plan rewrites. Changing them belongs to the nutrition-by-training-day skill.
- Contest prep counts weeks out to the show. Report "on pace" or "behind" for the date, never a crash fix.

## Hard limits

- No advice on performance-enhancing drugs, diuretics, or peak-week water and sodium manipulation. If a client brings them up, tell the coach and draft nothing to the client.
- Red flags stop the review in prep too: missed periods, dizziness, binge episodes, injuries, or loss well beyond the phase target.
