"use client";

import Link from "next/link";
import * as React from "react";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@workspace/ui/lib/utils";
import { components, type ComponentCategory } from "@/registry";

import { MatrixRain } from "@workspace/ui/components/matrix-rain";
import { ScrollBasedVelocity } from "@workspace/ui/components/scroll-based-velocity";
import { EyeTracking } from "@workspace/ui/components/eye-tracking";
import { DitherGradient } from "@workspace/ui/components/dither-gradient";
import { MagneticDock } from "@workspace/ui/components/magnetic-dock";
import { MACOS_DOCK_ITEMS } from "@workspace/ui/components/magnetic-dock-icons";
import { HeatmapLogo } from "@workspace/ui/components/heatmap-logo";

import { ResponsiveMagnetLines } from "./responsive-magnet-lines";

/**
 * The landing page as an index.
 *
 * A library is a list, so the page is a list: every component, grouped by
 * category, set in type. Pointing at a row renders that component live in the
 * panel beside it — the proof is the thing you are reading about, not a screenshot
 * three sections further down.
 */

const CATEGORY_ORDER: ComponentCategory[] = [
  "Components",
  "Text Animations",
  "Hero Backgrounds",
  "Visual Effects",
];

const DOCK_ITEMS = MACOS_DOCK_ITEMS.filter((item) =>
  ["finder", "safari", "mail", "messages", "music"].includes(item.id)
);

/** Slugs with a live preview we can mount cheaply. Everything else gets a spec card. */
const LIVE: Record<string, React.ReactNode> = {
  "matrix-rain": <MatrixRain speed={30} fontSize={10} variant="cyan" />,
  "scroll-based-velocity": (
    <ScrollBasedVelocity
      text="COMPONENTRY"
      default_velocity={3}
      className="font-sans text-4xl font-black tracking-tighter text-zinc-800 dark:text-white sm:text-6xl"
    />
  ),
  "eye-tracking": <EyeTracking eyeSize={84} gap={24} variant="realistic" />,
  "dither-gradient": (
    <DitherGradient
      colorFrom="#ffaa40"
      colorTo="#9c40ff"
      colorMid="#ff00cc"
      intensity={0.5}
      speed={2}
    />
  ),
  "magnetic-dock": (
    <MagneticDock items={DOCK_ITEMS} position="bottom" variant="glass" />
  ),
  "heatmap-logo": <HeatmapLogo image="/logo-new.svg" className="w-40" />,
  "magnet-lines": (
    <ResponsiveMagnetLines
      rows={5}
      containerSize="100%"
      lineColor="rgba(113,113,122,0.5)"
      lineWidth="4px"
      lineHeight="32px"
    />
  ),
};

const grouped = CATEGORY_ORDER.map((category) => ({
  category,
  items: Object.values(components)
    .filter((component) => component.category === category)
    .sort((a, b) => a.title.localeCompare(b.title)),
})).filter((group) => group.items.length > 0);

const total = grouped.reduce((count, group) => count + group.items.length, 0);
const firstLive = "magnetic-dock";

