"use client";

import { TextMorph } from "@workspace/ui/components/text-morph";

export function TextMorphCardPreview() {
  return (
    <div className="flex size-full items-center justify-center overflow-hidden bg-black px-5 text-white">
      <div className="text-[clamp(2.5rem,6vw,4.25rem)] font-semibold leading-none tracking-[-0.075em]">
        <TextMorph
          words={["IMAGINE", "REFINE", "RELEASE"]}
          interval={1200}
          morphDuration={560}
        />
      </div>
    </div>
  );
}
