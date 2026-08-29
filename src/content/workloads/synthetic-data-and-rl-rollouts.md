---
id: workload-synthetic-data-and-rl-rollouts
title: Synthetic-data generation and RL rollouts
fit: excellent
interruption_behavior: Checkpoint by output shard, record or independent trajectory.
service_classes:
  - deadline
  - flex
rationale: >-
  Both workloads are described as divisible background work that can retry at
  natural boundaries.
constraints:
  - Track completed outputs to prevent duplicate work.
  - Account for dataset movement and output retention.
related_assumptions:
  - assumption-flexible-demand-depth
source_ids:
  - source-distributed-inference-australia-handoff
reviewed_at: 2026-08-29
---

These workloads are an initial workload class, not evidence of a named customer
or contracted demand.
