"use client";

import { useState, useCallback, useRef, useEffect } from "react";

const CONTACTS = [
  { name: "Joanna Dasari", email: "joanna.dasari@my.wheaton.edu" },
  { name: "Dave Mendrygal", email: "dave.mendrygal@my.wheaton.edu" },
  { name: "Isaiah Proctor", email: "isaiah.proctor@my.wheaton.edu" },
  { name: "Sandra Yu Rueger, PhD", email: "sandra.rueger@wheaton.edu" },
] as const;

function MailIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 opacity-70"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 shrink-0 opacity-60"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 shrink-0 text-(--gg-blue)"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
  }, []);

  const copyEmail = useCallback((email: string) => {
    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    void navigator.clipboard.writeText(email).then(() => {
      setCopiedEmail(email);
      copyTimeoutRef.current = setTimeout(() => setCopiedEmail(null), 2000);
    });
  }, []);

  return (
    <section className="mb-12" aria-label="Contact">
      <h2 className="mb-4 border-b-2 border-(--gg-blue) pb-2 text-lg font-semibold text-(--gg-blue)">
        Contact
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2" role="list">
        {CONTACTS.map(({ name, email }) => {
          const justCopied = copiedEmail === email;
          return (
            <li key={email}>
              <div
                className="group flex flex-col gap-1 rounded-lg border border-(--gg-blue-muted)/30 bg-(--gg-white) p-4 shadow-sm transition-all duration-300 ease-out hover:border-(--gg-blue)/50 hover:shadow-md focus-within:border-(--gg-blue) focus-within:ring-2 focus-within:ring-(--gg-blue)/20 focus-within:ring-offset-2 focus-within:ring-offset-(--gg-off-white)"
                style={{ fontFamily: "var(--font-grace-serif), serif" }}
              >
                <div className="flex items-center gap-2 text-(--gg-slate) font-medium">
                  <MailIcon />
                  <span>{name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${email}`}
                    className="truncate text-sm text-(--gg-blue) underline underline-offset-2 transition-colors hover:text-(--gg-blue-muted) focus:outline-none"
                  >
                    {email}
                  </a>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      copyEmail(email);
                    }}
                    className="ml-auto shrink-0 rounded p-1.5 text-(--gg-slate-muted) transition-colors duration-200 hover:bg-(--gg-blue)/10 hover:text-(--gg-blue) focus:outline-none focus:ring-2 focus:ring-(--gg-blue) focus:ring-offset-1"
                    title="Copy email"
                    aria-label={`Copy ${email}`}
                  >
                    {justCopied ? <CheckIcon /> : <CopyIcon />}
                  </button>
                </div>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${justCopied ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <span
                      className={`inline-block pt-0.5 text-xs font-medium text-(--gg-blue) transition-opacity duration-300 ease-out ${justCopied ? "opacity-100" : "opacity-0"}`}
                      role="status"
                    >
                      Copied!
                    </span>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
