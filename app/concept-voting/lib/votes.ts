import {
  MAX_VOTER_LENGTH,
  STORAGE_KEYS,
  VOTER_KEY_PATTERN,
} from "./constants";

export type VoteChoice = "yes" | "no";

export type StoredVote = {
  vote: VoteChoice;
  comment: string;
  submittedAt: string;
};

export type StoredVotes = Record<string, StoredVote>;

function canUseStorage(): boolean {
  return typeof window !== "undefined";
}

function safeGetItem(key: string): string | null {
  if (!canUseStorage()) return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key: string, value: string): boolean {
  if (!canUseStorage()) return false;
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function safeRemoveItem(key: string): void {
  if (!canUseStorage()) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Private mode / blocked storage — ignore.
  }
}

function isStoredVote(value: unknown): value is StoredVote {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const candidate = value as Record<string, unknown>;
  return (
    (candidate.vote === "yes" || candidate.vote === "no") &&
    typeof candidate.comment === "string" &&
    typeof candidate.submittedAt === "string"
  );
}

export function isStorageAvailable(): boolean {
  if (!canUseStorage()) return false;
  try {
    const probe = "__cv_storage_probe__";
    window.localStorage.setItem(probe, "1");
    window.localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}

export function readStoredVotes(): StoredVotes {
  const raw = safeGetItem(STORAGE_KEYS.votes);
  if (!raw) return {};

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};

    const votes: StoredVotes = {};
    for (const [conceptId, value] of Object.entries(parsed)) {
      if (isStoredVote(value)) votes[conceptId] = value;
    }
    return votes;
  } catch {
    return {};
  }
}

export function writeStoredVotes(votes: StoredVotes): boolean {
  return safeSetItem(STORAGE_KEYS.votes, JSON.stringify(votes));
}

/** Re-read before write so concurrent tab updates are less likely to clobber. */
export function upsertStoredVote(
  conceptId: string,
  vote: StoredVote,
): boolean {
  const votes = readStoredVotes();
  votes[conceptId] = vote;
  return writeStoredVotes(votes);
}

export function getOrCreateVoterKey(): string {
  if (!canUseStorage()) return "";

  const existing = safeGetItem(STORAGE_KEYS.voterKey);
  if (existing && VOTER_KEY_PATTERN.test(existing)) return existing;

  const key = `v_${crypto.randomUUID()}`;
  safeSetItem(STORAGE_KEYS.voterKey, key);
  return key;
}

export function readVoterName(): string {
  return safeGetItem(STORAGE_KEYS.voterName) ?? "";
}

export function writeVoterName(name: string): boolean {
  const trimmed = name.trim().slice(0, MAX_VOTER_LENGTH);
  if (trimmed) return safeSetItem(STORAGE_KEYS.voterName, trimmed);
  safeRemoveItem(STORAGE_KEYS.voterName);
  return true;
}

export function readLastGalleryConceptId(): string | null {
  const value = safeGetItem(STORAGE_KEYS.galleryConceptId);
  return value && value.length > 0 ? value : null;
}

export function writeLastGalleryConceptId(conceptId: string): boolean {
  return safeSetItem(STORAGE_KEYS.galleryConceptId, conceptId);
}

const WATCHED_STORAGE_KEYS = new Set<string>(Object.values(STORAGE_KEYS));

/** Subscribe to cross-tab localStorage changes for our keys. */
export function subscribeStorage(onChange: () => void): () => void {
  if (!canUseStorage()) return () => {};

  const handler = (event: StorageEvent) => {
    if (!event.key || !WATCHED_STORAGE_KEYS.has(event.key)) return;
    onChange();
  };

  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}
