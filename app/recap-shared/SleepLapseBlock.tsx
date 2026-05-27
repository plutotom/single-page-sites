import {
  formatSleepBucketLine,
  hasEnoughSleepBucketData,
  type SleepLapseStats,
} from "./sleep-lapse";

export function SleepLapseBlock({ stats }: Readonly<{ stats: SleepLapseStats }>) {
  const minDays = stats.minDaysPerBucket ?? 3;

  return (
    <section className="grid gap-2 border-t border-(--sw-line) pt-4">
      <div>
        <p className="wrapped-week-label">Sleep & lapses</p>
        <p className="mt-0.5 text-[0.62rem] text-(--sw-muted)">({stats.timingLabel})</p>
      </div>

      <SleepBucketRow
        label={`After ${stats.shortSleep.thresholdLabel} sleep`}
        bucket={stats.shortSleep}
        minDays={minDays}
      />
      <SleepBucketRow
        label={`After ${stats.longSleep.thresholdLabel} sleep`}
        bucket={stats.longSleep}
        minDays={minDays}
      />

      <div className="wrapped-row grid grid-cols-2 gap-3 px-3 py-2.5">
        <div>
          <p className="wrapped-week-label normal-case tracking-[0.06em]">Median — lapse days</p>
          <p className="mt-1 text-sm font-semibold text-(--sw-lapse)">
            {stats.medianHoursOnLapseDays.toFixed(1)}h
          </p>
        </div>
        <div>
          <p className="wrapped-week-label normal-case tracking-[0.06em]">Median — clean days</p>
          <p className="mt-1 text-sm font-semibold text-(--sw-clean)">
            {stats.medianHoursOnCleanDays.toFixed(1)}h
          </p>
        </div>
      </div>
    </section>
  );
}

function SleepBucketRow({
  label,
  bucket,
  minDays,
}: Readonly<{
  label: string;
  bucket: SleepLapseStats["shortSleep"];
  minDays: number;
}>) {
  const enough = hasEnoughSleepBucketData(bucket, minDays);

  return (
    <div className="wrapped-row flex flex-col gap-1 px-3 py-2.5">
      <span className="wrapped-week-label normal-case tracking-[0.06em]">{label}</span>
      <span className={`text-sm font-semibold ${enough ? "text-(--sw-text)" : "text-(--sw-muted)"}`}>
        {enough
          ? formatSleepBucketLine(bucket)
          : `Not enough data this week (${bucket.totalDays} day${bucket.totalDays === 1 ? "" : "s"})`}
      </span>
    </div>
  );
}
