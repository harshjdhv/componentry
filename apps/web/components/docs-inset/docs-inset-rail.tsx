"use client"

import type React from "react"
import Link from "next/link"
import { ArrowUpRight, Plus } from "lucide-react"
import posthog from "posthog-js"

import { cn } from "@/lib/utils"
import { ComponentryLogomark } from "@/components/logos/componentry-logomark"
import { formatStars, useGithubStars } from "@/hooks/use-github-stars"
import { docsSponsors, docsSponsorSlots, sponsorStats, type Sponsor } from "@/lib/sponsors"

const GITHUB_URL = "https://github.com/harshjdhv/componentry"
const X_URL = "https://x.com/harshjdhv"

// Flat on the page: hairline border and a faint fill, no shadow, so the cards sit
// with the content instead of hovering above it.
const card =
  "rounded-2xl border border-black/[0.07] bg-white p-1.5 dark:border-white/[0.06] dark:bg-white/[0.02]"
// Inner area inside a card (banner / slots); same surface as the card itself.
const inset = "rounded-xl"
const heading = "text-[14px] font-medium tracking-[-0.01em] text-foreground"
const body = "mt-1 text-pretty text-[13px] leading-5 text-zinc-500 dark:text-zinc-400"
const primaryButton =
  "inline-flex h-8 items-center justify-center gap-1.5 rounded-lg bg-foreground text-[13px] font-medium text-background shadow-[inset_0_-1px_0_rgba(0,0,0,0.12)] transition-[opacity,transform] duration-150 hover:opacity-90 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
const ghostButton =
  "inline-flex h-8 items-center justify-center gap-1.5 rounded-lg bg-foreground/[0.06] text-[13px] font-medium text-foreground transition-[background-color,transform] duration-150 hover:bg-foreground/[0.09] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.303 3.438 9.8 8.207 11.387.6.11.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.388-1.333-1.757-1.333-1.757-1.089-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.807 1.305 3.493.998.108-.776.418-1.305.762-1.605-2.666-.304-5.467-1.333-5.467-5.93 0-1.312.469-2.382 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.009-.323 3.301 1.23A11.52 11.52 0 0 1 12 5.8c1.02.005 2.047.139 3.006.404 2.291-1.553 3.298-1.23 3.298-1.23.652 1.653.241 2.874.117 3.176.769.839 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.48 5.921.431.371.824 1.103.824 2.222v3.293c0 .319.192.688.802.576C20.566 21.795 24 17.298 24 12 24 5.372 18.627 0 12 0Z" />
    </svg>
  )
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

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
  const stars = useGithubStars()
  const hasOpenSlots =
    docsSponsors.main.length < docsSponsorSlots.main ||
    docsSponsors.supporter.length < docsSponsorSlots.supporter

  return (
    <aside className={cn("w-[296px] shrink-0", className)}>
      <div className="flex h-full flex-col gap-2 overflow-y-auto px-2 pt-10 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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

        <section aria-labelledby="docs-support-heading" className={card}>
          {/* Banner: plain soft tint with the logo tile, no pattern. */}
          <div className={cn(inset, "flex h-[88px] items-center justify-center bg-black/[0.03] dark:bg-white/[0.03]")}>
            <div className="flex size-11 items-center justify-center rounded-xl border border-black/[0.08] bg-white dark:border-white/[0.08] dark:bg-[#171717]">
              <ComponentryLogomark className="size-5 text-foreground" />
            </div>
          </div>

          <div className="px-2.5 pt-3 pb-2.5">
            <h2 id="docs-support-heading" className={heading}>
              Enjoying Componentry?
            </h2>
            <p className={body}>It’s free and open source. A star helps more people find it.</p>
            <div className="mt-3.5 grid grid-cols-2 gap-1.5">
              <a
                href={X_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => posthog.capture("docs_rail_support_clicked", { target: "x" })}
                className={ghostButton}
              >
                <XIcon className="size-3" />
                Follow
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => posthog.capture("docs_rail_support_clicked", { target: "github" })}
                className={primaryButton}
              >
                <GitHubIcon className="size-3.5" />
                Star
                <span className="tabular-nums opacity-55">{formatStars(stars)}</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </aside>
  )
}
