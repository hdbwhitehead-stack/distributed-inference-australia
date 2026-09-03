---
id: site-ph1-port-hedland
title: PH1 Port Hedland edge data centre
stage: screening
reviewed_at: 2026-09-03
source_ids:
  - source-nextdc-ph1-facility
  - source-uptime-institute-ph1-certification
  - source-vocus-horizon-live
  - source-vocus-horizon-network
public_location:
  state: WA
  locality: Port Hedland
  latitude: -20.3107
  longitude: 118.6012
  precision: locality
  source_ids:
    - source-nextdc-ph1-facility
    - source-uptime-institute-ph1-certification
site_type: colocation
owner: NEXTDC
priority: high
rationale: >-
  PH1 is an operating regional edge facility with independent Tier III design
  and constructed-facility certification, an advertised IT-capacity envelope,
  remote operations and newly live long-haul fibre with multiple routes out of
  the Pilbara. It is a credible test of regional high-density colocation. Public
  material does not establish spare capacity, dense-rack cooling, flexible
  power terms or an electricity-cost advantage.
next_action: >-
  Ask NEXTDC for a non-binding screening response covering available IT kW,
  rack and cooling density, liquid-cooling integration, electrical boundary,
  interval energy, firm and flexible pricing, network charges, fibre services,
  measured latency and Pilbara operating constraints.
next_review_at: 2026-10-03
capacity_observations: []
checks:
  - area: connection-and-boundary
    status: in-progress
    source_ids:
      - source-nextdc-ph1-facility
      - source-uptime-institute-ph1-certification
    reviewed_at: 2026-09-03
    finding: >-
      NEXTDC's current page reports 1 MW IT capacity while also describing PH1
      as a 1.5 MW facility, with N+1 main infrastructure and N+N power rails.
      Uptime Institute independently lists Tier III design and constructed
      facility awards. The sources do not reconcile the capacity boundaries or
      show spare capacity, connection entitlement, transformer headroom or a
      contractible allocation for one dense rack.
    next_action: >-
      Reconcile the 1 MW IT and 1.5 MW facility figures, then obtain offered IT
      capacity, single-line and metering diagrams, upstream supply terms,
      transformer and protection data, per-rack feeds and continuous-delivery
      conditions.
  - area: usable-energy-shape
    status: in-progress
    source_ids:
      - source-nextdc-ph1-facility
    reviewed_at: 2026-09-03
    finding: >-
      The operator markets 100% uptime and backup resilience. No five-minute
      facility or IT-load trace, interruption history, dynamic-load envelope,
      curtailment arrangement or recovery restrictions are public.
    next_action: >-
      Request twelve months of five-minute facility and IT-load data, outage and
      generator logs, ramp limits, maintenance events and the operating rules
      for any curtailable load product.
  - area: delivered-economics-and-value
    status: in-progress
    source_ids:
      - source-nextdc-ph1-facility
    reviewed_at: 2026-09-03
    finding: >-
      Public material establishes a colocation sales path but gives no PH1
      power price, network and demand charges, loss treatment, flexibility
      credit, backup-fuel allocation or contractual mechanism that passes local
      power-system value to the compute tenant.
    next_action: >-
      Obtain firm and flexible all-in offers and build a contractual settlement
      waterfall before assigning any value to Port Hedland's location.
  - area: fibre-and-latency
    status: in-progress
    source_ids:
      - source-nextdc-ph1-facility
      - source-vocus-horizon-live
      - source-vocus-horizon-network
    reviewed_at: 2026-09-03
    finding: >-
      PH1 says it hosts Vocus Horizon. Vocus reported the Perth-to-Port Hedland
      terrestrial route live in June 2026 and describes terrestrial, subsea and
      Darwin paths out of the Pilbara. This is stronger route evidence than a
      generic regional-fibre claim, but no bandwidth is reserved and price,
      service demarcations, shared risks and measured workload latency remain
      unknown.
    next_action: >-
      Obtain service and route diagrams, diversity guarantees and quotes; test
      latency, jitter and model-transfer time to Perth, Sydney, Singapore and the
      intended firm-overflow site under both normal and failed-route conditions.
  - area: thermal-physical-and-planning
    status: in-progress
    source_ids:
      - source-nextdc-ph1-facility
      - source-uptime-institute-ph1-certification
    reviewed_at: 2026-09-03
    finding: >-
      Independent records support a constructed Tier III facility, and NEXTDC
      describes N+1 in-row cooling and cold-aisle containment. The sources do
      not state per-rack heat rejection, liquid-cooling support, measured PUE,
      water use, summer or cyclone derating, floor loading or installation
      constraints for the proposed high-density equipment.
    next_action: >-
      Make rack-level electrical and thermal density the first technical kill
      test; then review measured hot-season performance, cyclone and flood
      procedures, cooling redundancy during maintenance, fire engineering and
      physical delivery paths.
  - area: counterparty-operations-and-security
    status: in-progress
    source_ids:
      - source-nextdc-ph1-facility
      - source-uptime-institute-ph1-certification
    reviewed_at: 2026-09-03
    finding: >-
      NEXTDC advertises 24/7 monitoring, biometric access, audited rack-key
      control, remote hands and ISO 27001, SOC 1 and SOC 2 credentials. The
      public pages do not establish the exact certification scope, incident and
      maintenance obligations, model-custody controls, liability allocation or
      support for bespoke high-density integration at PH1.
    next_action: >-
      Review the MSA, SLA, audit reports and responsibility matrix; test remote
      hands response, access evidence, tenant separation, media handling,
      incident escalation and operational-technology isolation.
open_questions:
  - What capacity is available now, at what rack density and for what contract tenor?
  - Can PH1 support direct-to-chip liquid cooling or another viable dense-rack design?
  - Does any interruptible or dynamic-load offer exist, and how would it change the all-in bill?
  - Which advertised fibre routes are contractually and physically independent end to end?
comments:
  - date: 2026-09-03
    author: Research review
    text: >-
      The public 1 MW and 1.5 MW figures are nameplate descriptions, not a claim
      that the project's separate 300 kW design envelope is available. Fibre is
      the strongest early check; power economics and rack density are the likely
      fast-fail questions.
notes: >-
  Candidate originated from public operator, certifier and network-operator
  sources. Locality coordinates are approximate. No operator engagement, quote,
  reservation, connection document or confidential site data has been obtained.
---

PH1 is a screening candidate, not a selected pilot site. Existing edge
infrastructure and unusually strong regional fibre evidence justify direct
diligence, while the absence of contractual power, cooling and commercial data
prevents any site-readiness conclusion.
