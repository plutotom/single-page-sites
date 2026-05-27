/** Paired sleep (night before) → lapse (next day) stats for weekly recaps. */

export type SleepBucketStats = {
  thresholdLabel: string;
  lapseDays: number;
  totalDays: number;
};

export type SleepLapseStats = {
  timingLabel: string;
  shortSleep: SleepBucketStats;
  longSleep: SleepBucketStats;
  medianHoursOnLapseDays: number;
  medianHoursOnCleanDays: number;
  /** Hide bucket rates when totalDays in a bucket is below this (default 3). */
  minDaysPerBucket?: number;
};

export const defaultSleepLapseDemo: SleepLapseStats = {
  timingLabel: "night before → next day",
  shortSleep: { thresholdLabel: "< 6h", lapseDays: 4, totalDays: 5 },
  longSleep: { thresholdLabel: "7h+", lapseDays: 1, totalDays: 9 },
  medianHoursOnLapseDays: 5.2,
  medianHoursOnCleanDays: 7.1,
};

export function formatSleepBucketLine(bucket: SleepBucketStats): string {
  return `lapse on ${bucket.lapseDays} of ${bucket.totalDays} days`;
}

export function hasEnoughSleepBucketData(
  bucket: SleepBucketStats,
  minDays: number,
): boolean {
  return bucket.totalDays >= minDays;
}
