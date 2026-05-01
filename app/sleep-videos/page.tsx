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
              src={`https://www.youtube.com/embed/videoseries?list=${UPLOADS_PLAYLIST_ID}`}
              title={`${CHANNEL_HANDLE} uploads playlist`}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </article>

        <section>
          <h2 className="mb-4 text-lg font-semibold tracking-tight sm:text-xl">
            More videos from her channel
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {QUICK_PICK_INDEXES.map((index) => (
              <article
                key={index}
                className="overflow-hidden rounded-xl border border-(--sv-border) bg-(--sv-surface)"
              >
                <div className="aspect-video bg-(--sv-surface-soft)">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/videoseries?list=${UPLOADS_PLAYLIST_ID}&index=${index}`}
                    title={`${CHANNEL_HANDLE} upload quick pick ${index}`}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
