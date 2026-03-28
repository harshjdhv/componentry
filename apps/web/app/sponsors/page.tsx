"use client"

import React from "react"
import { motion } from "framer-motion"
import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"

const TIERS = [
  {
    name: "Supporter",
    price: "$9",
    description: "Show you care about open source.",
    badge: null,
    highlighted: false,
    benefits: [
      "Name listed on /sponsors",
      "Small logo with link",
      "GitHub README mention",
    ],
    cta: "Become a Supporter",
    href: "mailto:harshjadhav0901@gmail.com?subject=Sponsorship%20%E2%80%94%20Supporter",
  },
  {
    name: "Partner",
    price: "$29",
    description: "Reach developers building real products every day.",
    badge: "Most popular",
    highlighted: true,
    benefits: [
      "Everything in Supporter",
      "Medium logo, linked on /sponsors",
      "Larger README placement",
      "Shoutout when you join",
      "Mentioned in changelogs",
    ],
    cta: "Become a Partner",
    href: "mailto:harshjadhav0901@gmail.com?subject=Sponsorship%20%E2%80%94%20Partner",
  },
  {
    name: "Sponsor",
    price: "$79",
    description: "Maximum visibility across the entire site.",
    badge: null,
    highlighted: false,
    benefits: [
      "Everything in Partner",
      "Large logo, top of /sponsors",
      "Direct line to maintainer",
    ],
    cta: "Become a Sponsor",
    href: "mailto:harshjadhav0901@gmail.com?subject=Sponsorship%20%E2%80%94%20Sponsor",
  },
]

function EmptySlot({
  href,
  size = "md",
  className = "",
}: {
  href: string
  size?: "lg" | "md" | "sm"
  className?: string
}) {
  return (
    <a
      href={href}
      className={`group flex-1 flex flex-col items-center justify-center gap-2 bg-white dark:bg-[#111] hover:bg-zinc-50/80 dark:hover:bg-zinc-900/60 transition-colors ${
        size === "lg" ? "py-14" : size === "md" ? "py-9" : "py-5"
      } ${className}`}
    >
      <div
        className={`flex items-center justify-center rounded-full border border-dashed border-zinc-200 dark:border-zinc-800 group-hover:border-zinc-300 dark:group-hover:border-zinc-700 transition-colors ${
          size === "lg" ? "size-11" : size === "md" ? "size-8" : "size-6"
        }`}
      >
        <svg
          className={`text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-400 dark:group-hover:text-zinc-500 transition-colors ${
            size === "lg" ? "size-4" : size === "md" ? "size-3" : "size-2.5"
          }`}
          viewBox="0 0 16 16"
          fill="none"
        >
          <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>
      {size !== "sm" && (
        <span className="text-[10px] font-medium tracking-[0.12em] uppercase text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-400 dark:group-hover:text-zinc-500 transition-colors">
          your slot
        </span>
      )}
    </a>
  )
}

