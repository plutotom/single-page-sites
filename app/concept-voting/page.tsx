import { GalleryClient } from "./components/GalleryClient";
import { loadAllConceptTemplates } from "./lib/templates";

export default async function ConceptVotingPage() {
  const templates = await loadAllConceptTemplates();
  return <GalleryClient templates={templates} />;
}
