"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signCookie, COOKIE_NAME, COOKIE_VALUE } from "@/app/lib/auth";

export type UnlockState = { error?: string } | null;

/** Server action for useActionState: (prevState, formData) => newState. Redirects on success. */
export async function unlockAction(
  _prevState: UnlockState,
  formData: FormData
): Promise<UnlockState> {
  const pin = formData.get("pin");
  const pinStr = typeof pin === "string" ? pin.trim() : "";

  if (pinStr.length !== 6 || !/^\d{6}$/.test(pinStr)) {
    return { error: "Please enter a 6-digit PIN." };
  }

  const expectedPin = process.env.SITE_PIN;
  if (!expectedPin) {
    return { error: "Server is not configured for PIN access." };
  }

  if (pinStr !== expectedPin) {
    return { error: "Invalid PIN." };
  }

  const signed = signCookie(COOKIE_VALUE);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, signed, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });

  redirect("/");
}
