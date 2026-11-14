"use client";

import { useEffect, useMemo, useRef } from "react";
import { create } from "zustand";
import { useDialKit } from "dialkit";
import {
  WheelCarousel,
  type WheelCarouselMode,
} from "@workspace/ui/components/wheel-carousel";
import {
  DocsPlayground,
  gradientSwatch,
  useLiveCode,
} from "@/components/docs-playground";

type PaletteMode = Exclude<WheelCarouselMode, "system">;

interface CustomPalette {
  background: string;
  panelColor: string;
  textColor: string;
  selectedColor: string;
  markerColor: string;
}

const defaultCustomPalette: CustomPalette = {
  background: "#fff6ec",
  panelColor: "#f2e6d7",
  textColor: "#b45a14",
  selectedColor: "#b4541e",
  markerColor: "#e8792e",
};

/** Shared so the examples below the playground follow the chosen appearance. */
const useWheelCarouselPreview = create<{
  mode: WheelCarouselMode;
  customPalette: CustomPalette;
}>(() => ({
  mode: "system",
  customPalette: defaultCustomPalette,
}));

const modes: Array<{ name: string; value: PaletteMode; colors: string[] }> = [
  { name: "Light", value: "light", colors: ["#ffffff", "#d4d4d4"] },
  { name: "Dark", value: "dark", colors: ["#3f3f46", "#000000"] },
  {
    name: "Custom",
    value: "custom",
    colors: [
      defaultCustomPalette.background,
      defaultCustomPalette.textColor,
      defaultCustomPalette.markerColor,
    ],
  },
];

const PRESETS = modes.map(({ name, colors }) => ({
  name,
  swatch: gradientSwatch(colors),
}));

const controls = {
  background: { type: "color" as const, default: defaultCustomPalette.background },
  panelColor: { type: "color" as const, default: defaultCustomPalette.panelColor },
  textColor: { type: "color" as const, default: defaultCustomPalette.textColor },
  selectedColor: {
    type: "color" as const,
    default: defaultCustomPalette.selectedColor,
  },
  markerColor: { type: "color" as const, default: defaultCustomPalette.markerColor },
};

const paletteKeys = Object.keys(defaultCustomPalette) as Array<keyof CustomPalette>;

function samePalette(a: CustomPalette, b: CustomPalette) {
  return paletteKeys.every((key) => a[key].toLowerCase() === b[key].toLowerCase());
}

function generateCode(mode: WheelCarouselMode, palette: CustomPalette) {
  const props = ["items={projects}"];
  if (mode !== "system") props.push(`mode="${mode}"`);
  if (mode === "custom") {
    for (const key of paletteKeys) props.push(`${key}="${palette[key]}"`);
  }
  const carousel =
    props.length === 1
      ? `<WheelCarousel ${props[0]} />`
      : `<WheelCarousel\n    ${props.join("\n    ")}\n  />`;

  return `import {
  WheelCarousel,
  type WheelCarouselItem,
} from "@/components/ui/wheel-carousel"

const projects: WheelCarouselItem[] = [
  {
    label: "Canyon House",
    image: "/images/projects/canyon-house.jpg",
    imageAlt: "Modern concrete home built into a desert canyon",
  },
  {
    label: "Harbor Loft",
    image: "/images/projects/harbor-loft.jpg",
    imageAlt: "Bright coastal loft with large windows",
  },
  {
    label: "Glass Pavilion",
    image: "/images/projects/glass-pavilion.jpg",
    imageAlt: "Minimal glass pavilion surrounded by trees",
  },
]

<div className="h-[680px] w-full">
  ${carousel}
</div>`;
}

function sharedCarouselProps(
  mode: WheelCarouselMode,
  customPalette: CustomPalette,
) {
  return { mode, ...customPalette };
}

export function WheelCarouselPreview() {
  const mode = useWheelCarouselPreview((state) => state.mode);
  const values = useDialKit("Wheel Carousel", controls, {
    id: "wheel-carousel",
  });
  const { background, panelColor, textColor, selectedColor, markerColor } =
    values;
  const palette = useMemo<CustomPalette>(
    () => ({ background, panelColor, textColor, selectedColor, markerColor }),
    [background, panelColor, textColor, selectedColor, markerColor],
  );

  // Custom colors only apply in custom mode, so editing one switches to it.
  // The first run (mount or preview reset) starts over from the system mode.
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      useWheelCarouselPreview.setState({
        mode: "system",
        customPalette: palette,
      });
      return;
    }
    if (!samePalette(useWheelCarouselPreview.getState().customPalette, palette)) {
      useWheelCarouselPreview.setState({ mode: "custom", customPalette: palette });
    }
  }, [palette]);

  useLiveCode(generateCode(mode, palette));

  return (
    <DocsPlayground
      presets={PRESETS}
      preset={modes.find((m) => m.value === mode)?.name ?? null}
      presetsLabel="Appearance"
      onPresetChange={(name) => {
        const next = modes.find((m) => m.name === name)?.value;
        if (next) useWheelCarouselPreview.setState({ mode: next });
      }}
      className="min-h-[560px] overflow-hidden"
    >
      <WheelCarousel
        {...sharedCarouselProps(mode, palette)}
        className="h-full min-h-0 px-8 sm:px-12"
        contentWidth={760}
        radius={260}
        spacing={13}
        visibleItems={6}
        photoRadius={14}
        edgeFade
        edgeFadeSize={22}
        itemClassName="!text-[clamp(0.95rem,1.9vw,1.4rem)]"
      />
    </DocsPlayground>
  );
}

export function WheelCarouselLandscapePreview() {
  const mode = useWheelCarouselPreview((state) => state.mode);
  const customPalette = useWheelCarouselPreview((state) => state.customPalette);

  return (
    <div className="h-full min-h-[560px] w-full">
      <WheelCarousel
        {...sharedCarouselProps(mode, customPalette)}
        className="h-full min-h-0 px-8 sm:px-12"
        photoSide="right"
        photoAspect="4/3"
        photoWidth={30}
        contentWidth={760}
        gap={24}
        radius={260}
        spacing={13}
        visibleItems={6}
        photoRadius={16}
        edgeFade
        itemClassName="!text-[clamp(0.95rem,1.9vw,1.4rem)]"
      />
    </div>
  );
}
