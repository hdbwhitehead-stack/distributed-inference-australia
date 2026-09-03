---
id: site-dbo1-dubbo
title: DBO1 Dubbo regional data centre
stage: screening
reviewed_at: 2026-09-03
source_ids:
  - source-leading-edge-dbo1-facility
  - source-leading-edge-colocation-services
  - source-essential-energy-regional-data-centres
public_location:
  state: NSW
  locality: Dubbo
  latitude: -32.2569
  longitude: 148.6011
  precision: locality
  source_ids:
    - source-leading-edge-dbo1-facility
    - source-essential-energy-regional-data-centres
site_type: colocation
owner: Leading Edge Data Centres
priority: high
rationale: >-
  DBO1 is an operating regional colocation facility with a disclosed modular
  power-and-cooling design, a public route to commercial enquiry and existing
  fibre and remote-operations claims. It is a lower-construction-risk test of
  whether a small regional facility can host dense inference equipment. Public
  material does not establish spare capacity, high-density rack support or any
  local power advantage.
next_action: >-
  Ask Leading Edge for a non-binding screening response covering immediately
  contractible IT kW, per-rack and per-row limits, liquid-cooling options,
  single-line and metering boundaries, interval energy, all-in pricing,
  dynamic-load terms, fibre routes and measured latency.
next_review_at: 2026-10-03
capacity_observations: []
checks:
  - area: connection-and-boundary
    status: in-progress
    source_ids:
      - source-leading-edge-dbo1-facility
      - source-essential-energy-regional-data-centres
    reviewed_at: 2026-09-03
    finding: >-
      The operator advertises 750 kW total site capacity, 375 kW IT load per
      module, N+1 supply and standard A/B rack feeds; Essential Energy separately
      corroborates an opened Dubbo facility in the regional network program.
      Neither source identifies the connection or metering boundary, spare
      capacity, transformer headroom, per-rack allocation or import entitlement.
    next_action: >-
      Obtain the offered IT allocation, executed supply terms, single-line
      diagram, transformer and protection schedule, PDU topology and a written
      statement of continuous power deliverable to one rack.
  - area: usable-energy-shape
    status: in-progress
    source_ids:
      - source-leading-edge-colocation-services
      - source-leading-edge-dbo1-facility
    reviewed_at: 2026-09-03
    finding: >-
      The public offer emphasises high uptime, UPS and backup generation. It
      provides no five-minute facility or IT-load trace, curtailment history,
      dynamic-load envelope or interruption-and-recovery terms.
    next_action: >-
      Request twelve months of five-minute facility and IT-load data, outage and
      generator logs, permitted ramp rates, minimum stable load and notification
      rules for any flexible operating mode.
  - area: delivered-economics-and-value
    status: in-progress
    source_ids:
      - source-leading-edge-colocation-services
    reviewed_at: 2026-09-03
    finding: >-
      Leading Edge describes power, cooling, network, security and monitoring as
      a bundled monthly colocation bill. No DBO1 quote, metering waterfall,
      demand-charge treatment, interruptibility credit or local physical-value
      mechanism is public.
    next_action: >-
      Obtain firm and flexible all-in quotes and reconcile every charge, credit,
      loss factor and escalation clause to the load boundary and completed-work
      model.
  - area: fibre-and-latency
    status: in-progress
    source_ids:
      - source-leading-edge-dbo1-facility
    reviewed_at: 2026-09-03
    finding: >-
      The operator reports N+1 network infrastructure, dark fibre to the Dubbo
      NBN point of interconnect and services up to 100 Gbps. Public material does
      not establish physically diverse last-mile routes, reserved bandwidth,
      price or measured latency to target customer and failover regions.
    next_action: >-
      Obtain carrier route diagrams and quotes, identify shared ducts and points
      of failure, and measure latency, jitter and transfer time to Sydney and the
      intended firm-overflow site.
  - area: thermal-physical-and-planning
    status: in-progress
    source_ids:
      - source-leading-edge-dbo1-facility
    reviewed_at: 2026-09-03
    finding: >-
      DBO1 advertises N+1 in-row direct-expansion cooling and hot-aisle
      containment. It does not disclose per-rack heat rejection, liquid-cooling
      support, measured PUE, water use, summer derating or the physical path for
      installing an unusually dense rack. Module-wide capacity is not evidence
      that concentrated rack density is feasible.
    next_action: >-
      Make per-rack electrical and thermal density the first technical kill
      test; then obtain summer design conditions, measured part-load PUE,
      installation method, floor loading, fire engineering and approval scope.
  - area: counterparty-operations-and-security
    status: in-progress
    source_ids:
      - source-leading-edge-dbo1-facility
      - source-leading-edge-colocation-services
    reviewed_at: 2026-09-03
    finding: >-
      Public materials describe a 24/7 NOC, remote hands, two-factor physical
      access, camera coverage, metered PDUs and SLA reporting. They do not
      establish certification scope, incident obligations, customer model
      custody, maintenance windows, liability allocation or bespoke integration
      capability at DBO1.
    next_action: >-
      Review the proposed MSA, SLA, audit reports and responsibility matrix;
      test remote-hands response, access logging, tenant separation, media
      handling and safe isolation from facility operational technology.
open_questions:
  - Can DBO1 allocate the required dense rack power and cooling without a module redesign?
  - Is any capacity currently uncontracted, and on what tenor and price basis?
  - Can the tariff reward flexible consumption, or is this simply conventional firm colocation?
  - Are the fibre paths physically diverse beyond the stated NBN point of interconnect?
comments:
  - date: 2026-09-03
    author: Research review
    text: >-
      The advertised 375 kW per module is deliberately not treated as proof that
      the project's separate 300 kW planning envelope can be served. The first
      call should try to disprove rack-density compatibility quickly.
notes: >-
  Candidate originated from public operator and distribution-network sources.
  Locality coordinates are approximate. No operator engagement, quote,
  reservation, connection document or confidential site data has been obtained.
---

DBO1 is a screening candidate, not a selected pilot site. It remains plausible
because substantial facility work already exists; it remains unproven because
the public evidence is aggregate and promotional rather than contractual or
measured at the proposed load boundary.
