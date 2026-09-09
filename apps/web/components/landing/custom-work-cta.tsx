"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { LandingContent } from "@/components/landing/landing-frame";
import posthog from "posthog-js";

const emailAddress = "harshjadhavconnect@gmail.com";
const focusClass = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

export function CustomWorkCta() {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopyStatus("idle"), 2000);
  };

  return (
    <LandingContent>
      <section aria-labelledby="custom-work-heading" className="py-16 sm:py-20 lg:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div className="max-w-lg">
            <h2 id="custom-work-heading" className="text-balance text-[2rem] font-medium leading-[1.04] tracking-[-0.06em] text-zinc-950 dark:text-zinc-50 sm:text-[2.75rem]">
              Something in mind?<br />Let’s build it.
            </h2>
            <p className="mt-5 max-w-sm text-pretty text-base leading-7 text-zinc-600 dark:text-zinc-400">
              Custom components, landing pages, and the interactions that make a product feel right.
            </p>
          </div>

          <div className="min-w-0">
            <div className="flex items-end gap-3 border-b border-zinc-200 pb-6 dark:border-white/[0.1]">
              <a
                href={`mailto:${emailAddress}?subject=Custom%20design%20work`}
                onClick={() => posthog.capture("custom_work_contact_started")}
                className={`group min-w-0 flex-1 rounded-sm pb-2 ${focusClass}`}
              >
                <span className="mb-3 block text-sm text-zinc-500 dark:text-zinc-400">Tell me about your project</span>
                <span className="flex items-center gap-3 text-base font-medium tracking-[-0.025em] text-zinc-950 transition-colors group-hover:text-zinc-600 dark:text-zinc-100 dark:group-hover:text-white sm:text-xl">
                  <span className="min-w-0 break-words">{emailAddress}</span>
                  <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
                </span>
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label={copyStatus === "copied" ? "Email address copied" : "Copy email address"}
                title={copyStatus === "copied" ? "Copied" : "Copy email address"}
                className={`relative inline-flex size-10 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-white/[0.06] dark:hover:text-zinc-50 ${focusClass}`}
              >
                {([Copy, Check] as const).map((Icon, index) => {
                  const visible = index === (copyStatus === "copied" ? 1 : 0);
                  return (
                    <motion.span
                      key={index}
                      aria-hidden="true"
                      className="absolute inline-flex"
                      initial={false}
                      animate={{ opacity: visible ? 1 : 0, scale: visible || reducedMotion ? 1 : 0.25, filter: visible || reducedMotion ? "blur(0px)" : "blur(4px)" }}
                      transition={reducedMotion ? { duration: 0 } : { type: "spring", duration: 0.3, bounce: 0 }}
                    >
                      <Icon className="size-4" />
                    </motion.span>
                  );
                })}
              </button>
            </div>

            <a
              href="https://x.com/harshjdhv"
              target="_blank"
              rel="noreferrer"
              className={`group flex min-h-20 items-center justify-between gap-4 rounded-sm py-5 ${focusClass}`}
            >
              <span className="text-sm text-zinc-500 dark:text-zinc-400">Or start a conversation on X</span>
              <span className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-zinc-800 transition-colors group-hover:text-zinc-950 dark:text-zinc-300 dark:group-hover:text-white">
                @harshjdhv <ArrowUpRight aria-hidden="true" className="size-4" />
              </span>
            </a>
            <span role="status" className="sr-only">
              {copyStatus === "copied" ? "Email address copied to clipboard." : copyStatus === "error" ? "Could not copy. Please select the email address or open the email link." : ""}
            </span>
          </div>
        </div>
      </section>
    </LandingContent>
  );
}
