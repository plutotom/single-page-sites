/** Best-effort client identity from proxy headers (Vercel / common CDNs). */
export type ClientIdentity = {
  ipAddress: string;
  userAgent: string;
};

const MAX_IP_LENGTH = 64;
const MAX_UA_LENGTH = 300;
const MAX_VIEWER_ID_LENGTH = 160;

export function buildViewerId(voterKey: string, ipAddress: string): string {
  const ip = ipAddress || "unknown-ip";
  return `${voterKey}|${ip}`.slice(0, MAX_VIEWER_ID_LENGTH);
}

export function getClientIdentity(request: Request): ClientIdentity {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("cf-connecting-ip")?.trim() ||
    request.headers.get("x-vercel-forwarded-for")?.trim() ||
    "";

  const userAgent = request.headers.get("user-agent")?.trim() ?? "";

  return {
    ipAddress: ip.slice(0, MAX_IP_LENGTH),
    userAgent: userAgent.slice(0, MAX_UA_LENGTH),
  };
}
