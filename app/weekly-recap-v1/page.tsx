"use client";

import Link from "next/link";
import { useState } from "react";
import { SleepLapseBlock } from "../recap-shared/SleepLapseBlock";
import { recapV1Data, type RankedCount, type RecapV1Data } from "./data";

const slides = ["overview", "triggers", "where", "protective", "progress"] as const;

type SlideId = (typeof slides)[number];

const slideTitles: Record<SlideId, string> = {
  overview: "Weekly overview",
  triggers: "What triggered you",
  where: "Where it happened",
  protective: "What protected you",
  progress: "Progress & patterns",
};

/** Maps recap sections to the “Wrapped” questions (shown as subtle hints). */
const slideLens: Record<SlideId, string> = {
  overview: "When did it happen?",
  triggers: "What made it more likely?",
  where: "What was going on?",
  protective: "What helped?",
  progress: "What to watch next week?",
};

export default function WeeklyRecapV1Page() {
  const [slideIndex, setSlideIndex] = useState(0);
  const data = recapV1Data;
  const currentSlide = slides[slideIndex] as SlideId;
  const isFirstSlide = slideIndex === 0;
  const isLastSlide = slideIndex === slides.length - 1;

  return (
    <main>
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] bg-[#141414] sm:items-center sm:justify-center sm:p-4">
        <section className="wrapped-phone relative flex w-full flex-col overflow-hidden sm:rounded-[2.2rem]">
          <header className="flex items-center justify-between border-b border-(--sw-line) bg-[#1c1c1c]/90 px-5 py-4 backdrop-blur-xl">
            <Link
              href="/"
              className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-(--sw-muted)"
            >
              Home
            </Link>
            <h1 className="text-lg font-bold tracking-[-0.02em] text-(--sw-text)">Recap v1</h1>
            <Link
              href="/spotify-wrapped-poc"
              className="wrapped-chip text-[0.6rem] normal-case tracking-normal"
            >
              Simple →
            </Link>
          </header>

          <div className="flex flex-1 flex-col px-5 pb-7 pt-5">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-(--sw-muted-soft)">
                  {slideTitles[currentSlide]}
                </p>
                <p className="mt-0.5 text-[0.62rem] text-(--sw-muted)">{slideLens[currentSlide]}</p>
              </div>
              <p className="shrink-0 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-(--sw-muted-soft)">
                {slideIndex + 1}/{slides.length}
              </p>
            </div>

            <section className="wrapped-slide flex flex-1" key={currentSlide}>
              <SlideContent slide={currentSlide} data={data} />
            </section>

            <footer className="mt-5 grid gap-5">
              <div className="flex justify-center gap-2" aria-label="Slide progress">
                {slides.map((item, index) => (
                  <span
                    key={item}
                    className={`h-2 rounded-full transition-all ${
                      index === slideIndex
                        ? "w-8 bg-(--sw-accent)"
                        : "w-2 bg-(--sw-line-strong)"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSlideIndex((c) => Math.max(c - 1, 0))}
                  disabled={isFirstSlide}
                  className="wrapped-nav-button grid h-14 w-14 place-items-center rounded-full border border-(--sw-line-strong) text-lg text-(--sw-text) transition disabled:cursor-not-allowed disabled:opacity-35"
                  aria-label="Previous slide"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => setSlideIndex(0)}
                  className="text-sm font-semibold text-(--sw-muted)"
                >
                  Restart
                </button>
                <button
                  type="button"
                  onClick={() => setSlideIndex((c) => Math.min(c + 1, slides.length - 1))}
                  disabled={isLastSlide}
                  className="wrapped-nav-button wrapped-nav-button-primary grid h-16 w-16 place-items-center rounded-full text-2xl font-bold transition disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Next slide"
                >
                  →
                </button>
              </div>
            </footer>
          </div>
        </section>
      </div>
    </main>
  );
}

function SlideContent({
  slide,
  data,
}: Readonly<{ slide: SlideId; data: RecapV1Data }>) {
  switch (slide) {
    case "overview":
      return <OverviewSlide data={data} />;
    case "triggers":
      return <TriggersSlide data={data} />;
    case "where":
      return <WhereSlide data={data} />;
    case "protective":
      return <ProtectiveSlide data={data} />;
    case "progress":
      return <ProgressSlide data={data} />;
  }
}

const WEEK_OVERVIEW_LETTERS = ["S", "M", "T", "W", "T", "F", "S"] as const;
const WEEK_OVERVIEW_FULL_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

function OverviewWeekLapseStrip({
  days,
}: Readonly<{ days: RecapV1Data["overview"]["weekSundayToSaturday"] }>) {
  const lapseDayCount = days.filter((d) => d === "lapse").length;

  return (
    <div className="wrapped-row px-3 py-3">
      <p className="wrapped-week-label normal-case tracking-[0.06em]">
        This week (Sun–Sat)
      </p>
      <ul
        className="mt-3 grid grid-cols-7 gap-1.5 sm:gap-2"
        aria-label={`${lapseDayCount} days this week with at least one lapse`}
      >
        {days.map((status, index) => (
          <li key={WEEK_OVERVIEW_FULL_NAMES[index]} className="grid min-w-0 gap-1.5">
            <span
              className="wrapped-week-label text-center text-[0.55rem] tracking-[0.08em]"
              aria-hidden
            >
              {WEEK_OVERVIEW_LETTERS[index]}
            </span>
            <div
              className={`wrapped-v1-week-dot ${
                status === "clean" ? "wrapped-v1-week-dot-clean" : "wrapped-v1-week-dot-lapse"
              }`}
              title={`${WEEK_OVERVIEW_FULL_NAMES[index]}: ${status === "clean" ? "Clean" : "Lapse day"}`}
              aria-label={`${WEEK_OVERVIEW_FULL_NAMES[index]}, ${status === "clean" ? "no lapse" : "had lapse"}`}
            />
          </li>
        ))}
      </ul>
      <p className="mt-2.5 text-center text-[0.65rem] text-(--sw-muted)">
        {lapseDayCount === 0
          ? "No lapse days this week"
          : `${lapseDayCount} day${lapseDayCount === 1 ? "" : "s"} with at least one lapse`}
      </p>
    </div>
  );
}

function OverviewSlide({ data }: Readonly<{ data: RecapV1Data }>) {
  const { overview } = data;

  return (
    <article className="wrapped-card grid w-full gap-3 overflow-y-auto px-4 py-5">
      <SlideHeading title="Weekly overview" />
      <StatRow
        label="Longest streak of clean days (all-time)"
        value={`${overview.longestStreakCleanDaysAllTime} days`}
        highlight
      />
      <StatRow
        label="Total lapses this week"
        value={String(overview.lapseCountThisWeek)}
      />
      <OverviewWeekLapseStrip days={overview.weekSundayToSaturday} />
      <StatRow
        label="Average urge level at check-ins"
        value={`${overview.averageUrgeLevel.toFixed(1)} / 10`}
      />
    </article>
  );
}

function TriggersSlide({ data }: Readonly<{ data: RecapV1Data }>) {
  const { triggers } = data;
  const max = triggers.topTriggers[0]?.count ?? 1;

  return (
    <article className="wrapped-card grid w-full gap-4 overflow-y-auto px-4 py-5">
      <SlideHeading title="What triggered you" />
      <SectionLabel>Top triggers</SectionLabel>
      <RankedBars items={triggers.topTriggers} max={max} />
      <SectionLabel>Trigger combinations</SectionLabel>
      <ComboList items={triggers.triggerCombinations} />
      <SectionLabel>Strongest feeling before lapse</SectionLabel>
      <RankedList items={triggers.strongestFeelingBeforeLapse.slice(0, 4)} />
      <StatRow label="Most common lapse time window" value={triggers.mostCommonLapseTimeWindow} />
    </article>
  );
}

function WhereSlide({ data }: Readonly<{ data: RecapV1Data }>) {
  const { where } = data;
  const sections: { title: string; items: RankedCount[] }[] = [
    { title: "Location", items: where.locations },
    { title: "Device", items: where.devices },
    { title: "Platform", items: where.platforms },
    { title: "Social context", items: where.socialContext },
    { title: "Activity before lapse", items: where.activityBeforeLapse },
  ];

  return (
    <article className="wrapped-card grid w-full gap-4 overflow-y-auto px-4 py-5">
      <SlideHeading title="Where it happened" />
      {sections.map((s) => (
        <RankedSection key={s.title} title={s.title} items={s.items} />
      ))}
    </article>
  );
}

function ProtectiveSlide({ data }: Readonly<{ data: RecapV1Data }>) {
  const { protective } = data;
  const max = protective.topProtectiveFactors[0]?.count ?? 1;

  return (
    <article className="wrapped-card grid w-full gap-4 overflow-y-auto px-4 py-5">
      <SlideHeading title="What protected you" />
      <SectionLabel>Top protective factors</SectionLabel>
      <RankedBars items={protective.topProtectiveFactors} max={max} />
      <SectionLabel>Safest combinations</SectionLabel>
      <p className="px-1 text-xs leading-relaxed text-(--sw-muted)">
        Location + activity + people around — where you were least likely to relapse.
      </p>
      <ComboList items={protective.safestCombinations} />
      <SectionLabel>Strongest feeling when protected</SectionLabel>
      <RankedList items={protective.strongestFeelingWhenProtected.slice(0, 4)} />
      <StatRow label="Safest time window" value={protective.safestTimeWindow} />
      <SectionLabel>What helped you resist</SectionLabel>
      <RankedList items={protective.whatHelpedResist} />
    </article>
  );
}

function ProgressSlide({ data }: Readonly<{ data: RecapV1Data }>) {
  const { progress } = data;
  const { vsPreviousWeek: prev } = progress;

  return (
    <article className="wrapped-card grid w-full gap-3 overflow-y-auto px-4 py-5">
      <SlideHeading title="Progress & patterns" />
      <SleepLapseBlock stats={progress.sleepLapse} />
      <SectionLabel>Trends vs previous week</SectionLabel>
      <StatRow label="Lapse count" value={formatDelta(prev.lapseCount)} />
      <StatRow label="Relapse days" value={formatDelta(prev.relapseDays)} />
      <StatRow
        label="Average urge level at check-ins"
        value={formatDelta(prev.averageUrgeLevel, true)}
      />
      <StatRow
        label="Biggest improvement"
        value={`${progress.biggestImprovement.label} — ${progress.biggestImprovement.detail}`}
        highlight
      />
      <StatRow
        label="Biggest risk area next week"
        value={`${progress.biggestRiskArea.label} (${progress.biggestRiskArea.lapseCount} lapses)`}
      />
    </article>
  );
}

function SlideHeading({ title }: Readonly<{ title: string }>) {
  return (
    <h2 className="px-1 text-xl font-bold tracking-[-0.03em] text-(--sw-text)">{title}</h2>
  );
}

function SectionLabel({ children }: Readonly<{ children: string }>) {
  return <p className="wrapped-week-label px-1 pt-1">{children}</p>;
}

function StatRow({
  label,
  value,
  hint,
  highlight = false,
}: Readonly<{
  label: string;
  value: string;
  hint?: string;
  highlight?: boolean;
}>) {
  return (
    <div className="wrapped-row flex flex-col gap-1 px-3 py-2.5">
      <span className="wrapped-week-label normal-case tracking-[0.06em]">{label}</span>
      <span
        className={`text-sm font-semibold ${
          highlight ? "text-(--sw-accent)" : "text-(--sw-text)"
        }`}
      >
        {value}
      </span>
      {hint ? (
        <span className="text-[0.65rem] leading-snug text-(--sw-muted)">{hint}</span>
      ) : null}
    </div>
  );
}

function RankedBars({ items, max }: Readonly<{ items: RankedCount[]; max: number }>) {
  return (
    <ul className="grid gap-2 px-1">
      {items.map((item) => (
        <li key={item.label} className="grid gap-1">
          <div className="flex justify-between gap-2">
            <span className="text-sm font-medium text-(--sw-text)">{item.label}</span>
            <span className="text-xs font-semibold text-(--sw-muted)">{item.count}</span>
          </div>
          <div className="wrapped-bar-track">
            <div
              className="wrapped-bar-fill"
              style={{ width: `${Math.round((item.count / max) * 100)}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

function RankedList({ items }: Readonly<{ items: RankedCount[] }>) {
  return (
    <ul className="grid gap-2 px-1">
      {items.map((item, index) => (
        <li
          key={item.label}
          className="wrapped-row grid grid-cols-[1.5rem_1fr_auto] items-center gap-2 px-3 py-2"
        >
          <span className="text-sm font-bold text-(--sw-accent)">{index + 1}</span>
          <span className="text-sm text-(--sw-text)">{item.label}</span>
          <span className="text-xs font-semibold text-(--sw-muted)">{item.count}</span>
        </li>
      ))}
    </ul>
  );
}

function ComboList({
  items,
}: Readonly<{ items: RecapV1Data["triggers"]["triggerCombinations"] }>) {
  return (
    <ul className="grid gap-2 px-1">
      {items.map((combo) => (
        <li
          key={combo.labels.join("-")}
          className="wrapped-row flex justify-between gap-3 px-3 py-2.5"
        >
          <span className="text-sm text-(--sw-text)">{combo.labels.join(" + ")}</span>
          <span className="text-xs font-semibold text-(--sw-accent)">{combo.count}×</span>
        </li>
      ))}
    </ul>
  );
}

function RankedSection({
  title,
  items,
}: Readonly<{ title: string; items: RankedCount[] }>) {
  const max = items[0]?.count ?? 1;

  return (
    <div className="px-1">
      <SectionLabel>{title}</SectionLabel>
      <ul className="mt-2 grid gap-1.5">
        {items.map((item) => (
          <li
            key={item.label}
            className="wrapped-row flex items-center justify-between gap-3 px-3 py-2"
          >
            <span className="text-sm text-(--sw-text)">{item.label}</span>
            <div className="flex items-center gap-2">
              <div className="wrapped-bar-track w-14">
                <div
                  className="wrapped-bar-fill"
                  style={{ width: `${Math.round((item.count / max) * 100)}%` }}
                />
              </div>
              <span className="w-4 text-right text-xs font-semibold text-(--sw-muted)">
                {item.count}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function formatDelta(value: number, decimal = false): string {
  if (value === 0) return "No change";
  const sign = value > 0 ? "+" : "";
  return decimal ? `${sign}${value.toFixed(1)}` : `${sign}${value}`;
}
