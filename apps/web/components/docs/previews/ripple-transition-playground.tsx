"use client";

import { useDialKit } from "dialkit";
import { RippleTransition } from "@workspace/ui/components/ripple-transition";
import { DocsPlayground, useLiveCode } from "@/components/docs-playground";

const NATURE_IMAGES = [
  "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=85&w=1800",
  "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&q=85&w=1800",
  "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=85&w=1800",
] as const;

const defaults = {
  autoPlay: true,
  pinch: true,
  autoPlayInterval: 3200,
  duration: 1.4,
  waveSpeed: 1.6,
  sigma: 0.15,
  waveFreq: 5,
  pushAmt: 0.145,
  caStrength: 0.02,
  glow: 0.73,
  noiseWarp: 1,
  borderRadius: 28,
};
type Config = typeof defaults;

type Slider = [number, number, number, number];
const controls = {
  autoPlay: defaults.autoPlay,
  pinch: defaults.pinch,
  autoPlayInterval: [defaults.autoPlayInterval, 1600, 6000, 100] as Slider,
  duration: [defaults.duration, 0.6, 2.6, 0.05] as Slider,
  waveSpeed: [defaults.waveSpeed, 0.7, 3, 0.05] as Slider,
  sigma: [defaults.sigma, 0.04, 0.3, 0.005] as Slider,
  waveFreq: [defaults.waveFreq, 1, 14, 0.25] as Slider,
  pushAmt: [defaults.pushAmt, 0, 0.28, 0.005] as Slider,
  caStrength: [defaults.caStrength, 0, 0.07, 0.001] as Slider,
  glow: [defaults.glow, 0, 1.2, 0.01] as Slider,
  noiseWarp: [defaults.noiseWarp, 0, 2, 0.05] as Slider,
  borderRadius: [defaults.borderRadius, 0, 44, 1] as Slider,
};

function code(config: Config) {
  return `import { RippleTransition } from "@/components/ui/ripple-transition"

const images = [
  "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=85&w=1800",
  "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&q=85&w=1800",
  "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=85&w=1800",
]

<RippleTransition
  images={images}
  autoPlay={${config.autoPlay}}
  autoPlayInterval={${config.autoPlayInterval}}
  waveSpeed={${config.waveSpeed}}
  sigma={${config.sigma}}
  waveFreq={${config.waveFreq}}
  pushAmt={${config.pushAmt}}
  caStrength={${config.caStrength}}
  glow={${config.glow}}
  noiseWarp={${config.noiseWarp}}
  duration={${config.duration}}
  pinch={${config.pinch}}
  borderRadius={${config.borderRadius}}
/>`;
}

export function RippleTransitionPlayground() {
  const values = useDialKit("Ripple Transition", controls, {
    id: "ripple-transition",
  });
  const config: Config = { ...defaults, ...values };

  useLiveCode(code(config));

  return (
    <DocsPlayground className="overflow-hidden bg-[#07110b]">
      <RippleTransition
        className="h-full min-h-full w-full"
        images={NATURE_IMAGES}
        autoPlayOrigin="random"
        background="#07110b"
        {...config}
      />
    </DocsPlayground>
  );
}
