# Weekly recap v1 — variable reference

## Summary (for another AI or reviewer)

**What this is:** A **Next.js (App Router)** proof-of-concept **mobile-style “Wrapped” recap** for **recovery / lapse tracking** — not Spotify. It shows a **5-slide carousel** of weekly stats (streak, lapses, triggers, context, protective factors, progress). There is **no live backend** in this repo slice: numbers are **demo / placeholder** in TypeScript, meant to be **replaced by aggregated check-in data** when the real app computes recaps.

**Where in the repo:**

| Piece | Path |
|--------|------|
| Route (UI) | `app/weekly-recap-v1/page.tsx` |
| All recap fields + `recapV1Data` | `app/weekly-recap-v1/data.ts` (`RecapV1Data`) |
| Shared sleep block | `app/recap-shared/SleepLapseBlock.tsx`, `app/recap-shared/sleep-lapse.ts` |
| Styling | `app/spotify-wrapped-poc/theme.css` (imported by v1 `layout.tsx`) |

**User-facing URL:** `/weekly-recap-v1`. A **simpler alternate** lives at `/spotify-wrapped-poc` (different fields; not documented in this file).

**Data model intent:** One object **`RecapV1Data`** grouped by **slide**: `overview` (1), `triggers` (2), `where` (3), `protective` (4), `progress` (5). Types **`RankedCount`** (`label` + `count`) and **`TriggerCombo`** (`labels[]` + `count`) repeat across sections. **Counts** are **interpreted as “this week”** unless the description says otherwise (e.g. all-time streak).

**Product stance:** Copy is **descriptive** (frequencies, deltas, medians) — **not** LLM-generated “insights.” **Removed:** a “risk trend %” (was ambiguous); **week-over-week** is still in `progress.vsPreviousWeek` as **numeric deltas**, not a named risk score.

**How to use this document:** The table below maps **each field path** → **type**, **example**, **meaning**. Use it to **implement aggregation**, **rename labels**, **validate schemas**, or **port the recap to another stack** without reading every component first.

---

Routes: **`/weekly-recap-v1`**. Source: **`data.ts`** (`RecapV1Data` + `recapV1Data`). Slides are **1–5** in UI order.

Shared helper types:

| Type | Shape | Description |
|------|--------|-------------|
| `RankedCount` | `{ label: string; count: number }` | Ranked item with frequency count for the recap window. |
| `TriggerCombo` | `{ labels: string[]; count: number }` | Co-occurring tags and how often that combination appeared. |
| `WeekDayLapseStatus` | `'clean' \| 'lapse'` | Per calendar day: no lapse vs at least one lapse. |
| `WeekSundayToSaturday` | Tuple of 7 × `WeekDayLapseStatus` | Index **0 = Sunday** … **6 = Saturday**. |
| `SleepBucketStats` | `{ thresholdLabel, lapseDays, totalDays }` | Sleep bucket label + lapse-day count + days in bucket (see `recap-shared/sleep-lapse.ts`). |

---

## Table (all fields)

