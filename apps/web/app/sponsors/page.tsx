"use client"

import Link from "next/link"
import { ArrowUpRight, Check, Plus } from "lucide-react"

import { Footer } from "@/components/footer"
import {
  LandingContent,
  LandingDivider,
  LandingGutter,
  LandingGuideLines,
} from "@/components/landing/landing-frame"
import { SiteHeader } from "@/components/site-header"
import { cn } from "@/lib/utils"
import posthog from "posthog-js"

const sponsorHref =
  "https://github.com/sponsors/harshjdhv?utm_source=componentry&utm_medium=sponsor&utm_campaign=sponsors_page"

const sponsorStats = [
  { value: "15k+", label: "Monthly visitors" },
  { value: "70k+", label: "Page views" },
  { value: "60+", label: "Free components" },
]

const sponsorWall = [
  {
    name: "Shadcnblocks.com",
    logo: "/images/sponsors/shadcnblocks.svg",
    href: "https://shadcnblocks.com/?utm_source=componentry&utm_medium=sponsor&utm_campaign=sponsors_page",
    boardClassName: "md:col-span-3",
  },
  { name: "Main", boardClassName: "md:col-span-3" },
  { name: "Supporter", boardClassName: "md:col-span-3" },
  { name: "Supporter", boardClassName: "md:col-span-3" },
  { name: "Backer", boardClassName: "md:col-span-2" },
  { name: "Backer", boardClassName: "md:col-span-2" },
  { name: "Backer", boardClassName: "md:col-span-2" },
]

const pricingTiers = [
  {
    name: "Main",
    price: "$150",
    cadence: "/mo",
    description: "The highest-visibility spot for a product that should be seen by Componentry's most engaged visitors.",
    features: [
      "Prominent sponsor-board placement",
      "Header sponsor placement",
      "Short product note beside your logo",
      "Helps fund new components and maintenance",
    ],
    hoverNote: "Your logo gets the good seat.",
    highlighted: true,
  },
  {
    name: "Supporter",
    price: "$100",
    cadence: "/mo",
    description: "A polished sponsor presence for teams who want to support the library and stay discoverable.",
    features: [
      "Visible sponsor-board slot",
      "Logo linked to your product",
      "Listed alongside active backers",
      "Supports ongoing demos and docs",
    ],
    hoverNote: "A crisp hello to every builder.",
  },
  {
    name: "Backer",
    price: "$59",
    cadence: "/mo",
    description: "A lightweight way to back independent UI work and keep your name in the project.",
    features: [
      "Backer slot on this page",
      "Name or product link",
      "Public support signal",
      "Helps keep the library free",
    ],
    hoverNote: "Tiny slot. Real gratitude.",
  },
]

function SponsorCta({
  className,
  children = "Sponsor on GitHub",
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <Link
      href={sponsorHref}
      target="_blank"
      rel="noreferrer"
      onClick={() => posthog.capture("sponsor_checkout_started")}
      className={cn(
        "group inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-zinc-950 px-3.5 text-sm font-normal text-white [transform:translate3d(0,0,0)] transition-[background-color,transform] duration-300 ease-out-strong will-change-transform hover:[transform:translate3d(0,-1px,0)] hover:bg-zinc-800 active:[transform:translate3d(0,0,0)] motion-reduce:transform-none motion-reduce:transition-colors motion-reduce:will-change-auto dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200",
        className
      )}
    >
      {children}
      <ArrowUpRight className="size-3.5 [transform:translate3d(0,0,0)] transition-transform duration-300 ease-out-strong group-hover:[transform:translate3d(2px,-2px,0)]" />
    </Link>
  )
}

