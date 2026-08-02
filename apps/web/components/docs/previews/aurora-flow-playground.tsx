"use client";

import { useEffect } from "react";
import { create } from "zustand";
import {
  AuroraFlow,
  AURORA_FLOW_PRESETS,
  type AuroraFlowPreset,
} from "@workspace/ui/components/aurora-flow";
import { cn } from "@/lib/utils";
import { usePlaygroundStore } from "@/hooks/use-playground-store";
import {
  PlaygroundColorPicker,
  PlaygroundSectionTitle,
  PlaygroundSlider,
  PlaygroundSwitch,
} from "@/components/playground-primitives";

interface AuroraFlowConfig {
  preset: AuroraFlowPreset;
  colors: string[];
  speed: number;
  intensity: number;
  opacity: number;
  blur: number;
  contrast: number;
  brightness: number;
  grain: boolean;
  grainOpacity: number;
  layers: number;
  flowScale: number;
  flowStrength: number;
  flowDirection: number;
  animationSpeed: number;
  pointerInteraction: boolean;
  pointerStrength: number;
  scrollInteraction: boolean;
  parallaxStrength: number;
  lighting: boolean;
  lightingIntensity: number;
  lightingRadius: number;
  lightingSpeed: number;
  ambientGlow: boolean;
  ambientOpacity: number;
  noise: boolean;
  noiseOpacity: number;
  noiseScale: number;
  vignette: boolean;
  vignetteStrength: number;
  borderRadius: number;
}

const DEFAULT_CONFIG: AuroraFlowConfig = {
  preset: "ocean",
  colors: [...AURORA_FLOW_PRESETS.ocean],
  speed: 1,
  intensity: 1,
  opacity: 1,
  blur: 1,
  contrast: 1.04,
  brightness: 1,
  grain: true,
  grainOpacity: 0.22,
  layers: 6,
  flowScale: 1,
  flowStrength: 1,
  flowDirection: -18,
  animationSpeed: 1,
  pointerInteraction: true,
  pointerStrength: 0.7,
  scrollInteraction: false,
  parallaxStrength: 0.5,
  lighting: true,
  lightingIntensity: 0.8,
  lightingRadius: 1,
  lightingSpeed: 0.8,
  ambientGlow: true,
  ambientOpacity: 0.7,
  noise: true,
  noiseOpacity: 0.16,
  noiseScale: 1,
  vignette: true,
  vignetteStrength: 0.55,
  borderRadius: 0,
};

const PRESET_NAMES = Object.keys(AURORA_FLOW_PRESETS) as AuroraFlowPreset[];

interface AuroraFlowStore {
  config: AuroraFlowConfig;
  update: (updates: Partial<AuroraFlowConfig>) => void;
  reset: () => void;
}

const useAuroraFlowStore = create<AuroraFlowStore>((set) => ({
  config: DEFAULT_CONFIG,
  update: (updates) =>
    set((state) => ({ config: { ...state.config, ...updates } })),
  reset: () => set({ config: DEFAULT_CONFIG }),
}));

function generateCode(config: AuroraFlowConfig) {
  return `import { AuroraFlow } from "@/components/ui/aurora-flow"

<AuroraFlow
  preset="${config.preset}"
  colors={${JSON.stringify(config.colors)}}
  speed={${config.speed}}
  intensity={${config.intensity}}
  opacity={${config.opacity}}
  blur={${config.blur}}
  contrast={${config.contrast}}
  brightness={${config.brightness}}
  grain={${config.grain}}
  grainOpacity={${config.grainOpacity}}
  layers={${config.layers}}
  flowScale={${config.flowScale}}
  flowStrength={${config.flowStrength}}
  flowDirection={${config.flowDirection}}
  animationSpeed={${config.animationSpeed}}
  pointerInteraction={${config.pointerInteraction}}
  pointerStrength={${config.pointerStrength}}
  scrollInteraction={${config.scrollInteraction}}
  parallaxStrength={${config.parallaxStrength}}
  lighting={${config.lighting}}
  lightingIntensity={${config.lightingIntensity}}
  lightingRadius={${config.lightingRadius}}
  lightingSpeed={${config.lightingSpeed}}
  ambientGlow={${config.ambientGlow}}
  ambientOpacity={${config.ambientOpacity}}
  noise={${config.noise}}
  noiseOpacity={${config.noiseOpacity}}
  noiseScale={${config.noiseScale}}
  vignette={${config.vignette}}
  vignetteStrength={${config.vignetteStrength}}
  borderRadius="${config.borderRadius}px"
  className="min-h-[560px]"
/>`;
}

