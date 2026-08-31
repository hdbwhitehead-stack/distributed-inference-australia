---
id: thesis-distributed-inference-au
title: Distributed inference in Australia
version: 1
status: testing
updated_at: 2026-08-31
confidence: medium
summary: >-
  Australia may support a distributed, grid-responsive inference network because
  inference jobs are movable while electricity connections are not. The most
  credible first sites are small, quickly energised and mostly firm or
  grid-backed, with substantial curtailment flexibility. Premium accelerators
  should only be owned against contracted utilisation; genuinely intermittent
  sites are more likely to suit customer-owned, older or heavily depreciated
  hardware.
supports:
  - evidence-aemo-q1-2026-curtailment
  - evidence-aemo-q4-2025-negative-prices
  - evidence-sail-completion-window
  - evidence-a100-commercial-life-into-2029
challenges:
  - evidence-aemo-curtailment-dispersion
  - evidence-utilisation-dominates-power-savings
  - evidence-aemo-data-centre-connection-pipeline
related_assumptions:
  - assumption-flexible-demand-depth
  - assumption-local-load-captures-value
  - assumption-firm-reserve-is-affordable
  - assumption-accelerator-operating-tail
falsifiers:
  - Site-specific five-minute traces do not provide enough usable energy at an economical load size.
  - Paying customers will not accept measured completion windows or interruption behaviour at a sufficient price.
  - Lost utilisation, retries, firm overflow and operating costs exceed the value of power and connection advantages.
---

The proposed service sells an inference outcome, service class or completion
window. The operator then chooses the compatible site, power window and hardware
pool. This can work for jobs that tolerate delay, interruption, restart or
variable hardware; it is a poor fit for tightly coupled training and services
whose continuity or tail latency is the product.

The mechanism relies on four linked conditions: usable power at a real electrical
boundary, fibre and a workable site, contracted demand for restartable workloads,
and a control plane that can route, drain, retry and bill completed work safely.
The handoff supports a structured feasibility and pilot program, not accelerator
procurement or greenfield construction.
