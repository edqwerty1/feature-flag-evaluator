Build a Feature Flag Evaluator widget.

You are given feature flags shaped like this:

{ "key": "new_checkout", "enabled": true, "rules": [ { "if": { "country": "UK", "plan": "pro" }, "then": "variant_a" }, { "if": { "country": "UK" }, "then": "variant_b" }, { "default": "control" } ] }

Your UI should let a user:

1. View all flags and their rules.

2. Edit rules inline: add/remove conditions, reorder, change the variant returned.

3. Evaluate any flag against an arbitrary user context (e.g. { country: "UK", plan: "pro" }) entered in a side panel, and show the result along with which rule matched.

4. Persist changes locally so a refresh does not lose work.

Seed it with 3 to 5 flags of varying complexity. The shape above is a starting point, change it if you have a better idea.