# Distributed Inference Research Cockpit — GitHub Repository Handoff

**Prepared:** 29 August 2026  
**Purpose:** Bootstrap a GitHub repository and GitHub Pages research site for the Distributed Inference Australia project.  
**Audience:** A local coding agent with access to Git, GitHub and the user's local development environment.

## Instruction to the local agent

Build a private-working, static research cockpit backed by a GitHub repository and deployed through GitHub Pages. The repository must be the canonical source of truth. The website is a set of views over structured Markdown and small data files, not a separate content system.

Before creating a remote repository or publishing a site, confirm with the user:

1. GitHub account or organisation;
2. repository name;
3. repository visibility;
4. whether the rendered Pages site may be public;
5. preferred production URL, if any.

Do not assume that a private GitHub repository produces a privately accessible Pages site. Verify the account's current Pages access-control options. Until confirmed, exclude confidential customer, generator, site and commercial information from the published build.

## Project context

The project investigates whether small, distributed 1–5 MW compute sites can combine fragmented or flexible Australian power resources into one useful inference service. The working product is a merchant of flexible compute: customers buy an inference outcome, service class or completion window, while the operator decides which site, power window and hardware pool should perform the work.

The primary research source is:

- `distributed-inference-australia-handoff.md`, prepared 28 August 2026.

Place a copy in the repository at:

`research/source-handoffs/distributed-inference-australia-handoff.md`

Additional context lives in the ChatGPT Project **Distributed Inference**, particularly the project chat from 28–29 August 2026 covering:

- the first-principles review of the opportunity;
- the distinction between cheap power and speed to power;
- accelerator utilisation versus electricity savings;
- the case for a research cockpit rather than a polished company website.

This chat reference is a human pointer, not a machine-readable dependency. The repository must remain understandable if the local agent cannot access the ChatGPT conversation.

## Current working thesis

Use this as the initial thesis statement, then preserve later versions in Git history:

> Australia may support a distributed, grid-responsive inference network because inference jobs are movable while electricity connections are not. The most credible first sites are small, quickly energised and mostly firm or grid-backed, with substantial curtailment flexibility. Premium accelerators should only be owned against contracted utilisation; genuinely intermittent sites are more likely to suit customer-owned, older or heavily depreciated hardware.

The central economic question is whether the following benefits:

- speed to power;
- lower electricity and connection costs;
- reduced infrastructure redundancy;
- grid-flexibility payments;
- Australian jurisdiction, privacy or private-inference value;

exceed:

- lost accelerator utilisation;
- poorer batching and cache reuse;
- duplicate work and retries;
- distributed site, fibre and operating costs;
- firm failover costs;
- the customer discount for flexible service;
- accelerator depreciation and obsolescence.

Do not present the thesis as settled. The cockpit must make adverse evidence, uncertainty and possible falsification at least as visible as supporting evidence.

## Product principles

1. **Research tool, not marketing site.** Use restrained analytical design. Avoid promotional copy, inflated market-size counters and unsupported conclusions.
2. **Repository-first.** A researcher should be able to update the project by editing Markdown or a small CSV/JSON file and opening a pull request.
3. **Evidence before opinion.** Every material factual claim shown on the site should retain its source, source date, review date and evidence-quality label.
4. **Preserve disagreement.** Do not collapse mixed evidence into a single confidence score that hides the underlying arguments.
5. **Show freshness.** Display last-reviewed dates and flag stale assumptions.
6. **Make falsification prominent.** Every major thesis should state what evidence would weaken or reverse it.
7. **No duplicate knowledge base.** The website renders repository content. It must not require the same research to be maintained manually in two places.
8. **Static by default.** Do not add a database, authentication layer or server runtime for version one.

## Recommended technical approach

Use:

- Astro with TypeScript;
- Astro content collections for structured Markdown;
- React islands only where interactivity materially helps;
- a lightweight charting library for the economics model and timelines;
- GitHub Actions for validation, build and GitHub Pages deployment;
- unit tests for economic calculations and content-schema validation;
- client-side search and filters generated from build-time content.

Astro is preferred because the project is content-heavy, static-first and well suited to GitHub Pages. Configure the production `site` and repository `base` path correctly. Avoid dependencies on server-side rendering.

Alternative stacks are acceptable only if they preserve the repository-first, static and low-maintenance design.

## Proposed repository structure

```text
distributed-inference-australia/
├── README.md
├── AGENTS.md
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── public/
│   └── assets/
├── research/
│   ├── source-handoffs/
│   │   └── distributed-inference-australia-handoff.md
│   ├── raw-sources/
│   └── private/
│       └── README.md
├── src/
│   ├── content/
│   │   ├── thesis/
│   │   ├── evidence/
│   │   ├── assumptions/
│   │   ├── decisions/
│   │   ├── workloads/
│   │   ├── sites/
│   │   ├── sources/
│   │   └── research-queue/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   ├── lib/
│   │   ├── economics.ts
│   │   ├── content.ts
│   │   └── freshness.ts
│   └── content.config.ts
├── tests/
├── scripts/
│   └── validate-content.ts
└── .github/
    └── workflows/
        ├── checks.yml
        └── deploy-pages.yml
```

