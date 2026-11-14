"use client"

import { useState } from "react"
import { useDialKit } from "dialkit"
import { HeatmapLogo } from "@workspace/ui/components/heatmap-logo"
import { DocsPlayground, gradientSwatch, useLiveCode } from "@/components/docs-playground"

const COMPONENTRY_MARK = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="371 347 520 520"><g fill="#000"><path d="M457 376H595Q619 376 619 400V505C619 541 605 564 577 579C564 586 552 591 544 596C536 601 532 604 532 607C532 610 536 613 544 618C552 623 564 628 577 635C605 650 619 673 619 709V814Q619 838 595 838H457Q409 838 409 790V424Q409 376 457 376Z"/><rect x="643" y="376" width="210" height="216" rx="24"/><rect x="643" y="622" width="210" height="216" rx="24"/></g></svg>'
)}`

const PALETTES = {
  Ember: ["#1a0b0b", "#4a1716", "#8f2f2b", "#d4615a", "#ef8b87", "#ffd2c4", "#fff6f1"],
  Ice: ["#050b1a", "#0f2550", "#1f4fa8", "#4f8ef0", "#9cc8ff", "#e2f0ff", "#ffffff"],
  Toxic: ["#060d05", "#10260c", "#1f5214", "#3f9a1f", "#8be03a", "#d6ff8a", "#f7ffe6"],
  Mono: ["#0a0a0a", "#262626", "#404040", "#737373", "#a3a3a3", "#e5e5e5", "#ffffff"],
} as const
type PaletteName = keyof typeof PALETTES

const DEFAULTS = { palette: "Ember" as PaletteName, glow: 0.3 }

const config = {
  glow: [DEFAULTS.glow, 0, 1, 0.01] as [number, number, number, number],
}

// Skip the near-black end of each ramp so the small swatches stay readable.
const PRESETS = (Object.keys(PALETTES) as PaletteName[]).map((name) => ({
  name,
  swatch: gradientSwatch(PALETTES[name].slice(1)),
}))

function toCode({ palette, glow }: { palette: PaletteName; glow: number }) {
  const props = [`image="/logo.svg"`]
  if (palette !== DEFAULTS.palette) {
    props.push(`colors={${JSON.stringify(PALETTES[palette]).replaceAll(",", ", ")}}`)
  }
  if (glow !== DEFAULTS.glow) props.push(`glow={${Number(glow.toFixed(2))}}`)
  props.push(`className="w-96"`)

  return `import { HeatmapLogo } from "@/components/ui/heatmap-logo"

export default function Demo() {
  return (
    <div className="flex justify-center p-6">
      <HeatmapLogo
        ${props.join("\n        ")}
      />
    </div>
  )
}`
}

export function HeatmapLogoPlayground() {
  const [palette, setPalette] = useState<PaletteName>(DEFAULTS.palette)
  const values = useDialKit("Heatmap Logo", config, { id: "heatmap-logo" })

  useLiveCode(toCode({ palette, glow: values.glow }))

  return (
    <DocsPlayground
      presets={PRESETS}
      preset={palette}
      onPresetChange={(name) => setPalette(name as PaletteName)}
      presetsLabel="Palette"
      className="flex items-center justify-center p-6"
    >
      <HeatmapLogo
        image={COMPONENTRY_MARK}
        colors={[...PALETTES[palette]]}
        glow={values.glow}
        className="w-96 max-w-full"
      />
    </DocsPlayground>
  )
}
