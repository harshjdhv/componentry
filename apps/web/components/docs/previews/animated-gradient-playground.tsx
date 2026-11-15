"use client";

import { useState } from "react";
import { AnimatedGradient } from "@workspace/ui/components/animated-gradient";
import { DocsPlayground, gradientSwatch, useLiveCode } from "@/components/docs-playground";

/** Colors mirror the preset ramps defined in the component. */
const PRESETS = [
  { name: "Aurora", colors: ["#0a001a", "#1a0b2e", "#f20089"] },
  { name: "Oceanic", colors: ["#000814", "#001d3d", "#00b4d8"] },
  { name: "Amber", colors: ["#140c00", "#4a2500", "#f57c00"] },
  { name: "Toxic", colors: ["#050d05", "#0a240a", "#39ff14"] },
  { name: "Ghost", colors: ["#0a0a0a", "#1c1c1c", "#a3a3a3"] },
] as const;

export function AnimatedGradientPlayground() {
  const [presetName, setPresetName] = useState<string>("Aurora");
  const active = PRESETS.find((preset) => preset.name === presetName) ?? PRESETS[0];

  useLiveCode(`<AnimatedGradient config={{ preset: "${active.name}" }} />`);

  return (
    <DocsPlayground
      presets={PRESETS.map(({ name, colors }) => ({
        name,
        swatch: gradientSwatch(colors),
      }))}
      preset={active.name}
      presetsLabel="Preset"
      onPresetChange={setPresetName}
      controls={false}
      className="bg-[#f3f4f6] dark:bg-background"
    >
      <div className="relative h-full w-full overflow-hidden rounded-none border-none">
        <AnimatedGradient
          key={active.name}
          config={{ preset: active.name }}
          noise={{ opacity: 0.2, scale: 1 }}
          className="!min-h-full"
          style={{ minHeight: "100%" }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-4 text-center">
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
            Animated
          </h2>
          <h2 className="text-5xl md:text-7xl font-serif italic tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/40 drop-shadow-[0_4px_24px_rgba(0,0,0,0.4)] mt-2 pb-2 pr-4">
            Gradient
          </h2>
        </div>
      </div>
    </DocsPlayground>
  );
}
