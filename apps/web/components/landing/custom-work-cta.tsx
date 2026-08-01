"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { LandingContent } from "@/components/landing/landing-frame";
import posthog from "posthog-js";

const emailAddress = "harshjadhavconnect@gmail.com";

const XIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const contactCardClass =
  "relative flex min-h-[210px] flex-col overflow-hidden rounded-[1.35rem] bg-white/70 p-5 text-left shadow-[0_0_0_1px_rgba(0,0,0,0.06),inset_0_8px_18px_-20px_color-mix(in_oklch,var(--foreground)_45%,transparent),inset_0_-8px_18px_-22px_color-mix(in_oklch,var(--foreground)_40%,transparent)] backdrop-blur-xl dark:bg-white/[0.045] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.085),inset_0_8px_18px_-20px_color-mix(in_oklch,var(--foreground)_45%,transparent),inset_0_-8px_18px_-22px_color-mix(in_oklch,var(--foreground)_40%,transparent)] sm:p-6";

export function CustomWorkCta() {
  return (
    <LandingContent>
      <motion.section
        initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
        className="relative py-16 sm:py-20"
      >
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
            Contact
          </p>
          <h2 className="text-3xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-100 sm:text-4xl">
            Need something custom?
          </h2>
          <p className="mx-auto mt-2.5 max-w-2xl text-sm font-medium leading-6 tracking-tight text-zinc-500 text-pretty dark:text-zinc-500 sm:text-base sm:leading-7">
            Want a tailored block, landing page, or interactive product
            section? Reach out, I reply personally.
          </p>

          <div className="mx-auto mt-5 grid max-w-4xl grid-cols-1 gap-2 text-left md:grid-cols-2">
            <div className={contactCardClass}>
              <div className="flex size-10 items-center justify-center rounded-full bg-zinc-950 text-white shadow-[0_1px_1px_rgba(0,0,0,0.10),0_8px_20px_-12px_rgba(0,0,0,0.45)] dark:bg-white dark:text-zinc-950">
                <Mail className="size-4" />
              </div>

              <div className="mt-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-600">
                  Email
                </p>
                <p className="mt-2 break-words text-lg font-semibold tracking-[-0.02em] text-zinc-900 dark:text-zinc-100 sm:text-xl">
                  {emailAddress}
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-500 text-pretty dark:text-zinc-500">
                  For custom work, partnerships, and anything detailed.
                </p>
              </div>

              <div className="mt-auto flex items-center gap-2 pt-6">
                <a
                  href={`mailto:${emailAddress}?subject=Custom%20design%20work`}
                  onClick={() => posthog.capture("custom_work_contact_started")}
                  className="group inline-flex h-9 items-center justify-center gap-2 rounded-full bg-foreground px-3.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                  Send an email
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <CopyButton
                  code={emailAddress}
                  absolute={false}
                  className="flex size-9 items-center justify-center rounded-full border border-black/[0.07] bg-white/55 p-0 text-zinc-400 transition-colors hover:border-black/10 hover:bg-white hover:text-zinc-950 dark:border-white/[0.085] dark:bg-white/[0.035] dark:text-zinc-500 dark:hover:border-white/12 dark:hover:bg-white/[0.07] dark:hover:text-white/80"
                />
              </div>
            </div>

            <div className={contactCardClass}>
              <div className="flex size-10 items-center justify-center rounded-full bg-zinc-950 text-white shadow-[0_1px_1px_rgba(0,0,0,0.10),0_8px_20px_-12px_rgba(0,0,0,0.45)] dark:bg-white dark:text-zinc-950">
                <XIcon />
              </div>

              <div className="mt-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-600">
                  X / Twitter
                </p>
                <p className="mt-2 text-lg font-semibold tracking-[-0.02em] text-zinc-900 dark:text-zinc-100 sm:text-xl">
                  @harshjdhv
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-500 text-pretty dark:text-zinc-500">
                  DMs are best for quick questions and early ideas.
                </p>
              </div>

              <div className="mt-auto flex items-center gap-2 pt-6">
                <a
                  href="https://x.com/harshjdhv"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex h-9 items-center justify-center gap-2 rounded-full bg-foreground px-3.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                  Open profile
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </LandingContent>
  );
}
