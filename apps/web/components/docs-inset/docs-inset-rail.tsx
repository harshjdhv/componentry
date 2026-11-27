"use client"

import type React from "react"
import Link from "next/link"
import { ArrowUpRight, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { DocsToc } from "./docs-toc"
import { docsLine } from "./surface"
import { docsSponsors, docsSponsorSlots, sponsorStats, type Sponsor } from "@/lib/sponsors"

// Flat on the page: hairline border and a faint fill, no shadow, so the cards sit
// with the content instead of hovering above it.
const card =
  "rounded-2xl border border-black/[0.07] bg-white p-1.5 dark:border-white/[0.06] dark:bg-white/[0.02]"
// Inner area inside a card (banner / slots); same surface as the card itself.
const inset = "rounded-xl"
const heading = "text-[14px] font-medium tracking-[-0.01em] text-foreground"

const slot =
  "group flex items-center justify-center rounded-lg transition-colors duration-150 ease-out"
// Filled sponsors carry weight; open slots are dashed outlines so they read as "available".
const filledSlot = "bg-white/80 hover:bg-white dark:bg-white/[0.04] dark:hover:bg-white/[0.07]"
const openSlot =
  "border border-dashed border-black/[0.12] hover:border-black/[0.25] hover:bg-white/60 dark:border-white/[0.1] dark:hover:border-white/[0.22] dark:hover:bg-white/[0.02]"

/** A tier's row of slots: real sponsors first, then open "Your logo here" slots. */
function SponsorTier({
  label,
  sponsors,
  count,
  size,
}: {
  label: string
  sponsors: Sponsor[]
  count: number
  size: "lg" | "sm"
}) {
  const open = Math.max(count - sponsors.length, 0)
  const height = size === "lg" ? "h-16" : "h-12"

  return (
    <div>
      <p className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.04em] text-zinc-400 dark:text-zinc-500">{label}</p>
      <div className={cn("grid gap-1.5", size === "sm" && "grid-cols-2")}>
        {sponsors.map((sponsor) => (
          <a
            key={sponsor.name}
            href={sponsor.href}
            target="_blank"
            rel="noopener noreferrer sponsored"
            aria-label={sponsor.name}
            className={cn(slot, filledSlot, height, "px-4")}
          >
            <span
              aria-hidden
              className="h-6 w-full bg-zinc-800 transition-colors group-hover:bg-zinc-950 dark:bg-zinc-200 dark:group-hover:bg-white"
              style={{
                maskImage: `url(${sponsor.logo})`,
                WebkitMaskImage: `url(${sponsor.logo})`,
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskPosition: "center",
                maskSize: "contain",
                WebkitMaskSize: "contain",
              }}
            />
          </a>
        ))}
        {Array.from({ length: open }, (_, i) => (
          <Link
            key={`open-${i}`}
            href="/sponsors"
            className={cn(
              slot,
              openSlot,
              height,
              "gap-1.5 text-[12.5px] text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-200"
            )}
          >
            <Plus className="size-3.5" />
            {size === "lg" ? "Your logo here" : "Your logo"}
          </Link>
        ))}
      </div>
    </div>
  )
}

/**
 * Right column of the docs shell, docked to the top: sponsor placements, then the
 * star / follow card. Bordered rather than filled so it sits with the page.
 */
export function DocsInsetRail({ className }: { className?: string }) {
  const hasOpenSlots =
    docsSponsors.main.length < docsSponsorSlots.main ||
    docsSponsors.supporter.length < docsSponsorSlots.supporter

  return (
    <aside className={cn("w-[296px] shrink-0", className)}>
      <div className="flex h-full flex-col gap-2 overflow-y-auto px-2 pt-10 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Page outline first, like dithercn; px-4 lines its text up with the card headings below. */}
        <DocsToc className={cn("mb-3 border-b px-4 pb-6", docsLine)} />

        <section aria-labelledby="docs-sponsors-heading" className={card}>
          <div className="flex items-center justify-between px-2.5 pt-2 pb-2.5">
            <h2 id="docs-sponsors-heading" className={heading}>
              Sponsors
            </h2>
            <Link
              href="/sponsors"
              className="group -mr-1 inline-flex items-center gap-0.5 rounded px-1 text-[12.5px] text-zinc-500 transition-colors hover:text-foreground dark:text-zinc-400"
            >
              {hasOpenSlots ? "Tiers" : "Become one"}
              <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
            </Link>
          </div>

          <div className={cn(inset, "space-y-3 p-2.5")}>
            <SponsorTier label="Main" sponsors={docsSponsors.main} count={docsSponsorSlots.main} size="lg" />
            <SponsorTier
              label="Supporter"
              sponsors={docsSponsors.supporter}
              count={docsSponsorSlots.supporter}
              size="sm"
            />
          </div>

          {hasOpenSlots && (
            <dl className="grid grid-cols-2 divide-x divide-black/[0.06] px-1 pt-3 pb-2 dark:divide-white/[0.06]">
              {sponsorStats.slice(0, 2).map((stat) => (
                <div key={stat.label} className="px-2.5">
                  <dt className="text-[11.5px] text-zinc-500 dark:text-zinc-400">{stat.label}</dt>
                  <dd className="mt-0.5 text-[15px] font-medium tracking-[-0.01em] text-foreground tabular-nums">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </section>

      </div>
    </aside>
  )
}
