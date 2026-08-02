"use client";

import { TextMorph } from "@workspace/ui/components/text-morph";

export function TextMorphCardPreview() {
  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_44%,rgba(255,255,255,0.96),rgba(244,244,245,0.72)_48%,rgba(228,228,231,0.34)_100%)] px-5 text-zinc-950 dark:bg-[radial-gradient(circle_at_50%_44%,rgba(39,39,42,0.92),rgba(24,24,27,0.94)_52%,rgba(9,9,11,1)_100%)] dark:text-zinc-50">
      <div className="pointer-events-none absolute inset-x-7 top-7 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-400/70 dark:text-zinc-500/80">
        <span>Text / Morph</span>
        <span>Live</span>
      </div>

      <TextMorph
        words={["IMAGINE", "REFINE", "RELEASE"]}
        interval={1200}
        morphDuration={560}
        blur={10}
        threshold={18}
        fontSize="clamp(2.5rem, 6vw, 4.25rem)"
        fontWeight={650}
        pauseOnHover={false}
        className="max-w-full"
        textClassName="tracking-[-0.075em]"
      />

      <div className="pointer-events-none absolute inset-x-7 bottom-7 h-px bg-gradient-to-r from-transparent via-zinc-400/35 to-transparent dark:via-zinc-600/40" />
    </div>
  );
}
