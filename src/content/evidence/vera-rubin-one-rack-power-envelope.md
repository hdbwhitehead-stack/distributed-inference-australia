---
id: evidence-vera-rubin-one-rack-power-envelope
title: A one-rack Vera Rubin screen implies up to about 275 kW at 1.25 PUE
claim: >-
  SemiAnalysis estimates Vera Rubin NVL72 rack TDP at 180–220 kW; applying the
  project's 1.25 PUE assumption produces a calculated 225–275 kW facility-load
  range before rounding the screening envelope.
stance: context
confidence: medium
source_type: practitioner
source_ids:
  - source-semianalysis-vera-rubin-extreme-co-design
  - source-nvidia-vera-rubin-nvl72
source_name: SemiAnalysis and NVIDIA
source_url: https://newsletter.semianalysis.com/p/vera-rubin-extreme-co-design-an-evolution
published_at: 2026-02-25
reviewed_at: 2026-08-31
themes:
  - hardware
  - pilot-sizing
  - facility
related_theses:
  - thesis-distributed-inference-au
related_assumptions:
  - assumption-one-rack-pue
implications:
  - A rounded 300 kW facility-meter design case is consistent with the upper end of the estimated rack range at 1.25 PUE.
  - The number is a planning envelope and does not evidence a candidate site's import capacity, connection headroom or usable energy.
  - Supplier maximum input, auxiliary design, measured PUE and operating profile can change the required envelope.
next_verification: >-
  Obtain a binding supplier power budget and equipment list, then replace the
  estimated rack TDP and 1.25 PUE assumption with facility-design values.
---

**External estimate (medium confidence):** 180–220 kW rack TDP from SemiAnalysis.

**Project assumption:** 1.25 PUE.

**Arithmetic:** 180 × 1.25 = 225 kW and 220 × 1.25 = 275 kW.

**Decision input:** round the upper result to a 300 kW facility-meter screening
envelope. The extra 25 kW is not a separately evidenced engineering margin.
