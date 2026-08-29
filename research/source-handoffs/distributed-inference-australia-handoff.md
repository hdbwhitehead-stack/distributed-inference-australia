# Distributed Inference Australia — Project Handoff

**Prepared:** 28/08/2026  
**Status:** Opportunity research and project formation  
**Geography:** Australia, with an initial focus on the National Electricity Market  
**Concept source:** Neil Movva / Sail Research, *Invest Like the Best*, EP. 488  

## Purpose of this document

This handoff captures the current thinking and research for a possible Australian distributed-inference business. It is designed to be copied into a new project and used as its initial source of truth.

The proposed business would combine small blocks of cheap or low-value electricity, modular GPU infrastructure, and a software control plane. It would sell inference services for workloads that can tolerate delay, interruption, migration or variable hardware.

The working conclusion is a **conditional go for a structured feasibility and pilot program**. There is enough evidence to justify serious work. There is not yet enough evidence to buy a megawatt of GPUs or build a greenfield data centre.

## Executive conclusion

Australia appears to have the three ingredients needed for this model:

1. Meaningful renewable curtailment, negative pricing and export-constrained generation.
2. Access to smaller 1–5 MW power blocks that are easier to find than hyperscale connections.
3. Growing demand for AI compute, including demand for Australian-hosted and private inference.

The opportunity is narrower than “put GPUs next to cheap renewable power.” The investable company would be a **merchant of flexible compute**. It would sell a customer a price, service class and completion window, then decide where and when the work should run.

The control plane is the central product. It must make lower-quality infrastructure safe to consume by:

- classifying work by deadline and interruption tolerance;
- preserving durable workflow state;
- routing work to compatible hardware;
- forecasting power and site availability;
- draining or losing sites safely;
- restarting work without duplication or incorrect billing;
- reserving firm capacity for protected service tiers;
- measuring useful completed work after retries and failures.

Cheap power is valuable, but it will not rescue poor GPU utilisation. At one megawatt, a A$50/MWh power-cost improvement is worth roughly A$350,000 a year at 80% site availability. A ten-percentage-point change in billable utilisation can be worth several million dollars. Contracted customer demand and hardware depreciation therefore dominate the economics.

The recommended entry sequence is:

1. Obtain generator interval data and screen real sites.
2. Find customers with genuinely flexible workloads.
3. Build and test the control plane using rented compute and simulated site failures.
4. Run a 100–250 kW physical pilot in existing powered infrastructure.
5. Prove two independent sites and actual failover.
6. Expand to one megawatt only against long-term contracted demand.

## The originating insight

Neil Movva’s thesis begins with the difference between training and inference.

Large training clusters need many accelerators to work on the same calculation. They rely on concentrated GPUs, high-bandwidth interconnect, fast shared storage and reliable power. Splitting a tightly coupled training job across distant data centres is generally unattractive.

Inference is more divisible. Different requests, agents, evaluations or batch jobs can run independently. A fleet can place complete model replicas at several sites and route each job to one compatible pool. The sites do not need to communicate token by token across the country.

Movva argues that large power blocks are scarce while one-megawatt blocks are relatively plentiful. His proposed “aggregate factory” is a fleet of small inference sites assembled into one logical service.

The sites can omit some conventional redundancy:

- a single power supply;
- little or no diesel backup;
- one fibre route in some locations;
- site uptime of 95%, or possibly 80% at the right price;
- no strong guarantee for extreme P99 latency.

The fleet survives through software. If a site disappears, queued work waits or restarts elsewhere. This works when a customer cares about an answer by a deadline rather than the smooth latency of each intermediate token.

Movva extends the idea across two supply curves:

- **Scavenge chips:** use unpopular, older or specialised hardware when its delivered economics suit a workload.
- **Scavenge power:** use small, intermittent, constrained or geographically awkward electricity resources that conventional data centres reject.

The resulting business resembles a mini-mill. It uses distributed and imperfect inputs, joined by a purpose-built operating system, instead of competing directly for the premium inputs bought by hyperscalers.

### Wiki sources already created from the episode

The existing LLM Wiki contains:

- `wiki/sources/source-neil-movva.md`
- `wiki/concepts/frameworks/mental-models/flexible-demand.md`
- `raw/2026-08-27-neil-movva-making-ai-10x-cheaper-invest-like-the-best-ep-488.txt`

The durable concept is **Flexible Demand**: a buyer can access a wider and cheaper supply curve when it can change when, where, how continuously or to what specification it consumes a resource without losing the outcome that matters.

The source page deliberately treats Movva’s forecasts as operator claims rather than settled facts. The mechanism is well supported. The eventual scale, demand elasticity, hardware economics and durability of the competitive advantage remain open questions.

## Why the idea is economically interesting

The model combines four forms of arbitrage.

### Power arbitrage

A flexible compute site may use electricity that is:

- available only during selected hours;
- exposed to low or negative wholesale prices;
- trapped behind a generator export limit;
- curtailed by network constraints;
- located too far from conventional data-centre markets;
- supplied through a connection with weaker uptime;
- unattractive to industrial processes that cannot stop and restart.

The generator obtains a buyer for low-value output. The compute fleet gets energy without competing for premium firm supply.

### Site and connection arbitrage

