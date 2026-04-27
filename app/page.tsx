import Link from "next/link";
import { getUnlocked } from "@/app/lib/auth";
import { PinGate } from "@/app/PinGate";

export default async function Home() {
  const unlocked = await getUnlocked();

  if (!unlocked) {
    return <PinGate />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-16 sm:px-16">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Home
        </h1>
        <p className="max-w-md text-zinc-600 dark:text-zinc-400">
          Welcome. Use the links below to browse.
        </p>
        <nav className="flex flex-col gap-3">
          <Link
            href="/grace-and-growth"
            className="font-medium text-zinc-950 underline decoration-zinc-300 underline-offset-2 hover:decoration-zinc-500 dark:text-zinc-50 dark:decoration-zinc-600 dark:hover:decoration-zinc-400"
          >
            Grace and Growth
          </Link>
          <Link
            href="/est-research"
            className="font-medium text-zinc-950 underline decoration-zinc-300 underline-offset-2 hover:decoration-zinc-500 dark:text-zinc-50 dark:decoration-zinc-600 dark:hover:decoration-zinc-400"
          >
            Childhood OCD manual overview (EST)
          </Link>
          <Link
            href="/component-playground"
            className="font-medium text-zinc-950 underline decoration-zinc-300 underline-offset-2 hover:decoration-zinc-500 dark:text-zinc-50 dark:decoration-zinc-600 dark:hover:decoration-zinc-400"
          >
            Component Playground
          </Link>
        </nav>
      </main>
    </div>
  );
}
