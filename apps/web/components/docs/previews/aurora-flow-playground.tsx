"use client";

import { useEffect, useRef } from "react";
import { useDialKitController } from "dialkit";
import {
  AuroraFlow,
  AURORA_FLOW_PRESETS,
  type AuroraFlowPreset,
} from "@workspace/ui/components/aurora-flow";
import {
  DocsPlayground,
  gradientSwatch,
  useLiveCode,
} from "@/components/docs-playground";

const PRESET_NAMES = Object.keys(AURORA_FLOW_PRESETS) as AuroraFlowPreset[];

/** The full list lives in the Palette folder; the bar shows a few favorites. */
const FEATURED: AuroraFlowPreset[] = [
  "ocean",
  "aurora",
  "sunset",
  "emerald",
  "mono",
];

const SWATCHES = FEATURED.map((name) => ({
  name,
  swatch: gradientSwatch(AURORA_FLOW_PRESETS[name].slice(1)),
}));

const COLOR_KEYS = ["base", "depth", "flow", "light", "sheen"] as const;

function paletteColors(preset: AuroraFlowPreset) {
  const colors = AURORA_FLOW_PRESETS[preset];
  return Object.fromEntries(
    COLOR_KEYS.map((key, index) => [key, colors[index]!]),
  ) as Record<(typeof COLOR_KEYS)[number], string>;
}

type Slider = [number, number, number, number];
const color = (value: string) => ({ type: "color" as const, default: value });
const ocean = AURORA_FLOW_PRESETS.ocean;

const controls = {
  palette: {
    preset: {
      type: "select" as const,
      options: PRESET_NAMES,
      default: "ocean",
    },
    base: color(ocean[0]),
    depth: color(ocean[1]),
    flow: color(ocean[2]),
    light: color(ocean[3]),
    sheen: color(ocean[4]),
  },
  composition: {
    intensity: [1, 0, 2, 0.05] as Slider,
    opacity: [1, 0, 1, 0.05] as Slider,
    blur: [1, 0.25, 2, 0.05] as Slider,
    contrast: [1.04, 0.6, 1.6, 0.05] as Slider,
    brightness: [1, 0.5, 1.5, 0.05] as Slider,
    layers: [6, 3, 7, 1] as Slider,
    borderRadius: [0, 0, 64, 1] as Slider,
    _collapsed: true,
  },
  flow: {
    speed: [1, 0, 3, 0.05] as Slider,
    animationSpeed: [1, 0, 3, 0.05] as Slider,
    flowScale: [1, 0.35, 2.5, 0.05] as Slider,
    flowStrength: [1, 0, 2, 0.05] as Slider,
    flowDirection: [-18, -180, 180, 1] as Slider,
    _collapsed: true,
  },
  interaction: {
    pointerInteraction: true,
    pointerStrength: [0.7, 0, 1.5, 0.05] as Slider,
    scrollInteraction: false,
    parallaxStrength: [0.5, 0, 1.5, 0.05] as Slider,
    _collapsed: true,
  },
  light: {
    lighting: true,
    lightingIntensity: [0.8, 0, 2, 0.05] as Slider,
    lightingRadius: [1, 0.3, 2, 0.05] as Slider,
    lightingSpeed: [0.8, 0, 2, 0.05] as Slider,
    ambientGlow: true,
    ambientOpacity: [0.7, 0, 1.5, 0.05] as Slider,
    _collapsed: true,
  },
  atmosphere: {
    grain: true,
    grainOpacity: [0.22, 0, 1, 0.02] as Slider,
    noise: true,
    noiseOpacity: [0.16, 0, 1, 0.02] as Slider,
    noiseScale: [1, 0.4, 3, 0.05] as Slider,
    vignette: true,
    vignetteStrength: [0.55, 0, 1.5, 0.05] as Slider,
    _collapsed: true,
  },
};

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
  const dial = useDialKitController("Aurora Flow", controls, {
    id: "aurora-flow",
  });
  const { palette, composition, flow, interaction, light, atmosphere } =
    dial.values;
  const preset = palette.preset as AuroraFlowPreset;
  const colors = COLOR_KEYS.map((key) => palette[key]);

  // Choosing a preset from the select loads its five colors, which stay editable.
  const lastPreset = useRef(preset);
  useEffect(() => {
    if (lastPreset.current === preset) return;
    lastPreset.current = preset;
    dial.setValues({ palette: paletteColors(preset) });
  }, [preset, dial]);

  const config: AuroraFlowConfig = {
    preset,
    colors,
    ...composition,
    ...flow,
    ...interaction,
    ...light,
    ...atmosphere,
  };

  // A swatch stays selected only while the colors still match its preset.
  const selected =
    FEATURED.find(
      (name) =>
        name === preset &&
        AURORA_FLOW_PRESETS[name].every(
          (value, index) => value === colors[index]?.toLowerCase(),
        ),
    ) ?? null;

  useLiveCode(generateCode(config));

  return (
    <DocsPlayground
      presets={SWATCHES}
      preset={selected}
      presetsLabel="Palette"
      onPresetChange={(name) => {
        const next = name as AuroraFlowPreset;
        lastPreset.current = next;
        dial.setValues({ palette: { preset: next, ...paletteColors(next) } });
      }}
    >
      <AuroraFlow
        {...config}
        borderRadius={`${config.borderRadius}px`}
        className="h-full min-h-[560px] w-full"
        style={{ minHeight: "100%" }}
      />
    </DocsPlayground>
  );
}
