"use client";

import { cn } from "@/lib/utils";

interface LiquidGlassCarouselPreviewProps {
  src: string;
  title: string;
  className?: string;
}

export function LiquidGlassCarouselPreview({
  src,
  title,
  className,
}: LiquidGlassCarouselPreviewProps) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      <iframe src={src} className="h-full w-full border-0" title={title} />
    </div>
  );
}
