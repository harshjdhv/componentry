"use client";

import { PixelCanvas } from "@workspace/ui/components/pixel-canvas";

function CursorHint() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <span className="text-2xl font-medium tracking-tight text-white/50">
        Move your cursor
      </span>
    </div>
  );
}

export function PixelCanvasDemo() {
  return (
    <div className="relative min-h-[400px] w-full bg-neutral-950">
      <PixelCanvas
        colors={["#e879f9", "#a78bfa", "#38bdf8", "#22d3ee"]}
        speed={0.02}
      />
      <CursorHint />
    </div>
  );
}

export function PixelCanvasTrailDemo() {
  return (
    <div className="relative min-h-[400px] w-full bg-neutral-950">
      <PixelCanvas
        variant="trail"
        colors={["#f97316", "#fb923c", "#fbbf24", "#facc15"]}
        gap={8}
        speed={0.015}
      />
      <CursorHint />
    </div>
  );
}

export function PixelCanvasGlowDemo() {
  return (
    <div className="relative min-h-[400px] w-full bg-neutral-950">
      <PixelCanvas
        variant="glow"
        colors={["#22c55e", "#10b981", "#14b8a6", "#06b6d4"]}
        gap={10}
        speed={0.01}
      />
      <CursorHint />
    </div>
  );
}

export function PixelCanvasSubtleDemo() {
  return (
    <div className="relative min-h-[400px] w-full bg-neutral-950">
      <PixelCanvas
        colors={["#525252", "#a3a3a3", "#737373"]}
        gap={5}
        speed={0.03}
      />
      <CursorHint />
    </div>
  );
}
