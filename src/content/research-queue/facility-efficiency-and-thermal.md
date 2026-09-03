---
id: question-facility-efficiency-and-thermal
question: >-
  What measured PUE, cooling capacity, thermal recovery and water use can small
  Australian sites sustain across summer, part-load and restart conditions?
priority: high
category: site
why_it_matters: >-
  Design efficiency can diverge from actual operation, and intermittent compute
  may move cooling and power equipment away from its efficient operating range.
next_action: >-
  Ask DBO1 Dubbo and PH1 Port Hedland first for supported rack-level electrical
  and thermal density and liquid-cooling options; if either passes, obtain
  interval facility and IT energy, ambient conditions, cooling limits, backup
  fuel use and maintenance data.
status: in-progress
related_theses:
  - thesis-distributed-inference-au
related_assumptions:
  - assumption-power-advantage-exceeds-utilisation-loss
  - assumption-warm-recovery-fits-power-window
source_ids:
  - source-nabers-energy-data-centres
  - source-aemo-connection-process-overview
  - source-leading-edge-dbo1-facility
  - source-nextdc-ph1-facility
updated_at: 2026-09-03
---

Both candidates advertise conventional aisle-based cooling but neither publicly
states a per-rack heat-rejection limit or liquid-cooling support. Aggregate
site or module capacity therefore cannot answer whether the reference rack is
physically compatible. Report energy per accepted completed workload as well as
PUE if a candidate passes the density screen.
