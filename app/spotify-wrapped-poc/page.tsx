"use client";

import Link from "next/link";
import { useState } from "react";
import { SleepLapseBlock } from "../recap-shared/SleepLapseBlock";
import { defaultSleepLapseDemo, type SleepLapseStats } from "../recap-shared/sleep-lapse";

type RankedItem = {
  label: string;
  count: number;
};

type TriggerCombo = {
  labels: string[];
  count: number;
};

type WeekDay = {
  label: string;
  status: "clean" | "lapse";
};

type RecapData = {
  week: {
    days: WeekDay[];
    cleanDays: number;
    relapseDays: number;
    checkInsCompleted: number;
    checkInsTotal: number;
    currentStreak: number;
    bestStreakThisWeek: number;
  };
  lapseCount: number;
  topTriggers: RankedItem[];
  triggerCombinations: TriggerCombo[];
  triggersPrecedingLapse: RankedItem[];
  relapsePatterns: {
    locations: RankedItem[];
    devices: RankedItem[];
    platforms: RankedItem[];
    timeOfDay: RankedItem[];
    socialContext: RankedItem[];
  };
  protective: {
    topProtectiveFactors: RankedItem[];
    safestCombinations: TriggerCombo[];
    feelingsWhenProtected: RankedItem[];
    safestTimeWindow: string;
  };
  sleepLapse: SleepLapseStats;
};

const recapData: RecapData = {
  week: {
    days: [
      { label: "M", status: "clean" },
      { label: "T", status: "clean" },
      { label: "W", status: "clean" },
      { label: "T", status: "clean" },
      { label: "F", status: "clean" },
      { label: "S", status: "lapse" },
      { label: "S", status: "lapse" },
    ],
    cleanDays: 5,
    relapseDays: 2,
    checkInsCompleted: 7,
    checkInsTotal: 7,
    currentStreak: 3,
    bestStreakThisWeek: 5,
  },
  lapseCount: 12,
  topTriggers: [
    { label: "Bored", count: 8 },
    { label: "Alone", count: 6 },
    { label: "Time of day", count: 6 },
    { label: "Stress", count: 4 },
    { label: "Fatigue", count: 3 },
  ],
  triggerCombinations: [
    { labels: ["Bored", "Alone"], count: 5 },
    { labels: ["Late night", "Alone"], count: 4 },
    { labels: ["Stress", "Home"], count: 3 },
  ],
  triggersPrecedingLapse: [
    { label: "Bored", count: 8 },
    { label: "Alone", count: 6 },
    { label: "Time of day", count: 6 },
    { label: "Scrolling", count: 5 },
    { label: "Stress", count: 4 },
  ],
  relapsePatterns: {
    locations: [
      { label: "Home", count: 9 },
      { label: "Bedroom", count: 5 },
      { label: "Work", count: 3 },
    ],
    devices: [
      { label: "Phone", count: 10 },
      { label: "Laptop", count: 4 },
      { label: "Tablet", count: 1 },
    ],
    platforms: [
      { label: "Browser", count: 7 },
      { label: "Social apps", count: 5 },
      { label: "Streaming", count: 3 },
    ],
    timeOfDay: [
      { label: "Late night", count: 7 },
      { label: "Afternoon", count: 3 },
      { label: "Morning", count: 2 },
    ],
    socialContext: [
      { label: "Alone", count: 10 },
      { label: "Partner nearby", count: 2 },
      { label: "With others", count: 0 },
    ],
  },
  protective: {
    topProtectiveFactors: [
      { label: "With other people", count: 14 },
      { label: "Gym", count: 11 },
      { label: "Exercise", count: 10 },
      { label: "Coffee shop", count: 8 },
      { label: "Meetings", count: 7 },
    ],
    safestCombinations: [
      { labels: ["Gym", "Exercise", "With others"], count: 9 },
      { labels: ["Coffee shop", "With others", "Morning"], count: 7 },
      { labels: ["Outdoors", "Walking", "With others"], count: 6 },
      { labels: ["Work", "Meetings", "With others"], count: 5 },
    ],
    feelingsWhenProtected: [
      { label: "Calm", count: 12 },
      { label: "Focused", count: 9 },
      { label: "Connected", count: 7 },
      { label: "Grounded", count: 5 },
    ],
    safestTimeWindow: "Morning (6–9am)",
  },
  sleepLapse: defaultSleepLapseDemo,
};

