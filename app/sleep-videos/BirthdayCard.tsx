export default function BirthdayCard() {
  return (
    <section
      className="birthday-card mb-8 overflow-hidden rounded-2xl border border-(--sv-birthday-border) bg-(--sv-birthday-bg) p-5 shadow-[0_0_40px_rgba(138,162,255,0.12)] sm:p-7"
      aria-label="Birthday message"
    >
      <div className="mb-4 flex items-center gap-3">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full bg-(--sv-birthday-icon-bg) text-lg"
          aria-hidden="true"
        >
          🎂
        </span>
        <h2 className="text-xl font-semibold tracking-tight text-(--sv-text) sm:text-2xl">
          Happy birthday my love!
        </h2>
      </div>

      <div className="space-y-4 text-sm leading-relaxed text-(--sv-muted) sm:text-base">
        <p>
          I love you so much and I hope your birthday was a little special. You
          make everyday better by just being uniquely you.
        </p>
        <p>
          I love you more then words, so here are some sounds from your girl to
          put you to sleep tonight cuddled up next to me
        </p>
      </div>

      <p className="mt-5 text-sm font-medium italic text-(--sv-text) sm:text-base">
        — with all my love, Isaiah
      </p>
    </section>
  );
}
