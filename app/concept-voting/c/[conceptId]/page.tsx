import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConceptDetailClient } from "../../components/ConceptDetailClient";
import { CONCEPTS, getConcept } from "../../lib/concepts";
import { loadConceptTemplate } from "../../lib/templates";

type PageProps = Readonly<{
  params: Promise<{ conceptId: string }>;
}>;

export function generateStaticParams() {
  return CONCEPTS.map((concept) => ({ conceptId: concept.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { conceptId } = await params;
  const concept = getConcept(conceptId);
  if (!concept) return { title: "Concept not found" };

  return {
    title: `${concept.title} · Concept voting`,
    description: concept.description,
  };
}

export default async function ConceptDetailPage({ params }: PageProps) {
  const { conceptId } = await params;
  const concept = getConcept(conceptId);
  if (!concept) notFound();

  const template = await loadConceptTemplate(concept);
  return <ConceptDetailClient concept={concept} template={template} />;
}
