"use client";

import { useState } from "react";
import { useDialKitController } from "dialkit";
import ClosingPlasma from "@workspace/ui/components/closing-plasma";
import {
  DocsPlayground,
  gradientSwatch,
  useLiveCode,
  jsxProp,
} from "@/components/docs-playground";

const DEFAULTS = {
  speed: 1,
  turbulence: 1,
  mouseInfluence: 1,
  grain: 1,
  sparkle: 1,
  vignette: 1,
  opacity: 1,
  interactive: true,
  darkColorA: "#0d0d14",
  darkColorB: "#1f2540",
  darkColorC: "#4a6191",
  lightColorA: "#f0f2f7",
  lightColorB: "#d7dceb",
  lightColorC: "#bcc5e0",
};
type Config = typeof DEFAULTS;

const PRESET_CONFIGS: Array<{ name: string; config: Config }> = [
  { name: "Default", config: DEFAULTS },
  {
    name: "Nocturne",
    config: {
      ...DEFAULTS,
      speed: 0.85,
      turbulence: 0.9,
      darkColorA: "#07040f",
      darkColorB: "#2a1047",
      darkColorC: "#8d4fd1",
    },
  },
  {
    name: "Pearl",
    config: {
      ...DEFAULTS,
      speed: 0.7,
      sparkle: 0.65,
      grain: 0.8,
      darkColorA: "#071217",
      darkColorB: "#0e3f4b",
      darkColorC: "#63d8d2",
    },
  },
  {
    name: "Kinetic",
    config: {
      ...DEFAULTS,
      speed: 1.5,
      turbulence: 1.35,
      mouseInfluence: 1.4,
      sparkle: 1.2,
      grain: 1.15,
      darkColorA: "#050708",
      darkColorB: "#143929",
      darkColorC: "#72ff88",
    },
  },
  {
    name: "Still",
    config: {
      ...DEFAULTS,
      speed: 0.5,
      turbulence: 0.7,
      mouseInfluence: 0,
      interactive: false,
      sparkle: 0.45,
      grain: 0.75,
      darkColorA: "#111214",
      darkColorB: "#2a2d33",
      darkColorC: "#6b7280",
    },
  },
];

const PRESETS = PRESET_CONFIGS.map(({ name, config }) => ({
  name,
  swatch: gradientSwatch([config.darkColorA, config.darkColorB, config.darkColorC]),
}));

type Slider = [number, number, number, number];
const color = (value: string) => ({ type: "color" as const, default: value });
const controls = {
  speed: [DEFAULTS.speed, 0.2, 2, 0.1] as Slider,
  turbulence: [DEFAULTS.turbulence, 0.2, 2, 0.1] as Slider,
  mouseInfluence: [DEFAULTS.mouseInfluence, 0, 2, 0.1] as Slider,
  sparkle: [DEFAULTS.sparkle, 0, 2, 0.1] as Slider,
  grain: [DEFAULTS.grain, 0, 2, 0.1] as Slider,
  vignette: [DEFAULTS.vignette, 0, 2, 0.1] as Slider,
  opacity: [DEFAULTS.opacity, 0.1, 1, 0.05] as Slider,
  interactive: DEFAULTS.interactive,
  dark: {
    darkColorA: color(DEFAULTS.darkColorA),
    darkColorB: color(DEFAULTS.darkColorB),
    darkColorC: color(DEFAULTS.darkColorC),
  },
  light: {
    _collapsed: true,
    lightColorA: color(DEFAULTS.lightColorA),
    lightColorB: color(DEFAULTS.lightColorB),
    lightColorC: color(DEFAULTS.lightColorC),
  },
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

  return `<div className="w-full h-screen">\n  <ClosingPlasma \n    ${props}\n  />\n</div>`;
}

const sameConfig = (a: Config, b: Config) =>
  (Object.keys(a) as Array<keyof Config>).every((key) => {
    const x = a[key];
    const y = b[key];
    return typeof x === "string" && typeof y === "string"
      ? x.toLowerCase() === y.toLowerCase()
      : x === y;
  });

export function ClosingPlasmaPlayground() {
  const dial = useDialKitController("Closing Plasma", controls, {
    id: "closing-plasma",
  });
  // Remount after a preset so the shader restarts with the new mood.
  const [renderVersion, setRenderVersion] = useState(0);
  const { dark, light, ...rest } = dial.values;
  const config: Config = {
    speed: rest.speed,
    turbulence: rest.turbulence,
    mouseInfluence: rest.mouseInfluence,
    grain: rest.grain,
    sparkle: rest.sparkle,
    vignette: rest.vignette,
    opacity: rest.opacity,
    interactive: rest.interactive,
    darkColorA: dark.darkColorA,
    darkColorB: dark.darkColorB,
    darkColorC: dark.darkColorC,
    lightColorA: light.lightColorA,
    lightColorB: light.lightColorB,
    lightColorC: light.lightColorC,
  };

  const preset =
    PRESET_CONFIGS.find((item) => sameConfig(item.config, config))?.name ?? null;

  useLiveCode(generateCode(config));

  return (
    <DocsPlayground
      presets={PRESETS}
      preset={preset}
      presetsLabel="Preset"
      onPresetChange={(name) => {
        const next = PRESET_CONFIGS.find((item) => item.name === name)?.config;
        if (!next) return;
        const {
          darkColorA,
          darkColorB,
          darkColorC,
          lightColorA,
          lightColorB,
          lightColorC,
          ...motion
        } = next;
        dial.setValues({
          ...motion,
          dark: { darkColorA, darkColorB, darkColorC },
          light: { lightColorA, lightColorB, lightColorC },
        });
        setRenderVersion((value) => value + 1);
      }}
      className="bg-[#f3f4f6] dark:bg-background"
    >
      <div className="relative h-full w-full overflow-hidden rounded-none">
        <ClosingPlasma key={renderVersion} {...config} className="h-full w-full" />
      </div>
    </DocsPlayground>
  );
}
