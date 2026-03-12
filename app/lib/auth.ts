import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "site_access";
const COOKIE_VALUE = "unlocked";

function getSecret(): string {
  const secret = process.env.COOKIE_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "COOKIE_SECRET must be set and at least 16 characters. " +
        "If it contains $ or other special characters, wrap the value in single quotes in .env.local (e.g. COOKIE_SECRET='your-secret')."
    );
  }
  return secret;
}

export function signCookie(value: string): string {
  const secret = getSecret();
  const hmac = createHmac("sha256", secret);
  hmac.update(value);
  const sig = hmac.digest("hex");
  return `${value}.${sig}`;
}

export function verifyCookie(cookieValue: string | undefined): boolean {
  if (!cookieValue || !cookieValue.includes(".")) return false;
  const [value, sig] = cookieValue.split(".");
  if (!value || !sig) return false;
  const expected = signCookie(value);
  if (expected.length !== cookieValue.length) return false;
  try {
    return timingSafeEqual(Buffer.from(expected, "utf8"), Buffer.from(cookieValue, "utf8"));
  } catch {
    return false;
  }
}

export async function getUnlocked(): Promise<boolean> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME)?.value;
  return verifyCookie(cookie);
}

export { COOKIE_NAME, COOKIE_VALUE };
