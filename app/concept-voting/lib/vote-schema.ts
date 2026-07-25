import {
  MAX_COMMENT_LENGTH,
  MAX_VOTER_KEY_LENGTH,
  MAX_VOTER_LENGTH,
  VOTER_KEY_PATTERN,
} from "./constants";
import { getConcept } from "./concepts";
import { buildViewerId, type ClientIdentity } from "./request-identity";
import type { VoteChoice } from "./votes";

export type ValidatedVote = {
  conceptId: string;
  conceptTitle: string;
  collection: string;
  vote: VoteChoice;
  comment: string;
  voter: string;
  voterKey: string;
  ipAddress: string;
  userAgent: string;
  viewerId: string;
};

export type VoteValidationResult =
  | { ok: true; value: ValidatedVote }
  | { ok: false; error: string };

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateVotePayload(
  body: unknown,
  identity: ClientIdentity,
): VoteValidationResult {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, error: "Request body must be an object." };
  }

  const input = body as Record<string, unknown>;
  const conceptId = asTrimmedString(input.conceptId);
  const concept = getConcept(conceptId);
  if (!concept) return { ok: false, error: "That concept does not exist." };

  const vote = input.vote;
  if (vote !== "yes" && vote !== "no") {
    return { ok: false, error: "Vote must be yes or no." };
  }

  const voterKey = asTrimmedString(input.voterKey);
  if (
    !VOTER_KEY_PATTERN.test(voterKey) ||
    voterKey.length > MAX_VOTER_KEY_LENGTH
  ) {
    return { ok: false, error: "A valid voter key is required." };
  }

  return {
    ok: true,
    value: {
      conceptId,
      conceptTitle: concept.title,
      collection: concept.collection,
      vote,
      comment: asTrimmedString(input.comment).slice(0, MAX_COMMENT_LENGTH),
      voter: asTrimmedString(input.voter).slice(0, MAX_VOTER_LENGTH),
      voterKey,
      ipAddress: identity.ipAddress,
      userAgent: identity.userAgent,
      viewerId: buildViewerId(voterKey, identity.ipAddress),
    },
  };
}
