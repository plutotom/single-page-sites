import ContactSection from "./ContactSection";

export default function GraceAndGrowthPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-(--gg-off-white) text-(--gg-slate)">
      {/* Hero */}
      <header className="bg-(--gg-terracotta) px-4 py-8 text-white sm:px-12 sm:py-12">
        <div className="mx-auto max-w-3xl">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider opacity-90 sm:text-sm">
            Wheaton College ·{" "}
            <a
              href="https://caps.net/2026-conference/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-(--gg-terracotta)"
            >
              Christian Association for Psychological Studies
            </a>
          </p>
          <h1 className="text-xl font-semibold leading-tight tracking-tight sm:text-3xl">
            Grace and Growth: Supporting Children with ADHD through Psychology
            and Faith
          </h1>
          <p className="mt-3 text-xs opacity-95 sm:mt-4 sm:text-sm">
            Joanna Dasari, M.A. · Dave Mendrygal, M.A. · Isaiah Proctor, B.A. ·
            Sandra Yu Rueger, Ph.D., L.M.F.T.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-12 sm:py-12">
        {/* Primary CTA — feedback form */}
        <section
          className="mb-10 rounded-lg border-2 border-(--gg-blue) bg-(--gg-white) p-4 shadow-sm sm:mb-12 sm:p-6"
          aria-label="Share your feedback"
        >
          <p className="mb-3 text-(--gg-slate) font-medium sm:mb-4 sm:text-base">
            We welcome your insights on supporting children with ADHD in church
            settings.
          </p>
          <p className="mb-4 text-sm text-(--gg-slate-muted)">
            Feedback on Supporting Children with ADHD in Church Ministries
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfib6InL6EbgMjVZJe1BXfZyzKv6WeohjYY97hsfx_t0MPJ1g/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md bg-(--gg-blue) px-5 py-3 text-base font-medium text-white transition-colors hover:bg-(--gg-blue-muted) focus:outline-none focus:ring-2 focus:ring-(--gg-blue) focus:ring-offset-2 active:opacity-90"
          >
            Share voluntary feedback
          </a>
        </section>

        {/* About This Research */}
        <section className="mb-12">
          <h2 className="mb-4 border-b-2 border-(--gg-blue) pb-2 text-lg font-semibold text-(--gg-blue)">
            About This Research
          </h2>
          <p className="mb-4 text-(--gg-slate-muted)">
            Children with ADHD often face repeated academic challenges, social
            difficulties, and negative feedback that can lead to learned
            helplessness—a pattern where they internalize failure as evidence of
            their own inadequacy. This research explores how integrating
            psychological science with faith-based perspectives can foster
            adaptive, hopeful attributions that emphasize growth, grace, and
            possibility.
          </p>
          <p className="text-(--gg-slate-muted)">
            Our framework bridges shared concerns between psychologists and
            faith communities, combining scientific knowledge about ADHD and
            cognitive/behavioral vulnerability with scriptural wisdom that affirms children
            are &quot;fearfully and wonderfully made&quot; and capable of growth
            despite setbacks. This integration supports interventions that
            emphasize external, unstable, and specific explanations for setbacks
            while reinforcing spiritual truths about perseverance and reliance
            on strength beyond oneself.
          </p>
        </section>

        {/* References */}
        <section className="mb-12">
          <h2 className="mb-4 border-b-2 border-(--gg-blue) pb-2 text-lg font-semibold text-(--gg-blue)">
            References
          </h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-(--gg-slate-muted)">
            <li>
              Abramson, L. Y., Seligman, M. E. P., & Teasdale, J. D. (1978).
              Learned helplessness in humans: Critique and reformulation.{" "}
              <em>Journal of Abnormal Psychology</em>, 87(1), 49–74.
            </li>
            <li>
              Barkley, R. A. (2015).{" "}
              <em>
                Attention-deficit hyperactivity disorder: A handbook for
                diagnosis and treatment
              </em>{" "}
              (4th ed.). Guilford Press.
            </li>
            <li>
              CDC. (2024, November 19). Data and Statistics on ADHD.
              Attention-Deficit / Hyperactivity Disorder (ADHD).{" "}
              <a
                href="https://www.cdc.gov/adhd/data/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--gg-blue) underline underline-offset-2 hover:text-(--gg-blue-muted)"
              >
                https://www.cdc.gov/adhd/data/index.html
              </a>
            </li>
            <li>
              Claussen, A. H., Holbrook, J. R., Hutchins, H. J., Robinson, L.
              R., Bloomfield, J., Meng, L., Bitsko, R. H., O’Masta, B., Cerles,
              A., Maher, B., Rush, M., & Kaminski, J. W. (2022). All in the
              Family? A Systematic Review and Meta-analysis of Parenting and
              Family Environment as Risk Factors for
              Attention-Deficit/Hyperactivity Disorder (ADHD) in Children.{" "}
              <em>Prevention Science</em>, 1–23.{" "}
              <a
                href="https://doi.org/10.1007/s11121-022-01358-4"
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--gg-blue) underline underline-offset-2 hover:text-(--gg-blue-muted)"
              >
                https://doi.org/10.1007/s11121-022-01358-4
              </a>
            </li>
            <li>
              DuPaul, G. J., Pollack, B., & Pinho, T. D. (2017).
              Attention-Deficit/Hyperactivity Disorder. In S. Goldstein & M.
              DeVries (Eds.),{" "}
              <em>Handbook of DSM-5 Disorders in Children and Adolescents</em>{" "}
              (pp. 399–416). Springer.{" "}
              <a
                href="https://doi.org/10.1007/978-3-319-57196-6_20"
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--gg-blue) underline underline-offset-2 hover:text-(--gg-blue-muted)"
              >
                https://doi.org/10.1007/978-3-319-57196-6_20
              </a>
            </li>
            <li>
              Jones, S. L. (1994). A constructive relationship for religion with
              the science and profession of psychology: Perhaps the boldest
              model yet. <em>American Psychologist</em>, 49(3), 184–199.{" "}
              <a
                href="https://doi.org/10.1037/0003-066x.49.3.184"
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--gg-blue) underline underline-offset-2 hover:text-(--gg-blue-muted)"
              >
                https://doi.org/10.1037/0003-066x.49.3.184
              </a>
            </li>
            <li>
              Nolen-Hoeksema, S., Girgus, J. S., & Seligman, M. E. P. (1986).
              Learned helplessness in children: A longitudinal study of
              depression, achievement, and explanatory style.{" "}
              <em>Journal of Personality and Social Psychology</em>, 51(2),
              435–442.{" "}
              <a
                href="https://doi.org/10.1037/0022-3514.51.2.435"
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--gg-blue) underline underline-offset-2 hover:text-(--gg-blue-muted)"
              >
                https://doi.org/10.1037/0022-3514.51.2.435
              </a>
            </li>
            <li>
              Rueger, S. Y., Jones, S. L., & Worthington, E. L. (2019). Using
              Jones’s integration approach to accommodate attachment-based
              family therapy to Christian treatment of depression in
              adolescence. <em>Journal of Psychology and Theology</em>, 48(1),
              66–81.{" "}
              <a
                href="https://doi.org/10.1177/0091647119854118"
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--gg-blue) underline underline-offset-2 hover:text-(--gg-blue-muted)"
              >
                https://doi.org/10.1177/0091647119854118
              </a>
            </li>
          </ol>
        </section>

        <ContactSection />

        {/* Secondary CTA reminder */}
        <section className="mb-12 rounded-lg border border-(--gg-blue-muted) bg-(--gg-white) p-4 sm:p-6">
          <p className="mb-3 text-(--gg-slate-muted) sm:mb-4">
            Have feedback? We’d love to hear from you.
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfib6InL6EbgMjVZJe1BXfZyzKv6WeohjYY97hsfx_t0MPJ1g/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-(--gg-blue) px-4 py-2.5 font-medium text-white transition-colors hover:bg-(--gg-blue-muted) focus:outline-none focus:ring-2 focus:ring-(--gg-blue) focus:ring-offset-2"
          >
            Share voluntary feedback
          </a>
        </section>
      </main>
    </div>
  );
}
