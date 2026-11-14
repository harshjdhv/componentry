"use client";

import { useCallback, useMemo } from "react";
import { useDialKitController } from "dialkit";
import { TextMorph } from "@workspace/ui/components/text-morph";
import {
  CUSTOM_PRESET,
  DocsPlayground,
  useLiveCode,
  usePresetSelect,
} from "@/components/docs-playground";

// Word sets, not colors, so they live in the panel as a select.
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
  preset: {
    type: "select" as const,
    options: [...PRESETS.map((p) => p.name), CUSTOM_PRESET],
    default: PRESETS[0].name,
  },
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
  usePresetSelect(
    dial.values.preset,
    matching,
    useCallback(
      (name: string) => {
        const next = PRESETS.find((p) => p.name === name);
        if (next) setValues({ words: next.words.join(", ") });
      },
      [setValues],
    ),
    useCallback((name: string) => setValues({ preset: name }), [setValues]),
  );

  useLiveCode(generateCode({ words, interval, morphDuration }));

  return (
    <DocsPlayground
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
