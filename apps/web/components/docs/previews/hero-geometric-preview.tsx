"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import HeroGeometric from "@workspace/ui/components/hero-geometric";
import { cn } from "@/lib/utils";
import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

interface HeroGeometricPreviewProps {
  title1?: string;
  title2?: string;
  description?: string;
  color1?: string;
  color2?: string;
  speed?: number;
}

function HeroGeometricPreviewWrapper({
  title1 = "Elevate",
  title2 = "Your Brand",
  description,
  color1,
  color2,
  speed,
}: HeroGeometricPreviewProps) {
  const [key, setKey] = useState(0);

  return (
    <div className="relative">
      <div
        className={cn(
          "max-w-full overflow-hidden aspect-video w-full group relative",
          instrumentSerif.variable,
        )}
      >
        <button
          onClick={() => setKey((prev) => prev + 1)}
          className="absolute top-4 right-4 z-50 p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-black hover:scale-110 transition-all cursor-pointer"
          aria-label="Reload animation"
        >
          <RotateCcw className="w-4 h-4 text-black dark:text-white" />
        </button>
        <HeroGeometric
          key={key}
          title1={title1}
          title2={title2}
          description={description}
          color1={color1}
          color2={color2}
          speed={speed}
          className="min-h-full"
        />
      </div>
    </div>
  );
}

export function HeroGeometricDemo() {
  return (
    <HeroGeometricPreviewWrapper
      title1="Elevate"
      title2="Your Brand"
    // description="Scale your SaaS in minutes"
    />
  );
}

export function HeroGeometricWarmDemo() {
  return (
    <HeroGeometricPreviewWrapper
      color1="#EA580C"
      color2="#FFF7ED"
      title1="Warm"
      title2="Palette"
    />
  );
}

export function HeroGeometricSpeedDemo() {
  return (
    <HeroGeometricPreviewWrapper speed={2} title1="High" title2="Velocity" />
  );
}
