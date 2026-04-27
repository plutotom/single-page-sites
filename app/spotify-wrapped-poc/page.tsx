"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type DemoTrack = {
  title: string;
  artist: string;
  listens: number;
};

type GenreStat = {
  name: string;
  share: number;
};

type WrappedData = {
  name: string;
  year: number;
  minutesListened: number;
  topArtist: {
    name: string;
    minutes: number;
    topSong: string;
  };
  topTracks: DemoTrack[];
  topGenres: GenreStat[];
  listeningWindow: string;
  streakDays: number;
  discoveryPercent: number;
};

const names = ["Alex", "Jordan", "Taylor", "Sam", "Morgan", "Casey", "Riley"];
const artists = [
  "The Weeknd",
  "SZA",
  "Tyler, The Creator",
  "Fred again..",
  "Billie Eilish",
  "Kendrick Lamar",
  "Dua Lipa",
  "Tame Impala",
  "Lana Del Rey",
  "KAYTRANADA",
  "Khruangbin",
  "Odesza",
];
const tracks = [
  "After Hours",
  "Saturn Return",
  "Golden Hour Drive",
  "Neon Balcony",
  "Midnight Weather",
  "Slow Burn Echo",
  "Daylight Pulse",
  "On Repeat Again",
  "Late Train Home",
  "Blue in Stereo",
  "Soft Chaos",
  "Electric Bloom",
];
const genres = [
  "Alt Pop",
  "Neo Soul",
  "Indie Electronic",
  "Lo-fi Beats",
  "RnB",
  "Hip Hop",
  "Dance Pop",
  "Indie Rock",
  "House",
  "Synthwave",
];
const listeningWindows = [
  "Late Night (10pm-1am)",
  "Early Morning (5am-8am)",
  "Afternoon Flow (1pm-4pm)",
  "Commute Prime Time (7am + 6pm)",
];

const slides = [
  "intro",
  "minutes",
  "artist",
  "tracks",
  "genres",
  "habits",
  "closing",
] as const;

type SlideId = (typeof slides)[number];

