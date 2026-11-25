"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { components, type ComponentMetadata } from "@/registry";

/**
 * The newest component in the registry, derived from `addedAt` rather than hard
 * coded — the moment a component ships with a newer date, this follows it.
 */
function newestComponent(): { slug: string; meta: ComponentMetadata } | null {
  let best: { slug: string; meta: ComponentMetadata } | null = null;
  for (const [slug, meta] of Object.entries(components)) {
    if (!meta.addedAt) continue;
    if (!best || meta.addedAt > best.meta.addedAt!) best = { slug, meta };
  }
  return best;
}

/**
 * A quiet cadence line under the hero: what shipped most recently. Every library
 * that keeps an audience shows this somewhere; it is the cheapest signal that the
 * project is alive.
 */
export function LatestComponent() {
  const latest = newestComponent();
  if (!latest) return null;

  return (
    <div className="mt-7 flex w-full justify-center">
      <Link
        href={`/docs/components/${latest.slug}`}
        className="group inline-flex items-center gap-2 rounded-full bg-zinc-100/80 py-1 pl-1 pr-3 text-[13px] text-zinc-600 transition-colors hover:bg-zinc-200/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:bg-white/[0.06] dark:text-zinc-400 dark:hover:bg-white/[0.1] dark:focus-visible:ring-zinc-500"
      >
        <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-zinc-900 shadow-[0_0_0_1px_rgb(10_10_10/0.06)] dark:bg-white/10 dark:text-zinc-100 dark:shadow-none">
          New
        </span>
        <span className="text-zinc-700 dark:text-zinc-300">{latest.meta.title}</span>
        <ArrowUpRight className="size-3.5 text-zinc-400 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
