---
id: question-nem-local-value-capture
question: >-
  Through which metering, retail, hedge, generator and network arrangements can
  a local compute load retain the value of avoided curtailment or low-price operation?
priority: critical
category: power
why_it_matters: >-
  NEM dispatch uses local prices while settlement is generally regional. A load
  can be physically useful without receiving the financial benefit.
next_action: >-
  Obtain at least two real supply or co-location term sheets and build a
  settlement waterfall covering spot exposure, network and demand charges,
  losses, retail margin, metering, curtailment value, certificates, import and firming.
status: queued
related_theses:
  - thesis-distributed-inference-au
related_assumptions:
  - assumption-local-load-captures-value
  - assumption-power-advantage-exceeds-utilisation-loss
source_ids:
  - source-power-2026-primer
  - source-aemo-guide-to-mis-pricing
  - source-aemc-spot-and-contract-markets
updated_at: 2026-08-29
---

The output should be a cash settlement model that reconciles to invoices and
contracts, not a wholesale-price chart.
