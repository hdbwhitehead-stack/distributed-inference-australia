---
id: decision-service-classes
date: 2026-08-28
decision: >-
  Design explicit firm, deadline and flex service classes rather than present
  variable infrastructure as conventional uniform cloud capacity.
status: active
rationale: >-
  Customer commitments, scheduling authority and failover requirements differ by
  latency, completion-window and interruption tolerance.
reversible: true
revisit_when: Paying design partners validate different service definitions.
related_assumptions:
  - assumption-flexible-demand-depth
  - assumption-firm-reserve-is-affordable
related_evidence:
  - evidence-sail-completion-window
---

Firm traffic needs reserved conventional capacity; deadline traffic may overflow
as its completion time approaches; flex traffic is interruptible and best effort.