export default function SponsorsPage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-white text-foreground selection:bg-zinc-200 dark:bg-background dark:selection:bg-zinc-800">
      <LandingGuideLines />
      <SiteHeader landingGutter />

      <main className="relative z-10 flex min-h-screen min-w-0 flex-col justify-start overflow-x-clip pt-28 pb-20 sm:pt-32">
        <LandingGutter>
          <LandingContent>
            <section className="border-b border-border/45 pb-12 md:pb-16">
              <div className="grid gap-8 md:grid-cols-12">
                <div className="min-w-0 md:col-span-7">
                  <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-600">
                    Sponsorship
                  </p>
                  <h1 className="w-full max-w-3xl text-[clamp(1.55rem,7.5vw,3rem)] font-medium leading-[0.98] tracking-[-0.035em] text-zinc-950 dark:text-white sm:text-5xl md:text-6xl">
                    <span className="block whitespace-nowrap sm:inline">
                      Keep Componentry free,
                    </span>{" "}
                    <span className="block whitespace-nowrap sm:inline">
                      fast, and weirdly polished.
                    </span>
                  </h1>
                </div>

                <div className="md:col-span-4 md:col-start-9 md:pt-10">
                  <p className="max-w-sm text-[0.9rem] leading-6 text-zinc-500 text-pretty dark:text-zinc-400 sm:text-base">
                    Componentry is maintained in public and shipped for free. Sponsorship helps cover hosting, design time, component maintenance, and the next batch of experiments.
                  </p>
                  <div className="mt-6">
                    <SponsorCta />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex max-w-2xl flex-col gap-3 text-zinc-500 dark:text-zinc-500 sm:flex-row sm:flex-wrap sm:gap-x-7">
                {sponsorStats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={cn(
                      "flex items-baseline gap-2.5",
                      index !== 0 && "sm:before:block sm:before:size-1 sm:before:rounded-full sm:before:bg-zinc-300 dark:sm:before:bg-zinc-700"
                    )}
                  >
                    <span className="text-xl font-medium tracking-[-0.035em] text-zinc-950 dark:text-white">
                      {stat.value}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.16em]">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </LandingContent>

          <LandingContent>
            <section className="grid border-b border-border/45 py-14 md:grid-cols-12 md:py-18">
              <div className="md:col-span-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-600">
                  Sponsor board
                </p>
                <h2 className="mt-3 max-w-xs text-2xl font-medium leading-tight tracking-[-0.035em] text-zinc-950 dark:text-white">
                  Sponsors and open seats.
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                  Limited placements, kept visible. Pick the tier that matches the kind of presence you want.
                </p>
              </div>

              <div className="mt-8 grid gap-2 sm:grid-cols-2 md:col-span-8 md:mt-0 md:grid-cols-6">
                {sponsorWall.map((slot, index) => {
                  const isFilled = Boolean(slot.logo)
                  const content = (
                    <div
                      className={cn(
                        "group flex min-h-32 flex-col rounded-lg border p-4 [transform:translate3d(0,0,0)] transition-[border-color,background-color,transform] duration-300 ease-out-strong motion-reduce:transform-none motion-reduce:transition-colors",
                        isFilled
                          ? "justify-center border-zinc-300 bg-zinc-50 will-change-transform hover:[transform:translate3d(0,-1px,0)] hover:bg-white motion-reduce:will-change-auto motion-reduce:hover:transform-none dark:border-zinc-700 dark:bg-[#121212] dark:hover:bg-[#161616]"
                          : "items-center justify-center border-dashed border-border/70 bg-white text-center hover:border-zinc-300 hover:bg-zinc-50/80 dark:bg-background dark:hover:border-zinc-700 dark:hover:bg-zinc-900/35"
                      )}
                    >
                      <div className={cn("flex items-start gap-3", !isFilled && "justify-center", isFilled && "items-center")}>
                        <div
                          className={cn(
                            "flex items-center justify-center rounded-lg border",
                            isFilled
                              ? "w-full border-transparent bg-transparent"
                              : "border-dashed border-border/80 text-zinc-400"
                          )}
                        >
                          {slot.logo ? (
                            <span
                              className="block h-8 w-full max-w-[260px] bg-zinc-950 dark:bg-white"
                              role="img"
                              aria-label={`${slot.name} logo`}
                              style={{
                                WebkitMaskImage: `url(${slot.logo})`,
                                maskImage: `url(${slot.logo})`,
                                WebkitMaskPosition: "center",
                                maskPosition: "center",
                                WebkitMaskRepeat: "no-repeat",
                                maskRepeat: "no-repeat",
                                WebkitMaskSize: "contain",
                                maskSize: "contain",
                              }}
                            />
                          ) : (
                            <span className="flex size-10 items-center justify-center">
                              <Plus className="size-4" />
                            </span>
                          )}
                        </div>
                      </div>
                      {!isFilled && (
                        <div>
                          <p className="text-sm font-normal text-zinc-950 dark:text-white">
                            {slot.name}
                          </p>
                          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                            Sponsor this {slot.name.toLowerCase()} slot
                          </p>
                        </div>
                      )}
                    </div>
                  )

                  if (isFilled && slot.href) {
                    return (
                      <Link
                        key={`${slot.name}-${index}`}
                        href={slot.href}
                        target="_blank"
                        rel="noreferrer"
                        className={slot.boardClassName}
                      >
                        {content}
                      </Link>
                    )
                  }

                  return (
                    <Link
                      key={`${slot.name}-${index}`}
                      href={sponsorHref}
                      target="_blank"
                      rel="noreferrer"
                      className={slot.boardClassName}
                    >
                      {content}
                    </Link>
                  )
                })}
              </div>
            </section>
          </LandingContent>

          <LandingContent>
            <section className="py-14 md:py-20">
              <div className="grid gap-6 md:grid-cols-12 md:items-end">
                <div className="md:col-span-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-600">
                    Pricing
                  </p>
                  <h2 className="mt-3 max-w-xs text-2xl font-medium leading-tight tracking-[-0.035em] text-zinc-950 dark:text-white">
                    Pick a placement.
                  </h2>
                </div>
                <p className="max-w-md text-sm leading-6 text-zinc-500 dark:text-zinc-400 md:col-span-4 md:col-start-9">
                  Choose the amount of visibility you want, and help keep the library maintained, documented, and free to use.
                </p>
              </div>

              <div className="mt-8 grid gap-3 lg:grid-cols-3">
                {pricingTiers.map((tier) => (
                  <Link
                    key={tier.name}
                    href={sponsorHref}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() =>
                      posthog.capture("sponsor_checkout_started", {
                        sponsorship_tier: tier.name.toLowerCase(),
                      })
                    }
                    className="group relative block min-h-full pt-10"
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 bottom-2 z-0 rounded-[1.35rem] bg-white/45 opacity-0 shadow-[0_0_0_1px_rgba(0,0,0,0.05),inset_0_18px_40px_-30px_rgba(0,0,0,0.28),inset_0_-18px_40px_-32px_rgba(0,0,0,0.24)] backdrop-blur-xl [transform:translate3d(0,14px,0)] transition-[opacity,transform] duration-150 ease-in will-change-[opacity,transform] group-hover:opacity-100 group-hover:[transform:translate3d(0,0,0)] group-hover:duration-500 group-hover:ease-out-strong motion-reduce:transform-none motion-reduce:transition-opacity motion-reduce:will-change-auto dark:bg-white/[0.055] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.07),inset_0_18px_40px_-30px_rgba(255,255,255,0.2),inset_0_-18px_40px_-32px_rgba(255,255,255,0.16)]">
                      <p className="px-4 pt-3 text-center text-sm font-medium text-zinc-700 dark:text-zinc-100">
                        {tier.hoverNote}
                      </p>
                    </div>

                    <div
                      className={cn(
                        "relative z-10 flex min-h-[380px] flex-col overflow-hidden rounded-[1.35rem] bg-white p-5 text-left shadow-[0_0_0_1px_rgba(0,0,0,0.06),inset_0_8px_18px_-20px_color-mix(in_oklch,var(--foreground)_45%,transparent),inset_0_-8px_18px_-22px_color-mix(in_oklch,var(--foreground)_40%,transparent)] [transform:translate3d(0,0,0)] transition-[background-color,box-shadow,transform] duration-500 ease-out-strong will-change-transform group-hover:[transform:translate3d(0,-4px,0)] group-hover:bg-white group-hover:shadow-[0_0_0_1px_rgba(0,0,0,0.075),0_22px_60px_-42px_rgba(0,0,0,0.65),inset_0_8px_18px_-20px_color-mix(in_oklch,var(--foreground)_45%,transparent),inset_0_-8px_18px_-22px_color-mix(in_oklch,var(--foreground)_40%,transparent)] motion-reduce:transform-none motion-reduce:transition-colors motion-reduce:will-change-auto dark:bg-[#1a1a1a] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.085),inset_0_8px_18px_-20px_color-mix(in_oklch,var(--foreground)_45%,transparent),inset_0_-8px_18px_-22px_color-mix(in_oklch,var(--foreground)_40%,transparent)] dark:group-hover:bg-[#1a1a1a] dark:group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.105),0_22px_60px_-42px_rgba(0,0,0,0.9),inset_0_8px_18px_-20px_color-mix(in_oklch,var(--foreground)_45%,transparent),inset_0_-8px_18px_-22px_color-mix(in_oklch,var(--foreground)_40%,transparent)] sm:p-6",
                        tier.highlighted && "shadow-[0_0_0_1px_rgba(0,0,0,0.085),0_18px_50px_-44px_rgba(0,0,0,0.65),inset_0_8px_18px_-20px_color-mix(in_oklch,var(--foreground)_45%,transparent),inset_0_-8px_18px_-22px_color-mix(in_oklch,var(--foreground)_40%,transparent)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.115),0_18px_50px_-44px_rgba(0,0,0,0.95),inset_0_8px_18px_-20px_color-mix(in_oklch,var(--foreground)_45%,transparent),inset_0_-8px_18px_-22px_color-mix(in_oklch,var(--foreground)_40%,transparent)]"
                      )}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-normal text-zinc-500 dark:text-zinc-400">
                            {tier.name}
                          </p>
                          <div className="mt-3 flex items-end gap-1">
                            <span className="text-[clamp(2.55rem,13vw,3rem)] font-medium leading-none tracking-[-0.06em] sm:text-5xl">
                              {tier.price}
                            </span>
                            <span className="pb-1 text-sm text-zinc-400 dark:text-zinc-600">
                              {tier.cadence}
                            </span>
                          </div>
                        </div>
                        {tier.highlighted && (
                          <span className="rounded-full bg-zinc-950 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white shadow-[0_1px_1px_rgba(0,0,0,0.10),0_8px_20px_-12px_rgba(0,0,0,0.45)] dark:bg-white dark:text-zinc-950">
                            Main
                          </span>
                        )}
                      </div>

                      <p className="mt-5 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                        {tier.description}
                      </p>

                      <ul className="mt-8 space-y-3 pb-8">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex gap-2 text-sm">
                            <Check className="mt-0.5 size-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto flex h-10 items-center justify-center gap-1.5 rounded-full bg-foreground text-sm font-medium text-background transition-opacity duration-300 ease-out-strong group-hover:opacity-90">
                        Sponsor this tier
                        <ArrowUpRight className="size-3.5 [transform:translate3d(0,0,0)] transition-transform duration-300 ease-out-strong group-hover:[transform:translate3d(2px,-2px,0)]" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </LandingContent>

          <LandingDivider />

          <LandingContent>
            <section className="grid gap-6 py-12 md:grid-cols-12 md:items-center">
              <p className="max-w-2xl text-base font-normal leading-7 tracking-[-0.015em] text-zinc-700 text-pretty dark:text-zinc-300 sm:text-lg sm:leading-8 md:col-span-7">
                Want your product seen by developers who care about the last ten percent of interface craft?
              </p>
              <div className="md:col-span-4 md:col-start-9 md:text-right">
                <SponsorCta>Become a sponsor</SponsorCta>
              </div>
            </section>
          </LandingContent>
        </LandingGutter>
      </main>

      <Footer />
    </div>
  )
}
