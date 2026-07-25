import { readFile } from "node:fs/promises";
import path from "node:path";
import { CONCEPTS, templateFilename, type Concept } from "./concepts";

const TEMPLATES_DIR = path.join(process.cwd(), "app", "concept-voting", "templates");

export async function loadConceptTemplate(concept: Concept): Promise<string> {
  return readFile(path.join(TEMPLATES_DIR, templateFilename(concept.templateIndex)), "utf8");
}

/** Load every concept template keyed by concept id. Used by the gallery. */
export async function loadAllConceptTemplates(): Promise<Record<string, string>> {
  const entries = await Promise.all(
    CONCEPTS.map(async (concept) => [concept.id, await loadConceptTemplate(concept)] as const),
  );
  return Object.fromEntries(entries);
}
