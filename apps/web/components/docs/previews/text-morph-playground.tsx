"use client";

import { useMemo } from "react";
import { useDialKitController } from "dialkit";
import { TextMorph } from "@workspace/ui/components/text-morph";
import {
  DocsPlayground,
  useLiveCode,
} from "@/components/docs-playground";

// Word sets, not colors: shown in the customize panel by name, without swatches.
const PRESETS = [
  {
    name: "Studio",
    words: ["IMAGINE", "REFINE", "RELEASE"],
  },
  {
    name: "Metrics",
    words: ["1.2K", "8.4K", "25K"],
  },
  {
    name: "Pricing",
    words: ["$29", "$49", "$99"],
  },
] as const;

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

  const matching =
    PRESETS.find((p) => p.words.join("|") === words.join("|"))?.name ?? null;

  const { setValues } = dial;
  const applyPreset = (name: string) => {
    const next = PRESETS.find((p) => p.name === name);
    if (next) setValues({ words: next.words.join(", ") });
  };

  useLiveCode(generateCode({ words, interval, morphDuration }));

  return (
    <DocsPlayground
      presets={PRESETS.map(({ name }) => ({ name }))}
      preset={matching}
      onPresetChange={applyPreset}
      presetsLabel="Preset"
      minWidth={280}
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