`research/private/` must be excluded from the deployed site. Include clear documentation explaining that a private repository does not necessarily make Pages output private.

## Content model

Use stable IDs so research records can be linked across pages and renamed without breaking relationships.

### Thesis record

```yaml
id: thesis-distributed-inference-au
title: Distributed inference in Australia
version: 1
status: testing
updated_at: 2026-08-29
confidence: medium
summary: >-
  Concise current statement of the thesis.
supports:
  - evidence-example-support
challenges:
  - evidence-example-challenge
falsifiers:
  - A short statement of evidence that would materially weaken the thesis.
```

The Markdown body should explain the mechanism and current reasoning. Old thesis versions should remain recoverable through Git history; optionally add explicit dated snapshots when a material change occurs.

### Evidence record

```yaml
id: evidence-aemo-fy26-demand
title: AEMO estimate of current data-centre demand
claim: Data centres consumed approximately 5 TWh in the NEM in FY2026.
stance: supports
confidence: high
source_type: primary
source_url: https://example.com/source
published_at: 2026-08-25
reviewed_at: 2026-08-29
themes:
  - customer-demand
  - australia
implications:
  - Aggregate Australian data-centre demand is already material.
next_verification: Reconcile forecast demand with realised connection utilisation.
```

Allowed `stance` values: `supports`, `challenges`, `mixed`, `context`.

Suggested `source_type` values: `primary`, `regulatory`, `research`, `company-disclosure`, `practitioner`, `commentary`.

Do not infer confidence solely from source type. Explain uncertainty in the body.

### Assumption record

```yaml
id: assumption-flex-demand-depth
statement: Sufficient contracted inference demand can tolerate multi-hour completion windows.
category: customer
status: open
confidence: low
updated_at: 2026-08-29
test: Secure paying design partners with measured workloads and explicit completion windows.
owner: unassigned
related_evidence: []
```

Allowed `status` values: `open`, `partially-validated`, `validated`, `rejected`, `superseded`.

### Decision record

```yaml
id: decision-grid-backed-first-sites
date: 2026-08-29
decision: Prioritise grid-backed flexible sites over renewable-only sites for initial screening.
rationale: New accelerator economics are highly sensitive to lost utilisation.
reversible: true
revisit_when: A site demonstrates substantially different hardware or power economics.
related_assumptions:
  - assumption-flex-demand-depth
```

### Research-queue record

```yaml
id: question-design-partner-workloads
question: Which Australian customers have persistent, measurable background inference demand?
priority: critical
category: customer
why_it_matters: Customer contracts determine whether accelerator procurement is financeable.
next_action: Conduct structured workload interviews.
status: queued
```

Add schemas for workloads and candidate sites, but do not populate invented site or customer data. Empty and explicitly unknown fields are preferable to plausible-looking placeholders.

## Site information architecture

### 1. Dashboard

Show:

- the current thesis and confidence;
- the three to five most important recent changes;
- strongest supporting evidence;
- strongest challenging evidence;
- critical open assumptions;
- next research actions;
- last-updated and stale-content warnings.

The dashboard should answer: **What do we currently believe, why, what could make us wrong, and what should we investigate next?**

### 2. Thesis

Present the current mechanism from power resource to customer outcome. Separate:

- established facts;
- working interpretations;
- forecasts;
- unresolved questions;
- falsifiers.

### 3. Evidence

Provide searchable and filterable evidence cards. Filters should include stance, theme, confidence, source type and freshness. Every card must link to the source and related assumptions or thesis sections.

### 4. Economics laboratory

Create an interactive sensitivity model covering:

- installed sellable GPUs;
- realised price per GPU-hour;
- power availability;
- hardware availability;
- demand occupancy;
- successful completion rate;
- delivered electricity price;
- central-site comparison price;
- site capex and operating cost;
- accelerator capex and useful life;
- firm-overflow cost.

Show at minimum:

- effective billable utilisation;
- revenue;
- electricity cost;
- approximate accelerator depreciation;
- gross contribution before financing;
- value of one utilisation point;
- value of a selected power-price advantage;
- break-even utilisation loss supported by that power advantage.

Seed and test the model against this reference case:

- 500 sellable GPUs;
- A$6.50 per GPU-hour;
- one-megawatt facility;
- 80% site availability;
- A$50/MWh power-price advantage.

Expected results:

- approximately A$350,400 annual power savings;
- approximately A$284,700 annual revenue per utilisation point;
- power savings compensate for approximately 1.23 utilisation points before other differences.

Label all values as scenarios unless they are linked to current evidence.

### 5. Power and sites

Version one should explain site archetypes and the site-screening framework. Do not create a persuasive map from regional averages alone.

Prepare for later candidate-site records covering:

