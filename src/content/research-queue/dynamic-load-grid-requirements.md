---
id: question-dynamic-load-grid-requirements
question: >-
  What connection studies, ramp limits, power-quality controls, telemetry and
  operating obligations apply to a rapidly changing 300 kW, 1 MW or 5 MW compute load?
priority: critical
category: site
why_it_matters: >-
  A workload scheduler may be able to change GPU demand quickly while the network,
  facility and connection agreement impose different physical limits.
next_action: >-
  Take representative load profiles and two candidate single-line configurations
  to the relevant network service providers; obtain written requirements for
  modelling, harmonics, voltage, ramping, SCADA, protection, UPS/BESS and load shedding.
status: queued
related_theses:
  - thesis-distributed-inference-au
related_assumptions:
  - assumption-local-load-captures-value
  - assumption-warm-recovery-fits-power-window
source_ids:
  - source-aemo-connection-process-overview
  - source-power-2026-primer
updated_at: 2026-08-29
---

The result should define an admissible electrical operating envelope for the
control plane.
