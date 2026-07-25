"use client";

import { useMemo } from "react";
import type { Concept } from "../lib/concepts";

function buildConceptDocument(template: string): string {
  // Templates use `:host` (shadow-DOM style). Scope them to the iframe root.
  const scopedTemplate = template.replaceAll(":host", "#concept-root");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@200;300;400;500;600;700;800&display=swap"
      rel="stylesheet"
    />
    <style>
      html, body {
        width: 100%;
        height: 100%;
        margin: 0;
        overflow: hidden;
        background: #000;
      }
      #concept-root {
        width: 100%;
        height: 100%;
        margin: 0;
      }
      [data-stage] {
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <div id="concept-root">${scopedTemplate}</div>
    <script>
      document.querySelectorAll('[data-stage]').forEach(function (element) {
        element.addEventListener('click', function () {
          var target = element.getAttribute('data-stage');
          document.querySelectorAll('.stage').forEach(function (stage) {
            stage.classList.toggle('active', stage.id === 'stage-' + target);
          });
        });
      });
    </script>
  </body>
</html>`;
}

export function ConceptFrame({
  concept,
  template,
  className = "",
}: Readonly<{
  concept: Concept;
  template: string;
  className?: string;
}>) {
  const isFull = concept.presentation === "full";
  const srcDoc = useMemo(() => buildConceptDocument(template), [template]);

  return (
    <div
      className={[
        "concept-voting-device",
        isFull ? "concept-voting-device--full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <iframe
        className={[
          "concept-voting-frame",
          isFull ? "concept-voting-frame--full" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        srcDoc={srcDoc}
        title={`${concept.title} concept screen`}
        sandbox="allow-scripts"
        referrerPolicy="no-referrer"
        loading="eager"
      />
    </div>
  );
}