export function IndexLanding() {
  const [active, setActive] = React.useState<string | null>(null);
  const shown = active ?? firstLive;
  const meta = components[shown];
  const live = LIVE[shown];

  return (
    <div className="min-h-screen bg-white text-zinc-950 dark:bg-[#0b0b0c] dark:text-zinc-50">
      <div className="mx-auto w-full max-w-[1360px] px-6 lg:px-10">
        {/* Masthead: the whole product in one line. */}
        <header className="flex items-baseline justify-between border-b border-zinc-200/80 py-6 dark:border-white/10">
          <Link href="/" className="text-[15px] font-semibold tracking-[-0.02em]">
            COMPONENTRY
          </Link>
          <nav className="flex items-center gap-6 text-[13px] text-zinc-500 dark:text-zinc-400">
            <Link href="/docs" className="transition-colors hover:text-zinc-950 dark:hover:text-white">
              Docs
            </Link>
            <Link href="/docs/mcp" className="transition-colors hover:text-zinc-950 dark:hover:text-white">
              MCP
            </Link>
            <Link href="/sponsors" className="transition-colors hover:text-zinc-950 dark:hover:text-white">
              Sponsors
            </Link>
          </nav>
        </header>

        <div className="grid grid-cols-1 gap-x-16 lg:grid-cols-[minmax(0,40%)_minmax(0,60%)]">
          {/* Left: the specimen panel, pinned while the index scrolls. */}
          <aside className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-between lg:py-10">
            <div className="pt-10 lg:pt-0">
              <h1 className="text-balance text-[32px] font-medium leading-[36px] tracking-[-0.028em] sm:text-[42px] sm:leading-[46px] sm:tracking-[-0.033em]">
                {total} components.{" "}
                <span className="block text-neutral-500 dark:text-neutral-400">
                  No package, no lock-in.
                </span>
              </h1>
              <p className="mt-4 max-w-[38ch] text-pretty text-[15px] leading-[22px] text-neutral-500 dark:text-neutral-400">
                Every one is a file you own: React, Tailwind and Motion, copied into
                your repo through the shadcn CLI or handed to your agent over MCP.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <Link
                  href="/docs"
                  className="inline-flex h-9 items-center gap-1.5 rounded-[8px] bg-zinc-950 px-3.5 text-[13px] font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                >
                  Browse the index
                  <ArrowUpRight className="size-3.5" />
                </Link>
                <Link
                  href="/docs/mcp"
                  className="inline-flex h-9 items-center rounded-[8px] px-3 text-[13px] text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-white/[0.06]"
                >
                  Use it with your agent
                </Link>
              </div>
              <div className="mt-5 w-full max-w-[420px]">
                <div className="mb-1.5 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-500">
                  <span>Install {meta?.title ?? shown}</span>
                  <span>cli</span>
                </div>
                <code className="block w-full overflow-hidden text-ellipsis whitespace-nowrap rounded-[8px] bg-zinc-50 px-3 py-2 font-mono text-[12px] text-zinc-600 shadow-[inset_0_0_0_1px_rgb(10_10_10/0.05)] dark:bg-white/[0.04] dark:text-zinc-400 dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.06)]">
                  npx shadcn@latest add @componentry/{shown}
                </code>
              </div>
            </div>

            {/* The specimen. Hovering a row swaps what lives here. */}
            <div className="my-8 hidden lg:block">
              <div className="relative h-[340px] overflow-hidden rounded-[16px] bg-[#fafafa] shadow-[inset_0_0_0_1px_rgb(10_10_10/0.045)] dark:bg-white/[0.03] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.06)]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgb(0_0_0/0.06)_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(rgb(255_255_255/0.07)_1px,transparent_1px)]" />
                {live ? (
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden p-6 [&>*]:max-w-full">
                    {live}
                  </div>
                ) : (
                  <div className="flex h-full flex-col justify-between p-6">
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-400">
                      {meta?.category ?? ""}
                    </span>
                    <span className="text-[22px] font-medium tracking-[-0.02em] text-zinc-400 dark:text-zinc-500">
                      {meta?.title ?? ""}
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-4">
                <Link
                  href={`/docs/components/${shown}`}
                  className="group inline-flex items-center gap-1 text-[13px] font-medium text-zinc-700 dark:text-zinc-300"
                >
                  {meta?.title ?? shown}
                  <ArrowUpRight className="size-3.5 text-zinc-400 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
                <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
                  {live ? "live preview" : "open the docs"}
                </span>
              </div>
            </div>

            <div className="hidden pb-2 lg:block">
              <div className="flex items-center justify-between border-t border-zinc-200/80 pt-4 text-[12px] text-zinc-500 dark:border-white/10 dark:text-zinc-400">
                <span>{total} components across four categories</span>
                <a
                  href="https://github.com/harshjdhv/componentry"
                  className="transition-colors hover:text-zinc-950 dark:hover:text-white"
                >
                  GitHub
                </a>
              </div>
            </div>
          </aside>

          {/* Right: the index itself. */}
          <main className="min-w-0 border-t border-zinc-200/80 lg:border-t-0 dark:border-white/10">
            <div className="flex items-baseline justify-between border-b border-zinc-200/80 py-5 dark:border-white/10">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
                Index
              </h2>
              <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">{total}</span>
            </div>
            {grouped.map((group) => (
              <section key={group.category} className="border-b border-zinc-200/80 dark:border-white/10">
                <div className="flex items-baseline justify-between py-5">
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
                    {group.category}
                  </h3>
                  <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                </div>

                <ul className="pb-6">
                  {group.items.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/docs/components/${item.slug}`}
                        onMouseEnter={() => setActive(item.slug)}
                        onFocus={() => setActive(item.slug)}
                        className={cn(
                          "group flex items-baseline justify-between gap-6 rounded-[6px] py-2 pr-2 pl-2 transition-colors",
                          "hover:bg-zinc-50 focus-visible:bg-zinc-50 focus-visible:outline-none dark:hover:bg-white/[0.03] dark:focus-visible:bg-white/[0.03]",
                          shown === item.slug &&
                            "bg-zinc-50 shadow-[inset_2px_0_0_0_rgb(24_24_27)] dark:bg-white/[0.04] dark:shadow-[inset_2px_0_0_0_rgb(255_255_255/0.7)]"
                        )}
                      >
                        <span className="flex min-w-0 items-baseline gap-3">
                          <span
                            className={cn(
                              "size-1.5 shrink-0 translate-y-[-2px] rounded-full transition-opacity",
                              LIVE[item.slug]
                                ? "bg-zinc-900 opacity-0 group-hover:opacity-100 dark:bg-white"
                                : "bg-zinc-300 opacity-0 group-hover:opacity-100 dark:bg-zinc-600"
                            )}
                          />
                          <span className="truncate text-[16px] tracking-[-0.01em] text-zinc-900 dark:text-zinc-100">
                            {item.title}
                          </span>
                        </span>
                        <span className="hidden shrink-0 text-[12px] text-zinc-400 opacity-0 transition-opacity group-hover:opacity-100 sm:block dark:text-zinc-500">
                          {LIVE[item.slug] ? "live" : "docs"}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
