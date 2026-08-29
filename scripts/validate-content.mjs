import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative } from "node:path";

const contentRoot = join(process.cwd(), "src", "content");
const expectedFields = {
  thesis: ["id", "title", "updated_at", "confidence", "summary"],
  evidence: ["id", "title", "stance", "confidence", "source_type", "source_ids", "reviewed_at"],
  assumptions: ["id", "statement", "status", "updated_at", "test"],
  decisions: ["id", "date", "decision", "rationale"],
  workloads: ["id", "title"],
  sites: ["id", "title"],
  sources: ["id", "title", "source_type"],
  "research-queue": ["id", "question", "priority", "status"],
  timeline: ["id", "date", "title"]
};

async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? markdownFiles(path) : entry.name.endsWith(".md") ? [path] : [];
  }));
  return nested.flat();
}

function frontmatterKeys(source) {
  const match = source.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return [];
  return [...match[1].matchAll(/^([A-Za-z][A-Za-z0-9_]*):/gm)].map((item) => item[1]);
}

async function main() {
  try { await stat(contentRoot); } catch { console.log("No content directory yet; content validation skipped."); return; }
  const ids = new Map();
  const failures = [];
  for (const [collection, fields] of Object.entries(expectedFields)) {
    const directory = join(contentRoot, collection);
    try { await stat(directory); } catch { continue; }
    for (const file of await markdownFiles(directory)) {
      const source = await readFile(file, "utf8");
      const keys = frontmatterKeys(source);
      const missing = fields.filter((field) => !keys.includes(field));
      const location = relative(process.cwd(), file);
      if (!keys.length) failures.push(`${location}: missing YAML frontmatter`);
      if (missing.length) failures.push(`${location}: missing ${missing.join(", ")}`);
      const id = source.match(/^id:\s*['\"]?([^'\"\n]+)['\"]?\s*$/m)?.[1]?.trim();
      if (id) {
        const previous = ids.get(id);
        if (previous) failures.push(`${location}: duplicate id '${id}' (also ${previous})`);
        ids.set(id, location);
      }
    }
  }
  if (failures.length) throw new Error(`Content validation failed:\n- ${failures.join("\n- ")}`);
  console.log(`Content validation passed (${ids.size} stable IDs checked).`);
}

await main();
