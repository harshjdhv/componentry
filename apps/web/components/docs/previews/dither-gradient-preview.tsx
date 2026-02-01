"use client";

import { DitherGradient } from "@workspace/ui/components/dither-gradient";

export function DitherGradientDemo() {
  return (
    <div className="relative h-[300px] w-full overflow-hidden bg-background">
      <DitherGradient />
      <div className="relative z-10 flex h-full items-center justify-center">
        <h3 className="text-2xl font-bold text-white drop-shadow-lg">
          Dither Gradient
        </h3>
      </div>
    </div>
  );
}

export function DitherGradientOceanDemo() {
  return (
    <div className="relative h-[300px] w-full overflow-hidden bg-background">
      <DitherGradient
        colorFrom="#06b6d4"
        colorMid="#10b981"
        colorTo="#84cc16"
      />
      <div className="relative z-10 flex h-full items-center justify-center">
        <h3 className="text-2xl font-bold text-white drop-shadow-lg">
          Ocean to Forest
        </h3>
      </div>
    </div>
  );
}

export function DitherGradientSunsetDemo() {
  return (
    <div className="relative h-[300px] w-full overflow-hidden bg-background">
      <DitherGradient
        colorFrom="#f97316"
        colorMid="#ef4444"
        colorTo="#be185d"
        intensity={0.2}
        speed={4}
        angle={120}
      />
      <div className="relative z-10 flex h-full items-center justify-center">
        <h3 className="text-2xl font-bold text-white drop-shadow-lg">
          Sunset Fire
        </h3>
      </div>
    </div>
  );
}