Large data centres face connection queues, major augmentations, land constraints and planning delays. Smaller sites may use existing substations, industrial buildings, generation infrastructure or distribution connections.

Speed to power may be as important as the energy price. A one-megawatt site energised quickly can create value while a 100 MW development remains in a multi-year queue.

### Hardware arbitrage

The operator maintains separate production pools for different combinations of:

- accelerator type;
- model;
- quantisation;
- tokenizer;
- serving engine;
- runtime and driver build;
- memory configuration;
- network topology.

Heterogeneous hardware should be handled at the routing layer. A scheduler can decide that a given model runs efficiently on a particular pool. It should not assume an in-flight request can migrate arbitrarily between unlike systems.

### Scheduling arbitrage

A customer that supplies a completion window gives the operator several choices:

- wait for lower-cost electricity;
- accumulate a larger batch;
- use a slower or cheaper accelerator;
- run at a remote site;
- pause during a grid event;
- retry a failed job;
- finish before a deadline rather than immediately.

This is the most important layer. Power and hardware are raw inputs. Scheduling converts their variability into a customer service.

## Evidence from the Australian power market

### Curtailment and economic offloading

AEMO’s Q1 2026 Quarterly Energy Dynamics reported:

- average economic offloading of grid-scale wind and solar of 509 MW;
- average network curtailment of wind and solar of 296 MW, up from 150 MW in Q1 2025;
- grid-solar network curtailment of 246 MW;
- solar network curtailment equal to 7.8% of average available output;
- particularly large increases at newer solar facilities in southern NSW, followed by Victoria.

AEMO’s 2025 Enhanced Locational Information report found that 2024 network curtailment averaged 1.1% for wind and 4.5% for solar. Individual outcomes were much wider: some wind units reached 4.8%, and some solar farms reached 53.8%. Several solar farms exceeded 25%.

This dispersion matters. National or regional averages are poor substitutes for a particular generator’s five-minute data.

### Negative prices

In Q4 2025, zero or negative prices occurred in approximately:

- 31.0% of NEM dispatch intervals nationally;
- 48.4% in South Australia;
- 43.1% in Victoria;
- 30.2% in Queensland;
- 26.7% in NSW.

During daytime hours, negative prices occurred in roughly 60% of NSW intervals and 66% of Queensland intervals.

Most negative events were modest. AEMO reported that 86% of negative intervals were between -A$30/MWh and zero, with an average of approximately -A$19.4/MWh. The business should therefore value avoided or discounted energy, not assume it will be paid large sums to consume power.

### Growing data-centre demand

AEMO reported that, at the end of Q1 2026, eleven data-centre projects above 5 MW representing 5.4 GW of maximum demand were progressing through the NEM transmission connection process. Around 60% of this capacity was in NSW and 40% in Victoria. Most projects were still in early stages.

AEMO estimated that Australia had 162 operational data centres accounting for roughly 2% of grid-supplied electricity use. It also said large data-centre projects were targeting approximately two years from application to energisation, although timing varies.

The queue supports the demand thesis while also showing growing competition for power and customers. Connection applications are not the same as completed or commercially occupied facilities.

## Curtailment is not one product

Site underwriting must separate at least six conditions.

1. **Economic offloading:** the generator reduces output because the spot price or combined spot-plus-certificate return is unattractive.
2. **Thermal or network congestion:** a line, transformer, voltage or contingency limit binds.
3. **Interconnector limitations:** local surplus cannot be exported to another region.
4. **System-security constraints:** AEMO needs inertia, voltage support, system strength, fault level or particular synchronous generation online.
5. **Plant or connection constraints:** the power station’s export agreement, inverter, transformer, substation or protection system imposes a limit.
6. **Ordinary intermittency:** the renewable resource is unavailable. This is not curtailment.

A local load helps only when it is electrically placed on the correct side of the binding constraint.

For example, a load behind a solar farm’s export meter may permit greater gross generation while keeping net export within the connection limit. It may not help with an upstream system-security direction that requires the generator itself to reduce output.

Every candidate site must therefore begin with the executed connection agreement and single-line diagram, not a regional curtailment statistic.

## Candidate Australian site archetypes

### Existing SA or Victorian solar and wind sites

These regions have high negative-price frequency and material projected curtailment. The most useful sites will have their own substation, spare transformer or feeder capacity, suitable land and a clear electrical path for local load.

### Southern NSW solar sites

AEMO reported a sharp increase in solar network curtailment at newer facilities in southern NSW in Q1 2026. These deserve detailed screening using DUID-level dispatch, availability and constraint data.

### Queensland and NSW solar-following load

Frequent low daytime prices support batch inference aligned with solar output. Import economics outside solar hours will determine whether the cluster operates only as a daylight pool or as a more continuous service.

### Existing renewable-plus-battery hybrids

A battery can bridge brief ramps, preserve the control plane and support orderly shutdown. It can also improve the usable power shape. Long-duration firming solely for GPUs may be uneconomic, so the battery’s dispatch rights and opportunity cost need to be modelled.

### Landfill gas, biogas and small hydro

These can provide steadier low-cost output than solar and may be better first sites if adequate fibre and electrical infrastructure exist.

### Mining and industrial microgrids

