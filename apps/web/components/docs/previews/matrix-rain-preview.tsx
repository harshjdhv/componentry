"use client";

import { MatrixRain } from "@workspace/ui/components/matrix-rain";

export function MatrixRainDemo() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center">
      <MatrixRain />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-4xl font-bold text-foreground tracking-wider">
          MATRIX
        </h1>
      </div>
    </div>
  );
}

export function MatrixRainRainbowDemo() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center">
      <MatrixRain variant="rainbow" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-4xl font-bold text-foreground tracking-widest">
          RGB
        </h1>
      </div>
    </div>
  );
}

export function MatrixRainCustomDemo() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center">
      <MatrixRain fixedColor="#ec4899" speed={80} fontSize={20} />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-4xl font-bold text-foreground">CYBERPUNK</h1>
      </div>
    </div>
  );
}
