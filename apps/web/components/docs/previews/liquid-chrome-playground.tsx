"use client";

import { useState } from "react";
import { useDialKitController } from "dialkit";
import { LiquidChrome } from "@workspace/ui/components/liquid-chrome";
import {
  DocsPlayground,
  gradientSwatch,
  useLiveCode,
} from "@/components/docs-playground";

interface LiquidChromeConfig {
  baseColor: string;
  speed: number;
  amplitude: number;
}

const DEFAULTS: LiquidChromeConfig = {
  baseColor: "#1a1a1a",
  speed: 1.0,
  amplitude: 0.6,
};

const PRESETS: Array<{ name: string; config: LiquidChromeConfig }> = [
  { name: "Default", config: DEFAULTS },
  { name: "Purple", config: { baseColor: "#4c1d95", speed: 1.2, amplitude: 0.8 } },
  { name: "Fast Ripple", config: { baseColor: "#e5e7eb", speed: 3.0, amplitude: 0.5 } },
  { name: "Gold", config: { baseColor: "#ca8a04", speed: 0.8, amplitude: 1.2 } },
];

const SWATCHES = PRESETS.map(({ name, config }) => ({
  name,
  swatch: gradientSwatch([config.baseColor]),
}));

type Slider = [number, number, number, number];
const controls = {
  baseColor: { type: "color" as const, default: DEFAULTS.baseColor },
  speed: [DEFAULTS.speed, 0.1, 5, 0.1] as Slider,
  amplitude: [DEFAULTS.amplitude, 0.1, 3, 0.1] as Slider,
};

function hexToRgbArray(hex: string): [number, number, number] {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex[0]! + hex[0]! + hex[1]! + hex[1]! + hex[2]! + hex[2]!;
  }
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r / 255, g / 255, b / 255];
}

function generateCode(config: LiquidChromeConfig) {
  const rgb = hexToRgbArray(config.baseColor);
  const rgbString = `[${rgb[0].toFixed(2)}, ${rgb[1].toFixed(2)}, ${rgb[2].toFixed(2)}]`;

  return `<LiquidChrome
  baseColor={${rgbString}}
  speed={${config.speed}}
  amplitude={${config.amplitude}}
  interactive={true}
/>`;
}

export function LiquidChromePlayground() {
  const dial = useDialKitController("Liquid Chrome", controls, {
    id: "liquid-chrome",
  });
  const config: LiquidChromeConfig = { ...DEFAULTS, ...dial.values };
  // Picking a preset restarts the shader clock, as the old panel did.
  const [renderVersion, setRenderVersion] = useState(0);

  const preset =
    PRESETS.find(
      (p) =>
        p.config.baseColor === config.baseColor.toLowerCase() &&
        p.config.speed === config.speed &&
        p.config.amplitude === config.amplitude,
    )?.name ?? null;

  useLiveCode(generateCode(config));

  return (
    <DocsPlayground
      presets={SWATCHES}
      preset={preset}
      presetsLabel="Presets"
      onPresetChange={(name) => {
        const next = PRESETS.find((p) => p.name === name);
        if (!next) return;
        dial.setValues({ ...next.config });
        setRenderVersion((version) => version + 1);
      }}
      className="overflow-hidden bg-[#f3f4f6] dark:bg-background"
    >
      <LiquidChrome
        key={renderVersion}
        baseColor={hexToRgbArray(config.baseColor)}
        speed={config.speed}
        amplitude={config.amplitude}
        interactive={true}
        className="absolute inset-0 h-full w-full"
      />
    </DocsPlayground>
  );
}