These may already have professional operations, switchgear, firm generation, land and meaningful renewable output. Access depends on the host’s reliability requirements and consent. The compute load must remain subordinate to the primary industrial operation.

### Remote community systems

These should not be approached as simple surplus-power extraction. A 1–5 MW load may be enormous relative to the local system. Any opportunity must be utility-led and community-led, protect reliability, respect land and Traditional Owner rights, and deliver clear local benefits.

## Workload map

| Workload | Fit | Interruption behaviour |
|---|---|---|
| Model evaluations and benchmarks | Excellent | Retry individual cases or batches |
| Synthetic-data generation | Excellent | Checkpoint by record or output shard |
| RL rollouts and sampling | Excellent | Retry independent trajectories |
| Embeddings and document indexing | Excellent | Checkpoint by document or chunk |
| Batch classification and extraction | Excellent | Use idempotent record-level jobs |
| Deep-research agents | Good | Save workflow, sources and completed steps |
| Coding and security agents | Good | Preserve repositories, tests and tool results |
| Image and video generation | Good | Queue independent jobs; account for large data movement |
| LoRA fine-tuning | Moderate | Use regular training checkpoints |
| Stateless short inference | Moderate | Route only to warm, available replicas |
| Interactive chat | Poor as sole supply | Needs firm capacity or bounded overflow |
| Streaming voice/video | Poor | Continuity and latency are core product requirements |
| Safety- or transaction-critical inference | Poor | Failure cost can exceed the discount |
| Cross-site tensor or pipeline parallelism | Very poor | WAN communication erases the benefit |
| Large distributed training | Very poor | Requires concentrated fabric and storage |

The first commercial target should be customers already producing large queues of background work. A broad self-service GPU cloud would create support burden and global commodity exposure before the company has a defensible advantage.

## Recommended service design

Offer explicit service classes.

### Firm

- Suitable for interactive or production-critical traffic.
- Runs on conventional firm capacity or reserved failover capacity.
- Includes availability and latency objectives.
- Priced at a premium.

### Deadline

- Customer specifies a completion time.
- The scheduler can queue, batch, migrate and use cheap-power sites.
- May overflow to firm capacity as the deadline approaches.
- Suitable for background agents and business processes.

### Flex

- Best effort and interruptible.
- No narrow latency or completion guarantee.
- Deepest discount.
- Suitable for evaluations, synthetic data, indexing and offline processing.

A protected service tier cannot rely solely on the statistical diversity of interruptible sites. The operator must reserve enough independent firm capacity to absorb the protected load when the largest cheap-power site disappears.

## Technical architecture

### Fleet layout

The control plane should run in firm, conventional infrastructure across at least two metropolitan regions. The cheap-power sites should be treated as execution pools.

```text
Customer API and job submission
              |
Firm multi-region control plane
  - identity and tenant policy
  - durable job ledger
  - billing and quotas
  - global scheduler
  - model manifests
  - power and capacity forecasts
  - security and observability
              |
   +----------+----------+
   |                     |
Firm reserve       Interruptible sites
Gold overflow      Local model cache
Deadline rescue    Local scheduler
                   GPU worker pools
```

### Global scheduler

The scheduler should consider:

- customer service class and deadline;
- tenant and data-residency restrictions;
- current site power state;
- forecast site availability and confidence;
- model readiness;
- hardware and runtime compatibility;
- queue depth;
- expected prompt and output length;
- batch efficiency;
- network latency and congestion;
- expected retry cost;
- firm-capacity reservation;
- all-in marginal cost.

Site states should include at least `available`, `draining`, `unavailable` and `recovering`. A site is not available merely because power has returned. Its model replicas, storage, network and runtime must be warm and validated.

### Model placement

Model weights should be pre-positioned on site-local NVMe using immutable, signed manifests. Readiness must bind together:

- model revision;
- tokenizer;
- quantisation;
- serving-engine build;
- GPU architecture;
- drivers and libraries;
- runtime settings;
- test vectors and expected outputs.

Cold-loading very large models after every interruption can consume much of the available power window and create a surge on the fibre link.

### Durable state and KV cache

Workflow state and model-serving state should be handled separately.

Durable business or agent state includes completed jobs, tool calls, files, tests, output digests and billing acknowledgements. It should be checkpointed at natural idempotent boundaries.

The LLM KV cache is transient, high-volume state associated with an in-flight generation. It is normally practical to keep it within one server or low-latency site fabric. After a complete site failure, replaying the prompt on a healthy replica will often be safer than attempting WAN-scale KV migration.

Disaggregated prefill and decode can improve performance within a well-networked site. It should not be used as a reason to split one request across remote power locations.

### Networking

Within a site, model-parallel workloads may need NVLink, high-speed Ethernet or InfiniBand/RDMA. Across sites, the fleet should route whole jobs or requests.

External bandwidth can be modest for text-only requests, but model replication, images, video, customer datasets and recovery events can be large. The site should have:

- measured fibre latency to target customer regions;
- known route and carrier diversity;
- an out-of-band management path;
- rate limits for model and cache movement;
- protection against model downloads saturating customer traffic;
- tested behaviour when the only fibre path fails.

One fibre path may be acceptable for a Flex site. Firm customer service must have independent capacity elsewhere.

### Power-aware control

The site controller should follow a staged sequence:

