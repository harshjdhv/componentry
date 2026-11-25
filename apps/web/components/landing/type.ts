/**
 * Type scale for marketing surfaces.
 *
 * Derived from the features section, which was measured against paneloui.com:
 * 42px / 46px, weight 500, -0.033em at the display size, easing to -0.025em at
 * 28px. Inter needs that loosening as it gets smaller, so the values are paired
 * with their size rather than being one global tracking number.
 */

/** Large section heading: 32/36 on mobile, 42/46 above. */
export const headingDisplay =
  "text-balance text-[32px] font-medium leading-[36px] tracking-[-0.028em] text-zinc-950 dark:text-zinc-50 sm:text-[42px] sm:leading-[46px] sm:tracking-[-0.033em]";

/** Secondary heading, matching the /docs page title: 28/34. */
export const headingSection =
  "text-balance text-[24px] font-medium leading-[30px] tracking-[-0.022em] text-zinc-950 dark:text-zinc-50 sm:text-[28px] sm:leading-[34px] sm:tracking-[-0.025em]";

/** Muted continuation of a two-tone heading. */
export const headingMuted = "text-neutral-500 dark:text-neutral-400";

/** Body copy used under headings and in card captions. */
export const bodyMuted =
  "text-pretty text-[15px] leading-[22px] text-neutral-500 dark:text-neutral-400";

/** Eyebrow label. */
export const eyebrow =
  "font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400";

/** The card recipe: white surface, hairline ring, 16px radius, 6px well padding. */
export const cardSurface =
  "rounded-[16px] bg-white p-1.5 shadow-[0_0_0_1px_rgb(10_10_10/0.055)] dark:bg-[#161616] dark:shadow-[0_0_0_1px_rgb(255_255_255/0.07)]";

/** The preview well inside a card. */
export const cardWell =
  "relative overflow-hidden rounded-[10px] bg-[#fafafa] shadow-[inset_0_0_0_1px_rgb(10_10_10/0.045)] dark:bg-background dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.055)]";
