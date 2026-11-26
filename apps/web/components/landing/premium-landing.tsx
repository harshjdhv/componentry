"use client";

import Link from "next/link";
import * as React from "react";
import { ArrowRight, ArrowUpRight, Check, Copy } from "lucide-react";

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
 * Landing page.
 *
 * Structure: a hero that shows one component live beside the claim, three cards
 * for what you actually get, the full index in type, then the install.
 *
 * The index stays because a library is a list — but it is a section here, not the
 * whole page, so the page can do the things a landing page has to do: say what
 * this is, prove it, and get out of the way.
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

const LIVE: Record<string, React.ReactNode> = {
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
  "eye-tracking": <EyeTracking eyeSize={92} gap={26} variant="realistic" />,
  "matrix-rain": <MatrixRain speed={30} fontSize={10} variant="cyan" />,
  "heatmap-logo": <HeatmapLogo image="/logo-new.svg" className="w-44" />,
  "magnet-lines": (
    <ResponsiveMagnetLines
      rows={5}
      containerSize="100%"
      lineColor="rgba(113,113,122,0.5)"
      lineWidth="4px"
      lineHeight="32px"
    />
  ),
  "scroll-based-velocity": (
    <ScrollBasedVelocity
      text="COMPONENTRY"
      default_velocity={3}
      className="font-sans text-4xl font-black tracking-tighter text-zinc-800 dark:text-white sm:text-6xl"
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

const SPECIMENS = ["dither-gradient", "matrix-rain", "scroll-based-velocity", "magnet-lines"];

function InstallCommand({ slug }: { slug: string }) {
  const [copied, setCopied] = React.useState(false);
  const command = `npx shadcn@latest add @componentry/${slug}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="w-full sm:max-w-[440px]">
      <div className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-400 dark:text-zinc-500">
        Install
      </div>
      <div className="flex items-center gap-2 rounded-[10px] bg-zinc-50 py-2 pl-3 pr-2 shadow-[inset_0_0_0_1px_rgb(10_10_10/0.06)] dark:bg-white/[0.04] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.07)]">
        <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-[11.5px] tracking-[-0.01em] text-zinc-700 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden dark:text-zinc-300">
          <span className="text-zinc-400 dark:text-zinc-500">$ </span>
          {command}
        </code>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Copied" : "Copy install command"}
          className="inline-flex size-7 shrink-0 items-center justify-center rounded-[6px] text-zinc-500 transition-colors hover:bg-zinc-200/70 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        </button>
      </div>
    </div>
  );
}

export function PremiumLanding() {
  const [specimen, setSpecimen] = React.useState(SPECIMENS[0] ?? "dither-gradient");
  const meta = components[specimen];

  return (
    <div className="min-h-screen bg-white text-zinc-950 dark:bg-[#0a0a0b] dark:text-zinc-50">
      {/* ── Masthead ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-zinc-200/70 bg-white/85 backdrop-blur-md dark:border-white/[0.08] dark:bg-[#0a0a0b]/85">
        <div className="mx-auto flex h-14 w-full max-w-[1360px] items-center justify-between px-6 lg:px-10">
          <Link href="/" className="text-[14px] font-semibold tracking-[0.02em]">
            COMPONENTRY
          </Link>
          <nav className="flex items-center gap-4 text-[13px] text-zinc-500 sm:gap-7 dark:text-zinc-400">
            <Link href="/docs" className="transition-colors hover:text-zinc-950 dark:hover:text-white">
              Docs
            </Link>
            <Link href="/docs/mcp" className="transition-colors hover:text-zinc-950 dark:hover:text-white">
              MCP
            </Link>
            <Link href="/sponsors" className="transition-colors hover:text-zinc-950 dark:hover:text-white">
              Sponsors
            </Link>
            <Link
              href="https://github.com/harshjdhv/componentry"
              className="transition-colors hover:text-zinc-950 dark:hover:text-white"
            >
              GitHub
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1360px] px-6 lg:px-10">
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section className="grid grid-cols-1 items-center gap-12 py-16 lg:grid-cols-[minmax(0,52%)_minmax(0,48%)] lg:gap-16 lg:py-24">
          <div className="min-w-0">
            <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
              {total} components · React · Tailwind · Motion
            </p>
            <h1 className="mt-5 text-balance text-[36px] font-medium leading-[1.04] tracking-[-0.03em] sm:text-[52px] sm:leading-[1.02] sm:tracking-[-0.035em]">
              Components you own,
              <br />
              <span className="text-neutral-500 dark:text-neutral-400">
                not ones you borrow.
              </span>
            </h1>
            <p className="mt-6 max-w-[46ch] text-pretty text-[16px] leading-[26px] text-neutral-600 dark:text-neutral-400">
              Every one lands in your repo as a file you can read, edit and keep.
              No package to upgrade, no version to pin, no owner to ask.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/docs"
                className="inline-flex h-10 items-center gap-1.5 rounded-[9px] bg-zinc-950 px-4 text-[13.5px] font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                Browse the components
                <ArrowRight className="size-3.5" />
              </Link>
              <Link
                href="/docs/mcp"
                className="inline-flex h-10 items-center gap-1.5 rounded-[9px] px-3.5 text-[13.5px] text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/[0.06]"
              >
                Read the MCP docs
                <ArrowUpRight className="size-3.5 opacity-60" />
              </Link>
            </div>

            <div className="mt-8">
              <InstallCommand slug={specimen} />
            </div>
          </div>

          {/* The specimen. Swapped by the index below. */}
          <div className="min-w-0">
            <div className="rounded-[18px] bg-white p-2 shadow-[0_0_0_1px_rgb(10_10_10/0.055),0_40px_80px_-60px_rgb(10_10_10/0.4)] dark:bg-[#141416] dark:shadow-[0_0_0_1px_rgb(255_255_255/0.07)]">
              <div className="flex flex-col gap-2 sm:grid sm:h-[380px] sm:grid-cols-3 sm:grid-rows-2">
                {/* the specimen — swapped by the index below */}
                <div className="relative h-[260px] overflow-hidden rounded-[12px] bg-[#fafafa] sm:col-span-2 sm:row-span-2 sm:h-auto dark:bg-white/[0.03]">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgb(0_0_0/0.055)_1px,transparent_1px)] [background-size:18px_18px] dark:bg-[radial-gradient(rgb(255_255_255/0.06)_1px,transparent_1px)]" />
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden p-6">
                    {LIVE[specimen] ?? null}
                  </div>
                  <span className="absolute bottom-3 left-3 rounded-full bg-white/85 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-700 shadow-[0_0_0_1px_rgb(10_10_10/0.06)] backdrop-blur-sm dark:bg-black/50 dark:text-zinc-200 dark:shadow-[0_0_0_1px_rgb(255_255_255/0.1)]">
                    {meta?.title ?? specimen}
                  </span>
                </div>

                {/* two fixed pieces, so the board reads as a library rather than one trick */}
                <div className="relative h-[120px] overflow-hidden rounded-[12px] bg-[#fafafa] sm:h-auto dark:bg-white/[0.03]">
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    <div className="origin-center scale-[0.52]">
                      <MagneticDock items={DOCK_ITEMS} position="bottom" variant="glass" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 left-2 rounded-full bg-white/85 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.08em] text-zinc-700 shadow-[0_0_0_1px_rgb(10_10_10/0.06)] backdrop-blur-sm dark:bg-black/50 dark:text-zinc-200 dark:shadow-[0_0_0_1px_rgb(255_255_255/0.1)]">
                    Dock
                  </span>
                </div>
                <div className="relative h-[120px] overflow-hidden rounded-[12px] bg-[#fafafa] sm:h-auto dark:bg-white/[0.03]">
                  <div className="absolute inset-0 flex items-center justify-center p-3">
                    <HeatmapLogo image="/logo-new.svg" className="w-[92px]" />
                  </div>
                  <span className="absolute bottom-2 left-2 rounded-full bg-white/85 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.08em] text-zinc-700 shadow-[0_0_0_1px_rgb(10_10_10/0.06)] backdrop-blur-sm dark:bg-black/50 dark:text-zinc-200 dark:shadow-[0_0_0_1px_rgb(255_255_255/0.1)]">
                    Heatmap
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between gap-4">
              <Link
                href={`/docs/components/${specimen}`}
                className="group inline-flex items-center gap-1 text-[13px] font-medium text-zinc-700 dark:text-zinc-300"
              >
                {meta?.title ?? specimen}
                <ArrowUpRight className="size-3.5 text-zinc-400 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
                live, running in this page
              </span>
            </div>
          </div>
        </section>

        {/* ── What you get ─────────────────────────────────────────── */}
        <section aria-labelledby="what-you-get" className="border-t border-zinc-200/70 py-16 dark:border-white/[0.08]">
          <h2
            id="what-you-get"
            className="max-w-[720px] text-balance text-[28px] font-medium leading-[34px] tracking-[-0.026em] sm:text-[36px] sm:leading-[42px] sm:tracking-[-0.03em]"
          >
            Three things, and none of them are a dependency.
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              {
                title: "A file, not a package.",
                body: "The CLI writes the component into your repo. Read it, rename it, change the animation curve. There is nothing to upgrade and no breaking release to survive.",
                detail: (
                  <pre className="overflow-hidden font-mono text-[11.5px] leading-[18px] text-zinc-500 dark:text-zinc-400">
{`components/ui/
  magnetic-dock.tsx`}
                  </pre>
                ),
              },
              {
                title: "Built for your agent.",
                body: "The same registry is exposed over MCP, so an editor or agent can pull a component, its dependencies and its source without you copying anything.",
                detail: (
                  <pre className="overflow-hidden font-mono text-[11.5px] leading-[18px] text-zinc-500 dark:text-zinc-400">
{`mcp: componentry
tool: get_component`}
                  </pre>
                ),
              },
              {
                title: "One design language.",
                body: "Tailwind for styling, Motion for movement. Every component shares the same tokens and the same motion values, so ten different pieces still look like one product.",
                detail: (
                  <pre className="overflow-hidden font-mono text-[11.5px] leading-[18px] text-zinc-500 dark:text-zinc-400">
{`tailwind + motion
ease: [0.23, 1, 0.32, 1]`}
                  </pre>
                ),
              },
            ].map((card) => (
              <div
                key={card.title}
                className="flex flex-col rounded-[16px] bg-white p-1.5 shadow-[0_0_0_1px_rgb(10_10_10/0.06)] dark:bg-[#141416] dark:shadow-[0_0_0_1px_rgb(255_255_255/0.07)]"
              >
                <div className="flex min-h-[150px] items-center rounded-[10px] bg-[#fafafa] px-4 py-4 dark:bg-white/[0.03]">
                  {card.detail}
                </div>
                <div className="px-3 pb-3 pt-4">
                  <h3 className="text-[15px] font-medium tracking-[-0.01em]">{card.title}</h3>
                  <p className="mt-1.5 text-pretty text-[13.5px] leading-[21px] text-neutral-500 dark:text-neutral-400">
                    {card.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Index ────────────────────────────────────────────────── */}
        <section aria-labelledby="index" className="border-t border-zinc-200/70 py-16 dark:border-white/[0.08]">
          <div className="flex items-baseline justify-between">
            <h2
              id="index"
              className="max-w-[720px] text-balance text-[28px] font-medium leading-[34px] tracking-[-0.026em] sm:text-[36px] sm:leading-[42px] sm:tracking-[-0.03em]"
            >
              The index.{" "}
              <span className="text-neutral-500 dark:text-neutral-400">
                {total} of them, grouped the way you would look for them.
              </span>
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-16 gap-y-10 sm:grid-cols-2">
            {grouped.map((group) => (
              <div key={group.category}>
                <div className="flex items-baseline justify-between border-b border-zinc-200/70 pb-2 dark:border-white/10">
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.13em] text-zinc-500 dark:text-zinc-400">
                    {group.category}
                  </h3>
                  <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                </div>
                <ul className="mt-1">
                  {group.items.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/docs/components/${item.slug}`}
                        onMouseEnter={() => LIVE[item.slug] && setSpecimen(item.slug)}
                        onFocus={() => LIVE[item.slug] && setSpecimen(item.slug)}
                        className={cn(
                          "group flex items-baseline justify-between gap-4 rounded-[5px] px-2 py-[7px] transition-colors",
                          "hover:bg-zinc-50 focus-visible:bg-zinc-50 focus-visible:outline-none dark:hover:bg-white/[0.04] dark:focus-visible:bg-white/[0.04]",
                          specimen === item.slug && LIVE[item.slug] && "bg-zinc-50 dark:bg-white/[0.04]"
                        )}
                      >
                        <span className="truncate text-[15px] tracking-[-0.005em] text-zinc-800 dark:text-zinc-200">
                          {item.title}
                        </span>
                        <span
                          className={cn(
                            "shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] transition-opacity",
                            LIVE[item.slug]
                              ? "text-zinc-400 opacity-0 group-hover:opacity-100 dark:text-zinc-500"
                              : "opacity-0"
                          )}
                        >
                          live
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Close ────────────────────────────────────────────────── */}
        <section className="border-t border-zinc-200/70 py-20 dark:border-white/[0.08]">
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
            <h2 className="max-w-[16ch] text-balance text-[32px] font-medium leading-[36px] tracking-[-0.028em] sm:text-[42px] sm:leading-[46px] sm:tracking-[-0.033em]">
              Take one.{" "}
              <span className="text-neutral-500 dark:text-neutral-400">It is a file.</span>
            </h2>
            <div className="flex w-full min-w-0 flex-col items-start gap-4 sm:w-auto sm:items-end">
              <InstallCommand slug={specimen} />
              <Link
                href="/docs"
                className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-zinc-700 transition-colors hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
              >
                Or browse all {total}
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200/70 dark:border-white/[0.08]">
        <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-4 px-6 py-8 text-[12.5px] text-zinc-500 sm:flex-row sm:items-center sm:justify-between lg:px-10 dark:text-zinc-400">
          <span>Componentry — built by Harsh Jadhav.</span>
          <div className="flex items-center gap-6">
            <Link href="/docs" className="transition-colors hover:text-zinc-950 dark:hover:text-white">
              Docs
            </Link>
            <Link href="https://github.com/harshjdhv/componentry" className="transition-colors hover:text-zinc-950 dark:hover:text-white">
              GitHub
            </Link>
            <Link href="/privacy-policy" className="transition-colors hover:text-zinc-950 dark:hover:text-white">
              Privacy
            </Link>
            <Link href="/terms-of-service" className="transition-colors hover:text-zinc-950 dark:hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
