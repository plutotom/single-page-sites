"use client";

import { useActionState } from "react";
import { unlockAction } from "@/app/actions";

export function PinGate() {
  const [state, formAction, isPending] = useActionState(unlockAction, null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-black">
      <div className="w-full max-w-xs rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="mb-4 text-center text-lg font-medium text-zinc-900 dark:text-zinc-100">
          Enter PIN
        </h2>
        <form action={formAction} className="flex flex-col gap-4">
          <input
            type="password"
            name="pin"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            autoComplete="one-time-code"
            placeholder="6-digit PIN"
            className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-center text-lg tracking-[0.5em] outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500"
            disabled={isPending}
            aria-label="6-digit PIN"
          />
          <button
            type="submit"
            disabled={isPending}
            className="rounded-md bg-zinc-900 px-4 py-2 font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            {isPending ? "Checking…" : "Unlock"}
          </button>
        </form>
        {state?.error && (
          <p className="mt-3 text-center text-sm text-red-600 dark:text-red-400" role="alert">
            {state.error}
          </p>
        )}
      </div>
    </div>
  );
}
