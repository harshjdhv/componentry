"use client";

import { useState } from "react";
import { useDialKitController } from "dialkit";
import { Signature } from "@workspace/ui/components/signature";
import {
  DocsPlayground,
  gradientSwatch,
  useLiveCode,
} from "@/components/docs-playground";

/** An empty color draws in currentColor, so it follows the theme. */
const defaults = {
  text: "Componentry",
  color: "",
  fontSize: 48,
  duration: 1.5,
};
type Config = typeof defaults;

const presets: Array<{ name: string; swatch: string; config: Config }> = [
  { name: "Default", swatch: "currentColor", config: defaults },
  {
    name: "John Doe",
    swatch: gradientSwatch(["#3b82f6"]),
    config: { ...defaults, text: "John Doe", color: "#3b82f6", duration: 2 },
  },
  {
    name: "Autograph",
    swatch: gradientSwatch(["#ec4899"]),
    config: {
      ...defaults,
      text: "Jane Smith",
      color: "#ec4899",
      duration: 1.2,
      fontSize: 56,
    },
  },
];

const PRESETS = presets.map(({ name, swatch }) => ({ name, swatch }));

type Slider = [number, number, number, number];
const controls = {
  text: { type: "text" as const, default: defaults.text, placeholder: "Text to trace" },
  color: { type: "color" as const, default: defaults.color },
  fontSize: [defaults.fontSize, 16, 120, 1] as Slider,
  duration: [defaults.duration, 0.5, 10, 0.1] as Slider,
  replay: { type: "action" as const, label: "Replay" },
};

function code(config: Config) {
  const props = Object.entries(config)
    .filter(([key, value]) => !(key === "color" && value === ""))
    .map(([key, value]) =>
      typeof value === "string" ? `${key}="${value}"` : `${key}={${value}}`,
    )
    .join("\n  ");

  return `import { Signature } from "@/components/ui/signature"\n\n<Signature\n  ${props}\n/>`;
}

export function SignaturePlayground() {
  // Bumped to remount the signature so its one-shot trace plays again.
  const [renderVersion, setRenderVersion] = useState(0);
  const replay = () => setRenderVersion((version) => version + 1);

  const dial = useDialKitController("Signature", controls, {
    id: "signature",
    onAction: (action) => {
      if (action === "replay") replay();
    },
  });
  const { text, color, fontSize, duration } = { ...defaults, ...dial.values };
  const config: Config = { text, color, fontSize, duration };

  const preset =
    presets.find(
      ({ config: p }) =>
        p.text === config.text &&
        p.color.toLowerCase() === config.color.toLowerCase() &&
        p.fontSize === config.fontSize &&
        p.duration === config.duration,
    )?.name ?? null;

  useLiveCode(code(config));

  return (
    <DocsPlayground
      presets={PRESETS}
      preset={preset}
      presetsLabel="Preset"
      minWidth={280}
      onPresetChange={(name) => {
        const next = presets.find((p) => p.name === name)?.config;
        if (next) {
          dial.setValues(next);
          replay();
        }
      }}
      className="flex items-center justify-center p-8"
    >
      <Signature
        key={renderVersion}
        text={config.text}
        color={config.color || undefined}
        fontSize={config.fontSize}
        duration={config.duration}
      />
    </DocsPlayground>
  );
}
