/** Shared vote field limits — keep client UX and server validation in sync. */
export const MAX_COMMENT_LENGTH = 500;
export const MAX_VOTER_LENGTH = 60;
export const MAX_VOTER_KEY_LENGTH = 100;

export const VOTER_KEY_PATTERN = /^v_[a-z0-9-]{10,80}$/i;

export const VOTE_API_PATH = "/concept-voting/api/vote";

export const STORAGE_KEYS = {
  votes: "reforger-concept-votes:v1",
  voterKey: "reforger-concept-voter-key:v1",
  voterName: "reforger-concept-voter-name:v1",
  galleryConceptId: "reforger-concept-gallery-id:v1",
} as const;
