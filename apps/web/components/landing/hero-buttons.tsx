"use client";

import Link from "next/link";
import { LayoutGrid, Terminal } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import posthog from "posthog-js";

export function HeroButtons() {
  const installCommand = "npx shadcn@latest add @componentry/magnetic-dock";

  return (
    <div className="flex w-full min-w-0 flex-col items-stretch justify-center gap-3 pt-6 pb-2 sm:w-auto sm:flex-row sm:items-start">
      <div className="relative z-10 w-full sm:w-fit">
        <Link
          href="/docs"
          onClick={() => posthog.capture("components_browse_started")}
          className="group flex h-12 w-full cursor-pointer items-center justify-center gap-2.5 whitespace-nowrap rounded-xl bg-gradient-to-b from-zinc-900 to-zinc-950 px-5 font-medium text-zinc-100 shadow-[0_1px_1px_0_rgba(0,0,0,0.2),0_8px_20px_-8px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.08),inset_0_1.5px_0_0_rgba(255,255,255,0.08)] transition-[box-shadow,background-color,color] duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:from-zinc-800 hover:to-zinc-900 hover:shadow-[0_2px_2px_0_rgba(0,0,0,0.24),0_14px_30px_-10px_rgba(0,0,0,0.58),0_0_0_1px_rgba(255,255,255,0.08),inset_0_1.5px_0_0_rgba(255,255,255,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:from-white dark:to-zinc-100 dark:text-zinc-950 dark:shadow-[0_1px_1px_0_rgba(0,0,0,0.06),0_8px_20px_-8px_rgba(0,0,0,0.25),0_0_0_1px_rgba(0,0,0,0.08),inset_0_1.5px_0_0_rgba(255,255,255,1),inset_0_-1px_0_0_rgba(0,0,0,0.03)] dark:hover:from-zinc-50 dark:hover:to-zinc-200 dark:focus-visible:ring-zinc-300/60 dark:focus-visible:ring-offset-background sm:w-fit"
        >
          <LayoutGrid className="size-4 transition-transform duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-px" />
          <span className="text-sm font-semibold">Browse components</span>
        </Link>
      </div>

      <div className="relative z-10 w-full sm:w-auto">
        <div
          className="group relative flex h-12 w-full min-w-0 items-center justify-center gap-2 overflow-hidden rounded-xl bg-white/75 px-3 text-sm font-semibold text-zinc-900 shadow-[0_0_0_1px_rgba(0,0,0,0.085),0_8px_20px_-14px_rgba(0,0,0,0.45),inset_0_1px_0_0_rgba(255,255,255,0.82)] backdrop-blur-xl transition-[box-shadow,background-color,color] duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white hover:text-zinc-950 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.12),0_12px_28px_-16px_rgba(0,0,0,0.52),inset_0_1px_0_0_rgba(255,255,255,0.92)] dark:bg-white/[0.065] dark:text-zinc-100 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.09),inset_0_1px_0_0_rgba(255,255,255,0.045)] dark:hover:bg-white/[0.085] dark:hover:text-white dark:hover:shadow-[0_0_0_1px_rgba(255,255,255,0.14),inset_0_1px_0_0_rgba(255,255,255,0.065)] sm:inline-flex sm:w-auto sm:gap-3 sm:px-4"
          title={installCommand}
        >
          <Terminal className="size-4 shrink-0 text-zinc-600 transition-colors duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-100" />
          <span className="min-w-0 flex-1 truncate text-left font-mono text-xs tracking-tight text-zinc-700 transition-colors duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-200 sm:text-sm">
            {installCommand}
          </span>
          <CopyButton
            code={installCommand}
            eventName="component_install_command_copied"
            absolute={false}
            className="shrink-0 p-1.5"
          />
        </div>
      </div>

    </div>
  );
}
