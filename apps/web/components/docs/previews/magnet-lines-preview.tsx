"use client";

import { MagnetLines } from "@workspace/ui/components/magnet-lines";

export function MagnetLinesDemo() {
  return (
    <div className="flex min-h-[500px] w-full items-center justify-center bg-background">
      <MagnetLines
        rows={9}
        columns={9}
        containerSize="60vmin"
        lineColor="currentColor"
        lineWidth="0.8vmin"
        lineHeight="5vmin"
        baseAngle={0}
        className="text-foreground"
      />
    </div>
  );
}
