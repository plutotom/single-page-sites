"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ConceptFrame } from "./ConceptFrame";
import { VoteBar } from "./VoteBar";
import {
  CONCEPTS,
  CONCEPTS_BY_COLLECTION,
  KIND_LABELS,
  getConceptIndex,
} from "../lib/concepts";
import {
  readLastGalleryConceptId,
  writeLastGalleryConceptId,
} from "../lib/votes";
import { useIsClient } from "../lib/use-is-client";

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable
  );
}

function resolveIndex(conceptId: string | null | undefined): number {
  if (!conceptId) return 0;
  const index = getConceptIndex(conceptId);
  return index >= 0 ? index : 0;
}

export function GalleryClient({
  templates,
  initialConceptId,
}: Readonly<{
  templates: Record<string, string>;
  initialConceptId?: string;
}>) {
  const isClient = useIsClient();
  const [hydrated, setHydrated] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (isClient && !hydrated) {
    const fromProp =
      initialConceptId && getConceptIndex(initialConceptId) >= 0
        ? initialConceptId
        : null;
    const fromStorage = readLastGalleryConceptId();
    setCurrentIndex(resolveIndex(fromProp ?? fromStorage));
    setHydrated(true);
  }

  useEffect(() => {
    if (!hydrated) return;
    const concept = CONCEPTS[currentIndex];
    if (concept) writeLastGalleryConceptId(concept.id);
  }, [currentIndex, hydrated]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isTypingTarget(event.target)) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setCurrentIndex(
          (index) => (index - 1 + CONCEPTS.length) % CONCEPTS.length,
        );
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setCurrentIndex((index) => (index + 1) % CONCEPTS.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const concept = CONCEPTS[currentIndex];
  if (!concept) return null;

  function selectConcept(index: number) {
    setCurrentIndex(
      ((index % CONCEPTS.length) + CONCEPTS.length) % CONCEPTS.length,
    );
  }

  return (
    <main className="concept-voting-shell">
      <div className="concept-voting-header-row">
        <div>
          <h1 className="concept-voting-heading">Every concept, in one place</h1>
          <p className="concept-voting-kicker">
            {CONCEPTS.length} screens across {CONCEPTS_BY_COLLECTION.length}{" "}
            collections. Vote Yes or No on each concept first — one vote per
            screen — then preview the mock below.
          </p>
        </div>
        <Link href="/" className="concept-voting-home-link">
          Home
        </Link>
      </div>

      <nav className="concept-voting-nav" aria-label="Concept collections">
        {CONCEPTS_BY_COLLECTION.map(
          ({ collection, concepts: group }, groupIndex) => (
            <div key={collection} className="concept-voting-nav-group">
              <span className="concept-voting-collection-label">
                {collection}
              </span>
              {group.map((item) => {
                const index = getConceptIndex(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    className="concept-voting-pill"
                    data-active={index === currentIndex}
                    onClick={() => selectConcept(index)}
                  >
                    {item.title}
                  </button>
                );
              })}
              {groupIndex < CONCEPTS_BY_COLLECTION.length - 1 ? (
                <span className="concept-voting-separator" aria-hidden="true" />
              ) : null}
            </div>
          ),
        )}
      </nav>

      <div className="concept-voting-meta">
        <div className="concept-voting-counter">
          {currentIndex + 1} / {CONCEPTS.length}
        </div>
        <h2 className="concept-voting-meta-title">
          {concept.title}
          <span
            className={`concept-voting-kind concept-voting-kind--${concept.kind}`}
          >
            {KIND_LABELS[concept.kind]}
          </span>
        </h2>
        <p className="concept-voting-description">{concept.description}</p>
      </div>

      <VoteBar key={concept.id} concept={concept} />

      <div className="concept-voting-stage">
        <button
          type="button"
          className="concept-voting-arrow"
          onClick={() => selectConcept(currentIndex - 1)}
          aria-label="Previous concept"
        >
          ‹
        </button>

        <ConceptFrame
          concept={concept}
          template={templates[concept.id] ?? ""}
        />

        <button
          type="button"
          className="concept-voting-arrow"
          onClick={() => selectConcept(currentIndex + 1)}
          aria-label="Next concept"
        >
          ›
        </button>
      </div>

      <div className="concept-voting-meta-footer">
        <Link
          href={`/concept-voting/c/${concept.id}`}
          className="concept-voting-text-button"
        >
          Open this concept directly →
        </Link>
      </div>

      <p className="concept-voting-footnote">
        All figures are placeholder and copy is shame-aware and
        non-pathologising throughout. “Wow value” screens use trend and
        co-occurrence language, never causal or guaranteed claims. Several
        depend on modelling or history the app may not capture yet.
      </p>
    </main>
  );
}
