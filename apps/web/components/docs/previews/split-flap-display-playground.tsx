"use client";

import { useDialKitController } from "dialkit";
import { SplitFlapDisplay } from "@workspace/ui/components/split-flap-display";
import {
  DocsPlayground,
  gradientSwatch,
  useLiveCode,
} from "@/components/docs-playground";

type Size = "sm" | "md" | "lg";
const SIZES: Size[] = ["sm", "md", "lg"];

const DEFAULTS = {
  text: "COMPONENTRY",
  columns: 11,
  size: "md" as Size,
  accentColor: "#22c55e",
  showIndicators: true,
  staggerDelay: 30,
  flipSpeed: 35,
};
type Config = typeof DEFAULTS;

const PRESET_CONFIGS: Array<{ name: string; config: Config }> = [
  { name: "Default", config: DEFAULTS },
  {
    name: "Airport",
    config: {
      ...DEFAULTS,
      text: "FLIGHT 404",
      columns: 12,
      size: "lg",
      accentColor: "#22c55e",
      showIndicators: true,
      staggerDelay: 25,
      flipSpeed: 30,
    },
  },
  {
    name: "Compact",
    config: {
      ...DEFAULTS,
      text: "GATE B42",
      columns: 10,
      size: "sm",
      accentColor: "#3b82f6",
      showIndicators: true,
      staggerDelay: 20,
      flipSpeed: 25,
    },
  },
  {
    name: "Gold",
    config: {
      ...DEFAULTS,
      text: "PREMIUM",
      columns: 10,
      size: "lg",
      accentColor: "#eab308",
      showIndicators: true,
      staggerDelay: 40,
      flipSpeed: 40,
    },
  },
  {
    name: "Minimal",
    config: {
      ...DEFAULTS,
      text: "HELLO WORLD",
      columns: 14,
      size: "md",
      accentColor: "#22c55e",
      showIndicators: false,
      staggerDelay: 30,
      flipSpeed: 35,
    },
  },
];

const PRESETS = PRESET_CONFIGS.map(({ name, config }) => ({
  name,
  swatch: gradientSwatch(["#111", config.accentColor]),
}));

type Slider = [number, number, number, number];
const controls = {
  text: { type: "text" as const, default: DEFAULTS.text, placeholder: "Display text" },
  columns: [DEFAULTS.columns, 4, 20, 1] as Slider,
  size: { type: "select" as const, options: SIZES, default: DEFAULTS.size },
  showIndicators: DEFAULTS.showIndicators,
  accentColor: { type: "color" as const, default: DEFAULTS.accentColor },
  staggerDelay: [DEFAULTS.staggerDelay, 5, 80, 5] as Slider,
  flipSpeed: [DEFAULTS.flipSpeed, 15, 80, 5] as Slider,
};

function generateCode(config: Config) {
  const lines: string[] = [];
  lines.push(`import { SplitFlapDisplay } from "@/components/ui/split-flap-display"`);
  lines.push(``);
  lines.push(`<SplitFlapDisplay`);
  lines.push(`  text="${config.text}"`);
  lines.push(`  columns={${config.columns}}`);
  lines.push(`  size="${config.size}"`);
  if (config.accentColor !== "#22c55e") lines.push(`  accentColor="${config.accentColor}"`);
  if (!config.showIndicators) lines.push(`  showIndicators={false}`);
  if (config.staggerDelay !== 30) lines.push(`  staggerDelay={${config.staggerDelay}}`);
  if (config.flipSpeed !== 35) lines.push(`  flipSpeed={${config.flipSpeed}}`);
  lines.push(`/>`);
  return lines.join("\n");
}

const sameConfig = (a: Config, b: Config) =>
  (Object.keys(a) as Array<keyof Config>).every((key) => {
    const x = a[key];
    const y = b[key];
    return typeof x === "string" && typeof y === "string"
      ? x.toLowerCase() === y.toLowerCase()
      : x === y;
  });

export function SplitFlapDisplayPlayground() {
  const dial = useDialKitController("Split Flap Display", controls, {
    id: "split-flap-display",
  });
  const values = dial.values;
  const config: Config = {
    // The board only has uppercase flaps.
    text: values.text.toUpperCase(),
    columns: values.columns,
    size: (SIZES as string[]).includes(values.size) ? (values.size as Size) : DEFAULTS.size,
    accentColor: values.accentColor.toLowerCase(),
    showIndicators: values.showIndicators,
    staggerDelay: values.staggerDelay,
    flipSpeed: values.flipSpeed,
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
        if (next) dial.setValues(next);
      }}
      className="flex items-center justify-center bg-black p-10"
    >
      {/* Remount on every change so the board replays its flip-in, as before. */}
      <SplitFlapDisplay key={JSON.stringify(config)} {...config} />
    </DocsPlayground>
  );
}
