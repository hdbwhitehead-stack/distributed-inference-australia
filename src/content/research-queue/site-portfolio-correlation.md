---
id: question-site-portfolio-correlation
question: >-
  How correlated are candidate sites across power constraints, weather, fibre,
  carriers, software, model storage and operating staff?
priority: high
category: site
why_it_matters: >-
  Several nominally independent cheap-power sites can fail together, leaving
  deadline and firm services dependent on expensive overflow.
next_action: >-
  Build a shared-failure matrix and backtest multi-site availability using
  constraint, outage, weather and carrier data; run loss-of-largest-site and
  common-mode failure scenarios before valuing portfolio diversity.
status: queued
related_theses:
  - thesis-distributed-inference-au
related_assumptions:
  - assumption-firm-reserve-is-affordable
  - assumption-warm-recovery-fits-power-window
source_ids:
  - source-power-2026-primer
  - source-distributed-inference-australia-handoff
updated_at: 2026-08-29
---

Geographic separation is not sufficient evidence of independent failure domains.
