"use client";

import type { CSSProperties } from "react";
import { useEffect } from "react";
import { create } from "zustand";
import { FlippingWordSwap } from "@workspace/ui/components/flipping-word-swap";
import { cn } from "@/lib/utils";
import { usePlaygroundStore } from "@/hooks/use-playground-store";
import {
  PlaygroundColorPicker,
  PlaygroundInput,
  PlaygroundSectionTitle,
  PlaygroundSlider,
} from "@/components/playground-primitives";

interface FlippingWordSwapConfig {
  word1: string;
  word2: string;
  word1LightColor: string;
  word1DarkColor: string;
  word2LightColor: string;
  word2DarkColor: string;
  fontSize: number;
  fontWeight: 400 | 500 | 600 | 700;
  letterSpacing: number;
  duration: number;
  stagger: number;
}

const DEFAULT_CONFIG: FlippingWordSwapConfig = {
  word1: "Create",
  word2: "Refine",
  word1LightColor: "#18181b",
  word1DarkColor: "#f5f5f5",
  word2LightColor: "#6d28d9",
  word2DarkColor: "#8b5cf6",
  fontSize: 88,
  fontWeight: 600,
  letterSpacing: -0.025,
  duration: 400,
  stagger: 44,
};

interface FlippingWordSwapStore {
  config: FlippingWordSwapConfig;
  updateConfig: (updates: Partial<FlippingWordSwapConfig>) => void;
  resetConfig: () => void;
}

const useFlippingWordSwapPlayground = create<FlippingWordSwapStore>((set) => ({
  config: DEFAULT_CONFIG,
  updateConfig: (updates) =>
    set((state) => ({ config: { ...state.config, ...updates } })),
  resetConfig: () => set({ config: DEFAULT_CONFIG }),
}));

function generateCode(config: FlippingWordSwapConfig) {
  return `import { FlippingWordSwap } from "@/components/ui/flipping-word-swap"

<div className="flex min-h-[400px] items-center justify-center bg-white dark:bg-black">
  <FlippingWordSwap
    word1=${JSON.stringify(config.word1)}
    word2=${JSON.stringify(config.word2)}
    duration={${config.duration}}
    stagger={${config.stagger}}
    className="text-[${config.word1LightColor}] dark:text-[${config.word1DarkColor}]"
    toClassName="text-[${config.word2LightColor}] dark:text-[${config.word2DarkColor}]"
    style={{
      fontSize: ${config.fontSize},
      fontWeight: ${config.fontWeight},
      letterSpacing: "${config.letterSpacing}em",
    }}
  />
</div>`;
}

export function FlippingWordSwapPlayground() {
  const config = useFlippingWordSwapPlayground((state) => state.config);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      usePlaygroundStore.getState().setCode(generateCode(config));
    }, 120);
    return () => window.clearTimeout(timeoutId);
  }, [config]);

  return (
    <div className="flex h-full min-h-[440px] w-full items-center justify-center overflow-hidden bg-white px-8 py-16 transition-colors dark:bg-black">
      <FlippingWordSwap
        word1={config.word1}
        word2={config.word2}
        duration={config.duration}
        stagger={config.stagger}
        className="text-[var(--flip-word-light)] dark:text-[var(--flip-word-dark)]"
        toClassName="text-[var(--flip-word-to-light)] dark:text-[var(--flip-word-to-dark)]"
        style={{
          "--flip-word-light": config.word1LightColor || "#18181b",
          "--flip-word-dark": config.word1DarkColor || "#f5f5f5",
          "--flip-word-to-light": config.word2LightColor || "#6d28d9",
          "--flip-word-to-dark": config.word2DarkColor || "#8b5cf6",
          fontSize: `${config.fontSize}px`,
          fontWeight: config.fontWeight,
          letterSpacing: `${config.letterSpacing}em`,
        } as CSSProperties}
      />
    </div>
  );
}

