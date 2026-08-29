---
id: question-power-compute-codispatch-model
question: >-
  What completed-work margin results when five-minute power availability and
  price are co-optimised with job deadlines, PUE, restart cost and firm overflow?
priority: critical
category: power
why_it_matters: >-
  Separate power and compute models can double-count flexibility and hide the
  cost of missed work, warm-up, forecast error or expensive backup capacity.
next_action: >-
  Backtest representative workloads against multi-year site-level traces,
  constraints, tariffs and weather; report accepted completed work, contribution
  margin, SLA misses, curtailed MWh used, retries and overflow by service class.
status: queued
related_theses:
  - thesis-distributed-inference-au
related_assumptions:
  - assumption-power-advantage-exceeds-utilisation-loss
  - assumption-warm-recovery-fits-power-window
  - assumption-firm-reserve-is-affordable
source_ids:
  - source-power-2026-primer
  - source-aer-wholesale-market-performance-2026
  - source-aemc-spot-and-contract-markets
updated_at: 2026-08-29
---

The model must preserve adverse intervals and outages. Monthly or regional
averages are not sufficient.
