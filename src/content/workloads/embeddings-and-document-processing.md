---
id: workload-embeddings-and-document-processing
title: Embeddings, indexing and document processing
fit: excellent
interruption_behavior: Checkpoint by document or chunk and use idempotent record-level jobs.
service_classes:
  - deadline
  - flex
rationale: >-
  The handoff treats embedding, indexing, batch classification and extraction as
  naturally checkpointable background work.
constraints:
  - Customer data location, retention and access controls may be material.
  - Large documents or media can increase network and storage requirements.
related_assumptions:
  - assumption-flexible-demand-depth
source_ids:
  - source-distributed-inference-australia-handoff
reviewed_at: 2026-08-29
---

The workload fit does not remove the need for a customer-specific privacy,
security and completion-cost assessment.
