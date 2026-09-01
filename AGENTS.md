# Repository instructions

- At the start of substantial work, read `PROJECT_STATE.md`, `CLAUDE.md` and the relevant structured records under `src/content/`. Treat `PROJECT_STATE.md` as a current index, not a substitute for dated source-linked records.
- When authorised work materially changes the thesis, decisions, evidence gates, research priorities or publication status, update `PROJECT_STATE.md` in the same change.
- Treat `src/content/` and `research/` as research records. Do not rewrite claims, sources, dates or review labels without an explicit research update.
- The Astro content schema is the data contract. Keep the interface tolerant of empty collections and unknown optional fields.
- Do not add a database, authentication layer or server runtime for this static cockpit.
- Assume deployed Pages output can be public. Keep confidential customer, generator, site, quote and personal information out of rendered content.
- Preserve adverse evidence, rejected assumptions and superseded decisions; do not hide them to simplify a dashboard.
- Put only real, permissioned candidate leads under `src/content/sites/`; keep synthetic markers and interface fixtures outside published collections.
- Candidate findings use six broad source-linked checks. Do not use a regional statistic, the pilot design case or a matching number as site evidence.
- Publish only locality or regional centroids. Keep exact facility coordinates and confidential diligence outside rendered content.
- Record numerical site capacity as a source-linked observation with its electrical boundary, evidence basis and operating condition. Never copy the nominal pilot load into a site-capacity field.
- Keep the candidate workflow simple until real records demonstrate a need for more states, filters or collections.
- Run content validation, checks, tests and a production build after changes that affect the rendered system.
