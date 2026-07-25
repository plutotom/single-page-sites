"use client";

import { useSyncExternalStore } from "react";

/** True after hydration — safe for localStorage and browser-only APIs. */
export function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
