import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const id = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use a stable kebab-case ID.');
const date = z.coerce.date();
const evidenceStance = z.enum(['supports', 'challenges', 'mixed', 'context']);
const confidence = z.enum(['low', 'medium', 'high']);
const sourceType = z.enum([
  'primary',
  'regulatory',
  'research',
  'company-disclosure',
  'practitioner',
  'commentary',
  'project-handoff',
]);

const thesis = defineCollection({
  loader: glob({ base: './src/content/thesis', pattern: '**/*.md' }),
  schema: z.object({
    id,
    title: z.string(),
    version: z.number().int().positive(),
    status: z.enum(['testing', 'supported', 'challenged', 'superseded']),
    updated_at: date,
    confidence,
    summary: z.string(),
    supports: z.array(id).default([]),
    challenges: z.array(id).default([]),
    related_assumptions: z.array(id).default([]),
    falsifiers: z.array(z.string()).min(1),
  }),
});

const evidence = defineCollection({
  loader: glob({ base: './src/content/evidence', pattern: '**/*.md' }),
  schema: z.object({
    id,
    title: z.string(),
    claim: z.string(),
    stance: evidenceStance,
    confidence,
    source_type: sourceType,
    source_ids: z.array(id).min(1),
    source_name: z.string().optional(),
    source_url: z.url().optional(),
    published_at: date.optional(),
    reviewed_at: date,
    themes: z.array(z.string()).min(1),
    related_theses: z.array(id).default([]),
    related_assumptions: z.array(id).default([]),
    implications: z.array(z.string()).min(1),
    next_verification: z.string(),
  }),
});

const assumptions = defineCollection({
  loader: glob({ base: './src/content/assumptions', pattern: '**/*.md' }),
  schema: z.object({
    id,
    statement: z.string(),
    category: z.enum(['customer', 'power', 'site', 'hardware', 'operations', 'commercial', 'regulatory', 'security']),
    status: z.enum(['open', 'partially-validated', 'validated', 'rejected', 'superseded']),
    confidence,
    updated_at: date,
    test: z.string(),
    owner: z.string(),
    related_evidence: z.array(id).default([]),
    related_decisions: z.array(id).default([]),
  }),
});

const decisions = defineCollection({
  loader: glob({ base: './src/content/decisions', pattern: '**/*.md' }),
  schema: z.object({
    id,
    date,
    decision: z.string(),
    status: z.enum(['active', 'superseded', 'proposed']),
    rationale: z.string(),
    reversible: z.boolean(),
    revisit_when: z.string(),
    related_assumptions: z.array(id).default([]),
    related_evidence: z.array(id).default([]),
    design_case: z.object({
      rack_platform: z.string(),
      rack_power_kw_low: z.number().positive(),
      rack_power_kw_high: z.number().positive(),
      pue: z.number().min(1),
      calculated_facility_kw_low: z.number().positive(),
      calculated_facility_kw_high: z.number().positive(),
      screening_envelope_kw: z.number().positive(),
      boundary: z.literal('facility-meter-load'),
      input_confidence: confidence,
    }).optional(),
  }),
});

const workloads = defineCollection({
  loader: glob({ base: './src/content/workloads', pattern: '**/*.md' }),
  schema: z.object({
    id,
    title: z.string(),
    fit: z.enum(['excellent', 'good', 'moderate', 'poor', 'very-poor']),
    interruption_behavior: z.string(),
    service_classes: z.array(z.enum(['firm', 'deadline', 'flex'])).min(1),
    rationale: z.string(),
    constraints: z.array(z.string()).default([]),
    related_assumptions: z.array(id).default([]),
    source_ids: z.array(id).min(1),
    reviewed_at: date,
  }),
});

const siteCheckArea = z.enum([
  'connection-and-boundary',
  'usable-energy-shape',
  'delivered-economics-and-value',
  'fibre-and-latency',
  'thermal-physical-and-planning',
  'counterparty-operations-and-security',
]);

const siteCheck = z.object({
  area: siteCheckArea,
  status: z.enum(['unknown', 'in-progress', 'supported', 'failed']),
  source_ids: z.array(id).default([]),
  reviewed_at: date.optional(),
  finding: z.string().optional(),
  next_action: z.string().optional(),
}).superRefine((value, ctx) => {
  if (['supported', 'failed'].includes(value.status)) {
    if (!value.finding) ctx.addIssue({ code: 'custom', message: `${value.status} checks need a finding.` });
    if (!value.reviewed_at) ctx.addIssue({ code: 'custom', message: `${value.status} checks need a review date.` });
    if (value.source_ids.length === 0) ctx.addIssue({ code: 'custom', message: `${value.status} checks need a source.` });
  }
  if (value.status === 'in-progress' && !value.next_action) ctx.addIssue({ code: 'custom', message: 'In-progress checks need a next action.' });
});

