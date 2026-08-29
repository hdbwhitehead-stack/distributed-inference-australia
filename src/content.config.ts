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

const sites = defineCollection({
  loader: glob({ base: './src/content/sites', pattern: '**/*.md' }),
  schema: z.object({
    id,
    record_type: z.enum(['screening-framework', 'candidate']),
    title: z.string(),
    status: z.enum(['framework', 'unscreened', 'screening', 'shortlisted', 'rejected']).optional(),
    reviewed_at: date,
    source_ids: z.array(id).min(1),
    screening_criteria: z.array(z.string()).default([]),
    hard_blocks: z.array(z.string()).default([]),
    candidate_fields: z.array(z.string()).default([]),
    notes: z.string(),
  }).superRefine((value, ctx) => {
    if (value.record_type === 'screening-framework' && value.screening_criteria.length === 0) {
      ctx.addIssue({ code: 'custom', message: 'A screening framework needs criteria.' });
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
