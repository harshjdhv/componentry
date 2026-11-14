"use client";

import { useState } from "react";
import { useDialKitController } from "dialkit";
import { ImageRippleEffect } from "@workspace/ui/components/image-ripple-effect";
import {
  DocsPlayground,
  gradientSwatch,
  useLiveCode,
} from "@/components/docs-playground";

const IMAGE = {
  src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=1400",
  x: 0,
  y: 0,
  widthScale: 0.34,
  heightScale: 0.42,
};
const BRUSH_TEXTURE_URL = "/brush.png";

const defaults = {
  distortionStrength: 0.075,
  waveCount: 100,
  waveSize: 60,
  waveRotationSpeed: 0.025,
  waveFadeMultiplier: 0.95,
  waveGrowth: 0.155,
  waveSpawnThreshold: 0.1,
};
type Config = typeof defaults;

const presets: Array<{ name: string; colors: string[]; config: Config }> = [
  { name: "Default", colors: ["#a5c8ff", "#4f7fd9"], config: defaults },
  {
    name: "Gentle",
    colors: ["#d9f2e6", "#7fbfa4"],
    config: {
      ...defaults,
      distortionStrength: 0.05,
      waveFadeMultiplier: 0.965,
      waveGrowth: 0.12,
      waveRotationSpeed: 0.016,
    },
  },
  {
    name: "Punchy",
    colors: ["#ffd29a", "#f0643c"],
    config: {
      ...defaults,
      distortionStrength: 0.1,
      waveCount: 140,
      waveSize: 72,
      waveFadeMultiplier: 0.93,
      waveGrowth: 0.18,
      waveRotationSpeed: 0.034,
    },
  },
  {
    name: "Dense",
    colors: ["#d8c8ff", "#6c4fd1"],
    config: {
      ...defaults,
      waveCount: 180,
      waveSize: 54,
      waveSpawnThreshold: 0.05,
      waveFadeMultiplier: 0.955,
    },
  },
];

const PRESETS = presets.map(({ name, colors }) => ({
  name,
  swatch: gradientSwatch(colors),
}));

type Slider = [number, number, number, number];
const controls = {
  distortionStrength: [defaults.distortionStrength, 0.01, 0.2, 0.001] as Slider,
  waveCount: [defaults.waveCount, 20, 220, 1] as Slider,
  waveSize: [defaults.waveSize, 20, 120, 1] as Slider,
  waveRotationSpeed: [defaults.waveRotationSpeed, 0.005, 0.06, 0.001] as Slider,
  waveFadeMultiplier: [defaults.waveFadeMultiplier, 0.85, 0.995, 0.001] as Slider,
  waveGrowth: [defaults.waveGrowth, 0.05, 0.3, 0.001] as Slider,
  waveSpawnThreshold: [defaults.waveSpawnThreshold, 0.01, 1, 0.01] as Slider,
};

function code(config: Config) {
  return `import { ImageRippleEffect } from "@/components/ui/image-ripple-effect"

const images = [
  {
    src: "${IMAGE.src}",
    x: ${IMAGE.x},
    y: ${IMAGE.y},
    widthScale: ${IMAGE.widthScale},
    heightScale: ${IMAGE.heightScale},
  },
]

<ImageRippleEffect
  images={images}
  brushTextureUrl="${BRUSH_TEXTURE_URL}"
  distortionStrength={${config.distortionStrength}}
  waveCount={${config.waveCount}}
  waveSize={${config.waveSize}}
  waveRotationSpeed={${config.waveRotationSpeed}}
  waveFadeMultiplier={${config.waveFadeMultiplier}}
  waveGrowth={${config.waveGrowth}}
  waveSpawnThreshold={${config.waveSpawnThreshold}}
/>`;
}

export function ImageRippleEffectPlayground() {
  const dial = useDialKitController("Image Ripple Effect", controls, {
    id: "image-ripple-effect",
  });
  const config: Config = { ...defaults, ...dial.values };
  // Choosing a preset restarts the scene so its waves start clean.
  const [renderVersion, setRenderVersion] = useState(0);

  const preset =
    presets.find(({ config: p }) =>
      (Object.keys(p) as Array<keyof Config>).every((key) => p[key] === config[key]),
    )?.name ?? null;

  useLiveCode(code(config));

  return (
    <DocsPlayground
      presets={PRESETS}
      preset={preset}
      presetsLabel="Preset"
      onPresetChange={(name) => {
        const next = presets.find((p) => p.name === name)?.config;
        if (next) {
          dial.setValues(next);
          setRenderVersion((version) => version + 1);
        }
      }}
    >
      <ImageRippleEffect
        key={renderVersion}
        className="h-full w-full !min-h-full"
        brushTextureUrl={BRUSH_TEXTURE_URL}
        images={[IMAGE]}
        {...config}
      />
    </DocsPlayground>
  );
}
