export type ResearchRecord = {
  id: string;
  slug?: string;
  body?: string;
  data: Record<string, unknown>;
};

export const text = (value: unknown, fallback = "Not recorded") =>
  typeof value === "string" && value.trim() ? value : fallback;

export const valueText = (value: unknown, fallback = "Not recorded") => {
  if (typeof value === "string" && value.trim()) return value;
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") return String(value);
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === "string").join(", ") || fallback;
  return fallback;
};

export const list = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];

export const dateText = (value: unknown) => {
  if (value instanceof Date) return value.toLocaleDateString("en-AU", { day: "2-digit", month: "short", year: "numeric" });
  if (typeof value === "string") return value;
  return "Not dated";
};

export const recordTitle = (record: ResearchRecord): string =>
  text(record.data.title ?? record.data.statement ?? record.data.question ?? record.data.decision, record.id);

export const recordSummary = (record: ResearchRecord): string =>
  text(record.data.summary ?? record.data.claim ?? record.data.why_it_matters ?? record.data.rationale ?? record.data.description, "No summary recorded.");

export const sortByRecent = <T extends ResearchRecord>(records: T[]): T[] =>
  [...records].sort((a, b) => {
    const aDate = String(a.data.updated_at ?? a.data.reviewed_at ?? a.data.date ?? a.data.published_at ?? "");
    const bDate = String(b.data.updated_at ?? b.data.reviewed_at ?? b.data.date ?? b.data.published_at ?? "");
    return bDate.localeCompare(aDate);
  });

export const collectionHref = (collection: string) => `/${collection.replace(/([A-Z])/g, "-$1").toLowerCase()}/`;
