"use client"

import {
  AsciiGlitch,
  AsciiImage,
  AsciiFlow,
} from "@workspace/ui/components/ascii-effect"
import type { ReactNode } from "react"

const imageSrc = "/images/ascii-effects/chrome-bust.webp"

function PreviewFrame({
  children,
  label,
}: {
  children: ReactNode
  label: string
}) {
  return (
    <div className="relative size-full overflow-hidden bg-black">
      {children}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent p-4 pt-16 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
        <span>{label}</span>
        <span>Render / Live</span>
      </div>
    </div>
  )
}

export function AsciiImagePreview() {
  return (
    <PreviewFrame label="Image study">
      <AsciiImage imageSrc={imageSrc} fontSize={6} scale={1} colors={["#34363b", "#ffffff"]} />
    </PreviewFrame>
  )
}

export function AsciiFlowPreview() {
  return (
    <PreviewFrame label="Flow field">
      <AsciiFlow
        imageSrc={imageSrc}
        fontSize={6}
        scale={1}
        flowSpeed={0.22}
        flowDirection={0}
        flowStrength={12}
        mouseRadius={150}
        mouseStrength={22}
        colors={["#29344d", "#c8ddff", "#ffffff"]}
      />
    </PreviewFrame>
  )
}

export function AsciiGlitchPreview() {
  return (
    <PreviewFrame label="Signal recovery">
      <AsciiGlitch
        imageSrc={imageSrc}
        fontSize={6}
        scale={1}
        glitchIntensity={0.8}
        glitchFrequency={1.8}
        colors={["#26382f", "#9fe7c5", "#f2fff9"]}
      />
    </PreviewFrame>
  )
}

export function AsciiCatalogPreview({ slug, colors }: { slug: string; colors?: string[] }) {
  const common = { imageSrc, fontSize: 4.5, scale: 1, colors }

  if (slug === "ascii-flow") {
    return <AsciiFlow {...common} flowSpeed={0.22} flowDirection={0} flowStrength={10} />
  }
  if (slug === "ascii-glitch") {
    return <AsciiGlitch {...common} revealDuration={900} />
  }
  return <AsciiImage {...common} />
}
