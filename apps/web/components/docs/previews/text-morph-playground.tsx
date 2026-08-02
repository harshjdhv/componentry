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
  PlaygroundSwitch,
} from "@/components/playground-primitives";

interface TextMorphPlaygroundConfig {
  words: string[];
  interval: number;
  morphDuration: number;
  blur: number;
  threshold: number;
  animateWidth: boolean;
  loop: boolean;
}

const DEFAULT_CONFIG: TextMorphPlaygroundConfig = {
  words: ["IMAGINE", "REFINE", "RELEASE"],
  interval: 2400,
  morphDuration: 680,
  blur: 12,
  threshold: 18,
  animateWidth: true,
  loop: true,
};

const PRESETS = [
  { name: "Studio", words: ["IMAGINE", "REFINE", "RELEASE"] },
  { name: "Product", words: ["ENVISION", "BUILD", "SHIP"] },
  { name: "Signal", words: ["LISTEN", "SHAPE", "LAUNCH"] },
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
  blur={${config.blur}}
  threshold={${config.threshold}}
  animateWidth={${config.animateWidth}}
  loop={${config.loop}}
  subtext="From idea to impact"
  className="text-foreground"
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
    <div className="relative flex h-full min-h-[440px] w-full items-center justify-center overflow-hidden bg-[#090a0a] px-6 text-[#f4f3ed]">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(130,145,138,0.14), transparent 34%), radial-gradient(circle at 50% 120%, rgba(255,255,255,0.06), transparent 38%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.11]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(circle at center, black, transparent 72%)",
        }}
      />

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center">
        <div className="mb-12 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.24em] text-white/35">
          <span className="size-1 rounded-full bg-[#b9d7c4] shadow-[0_0_12px_rgba(185,215,196,0.8)]" />
          Fluid typography study
        </div>

        <TextMorph
          words={config.words}
          interval={config.interval}
          morphDuration={config.morphDuration}
          blur={config.blur}
          threshold={config.threshold}
          animateWidth={config.animateWidth}
          loop={config.loop}
          pauseOnHover
          subtext="From idea to impact"
          fontSize="clamp(4rem, 13vw, 9.5rem)"
          className="text-[#f4f3ed]"
          textClassName="tracking-[-0.075em]"
          subtextClassName="text-white/35"
        />

        <div className="mt-12 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white/25">
          <span>Hover to pause</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono tabular-nums">
            {config.morphDuration}ms morph
          </span>
        </div>
      </div>
    </div>
  );
}

export function TextMorphPersonalizePanel() {
  const config = useTextMorphPlayground((state) => state.config);
  const updateConfig = useTextMorphPlayground((state) => state.updateConfig);
  const resetConfig = useTextMorphPlayground((state) => state.resetConfig);

  return (
    <div className="h-full overflow-auto bg-[#f3f4f6] dark:bg-background [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="space-y-7 px-4 pb-10 pt-20">
        <header className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tighter text-foreground">
            Personalize
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground/90">
            Balance softness and alpha contrast until the transition feels fluid
            without sacrificing the resting type.
          </p>
        </header>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={resetConfig}
            className="rounded-md border border-border/40 bg-white/50 px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground dark:bg-white/[0.03]"
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
                    "rounded-md border px-2 py-2 text-[10px] font-mono uppercase tracking-wide transition-colors",
                    active
                      ? "border-zinc-500/60 bg-white text-foreground shadow-sm dark:bg-zinc-900"
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
          <PlaygroundSectionTitle>Words</PlaygroundSectionTitle>
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

        <div className="space-y-3">
          <PlaygroundSectionTitle>Fluidity</PlaygroundSectionTitle>
          <PlaygroundSlider
            label="Blur field"
            min={4}
            max={22}
            step={1}
            value={config.blur}
            unit="px"
            onChange={(blur) => updateConfig({ blur })}
          />
          <PlaygroundSlider
            label="Alpha threshold"
            min={8}
            max={28}
            step={1}
            value={config.threshold}
            onChange={(threshold) => updateConfig({ threshold })}
          />
        </div>

        <div className="space-y-2.5">
          <PlaygroundSectionTitle>Behaviour</PlaygroundSectionTitle>
          <PlaygroundSwitch
            label="Animate width"
            checked={config.animateWidth}
            onChange={(animateWidth) => updateConfig({ animateWidth })}
          />
          <PlaygroundSwitch
            label="Loop"
            checked={config.loop}
            onChange={(loop) => updateConfig({ loop })}
          />
        </div>
      </div>
    </div>
  );
}

export function TextMorphThemePreview() {
  return (
    <div className="grid h-full min-h-[380px] w-full md:grid-cols-2">
      <div className="flex items-center justify-center overflow-hidden bg-[#f1f0eb] p-8 text-[#171817]">
        <TextMorph
          words={["LIGHT", "QUIET", "CLEAR"]}
          interval={1900}
          morphDuration={620}
          subtext="Daylight"
          fontSize="clamp(3rem, 8vw, 6rem)"
        />
      </div>
      <div className="flex items-center justify-center overflow-hidden bg-[#101110] p-8 text-[#f2f1eb]">
        <TextMorph
          words={["DARK", "FOCUS", "DEPTH"]}
          interval={1900}
          morphDuration={620}
          subtext="After hours"
          fontSize="clamp(3rem, 8vw, 6rem)"
        />
      </div>
    </div>
  );
}

export function TextMorphInlinePreview() {
  return (
    <div className="flex h-full min-h-[360px] w-full items-center justify-center bg-[#f1f0eb] p-8 text-[#171817] dark:bg-[#101110] dark:text-[#f2f1eb]">
      <p className="flex flex-wrap items-baseline justify-center gap-x-[0.24em] text-4xl font-medium tracking-[-0.04em] sm:text-6xl">
        Build for
        <TextMorph
          words={["clarity", "momentum", "people"]}
          interval={1800}
          morphDuration={560}
          fontSize="1em"
          fontWeight={500}
          className="text-emerald-700 dark:text-emerald-300"
          textClassName="tracking-[-0.04em]"
        />
      </p>
    </div>
  );
}