export default function SpotifyWrappedPocPage() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [seed] = useState(() => Math.floor(Math.random() * 100000));

  const wrapped = useMemo(() => createWrappedData(seed), [seed]);
  const currentSlide = slides[slideIndex] as SlideId;
  const isFirstSlide = slideIndex === 0;
  const isLastSlide = slideIndex === slides.length - 1;

  return (
    <main>
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] bg-black sm:items-center sm:justify-center sm:p-4">
        <section className="wrapped-phone relative flex w-full flex-col overflow-hidden sm:rounded-[2.2rem]">
          <header className="flex items-center justify-between border-b border-(--sw-line) bg-black/40 px-5 py-4 backdrop-blur-xl">
            <Link
              href="/"
              className="text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-(--sw-muted)"
            >
              Home
            </Link>
            <h1 className="text-lg font-extrabold tracking-[-0.02em] text-(--sw-text)">
              Wrapped POC
            </h1>
            <span className="wrapped-chip">{wrapped.year}</span>
          </header>

          <div className="flex flex-1 flex-col px-5 pb-7 pt-5">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-(--sw-muted-soft)">
                Proof of concept
              </p>
              <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-(--sw-muted-soft)">
                {slideIndex + 1}/{slides.length}
              </p>
            </div>

            <section className="wrapped-slide flex flex-1" key={currentSlide}>
              <SlideContent slide={currentSlide} wrapped={wrapped} />
            </section>

            <footer className="mt-5 grid gap-5">
              <div className="flex justify-center gap-2" aria-label="Slide progress">
                {slides.map((item, index) => (
                  <span
                    key={item}
                    className={`h-2 rounded-full transition-all ${
                      index === slideIndex
                        ? "w-8 bg-(--sw-accent-strong)"
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
                  className="wrapped-nav-button grid h-14 w-14 place-items-center rounded-full border border-(--sw-line-strong) text-(--sw-text) transition disabled:cursor-not-allowed disabled:opacity-35"
                  aria-label="Go to previous slide"
                >
                  ←
                </button>

                <button
                  type="button"
                  onClick={() => setSlideIndex(0)}
                  className="text-sm font-extrabold text-(--sw-muted)"
                >
                  Restart
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setSlideIndex((current) => Math.min(current + 1, slides.length - 1))
                  }
                  disabled={isLastSlide}
                  className="wrapped-nav-button wrapped-nav-button-primary grid h-16 w-16 place-items-center rounded-full text-2xl font-black transition disabled:cursor-not-allowed disabled:opacity-50"
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

function SlideContent({ slide, wrapped }: Readonly<{ slide: SlideId; wrapped: WrappedData }>) {
  if (slide === "intro") {
    return (
      <article className="wrapped-card grid w-full place-content-center px-6 py-8 text-center">
        <p className="text-[0.78rem] font-extrabold uppercase tracking-[0.18em] text-(--sw-accent-strong)">
          Your {wrapped.year} in sound
        </p>
        <h2 className="mt-4 text-[2.15rem] font-extrabold leading-[1.05] tracking-[-0.06em] text-(--sw-text)">
          {wrapped.name}, this was your music year.
        </h2>
        <p className="mt-4 text-sm font-bold text-(--sw-muted)">
          Randomized sample data to preview a Wrapped-like experience.
        </p>
      </article>
    );
  }

  if (slide === "minutes") {
    return (
      <article className="wrapped-card grid w-full place-content-center px-6 py-8 text-center">
        <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-(--sw-muted-soft)">
          Minutes listened
        </p>
        <p className="wrapped-stat-value mt-3 text-[3rem] font-black leading-none tracking-[-0.08em] text-(--sw-accent-strong)">
          {formatNumber(wrapped.minutesListened)}
        </p>
        <p className="mt-4 text-sm font-bold text-(--sw-muted)">
          That is roughly {Math.round(wrapped.minutesListened / 60)} hours of music.
        </p>
      </article>
    );
  }

  if (slide === "artist") {
    return (
      <article className="wrapped-card grid w-full content-between px-6 py-7">
        <div>
          <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-(--sw-muted-soft)">
            Top artist
          </p>
          <h2 className="mt-3 text-[2.1rem] font-extrabold leading-[1.06] tracking-[-0.05em]">
            {wrapped.topArtist.name}
          </h2>
        </div>
        <div className="grid gap-2">
          <div className="wrapped-chip inline-flex w-fit">Top song: {wrapped.topArtist.topSong}</div>
          <p className="text-sm font-bold text-(--sw-muted)">
            You spent {formatNumber(wrapped.topArtist.minutes)} minutes with this artist.
          </p>
        </div>
      </article>
    );
  }

  if (slide === "tracks") {
    return (
      <article className="wrapped-card grid w-full gap-3 px-4 py-5">
        <p className="px-2 text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-(--sw-muted-soft)">
          Top tracks
        </p>
        {wrapped.topTracks.map((track, index) => (
          <div key={`${track.title}-${track.artist}`} className="wrapped-track-row grid grid-cols-[2rem_1fr_auto] items-center gap-3 px-3 py-2.5">
            <span className="text-center text-lg font-black text-(--sw-accent-strong)">
              {index + 1}
            </span>
            <div>
              <p className="text-sm font-extrabold text-(--sw-text)">{track.title}</p>
              <p className="text-xs font-bold text-(--sw-muted)">{track.artist}</p>
            </div>
            <span className="text-xs font-extrabold text-(--sw-muted-soft)">
              {track.listens} plays
            </span>
          </div>
        ))}
      </article>
    );
  }

  if (slide === "genres") {
    return (
      <article className="wrapped-card grid w-full gap-3 px-4 py-5">
        <p className="px-2 text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-(--sw-muted-soft)">
          Favorite genres
        </p>
        {wrapped.topGenres.map((genre) => (
          <div key={genre.name} className="grid gap-1">
            <div className="flex items-center justify-between px-2">
              <span className="text-sm font-extrabold text-(--sw-text)">{genre.name}</span>
              <span className="text-xs font-extrabold text-(--sw-muted-soft)">
                {genre.share}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/8">
              <div className="wrapped-genre-bar h-full rounded-full" style={{ width: `${genre.share}%` }} />
            </div>
          </div>
        ))}
      </article>
    );
  }

  if (slide === "habits") {
    return (
      <article className="wrapped-card grid w-full content-between px-6 py-7">
        <div>
          <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-(--sw-muted-soft)">
            Listening habits
          </p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-[-0.04em]">{wrapped.listeningWindow}</h2>
        </div>
        <div className="grid gap-2">
          <p className="text-sm font-bold text-(--sw-muted)">
            Consistency streak:{" "}
            <span className="font-extrabold text-(--sw-accent-strong)">{wrapped.streakDays} days</span>
          </p>
          <p className="text-sm font-bold text-(--sw-muted)">
            Discovery mode:{" "}
            <span className="font-extrabold text-(--sw-accent-strong)">
              {wrapped.discoveryPercent}% new artists
            </span>
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className="wrapped-card grid w-full place-content-center px-6 py-8 text-center">
      <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-(--sw-muted-soft)">
        Final card
      </p>
      <h2 className="mt-4 text-[2rem] font-extrabold leading-[1.05] tracking-[-0.06em] text-(--sw-text)">
        Thanks for listening, {wrapped.name}.
      </h2>
      <p className="mt-4 text-sm font-bold text-(--sw-muted)">
        This mockup is ready to show as a visual proof of concept.
      </p>
      <div className="mt-6 flex justify-center">
        <span className="wrapped-chip">Shareable recap style</span>
      </div>
    </article>
  );
}

function createWrappedData(seed: number): WrappedData {
  const rand = seededRandom(seed);
  const pick = <T,>(items: T[]): T => items[Math.floor(rand() * items.length)] as T;

  const topArtist = pick(artists);
  const chosenTracks = pickUnique(tracks, 5, rand).map((title, index) => ({
    title,
    artist: index === 0 ? topArtist : pick(artists),
    listens: randomInt(52, 196, rand),
  }));

  const topGenres = pickUnique(genres, 4, rand).map((name, index) => ({
    name,
    share: index === 0 ? randomInt(28, 42, rand) : randomInt(12, 26, rand),
  }));

  return {
    name: pick(names),
    year: 2025,
    minutesListened: randomInt(22000, 128000, rand),
    topArtist: {
      name: topArtist,
      minutes: randomInt(1200, 7200, rand),
      topSong: chosenTracks[0]?.title ?? "Unknown Song",
    },
    topTracks: chosenTracks,
    topGenres,
    listeningWindow: pick(listeningWindows),
    streakDays: randomInt(18, 143, rand),
    discoveryPercent: randomInt(22, 67, rand),
  };
}

function pickUnique<T>(items: T[], count: number, rand: () => number): T[] {
  const pool = [...items];
  const selected: T[] = [];
  while (pool.length > 0 && selected.length < count) {
    const index = Math.floor(rand() * pool.length);
    const [next] = pool.splice(index, 1);
    if (next !== undefined) selected.push(next);
  }
  return selected;
}

function randomInt(min: number, max: number, rand: () => number): number {
  return Math.floor(rand() * (max - min + 1)) + min;
}

function seededRandom(seed: number): () => number {
  let state = seed % 2147483647;
  if (state <= 0) state += 2147483646;
  return () => {
    state = (state * 48271) % 2147483647;
    return (state - 1) / 2147483646;
  };
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}