const slides = ["overview", "triggers", "patterns", "protective", "takeaways"] as const;

type SlideId = (typeof slides)[number];

const slideTitles: Record<SlideId, string> = {
  overview: "This week",
  triggers: "Triggers",
  patterns: "Where & when",
  protective: "What protected you",
  takeaways: "By the numbers",
};

export default function SpotifyWrappedPocPage() {
  const [slideIndex, setSlideIndex] = useState(0);
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
            <h1 className="text-lg font-bold tracking-[-0.02em] text-(--sw-text)">
              Recap simple
            </h1>
            <Link
              href="/weekly-recap-v1"
              className="wrapped-chip text-[0.6rem] normal-case tracking-normal"
            >
              Full v1 →
            </Link>
          </header>

          <div className="flex flex-1 flex-col px-5 pb-7 pt-5">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-(--sw-muted-soft)">
                {slideTitles[currentSlide]}
              </p>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-(--sw-muted-soft)">
                {slideIndex + 1}/{slides.length}
              </p>
            </div>

            <section className="wrapped-slide flex flex-1" key={currentSlide}>
              <SlideContent slide={currentSlide} data={recapData} />
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
                  onClick={() => setSlideIndex((current) => Math.max(current - 1, 0))}
                  disabled={isFirstSlide}
                  className="wrapped-nav-button grid h-14 w-14 place-items-center rounded-full border border-(--sw-line-strong) text-lg text-(--sw-text) transition disabled:cursor-not-allowed disabled:opacity-35"
                  aria-label="Go to previous slide"
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
                  onClick={() =>
                    setSlideIndex((current) => Math.min(current + 1, slides.length - 1))
                  }
                  disabled={isLastSlide}
                  className="wrapped-nav-button wrapped-nav-button-primary grid h-16 w-16 place-items-center rounded-full text-2xl font-bold transition disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Go to next slide"
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
}: Readonly<{ slide: SlideId; data: RecapData }>) {
  if (slide === "overview") return <OverviewSlide data={data} />;
  if (slide === "triggers") return <TriggersSlide data={data} />;
  if (slide === "patterns") return <PatternsSlide data={data} />;
  if (slide === "protective") return <ProtectiveSlide data={data} />;
  return <TakeawaysSlide data={data} />;
}

