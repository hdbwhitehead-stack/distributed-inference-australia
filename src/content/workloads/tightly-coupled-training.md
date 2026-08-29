---
id: workload-tightly-coupled-training
title: Cross-site parallelism and large distributed training
fit: very-poor
interruption_behavior: Requires concentrated fabric, shared storage and reliable power.
service_classes:
  - firm
rationale: >-
  The handoff states that WAN communication erases the benefit of cross-site
  tensor or pipeline parallelism and that large distributed training needs a
  concentrated cluster.
constraints:
  - Do not split a tightly coupled job across distant execution pools.
related_assumptions: []
source_ids:
  - source-distributed-inference-australia-handoff
reviewed_at: 2026-08-29
---

This category defines a boundary for the current thesis rather than an initial
customer target.
