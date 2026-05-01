import Link from "next/link";

const CHANNEL_HANDLE = "@OzleyASMR";
const CHANNEL_ID = "UC_ARaeDGHVLAqi6whEWQRTg";
const UPLOADS_PLAYLIST_ID = `UU${CHANNEL_ID.slice(2)}`;
const QUICK_PICK_INDEXES = [1, 4, 7, 10, 13, 16] as const;

export default function SleepVideosPage() {
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
              src={`https://www.youtube-nocookie.com/embed/videoseries?list=${UPLOADS_PLAYLIST_ID}&rel=0`}
              title={`${CHANNEL_HANDLE} uploads playlist`}
              loading="eager"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="autoplay; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </article>

        <section>
          <h2 className="mb-4 text-lg font-semibold tracking-tight sm:text-xl">
            More videos from her channel
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {QUICK_PICK_INDEXES.map((index) => (
              <a
                key={index}
                href={`https://www.youtube.com/playlist?list=${UPLOADS_PLAYLIST_ID}&playnext=1&index=${index}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-(--sv-border) bg-(--sv-surface) px-4 py-3 transition-colors hover:bg-(--sv-surface-soft)"
              >
                <p className="text-sm font-semibold text-(--sv-text)">
                  Open another video (slot {index})
                </p>
                <p className="mt-1 text-xs text-(--sv-muted)">
                  Opens from {CHANNEL_HANDLE}'s uploads playlist
                </p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