export default function SponsorsPage() {
  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-[#111] text-foreground transition-colors duration-300 selection:bg-zinc-200 dark:selection:bg-zinc-800">
      <SiteHeader />

      <main className="relative z-10 flex flex-col items-center pt-40 pb-32 px-4 sm:px-6 overflow-x-clip">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="inline-flex items-center rounded-full border border-zinc-200/60 bg-white/40 dark:border-zinc-800/60 dark:bg-zinc-900/30 px-3 py-1.5 text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 backdrop-blur-xl shadow-sm">
            <span className="flex size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] mr-2.5 animate-pulse" />
            Support open-source development
          </div>
        </motion.div>

        {/* Headline */}
        <div className="max-w-3xl text-center mb-6">
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-100 leading-[1.05]"
          >
            <span className="dark:bg-gradient-to-b dark:from-white/80 dark:via-white dark:to-white/60 dark:bg-clip-text dark:text-transparent inline-block">
              Keep Componentry
            </span>
            <br className="hidden sm:block" />
            <span className="text-zinc-400 dark:text-zinc-500">free forever.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto font-medium tracking-tight"
          >
            Componentry is built and maintained by one person. No VC money. No paid tier. Sponsorships let me keep shipping — and put your brand in front of 5k developers monthly.
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-20 text-sm"
        >
          {[
            { value: "5k", label: "monthly visitors" },
            { value: "40+", label: "components" },
            { value: "100%", label: "open source" },
          ].map((s) => (
            <div key={s.label} className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{s.value}</span>
              <span className="text-zinc-500 dark:text-zinc-500">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Tier cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-20 px-4"
        >
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl border shadow-sm p-2 ${
                tier.highlighted
                  ? "border-zinc-200/60 dark:border-zinc-800/80 bg-white dark:bg-[#1a1a1a]"
                  : "border-zinc-200/60 dark:border-zinc-800/80 bg-white dark:bg-[#1a1a1a]"
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-5">
                  <span className="inline-flex items-center rounded-full bg-zinc-900 dark:bg-zinc-100 px-2.5 py-0.5 text-[11px] font-semibold text-white dark:text-zinc-900 shadow-sm">
                    {tier.badge}
                  </span>
                </div>
              )}

              {/* Inner content area */}
              <div className="flex-1 rounded-xl bg-zinc-50 dark:bg-[#111] border border-dashed border-zinc-200/50 dark:border-zinc-800/80 p-6 flex flex-col">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-600 mb-3">
                  {tier.name}
                </p>

                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    {tier.price}
                  </span>
                  <span className="text-sm text-zinc-400 dark:text-zinc-600 font-medium">/month</span>
                </div>

                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 leading-snug">
                  {tier.description}
                </p>

                <ul className="space-y-2.5 flex-1 mb-6">
                  {tier.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-zinc-600 dark:text-zinc-300">
                      <svg className="mt-0.5 size-3.5 flex-shrink-0 text-zinc-400 dark:text-zinc-500" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>

                <a
                  href={tier.href}
                  className={`w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-center transition-all duration-150 ${
                    tier.highlighted
                      ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-85"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  }`}
                >
                  {tier.cta}
                </a>
              </div>

              {/* Label row like bento cards */}
              <div className="shrink-0 pt-3 pb-1 px-3 text-sm font-medium text-zinc-700 dark:text-zinc-400">
                {tier.price}<span className="text-zinc-400 dark:text-zinc-600"> / month</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Current sponsors */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[1240px] mx-auto px-4 mb-20"
        >
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-1">
            Current sponsors
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
            These folks keep Componentry free for everyone.
          </p>

          <div className="border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            {/* Column header */}
            <div className="flex border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/40">
              <div className="w-32 shrink-0 border-r border-zinc-200 dark:border-zinc-800 px-4 py-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400 dark:text-zinc-600">Tier</p>
              </div>
              <div className="flex-1 px-4 py-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400 dark:text-zinc-600">Placements</p>
              </div>
            </div>

            {/* Sponsor row — 1 large slot */}
            <div className="flex border-b border-zinc-200 dark:border-zinc-800">
              <div className="w-32 shrink-0 border-r border-zinc-200 dark:border-zinc-800 px-4 py-6 flex flex-col justify-center gap-0.5">
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-none">Sponsor</p>
                <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-1">$79 / mo</p>
              </div>
              <EmptySlot href="mailto:harshjadhav0901@gmail.com?subject=Sponsorship%20%E2%80%94%20Sponsor" size="lg" />
            </div>

            {/* Partner row — 3 medium slots */}
            <div className="flex border-b border-zinc-200 dark:border-zinc-800">
              <div className="w-32 shrink-0 border-r border-zinc-200 dark:border-zinc-800 px-4 py-6 flex flex-col justify-center gap-0.5">
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-none">Partner</p>
                <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-1">$29 / mo</p>
              </div>
              {[0, 1, 2].map((i) => (
                <EmptySlot
                  key={i}
                  href="mailto:harshjadhav0901@gmail.com?subject=Sponsorship%20%E2%80%94%20Partner"
                  size="md"
                  className={i > 0 ? "border-l border-zinc-200 dark:border-zinc-800" : ""}
                />
              ))}
            </div>

            {/* Supporter row — 5 small slots */}
            <div className="flex">
              <div className="w-32 shrink-0 border-r border-zinc-200 dark:border-zinc-800 px-4 py-5 flex flex-col justify-center gap-0.5">
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-none">Supporter</p>
                <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-1">$9 / mo</p>
              </div>
              {[0, 1, 2, 3, 4].map((i) => (
                <EmptySlot
                  key={i}
                  href="mailto:harshjadhav0901@gmail.com?subject=Sponsorship%20%E2%80%94%20Supporter"
                  size="sm"
                  className={i > 0 ? "border-l border-zinc-200 dark:border-zinc-800" : ""}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Why sponsor */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[1240px] mx-auto px-4"
        >
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">
            Why sponsor?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {[
              {
                title: "Developers trust what they use",
                body: "Componentry's audience copies and ships UI code — they're already evaluating tools, APIs, and services. A sponsor logo here reads as an endorsement.",
              },
              {
                title: "Targeted, zero noise",
                body: "5k monthly visits from frontend engineers and indie hackers. No algorithmic feed. Just people browsing components they're about to paste into a project.",
              },
              {
                title: "You keep this free",
                body: "No VC funding, no paid tier. Sponsorships are what let me spend time building instead of billing. Your dollars go directly to open-source code.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-zinc-200/60 dark:border-zinc-800/80 bg-white dark:bg-[#1a1a1a] shadow-sm p-2"
              >
                <div className="rounded-xl bg-zinc-50 dark:bg-[#111] border border-dashed border-zinc-200/50 dark:border-zinc-800/80 p-5 h-full flex flex-col gap-2">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{item.title}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </main>

      <Footer />
    </div>
  )
}
