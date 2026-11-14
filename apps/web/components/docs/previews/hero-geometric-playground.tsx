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
  title1: "Elevate",
  title2: "Your Brand",
  description:
    "Scale your product with clarity, precision, and motion-led design.",
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
      title1: "Shape",
      title2: "Authority",
      description:
        "High-contrast geometry with restrained motion and premium editorial rhythm.",
      color1: "#0f172a",
      color2: "#e2e8f0",
      speed: 0.8,
    },
  },
  {
    name: "Warm",
    config: {
      title1: "Human",
      title2: "Energy",
      description:
        "A warm palette with crisp typography for product launches and storytelling pages.",
      color1: "#ea580c",
      color2: "#fff7ed",
      speed: 1,
    },
  },
  {
    name: "Ice",
    config: {
      title1: "Glacial",
      title2: "Precision",
      description:
        "Cool chroma gradients and subtle turbulence built for enterprise-first visual systems.",
      color1: "#0c4a6e",
      color2: "#ecfeff",
      speed: 1.25,
    },
  },
  {
    name: "Kinetic",
    config: {
      title1: "Motion",
      title2: "Driven",
      description:
        "Turn up energy with faster shader flow while preserving legibility and hierarchy.",
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
  title1: {
    type: "text" as const,
    default: defaults.title1,
    placeholder: "Primary headline",
  },
  title2: {
    type: "text" as const,
    default: defaults.title2,
    placeholder: "Secondary headline",
  },
  description: {
    type: "text" as const,
    default: defaults.description,
    placeholder: "Narrative subheadline",
  },
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
  // Replays the entrance animation when a preset is picked.
  const [renderVersion, setRenderVersion] = useState(0);

  const preset =
    presets.find(
      ({ config: p }) =>
        p.title1 === config.title1 &&
        p.title2 === config.title2 &&
        p.description === config.description &&
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