- electrical placement and metering boundary;
- reason for curtailment;
- five-minute available energy;
- import capability;
- transformer and connection headroom;
- fibre;
- cooling and ambient conditions;
- land and planning;
- generator counterparty;
- expected curtailment change after network upgrades.

### 6. Workloads and customers

Show the fit of workloads such as evaluations, synthetic data, RL rollouts, embeddings, document processing, long-running agents, interactive chat and tightly coupled training.

Make the commercial tension visible:

- flexible workloads may be globally mobile and price-sensitive;
- Australian sovereignty customers may require firmer service;
- open-model compatibility determines the addressable market.

### 7. Assumptions and decisions

Provide an assumptions register and chronological decision log. Make rejected and superseded assumptions visible rather than deleting them.

### 8. Research queue

Show critical questions, next actions and status. Research should be prioritised according to its ability to change the thesis, economics or deployment decision.

### 9. Sources and timeline

Maintain a source library and a timeline of material project updates. Link source records back to every claim derived from them.

## Initial visualisations

Build only visuals that improve reasoning:

1. power-price advantage versus tolerable utilisation loss;
2. billable-utilisation waterfall;
3. supporting and challenging evidence grouped by thesis component;
4. assumption status and freshness;
5. research and decision timeline;
6. workload fit matrix.

Avoid a single composite “thesis score.” It would imply precision and comparability that the evidence does not yet support.

An Australian site map can be added once site-specific records exist. Until then, use an archetype view rather than pins based on broad regional data.

## Design direction

The interface should feel like a serious investment or engineering research system:

- restrained typography and colour;
- high information density without clutter;
- strong source and date visibility;
- clear differentiation between facts, assumptions and conclusions;
- excellent desktop use and usable mobile layouts;
- dark and light themes if inexpensive to support;
- no frozen filter panel occupying substantial screen space;
- no generic AI imagery, glowing network graphics or promotional hero section.

Use colour semantically and accessibly. Supporting evidence, challenging evidence and uncertainty must remain distinguishable without relying on colour alone.

## Privacy and publication boundary

Assume that GitHub Pages content may be public until access controls are confirmed.

The published build must not contain:

- customer names or interview notes without permission;
- generator identities or non-public operating data;
- confidential site details;
- commercial quotes;
- personal information;
- credentials, tokens or environment files;
- unpublished investment or transaction information.

Create a documented path for private research that remains in the repository or a separate private store but is excluded from the Pages build. If the repository itself will be shared broadly, use a separate private repository rather than relying only on build exclusions.

## Initial content to ingest

1. The existing `distributed-inference-australia-handoff.md`.
2. A short project-chat reference page containing the title, dates and a note that the conversation is held in the ChatGPT Project **Distributed Inference**.
3. The current working thesis in this handoff.
4. Initial evidence records for the major AEMO, Google demand-response, Emerald AI field-trial, Sail completion-window and Microsoft XWind sources already cited in the research.
5. Initial assumptions and decisions derived directly from the source handoff. Do not invent new conclusions during ingestion.
6. An initial research queue focused on customer demand, site-specific power access, usable five-minute energy, fibre and accelerator procurement economics.

## Implementation sequence

1. Confirm GitHub ownership, repository name, visibility and Pages privacy.
2. Initialise the repository and add `README.md` and `AGENTS.md`.
3. Add the source research handoff before transforming content.
4. Scaffold the static site and GitHub Pages workflow.
5. Define and validate content schemas.
6. Ingest the initial thesis, evidence, assumptions, decisions and research questions.
7. Build the dashboard and evidence views.
8. Build and unit-test the economics model.
9. Add workload, site-framework, decision and timeline views.
10. Verify responsive layout, source links, accessibility and the production base path.
11. Review the full rendered site with the user before making it publicly accessible.
12. Commit in small, understandable steps and document how future research should be added.

## Version-one acceptance criteria

The first version is complete when:

- the repository builds locally from a clean checkout;
- GitHub Actions validates and deploys the static site successfully;
- editing a Markdown evidence record updates the relevant site views;
- the dashboard shows the thesis, adverse evidence, assumptions and next actions;
- evidence can be searched and filtered;
- every displayed factual claim retains a working source link and dates;
- the economics reference case matches the expected calculations;
- content schemas fail clearly on invalid records;
- private research paths are excluded from the deployed build;
- the site works at the GitHub Pages repository base path;
- layouts are usable on desktop and mobile;
- the README explains how to add one new research item in under five minutes;
- no database, backend or unnecessary account system has been added;
- no confidential data is present in the published output.

## Suggested repository README opening

> This repository is the working research system for Distributed Inference Australia. It tracks the thesis, evidence, economics, site and workload questions, assumptions, decisions and research queue. The rendered site is a research cockpit generated from the repository's structured content. It is intended to make uncertainty and adverse evidence visible, not to market a settled conclusion.

## Final instruction

Optimise the first version for repeated research use. A visually polished dashboard that is difficult to update is a failure. A plain but coherent system that makes it easy to add evidence, revise assumptions and observe how the thesis changes is a successful starting point.