1. Stop admitting work that cannot complete within a conservative power window.
2. Reduce batches or cap GPU power if required.
3. Drain work that can finish safely.
4. Checkpoint durable workflow state.
5. Shut down controlled systems.
6. Assume abrupt loss remains possible at every stage.

UPS capacity should protect networking, storage, the control plane and orderly shutdown. Carrying a full megawatt of GPUs through long interruptions would remove much of the economic advantage.

### Security

Treat each remote site as an untrusted zone.

- Use mTLS and short-lived workload identity.
- Separate operational-technology and power controls from inference networks.
- Deny network access by default.
- Sign and attest system images, containers, model weights and configuration.
- Encrypt customer data in transit and at rest.
- Use customer-specific access policy and audit logs.
- Minimise prompt and response retention.
- Separate tenants with controls appropriate to the product claim.
- Keep fleet root credentials out of site-local systems.
- Plan for hostile physical access and stolen hardware.

### Core operating metrics

Track:

- completed accepted jobs per available MWh;
- accepted tokens per available MWh;
- billable utilisation;
- hardware availability;
- site power availability;
- retry and replay rate;
- duplicate suppression rate;
- queue age by service class;
- deadline success;
- P50, P95 and P99 latency;
- time to first token and inter-token latency;
- cache hit and model warm-state rates;
- energy-to-completion;
- cost per accepted output;
- customer gross margin;
- site restoration time.

High GPU busy time can be misleading if the system repeatedly recomputes failed work.

## One-megawatt physical scale

One megawatt at the facility meter does not equal one megawatt of GPUs.

At PUE 1.20–1.30, approximate IT power is 770–830 kW.

Current reference points:

- NVIDIA DGX H100/H200: eight GPUs and up to 10.2 kW per system.
- NVIDIA GB200 NVL72: 72 GPUs and approximately 120 kW per rack.
- A one-megawatt facility could therefore contain roughly 560–640 H100-class GPUs, or around seven current 120 kW rack-scale systems, after reasonable infrastructure allowances.

These are density illustrations. The actual design must allow for storage, switches, management servers, power conversion, cooling and operational headroom.

Every consumed megawatt becomes approximately a megawatt of heat. Australian summer peak temperature, dust, water availability, cooling redundancy, coolant maintenance, noise and fire response must be designed explicitly.

## Economics framework

### Effective utilisation

The correct utilisation measure compounds several factors:

`billable utilisation = power availability × hardware availability × demand occupancy × scheduling efficiency × successful completion`

Illustration:

- power availability: 80%;
- hardware availability: 95%;
- customer occupancy while available: 70%;
- successful completion after interruptions: 95%.

Effective billable utilisation is approximately 50.5% before any further scheduling loss.

### Illustrative one-megawatt revenue

Assume 500 sellable H100-equivalent GPUs and 50.5% effective billable utilisation.

Annual billable GPU-hours are approximately:

`500 × 8,760 × 50.5% = 2.21 million`

| Realised price | Illustrative annual revenue |
|---:|---:|
| A$5/GPU-hour | A$11.1m |
| A$6.50/GPU-hour | A$14.4m |
| A$8/GPU-hour | A$17.7m |

These are scenario inputs, not forecasts. Public cloud list prices include different hardware, support, network, uptime and contract terms. A flexible regional fleet may realise less for raw GPU-hours but more for managed private inference.

### Illustrative power cost

At 80% availability, a one-megawatt facility consumes 7,008 MWh annually.

| Delivered power price | Annual cost |
|---:|---:|
| A$20/MWh | A$140k |
| A$50/MWh | A$350k |
| A$100/MWh | A$701k |
| A$150/MWh | A$1.05m |

A A$50/MWh improvement is worth approximately A$350,000 a year. At the illustrative fleet size, ten additional utilisation points are worth approximately A$2.2m–3.5m depending on realised price.

### Capex and financing

Current accelerator purchase prices are opaque and move quickly. Do not rely on reseller anecdotes or assumed residual values. Obtain binding OEM or integrator quotes covering:

- hardware price;
- delivery schedule;
- payment milestones;
- cooling and electrical integration;
- warranty and support location;
- spare-part availability;
- acceptance tests;
- performance guarantees;
- financing and security;
- import, tax and foreign-exchange exposure.

A one-megawatt facility plus current accelerators can require tens of millions of Australian dollars. GPU debt is dangerous when compute contracts are short and prices fall quickly.

Expansion should therefore require:

- take-or-pay customer commitments;
- meaningful customer prepayments;
- parent guarantees, letters of credit or equivalent support where appropriate;
- contract terms aligned with debt amortisation;
- no reliance on speculative spot utilisation;
- conservative zero or low hardware residual value.

## Business-model options

### Powered modular infrastructure

The company originates the generator site, electricity arrangement, modular data centre and fibre. A compute operator leases the powered space.

Advantages:

- strong fit if the founder’s edge is power origination;
- lower model-serving and customer-support burden;
- easier to finance against a creditworthy tenant.

Limitations:

- infrastructure-like returns;
- tenant concentration;
- less control over the inference economics;
- risk that a specialised site becomes stranded when hardware changes.

### Interruptible GPU capacity

The company owns accelerators and sells queued GPU-hours or batch jobs.