| Page | Variable name (path) | Type | Example value | Description |
|------|---------------------|------|---------------|-------------|
| 1 — Weekly overview | `overview.longestStreakCleanDaysAllTime` | `number` | `14` | Longest consecutive run of **clean** days; **all-time** scope in product. |
| 1 — Weekly overview | `overview.lapseCountThisWeek` | `number` | `12` | Total **lapse events** logged in **this calendar week**. |
| 1 — Weekly overview | `overview.weekSundayToSaturday` | `WeekSundayToSaturday` | `["clean","clean","lapse",...]` (7 entries) | Sun→Sat: **clean** or **lapse** per day; drives the week strip UI. |
| 1 — Weekly overview | `overview.averageUrgeLevel` | `number` | `4.2` | Mean **urge (1–10)** from **check-ins this week**. |
| 2 — What triggered you | `triggers.topTriggers` | `RankedCount[]` | `[{ label: "Bored", count: 8 }, …]` | Most frequent **trigger tags** this week. |
| 2 — What triggered you | `triggers.triggerCombinations` | `TriggerCombo[]` | `[{ labels: ["Bored","Alone"], count: 5 }, …]` | **Top trigger combinations** (co-occurrence counts). |
| 2 — What triggered you | `triggers.strongestFeelingBeforeLapse` | `RankedCount[]` | `[{ label: "Restless", count: 7 }, …]` | **Feelings** ranked by how often they preceded a lapse. |
| 2 — What triggered you | `triggers.mostCommonLapseTimeWindow` | `string` | `"Late night (10pm–1am)"` | **Time-of-day window** where lapses clustered most. |
| 3 — Where it happened | `where.locations` | `RankedCount[]` | `[{ label: "Home", count: 9 }, …]` | **Location** tags at lapse (or context) — ranked by count. |
| 3 — Where it happened | `where.devices` | `RankedCount[]` | `[{ label: "Phone", count: 10 }, …]` | **Device** ranked by lapse-associated frequency. |
| 3 — Where it happened | `where.platforms` | `RankedCount[]` | `[{ label: "Browser", count: 7 }, …]` | **Platform / app category** ranked. |
| 3 — Where it happened | `where.socialContext` | `RankedCount[]` | `[{ label: "Alone", count: 10 }, …]` | **People / social context** ranked. |
| 3 — Where it happened | `where.activityBeforeLapse` | `RankedCount[]` | `[{ label: "Scrolling", count: 8 }, …]` | **Activity** before lapse, ranked. |
| 4 — What protected you | `protective.topProtectiveFactors` | `RankedCount[]` | `[{ label: "With other people", count: 14 }, …]` | Single factors most often present on **no-lapse** check-ins (mirror of top triggers). |
| 4 — What protected you | `protective.safestCombinations` | `TriggerCombo[]` | `[{ labels: ["Gym","Exercise","With others"], count: 9 }, …]` | **Context combos** (e.g. place + activity + people) least associated with lapse. |
| 4 — What protected you | `protective.strongestFeelingWhenProtected` | `RankedCount[]` | `[{ label: "Calm", count: 12 }, …]` | **Feelings** most reported when protected / no lapse. |
| 4 — What protected you | `protective.safestTimeWindow` | `string` | `"Morning (6–9am)"` | **Time window** where lapses were least likely / protection strongest. |
| 4 — What protected you | `protective.whatHelpedResist` | `RankedCount[]` | `[{ label: "Left triggering space", count: 7 }, …]` | **Self-reported coping / resistance actions** (what the user did to resist). |
| 5 — Progress & patterns | `progress.sleepLapse.timingLabel` | `string` | `"night before → next day"` | Explains pairing: prior night **sleep** vs **next calendar day** lapse. |
| 5 — Progress & patterns | `progress.sleepLapse.shortSleep` | `SleepBucketStats` | `{ thresholdLabel: "< 6h", lapseDays: 4, totalDays: 5 }` | **Short-sleep** bucket: `lapseDays` / `totalDays` after nights in this band. |
| 5 — Progress & patterns | `progress.sleepLapse.longSleep` | `SleepBucketStats` | `{ thresholdLabel: "7h+", lapseDays: 1, totalDays: 9 }` | **Long-sleep** bucket: same semantics as `shortSleep`. |
| 5 — Progress & patterns | `progress.sleepLapse.medianHoursOnLapseDays` | `number` | `5.2` | Median **sleep hours** (night before) on **lapse** days. |
| 5 — Progress & patterns | `progress.sleepLapse.medianHoursOnCleanDays` | `number` | `7.1` | Median **sleep hours** on **clean** days. |
| 5 — Progress & patterns | `progress.sleepLapse.minDaysPerBucket` | `number` (optional) | _(omit → UI uses 3)_ | Minimum `totalDays` to show bucket line instead of “not enough data.” |
| 5 — Progress & patterns | `progress.vsPreviousWeek.lapseCount` | `number` | `-3` | **Change** in weekly lapse count vs prior week (this − last); negative = fewer. |
| 5 — Progress & patterns | `progress.vsPreviousWeek.relapseDays` | `number` | `-2` | **Change** in count of **days with ≥1 lapse** vs prior week. |
| 5 — Progress & patterns | `progress.vsPreviousWeek.averageUrgeLevel` | `number` | `-0.8` | **Change** in mean check-in urge vs prior week (same scale as overview). |
| 5 — Progress & patterns | `progress.biggestImprovement.label` | `string` | `"Relapse days"` | Short **title** of what improved week over week. |
| 5 — Progress & patterns | `progress.biggestImprovement.detail` | `string` | `"2 fewer than last week"` | **Human-readable detail** for the improvement row. |
| 5 — Progress & patterns | `progress.biggestRiskArea.label` | `string` | `"Late night (10pm–1am)"` | **Pattern** to watch (time/context) next week. |
| 5 — Progress & patterns | `progress.biggestRiskArea.lapseCount` | `number` | `7` | **Lapse count** associated with that risk area in the recap window (for display). |

---

## `RankedCount` fields (every row in those arrays)

| Field | Type | Example | Description |
|-------|------|---------|-------------|
| `label` | `string` | `"Bored"` | Display / taxonomy string. |
| `count` | `number` | `8` | Occurrences in the relevant window (week), per product rules. |

## `TriggerCombo` fields

| Field | Type | Example | Description |
|-------|------|---------|-------------|
| `labels` | `string[]` | `["Bored", "Alone"]` | Ordered list of co-occurring tags. |
| `count` | `number` | `5` | How often that exact combination occurred. |
