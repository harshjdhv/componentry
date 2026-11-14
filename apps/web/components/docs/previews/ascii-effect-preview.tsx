"use client";

import { AsciiEffect } from "@workspace/ui/components/ascii-effect";
import type { ReactNode } from "react";

const imageSrc = "/images/ascii-effects/chrome-bust.webp";

function PreviewFrame({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative size-full min-h-[420px] overflow-hidden bg-black">
      {children}
    </div>
  );
}

export function AsciiImagePreview() {
  return (
    <PreviewFrame>
      <AsciiEffect variant="image" imageSrc={imageSrc} fontSize={6} scale={1} />
    </PreviewFrame>
  );
}

export function AsciiFlowPreview() {
  return (
    <PreviewFrame>
      <AsciiEffect
        variant="flow"
        imageSrc={imageSrc}
        fontSize={6}
        scale={1}
        flowSpeed={0.22}
        flowStrength={12}
        mouseRadius={150}
        mouseStrength={22}
      />
    </PreviewFrame>
  );
}

export function AsciiGlitchPreview() {
  return (
    <PreviewFrame>
      <AsciiEffect
        variant="glitch"
        imageSrc={imageSrc}
        fontSize={6}
        scale={1}
        glitchIntensity={0.8}
        glitchFrequency={1.8}
      />
    </PreviewFrame>
  );
}

export function AsciiCatalogPreview() {
  return (
    <AsciiEffect variant="flow" imageSrc={imageSrc} fontSize={4.5} scale={1} />
  );
}