Advantages:

- captures the spread between power, hardware and compute prices;
- allows direct control of scheduling;
- can build useful operational data.

Limitations:

- rapid hardware depreciation;
- global price competition;
- utilisation and support risk;
- customers may expect conventional cloud features and uptime.

### Managed inference and completion windows

The company sells tokens, throughput, model endpoints, completion windows or business outcomes.

Advantages:

- best alignment between flexible supply and customer demand;
- operator chooses hardware and schedule;
- Australian data jurisdiction and private deployment can add value;
- the control plane can become a genuine moat.

Limitations:

- hardest software and security problem;
- requires enterprise sales and 24/7 operations;
- model performance and serving software change rapidly;
- end customers may prefer major clouds or model-provider APIs.

### Recommended initial structure

Use partnerships to combine power origination with managed inference:

- originate site and electricity rights;
- use an experienced modular-data-centre integrator;
- partner with an inference software or GPU operations team;
- pre-sell capacity to anchor customers;
- retain the data, scheduler and customer contract layer where possible;
- internalise other layers only after identifying a persistent bottleneck.

## Commercial structures with generators

### Interruptible on-site energy-services agreement

The generator supplies renewable energy within a defined operating envelope. The compute operator accepts interruption and buys grid or firm energy separately when needed.

### Retailer-backed shaped PPA

A retailer remains financially responsible for imports and settlement. The generator supplies a local-energy benefit during defined intervals. This produces cleaner billing but adds retailer margin and may retain network costs.

### Generator and compute joint venture

Both parties share transformer, switchgear, fibre, cooling or battery capex. The generator receives better monetisation of constrained output. The compute operator receives energy and site access.

### Compute-flexibility tolling agreement

The compute operator sells a controllable MW range to the generator, retailer or aggregator. Payments can include availability and performance components. This directly prices flexibility rather than pretending the supply is firm.

### Demand response and FCAS

A controllable load can potentially reduce consumption through the Wholesale Demand Response Mechanism or provide ancillary services. This should be treated as later upside. Variable inference demand can make baseline calculation difficult, and grid-service dispatch can conflict with customer commitments.

## Contract terms that need explicit allocation

Every generator agreement should address:

- energy title and metering boundary;
- power price and indexation;
- generator availability and forecast obligations;
- curtailment priority;
- load-shed control and command authority;
- ramp and restart limits;
- minimum run conditions;
- import and firming responsibility;
- network, retail and market charges;
- marginal and distribution loss treatment;
- LGC and future REGO ownership;
- renewable and emissions claims;
- data and telemetry access;
- transformer and connection augmentation;
- maintenance coordination;
- outage compensation;
- change in law;
- insurance and indemnities;
- counterparty credit support;
- insolvency and step-in rights;
- decommissioning and site restoration.

## Regulatory and compliance map

### Connection and NEM classification

The relevant NSP must approve the load, protection, telemetry, power quality and any change to the generator operating envelope. A generation system with material non-auxiliary load may require different participant registration or Integrated Resource Provider treatment.

At or around 5 MW, classification and connection requirements become particularly important. Avoid artificial 4.99 MW structuring without specialist advice. Ownership, common control, metering and the actual connection configuration matter.

### Electricity retail and private networks

If one legal entity supplies electricity to another, AER retailer authorisation or a retail exemption may be required. A private wire or embedded network may also create network-exemption and consumer-protection obligations.

### Electricity derivatives

A physical power contract is not automatically a financial product. Cash-settled or index-linked electricity hedges, caps and swaps can enter the financial-services perimeter. Obtain advice before structuring merchant-price risk products.

### Metering, LGCs and renewable claims

Behind-the-meter renewable electricity can support certificate creation with the correct accredited-station and metering arrangements. If certificates are sold to another party, the compute customer cannot claim the same environmental attribute without the required surrender or retirement.

Avoid vague “100% renewable AI” claims. Define the energy period, location, matching method, treatment of grid imports and certificate allocation.

### Privacy and data location

Prompts, customer documents and model outputs may contain personal, confidential or sensitive information. Product design should address:

- Australian Privacy Principles;
- customer control over retention;
- overseas disclosure and support access;
- data-residency wording;
- customer-managed encryption keys;
- deletion and backup policy;
- subcontractor and cloud-provider access;
- incident notification;
- model-training use and default zero-data-retention terms.

### Critical infrastructure

SOCI Act obligations can arise when the service processes business-critical data for governments or critical-infrastructure entities. Applicability depends on the customer, service and data. It is not determined solely by site size.

### Planning and operating approvals

The diligence scope may include:

- planning and building approval;
- electrical safety;
- high-voltage access and switching;
- fire engineering and suppression;
- coolant and dangerous-goods rules;
- water extraction and discharge;
- heat, noise and visual impact;
- telecommunications easements;
- land tenure and access;
- environmental approvals;
- Traditional Owner and community engagement;
- NGER and emissions-reporting thresholds;
- security and critical-worker requirements.

## Australian customer wedge

The strongest initial product appears to be **Australian-operated, private managed inference for customers with persistent background workloads and meaningful data-jurisdiction requirements**.

Candidate customer groups:

