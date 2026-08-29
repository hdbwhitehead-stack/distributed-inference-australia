export type Freshness = "current" | "review" | "stale" | "unknown";

export function asDate(value: unknown): Date | undefined {
  if (value instanceof Date && !Number.isNaN(value.valueOf())) return value;
  if (typeof value !== "string" || !value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? undefined : date;
}

export function freshness(value: unknown, now = new Date()): Freshness {
  const date = asDate(value);
  if (!date) return "unknown";
  const age = (now.valueOf() - date.valueOf()) / 86_400_000;
  if (age <= 45) return "current";
  if (age <= 120) return "review";
  return "stale";
}

export function freshnessLabel(value: unknown): string {
  const state = freshness(value);
  return state === "review" ? "review due" : state;
}