const sites = defineCollection({
  loader: glob({ base: './src/content/sites', pattern: '**/*.md' }),
  schema: z.object({
    id,
    title: z.string(),
    stage: z.enum(['lead', 'screening', 'shortlisted', 'rejected']),
    reviewed_at: date,
    source_ids: z.array(id).min(1),
    public_location: z.object({
      state: z.enum(['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA']),
      locality: z.string(),
      latitude: z.number().min(-44).max(-10),
      longitude: z.number().min(112).max(154),
      precision: z.enum(['locality', 'region']),
      source_ids: z.array(id).min(1),
    }),
    site_type: z.enum(['generator-adjacent', 'industrial-grid-connected', 'colocation', 'other']).optional(),
    owner: z.string().optional(),
    priority: z.enum(['low', 'medium', 'high', 'critical']).optional(),
    rationale: z.string(),
    next_action: z.string().optional(),
    next_review_at: date.optional(),
    capacity_observations: z.array(z.object({
      measure: z.enum(['continuous-available-power', 'flexible-available-power', 'connection-headroom', 'import-capability', 'transformer-headroom']),
      value_kw: z.number().positive(),
      boundary: z.enum(['it-load', 'facility-meter-load', 'site-import-capacity', 'connection-capacity']),
      basis: z.enum(['measured', 'contractual', 'engineering-assessment']),
      period_or_condition: z.string(),
      observed_at: date.optional(),
      source_ids: z.array(id).min(1),
    })).default([]),
    checks: z.array(siteCheck).default([]),
    open_questions: z.array(z.string()).default([]),
    comments: z.array(z.object({ date, author: z.string(), text: z.string() })).default([]),
    notes: z.string(),
  }).superRefine((value, ctx) => {
    const areas = value.checks.map((check) => check.area);
    const failed = value.checks.some((check) => check.status === 'failed');
    if (new Set(areas).size !== areas.length) ctx.addIssue({ code: 'custom', message: 'A candidate may have only one finding per check area.' });
    if (failed && value.stage !== 'rejected') ctx.addIssue({ code: 'custom', message: 'A failed check requires rejected stage.' });
    if (value.stage === 'rejected' && !failed) ctx.addIssue({ code: 'custom', message: 'Rejected stage needs a documented failed check.' });
    if (value.stage === 'shortlisted') {
      const supported = new Set(value.checks.filter((check) => check.status === 'supported').map((check) => check.area));
      for (const area of siteCheckArea.options) if (!supported.has(area)) ctx.addIssue({ code: 'custom', message: `Shortlisted stage needs supported check '${area}'.` });
    }
  }),
});

const sources = defineCollection({
  loader: glob({ base: './src/content/sources', pattern: '**/*.md' }),
  schema: z.object({
    id,
    title: z.string(),
    publisher: z.string(),
    source_type: sourceType,
    url: z.url().optional(),
    repository_path: z.string().optional(),
    published_at: date.optional(),
    reviewed_at: date,
    reliability_note: z.string(),
  }).refine((value) => Boolean(value.url || value.repository_path), {
    message: 'A source needs a URL or repository path.',
  }),
});

const researchQueue = defineCollection({
  loader: glob({ base: './src/content/research-queue', pattern: '**/*.md' }),
  schema: z.object({
    id,
    question: z.string(),
    priority: z.enum(['critical', 'high', 'medium', 'low']),
    category: z.enum(['customer', 'power', 'site', 'fibre', 'hardware', 'control-plane', 'commercial', 'regulatory']),
    why_it_matters: z.string(),
    next_action: z.string(),
    status: z.enum(['queued', 'in-progress', 'blocked', 'answered', 'deferred']),
    related_theses: z.array(id).default([]),
    related_assumptions: z.array(id).default([]),
    source_ids: z.array(id).min(1),
    updated_at: date,
  }),
});

const timeline = defineCollection({
  loader: glob({ base: './src/content/timeline', pattern: '**/*.md' }),
  schema: z.object({
    id,
    date,
    title: z.string(),
    event_type: z.enum(['research', 'decision', 'source', 'milestone']),
    summary: z.string(),
    related_records: z.array(id).default([]),
    source_ids: z.array(id).min(1),
  }),
});

export const collections = {
  thesis,
  evidence,
  assumptions,
  decisions,
  workloads,
  sites,
  sources,
  researchQueue,
  timeline,
};
