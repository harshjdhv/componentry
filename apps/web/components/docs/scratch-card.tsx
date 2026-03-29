import React from "react"
import { DocsPageLayout } from "@/components/docs-page-layout"
import { readComponentSource } from "@/lib/source-code"
import {
  ScratchCardDemo,
  ScratchCardGoldDemo,
  ScratchCardHolographicDemo,
  ScratchCardDarkDemo,
} from "@/components/docs/previews/scratch-card-preview"

const defaultCode = `import { ScratchCard } from "@/components/ui/scratch-card"

<ScratchCard width={360} height={200} overlay="silver" borderRadius={16}>
  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-600 to-indigo-600 p-6">
    <div className="text-center">
      <p className="text-sm font-medium text-white/70">You won</p>
      <p className="text-4xl font-bold text-white">$50 OFF</p>
      <p className="mt-1 text-xs text-white/60">Use code: SCRATCH50</p>
    </div>
  </div>
</ScratchCard>`

const usageCode = `import { ScratchCard } from "@/components/ui/scratch-card"

<ScratchCard
  width={360}
  height={200}
  overlay="silver"
  onReveal={() => console.log("Card revealed!")}
>
  {/* Your hidden content here */}
</ScratchCard>`

const goldCode = `import { ScratchCard } from "@/components/ui/scratch-card"

<ScratchCard width={360} height={200} overlay="gold" borderRadius={16}>
  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-500 to-orange-600 p-6">
    <div className="text-center">
      <p className="text-sm font-medium text-white/70">Grand Prize</p>
      <p className="text-4xl font-bold text-white">FREE GIFT</p>
      <p className="mt-1 text-xs text-white/60">Claim within 24 hours</p>
    </div>
  </div>
</ScratchCard>`

const holographicCode = `import { ScratchCard } from "@/components/ui/scratch-card"

<ScratchCard width={360} height={200} overlay="holographic" borderRadius={20}>
  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-fuchsia-500 via-purple-600 to-cyan-500 p-6">
    <div className="text-center">
      <p className="text-sm font-medium text-white/70">Mystery Reward</p>
      <p className="text-3xl font-bold text-white">VIP ACCESS</p>
      <p className="mt-1 text-xs text-white/60">Exclusive member perks</p>
    </div>
  </div>
</ScratchCard>`

const darkCode = `import { ScratchCard } from "@/components/ui/scratch-card"

<ScratchCard width={360} height={200} overlay="dark" borderRadius={12}>
  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-400 to-teal-600 p-6">
    <div className="text-center">
      <p className="text-sm font-medium text-white/70">Congratulations</p>
      <p className="text-4xl font-bold text-white">20% OFF</p>
      <p className="mt-1 text-xs text-white/60">Your next purchase</p>
    </div>
  </div>
</ScratchCard>`

export async function ScratchCardDocs() {
  const sourceCode = (await readComponentSource("scratch-card")) || "// Unable to load source code"

  return (
    <DocsPageLayout
      title="Scratch Card"
      description="A premium scratch-to-reveal card with realistic metallic textures, canvas-based scratching with brush physics, and multiple overlay styles. Designed with Apple-level attention to detail — features brushed metal grain, noise texture, shine bands, and micro-scratch particles for an authentic tactile feel."
      preview={<ScratchCardDemo />}
      previewCode={defaultCode}
      installPackageName="scratch-card"
      installDependencies="clsx tailwind-merge"
      installSourceCode={sourceCode}
      installSourceFilename="components/ui/scratch-card.tsx"
      usageCode={usageCode}
      examples={[
        {
          title: "Gold Overlay",
          preview: <ScratchCardGoldDemo />,
          code: goldCode,
        },
        {
          title: "Holographic Overlay",
          preview: <ScratchCardHolographicDemo />,
          code: holographicCode,
        },
        {
          title: "Dark Overlay",
          preview: <ScratchCardDarkDemo />,
          code: darkCode,
        },
      ]}
      props={[
        {
          name: "children",
          type: "React.ReactNode",
          description: "Content revealed after scratching the overlay.",
        },
        {
          name: "width",
          type: "number",
          default: "360",
          description: "Width of the card in pixels.",
        },
        {
          name: "height",
          type: "number",
          default: "200",
          description: "Height of the card in pixels.",
        },
        {
          name: "brushSize",
          type: "number",
          default: "30",
          description: "Radius of the scratch brush in pixels.",
        },
        {
          name: "revealThreshold",
          type: "number",
          default: "55",
          description: "Percentage of area scratched to trigger full reveal (0-100).",
        },
        {
          name: "overlay",
          type: '"silver" | "gold" | "holographic" | "dark"',
          default: '"silver"',
          description: "Visual style of the scratch overlay.",
        },
        {
          name: "borderRadius",
          type: "number",
          default: "16",
          description: "Border radius of the card in pixels.",
        },
        {
          name: "onReveal",
          type: "() => void",
          description: "Callback fired when the card is fully revealed.",
        },
        {
          name: "onScratchProgress",
          type: "(percentage: number) => void",
          description: "Callback fired with current scratch percentage as you scratch.",
        },
        {
          name: "particleIntensity",
          type: "number",
          default: "1",
          description: "Particle intensity multiplier. 0 disables particles, 2 doubles them.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes for the container.",
        },
      ]}
    />
  )
}
