"use client";

import { useState } from "react";
import { useDialKitController } from "dialkit";
import HeroGeometric from "@workspace/ui/components/hero-geometric";
import {
  DocsPlayground,
  gradientSwatch,
  useLiveCode,
  jsxProp,
} from "@/components/docs-playground";

const defaults = {
  color1: "#3B82F6",
  color2: "#F0F9FF",
  speed: 1,
};
type Config = typeof defaults;

const presets: Array<{ name: string; config: Config }> = [
  { name: "Default", config: defaults },
  {
    name: "Editorial",
    config: {
      color1: "#0f172a",
      color2: "#e2e8f0",
      speed: 0.8,
    },
  },
  {
    name: "Warm",
    config: {
      color1: "#ea580c",
      color2: "#fff7ed",
      speed: 1,
    },
  },
  {
    name: "Ice",
    config: {
      color1: "#0c4a6e",
      color2: "#ecfeff",
      speed: 1.25,
    },
  },
  {
    name: "Kinetic",
    config: {
      color1: "#1d4ed8",
      color2: "#dbeafe",
      speed: 2,
    },
  },
];

const PRESETS = presets.map(({ name, config }) => ({
  name,
  swatch: gradientSwatch([config.color1, config.color2]),
}));

const controls = {
  color1: { type: "color" as const, default: defaults.color1 },
  color2: { type: "color" as const, default: defaults.color2 },
  speed: [defaults.speed, 0.2, 3, 0.1] as [number, number, number, number],
};

function generateCode(config: Config) {
  const props = Object.entries(config)
    .map(([key, value]) =>
      jsxProp(key, value),
    )
    .join("\n    ");

  return `<HeroGeometric \n    ${props}\n/>`;
}

const sameColor = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();

export function HeroGeometricPlayground() {
  const dial = useDialKitController("Hero Geometric", controls, {
    id: "hero-geometric",
  });
  const config: Config = { ...defaults, ...dial.values };
  // Remounts the shader when a preset is picked.
  const [renderVersion, setRenderVersion] = useState(0);

  const preset =
    presets.find(
      ({ config: p }) =>
        sameColor(p.color1, config.color1) &&
        sameColor(p.color2, config.color2) &&
        p.speed === config.speed,
    )?.name ?? null;

  useLiveCode(generateCode(config));

  return (
    <DocsPlayground
      presets={PRESETS}
      preset={preset}
      presetsLabel="Preset"
      minWidth={280}
      onPresetChange={(name) => {
        const next = presets.find((p) => p.name === name)?.config;
        if (next) {
          dial.setValues({ ...next });
          setRenderVersion((v) => v + 1);
        }
      }}
      className="overflow-hidden bg-[#f3f4f6] dark:bg-background"
    >
      <HeroGeometric
        key={renderVersion}
        {...config}
        className="h-full w-full !min-h-full"
        style={{ minHeight: "100%" }}
      />
    </DocsPlayground>
  );
}
