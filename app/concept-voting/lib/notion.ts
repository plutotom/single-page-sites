import { Client } from "@notionhq/client";
import type { ValidatedVote } from "./vote-schema";

type NotionConfig = {
  token: string;
  databaseId: string;
};

export class NotionConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotionConfigError";
  }
}

function readEnv(name: "NOTION_TOKEN" | "NOTION_VOTES_DB"): string {
  // Strip accidental surrounding quotes from .env values.
  return (process.env[name] ?? "").trim().replace(/^['"]|['"]$/g, "");
}

function normalizeDatabaseId(id: string): string {
  const compact = id.replace(/-/g, "");
  if (!/^[a-f0-9]{32}$/i.test(compact)) return id;
  return `${compact.slice(0, 8)}-${compact.slice(8, 12)}-${compact.slice(12, 16)}-${compact.slice(16, 20)}-${compact.slice(20)}`;
}

function readNotionConfig(): NotionConfig {
  const token = readEnv("NOTION_TOKEN");
  const databaseId = normalizeDatabaseId(readEnv("NOTION_VOTES_DB"));

  if (!token) {
    throw new NotionConfigError("NOTION_TOKEN is not configured.");
  }
  if (!databaseId || databaseId === "...") {
    throw new NotionConfigError("NOTION_VOTES_DB is not configured.");
  }

  return { token, databaseId };
}

function richText(content: string) {
  return content ? [{ text: { content } }] : [];
}

/**
 * Persist one vote row.
 * Correlate people with Viewer ID (voter key + IP), plus raw IP / UA columns.
 */
export async function persistConceptVote(vote: ValidatedVote): Promise<void> {
  const { token, databaseId } = readNotionConfig();
  const notion = new Client({ auth: token });

  await notion.pages.create({
    parent: { type: "database_id", database_id: databaseId },
    properties: {
      Concept: {
        title: [{ text: { content: vote.conceptTitle } }],
      },
      "Concept ID": {
        rich_text: richText(vote.conceptId),
      },
      Collection: {
        select: { name: vote.collection },
      },
      Vote: {
        select: { name: vote.vote === "yes" ? "Yes" : "No" },
      },
      Comment: {
        rich_text: richText(vote.comment),
      },
      Voter: {
        rich_text: richText(vote.voter),
      },
      "Voter Key": {
        rich_text: richText(vote.voterKey),
      },
      "Viewer ID": {
        rich_text: richText(vote.viewerId),
      },
      "IP Address": {
        rich_text: richText(vote.ipAddress),
      },
      "User Agent": {
        rich_text: richText(vote.userAgent),
      },
    },
  });
}
