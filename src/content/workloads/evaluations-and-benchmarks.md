---
id: workload-evaluations-and-benchmarks
title: Model evaluations and benchmarks
fit: excellent
interruption_behavior: Retry independent cases or batches.
service_classes:
  - deadline
  - flex
rationale: >-
  The handoff identifies evaluation work as independently restartable and well
  suited to queued, completion-window execution.
constraints:
  - Preserve case-level results and idempotency.
  - Define a deadline for each run.
related_assumptions:
  - assumption-flexible-demand-depth
source_ids:
  - source-distributed-inference-australia-handoff
reviewed_at: 2026-08-29
---

Evaluation throughput should be assessed on completed cases, including retries,
rather than GPU busy time alone.