- Australian AI-native software companies;
- financial-services firms;
- legal and document-processing businesses;
- healthcare and life-sciences companies;
- mining and industrial operators;
- research organisations and universities;
- government-adjacent suppliers;
- cybersecurity and software-testing companies.

Possible products:

- private open-model endpoints;
- managed document processing;
- evaluation and red-team capacity;
- synthetic-data generation;
- RL rollout capacity;
- long-running coding or research agents;
- dedicated LoRA and fine-tune serving;
- Australian region-locked processing;
- customer-managed-key inference;
- capacity reservations with an interruptible overflow tier.

Avoid leading with generic GPU-hours. A customer should buy a solution to a data, security, price or workflow problem.

## Competitors and precedents

### Sail Research

Sail publicly offers inference for long-horizon agents, deep research, RL rollouts, evaluations and background work. Its completion-window product offers default, balanced and flex scheduling. Sail says it distributes work across providers, uses spot compute and fails over to more reliable capacity.

This is commercial evidence for latency tolerance as a priced service. Sail’s discounts and operating scale remain company disclosures.

### Soluna

Soluna co-locates modular computing infrastructure with wind, solar and hydro resources. It reports experience monetising curtailed energy and describes approximately 1.2 MW modular buildings capable of fast load changes.

Soluna validates the power and modular-site concept, particularly through Bitcoin infrastructure. Its AI business is less mature evidence for interruptible production inference.

### Crusoe

Crusoe historically used modular compute at otherwise wasted gas resources and later developed an AI cloud. It is evidence that energy-first modular compute can develop into a broader compute platform. Its corporate strategy has since changed, so historical architecture should not be treated as a direct current comparable.

### Australian compute operators

Australia already has major data-centre and AI-compute projects, including hyperscale and sovereign-compute propositions. Public examples include Firmus, Sharon AI, ResetData, Micron21, NEXTDC and CDC.

These companies demonstrate local demand and procurement capability. They also mean that a new entrant should avoid competing as an undifferentiated neocloud. The flexible-power and managed-inference wedge must be specific.

## Main risks

| Risk | Why it matters | Mitigation or decision rule |
|---|---|---|
| Low utilisation | GPU revenue disappears while depreciation continues | Contract demand before procurement; buy in tranches |
| GPU price collapse | New hardware can reduce market rates before debt amortises | Multi-year take-or-pay contracts; conservative residual value |
| Power is cheap but too irregular | Available MWh may be far below headline MW | Underwrite five-minute traces and annual energy, not nameplate |
| Curtailment is not capturable | The binding constraint may sit outside the local load | Electrical and constraint study for each site |
| Correlated site failure | Several “independent” sites may share grid, weather, carrier or software | Map common-mode dependencies; reserve independent firm capacity |
| Remote fibre | A cheap-power site may be commercially unusable | Route survey, carrier quotes and measured customer latency before commitment |
| Model cold starts | A short power window can be consumed by downloads and warm-up | Local model cache and readiness tests |
| Hidden workflow state | Retried agents can duplicate actions or lose progress | Idempotency, job ledger and application-level checkpoints |
| Customer expects conventional cloud | Flexible uptime may create disputes | Explicit service classes and tested contractual SLOs |
| Data and security failure | A breach can destroy the enterprise proposition | Strong tenant isolation, OT separation, audit and incident response |
| Customer concentration | One anchor customer may control financing viability | Credit support and later diversification limits |
| Generator counterparty failure | Site economics can disappear with a PPA dispute or insolvency | Step-in rights, security and alternative supply plan |
| Regulatory change | Connection, market or certificate treatment can change | Change-in-law clauses and specialist advice |
| Cooling and field operations | High-density remote hardware can fail in summer | Sustained-load thermal testing, spares and local technicians |
| Commodity competition | Global providers may cut prices rapidly | Sell managed private inference and flexible outcomes |

## Hard technical gates

Before material deployment, prove:

1. Site-specific power profile, ramp notice, frequency, duration, correlation and restart limits.
2. Safe abrupt loss without lost durable jobs or duplicate customer billing.
3. Firm reserve sufficient for every protected service commitment.
4. Real throughput using customer prompt and output distributions.
5. Signed model/runtime manifests and local warm-state recovery.
6. Compatibility matrix across every accelerator and serving engine.
7. Internal fabric performance under simultaneous customer traffic and model movement.
8. Power-aware admission and drain behaviour under stale telemetry and split-brain conditions.
9. Tenant security, model custody, physical access and OT segmentation.
10. Cooling and heat rejection through sustained Australian summer conditions.
11. Independent failure domains for power, carrier, control plane, identity and model registry.
12. Unit economics based on accepted completed work after retries.

## Recommended development plan

### Stage 0 — Form the project data room

Create structured folders for:

- market and generator data;
- customer discovery;
- electrical and thermal design;
- network and fibre;
- control-plane architecture;
- hardware benchmarks and quotes;
- regulatory advice;
- commercial contracts;
- financial model;
- risk register;
- pilot reports.

Maintain an assumptions register with owner, source, date, confidence and next verification action.

### Stage 1 — Site screening

Build a repeatable site scorecard covering:

