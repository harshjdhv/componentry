"use client";

import { useState } from "react";
import { useDialKitController } from "dialkit";
import WebGLLiquid from "@workspace/ui/components/webgl-liquid";
import {
  DocsPlayground,
  gradientSwatch,
  useLiveCode,
  jsxProp,
} from "@/components/docs-playground";

const DEFAULTS = {
  title: "Fluid Motion",
  subtitle: "Premium Presence",
  description:
    "A cinematic liquid field tuned for modern hero sections with polished depth and restrained motion.",
  colorDeep: "#04050b",
  colorMid: "#134d93",
  colorHighlight: "#8cecff",
  speed: 1,
  flowStrength: 1,
  grain: 0.05,
  contrast: 1.1,
  opacity: 0.95,
  reveal: true,
  delayMs: 0,
};
type Config = typeof DEFAULTS;

const PRESET_CONFIGS: Array<{ name: string; config: Config }> = [
  { name: "Default", config: DEFAULTS },
  {
    name: "Midnight",
    config: {
      ...DEFAULTS,
      title: "Midnight Drift",
      subtitle: "Depth by Design",
      colorDeep: "#02040b",
      colorMid: "#11315e",
      colorHighlight: "#67d5ff",
      speed: 0.9,
      flowStrength: 0.9,
      contrast: 1.2,
    },
  },
  {
    name: "Aurora",
    config: {
      ...DEFAULTS,
      title: "Aurora Pulse",
      subtitle: "Luminous Gradient",
      colorDeep: "#070519",
      colorMid: "#3954d9",
      colorHighlight: "#7dffe5",
      flowStrength: 1.3,
      grain: 0.06,
      contrast: 1.15,
    },
  },
  {
    name: "Rose Gold",
    config: {
      ...DEFAULTS,
      title: "Rose Current",
      subtitle: "Luxury Atmosphere",
      colorDeep: "#1a0a12",
      colorMid: "#7f2f5d",
      colorHighlight: "#ffd9b5",
      speed: 0.85,
      flowStrength: 0.75,
      opacity: 0.92,
    },
  },
  {
    name: "Kinetic",
    config: {
      ...DEFAULTS,
      title: "Kinetic Wave",
      subtitle: "Momentum Forward",
      colorDeep: "#040506",
      colorMid: "#146684",
      colorHighlight: "#c6ffff",
      speed: 1.55,
      flowStrength: 1.6,
      grain: 0.08,
      contrast: 1.25,
    },
  },
];

const PRESETS = PRESET_CONFIGS.map(({ name, config }) => ({
  name,
  swatch: gradientSwatch([config.colorDeep, config.colorMid, config.colorHighlight]),
}));

type Slider = [number, number, number, number];
const controls = {
  title: { type: "text" as const, default: DEFAULTS.title, placeholder: "Headline line one" },
  subtitle: { type: "text" as const, default: DEFAULTS.subtitle, placeholder: "Headline line two" },
  description: { type: "text" as const, default: DEFAULTS.description, placeholder: "Support text" },
  colorDeep: { type: "color" as const, default: DEFAULTS.colorDeep },
  colorMid: { type: "color" as const, default: DEFAULTS.colorMid },
  colorHighlight: { type: "color" as const, default: DEFAULTS.colorHighlight },
  speed: [DEFAULTS.speed, 0.2, 2.5, 0.1] as Slider,
  flowStrength: [DEFAULTS.flowStrength, 0.2, 2, 0.1] as Slider,
  grain: [DEFAULTS.grain, 0, 0.16, 0.01] as Slider,
  contrast: [DEFAULTS.contrast, 0.8, 1.8, 0.05] as Slider,
  opacity: [DEFAULTS.opacity, 0.4, 1, 0.01] as Slider,
  delayMs: [DEFAULTS.delayMs, 0, 2400, 100] as Slider,
  reveal: DEFAULTS.reveal,
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

  return `<WebGLLiquid \n    ${props}\n/>`;
}

const sameConfig = (a: Config, b: Config) =>
  (Object.keys(a) as Array<keyof Config>).every((key) => {
    const x = a[key];
    const y = b[key];
    return typeof x === "string" && typeof y === "string"
      ? x.toLowerCase() === y.toLowerCase()
      : x === y;
  });

export function WebGLLiquidPlayground() {
  const dial = useDialKitController("WebGL Liquid", controls, {
    id: "webgl-liquid",
  });
  // Remount after a preset so the reveal and shader replay with the new look.
  const [renderVersion, setRenderVersion] = useState(0);
  const values = dial.values;
  // Same key order as the component props, so the generated code reads naturally.
  const config: Config = {
    title: values.title,
    subtitle: values.subtitle,
    description: values.description,
    colorDeep: values.colorDeep,
    colorMid: values.colorMid,
    colorHighlight: values.colorHighlight,
    speed: values.speed,
    flowStrength: values.flowStrength,
    grain: values.grain,
    contrast: values.contrast,
    opacity: values.opacity,
    reveal: values.reveal,
    delayMs: values.delayMs,
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
        <WebGLLiquid
          key={renderVersion}
          {...config}
          className="h-full w-full !min-h-full"
          style={{ minHeight: "100%" }}
        />
      </div>
    </DocsPlayground>
  );
}
