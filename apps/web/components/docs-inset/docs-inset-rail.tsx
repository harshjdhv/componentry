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

// A soft tint on the page surface: groups the content without drawing a line.
const card = "rounded-xl bg-black/[0.025] p-4 dark:bg-white/[0.03]"

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
  "group flex items-center justify-center rounded-md bg-white transition-colors duration-150 ease-out hover:bg-zinc-50 dark:bg-white/[0.035] dark:hover:bg-white/[0.06]"

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
  const height = size === "lg" ? "h-[72px]" : "h-14"

  return (
    <div>
      <p className="mb-1.5 text-[11.5px] text-zinc-400 dark:text-zinc-500">{label}</p>
      <div className={cn("grid gap-1.5", size === "sm" && "grid-cols-2")}>
        {sponsors.map((sponsor) => (
          <a
            key={sponsor.name}
            href={sponsor.href}
            target="_blank"
            rel="noopener noreferrer sponsored"
            aria-label={sponsor.name}
            className={cn(slot, height, "px-4")}
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
 * Right column of the docs shell, docked to the bottom: custom-work pitch,
 * sponsor placements, then the star / follow card (replaces the old popup). Later cards
 * (newsletter, paid version) stack above them in the same card style.
 */
export function DocsInsetRail({ className }: { className?: string }) {
  const stars = useGithubStars()
  const visitors = sponsorStats[0]
  const hasOpenSlots =
    docsSponsors.main.length < docsSponsorSlots.main ||
    docsSponsors.supporter.length < docsSponsorSlots.supporter

  return (
    <aside className={cn("w-[296px] shrink-0", className)}>
      <div className="flex h-full flex-col gap-2 overflow-y-auto px-2 pt-2 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section aria-labelledby="docs-custom-heading" className={cn(card, "mt-auto")}>
          <p className="text-[11.5px] text-zinc-400 dark:text-zinc-500">Available for work</p>
          <h2 id="docs-custom-heading" className="mt-1 text-[14px] font-medium tracking-[-0.01em] text-foreground">
            Need a custom component?
          </h2>
          <p className="mt-1 text-pretty text-[13px] leading-5 text-zinc-500 dark:text-zinc-400">
            I build bespoke components and websites tailored to your brand.
          </p>
          <a
            href={X_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => posthog.capture("docs_rail_custom_work_clicked")}
            className="mt-4 inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-md bg-foreground/[0.06] text-[13px] font-medium text-foreground transition-[background-color,transform] duration-150 hover:bg-foreground/[0.1] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <XIcon className="size-3" />
            DM me on X
          </a>
        </section>

        <section aria-labelledby="docs-sponsors-heading" className={card}>
          <h2
            id="docs-sponsors-heading"
            className="text-[14px] font-medium tracking-[-0.01em] text-foreground"
          >
            Sponsors
          </h2>
          {hasOpenSlots && visitors && (
            <p className="mt-1 text-pretty text-[13px] leading-5 text-zinc-500 dark:text-zinc-400">
              Put your logo in front of {visitors.value} developers every month.
            </p>
          )}

          <div className="mt-4 space-y-3.5">
            <SponsorTier label="Main" sponsors={docsSponsors.main} count={docsSponsorSlots.main} size="lg" />
            <SponsorTier
              label="Supporter"
              sponsors={docsSponsors.supporter}
              count={docsSponsorSlots.supporter}
              size="sm"
            />
          </div>

          <Link
            href="/sponsors"
            className="group mt-4 flex items-center justify-between pt-1 text-[13px] text-zinc-500 transition-colors hover:text-zinc-900 dark:border-white/[0.06] dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            {hasOpenSlots ? "See sponsorship tiers" : "Become a sponsor"}
            <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
          </Link>
        </section>

        <section aria-labelledby="docs-support-heading" className={card}>
          <ComponentryLogomark className="size-5 text-foreground" />
          <h2 id="docs-support-heading" className="mt-3 text-[14px] font-medium tracking-[-0.01em] text-foreground">
            Enjoying Componentry?
          </h2>
          <p className="mt-1 text-pretty text-[13px] leading-5 text-zinc-500 dark:text-zinc-400">
            It’s free and open source. A star helps more people find it.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <a
              href={X_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => posthog.capture("docs_rail_support_clicked", { target: "x" })}
              className="inline-flex h-8 items-center justify-center gap-1.5 rounded-md bg-foreground/[0.06] text-[13px] font-medium text-foreground transition-[background-color,transform] duration-150 hover:bg-foreground/[0.1] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <XIcon className="size-3" />
              Follow
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => posthog.capture("docs_rail_support_clicked", { target: "github" })}
              className="inline-flex h-8 items-center justify-center gap-1.5 rounded-md bg-foreground text-[13px] font-medium text-background transition-[opacity,transform] duration-150 hover:opacity-90 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <GitHubIcon className="size-3.5" />
              Star
              <span className="tabular-nums opacity-55">{formatStars(stars)}</span>
            </a>
          </div>
        </section>
      </div>
    </aside>
  )
}
