import Link from "next/link";
import { OcdReinforcementCycle } from "./OcdReinforcementCycle";

const MANUAL = {
  title:
    "Cognitive Behavioral Treatment of Childhood OCD: It’s Only a False Alarm",
  authors: "John Piacentini, Audra Langley, and Tami Roblek",
};

const OVERVIEW_POINTS = [
  "General info on OCD such as prevalence and differences in children, etc.",
  "Development of this treatment notes",
  "Research on this treatment program",
] as const;

const SESSIONS = [
  { n: 1, label: "Psychoeducaiton and Rationale" },
  { n: 2, label: "Creating Symptom Hierarchy and Psychoeducation" },
  { n: 3, label: "Beginning ERP and Challenging Negative Assumptions" },
  { n: 4, label: "Cognitive Restructuring and Blame Reduction" },
  { n: 5, label: "Dealing with Obsessions and Family Responses to OCD" },
  {
    n: 6,
    label: "Reviewing Progress and Child Responsibilities for Treatment",
  },
  { n: 7, label: "Troubleshooting Obstacles to ERP and Secondary Gain" },
  {
    n: 8,
    label: "Continuing ERP and Differentiating OCD Versus Non-OCD Behaviors",
  },
  { n: 9, label: "Addressing More Difficult Symptoms and Family Self-Care" },
  {
    n: 10,
    label: "Addressing More Difficult Symptoms and Family Problem Solving",
  },
  { n: 11, label: "Planning for Termination and Relapse Prevention" },
  { n: 12, label: "Graduation" },
] as const;

/** Parsed from source “Overall, this is: …” — same wording, split for layout. */
const TREATMENT_SEQUENCE = [
  "Evaluation",
  "Psychoeducation",
  "ERP",
  "Cognitive restructuring + other small CBT tools",
  "Educate family on how to not reinforce OCD",
  "Troubleshoot",
  "Practice more ERP",
  "Termination and relapse prevention",
] as const;

export default function EstResearchPage() {
  return (
    <div className="min-h-screen bg-(--est-surface) text-(--est-ink)">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-(--est-card) focus:px-4 focus:py-2 focus:text-sm focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-(--est-accent)"
      >
        Skip to main content
      </a>

      <header className="border-b border-(--est-border) bg-(--est-card) px-4 py-8 shadow-sm sm:px-8 sm:py-10">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4">
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center text-sm font-medium text-(--est-accent) underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-(--est-accent) focus:ring-offset-2"
            >
              ← Home
            </Link>
          </p>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-(--est-subtle) sm:text-sm">
            Clinical psychology · Cognitive Behavioral Therapy
          </p>
          <h1
            className="text-balance text-xl font-semibold leading-snug tracking-tight text-(--est-ink) sm:text-2xl md:text-3xl"
            style={{ fontFamily: "var(--font-est-serif), Georgia, serif" }}
          >
            Overview of the manual
          </h1>
          <p className="mt-4 text-base leading-relaxed text-(--est-ink-muted) sm:text-lg">
            <cite className="font-semibold not-italic text-(--est-ink)">
              {MANUAL.title}
            </cite>
            <span className="mt-2 block text-sm font-normal text-(--est-subtle) sm:text-base">
              {MANUAL.authors}
            </span>
          </p>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-3xl px-4 py-8 sm:px-8 sm:py-12">
        <section
          className="mb-10 rounded-xl border border-(--est-border) bg-(--est-card) p-5 shadow-sm sm:mb-12 sm:p-8"
          aria-labelledby="overview-heading"
        >
          <h2
            id="overview-heading"
            className="mb-4 text-lg font-semibold text-(--est-accent) sm:text-xl"
            style={{ fontFamily: "var(--font-est-serif), Georgia, serif" }}
          >
            What the manual covers
          </h2>
          <ul className="space-y-3 text-[15px] leading-relaxed text-(--est-ink-muted) sm:text-base">
            {OVERVIEW_POINTS.map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-(--est-accent)"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10 sm:mb-12" aria-labelledby="sessions-heading">
          <div className="mb-5 flex flex-col gap-1 sm:mb-6">
            <h2
              id="sessions-heading"
              className="text-lg font-semibold text-(--est-ink) sm:text-xl"
              style={{ fontFamily: "var(--font-est-serif), Georgia, serif" }}
            >
              Twelve-session structure
            </h2>
            <p className="text-sm text-(--est-subtle) sm:text-base">
              Session-by-session focus as outlined in the manual.
            </p>
          </div>
          <ol className="grid list-none gap-3 sm:grid-cols-2 sm:gap-4">
            {SESSIONS.map((s) => (
              <li key={s.n}>
                <article className="flex h-full min-h-[72px] gap-3 rounded-lg border border-(--est-border) bg-(--est-card) p-4 shadow-sm transition-shadow hover:shadow-md sm:min-h-0 sm:p-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-(--est-accent) text-sm font-semibold text-white"
                    aria-hidden
                  >
                    {s.n}
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <h3 className="text-[15px] font-medium leading-snug text-(--est-ink) sm:text-base">
                      <span className="sr-only">Session {s.n}: </span>
                      {s.label}
                    </h3>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="rounded-xl border border-(--est-border) bg-(--est-card) p-5 shadow-sm sm:p-8"
          aria-labelledby="sequence-heading"
        >
          <h2
            id="sequence-heading"
            className="mb-2 text-lg font-semibold text-(--est-ink) sm:text-xl"
            style={{ fontFamily: "var(--font-est-serif), Georgia, serif" }}
          >
            Overall treatment arc
          </h2>
          <p className="mb-6 text-sm text-(--est-subtle) sm:text-base">
            Summary of how the program progresses, in sequence.
          </p>

          <ol className="divide-y divide-(--est-border) rounded-lg border border-(--est-border) bg-(--est-surface)">
            {TREATMENT_SEQUENCE.map((step, i) => (
              <li
                key={step}
                className="flex min-h-[56px] flex-col gap-1 px-4 py-4 first:rounded-t-lg last:rounded-b-lg sm:flex-row sm:items-start sm:gap-4"
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-(--est-step-soft) text-xs font-semibold text-(--est-step)"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <p className="min-w-0 flex-1 text-[15px] leading-relaxed text-(--est-ink-muted) sm:pt-1 sm:text-base">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <OcdReinforcementCycle />

        <footer className="mt-10 border-t border-(--est-border) pt-8 text-center text-xs text-(--est-subtle) sm:mt-12">
          <p>EST research overview · Proctor</p>
        </footer>
      </main>
    </div>
  );
}