- five-minute available generation;
- actual output and dispatch target;
- economic offloading;
- network curtailment;
- binding constraints;
- negative-price exposure;
- MLF or DLF;
- annual usable MWh at several load sizes;
- import price and connection capacity;
- connection and transformer headroom;
- fibre routes and cost;
- ambient and cooling conditions;
- land and planning status;
- generator credit and PPA position;
- forecast reduction in curtailment after planned transmission works.

Start with 10–20 sites and reduce them to two detailed candidates.

### Stage 2 — Customer discovery

Interview customers using a concrete workload questionnaire:

- model and serving engine;
- average and P99 prompt size;
- average and P99 output size;
- request concurrency;
- completion deadline;
- maximum interruption and retry cost;
- checkpoint boundary;
- data location and retention requirements;
- current provider and realised price;
- monthly volume and seasonality;
- willingness to prepay or reserve capacity;
- consequences of a missed deadline;
- need for Australian operations or private networking.

Secure three paying design partners before physical deployment.

### Stage 3 — Software prototype

Use rented cloud or Australian colocation capacity. Replay real or representative power traces and intentionally remove pools.

Required demonstrations:

- queue and deadline scheduling;
- model-aware routing;
- site drain;
- abrupt site loss;
- idempotent retry;
- duplicate billing prevention;
- firm overflow;
- site warm-up validation;
- customer-visible status and audit trail;
- energy and cost accounting.

### Stage 4 — 100–250 kW physical pilot

Use an existing powered shell. A plausible initial fleet is 32–64 current-generation GPUs.

Pilot entry gates:

- three design partners;
- at least 60–70% of capacity reserved for twelve months;
- fixed equipment and integration quotes;
- fibre quote and tested route;
- approved electrical and cooling design;
- clear customer and generator contracts;
- security baseline complete;
- firm failover capacity available.

### Stage 5 — Two-site proof

The second site should use a different generator, grid exposure, fibre path and local operations arrangement.

Run live kill tests. Confirm that site loss causes no unbounded customer failure, lost durable work or duplicate charge.

### Stage 6 — One-megawatt scale

Expansion gates:

- at least 60% of the proposed fleet contracted for 36 months or more;
- debt-service coverage remains at least 1.35× after a 20% compute-price haircut;
- customer prepayments fund a meaningful portion of hardware;
- paid utilisation above 60% in the pilot;
- proven summer thermal performance;
- no unresolved fibre or protection issue;
- demonstrated loss of the largest site;
- no financing dependence on hardware residual value.

## Immediate questions for the founder

1. What is the actual source of the claimed easy 1–5 MW access?
2. Is the power continuous, resource-following, curtailed-only or grid-backed?
3. Does the generator own the land and connection infrastructure needed for local load?
4. Can the proposed site import from the grid?
5. What five-minute energy profile is available at 250 kW, 1 MW and 5 MW load levels?
6. Which customer workload is the initial product built around?
7. Is the founder’s comparative advantage power origination, infrastructure development, software or enterprise distribution?
8. Would the company own GPUs, lease them, or host a customer’s hardware?
9. Is Australian data jurisdiction an important customer benefit or merely a marketing claim?
10. Which partner can supply the missing inference and data-centre operating capability?

## Recommended initial team

The project eventually needs competence in:

- electricity-market and generator origination;
- high-voltage electrical engineering;
- data-centre thermal and mechanical design;
- distributed systems and schedulers;
- inference kernels and model serving;
- enterprise security and privacy;
- fibre and network engineering;
- data-centre operations and remote hands;
- enterprise AI sales;
- project finance and capacity contracts;
- NEM/WEM, AER, privacy and SOCI advice.

The first internal technical hire or co-founder should understand distributed systems and production inference. The first external advisers should include a generator-connection engineer, data-centre electrical/thermal engineer and energy-market lawyer.

## Decision standard

The project should proceed when power, fibre, customer demand and control-plane performance coincide at the same scale.

Cheap power without fibre is stranded. Cheap power without customer demand leaves depreciating hardware idle. Customer demand without restartable workloads requires a conventional data centre. Flexible workloads without a robust control plane create unreliable service.

The attractive business joins all four.

## Source list

### Originating source and wiki

