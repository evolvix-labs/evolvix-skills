# How an Evolvix automation is built

`list_automation_triggers` and `list_automation_actions` are the source of truth for names and parameters. This page explains the structure around them.

## Kinds

- **Event rule** (`kind` event_rule): something happens to a client (a missed check-in, a tag added, no logs for some days) and the steps run for that client. Anchor: trigger_time.
- **Sequence** (`kind` sequence): a journey of steps over days or weeks after an anchor such as the start of the coaching relationship. Clients join through `apply_sequence` or a trigger. Anchor: relationship_start, or enrollment, purchase, custom_date or onboarding_complete.

## Triggers and their filters

Typical triggers: a missed check-in (filter: how many in a row), a missed workout (in a row), no logs for some days, the relationship ending (days before), a tag added or removed (which tags), a metric logged (which metric, a comparison and a value), a package bought or a subscription event (which packages), a new client, an accepted invitation, a published plan, a submitted questionnaire, a fixed schedule (cron, at one minute, in the company's time zone), and manual.

Repeating triggers re-enroll a client after their previous run has finished; one-time triggers enroll a client once. Set `settings.reenroll` only to change that on purpose.

## Steps and timing

- At most 40 steps per rule.
- Each step has an offset from the anchor. With days above 0 it runs that many days after the anchor day, at a time of day given in minutes from midnight. With days 0 it runs that many minutes (or hours) after the anchor.
- A step can repeat every so many days or weeks, a set number of times or until a day number.
- Chat messages, emails and notifications wait for the company's quiet hours. Tasks do not.

## Actions

Send a chat message (as the assigned coach, the owner or a named person), send an email, create a task for the coach, send a notification, assign a check-in form, share content, assign a habit, add a note, add or remove a tag, and turn a module on or off. Message text can use {first_name}, {last_name}, {coach_first_name} and {company_name}.

## Conditions

A step can carry up to 5 conditions (has a tag, misses a tag, no check-in for some days, a check-in waiting for review, the relationship at least a number of weeks old). A failed condition skips that run, or retries daily when set to.

## Publishing

- Publish mode new_only (the default) puts only new enrollments on the new version.
- Publish mode future cancels and rebuilds the scheduled runs of clients already enrolled.
- Editing a live rule changes its working copy; clients get the change on the next publish.
