"use client";

import { useState, useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { useTheme } from "next-themes";
import { ParticleGalaxy } from "@workspace/ui/components/particle-galaxy";

interface ParticleGalaxyPreviewProps {
  particleCount?: number;
  particleSize?: number;
  rotationSpeed?: number;
  spiralArms?: number;
  colors?: [string, string, string];
  mouseInfluence?: number;
  autoRotate?: boolean;
  blendMode?: "additive" | "normal";
  spread?: number;
  density?: number;
  glow?: number;
  cameraMovement?: boolean;
  centerConcentration?: number;
  pulsate?: boolean;
  pulsateSpeed?: number;
}

function ParticleGalaxyWrapper(props: ParticleGalaxyPreviewProps) {
  const [key, setKey] = useState(0);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const effectiveBlendMode =
    props.blendMode ||
    (mounted && resolvedTheme === "light" ? "normal" : "additive");

  return (
    <div className="relative w-full h-[500px] group">
      <button
        onClick={() => setKey((prev) => prev + 1)}
        className="absolute top-4 right-4 z-10 p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:scale-110 transition-all cursor-pointer"
        aria-label="Reload galaxy"
      >
        <RotateCcw className="w-4 h-4 text-black dark:text-white" />
      </button>
      <ParticleGalaxy
        key={key}
        {...props}
        blendMode={effectiveBlendMode}
        className="h-full"
      />
    </div>
  );
}

export function ParticleGalaxyDemo() {
  return <ParticleGalaxyWrapper />;
}

export function ParticleGalaxyCustomDemo() {
  return (
    <ParticleGalaxyWrapper
      colors={["#10b981", "#06b6d4", "#3b82f6"]}
      spiralArms={5}
      particleCount={15000}
      spread={3.5}
    />
  );
}

export function ParticleGalaxyDenseDemo() {
  return (
    <ParticleGalaxyWrapper
      colors={["#f97316", "#ef4444", "#ec4899"]}
      particleCount={20000}
      particleSize={0.025}
      centerConcentration={0.8}
      density={0.9}
      glow={80}
      spread={2}
    />
  );
}

export function ParticleGalaxySlowDemo() {
  return (
    <ParticleGalaxyWrapper
      colors={["#8b5cf6", "#ec4899", "#f97316"]}
      rotationSpeed={0.0005}
      mouseInfluence={0.8}
      cameraMovement={false}
      pulsate={false}
    />
  );
}