function OverviewSlide({ data }: Readonly<{ data: RecapData }>) {
  const { week } = data;

  return (
    <article className="wrapped-card grid w-full gap-5 px-5 py-6">
      <p className="wrapped-week-label">Week at a glance</p>

      <div className="grid grid-cols-3 gap-3 text-center">
        <WeekMetric value={week.cleanDays} label="clean days" tone="clean" />
        <WeekMetric value={week.relapseDays} label="relapse days" tone="lapse" />
        <WeekMetric
          value={`${week.checkInsCompleted}/${week.checkInsTotal}`}
          label="check-ins"
          tone="check"
        />
      </div>

      <div>
        <ul
          className="grid grid-cols-7 gap-1.5"
          aria-label="This week's days: green for clean, rose for relapse"
        >
          {week.days.map((day, index) => (
            <li key={`${day.label}-${index}`} className="grid gap-1.5">
              <div
                className={`wrapped-week-day ${
                  day.status === "clean"
                    ? "wrapped-week-day-clean"
                    : "wrapped-week-day-lapse"
                }`}
                title={day.status === "clean" ? "Clean day" : "Relapse day"}
              />
              <span className="wrapped-week-label text-center text-[0.55rem]">
                {day.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t border-(--sw-line) pt-4">
        <div>
          <p className="text-2xl font-bold tracking-[-0.03em] text-(--sw-text)">
            <span aria-hidden className="mr-1">
              🔥
            </span>
            {week.currentStreak} days
          </p>
          <p className="wrapped-week-label mt-1.5">current streak</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold tracking-[-0.03em] text-(--sw-best)">
            {week.bestStreakThisWeek} days
          </p>
          <p className="wrapped-week-label mt-1.5">best this week</p>
        </div>
      </div>

      <SleepLapseBlock stats={data.sleepLapse} />

      <p className="text-center text-xs text-(--sw-muted)">
        {data.lapseCount} total lapses logged this week
      </p>
    </article>
  );
}

function WeekMetric({
  value,
  label,
  tone,
}: Readonly<{
  value: number | string;
  label: string;
  tone: "clean" | "lapse" | "check";
}>) {
  const toneClass =
    tone === "clean"
      ? "text-(--sw-clean)"
      : tone === "lapse"
        ? "text-(--sw-lapse)"
        : "text-(--sw-check)";

  return (
    <div>
      <p className={`wrapped-week-stat ${toneClass}`}>{value}</p>
      <p className="wrapped-week-label mt-1.5">{label}</p>
    </div>
  );
}

function TriggersSlide({ data }: Readonly<{ data: RecapData }>) {
  const maxTrigger = data.topTriggers[0]?.count ?? 1;

  return (
    <article className="wrapped-card grid w-full gap-4 overflow-y-auto px-4 py-5">
      <div className="px-1">
        <p className="wrapped-week-label">Top triggers</p>
        <h2 className="mt-1 text-xl font-bold tracking-[-0.03em]">This week</h2>
      </div>

      <RankedBars items={data.topTriggers} max={maxTrigger} />

      <div className="px-1 pt-1">
        <p className="wrapped-week-label">Top combinations</p>
        <ul className="mt-2 grid gap-2">
          {data.triggerCombinations.map((combo) => (
            <li
              key={combo.labels.join("-")}
              className="wrapped-row flex items-center justify-between gap-3 px-3 py-2.5"
            >
              <span className="text-sm font-medium text-(--sw-text)">
                {combo.labels.join(" + ")}
              </span>
              <span className="text-xs font-semibold text-(--sw-accent)">{combo.count}×</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="px-1">
        <p className="wrapped-week-label">Before a lapse</p>
        <ul className="mt-2 grid gap-2">
          {data.triggersPrecedingLapse.slice(0, 4).map((item, index) => (
            <li
              key={item.label}
              className="wrapped-row grid grid-cols-[1.75rem_1fr_auto] items-center gap-2 px-3 py-2.5"
            >
              <span className="text-sm font-bold text-(--sw-accent)">{index + 1}</span>
              <span className="text-sm font-medium text-(--sw-text)">{item.label}</span>
              <span className="text-xs font-semibold text-(--sw-muted)">{item.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function PatternsSlide({ data }: Readonly<{ data: RecapData }>) {
  const sections: { title: string; items: RankedItem[] }[] = [
    { title: "Location", items: data.relapsePatterns.locations },
    { title: "Device", items: data.relapsePatterns.devices },
    { title: "Platform", items: data.relapsePatterns.platforms },
    { title: "Time of day", items: data.relapsePatterns.timeOfDay },
    { title: "Social context", items: data.relapsePatterns.socialContext },
  ];

  return (
    <article className="wrapped-card grid w-full gap-4 overflow-y-auto px-4 py-5">
      <div className="px-1">
        <p className="wrapped-week-label">Relapse patterns</p>
        <h2 className="mt-1 text-xl font-bold tracking-[-0.03em]">This week</h2>
      </div>

      {sections.map((section) => (
        <PatternSection key={section.title} title={section.title} items={section.items} />
      ))}
    </article>
  );
}

function ProtectiveSlide({ data }: Readonly<{ data: RecapData }>) {
  const max = data.protective.topProtectiveFactors[0]?.count ?? 1;

  return (
    <article className="wrapped-card grid w-full gap-4 overflow-y-auto px-4 py-5">
      <div className="px-1">
        <p className="wrapped-week-label">What protected you</p>
        <h2 className="mt-1 text-xl font-bold tracking-[-0.03em]">This week</h2>
      </div>

      <div className="px-1">
        <p className="wrapped-week-label">Top protective factors</p>
      </div>
      <RankedBars items={data.protective.topProtectiveFactors} max={max} />

      <div className="px-1 pt-1">
        <p className="wrapped-week-label">Safest combinations</p>
        <p className="mt-1 text-xs leading-relaxed text-(--sw-muted)">
          Location + activity + people — least likely to relapse.
        </p>
        <ul className="mt-2 grid gap-2">
          {data.protective.safestCombinations.map((combo) => (
            <li
              key={combo.labels.join("-")}
              className="wrapped-row flex items-center justify-between gap-3 px-3 py-2.5"
            >
              <span className="text-sm font-medium text-(--sw-text)">
                {combo.labels.join(" + ")}
              </span>
              <span className="text-xs font-semibold text-(--sw-accent)">{combo.count}×</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="px-1">
        <p className="wrapped-week-label">When protected</p>
        <ul className="mt-2 grid gap-2">
          {data.protective.feelingsWhenProtected.slice(0, 4).map((item, index) => (
            <li
              key={item.label}
              className="wrapped-row grid grid-cols-[1.75rem_1fr_auto] items-center gap-2 px-3 py-2.5"
            >
              <span className="text-sm font-bold text-(--sw-accent)">{index + 1}</span>
              <span className="text-sm font-medium text-(--sw-text)">{item.label}</span>
              <span className="text-xs font-semibold text-(--sw-muted)">{item.count}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="wrapped-row mx-1 flex flex-col gap-1 px-3 py-2.5">
        <span className="wrapped-week-label normal-case tracking-[0.06em]">Safest time window</span>
        <span className="text-sm font-semibold text-(--sw-text)">
          {data.protective.safestTimeWindow}
        </span>
      </div>
    </article>
  );
}

function TakeawaysSlide({ data }: Readonly<{ data: RecapData }>) {
  const topTrigger = data.topTriggers[0];
  const topLocation = data.relapsePatterns.locations[0];

  return (
    <article className="wrapped-card grid w-full gap-4 px-5 py-6">
      <div>
        <p className="wrapped-week-label">By the numbers</p>
        <h2 className="mt-1 text-xl font-bold tracking-[-0.03em]">This week</h2>
      </div>

      <ul className="grid gap-2">
        <SummaryRow label="Clean days" value={`${data.week.cleanDays} / 7`} />
        <SummaryRow label="Relapse days" value={String(data.week.relapseDays)} />
        <SummaryRow label="Total lapses" value={String(data.lapseCount)} />
        <SummaryRow label="Check-ins" value={`${data.week.checkInsCompleted}/${data.week.checkInsTotal}`} />
        <SummaryRow label="Current streak" value={`${data.week.currentStreak} days`} />
        <SummaryRow
          label="Top trigger"
          value={topTrigger ? `${topTrigger.label} (${topTrigger.count})` : "—"}
        />
        <SummaryRow
          label="Top location"
          value={topLocation ? `${topLocation.label} (${topLocation.count})` : "—"}
        />
      </ul>
    </article>
  );
}

function SummaryRow({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <li className="wrapped-row flex items-center justify-between gap-3 px-3 py-2.5">
      <span className="wrapped-week-label normal-case tracking-[0.06em]">{label}</span>
      <span className="text-sm font-semibold text-(--sw-text)">{value}</span>
    </li>
  );
}

function RankedBars({ items, max }: Readonly<{ items: RankedItem[]; max: number }>) {
  return (
    <ul className="grid gap-2.5 px-1">
      {items.map((item) => (
        <li key={item.label} className="grid gap-1">
          <div className="flex items-center justify-between gap-2">
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

function PatternSection({
  title,
  items,
}: Readonly<{ title: string; items: RankedItem[] }>) {
  const max = items[0]?.count ?? 1;

  return (
    <div className="px-1">
      <p className="wrapped-week-label">{title}</p>
      <ul className="mt-2 grid gap-1.5">
        {items.map((item) => (
          <li
            key={item.label}
            className="wrapped-row flex items-center justify-between gap-3 px-3 py-2"
          >
            <span className="text-sm text-(--sw-text)">{item.label}</span>
            <div className="flex items-center gap-2">
              <div className="wrapped-bar-track w-16">
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
