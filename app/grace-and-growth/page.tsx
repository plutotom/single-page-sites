import Link from "next/link";

export default function GraceAndGrowthPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-(--gg-off-white) text-(--gg-slate)">
      {/* Hero */}
      <header className="bg-(--gg-terracotta) px-4 py-8 text-white sm:px-12 sm:py-12">
        <div className="mx-auto max-w-3xl">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider opacity-90 sm:text-sm">
            Wheaton College · CAPS International
          </p>
          <h1 className="text-xl font-semibold leading-tight tracking-tight sm:text-3xl">
            Grace and Growth: Supporting Children with ADHD through Psychology and Faith
          </h1>
          <p className="mt-3 text-xs opacity-95 sm:mt-4 sm:text-sm">
            Joanna Dasari, M.A. · Dave Mendrygal, M.A. · Isaiah Proctor, B.A. ·
            Sandra Yu Rueger, PhD.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-12 sm:py-12">
        {/* Primary CTA — placeholder: replace href with your survey/form URL */}
        <section
          className="mb-10 rounded-lg border-2 border-(--gg-blue) bg-(--gg-white) p-4 shadow-sm sm:mb-12 sm:p-6"
          aria-label="Share your feedback"
        >
          <p className="mb-3 text-(--gg-slate) font-medium sm:mb-4 sm:text-base">
            We welcome your insights on supporting children with ADHD in church
            settings.
          </p>
          <p className="mb-4 text-sm text-(--gg-slate-muted)">
            Please take a moment to share voluntary feedback — it helps us improve
            resources for ministry leaders and families.
          </p>
          <a
            href="#feedback"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md bg-(--gg-blue) px-5 py-3 text-base font-medium text-white transition-colors hover:bg-(--gg-blue-muted) focus:outline-none focus:ring-2 focus:ring-(--gg-blue) focus:ring-offset-2 active:opacity-90"
          >
            Share voluntary feedback
          </a>
        </section>

        {/* Summary sections */}
        <section className="mb-12">
          <h2 className="mb-4 border-b-2 border-(--gg-blue) pb-2 text-lg font-semibold text-(--gg-blue)">
            ADHD in Children
          </h2>
          <p className="mb-3 text-(--gg-slate-muted)">
            Approximately 9.8% of U.S. children aged 3–17 years are diagnosed
            with Attention Deficit/Hyperactivity Disorder (ADHD) (CDC, 2024).
            Approximately 1 in every 10 children is diagnosed with ADHD (5.2
            million children in the U.S.). ADHD is nearly twice as common in
            boys than girls.
          </p>
          <p className="text-(--gg-slate-muted)">
            ADHD is a neurodevelopmental condition that begins in childhood and
            often persists into adolescence and adulthood, characterized by
            inattention, hyperactivity, and impulsivity. Family environment
            plays a critical role in shaping the developmental outcomes of
            children with ADHD.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 border-b-2 border-(--gg-blue) pb-2 text-lg font-semibold text-(--gg-blue)">
            ADHD × Attributional Style (AS)
          </h2>
          <p className="mb-3 text-(--gg-slate-muted)">
            Children with ADHD frequently experience academic challenges, peer
            difficulties, and repeated negative feedback. How they explain
            setbacks—attributional style—matters across dimensions:
          </p>
          <ul className="mb-3 list-disc space-y-1 pl-5 text-(--gg-slate-muted)">
            <li>
              <strong>Internal vs. External:</strong> e.g. “It’s my fault.” vs.
              “The test was really hard.”
            </li>
            <li>
              <strong>Stable vs. Unstable:</strong> e.g. “I will always struggle
              with this.” vs. “I had a bad day today.”
            </li>
            <li>
              <strong>Global vs. Specific:</strong> e.g. “I’m bad at everything.”
              vs. “I struggle with math, but I’m good at reading.”
            </li>
          </ul>
          <p className="text-(--gg-slate-muted)">
            Over time, maladaptive attributional styles may contribute to reduced
            motivation, disengagement from tasks, and emotional difficulties,
            reinforcing patterns consistent with learned helplessness.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 border-b-2 border-(--gg-blue) pb-2 text-lg font-semibold text-(--gg-blue)">
            ADHD × Learned Helplessness (LH)
          </h2>
          <p className="text-(--gg-slate-muted)">
            Existing research suggests that children with ADHD may be
            particularly vulnerable to developing learned helplessness due to
            frequent experiences with academic failure, social rejection, and
            behavioral reprimands. These children may internalize repeated
            failure as evidence of their own inadequacy.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 border-b-2 border-(--gg-blue) pb-2 text-lg font-semibold text-(--gg-blue)">
            Practical Integration: 4 Step Model
          </h2>
          <p className="mb-4 text-(--gg-slate-muted)">
            Integrating psychology and faith (Jones, 1994; Rueger, Jones, &
            Worthington, 2019): understanding ADHD in children (emotional,
            behavioral, motivational struggles); cognitive vulnerability and how
            repeated failure shapes self-perceptions (e.g. Psalm 139:14);
            scriptural grounding for how children interpret setbacks (Psalm
            34:18, Psalm 139:14, Romans 12:2, Philippians 4:13, James 1:12); and
            redemptive synthesis for adaptive, hopeful attributions—e.g.
            perseverance (James 1:12) and reliance on God’s strength (Philippians
            4:13).
          </p>
          <h3 className="mb-2 font-semibold text-(--gg-slate)">
            Supporting Children with ADHD in Ministry: Practical Applications
          </h3>
          <ul className="list-disc space-y-1 pl-5 text-(--gg-slate-muted)">
            <li>Assign achievable leadership roles.</li>
            <li>Use predictable routines during church programs.</li>
            <li>Model grace-oriented responses to mistakes.</li>
            <li>Create smaller discussion groups.</li>
          </ul>
        </section>

        {/* References — replace placeholder items with full list from poster */}
        <section className="mb-12">
          <h2 className="mb-4 border-b-2 border-(--gg-blue) pb-2 text-lg font-semibold text-(--gg-blue)">
            References
          </h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-(--gg-slate-muted)">
            <li>CDC. (2024). Attention-Deficit/Hyperactivity Disorder (ADHD).</li>
            <li>Barkley, R. A. (2015). <em>Attention-Deficit Hyperactivity Disorder: A Handbook for Diagnosis and Treatment</em> (4th ed.). Guilford Press.</li>
            <li>Abramson, L. Y., Seligman, M. E. P., & Teasdale, J. D. (1978). Learned helplessness in humans: Critique and reformulation. <em>Journal of Abnormal Psychology</em>, 87(1), 49–74.</li>
            <li>Nolen-Hoeksema, S., Girgus, J. S., & Seligman, M. E. P. (1986). Learned helplessness in children: A longitudinal study of depression, achievement, and explanatory style. <em>Journal of Personality and Social Psychology</em>, 51(2), 435–442.</li>
            <li>Jones, S. L. (1994). <em>A constructive relationship for religion with the science and profession of psychology: Perhaps the boldest model yet.</em> American Psychological Association.</li>
            <li>Rueger, S. Y., Jones, S. L., & Worthington, E. L., Jr. (2019). Integration of faith and psychology. In E. L. Worthington Jr. & E. L. Johnson (Eds.), <em>Handbook of positive psychology, religion, and spirituality</em>. Springer.</li>
            {/* Add remaining references from poster here. */}
          </ol>
        </section>

        {/* Contact */}
        <section className="mb-12">
          <h2 className="mb-4 border-b-2 border-(--gg-blue) pb-2 text-lg font-semibold text-(--gg-blue)">
            Contact
          </h2>
          <p className="text-(--gg-slate-muted)">
            <a
              href="mailto:proctoi@gmail.com"
              className="font-medium text-(--gg-blue) underline underline-offset-2 hover:text-(--gg-blue-muted) focus:outline-none focus:ring-2 focus:ring-(--gg-blue) focus:ring-offset-2"
            >
              proctoi@gmail.com
            </a>
          </p>
        </section>

        {/* Secondary CTA reminder — same placeholder link; replace with your form URL */}
        <section className="mb-12 rounded-lg border border-(--gg-blue-muted) bg-(--gg-white) p-4 sm:p-6">
          <p className="mb-3 text-(--gg-slate-muted) sm:mb-4">
            Have feedback? We’d love to hear from you.
          </p>
          <a
            href="#feedback"
            className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-(--gg-blue) px-4 py-2.5 font-medium text-white transition-colors hover:bg-(--gg-blue-muted) focus:outline-none focus:ring-2 focus:ring-(--gg-blue) focus:ring-offset-2"
          >
            Share voluntary feedback
          </a>
        </section>

        <nav className="pt-4">
          <Link
            href="/"
            className="font-medium text-(--gg-blue) underline underline-offset-2 hover:text-(--gg-blue-muted) focus:outline-none focus:ring-2 focus:ring-(--gg-blue) focus:ring-offset-2"
          >
            Back to home
          </Link>
        </nav>
      </main>
    </div>
  );
}
