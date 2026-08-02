"use client";

import { SilkAurora } from "@workspace/ui/components/silk-aurora";

export function SilkAuroraCardPreview() {
  return (
    <SilkAurora
      preset="ocean"
      speed={0.82}
      intensity={1.08}
      brightness={1.08}
      contrast={1.08}
      flowScale={0.78}
      lightingIntensity={1.05}
      ambientOpacity={0.82}
      pointerInteraction={false}
      grainOpacity={0.08}
      borderRadius="inherit"
      className="absolute inset-0 h-full w-full min-h-0"
    />
  );
}
