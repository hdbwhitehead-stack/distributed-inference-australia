---
id: evidence-nem-local-price-settlement-gap
title: Local congestion value is not automatically the load's settlement price
claim: >-
  AEMO explains that scheduled resources are dispatched using local prices while
  NEM energy is generally settled at the regional reference price, adjusted for
  applicable loss factors.
stance: challenges
confidence: high
source_type: regulatory
source_ids:
  - source-aemo-guide-to-mis-pricing
  - source-aemc-spot-and-contract-markets
source_name: Australian Energy Market Operator, Guide to Mis-pricing Information
source_url: https://www.aemo.com.au/-/media/files/electricity/nem/security_and_reliability/dispatch/policy_and_process/guide-to-mis-pricing-information.pdf
reviewed_at: 2026-08-29
themes:
  - power
  - settlement
  - congestion
  - contracts
related_theses:
  - thesis-distributed-inference-au
related_assumptions:
  - assumption-local-load-captures-value
  - assumption-power-advantage-exceeds-utilisation-loss
implications:
  - A physically helpful load may fail to receive the local value it creates.
  - Retail, hedge, metering and generator contracts must allocate the value of avoided curtailment or low-price operation.
  - A flat or poorly structured supply contract may remove the economic benefit of flexible scheduling.
next_verification: >-
  Obtain a candidate retail or power term sheet and reconcile every price,
  network, loss, demand, metering, certificate and curtailment term to the
  proposed operating strategy.
---

This is a central translation difference between the US nodal examples in Power
2026 and the NEM. The correct financial boundary cannot be inferred from physical
co-location alone.
