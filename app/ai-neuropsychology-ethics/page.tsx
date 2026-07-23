import ContactSection from "./ContactSection";

export default function AiNeuropsychologyEthicsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-(--gg-off-white) text-(--gg-slate)">
      {/* Hero */}
      <header className="bg-(--gg-terracotta) px-4 py-8 text-white sm:px-12 sm:py-12">
        <div className="mx-auto max-w-3xl">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider opacity-90 sm:text-sm">
            Wheaton College · American Psychological Association · Poster
            Presentation
          </p>
          <h1 className="text-xl font-semibold leading-tight tracking-tight sm:text-3xl">
            Ethical and Developmental Considerations of AI in Neuropsychology
          </h1>
          <p className="mt-3 text-xs opacity-95 sm:mt-4 sm:text-sm">
            KaLeigh Bungard, M.S. · Marin Frame, B.A. · Ashton Major, B.A. ·
            Isaiah Proctor, B.A. · William Struthers, Ph.D. · Ben Pyykkonen,
            Ph.D.
          </p>
          <p className="mt-2 text-xs opacity-90 sm:text-sm">
            School of Psychology, Counseling and Family Therapy, Wheaton
            College, Wheaton, IL
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-12 sm:py-12">
        {/* Session Abstract */}
        <section className="mb-12">
          <h2 className="mb-4 border-b-2 border-(--gg-blue) pb-2 text-lg font-semibold text-(--gg-blue)">
            Session Abstract
          </h2>
          <p className="mb-4 text-(--gg-slate-muted)">
            As it rapidly develops, Artificial Intelligence (AI) has
            ever-expanding applications in the field of psychology. While
            ethical codes have been carefully crafted over the field&apos;s
            development, special consideration must be given to the specific
            application of AI in treatment and diagnostics. While clinicians
            must remain ethical in practice, there is also a pull toward
            relevance and the use of modern technology. Thus, several questions
            arise regarding the ethical application of such tools, particularly
            for special populations such as children and older adults, who have
            been historically vulnerable to technological advances.
          </p>
          <p className="mb-4 text-(--gg-slate-muted)">
            This narrative review will synthesize the existing literature on the
            ethical considerations involved in AI-supported diagnostic and
            treatment practices in neuropsychology across pediatric, adult, and
            geriatric populations. Each section will place special emphasis on
            the population&apos;s needs. For example, pediatrics will focus on
            issues of assent and consent; for adult populations, on autonomy and
            self-directed AI use; and for geriatrics, on capacity and dignity.
          </p>
          <p className="text-(--gg-slate-muted)">
            This will be a developmental and neuropsychological interpretation
            and application of the APA&apos;s 2025 &quot;Ethical Guidance for AI
            in the Professional Practice of Health Service Psychology,&quot;
            focusing on key ethical principles highlighted therein, including
            the necessity of human oversight and clinician responsibility,
            adjustments to informed consent and privacy practices, and
            mitigating biases and liability. The aim is to provide
            neuropsychologists with decision-making considerations and guidance
            for the ethical application of AI tools within treatment and
            diagnostic practices.
          </p>
        </section>

        {/* References */}
        <section className="mb-12">
          <h2 className="mb-4 border-b-2 border-(--gg-blue) pb-2 text-lg font-semibold text-(--gg-blue)">
            References
          </h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-(--gg-slate-muted)">
            <li>
              American Psychological Association. (2025).{" "}
              <em>
                Ethical guidance for AI in the professional practice of health
                service psychology
              </em>
              .
            </li>
            <li>
              American Psychological Association. (2026, February 2). Your teen
              turned to AI instead of you. What experts say parents can do.{" "}
              <a
                href="https://www.apa.org/topics/artificial-intelligence-machine-learning/teens-chatbots-parents"
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--gg-blue) underline underline-offset-2 hover:text-(--gg-blue-muted)"
              >
                https://www.apa.org/topics/artificial-intelligence-machine-learning/teens-chatbots-parents
              </a>
            </li>
            <li>
              Alessandro, G., Dimitri, O., Cristina, B., & Anna, M. (2025). The
              emotional impact of generative AI: negative emotions and
              perception of threat.{" "}
              <em>Behavior & Information Technology</em>, 44(4), 676–693.{" "}
              <a
                href="https://doi.org/10.1080/0144929X.2024.2333933"
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--gg-blue) underline underline-offset-2 hover:text-(--gg-blue-muted)"
              >
                https://doi.org/10.1080/0144929X.2024.2333933
              </a>
            </li>
            <li>
              Al-Abyadh, M., Kalista Noor, L., & Fawzi, A. (2025). Between
              Cognitive Augmentation and Atrophy: AI&apos;s Role in Reshaping
              Human Intelligence. <em>Interciencia</em>.{" "}
              <a
                href="https://doi.org/10.59671/uk4mF"
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--gg-blue) underline underline-offset-2 hover:text-(--gg-blue-muted)"
              >
                https://doi.org/10.59671/uk4mF
              </a>
            </li>
            <li>
              Andoh, E. (2026, January 1). AI chatbots and digital companions
              are reshaping emotional connection.{" "}
              <em>Monitor on Psychology</em>, 57(1).{" "}
              <a
                href="https://www.apa.org/monitor/2026/01-02/trends-digital-ai-relationships-emotional-connection"
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--gg-blue) underline underline-offset-2 hover:text-(--gg-blue-muted)"
              >
                https://www.apa.org/monitor/2026/01-02/trends-digital-ai-relationships-emotional-connection
              </a>
            </li>
            <li>
              Brown, B., et al. (2020). Language Models are Few-Shot Learners
              (GPT-3).{" "}
              <a
                href="https://arxiv.org/abs/2005.14165"
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--gg-blue) underline underline-offset-2 hover:text-(--gg-blue-muted)"
              >
                https://arxiv.org/abs/2005.14165
              </a>
            </li>
            <li>
              French, A. M., & Shim, J. P. (2025). From Artificial Intelligence
              to Augmented Intelligence: A Shift in Perspective, Application,
              and Conceptualization of AI.{" "}
              <em>Information Systems Frontiers</em>, 27(4), 1345–1366.{" "}
              <a
                href="https://doi.org/10.1007/s10796-024-10562-2"
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--gg-blue) underline underline-offset-2 hover:text-(--gg-blue-muted)"
              >
                https://doi.org/10.1007/s10796-024-10562-2
              </a>
            </li>
            <li>
              Jamil Abusamra, H. N., Ali, S. H. M., Khidir Elhussien, W. A.,
              Ahmed Mirghani, A. M., Alameen Ahmed, A. A., & Abdelrahman
              Ibrahim, M. E. (2025). Ethical and practical considerations of
              artificial intelligence in pediatric medicine: A systematic
              review. <em>Cureus</em>.{" "}
              <a
                href="https://doi.org/10.7759/cureus.79024"
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--gg-blue) underline underline-offset-2 hover:text-(--gg-blue-muted)"
              >
                https://doi.org/10.7759/cureus.79024
              </a>
            </li>
            <li>
              Kronenberger, O. R., Gottlieb, M. C., & Cullum, C. M. (2026).
              Large language models in neuropsychology: Emerging applications
              and ethical considerations.{" "}
              <em>The Clinical Neuropsychologist</em>, 40(3), 753–775.{" "}
              <a
                href="https://doi.org/10.1080/13854046.2025.2604094"
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--gg-blue) underline underline-offset-2 hover:text-(--gg-blue-muted)"
              >
                https://doi.org/10.1080/13854046.2025.2604094
              </a>
            </li>
            <li>
              Lubbe, A., Marais, E., & Kruger, D. (2025). Cultivating
              independent thinkers: The triad of artificial intelligence,
              Bloom&apos;s taxonomy and critical thinking in assessment
              pedagogy. <em>Education and Information Technologies</em>.{" "}
              <a
                href="https://doi.org/10.1007/s10639-025-13476-x"
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--gg-blue) underline underline-offset-2 hover:text-(--gg-blue-muted)"
              >
                https://doi.org/10.1007/s10639-025-13476-x
              </a>
            </li>
            <li>
              Mohamed, S., Ben-Jaafar, A., Frimpong, M., Roy, S., Sanker, V.,
              Nkrumah-Boateng, P. A., Imran, S., Mumeen, A. A., Mohamed, S., &
              Wireko, A. A. (2026). Applying artificial intelligence in
              neurodevelopmental disorders management and research.{" "}
              <em>European Journal of Medical Research</em>, 31(1).{" "}
              <a
                href="https://doi.org/10.1186/s40001-025-03740-8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--gg-blue) underline underline-offset-2 hover:text-(--gg-blue-muted)"
              >
                https://doi.org/10.1186/s40001-025-03740-8
              </a>
            </li>
            <li>
              Napkin AI. (2026). AI concept hierarchy [Diagram generation tool].{" "}
              <a
                href="https://app.napkin.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--gg-blue) underline underline-offset-2 hover:text-(--gg-blue-muted)"
              >
                https://app.napkin.ai
              </a>
            </li>
            <li>
              Seo Yi Chng, Jun, M., Lee, Y. S., Cheng, L. T.-E., Kapur, J.,
              Eriksson, J. G., Chong, Y. S., & Savulescu, J. (2025). Ethical
              considerations in AI for child health and recommendations for
              child-centered medical AI. <em>NPJ Digital Medicine</em>, 8(1).{" "}
              <a
                href="https://doi.org/10.1038/s41746-025-01541-1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--gg-blue) underline underline-offset-2 hover:text-(--gg-blue-muted)"
              >
                https://doi.org/10.1038/s41746-025-01541-1
              </a>
            </li>
            <li>
              Serafimovska, A., Challinor, K. L., & Florio, T. (2025). The AI
              inflection point in clinical neuropsychology: a call to action.{" "}
              <em>Journal of Clinical and Experimental Neuropsychology</em>,
              47(6), 594–600.{" "}
              <a
                href="https://doi.org/10.1080/13803395.2025.2561162"
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--gg-blue) underline underline-offset-2 hover:text-(--gg-blue-muted)"
              >
                https://doi.org/10.1080/13803395.2025.2561162
              </a>
            </li>
            <li>
              Vaswani, A., et al. (2017). Attention Is All You Need.{" "}
              <a
                href="https://arxiv.org/abs/1706.03762"
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--gg-blue) underline underline-offset-2 hover:text-(--gg-blue-muted)"
              >
                https://arxiv.org/abs/1706.03762
              </a>
            </li>
            <li>
              Wolff, B. (2026). Artificial intelligence and natural language
              processing in modern clinical neuropsychology: A narrative review.{" "}
              <em>The Clinical Neuropsychologist</em>, 40(3), 728–752.{" "}
              <a
                href="https://doi.org/10.1080/13854046.2025.2547934"
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--gg-blue) underline underline-offset-2 hover:text-(--gg-blue-muted)"
              >
                https://doi.org/10.1080/13854046.2025.2547934
              </a>
            </li>
          </ol>
        </section>

        <ContactSection />
      </main>
    </div>
  );
}
