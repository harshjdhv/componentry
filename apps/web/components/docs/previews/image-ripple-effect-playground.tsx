"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useDialKitController } from "dialkit";
import { ImageRippleEffect } from "@workspace/ui/components/image-ripple-effect";
import {
  DocsPlayground,
  useLiveCode,
} from "@/components/docs-playground";

const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=800&h=1000&q=85&auto=format&fit=crop`;

// Turquoise water set: aerial shoreline – Moraine Lake – Lago di Braies.
// The left photo is mirrored so its surf faces the centre card.
const STRIP_SOURCES = [
  `${photo("1505142468610-359e7d316be0")}&flip=h`,
  photo("1493246507139-91e8fad9978e"),
  photo("1501785888041-af3ef285b470"),
];

// Representative layout for the copyable snippet (fractions of the stage width).
const WIDE_IMAGES = [
  { src: `${photo("1505142468610-359e7d316be0")}&flip=h`, x: -0.5, y: 0, widthScale: 0.46, heightScale: 0.575 },
  { src: photo("1493246507139-91e8fad9978e"), x: 0, y: 0, widthScale: 0.46, heightScale: 0.575 },
  { src: photo("1501785888041-af3ef285b470"), x: 0.5, y: 0, widthScale: 0.46, heightScale: 0.575 },
];

// Narrow stages get the hero card alone, large enough for the ripple to read.
const NARROW_IMAGES = [
  { src: photo("1493246507139-91e8fad9978e"), x: 0, y: 0, widthScale: 0.7, heightScale: 0.875 },
];

// The component sizes cards as fractions of the stage *width*, so a fixed
// fraction balloons in fullscreen. Size cards from the stage height instead
// (capped by width) and convert back, so the strip looks the same at any size;
// on narrow stages the side cards simply bleed off the edges.
const CARD_HEIGHT_OF_STAGE = 0.5;
const CARD_HEIGHT_OF_WIDTH_MAX = 0.575;
const CARD_ASPECT = 0.8; // width / height, matches the 800x1000 crops
const CARD_GAP_OF_WIDTH = 0.087;

function stripLayout(width: number, height: number) {
  const cardHeight = Math.min(height * CARD_HEIGHT_OF_STAGE, width * CARD_HEIGHT_OF_WIDTH_MAX);
  const cardWidth = cardHeight * CARD_ASPECT;
  const step = cardWidth * (1 + CARD_GAP_OF_WIDTH);
  return STRIP_SOURCES.map((src, index) => ({
    src,
    x: ((index - 1) * step) / width,
    y: 0,
    widthScale: cardWidth / width,
    heightScale: cardHeight / width,
  }));
}

function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      const width = Math.round(entry.contentRect.width);
      const height = Math.round(entry.contentRect.height);
      setSize((prev) =>
        prev.width === width && prev.height === height ? prev : { width, height },
      );
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return [ref, size] as const;
}

const WIDE_QUERY = "(min-width: 768px)";

function useIsWide() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(WIDE_QUERY);
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia(WIDE_QUERY).matches,
    () => true,
  );
}

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

// Effect presets, not colors: shown in the customize panel by name, without swatches.
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
${WIDE_IMAGES.map(
  (image) =>
    `  { src: "${image.src}", x: ${image.x}, y: ${image.y}, widthScale: ${image.widthScale}, heightScale: ${image.heightScale} },`,
).join("\n")}
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
  const isWide = useIsWide();
  const [stageRef, stage] = useElementSize<HTMLDivElement>();
  const dial = useDialKitController("Image Ripple Effect", controls, {
    id: "image-ripple-effect",
  });
  const config: Config = { ...defaults, ...dial.values };
  // Choosing a preset restarts the scene so its waves start clean.
  const [renderVersion, setRenderVersion] = useState(0);

  // No preset is highlighted once the sliders drift away from all of them.
  const matching =
    presets.find(({ config: p }) =>
      (Object.keys(p) as Array<keyof Config>).every((key) => p[key] === config[key]),
    )?.name ?? null;

  const { setValues } = dial;
  const applyPreset = (name: string) => {
    const next = presets.find((p) => p.name === name)?.config;
    if (!next) return;
    setValues(next);
    setRenderVersion((version) => version + 1);
  };

  useLiveCode(code(config));

  return (
    <DocsPlayground
      presets={presets.map(({ name }) => ({ name }))}
      preset={matching}
      onPresetChange={applyPreset}
      presetsLabel="Preset"
    >
      <div ref={stageRef} className="relative h-full w-full">
        {stage.width > 0 && stage.height > 0 ? (
          <ImageRippleEffect
            key={renderVersion}
            className="h-full w-full !min-h-full"
            brushTextureUrl={BRUSH_TEXTURE_URL}
            images={isWide ? stripLayout(stage.width, stage.height) : NARROW_IMAGES}
            {...config}
          />
        ) : null}
      </div>
    </DocsPlayground>
  );
}
