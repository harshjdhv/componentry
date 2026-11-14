"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"
import { motion, useDragControls } from "framer-motion"
import { ChevronUp, GripVertical } from "lucide-react"
import { useTheme } from "next-themes"
import { DialRoot, useDialKit } from "dialkit"
import "dialkit/styles.css"
import "./dialkit-theme.css"
import { HeatmapLogo } from "@workspace/ui/components/heatmap-logo"
import { usePlaygroundStore } from "@/hooks/use-playground-store"

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

/** Shape of PreviewToolbarCell in docs-preview-wrapper, with solid fills. */
/** Quiet surface, after coss: hairline border and a barely-there shadow. */
const SURFACE =
  "relative flex select-none flex-col-reverse border border-black/[0.06] bg-[#f1f1f2] p-2 shadow-[0_1px_2px_rgb(0_0_0/0.04)] dark:border-white/[0.05] dark:bg-[#131313] dark:shadow-[0_1px_2px_rgb(0_0_0/0.3)]"

/** Gradient swatch with a hairline edge; the chosen one gets the site focus ring. */
const SWATCH =
  "size-8 shrink-0 rounded-lg [background:var(--swatch)] shadow-[inset_0_0_0_1px_rgb(0_0_0/0.1)] transition-[scale,box-shadow] duration-150 ease-out supports-[corner-shape:squircle]:rounded-[12px] supports-[corner-shape:squircle]:[corner-shape:squircle] active:scale-[0.96] aria-checked:ring-2 aria-checked:ring-ring aria-checked:ring-offset-1 aria-checked:ring-offset-[#f1f1f2] dark:aria-checked:ring-offset-[#131313] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"

/** The palette's heat ramp, skipping the near-black end so small swatches stay readable. */
function swatchGradient(colors: readonly string[]) {
  return `linear-gradient(135deg, ${colors.slice(1).join(", ")})`
}

/**
 * Plain icon button: same icon color as the preview toolbar, no fill. Kept narrow
 * so gaps match the swatches; after: extends the hit area into half of each gap.
 */
const ICON_BUTTON =
  "relative flex h-8 shrink-0 items-center justify-center rounded-2xl after:absolute after:inset-y-0 after:-inset-x-1 text-foreground/70 transition-[color,scale] duration-150 ease-out hover:text-foreground active:scale-[0.96]"

/** Live preview with a small, draggable control bar at the bottom center. */
export function HeatmapLogoPlayground() {
  const { resolvedTheme } = useTheme()
  const stageRef = useRef<HTMLDivElement>(null)
  const dragControls = useDragControls()
  const [dragging, setDragging] = useState(false)
  const [open, setOpen] = useState(false)
  const [palette, setPalette] = useState<PaletteName>(DEFAULTS.palette)
  const values = useDialKit("Options", config, { id: "heatmap-logo" })

  useEffect(() => {
    usePlaygroundStore
      .getState()
      .setCode(toCode({ palette, glow: values.glow }))
  }, [palette, values.glow])

  return (
    <div ref={stageRef} className="relative flex h-full w-full items-center justify-center p-6">
      <HeatmapLogo
        image={COMPONENTRY_MARK}
        colors={[...PALETTES[palette]]}
        glow={values.glow}
        className="w-96 max-w-full"
      />
      {/* Centering lives on this wrapper so it doesn't fight the drag transform. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-4 z-10 hidden justify-center lg:flex">
        <motion.div
          drag
          dragListener={false}
          dragControls={dragControls}
          dragConstraints={stageRef}
          dragElastic={0}
          dragMomentum={false}
          onDragStart={() => setDragging(true)}
          onDragEnd={() => setDragging(false)}
          style={{ borderRadius: 8 }}
          className={`cy-dial pointer-events-auto ${SURFACE}`}
        >
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Drag to move"
              onPointerDown={(event) => dragControls.start(event)}
              className={`${ICON_BUTTON} w-5 touch-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
            >
              <GripVertical className="size-4" />
            </button>

            <div role="radiogroup" aria-label="Palette" className="flex items-center gap-2">
              {(Object.keys(PALETTES) as PaletteName[]).map((name) => (
                <button
                  key={name}
                  type="button"
                  role="radio"
                  aria-checked={palette === name}
                  aria-label={name}
                  title={name}
                  onClick={() => setPalette(name)}
                  style={{ "--swatch": swatchGradient(PALETTES[name]) } as CSSProperties}
                  className={SWATCH}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label={open ? "Hide options" : "More options"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className={`${ICON_BUTTON} w-5`}
            >
              {/* Opens upward from the bottom edge, so the arrow points up until open. */}
              <ChevronUp
                className={`size-4 transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${open ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {/* Always mounted so DialKit's height is settled; CSS grid rows animate 0fr -> 1fr. */}
          <div
            inert={!open}
            aria-hidden={!open}
            className={`grid w-0 min-w-full transition-[grid-template-rows,opacity] duration-200 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="pb-2">
                <DialRoot
                  mode="inline"
                  productionEnabled
                  theme={resolvedTheme === "light" ? "light" : "dark"}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
