/** Clockwise from top, matching your sketch. */
const STEPS = [
  {
    id: "thought",
    title: "Intrusive thought",
    detail: "Unwanted idea, image, or doubt.",
  },
  {
    id: "distress",
    title: "Distress",
    detail: "Anxiety, fear, or discomfort spikes.",
  },
  {
    id: "compulsion",
    title: "Compulsive behavior",
    detail: "Ritual or avoidance aimed at relief.",
  },
  {
    id: "relief",
    title: "Reduced anxiety, short-lived",
    detail: "Relief reinforces the loop.",
  },
] as const;

export function OcdReinforcementCycle() {
  return (
    <section
      className="ocd-reinf-section mb-10 rounded-xl border border-(--est-border) bg-(--est-card) p-5 shadow-sm sm:mb-12 sm:p-8"
      aria-labelledby="ocd-reinf-heading"
    >
      <h2
        id="ocd-reinf-heading"
        className="mb-2 text-lg font-semibold text-(--est-ink) sm:text-xl"
        style={{ fontFamily: "var(--font-est-serif), Georgia, serif" }}
      >
        OCD reinforcement cycle
      </h2>
      <p className="mb-6 max-w-prose text-sm leading-relaxed text-(--est-ink-muted) sm:mb-8 sm:text-base">
        A concise model of how compulsions can{" "}
        <strong className="font-medium text-(--est-ink)">
          reinforce the loop
        </strong>
        — useful alongside ERP, which breaks the cycle by blocking the
        compulsion while tolerating distress.
      </p>

      <div className="mx-auto grid max-w-md grid-cols-3 gap-2 sm:gap-3">
        <div className="col-span-3 flex justify-center">
          <article className="w-full max-w-[220px] rounded-xl border border-(--est-border) bg-(--est-surface) px-3 py-3 text-center shadow-sm">
            <p className="text-sm font-semibold text-(--est-ink)">
              {STEPS[0].title}
            </p>
            <p className="mt-1 text-xs text-(--est-ink-muted)">
              {STEPS[0].detail}
            </p>
          </article>
        </div>

        <article className="flex min-h-[120px] flex-col justify-center rounded-xl border border-(--est-border) bg-(--est-surface) px-2 py-3 text-center shadow-sm sm:min-h-[140px]">
          <p className="text-sm font-semibold leading-snug text-(--est-ink)">
            {STEPS[3].title}
          </p>
          <p className="mt-1 text-xs text-(--est-ink-muted)">
            {STEPS[3].detail}
          </p>
        </article>

        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-(--est-border) bg-(--est-card)/80 px-2 py-3 text-center">
          <p className="text-[11px] font-bold uppercase leading-tight tracking-wide text-(--est-step) sm:text-xs">
            OCD
            <br />
            Reinforcement
            <br />
            Cycle
          </p>
        </div>

        <article className="flex min-h-[120px] flex-col justify-center rounded-xl border border-(--est-border) bg-(--est-surface) px-2 py-3 text-center shadow-sm sm:min-h-[140px]">
          <p className="text-sm font-semibold text-(--est-ink)">
            {STEPS[1].title}
          </p>
          <p className="mt-1 text-xs text-(--est-ink-muted)">
            {STEPS[1].detail}
          </p>
        </article>

        <div className="col-span-3 flex justify-center">
          <article className="w-full max-w-[220px] rounded-xl border border-(--est-border) bg-(--est-surface) px-3 py-3 text-center shadow-sm">
            <p className="text-sm font-semibold text-(--est-ink)">
              {STEPS[2].title}
            </p>
            <p className="mt-1 text-xs text-(--est-ink-muted)">
              {STEPS[2].detail}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
