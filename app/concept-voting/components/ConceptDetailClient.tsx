"use client";

import Link from "next/link";
import { ConceptFrame } from "./ConceptFrame";
import { VoteBar } from "./VoteBar";
import type { Concept } from "../lib/concepts";

export function ConceptDetailClient({
  concept,
  template,
}: Readonly<{
  concept: Concept;
  template: string;
}>) {
  return (
    <main className="concept-voting-detail-shell">
      <div className="concept-voting-detail-topbar">
        <Link href="/concept-voting" className="concept-voting-home-link">
          ← All concepts
        </Link>
        <span className="concept-voting-counter">{concept.collection}</span>
      </div>

      <section className="concept-voting-detail-card">
        <div>
          <p className="concept-voting-counter">Concept screen</p>
          <h1 className="concept-voting-heading">{concept.title}</h1>
          <p className="concept-voting-kicker">{concept.description}</p>
        </div>

        <div className="concept-voting-detail-stage">
          <ConceptFrame concept={concept} template={template} />
        </div>

        <VoteBar concept={concept} />
      </section>
    </main>
  );
}
