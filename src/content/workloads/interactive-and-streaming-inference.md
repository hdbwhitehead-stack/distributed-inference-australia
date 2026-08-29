---
id: workload-interactive-and-streaming-inference
title: Interactive chat and streaming voice or video
fit: poor
interruption_behavior: Requires continuity and low latency; route only to warm, firm capacity.
service_classes:
  - firm
rationale: >-
  The handoff says interactive chat is poor as the sole supply for flexible
  capacity, while streaming voice and video are poor because continuity and
  latency are core product requirements.
constraints:
  - Needs availability and latency objectives.
  - Cannot rely solely on interruptible-site diversity.
related_assumptions:
  - assumption-firm-reserve-is-affordable
source_ids:
  - source-distributed-inference-australia-handoff
reviewed_at: 2026-08-29
---

Interactive use may be protected by a firm tier or bounded overflow. It is not
evidence that it should run directly on a power-variable site.
