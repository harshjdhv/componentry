"use client";

import { useEffect, useState } from "react";
import { Heatmap } from "@paper-design/shaders-react";
import { cn } from "@workspace/ui/lib/utils";

const EMBER = [
  "#1a0b0b",
  "#4a1716",
  "#8f2f2b",
  "#d4615a",
  "#ef8b87",
  "#ffd2c4",
  "#fff6f1",
];

export interface HeatmapLogoProps {
  /** Logo image URL or data URI. Only its silhouette is used, so any solid mark works. */
  image: string;
  /** Heat ramp from coolest to hottest, as hex colors. */
  colors?: string[];
  /** Fill behind the logo. Match it to the surface the effect sits on. */
  background?: string;
  /** Strength of the halo around the logo, 0 to 1. */
  glow?: number;
  className?: string;
}

/** A logo that glows like hot metal, with heat drifting slowly through it. */
export function HeatmapLogo({
  image,
  colors = EMBER,
  background = "#09090a",
  glow = 0.3,
  className,
}: HeatmapLogoProps) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <div aria-hidden="true" className={cn("relative aspect-square w-80", className)}>
      <Heatmap
        image={image}
        colors={colors}
        colorBack={background}
        contour={0.45}
        innerGlow={0.55}
        outerGlow={glow}
        noise={0.15}
        angle={0}
        scale={0.62}
        speed={reduceMotion ? 0 : 0.6}
        className="absolute inset-0"
      />
    </div>
  );
}

function usePrefersReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduceMotion;
}
