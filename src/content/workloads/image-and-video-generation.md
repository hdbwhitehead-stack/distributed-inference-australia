---
id: workload-image-and-video-generation
title: Image and video generation
fit: good
interruption_behavior: Queue independent jobs and resume only at defined durable boundaries.
service_classes:
  - deadline
  - flex
rationale: >-
  The handoff identifies independently queued generation jobs as compatible with
  flexible capacity.
constraints:
  - Large customer inputs, outputs and model movement may make fibre a hard constraint.
related_assumptions:
  - assumption-flexible-demand-depth
source_ids:
  - source-distributed-inference-australia-handoff
reviewed_at: 2026-08-29
---

The applicable execution window must include data movement, not only GPU compute.
