# Distributed Inference Australia — research cockpit

This repository is the working research system for Distributed Inference Australia. It tracks the thesis, evidence, economics, site and workload questions, assumptions, decisions and research queue. The rendered site is a research cockpit generated from the repository's structured content. It is intended to make uncertainty and adverse evidence visible, not to market a settled conclusion.

The site is static Astro output. Markdown content is the source of truth; the interface only renders it.

## Local use

```sh
npm install
npm run validate:content
npm run dev
```

Before opening a pull request, run `npm run check`, `npm test`, and `npm run build`.

## Add one evidence item

1. Add one Markdown file under `src/content/evidence/`.
2. Give it a stable `id`, `title`, `claim`, `stance`, `confidence`, `source_type`, at least one `source_id`, `reviewed_at`, and `themes` in frontmatter. Add `source_url` and `published_at` when the source provides them.
3. Explain uncertainty and implications in the Markdown body.
4. Run `npm run validate:content` and `npm run build`.

The evidence archive searches title, claim, source metadata, themes and implications. It treats all typed search terms as required.

## Content assumptions

The shell expects Astro collections named `thesis`, `evidence`, `assumptions`, `decisions`, `workloads`, `sites`, `sources`, `researchQueue`, and `timeline`.

- Thesis: `id`, `title`, `summary`, `updated_at`, `confidence`, `status`, `falsifiers`.
- Evidence: `id`, `title`, `claim`, `stance`, `confidence`, `source_type`, `source_ids`, `reviewed_at`, `themes`, `implications`, and `next_verification`; `source_url` and `published_at` are optional.
- Assumptions: `id`, `statement`, `category`, `status`, `confidence`, `updated_at`, `test`, `owner`.
- Decisions: `id`, `date`, `decision`, `rationale`, `reversible`, `revisit_when`.
- Research queue: `id`, `question`, `priority`, `category`, `why_it_matters`, `next_action`, `status`.

Real candidates use six broad screening checks, source-linked capacity observations and approximate public locations. The interface stays deliberately light until real candidate work demonstrates a need for more workflow machinery.

## Publication boundary

Assume GitHub Pages output can be public. Do not put customer identities, interview notes, generator or confidential site data, commercial quotes, personal information, credentials, or unpublished transaction information in published content. `research/private/` is ignored and must never become a substitute for an appropriate access-control boundary.

The deployment workflow is manual and does nothing until a repository administrator has configured the remote repository, Pages settings, and the `PAGES_ENABLED=true`, `PUBLIC_SITE_URL`, and `PUBLIC_BASE_PATH` repository variables. A private repository does not necessarily make its Pages output private.

## GitHub Pages base path

For a project Pages site, set `PUBLIC_BASE_PATH` to `/repository-name/`. For a custom domain or user Pages site, use `/`. All shell navigation and public assets respect this value.
