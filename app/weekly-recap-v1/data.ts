/**
 * Weekly recap v1 — edit these values to compare against /spotify-wrapped-poc.
 * Each field maps to a slide in /weekly-recap-v1.
 */

import type { SleepLapseStats } from "../recap-shared/sleep-lapse";

export type RankedCount = {
  label: string;
  count: number;
};

export type TriggerCombo = {
  labels: string[];
  count: number;
};

/** Sun–Sat: clean = no lapse that day, lapse = ≥1 lapse logged. */
export type WeekDayLapseStatus = "clean" | "lapse";

export type WeekSundayToSaturday = readonly [
  WeekDayLapseStatus,
  WeekDayLapseStatus,
  WeekDayLapseStatus,
  WeekDayLapseStatus,
  WeekDayLapseStatus,
  WeekDayLapseStatus,
  WeekDayLapseStatus,
];

export type RecapV1Data = {
  overview: {
    /** Best run of consecutive clean days ever (product scope: all-time). */
    longestStreakCleanDaysAllTime: number;
    /** Total lapse events this calendar week. */
    lapseCountThisWeek: number;
    /** One entry per day: index 0 = Sunday … 6 = Saturday. */
    weekSundayToSaturday: WeekSundayToSaturday;
    /** Mean urge (1–10) from check-ins this week. */
    averageUrgeLevel: number;
  };
  triggers: {
    topTriggers: RankedCount[];
    triggerCombinations: TriggerCombo[];
    strongestFeelingBeforeLapse: RankedCount[];
    mostCommonLapseTimeWindow: string;
  };
  where: {
    locations: RankedCount[];
    devices: RankedCount[];
    platforms: RankedCount[];
    socialContext: RankedCount[];
    activityBeforeLapse: RankedCount[];
  };
  protective: {
    /** Single factors where you had the most no-lapse check-ins (mirror: top triggers). */
    topProtectiveFactors: RankedCount[];
    /** Location + activity + people combos you were least likely to relapse in. */
    safestCombinations: TriggerCombo[];
    strongestFeelingWhenProtected: RankedCount[];
    safestTimeWindow: string;
    whatHelpedResist: RankedCount[];
  };
  progress: {
    sleepLapse: SleepLapseStats;
    vsPreviousWeek: {
      lapseCount: number;
      relapseDays: number;
      averageUrgeLevel: number;
    };
    biggestImprovement: {
      label: string;
      detail: string;
    };
    biggestRiskArea: {
      label: string;
      lapseCount: number;
    };
  };
};

export const recapV1Data: RecapV1Data = {
  overview: {
    longestStreakCleanDaysAllTime: 14,
    lapseCountThisWeek: 12,
    weekSundayToSaturday: [
      "clean",
      "clean",
      "lapse",
      "clean",
      "lapse",
      "lapse",
      "clean",
    ],
    averageUrgeLevel: 4.2,
  },
  triggers: {
    topTriggers: [
      { label: "Bored", count: 8 },
      { label: "Alone", count: 6 },
      { label: "Stress", count: 4 },
      { label: "Fatigue", count: 3 },
    ],
    triggerCombinations: [
      { labels: ["Bored", "Alone"], count: 5 },
      { labels: ["Late night", "Alone"], count: 4 },
      { labels: ["Stress", "Home"], count: 3 },
    ],
    strongestFeelingBeforeLapse: [
      { label: "Restless", count: 7 },
      { label: "Anxious", count: 5 },
      { label: "Numb", count: 4 },
      { label: "Lonely", count: 3 },
    ],
    mostCommonLapseTimeWindow: "Late night (10pm–1am)",
  },
  where: {
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
    socialContext: [
      { label: "Alone", count: 10 },
      { label: "Partner nearby", count: 2 },
      { label: "With others", count: 0 },
    ],
    activityBeforeLapse: [
      { label: "Scrolling", count: 8 },
      { label: "Watching TV", count: 4 },
      { label: "Working late", count: 3 },
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
    strongestFeelingWhenProtected: [
      { label: "Calm", count: 12 },
      { label: "Focused", count: 9 },
      { label: "Connected", count: 7 },
      { label: "Grounded", count: 5 },
    ],
    safestTimeWindow: "Morning (6–9am)",
    whatHelpedResist: [
      { label: "Left triggering space", count: 7 },
      { label: "Delayed & distracted", count: 6 },
      { label: "Reached out", count: 5 },
    ],
  },
  progress: {
    sleepLapse: {
      timingLabel: "night before → next day",
      shortSleep: { thresholdLabel: "< 6h", lapseDays: 4, totalDays: 5 },
      longSleep: { thresholdLabel: "7h+", lapseDays: 1, totalDays: 9 },
      medianHoursOnLapseDays: 5.2,
      medianHoursOnCleanDays: 7.1,
    },
    vsPreviousWeek: {
      lapseCount: -3,
      relapseDays: -2,
      averageUrgeLevel: -0.8,
    },
    biggestImprovement: {
      label: "Relapse days",
      detail: "2 fewer than last week",
    },
    biggestRiskArea: {
      label: "Late night (10pm–1am)",
      lapseCount: 7,
    },
  },
};
