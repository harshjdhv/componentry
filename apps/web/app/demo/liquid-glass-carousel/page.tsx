"use client";

import { LiquidGlassCarousel } from "@workspace/ui/components/liquid-glass-carousel";

export default function LiquidGlassCarouselDemoPage() {
  return (
    <div className="h-svh w-full overflow-hidden bg-white">
      <LiquidGlassCarousel className="h-full min-h-0" />
    </div>
  );
}
