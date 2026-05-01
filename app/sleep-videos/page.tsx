"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const CHANNEL_HANDLE = "@OzleyASMR";
const CHANNEL_ID = "UC_ARaeDGHVLAqi6whEWQRTg";
const UPLOADS_PLAYLIST_ID = `UU${CHANNEL_ID.slice(2)}`;
const VIDEO_CHOICES = [
  { label: "Latest upload", type: "playlist", value: "1" },
  { label: "Selected video 1", type: "video", value: "Z7YtrS_6t9k" },
  { label: "Selected video 2", type: "video", value: "aBQ7i42DAzo" },
  { label: "Selected video 3", type: "video", value: "U5DNh3Zb-bE" },
  { label: "Selected video 4", type: "video", value: "moW14bJ9Vgg" },
  { label: "Selected video 5", type: "video", value: "sDkwiFJkQ9Q" },
] as const;

export default function SleepVideosPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const videoParam = searchParams.get("video");
  const slotParam = searchParams.get("slot");

  const selectedChoice = useMemo<(typeof VIDEO_CHOICES)[number]>(() => {
    if (videoParam) {
      const matchedVideo = VIDEO_CHOICES.find(
        (choice) => choice.type === "video" && choice.value === videoParam,
      );
      if (matchedVideo) return matchedVideo;
    }

    if (slotParam) {
      const matchedSlot = VIDEO_CHOICES.find(
        (choice) => choice.type === "playlist" && choice.value === slotParam,
      );
      if (matchedSlot) return matchedSlot;
    }

    return VIDEO_CHOICES[0];
  }, [slotParam, videoParam]);

  const embedSrc = useMemo(
    () => {
      if (selectedChoice.type === "video") {
        return `https://www.youtube-nocookie.com/embed/${selectedChoice.value}?rel=0`;
      }

      return `https://www.youtube-nocookie.com/embed/videoseries?list=${UPLOADS_PLAYLIST_ID}&index=${selectedChoice.value}&rel=0`;
    },
    [selectedChoice],
  );

  const choiceToHref = (choice: (typeof VIDEO_CHOICES)[number]): string => {
    const params = new URLSearchParams();
    if (choice.type === "video") {
      params.set("video", choice.value);
    } else {
      params.set("slot", choice.value);
    }
    return `${pathname}?${params.toString()}`;
  };

  return (
    <main className="min-h-screen bg-(--sv-bg) px-4 py-8 text-(--sv-text) sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-bold text-(--sv-muted) underline decoration-(--sv-border) underline-offset-4 hover:text-(--sv-text)"
          >
            Home
          </Link>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-(--sv-muted)">
            Sleep videos
          </p>
        </header>

        <h1 className="mb-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Bedtime Video Library
        </h1>
        <p className="mb-8 text-sm text-(--sv-muted) sm:text-base">
          All uploads from {CHANNEL_HANDLE}, in one focused view.
        </p>

        <article className="mb-8 overflow-hidden rounded-xl border border-(--sv-border) bg-(--sv-surface)">
          <div className="aspect-video bg-(--sv-surface-soft)">
            <iframe
              className="h-full w-full"
              key={`${selectedChoice.type}-${selectedChoice.value}`}
              src={embedSrc}
              title={`${CHANNEL_HANDLE} selected video`}
              loading="eager"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="autoplay; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </article>

        <section>
          <h2 className="mb-4 text-lg font-semibold tracking-tight sm:text-xl">
            Choose a video
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {VIDEO_CHOICES.map((choice) => (
              <button
                key={`${choice.type}-${choice.value}`}
                type="button"
                onClick={() => {
                  window.location.assign(choiceToHref(choice));
                }}
                className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                  selectedChoice.type === choice.type &&
                  selectedChoice.value === choice.value
                    ? "border-(--sv-accent) bg-(--sv-surface-soft)"
                    : "border-(--sv-border) bg-(--sv-surface) hover:bg-(--sv-surface-soft)"
                }`}
              >
                <p className="text-sm font-semibold text-(--sv-text)">
                  {choice.label}
                </p>
                <p className="mt-1 text-xs text-(--sv-muted)">
                  {choice.type === "video"
                    ? `Video ID: ${choice.value}`
                    : `Playlist slot ${choice.value}`}
                </p>
              </button>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
