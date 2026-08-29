---
id: evidence-aemo-q4-2025-negative-prices
title: Q4 2025 negative-price frequency in the NEM
claim: >-
  AEMO reported zero or negative prices in about 31.0% of NEM dispatch intervals
  in Q4 2025, with materially higher frequencies in South Australia and Victoria.
stance: supports
confidence: high
source_type: regulatory
source_ids:
  - source-aemo-q4-2025-qed
  - source-distributed-inference-australia-handoff
source_name: Australian Energy Market Operator, Quarterly Energy Dynamics Q4 2025
source_url: https://www.aemo.com.au/-/media/files/major-publications/qed/2025/qed-q4-2025.pdf
reviewed_at: 2026-08-29
themes:
  - australia
  - power
  - pricing
related_theses:
  - thesis-distributed-inference-au
related_assumptions:
  - assumption-flexible-demand-depth
implications:
  - Batch inference aligned with lower-price intervals is worth investigating.
  - The potential benefit depends on delivered price, operating window and customer completion terms.
next_verification: >-
  Model site-level delivered energy cost, including import, retail, network and
  loss charges, rather than relying on regional spot-price frequency.
---

The handoff notes that 86% of negative intervals were between -A$30/MWh and zero,
with an average near -A$19.4/MWh. The source does not support assuming unusually
large payments to consume electricity.
