---
id: question-usable-five-minute-energy
question: >-
  What annual usable MWh, ramps, interruption frequency, duration and restart
  limits exist at 250 kW, 1 MW and 5 MW load levels?
priority: critical
category: power
why_it_matters: >-
  Available MWh and recovery behaviour determine effective billable utilisation,
  not the site's nameplate MW.
next_action: >-
  Underwrite five-minute traces and simulate admission, drain, warm-up, retry and
  firm overflow under conservative forecasts.
status: queued
related_theses:
  - thesis-distributed-inference-au
related_assumptions:
  - assumption-local-load-captures-value
  - assumption-warm-recovery-fits-power-window
source_ids:
  - source-distributed-inference-australia-handoff
updated_at: 2026-08-29
---

Separate economic offloading, network curtailment, interconnector limits,
system-security constraints, plant limits and ordinary intermittency.
