"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Concept } from "../lib/concepts";
import {
  MAX_COMMENT_LENGTH,
  MAX_VOTER_LENGTH,
  VOTE_API_PATH,
} from "../lib/constants";
import { useIsClient } from "../lib/use-is-client";
import {
  getOrCreateVoterKey,
  isStorageAvailable,
  readStoredVotes,
  readVoterName,
  subscribeStorage,
  upsertStoredVote,
  writeVoterName,
  type StoredVote,
  type VoteChoice,
} from "../lib/votes";

type Feedback = {
  message: string;
  tone?: "error" | "success" | "warn";
};

type VoteRequest = {
  conceptId: string;
  vote: VoteChoice;
  comment: string;
  voter: string;
  voterKey: string;
};

function choiceLabel(choice: VoteChoice): string {
  return choice === "yes" ? "Yes" : "No";
}

function parseApiError(result: unknown, fallback: string): string {
  if (
    result &&
    typeof result === "object" &&
    "error" in result &&
    typeof result.error === "string"
  ) {
    return result.error;
  }
  return fallback;
}

function isAbortError(error: unknown): boolean {
  return (
    (error instanceof DOMException && error.name === "AbortError") ||
    (error instanceof Error && error.name === "AbortError")
  );
}

export function VoteBar({
  concept,
}: Readonly<{
  concept: Concept;
}>) {
  const commentId = useId();
  const voterId = useId();
  const isClient = useIsClient();

  const mountedRef = useRef(true);
  const lockedRef = useRef(false);
  const inFlightRef = useRef(false);
  const requestGenRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);

  const [hydrated, setHydrated] = useState(false);
  const [storageOk, setStorageOk] = useState(true);
  const [voterKey, setVoterKey] = useState("");
  const [voterName, setVoterName] = useState("");
  const [selectedVote, setSelectedVote] = useState<VoteChoice | null>(null);
  const [persistedVote, setPersistedVote] = useState<StoredVote | null>(null);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>({ message: "" });
  const [retryPayload, setRetryPayload] = useState<VoteRequest | null>(null);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  if (isClient && !hydrated) {
    const stored = readStoredVotes()[concept.id];
    const available = isStorageAvailable();
    setHydrated(true);
    setStorageOk(available);
    setVoterKey(getOrCreateVoterKey());
    setVoterName(readVoterName());
    setSelectedVote(stored?.vote ?? null);
    setPersistedVote(stored ?? null);
    setComment(stored?.comment ?? "");
    if (!available) {
      setFeedback({
        message:
          "This browser is blocking local storage. Votes can still save to Notion, but won’t be remembered here after reload.",
        tone: "warn",
      });
    }
  }

  useEffect(() => {
    lockedRef.current = Boolean(persistedVote);
  }, [persistedVote]);

  useEffect(() => {
    if (!hydrated) return;

    return subscribeStorage(() => {
      if (!mountedRef.current) return;
      const stored = readStoredVotes()[concept.id];
      setPersistedVote(stored ?? null);
      if (stored) {
        setSelectedVote(stored.vote);
        setComment(stored.comment);
      }
      setVoterName(readVoterName());
    });
  }, [concept.id, hydrated]);

  async function sendVote(payload: VoteRequest) {
    // One vote per concept in this browser — never re-submit after success.
    // Use a ref so the lock is sync-safe (not waiting on React state).
    if (lockedRef.current || !payload.voterKey || inFlightRef.current) return;

    inFlightRef.current = true;
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const gen = ++requestGenRef.current;

    setSelectedVote(payload.vote);
    setIsSubmitting(true);
    setRetryPayload(null);
    setFeedback({ message: "Sending your vote…" });

    try {
      if (typeof navigator !== "undefined" && navigator.onLine === false) {
        throw new Error("You’re offline. Reconnect, then retry.");
      }

      const response = await fetch(VOTE_API_PATH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const result: unknown = await response.json().catch(() => null);

      if (
        !response.ok ||
        !result ||
        typeof result !== "object" ||
        !("ok" in result) ||
        result.ok !== true
      ) {
        throw new Error(parseApiError(result, "The vote could not be saved."));
      }

      const saved: StoredVote = {
        vote: payload.vote,
        comment: payload.comment,
        submittedAt: new Date().toISOString(),
      };

      // Lock immediately so a late click can't double-post.
      lockedRef.current = true;
      const wrote = upsertStoredVote(concept.id, saved);
      writeVoterName(payload.voter);

      if (!mountedRef.current || gen !== requestGenRef.current) return;

      setPersistedVote(saved);
      setComment(payload.comment);
      setStorageOk(wrote);
      setFeedback({
        message: wrote
          ? `Locked in — you voted ${choiceLabel(payload.vote)}.`
          : `Saved to Notion — local memory is blocked, so this browser may not remember it after reload.`,
        tone: wrote ? "success" : "warn",
      });
    } catch (error) {
      if (isAbortError(error) || gen !== requestGenRef.current) return;
      if (!mountedRef.current) return;

      setRetryPayload(payload);
      setFeedback({
        message:
          error instanceof Error
            ? error.message
            : "The vote could not be saved. Try again.",
        tone: "error",
      });
    } finally {
      if (gen === requestGenRef.current) {
        inFlightRef.current = false;
        if (mountedRef.current) setIsSubmitting(false);
      }
    }
  }

  function buildPayload(vote: VoteChoice): VoteRequest {
    return {
      conceptId: concept.id,
      vote,
      comment: comment.trim().slice(0, MAX_COMMENT_LENGTH),
      voter: voterName.trim().slice(0, MAX_VOTER_LENGTH),
      voterKey,
    };
  }

  function submit(choice: VoteChoice) {
    if (lockedRef.current) return;
    void sendVote(buildPayload(choice));
  }

  const busy = !hydrated || isSubmitting;
  const locked = Boolean(persistedVote);

  return (
    <section
      className="concept-voting-vote-wrap"
      data-locked={locked}
      aria-label={`Vote on ${concept.title}`}
    >
      <div className="concept-voting-vote-prompt">
        <p className="concept-voting-vote-eyebrow">Your vote</p>
        <h3 className="concept-voting-vote-title">
          {locked && persistedVote
            ? `You voted ${choiceLabel(persistedVote.vote)}`
            : "Keep exploring this concept?"}
        </h3>
        <p className="concept-voting-vote-sub">
          {locked
            ? "This pick is locked for this browser. Move on to another concept."
            : "One vote per concept. Add an optional note, then choose Yes or No."}
        </p>
      </div>

      {!storageOk ? (
        <p className="concept-voting-feedback" data-tone="warn" role="status">
          Local storage is limited in this browser. Votes still go to Notion.
        </p>
      ) : null}

      {locked && persistedVote ? (
        <div className="concept-voting-locked-result" data-vote={persistedVote.vote}>
          <span className="concept-voting-locked-badge">
            {choiceLabel(persistedVote.vote)}
          </span>
          {persistedVote.comment ? (
            <p className="concept-voting-locked-note">“{persistedVote.comment}”</p>
          ) : (
            <p className="concept-voting-locked-note concept-voting-locked-note--empty">
              No note left
            </p>
          )}
          {voterName ? (
            <p className="concept-voting-locked-voter">— {voterName}</p>
          ) : null}
        </div>
      ) : (
        <>
          <div className="concept-voting-comment-panel">
            <label className="concept-voting-label" htmlFor={commentId}>
              Optional note <span>— what stands out?</span>
            </label>
            <textarea
              id={commentId}
              className="concept-voting-textarea"
              value={comment}
              onChange={(event) =>
                setComment(event.target.value.slice(0, MAX_COMMENT_LENGTH))
              }
              placeholder="A quick reaction, question, or detail…"
              maxLength={MAX_COMMENT_LENGTH}
              disabled={isSubmitting}
              enterKeyHint="done"
            />
            <div className="concept-voting-textarea-count">
              {comment.length}/{MAX_COMMENT_LENGTH}
            </div>

            <label className="concept-voting-label" htmlFor={voterId}>
              Your name <span>(optional)</span>
            </label>
            <input
              id={voterId}
              className="concept-voting-input"
              value={voterName}
              onChange={(event) =>
                setVoterName(event.target.value.slice(0, MAX_VOTER_LENGTH))
              }
              placeholder="Leave blank to stay anonymous"
              maxLength={MAX_VOTER_LENGTH}
              autoComplete="name"
              disabled={isSubmitting}
              enterKeyHint="done"
            />
          </div>

          <div
            className="concept-voting-vote-bar"
            role="group"
            aria-label="Choose yes or no"
          >
            <button
              type="button"
              className="concept-voting-button concept-voting-button--yes"
              data-selected={selectedVote === "yes"}
              onClick={() => submit("yes")}
              disabled={busy}
              aria-pressed={selectedVote === "yes"}
            >
              {isSubmitting && selectedVote === "yes" ? "Sending…" : "Yes"}
            </button>
            <button
              type="button"
              className="concept-voting-button concept-voting-button--no"
              data-selected={selectedVote === "no"}
              onClick={() => submit("no")}
              disabled={busy}
              aria-pressed={selectedVote === "no"}
            >
              {isSubmitting && selectedVote === "no" ? "Sending…" : "No"}
            </button>
          </div>
        </>
      )}

      <p
        className="concept-voting-feedback"
        data-tone={feedback.tone}
        aria-live="polite"
      >
        {feedback.message}
      </p>

      {retryPayload && !locked ? (
        <button
          type="button"
          className="concept-voting-text-button"
          onClick={() => void sendVote(retryPayload)}
          disabled={isSubmitting}
        >
          Retry sending
        </button>
      ) : null}
    </section>
  );
}
