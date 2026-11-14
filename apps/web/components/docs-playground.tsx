"use client"

/**
 * DocsPlayground: the live preview stage for a docs page, with a small draggable
 * control bar at the bottom center. The bar shows optional preset swatches and a
 * chevron that expands the page's DialKit controls.
 *
 * A page registers its controls with `useDialKit` (one panel per page), renders
 * its component inside <DocsPlayground>, and pushes generated code with
 * `useLiveCode`, which feeds <LiveCodeBlock> in the Usage section.
 */

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"
import { motion, useDragControls } from "framer-motion"
import { ChevronUp, GripVertical } from "lucide-react"
import { useTheme } from "next-themes"
import { DialRoot } from "dialkit"
import "dialkit/styles.css"
import "./docs-playground.css"
import { cn } from "@/lib/utils"
import { usePlaygroundStore } from "@/hooks/use-playground-store"

export interface PlaygroundPreset {
  name: string
  /** CSS background for the swatch: a color or a gradient. See `gradientSwatch`. */
  swatch: string
}

interface DocsPlaygroundProps {
  children: ReactNode
  /** Optional swatch row. Keep it to 3–5 entries. */
  presets?: PlaygroundPreset[]
  /** Name of the selected preset, or null when values no longer match one. */
  preset?: string | null
  onPresetChange?: (name: string) => void
  /** Accessible name for the swatch group. */
  presetsLabel?: string
  /** Text shown in the bar when there are no presets. */
  label?: string
  /** Set false when the page registers no DialKit controls (hides the chevron). */
  controls?: boolean
  /** Minimum bar width in px. The default fits a color row's hex value; raise it for text inputs. */
  minWidth?: number
  /** Classes for the stage that holds the preview. */
  className?: string
}

/** Diagonal swatch through a color ramp, e.g. a palette's stops. */
export function gradientSwatch(colors: readonly string[]) {
  return colors.length === 1 ? colors[0]! : `linear-gradient(135deg, ${colors.join(", ")})`
}

/** Push generated code to the Usage section's <LiveCodeBlock>. */
export function useLiveCode(code: string) {
  useEffect(() => {
    usePlaygroundStore.getState().setCode(code)
  }, [code])

  // Clear on unmount so the next page's LiveCodeBlock starts from its own default.
  useEffect(() => () => usePlaygroundStore.getState().setCode(""), [])
}

/** Quiet surface, after coss: hairline border and a barely-there shadow. */
const SURFACE =
  "relative flex select-none flex-col-reverse border border-black/[0.06] bg-[#f1f1f2] p-2 shadow-[0_1px_2px_rgb(0_0_0/0.04)] dark:border-white/[0.05] dark:bg-[#131313] dark:shadow-[0_1px_2px_rgb(0_0_0/0.3)]"

/** Swatch with a hairline edge; the chosen one gets the site focus ring. */
const SWATCH =
  "size-8 shrink-0 rounded-lg [background:var(--swatch)] shadow-[inset_0_0_0_1px_rgb(0_0_0/0.1)] transition-[scale,box-shadow] duration-150 ease-out supports-[corner-shape:squircle]:rounded-[12px] supports-[corner-shape:squircle]:[corner-shape:squircle] active:scale-[0.96] aria-checked:ring-2 aria-checked:ring-ring aria-checked:ring-offset-1 aria-checked:ring-offset-[#f1f1f2] dark:aria-checked:ring-offset-[#131313] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"

/**
 * Plain icon button: same icon color as the preview toolbar, no fill. Kept narrow
 * so gaps match the swatches; after: extends the hit area into half of each gap.
 */
const ICON_BUTTON =
  "relative flex h-8 shrink-0 items-center justify-center rounded-2xl after:absolute after:inset-y-0 after:-inset-x-1 text-foreground/70 transition-[color,scale] duration-150 ease-out hover:text-foreground active:scale-[0.96]"

export function DocsPlayground({
  children,
  presets,
  preset,
  onPresetChange,
  presetsLabel = "Presets",
  label = "Customize",
  controls = true,
  minWidth = 240,
  className,
}: DocsPlaygroundProps) {
  const { resolvedTheme } = useTheme()
  const stageRef = useRef<HTMLDivElement>(null)
  const dragControls = useDragControls()
  const [dragging, setDragging] = useState(false)
  const [open, setOpen] = useState(false)
  const hasPresets = Boolean(presets?.length)
  const toggle = () => setOpen((value) => !value)

  return (
    <div ref={stageRef} className={cn("relative h-full w-full", className)}>
      {children}

      {/* Centering lives on this wrapper so it doesn't fight the drag transform. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-4 z-30 flex justify-center">
        <motion.div
          drag
          dragListener={false}
          dragControls={dragControls}
          dragConstraints={stageRef}
          dragElastic={0}
          dragMomentum={false}
          onDragStart={() => setDragging(true)}
          onDragEnd={() => setDragging(false)}
          style={{ borderRadius: 8, minWidth }}
          className={`cy-dial pointer-events-auto ${SURFACE}`}
        >
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              aria-label="Drag to move"
              onPointerDown={(event) => dragControls.start(event)}
              className={`${ICON_BUTTON} w-5 touch-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
            >
              <GripVertical className="size-4" />
            </button>

            {hasPresets ? (
              <div role="radiogroup" aria-label={presetsLabel} className="flex items-center gap-2">
                {presets!.map(({ name, swatch }) => (
                  <button
                    key={name}
                    type="button"
                    role="radio"
                    aria-checked={preset === name}
                    aria-label={name}
                    title={name}
                    onClick={() => onPresetChange?.(name)}
                    style={{ "--swatch": swatch } as CSSProperties}
                    className={SWATCH}
                  />
                ))}
              </div>
            ) : (
              <button
                type="button"
                onClick={controls ? toggle : undefined}
                tabIndex={-1}
                className="h-8 px-1 text-[13px] font-medium text-foreground/70"
              >
                {label}
              </button>
            )}

            {controls && (
              <button
                type="button"
                aria-label={open ? "Hide options" : "More options"}
                aria-expanded={open}
                onClick={toggle}
                className={`${ICON_BUTTON} w-5`}
              >
                {/* Opens upward from the bottom edge, so the arrow points up until open. */}
                <ChevronUp
                  className={`size-4 transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${open ? "rotate-180" : ""}`}
                />
              </button>
            )}
          </div>

          {/* Always mounted so DialKit's height is settled; CSS grid rows animate 0fr -> 1fr. */}
          {controls && (
            <div
              inert={!open}
              aria-hidden={!open}
              className={`grid w-0 min-w-full transition-[grid-template-rows,opacity] duration-200 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="min-h-0 overflow-hidden">
                {/* Gap sits outside the scroller so it never scrolls away from the swatch row. */}
                <div className="pb-2">
                  {/* Long panels scroll inside the bar instead of growing past the preview. */}
                  <div className="max-h-[min(60vh,420px)] overflow-y-auto overscroll-contain rounded-lg [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <DialRoot
                      mode="inline"
                      productionEnabled
                      theme={resolvedTheme === "light" ? "light" : "dark"}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
