---
id: decision-pilot-one-rack-design-case
date: 2026-08-31
decision: >-
  Use one Vera Rubin NVL72 rack at an assumed 1.25 PUE as the reference pilot
  configuration, represented by a rounded 300 kW facility-meter planning envelope.
status: active
rationale: >-
  The cited practitioner estimate of 180–220 kW rack TDP implies 225–275 kW at
  1.25 PUE. Rounding the upper result to 300 kW gives a stable screening case
  while preserving that the underlying rack input and PUE remain provisional.
reversible: true
revisit_when: >-
  A supplier provides binding maximum input and integration data, the selected
  accelerator platform changes, or facility design replaces the 1.25 PUE assumption.
related_assumptions:
  - assumption-power-advantage-exceeds-utilisation-loss
  - assumption-one-rack-pue
related_evidence:
  - evidence-vera-rubin-one-rack-power-envelope
design_case:
  rack_platform: NVIDIA Vera Rubin NVL72
  rack_power_kw_low: 180
  rack_power_kw_high: 220
  pue: 1.25
  calculated_facility_kw_low: 225
  calculated_facility_kw_high: 275
  screening_envelope_kw: 300
  boundary: facility-meter-load
  input_confidence: medium
---

The 300 kW figure is a project planning boundary at the facility meter. It is
not IT load, a connection entitlement, a site's available energy, expected
operating draw or customer-reserved compute capacity. Candidate records must
evidence those quantities separately and identify their electrical boundary.
