"use client";

import { useDialKitController } from "dialkit";
import { GrainGradient } from "@workspace/ui/components/grain-gradient";
import {
  DocsPlayground,
  gradientSwatch,
  useLiveCode,
} from "@/components/docs-playground";

const defaults = {
  colorLight: "#dce5df",
  colorMid: "#83b9ad",
  colorDark: "#031419",
  angle: 0,
  position: 0,
  curve: 0.48,
  softness: 0.13,
  scale: 1,
  grain: 0.32,
  grainSize: 1,
  seed: 1,
  speed: 1,
};
type Config = typeof defaults;

const palettes = [
  { name: "Sea glass", colors: ["#dce5df", "#83b9ad", "#031419"] },
  { name: "Dusk", colors: ["#e8dce8", "#a594c4", "#191426"] },
  { name: "Sand", colors: ["#f1e4ce", "#c7a780", "#26201d"] },
] as const;

const PRESETS = palettes.map(({ name, colors }) => ({
  name,
  swatch: gradientSwatch(colors),
}));

type Slider = [number, number, number, number];
const controls = {
  colorLight: { type: "color" as const, default: defaults.colorLight },
  colorMid: { type: "color" as const, default: defaults.colorMid },
  colorDark: { type: "color" as const, default: defaults.colorDark },
  angle: [defaults.angle, -180, 180, 1] as Slider,
  position: [defaults.position, -0.7, 0.7, 0.01] as Slider,
  curve: [defaults.curve, -1, 1, 0.01] as Slider,
  softness: [defaults.softness, 0.01, 0.6, 0.01] as Slider,
  scale: [defaults.scale, 0.25, 3, 0.05] as Slider,
  grain: [defaults.grain, 0, 1, 0.01] as Slider,
  grainSize: [defaults.grainSize, 0.5, 4, 0.1] as Slider,
  seed: [defaults.seed, 0, 100, 1] as Slider,
  speed: [defaults.speed, 0, 2, 0.05] as Slider,
};

function code(config: Config) {
  return `import { GrainGradient } from "@/components/ui/grain-gradient"\n\n<GrainGradient\n${Object.entries(
    config,
  )
    .map(
      ([key, value]) =>
        `  ${key}=${typeof value === "string" ? JSON.stringify(value) : `{${value}}`}`,
    )
    .join("\n")}\n  className="h-[560px] rounded-2xl"\n/>`;
}

export function GrainGradientPlayground() {
  const dial = useDialKitController("Grain Gradient", controls, {
    id: "grain-gradient",
  });
  const config: Config = { ...defaults, ...dial.values };

  // A swatch stays selected only while all three colors still match it.
  const preset =
    palettes.find(
      ({ colors }) =>
        colors[0] === config.colorLight.toLowerCase() &&
        colors[1] === config.colorMid.toLowerCase() &&
        colors[2] === config.colorDark.toLowerCase(),
    )?.name ?? null;

  useLiveCode(code(config));

  return (
    <DocsPlayground
      presets={PRESETS}
      preset={preset}
      presetsLabel="Palette"
      onPresetChange={(name) => {
        const colors = palettes.find((p) => p.name === name)?.colors;
        if (colors) {
          dial.setValues({
            colorLight: colors[0],
            colorMid: colors[1],
            colorDark: colors[2],
          });
        }
      }}
    >
      <GrainGradient {...config} className="min-h-[480px] lg:min-h-0" />
    </DocsPlayground>
  );
}
