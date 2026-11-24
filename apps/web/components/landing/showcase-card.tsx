"use client";

import Link from "next/link";
import type React from "react";
import { motion } from "framer-motion";

import { cn } from "@workspace/ui/lib/utils";

/**
 * The frame every showcase card shares: white card, 10px preview well, caption
 * row with a link into the component's docs page.
 *
 * The link is stretched across the whole card with a pseudo-element so the card
 * is one large click target without nesting buttons inside an anchor. Cards whose
 * preview is itself interactive pass `interactive` — the preview is lifted above
 * that overlay and the caption keeps a normal, small link.
 */

export const showcaseCardClass =
  "relative flex flex-col rounded-2xl bg-white p-1.5 shadow-[0_0_0_1px_rgba(0,0,0,0.055),0_10px_30px_-18px_rgba(0,0,0,0.35)] transition-[box-shadow,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.075),0_18px_48px_-22px_rgba(0,0,0,0.45)] dark:bg-[#161616] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.07)] dark:hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)] transform-gpu will-change-transform";

export const showcasePreviewClass =
  "relative flex-1 w-full overflow-hidden rounded-[10px] bg-zinc-50 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.045)] dark:bg-background dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.055)]";

export const showcaseLabelClass =
  "flex shrink-0 items-center justify-between gap-2 px-2.5 pb-1 pt-2 text-[13px] font-medium leading-5 text-zinc-700 dark:text-zinc-400";

export const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] as const },
  },
};

interface ShowcaseCardProps {
  /** Docs path this card links to. */
  href: string;
  /** Caption, in the features-section caption voice. */
  title: React.ReactNode;
  /** Optional secondary hint shown on the right of the caption. */
  hint?: string;
  className?: string;
  previewClassName?: string;
  /** Preview handles its own pointer events (dock, magnet lines, eye tracking). */
  interactive?: boolean;
  children: React.ReactNode;
}

export function ShowcaseCard({
  href,
  title,
  hint,
  className,
  previewClassName,
  interactive = false,
  children,
}: ShowcaseCardProps) {
  return (
    <motion.div variants={cardVariants} className={cn(showcaseCardClass, className)}>
      <div
        className={cn(
          showcasePreviewClass,
          interactive && "z-10",
          previewClassName
        )}
      >
        {children}
      </div>

      <div className={showcaseLabelClass}>
        <Link
          href={href}
          className={cn(
            "inline-flex items-center gap-1 rounded-[4px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-500",
            interactive
              ? "relative"
              : "after:absolute after:inset-0 after:content-['']"
          )}
        >
          {title}
        </Link>

        {hint ? (
          <span className="hidden shrink-0 font-mono text-xs tracking-wider text-zinc-400 opacity-60 sm:inline">
            {hint}
          </span>
        ) : null}
      </div>
    </motion.div>
  );
}
