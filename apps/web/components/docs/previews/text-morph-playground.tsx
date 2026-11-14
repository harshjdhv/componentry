"use client";

import { useMemo } from "react";
import { useDialKitController } from "dialkit";
import { TextMorph } from "@workspace/ui/components/text-morph";
import {
  DocsPlayground,
  gradientSwatch,
  useLiveCode,
} from "@/components/docs-playground";

const PRESETS = [
  {
    name: "Studio",
    words: ["IMAGINE", "REFINE", "RELEASE"],
    colors: ["#e4e4e7", "#71717a", "#18181b"],
  },
  {
    name: "Metrics",
    words: ["1.2K", "8.4K", "25K"],
    colors: ["#dbeafe", "#60a5fa", "#1e3a8a"],
  },
  {
    name: "Pricing",
    words: ["$29", "$49", "$99"],
    colors: ["#dcfce7", "#4ade80", "#14532d"],
  },
] as const;

const SWATCHES = PRESETS.map(({ name, colors }) => ({
  name,
  swatch: gradientSwatch(colors),
}));

type Slider = [number, number, number, number];
const controls = {
  words: {
    type: "text" as const,
    default: PRESETS[0].words.join(", "),
    placeholder: "IMAGINE, REFINE, RELEASE",
  },
  interval: [2400, 800, 5000, 100] as Slider,
  morphDuration: [680, 280, 1200, 20] as Slider,
};

/** Up to six values separated by commas (or line breaks). */
function parseWords(text: string) {
  const words = text
    .split(/[,\n]/)
    .map((word) => word.trim())
    .filter(Boolean)
    .slice(0, 6);
  return words.length > 0 ? words : [""];
}

function generateCode(config: {
  words: string[];
  interval: number;
  morphDuration: number;
}) {
  return `import { TextMorph } from "@/components/ui/text-morph"

<TextMorph
  words={${JSON.stringify(config.words)}}
  interval={${config.interval}}
  morphDuration={${config.morphDuration}}
  className="text-4xl font-bold tracking-tight md:text-5xl"
/>`;
}

export function TextMorphPlayground() {
  const dial = useDialKitController("Text Morph", controls, {
    id: "text-morph",
  });
  const text = dial.values.words;
  const words = useMemo(() => parseWords(text), [text]);
  const { interval, morphDuration } = dial.values;

  const preset =
    PRESETS.find((p) => p.words.join("|") === words.join("|"))?.name ?? null;

  useLiveCode(generateCode({ words, interval, morphDuration }));

  return (
    <DocsPlayground
      presets={SWATCHES}
      preset={preset}
      presetsLabel="Values"
      minWidth={280}
      onPresetChange={(name) => {
        const next = PRESETS.find((p) => p.name === name);
        if (next) dial.setValues({ words: next.words.join(", ") });
      }}
      className="flex min-h-[440px] items-center justify-center overflow-hidden px-8 py-16"
    >
      <div className="text-center text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        <TextMorph
          words={words}
          interval={interval}
          morphDuration={morphDuration}
        />
      </div>
    </DocsPlayground>
  );
}
