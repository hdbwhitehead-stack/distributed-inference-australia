# Distributed Inference Australia — project state

**Last updated:** 31/08/2026

**Status:** Research and structured feasibility

**Canonical repository:** <https://github.com/hdbwhitehead-stack/distributed-inference-australia>

**Public research cockpit:** <https://hdbwhitehead-stack.github.io/distributed-inference-australia/>

## Purpose

This file is the short, current entry point for a new chat or collaborator. It
summarises the project without replacing the dated, source-linked records under
`src/content/`. If this summary conflicts with a structured record, the
structured record and its source history take precedence.

The project is testing whether distributed, grid-responsive inference can
produce better customer outcomes than concentrated capacity after utilisation,
retries, fibre, reserve capacity, depreciation and operating costs are included.

## Current position

The opportunity remains a **conditional go for a structured feasibility and
pilot program**. There is enough evidence to justify serious research. There is
not enough evidence to buy a megawatt of accelerators, build a greenfield data
centre or claim that a specific Australian site is viable.

No investment or deployment conclusion has been reached. The immediate goal is
to replace broad market plausibility with site-specific, customer-specific and
contract-specific evidence.

The current thesis has medium confidence and remains in testing. Its most
credible initial form is a fleet of small, quickly energised, mostly firm or
grid-backed execution sites with curtailment flexibility. Genuinely
intermittent sites may be better suited to customer-owned, older or heavily
depreciated hardware than to newly purchased premium accelerators.

## What the research supports

- Inference contains divisible workloads that can be routed as complete jobs or
  requests across sites; tightly coupled training is a poor fit.
- Australian curtailment, negative pricing and constrained connections justify
  investigating flexible compute, but regional statistics do not establish a
  site's usable energy or commercial value.
- A local load only helps when it sits on the correct side of the binding
  electrical constraint and can retain the benefit through metering, retail,
  network and contractual arrangements.
- Accelerator utilisation, depreciation and contracted demand can dominate the
  value of cheaper electricity.
- CoreWeave's disclosed A100 contract extending into 2029 supports a plausible
  operating tail for older accelerators, but it does not establish fleet-wide
  useful life, pricing or economics available to a new operator.
- Australian tax, accounting and commercial lives must be modelled separately.
  A four-year tax life can accelerate deductions, while years five to nine are
  valuable only if the hardware continues to earn cash contribution.
- The service should expose firm, deadline and flex classes rather than present
  variable infrastructure as conventional uniform cloud capacity.
- The control plane is central: accepted work, draining, retry, recovery,
  billing and firm overflow must remain correct when a site disappears.

These statements support further investigation. They do not establish a
defensible business or an investable site.

## What remains unproven

- No generator or compute site has passed detailed electrical and commercial
  diligence.
- No paying Australian design partner has committed a measured workload,
  completion window, reservation or prepayment.
- No supply or co-location term sheet has shown how local physical value reaches
  the compute operator after settlement, tariffs, losses and network charges.
- No five-minute co-dispatch model has reconciled power availability, job
  deadlines, PUE, restart cost, retries and firm overflow to completed-work
  margin.
- No binding accelerator, integration, warranty, financing or residual-value
  terms have been obtained.
- No Australian customer evidence yet establishes demand, realised pricing,
  utilisation, maintenance cost or power efficiency for older accelerator
  fleets. The years-five-to-nine operating tail remains an upside case.
- Fibre routes, latency, carrier diversity, protection, power quality, ramping,
  telemetry and summer cooling remain untested for real sites.
- The control plane has not demonstrated abrupt site loss, idempotent retry,
  duplicate-billing prevention or safe recovery.
- No 100–250 kW pilot or independent two-site failure test has been run.

## Active decisions

1. Treat this as feasibility and pilot work, not a commitment to material
   infrastructure.
2. Screen real electrical configurations and five-minute data before relying on
   regional power statistics.
3. Prioritise small, quickly energised, mostly firm or grid-backed first sites.
4. Test the control plane on rented compute before physical deployment.
5. Design explicit firm, deadline and flex service classes.
6. Procure accelerators in tranches and expand to one megawatt only against
   long-term contracted demand.
7. Underwrite new accelerators on a conservative four-year base case. Treat
   later operating cash flow as an unlevered equity option until local contracts
   and measured fleet data support it.

The canonical decision records are under `src/content/decisions/`.

## Critical research frontier

The current queue has ten critical questions:

1. Identify an underserved Australian customer problem and credible service
   pricing relative to hyperscalers, GPU clouds, colocation and private
   infrastructure.
2. Secure customers with persistent background inference demand who will accept
   measurable completion windows or reserve capacity.
3. Align customer, power, site and hardware contract tenors so long-lived assets
   do not depend on speculative demand.
4. Obtain binding accelerator, integration, warranty, support, financing and
   residual-value terms; separately test rates, maintenance, power efficiency
   and workload demand for a years-five-to-nine operating tail.
5. Identify the real source and operating shape of candidate 1–5 MW power access.
6. Measure usable five-minute energy, ramps, interruptions and recovery limits at
   250 kW, 1 MW and 5 MW.
7. Establish how a local load can retain avoided-curtailment or low-price value
   through actual settlement and contracts.
8. Co-dispatch real or representative workloads against site-level power traces
   and report accepted completed-work margin.
9. Determine the connection, ramping, power-quality, telemetry, protection and
   operating requirements for a dynamic compute load.
10. Obtain fibre quotes, route surveys and measured latency for candidate sites.

The complete queue, including high-priority facility, security, regulatory and
portfolio questions, is under `src/content/research-queue/` and on the public
research cockpit.

## Evidence gates before physical deployment

Before a material deployment, the project must demonstrate:

- site-specific power, connection, import, fibre and thermal feasibility;
- three paying design partners with representative workload traces;
- safe abrupt loss without lost durable work or duplicate customer billing;
- sufficient independent firm reserve for protected commitments;
- measured throughput and recovery using customer workload distributions;
- tenant security, model custody, physical access and OT segmentation;
- unit economics based on accepted completed work after retries.

A 100–250 kW pilot should not start until at least 60–70% of its capacity is
reserved for twelve months and the equipment, integration, fibre, electrical,
cooling, contracts, security and failover requirements are evidenced.

Expansion to one megawatt requires, among other gates, at least 60% of the fleet
contracted for 36 months or more, paid pilot utilisation above 60%, a debt-service
coverage ratio of at least 1.35× after a 20% compute-price haircut, proven summer
thermal performance, demonstrated loss of the largest site and no financing
dependence on hardware residual value.

## Recommended next work

1. Build the site-screening data request and scorecard, identify 10–20 plausible
   sites and obtain detailed evidence for two candidates.
2. Run structured customer discovery and seek three paying design partners with
   workload traces and explicit commercial commitments.
3. Build the completed-work co-dispatch model and competitor/substitute pricing
   map before specifying or buying physical infrastructure.

## Repository map

- `AGENTS.md` — instructions for agents working in the repository.
- `CLAUDE.md` — stable project purpose and research posture.
- `src/content/thesis/` — current thesis and falsifiers.
- `src/content/evidence/` — source-linked claims and next verification steps.
- `src/content/assumptions/` — open assumptions and tests.
- `src/content/decisions/` — active and superseded decisions.
- `src/content/research-queue/` — prioritised unanswered questions.
- `src/content/sources/` — source provenance and reliability boundaries.
- `research/private/` — ignored local area; never treat it as an access-control
  boundary or publish its contents.
