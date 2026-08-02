"use client";

import { AuroraFlow } from "@workspace/ui/components/aurora-flow";

export function AuroraFlowCardPreview() {
  return (
    <AuroraFlow
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
