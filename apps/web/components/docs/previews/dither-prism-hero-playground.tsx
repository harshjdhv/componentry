"use client";

import { useState } from "react";
import { useDialKitController } from "dialkit";
import DitherPrismHero from "@workspace/ui/components/dither-prism-hero";
import {
  DocsPlayground,
  gradientSwatch,
  useLiveCode,
  jsxProp,
} from "@/components/docs-playground";

const DEFAULTS = {
  color1: "#0f0f23",
  color2: "#6366f1",
  color3: "#ec4899",
  speed: 1,
  ditherIntensity: 0.15,
  prismIntensity: 0.5,
  particleCount: 50,
  showParticles: true,
};
type Config = typeof DEFAULTS;

const PRESET_CONFIGS: Array<{ name: string; config: Config }> = [
  { name: "Default", config: DEFAULTS },
  {
    name: "Cyberpunk",
    config: {
      ...DEFAULTS,
      color1: "#0a0a0a",
      color2: "#00ff88",
      color3: "#00ffff",
      ditherIntensity: 0.25,
      prismIntensity: 0.7,
    },
  },
  {
    name: "Sunset",
    config: {
      ...DEFAULTS,
      color1: "#1a0a0a",
      color2: "#ff6b35",
      color3: "#ffd93d",
      ditherIntensity: 0.12,
      prismIntensity: 0.4,
    },
  },
  {
    name: "Ocean",
    config: {
      ...DEFAULTS,
      color1: "#0a1628",
      color2: "#0ea5e9",
      color3: "#22d3ee",
      speed: 0.7,
      particleCount: 100,
    },
  },
  {
    name: "Maximum",
    config: {
      ...DEFAULTS,
      ditherIntensity: 0.3,
      prismIntensity: 0.9,
      speed: 1.5,
      particleCount: 80,
    },
  },
];

const PRESETS = PRESET_CONFIGS.map(({ name, config }) => ({
  name,
  swatch: gradientSwatch([config.color1, config.color2, config.color3]),
}));

type Slider = [number, number, number, number];
const controls = {
  color1: { type: "color" as const, default: DEFAULTS.color1 },
  color2: { type: "color" as const, default: DEFAULTS.color2 },
  color3: { type: "color" as const, default: DEFAULTS.color3 },
  ditherIntensity: [DEFAULTS.ditherIntensity, 0, 1, 0.01] as Slider,
  prismIntensity: [DEFAULTS.prismIntensity, 0, 2, 0.1] as Slider,
  speed: [DEFAULTS.speed, 0.2, 3, 0.1] as Slider,
  showParticles: DEFAULTS.showParticles,
  particleCount: [DEFAULTS.particleCount, 0, 200, 10] as Slider,
};

function generateCode(config: Config) {
  const props = Object.entries(config)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => {
      if (typeof value === "string") {
        return jsxProp(key, value);
      }
      if (typeof value === "boolean") {
        return value ? `${key}` : `${key}={false}`;
      }
      return `${key}={${value}}`;
    })
    .join("\n    ");

  return `<DitherPrismHero \n    ${props}\n/>`;
}

const sameConfig = (a: Config, b: Config) =>
  (Object.keys(a) as Array<keyof Config>).every((key) => {
    const x = a[key];
    const y = b[key];
    return typeof x === "string" && typeof y === "string"
      ? x.toLowerCase() === y.toLowerCase()
      : x === y;
  });

export function DitherPrismHeroPlayground() {
  const dial = useDialKitController("Dither Prism Hero", controls, {
    id: "dither-prism-hero",
  });
  // Remount after a preset so the shader and particles restart with the new look.
  const [renderVersion, setRenderVersion] = useState(0);
  const values = dial.values;
  // Same key order as the component props, so the generated code reads naturally.
  const config: Config = {
    color1: values.color1,
    color2: values.color2,
    color3: values.color3,
    speed: values.speed,
    ditherIntensity: values.ditherIntensity,
    prismIntensity: values.prismIntensity,
    particleCount: values.particleCount,
    showParticles: values.showParticles,
  };

  const preset =
    PRESET_CONFIGS.find((item) => sameConfig(item.config, config))?.name ?? null;

  useLiveCode(generateCode(config));

  return (
    <DocsPlayground
      presets={PRESETS}
      preset={preset}
      presetsLabel="Preset"
      minWidth={280}
      onPresetChange={(name) => {
        const next = PRESET_CONFIGS.find((item) => item.name === name)?.config;
        if (!next) return;
        dial.setValues(next);
        setRenderVersion((value) => value + 1);
      }}
      className="bg-[#f3f4f6] dark:bg-background"
    >
      <div className="relative h-full w-full overflow-hidden rounded-none">
        <DitherPrismHero
          key={renderVersion}
          {...config}
          className="h-full w-full !min-h-full"
          style={{ minHeight: "100%" }}
        />
      </div>
    </DocsPlayground>
  );
}
