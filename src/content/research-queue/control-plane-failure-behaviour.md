---
id: question-control-plane-failure-behaviour
question: >-
  Can the control plane recover from site loss without lost durable work,
  duplicate customer action or duplicate billing?
priority: high
category: control-plane
why_it_matters: >-
  The claimed service depends on software converting variable site availability
  into a safe customer outcome.
next_action: >-
  Use rented capacity to run site-drain, abrupt-loss, idempotent-retry,
  duplicate-billing and firm-overflow demonstrations.
status: queued
related_theses:
  - thesis-distributed-inference-au
related_assumptions:
  - assumption-firm-reserve-is-affordable
  - assumption-warm-recovery-fits-power-window
source_ids:
  - source-distributed-inference-australia-handoff
updated_at: 2026-08-29
---

The core metric is accepted completed work after retries, not raw GPU busy time.
