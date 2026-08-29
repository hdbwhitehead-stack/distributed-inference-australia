---
id: site-candidate-screening-framework
record_type: screening-framework
status: framework
title: Candidate-site screening framework
reviewed_at: 2026-08-29
source_ids:
  - source-distributed-inference-australia-handoff
  - source-research-cockpit-handoff
screening_criteria:
  - Five-minute available generation, actual output and dispatch target at proposed load sizes.
  - Economic offloading, network curtailment, binding constraints and planned transmission changes.
  - Electrical placement, metering boundary, import capability, connection agreement and transformer headroom.
  - Delivered energy cost including retail, network and loss treatment.
  - Fibre routes, cost, latency, carrier diversity and management path.
  - Cooling, ambient conditions, land, planning and operations access.
  - Generator counterparty, electricity arrangement and curtailment priority.
  - Correlation with other sites across grid, weather, carrier, software and operations.
hard_blocks:
  - No executed connection agreement and single-line diagram for diligence.
  - No usable five-minute power trace at the proposed electrical boundary.
  - No credible fibre path or required customer latency cannot be met.
  - Local load is on the wrong side of the binding constraint.
candidate_fields:
  - electrical placement and metering boundary
  - reason for curtailment
  - five-minute available energy
  - import capability
  - transformer and connection headroom
  - fibre
  - cooling and ambient conditions
  - land and planning
  - generator counterparty
  - expected curtailment change after network upgrades
notes: >-
  This is a reusable diligence framework only. No customer, generator or
  candidate site record has been created from regional averages or plausible
  placeholder data.
---

Start every candidate with the electrical facts. The same headline curtailment
rate can represent economic offloading, a network constraint, system-security
direction, plant limitation or ordinary intermittency; a local compute load will
not capture each condition in the same way.
