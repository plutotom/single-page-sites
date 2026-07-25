import { NextResponse } from "next/server";
import { NotionConfigError, persistConceptVote } from "../../lib/notion";
import { getClientIdentity } from "../../lib/request-identity";
import { validateVotePayload } from "../../lib/vote-schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ApiError = { ok: false; error: string };

function jsonError(error: string, status: number) {
  return NextResponse.json({ ok: false, error } satisfies ApiError, { status });
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonError("Request body must be valid JSON.", 400);
  }

  const identity = getClientIdentity(request);
  const validated = validateVotePayload(body, identity);
  if (!validated.ok) {
    return jsonError(validated.error, 400);
  }

  try {
    await persistConceptVote(validated.value);
    return NextResponse.json({ ok: true as const });
  } catch (error) {
    if (error instanceof NotionConfigError) {
      console.error("Concept vote Notion config missing", error.message);
      return jsonError(
        "Voting is not configured on this server yet.",
        503,
      );
    }

    console.error("Concept vote persistence failed", error);
    return jsonError(
      "The vote could not be saved right now. Try again.",
      500,
    );
  }
}
