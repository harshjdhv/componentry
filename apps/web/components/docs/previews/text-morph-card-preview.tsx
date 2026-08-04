"use client";

import { TextMorph } from "@workspace/ui/components/text-morph";

export function TextMorphCardPreview() {
  return (
    <div className="flex size-full items-center justify-center overflow-hidden px-5 text-foreground">
      <div className="text-center text-2xl font-bold tracking-tight">
        <TextMorph
          words={["IMAGINE", "REFINE", "RELEASE"]}
          interval={1200}
          morphDuration={560}
        />
      </div>
    </div>
  );
}
