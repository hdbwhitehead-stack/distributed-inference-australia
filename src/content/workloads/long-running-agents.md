---
id: workload-long-running-agents
title: Deep-research, coding and security agents
fit: good
interruption_behavior: Preserve workflow state, sources, repositories, tests and completed steps.
service_classes:
  - deadline
  - flex
rationale: >-
  The handoff classifies long-running agents as a good fit where the workflow
  has durable, idempotent boundaries.
constraints:
  - Tool actions and billing acknowledgements need a durable job ledger.
  - Hidden workflow state can cause duplicated actions or lost progress.
related_assumptions:
  - assumption-flexible-demand-depth
  - assumption-warm-recovery-fits-power-window
source_ids:
  - source-distributed-inference-australia-handoff
reviewed_at: 2026-08-29
---

Transient model-serving state and durable business state must be handled
separately. WAN-scale KV-cache migration is not assumed.