- Neil Movva / Sail Research source page: `wiki/sources/source-neil-movva.md`
- Flexible Demand concept: `wiki/concepts/frameworks/mental-models/flexible-demand.md`
- Raw transcript: `raw/2026-08-27-neil-movva-making-ai-10x-cheaper-invest-like-the-best-ep-488.txt`
- [Sail Research](https://sail.computer/)

### Australian power and data-centre market

- [AEMO Quarterly Energy Dynamics](https://www.aemo.com.au/energy-systems/major-publications/quarterly-energy-dynamics-qed)
- [AEMO Q1 2026 Quarterly Energy Dynamics](https://www.aemo.com.au/-/media/files/major-publications/qed/2026/qed-q1-2026.pdf)
- [AEMO Q4 2025 Quarterly Energy Dynamics](https://www.aemo.com.au/-/media/files/major-publications/qed/2025/qed-q4-2025.pdf)
- [AEMO Q3 2025 Quarterly Energy Dynamics](https://www.aemo.com.au/-/media/files/major-publications/qed/2025/qed-q3-2025.pdf)
- [AEMO 2025 Enhanced Locational Information Report](https://www.aemo.com.au/-/media/files/electricity/nem/planning_and_forecasting/enhanced-locational-information/2025/2025-enhanced-locational-information-report.pdf)
- [AEMO data-centre demand update](https://www.aemo.com.au/newsroom/news-updates/digital-demand-surge)
- [AEMO Integrating Price Responsive Resources](https://www.aemo.com.au/initiatives/major-programs/nem-reform-program/nem-reform-program-initiatives/integrating-price-responsive-resources-into-the-nem)
- [AEMO Demand Response Service Provider registration](https://www.aemo.com.au/energy-systems/electricity/national-electricity-market-nem/participate-in-the-market/registration/register-as-a-drsp)
- [AEMC hybrid-facility explanation](https://www.aemc.gov.au/news-centre/speeches/implementing-esbs-post-2025-market-design-reforms)
- [AEMC review of the Wholesale Demand Response Mechanism](https://www.aemc.gov.au/market-reviews-advice/review-wholesale-demand-response-mechanism)
- [AEMO marginal loss factors](https://www.aemo.com.au/energy-systems/electricity/national-electricity-market-nem/market-operations/loss-factors-and-regional-boundaries)
- [Australian Government data-centre efficiency guidance](https://www.energy.gov.au/business/equipment-guides/data-centres)

### Hardware and technical architecture

- [NVIDIA DGX H100 data-centre design](https://docs.nvidia.com/dgx-superpod/design-guides/dgx-superpod-data-center-design-h100/latest/planning.html)
- [NVIDIA DGX GB200 hardware guide](https://docs.nvidia.com/dgx/dgxgb200-user-guide/hardware.html)
- [NVIDIA inference reference architecture](https://docs.nvidia.com/ncx/ncp-inference-ra/)
- [NVIDIA Dynamo](https://docs.nvidia.com/dynamo/)
- [vLLM distributed serving](https://docs.vllm.ai/en/latest/serving/distributed_serving.html)
- [PagedAttention research paper](https://arxiv.org/abs/2309.06180)
- [NVIDIA MIG guide](https://docs.nvidia.com/datacenter/tesla/mig-user-guide/latest/introduction.html)
- [NVIDIA Triton Inference Server](https://docs.nvidia.com/deeplearning/triton-inference-server/user-guide/docs/index.html)
- [NIST Zero Trust Architecture](https://csrc.nist.gov/pubs/sp/800/207/final)
- [NIST Secure Software Development Framework](https://csrc.nist.gov/pubs/sp/800/218/final)

### Commercial precedents and price anchors

- [Soluna](https://www.solunacomputing.com/)
- [Soluna AI infrastructure](https://www.solunacomputing.com/for-ai/)
- [Soluna project portfolio](https://www.solunacomputing.com/projects/)
- [Crusoe 2025 Impact Report](https://www.crusoe.ai/resources/blog/crusoes-2025-impact-report)
- [Lambda GPU pricing](https://lambda.ai/pricing)
- [Lambda cluster pricing](https://lambda.ai/1-click-clusters)
- [AWS Capacity Blocks for ML pricing](https://aws.amazon.com/ec2/capacityblocks/pricing/)
- [Google Cloud GPU pricing](https://cloud.google.com/products/compute/gpus-pricing)
- [Firmus Project Southgate](https://firmus.co/newsroom/firmus-signs-multi-year-agreement-with-global-hyperscale-customer-at-project-southgate)
- [Sharon AI Australian capacity announcement](https://sharonai.com/press-releases/sharon-ai-announces-six-year-strategic-compute-collaboration-with-nvidia/)
- [ResetData sovereign AI factory announcement](https://cms.resetdata.ai/uploads/25_02_12_MR_Reset_Data_collaborates_with_NVIDIA_to_launch_sovereign_public_AI_Factory_bd0ee7c78c.pdf)

### Australian regulation and claims

- [AER retail exemptions](https://www.aer.gov.au/retail-markets/retail-guidelines-reviews-and-monitoring/retail-exemptions)
- [AER embedded-network guidance](https://www.aer.gov.au/consumers/understanding-energy/embedded-networks-customers)
- [Clean Energy Regulator electricity-meter guidance](https://cer.gov.au/schemes/renewable-energy-target/large-scale-renewable-energy-target/large-scale-generation-certificates/calculate-large-scale-generation-certificate-entitlements/electricity-meters)
- [Clean Energy Regulator renewable-electricity reporting guidance](https://cer.gov.au/document/2024-cert-report-guidance-and-supporting-examples-fy2022-23-and-cy2023)
- [OAIC guidance on commercially available AI](https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products)
- [CISC data storage and processing guidance](https://www.cisc.gov.au/information-for-your-industry/data-storage-and-processing/legislation-regulation-and-compliance/soci-act-2018)
- [Security of Critical Infrastructure Act 2018](https://www.legislation.gov.au/C2018A00029/latest/text)

## Final working view

The project is worth pursuing because it applies flexible-demand economics to two scarce inputs at once: accelerators and electricity. Australia has credible low-value power resources and a growing need for AI compute. A well-built fleet could turn several inferior physical sites into one useful logical service.

The company’s long-term value would come from reliably translating customer deadlines into decisions about power, site, chip, batch and retry. The first milestone is therefore not a data centre. It is proof that a real customer workload can survive the service variation and still produce compelling all-in economics.
