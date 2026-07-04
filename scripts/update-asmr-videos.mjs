#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const VIDEOS_PATH = join(ROOT, "app/sleep-videos/videos.json");

const CHANNEL_ID = "UC_ARaeDGHVLAqi6whEWQRTg";
const CHANNEL_HANDLE = "@OzleyASMR";
const VIDEO_SLOT_COUNT = 6;
const PREFERENCE_KEYWORDS = ["makeup", "makup", "make up", "hair"];
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

function decodeXml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function parseRssEntries(xml) {
  const entries = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;

  for (const match of xml.matchAll(entryRegex)) {
    const block = match[1];
    const videoId = block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
    const channelId = block.match(/<yt:channelId>([^<]+)<\/yt:channelId>/)?.[1];
    const title = block.match(/<title>([^<]+)<\/title>/)?.[1];
    const link = block.match(/<link rel="alternate" href="([^"]+)"/)?.[1];
    const published = block.match(/<published>([^<]+)<\/published>/)?.[1];

    if (!videoId || !title || !link) continue;

    entries.push({
      videoId,
      channelId,
      title: decodeXml(title),
      link,
      published: published ? Date.parse(published) : 0,
      isShort: link.includes("/shorts/"),
    });
  }

  return entries;
}

function formatLabel(title) {
  return title.replace(/^ASMR\s+/i, "").trim();
}

function preferenceScore(title) {
  const normalized = title.toLowerCase();
  return PREFERENCE_KEYWORDS.some((keyword) => normalized.includes(keyword))
    ? 1
    : 0;
}

function pickVideos(entries) {
  const eligible = entries.filter(
    (entry) => entry.channelId === CHANNEL_ID && !entry.isShort,
  );

  const ranked = [...eligible].sort((left, right) => {
    const scoreDelta = preferenceScore(right.title) - preferenceScore(left.title);
    if (scoreDelta !== 0) return scoreDelta;
    return right.published - left.published;
  });

  const seen = new Set();
  const picks = [];

  for (const entry of ranked) {
    if (seen.has(entry.videoId)) continue;
    seen.add(entry.videoId);
    picks.push(entry);
    if (picks.length === VIDEO_SLOT_COUNT) break;
  }

  return picks;
}

async function main() {
  const response = await fetch(RSS_URL, {
    headers: { "User-Agent": "single-page-sites-asmr-updater/1.0" },
  });

  if (!response.ok) {
    throw new Error(`YouTube RSS request failed: ${response.status}`);
  }

  const xml = await response.text();
  const entries = parseRssEntries(xml);
  const picks = pickVideos(entries);

  if (picks.length < VIDEO_SLOT_COUNT) {
    throw new Error(
      `Expected at least ${VIDEO_SLOT_COUNT} full videos from ${CHANNEL_HANDLE}, found ${picks.length}`,
    );
  }

  const nextData = {
    updatedAt: new Date().toISOString(),
    channelHandle: CHANNEL_HANDLE,
    channelId: CHANNEL_ID,
    choices: [
      { label: "Latest upload", type: "playlist", value: "1" },
      ...picks.map((video) => ({
        label: formatLabel(video.title),
        type: "video",
        value: video.videoId,
      })),
    ],
  };

  const previousRaw = readFileSync(VIDEOS_PATH, "utf8");
  const nextRaw = `${JSON.stringify(nextData, null, 2)}\n`;

  if (previousRaw === nextRaw) {
    console.log("ASMR video picks are already up to date.");
    return;
  }

  writeFileSync(VIDEOS_PATH, nextRaw, "utf8");
  console.log(`Updated ${picks.length} video picks from ${CHANNEL_HANDLE}.`);
  for (const video of picks) {
    const preferred = preferenceScore(video.title) ? " (preferred)" : "";
    console.log(`- ${formatLabel(video.title)} [${video.videoId}]${preferred}`);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
