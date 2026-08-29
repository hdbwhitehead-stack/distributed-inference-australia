---
id: assumption-warm-recovery-fits-power-window
statement: >-
  Site-local model caches, validated manifests and recovery procedures can make
  enough of an intermittent power window productive.
category: operations
status: open
confidence: low
updated_at: 2026-08-29
test: >-
  Measure cold and warm recovery, model movement, admission, drain and restart
  against representative power windows and fibre conditions.
owner: unassigned
related_evidence: []
related_decisions:
  - decision-rented-compute-prototype
---

The handoff warns that cold-loading large models can consume an available power
window and saturate fibre. This is an architecture requirement, not yet a proven
operating result.
