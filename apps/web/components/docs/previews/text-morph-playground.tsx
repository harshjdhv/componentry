"use client";

import { useEffect } from "react";
import { create } from "zustand";
import { TextMorph } from "@workspace/ui/components/text-morph";
import { cn } from "@/lib/utils";
import { usePlaygroundStore } from "@/hooks/use-playground-store";
import {
  PlaygroundInput,
  PlaygroundSectionTitle,
  PlaygroundSlider,
} from "@/components/playground-primitives";

interface TextMorphPlaygroundConfig {
  words: string[];
  interval: number;
  morphDuration: number;
}

const DEFAULT_CONFIG: TextMorphPlaygroundConfig = {
  words: ["IMAGINE", "REFINE", "RELEASE"],
  interval: 2400,
  morphDuration: 680,
};

const PRESETS = [
  { name: "Studio", words: ["IMAGINE", "REFINE", "RELEASE"] },
  { name: "Metrics", words: ["1.2K", "8.4K", "25K"] },
  { name: "Pricing", words: ["$29", "$49", "$99"] },
] as const;

interface TextMorphPlaygroundStore {
  config: TextMorphPlaygroundConfig;
  updateConfig: (updates: Partial<TextMorphPlaygroundConfig>) => void;
  resetConfig: () => void;
}

const useTextMorphPlayground = create<TextMorphPlaygroundStore>((set) => ({
  config: DEFAULT_CONFIG,
  updateConfig: (updates) =>
    set((state) => ({ config: { ...state.config, ...updates } })),
  resetConfig: () => set({ config: DEFAULT_CONFIG }),
}));

function generateCode(config: TextMorphPlaygroundConfig) {
  return `import { TextMorph } from "@/components/ui/text-morph"

<TextMorph
  words={${JSON.stringify(config.words)}}
  interval={${config.interval}}
  morphDuration={${config.morphDuration}}
  className="text-7xl font-semibold tracking-tight"
/>`;
}

export function TextMorphPlayground() {
  const config = useTextMorphPlayground((state) => state.config);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      usePlaygroundStore.getState().setCode(generateCode(config));
    }, 180);
    return () => window.clearTimeout(timeoutId);
  }, [config]);

  return (
    <div className="flex h-full min-h-[440px] w-full items-center justify-center overflow-hidden px-8 py-16">
      <div className="text-center text-[clamp(4rem,13vw,9rem)] font-semibold leading-none tracking-[-0.07em] text-foreground">
        <TextMorph
          words={config.words}
          interval={config.interval}
          morphDuration={config.morphDuration}
        />
      </div>
    </div>
  );
}

export function TextMorphPersonalizePanel() {
  const config = useTextMorphPlayground((state) => state.config);
  const updateConfig = useTextMorphPlayground((state) => state.updateConfig);
  const resetConfig = useTextMorphPlayground((state) => state.resetConfig);

  return (
    <div className="h-full overflow-auto bg-background [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="space-y-7 px-4 pb-10 pt-20">
        <header className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tighter text-foreground">
            Personalize
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground/90">
            Choose the content and timing. Typography comes from the surrounding
            interface.
          </p>
        </header>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={resetConfig}
            className="rounded-md border border-border/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            Reset
          </button>
        </div>

        <div>
          <PlaygroundSectionTitle>Presets</PlaygroundSectionTitle>
          <div className="grid grid-cols-3 gap-1.5">
            {PRESETS.map((preset) => {
              const active = preset.words.join("|") === config.words.join("|");
              return (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => updateConfig({ words: [...preset.words] })}
                  className={cn(
                    "rounded-md border px-2 py-2 font-mono text-[10px] uppercase tracking-wide transition-colors",
                    active
                      ? "border-foreground/25 text-foreground shadow-sm"
                      : "border-border/70 text-muted-foreground",
                  )}
                >
                  {preset.name}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <PlaygroundSectionTitle>Values</PlaygroundSectionTitle>
          <PlaygroundInput
            value={config.words.join(", ")}
            onChange={(event) => {
              const words = event.target.value
                .split(",")
                .map((word) => word.trim())
                .filter(Boolean)
                .slice(0, 6);
              updateConfig({ words: words.length > 0 ? words : [""] });
            }}
            placeholder="IMAGINE, REFINE, RELEASE"
          />
          <p className="mt-2 text-[11px] leading-5 text-muted-foreground">
            Separate up to six values with commas.
          </p>
        </div>

        <div className="space-y-3">
          <PlaygroundSectionTitle>Timing</PlaygroundSectionTitle>
          <PlaygroundSlider
            label="Rest interval"
            min={800}
            max={5000}
            step={100}
            value={config.interval}
            unit="ms"
            onChange={(interval) => updateConfig({ interval })}
          />
          <PlaygroundSlider
            label="Morph duration"
            min={280}
            max={1200}
            step={20}
            value={config.morphDuration}
            unit="ms"
            onChange={(morphDuration) => updateConfig({ morphDuration })}
          />
        </div>
      </div>
    </div>
  );
}