export function FlippingWordSwapPersonalizePanel() {
  const config = useFlippingWordSwapPlayground((state) => state.config);
  const updateConfig = useFlippingWordSwapPlayground(
    (state) => state.updateConfig,
  );
  const resetConfig = useFlippingWordSwapPlayground(
    (state) => state.resetConfig,
  );

  return (
    <div className="h-full overflow-auto bg-background [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="space-y-7 px-4 pb-10 pt-20">
        <header className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tighter text-foreground">
            Personalize
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground/90">
            Tune the words, theme-aware colors, typography, and timing in the
            preview surface.
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

        <div className="space-y-3">
          <PlaygroundSectionTitle>Words</PlaygroundSectionTitle>
          <label className="block space-y-1.5">
            <span className="text-xs font-semibold text-foreground/90">
              First word
            </span>
            <PlaygroundInput
              value={config.word1}
              maxLength={24}
              onChange={(event) => updateConfig({ word1: event.target.value })}
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs font-semibold text-foreground/90">
              Second word
            </span>
            <PlaygroundInput
              value={config.word2}
              maxLength={24}
              onChange={(event) => updateConfig({ word2: event.target.value })}
            />
          </label>
        </div>

        <div className="space-y-3">
          <PlaygroundSectionTitle>Colors</PlaygroundSectionTitle>
          <PlaygroundColorPicker
            label="First word · light"
            value={config.word1LightColor}
            defaultColor="#18181b"
            onChange={(word1LightColor) => updateConfig({ word1LightColor })}
          />
          <PlaygroundColorPicker
            label="First word · dark"
            value={config.word1DarkColor}
            defaultColor="#f5f5f5"
            onChange={(word1DarkColor) => updateConfig({ word1DarkColor })}
          />
          <PlaygroundColorPicker
            label="Second word · light"
            value={config.word2LightColor}
            defaultColor="#6d28d9"
            onChange={(word2LightColor) => updateConfig({ word2LightColor })}
          />
          <PlaygroundColorPicker
            label="Second word · dark"
            value={config.word2DarkColor}
            defaultColor="#8b5cf6"
            onChange={(word2DarkColor) => updateConfig({ word2DarkColor })}
          />
        </div>

        <div className="space-y-3">
          <PlaygroundSectionTitle>Typography</PlaygroundSectionTitle>
          <PlaygroundSlider
            label="Font size"
            min={44}
            max={128}
            step={2}
            value={config.fontSize}
            unit="px"
            onChange={(fontSize) => updateConfig({ fontSize })}
          />
          <PlaygroundSlider
            label="Letter spacing"
            min={-0.08}
            max={0.08}
            step={0.005}
            value={config.letterSpacing}
            unit="em"
            onChange={(letterSpacing) => updateConfig({ letterSpacing })}
          />

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground/90">
                Font weight
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                {config.fontWeight}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {([400, 500, 600, 700] as const).map((fontWeight) => (
                <button
                  key={fontWeight}
                  type="button"
                  onClick={() => updateConfig({ fontWeight })}
                  className={cn(
                    "rounded-md border px-2 py-2 font-mono text-[10px] transition-colors",
                    config.fontWeight === fontWeight
                      ? "border-foreground/25 text-foreground shadow-sm"
                      : "border-border/70 text-muted-foreground",
                  )}
                >
                  {fontWeight}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <PlaygroundSectionTitle>Motion</PlaygroundSectionTitle>
          <PlaygroundSlider
            label="Flip duration"
            min={220}
            max={800}
            step={20}
            value={config.duration}
            unit="ms"
            onChange={(duration) => updateConfig({ duration })}
          />
          <PlaygroundSlider
            label="Character stagger"
            min={0}
            max={100}
            step={2}
            value={config.stagger}
            unit="ms"
            onChange={(stagger) => updateConfig({ stagger })}
          />
        </div>
      </div>
    </div>
  );
}