export function AuroraFlowPlayground() {
  const config = useAuroraFlowStore((state) => state.config);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      usePlaygroundStore.getState().setCode(generateCode(config));
    }, 180);
    return () => window.clearTimeout(timeoutId);
  }, [config]);

  return (
    <AuroraFlow
      {...config}
      borderRadius={`${config.borderRadius}px`}
      className="h-full min-h-[560px] w-full"
      style={{ minHeight: "100%" }}
    />
  );
}

export function AuroraFlowPersonalizePanel() {
  const config = useAuroraFlowStore((state) => state.config);
  const update = useAuroraFlowStore((state) => state.update);
  const reset = useAuroraFlowStore((state) => state.reset);

  const selectPreset = (preset: AuroraFlowPreset) => {
    update({ preset, colors: [...AURORA_FLOW_PRESETS[preset]] });
  };
  const updateColor = (index: number, color: string) => {
    const colors = [...config.colors];
    colors[index] = color;
    update({ colors });
  };

  return (
    <div className="h-full overflow-auto bg-background [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="space-y-7 px-4 pb-12 pt-20">
        <header className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tighter text-foreground">
            Personalize
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground/90">
            Shape the palette, flow, diffusion, and atmospheric response.
          </p>
        </header>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={reset}
            className="rounded-md border border-border/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            Reset
          </button>
        </div>

        <section>
          <PlaygroundSectionTitle>Presets</PlaygroundSectionTitle>
          <div className="grid grid-cols-3 gap-1.5">
            {PRESET_NAMES.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => selectPreset(preset)}
                className={cn(
                  "rounded-md border p-1.5 text-left transition-colors",
                  config.preset === preset
                    ? "border-foreground/35"
                    : "border-border/70",
                )}
              >
                <span
                  className="mb-1.5 block h-5 rounded-sm"
                  style={{
                    background: `linear-gradient(120deg, ${AURORA_FLOW_PRESETS[preset].join(", ")})`,
                  }}
                />
                <span className="block truncate font-mono text-[9px] uppercase tracking-wider text-foreground/80">
                  {preset}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <PlaygroundSectionTitle>Custom palette</PlaygroundSectionTitle>
          <div className="space-y-2">
            {config.colors.map((color, index) => (
              <PlaygroundColorPicker
                key={index}
                label={["Base", "Depth", "Flow", "Light", "Sheen"][index]!}
                value={color}
                onChange={(value) => updateColor(index, value)}
              />
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <PlaygroundSectionTitle>Composition</PlaygroundSectionTitle>
          <PlaygroundSlider
            label="Intensity"
            min={0}
            max={2}
            step={0.05}
            value={config.intensity}
            onChange={(intensity) => update({ intensity })}
          />
          <PlaygroundSlider
            label="Opacity"
            min={0}
            max={1}
            step={0.05}
            value={config.opacity}
            onChange={(opacity) => update({ opacity })}
          />
          <PlaygroundSlider
            label="Diffusion"
            min={0.25}
            max={2}
            step={0.05}
            value={config.blur}
            onChange={(blur) => update({ blur })}
          />
          <PlaygroundSlider
            label="Contrast"
            min={0.6}
            max={1.6}
            step={0.05}
            value={config.contrast}
            onChange={(contrast) => update({ contrast })}
          />
          <PlaygroundSlider
            label="Brightness"
            min={0.5}
            max={1.5}
            step={0.05}
            value={config.brightness}
            onChange={(brightness) => update({ brightness })}
          />
          <PlaygroundSlider
            label="Layers"
            min={3}
            max={7}
            step={1}
            value={config.layers}
            onChange={(layers) => update({ layers })}
          />
          <PlaygroundSlider
            label="Radius"
            min={0}
            max={64}
            step={1}
            value={config.borderRadius}
            unit="px"
            onChange={(borderRadius) => update({ borderRadius })}
          />
        </section>

        <section className="space-y-3">
          <PlaygroundSectionTitle>Flow</PlaygroundSectionTitle>
          <PlaygroundSlider
            label="Speed"
            min={0}
            max={3}
            step={0.05}
            value={config.speed}
            onChange={(speed) => update({ speed })}
          />
          <PlaygroundSlider
            label="Animation speed"
            min={0}
            max={3}
            step={0.05}
            value={config.animationSpeed}
            onChange={(animationSpeed) => update({ animationSpeed })}
          />
          <PlaygroundSlider
            label="Scale"
            min={0.35}
            max={2.5}
            step={0.05}
            value={config.flowScale}
            onChange={(flowScale) => update({ flowScale })}
          />
          <PlaygroundSlider
            label="Strength"
            min={0}
            max={2}
            step={0.05}
            value={config.flowStrength}
            onChange={(flowStrength) => update({ flowStrength })}
          />
          <PlaygroundSlider
            label="Direction"
            min={-180}
            max={180}
            step={1}
            value={config.flowDirection}
            unit="°"
            onChange={(flowDirection) => update({ flowDirection })}
          />
        </section>

        <section className="space-y-3">
          <PlaygroundSectionTitle>Interaction</PlaygroundSectionTitle>
          <PlaygroundSwitch
            label="Pointer interaction"
            checked={config.pointerInteraction}
            onChange={(pointerInteraction) => update({ pointerInteraction })}
          />
          <PlaygroundSlider
            label="Pointer strength"
            min={0}
            max={1.5}
            step={0.05}
            value={config.pointerStrength}
            onChange={(pointerStrength) => update({ pointerStrength })}
          />
          <PlaygroundSwitch
            label="Scroll interaction"
            checked={config.scrollInteraction}
            onChange={(scrollInteraction) => update({ scrollInteraction })}
          />
          <PlaygroundSlider
            label="Parallax strength"
            min={0}
            max={1.5}
            step={0.05}
            value={config.parallaxStrength}
            onChange={(parallaxStrength) => update({ parallaxStrength })}
          />
        </section>

        <section className="space-y-3">
          <PlaygroundSectionTitle>Lighting</PlaygroundSectionTitle>
          <PlaygroundSwitch
            label="Traveling light"
            checked={config.lighting}
            onChange={(lighting) => update({ lighting })}
          />
          <PlaygroundSlider
            label="Light intensity"
            min={0}
            max={2}
            step={0.05}
            value={config.lightingIntensity}
            onChange={(lightingIntensity) => update({ lightingIntensity })}
          />
          <PlaygroundSlider
            label="Light radius"
            min={0.3}
            max={2}
            step={0.05}
            value={config.lightingRadius}
            onChange={(lightingRadius) => update({ lightingRadius })}
          />
          <PlaygroundSlider
            label="Light speed"
            min={0}
            max={2}
            step={0.05}
            value={config.lightingSpeed}
            onChange={(lightingSpeed) => update({ lightingSpeed })}
          />
          <PlaygroundSwitch
            label="Ambient glow"
            checked={config.ambientGlow}
            onChange={(ambientGlow) => update({ ambientGlow })}
          />
          <PlaygroundSlider
            label="Ambient opacity"
            min={0}
            max={1.5}
            step={0.05}
            value={config.ambientOpacity}
            onChange={(ambientOpacity) => update({ ambientOpacity })}
          />
        </section>

        <section className="space-y-3">
          <PlaygroundSectionTitle>Atmosphere</PlaygroundSectionTitle>
          <PlaygroundSwitch
            label="Film grain"
            checked={config.grain}
            onChange={(grain) => update({ grain })}
          />
          <PlaygroundSlider
            label="Grain opacity"
            min={0}
            max={1}
            step={0.02}
            value={config.grainOpacity}
            onChange={(grainOpacity) => update({ grainOpacity })}
          />
          <PlaygroundSwitch
            label="Atmospheric noise"
            checked={config.noise}
            onChange={(noise) => update({ noise })}
          />
          <PlaygroundSlider
            label="Noise opacity"
            min={0}
            max={1}
            step={0.02}
            value={config.noiseOpacity}
            onChange={(noiseOpacity) => update({ noiseOpacity })}
          />
          <PlaygroundSlider
            label="Noise scale"
            min={0.4}
            max={3}
            step={0.05}
            value={config.noiseScale}
            onChange={(noiseScale) => update({ noiseScale })}
          />
          <PlaygroundSwitch
            label="Vignette"
            checked={config.vignette}
            onChange={(vignette) => update({ vignette })}
          />
          <PlaygroundSlider
            label="Vignette strength"
            min={0}
            max={1.5}
            step={0.05}
            value={config.vignetteStrength}
            onChange={(vignetteStrength) => update({ vignetteStrength })}
          />
        </section>
      </div>
    </div>
  );
}
