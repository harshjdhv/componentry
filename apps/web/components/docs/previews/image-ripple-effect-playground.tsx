"use client";

import { useCallback, useState } from "react";
import { useDialKitController } from "dialkit";
import { ImageRippleEffect } from "@workspace/ui/components/image-ripple-effect";
import {
  CUSTOM_PRESET,
  DocsPlayground,
  useLiveCode,
  usePresetSelect,
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

// Effect presets, not colors, so they live in the panel as a select.
const presets: Array<{ name: string; config: Config }> = [
  { name: "Default", config: defaults },
  {
    name: "Gentle",
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
    config: {
      ...defaults,
      waveCount: 180,
      waveSize: 54,
      waveSpawnThreshold: 0.05,
      waveFadeMultiplier: 0.955,
    },
  },
];

type Slider = [number, number, number, number];
const controls = {
  preset: {
    type: "select" as const,
    options: [...presets.map((p) => p.name), CUSTOM_PRESET],
    default: "Default",
  },
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
  const { preset: selected, ...values } = dial.values;
  const config: Config = { ...defaults, ...values };
  // Choosing a preset restarts the scene so its waves start clean.
  const [renderVersion, setRenderVersion] = useState(0);

  const matching =
    presets.find(({ config: p }) =>
      (Object.keys(p) as Array<keyof Config>).every((key) => p[key] === config[key]),
    )?.name ?? null;

  const { setValues } = dial;
  usePresetSelect(
    selected,
    matching,
    useCallback(
      (name: string) => {
        const next = presets.find((p) => p.name === name)?.config;
        if (!next) return;
        setValues(next);
        setRenderVersion((version) => version + 1);
      },
      [setValues],
    ),
    useCallback((name: string) => setValues({ preset: name }), [setValues]),
  );

  useLiveCode(code(config));

  return (
    <DocsPlayground>
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
