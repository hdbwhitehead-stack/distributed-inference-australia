---
id: decision-rented-compute-prototype
date: 2026-08-28
decision: >-
  Build and test the control plane on rented cloud or Australian colocation
  capacity while replaying representative power traces and site failures.
status: active
rationale: >-
  This can test scheduling, routing, draining, retry, billing and firm overflow
  before physical deployment.
reversible: true
revisit_when: The software prototype has met its required demonstrations.
related_assumptions:
  - assumption-warm-recovery-fits-power-window
  - assumption-firm-reserve-is-affordable
related_evidence: []
---

The prototype is intended to establish safe accepted-work and billing behaviour,
not to simulate away the need for physical site diligence.
