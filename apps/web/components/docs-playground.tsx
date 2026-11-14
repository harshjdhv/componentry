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
import { motion, useDragControls, useMotionValue } from "framer-motion"
import { ChevronUp, GripVertical, SlidersHorizontal, X } from "lucide-react"
import { useTheme } from "next-themes"
import { DialRoot, DialStore, type ControlMeta } from "dialkit"
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
  /** Name of the corner launcher and panel title when there are no presets. */
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

/**
 * One JSX prop for generated code. Strings with quotes or line breaks become
 * `{"..."}` expressions, since JSX attribute strings can't escape them.
 */
export function jsxProp(key: string, value: string | number | boolean) {
  if (typeof value !== "string") return `${key}={${value}}`
  return /["\n]/.test(value) ? `${key}={${JSON.stringify(value)}}` : `${key}="${value}"`
}

const HEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i
let probe: CanvasRenderingContext2D | null = null

/** Any CSS color (rgb, hsl, oklch, display-p3…) to #rrggbb, or #rrggbbaa when translucent. */
function toHex(color: string) {
  probe ??= document.createElement("canvas").getContext("2d", { willReadFrequently: true })
  if (!probe) return null
  probe.clearRect(0, 0, 1, 1)
  probe.fillStyle = "#000"
  probe.fillStyle = color
  probe.fillRect(0, 0, 1, 1)
  const [r, g, b, a] = probe.getImageData(0, 0, 1, 1).data
  const hex = (n: number) => n.toString(16).padStart(2, "0")
  return `#${hex(r!)}${hex(g!)}${hex(b!)}${a === 255 ? "" : hex(a!)}`
}

function colorPaths(controls: ControlMeta[]): string[] {
  return controls.flatMap((c) =>
    c.type === "color" ? [c.path] : c.type === "folder" ? colorPaths(c.children ?? []) : [],
  )
}

/**
 * DialKit's color picker can switch to rgb/hsl/oklch/p3, but the components and
 * generated code expect hex. Rewrite any non-hex color value back to hex.
 */
function useHexColors() {
  useEffect(() => {
    const normalize = (panelId: string) => {
      const panel = DialStore.getPanel(panelId)
      if (!panel) return
      for (const path of colorPaths(panel.controls)) {
        const value = DialStore.getValue(panelId, path)
        if (typeof value !== "string" || value === "" || HEX.test(value)) continue
        const hex = toHex(value)
        if (hex) DialStore.updateValue(panelId, path, hex)
      }
    }

    // Value changes notify per panel; the global listener only tracks panels coming and going.
    let unsubscribers: Array<() => void> = []
    const watchPanels = () => {
      unsubscribers.forEach((off) => off())
      unsubscribers = DialStore.getPanels("panel").map((panel) => {
        normalize(panel.id)
        return DialStore.subscribe(panel.id, () => normalize(panel.id))
      })
    }
    watchPanels()
    const offGlobal = DialStore.subscribeGlobal(watchPanels)
    return () => {
      offGlobal()
      unsubscribers.forEach((off) => off())
    }
  }, [])
}

/** Option shown in a preset select once values no longer match a preset. */
export const CUSTOM_PRESET = "Custom"

/**
 * Presets that aren't colors belong in the panel as a DialKit select (swatches are
 * for colors). Picking one calls `apply`; editing values away from every preset
 * flips the select to "Custom", and landing back on one selects it again.
 *
 * @param selected the select's current value (e.g. `dial.values.preset`)
 * @param matching the preset whose values match the current ones, or null
 */
export function usePresetSelect(
  selected: string,
  matching: string | null,
  apply: (name: string) => void,
  select: (name: string) => void,
) {
  const previous = useRef({ selected, matching })
  useEffect(() => {
    const before = previous.current
    previous.current = { selected, matching }
    if (selected !== before.selected) {
      if (selected !== CUSTOM_PRESET && selected !== matching) apply(selected)
    } else if (matching !== before.matching) {
      select(matching ?? CUSTOM_PRESET)
    }
  }, [selected, matching, apply, select])
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

/** Round corner launcher for pages without swatches; same surface as the bar. */
const LAUNCHER =
  "pointer-events-auto absolute bottom-0 right-0 flex size-11 items-center justify-center rounded-full border border-black/[0.06] bg-[#f1f1f2] text-foreground/70 shadow-[0_1px_2px_rgb(0_0_0/0.04)] transition-[opacity,scale,color] duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:text-foreground active:scale-[0.96] motion-reduce:transition-none dark:border-white/[0.05] dark:bg-[#131313] dark:shadow-[0_1px_2px_rgb(0_0_0/0.3)]"

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
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const toggle = () => setOpen((value) => !value)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  useHexColors()

  // Corner launcher: focus moves into the panel on open, Escape closes it, and
  // focus returns to the launcher.
  useEffect(() => {
    if (hasPresets || !open) return
    closeRef.current?.focus({ preventScroll: true })
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      setOpen(false)
      requestAnimationFrame(() => launcherRef.current?.focus({ preventScroll: true }))
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [hasPresets, open])

  const dragProps = {
    drag: true,
    dragListener: false,
    dragControls,
    dragConstraints: stageRef,
    dragElastic: 0,
    dragMomentum: false,
    onDragStart: () => setDragging(true),
    onDragEnd: () => setDragging(false),
  } as const

  const grip = (
    <button
      type="button"
      aria-label="Drag to move"
      onPointerDown={(event) => dragControls.start(event)}
      className={`${ICON_BUTTON} w-5 touch-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
    >
      <GripVertical className="size-4" />
    </button>
  )

  // Long panels scroll inside the bar instead of growing past the preview.
  const dial = (
    <div className="max-h-[min(60vh,420px)] overflow-y-auto overscroll-contain rounded-lg [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <DialRoot mode="inline" productionEnabled theme={resolvedTheme === "light" ? "light" : "dark"} />
    </div>
  )

  // No color swatches to show: a round launcher in the corner instead of a mostly empty bar.
  if (!hasPresets) {
    const openPanel = () => {
      x.set(0) // always open anchored to the launcher, even if it was dragged last time
      y.set(0)
      setOpen(true)
    }
    return (
      <div ref={stageRef} className={cn("relative h-full w-full", className)}>
        {children}

        {controls && (
          <div className="pointer-events-none absolute bottom-4 right-4 z-30">
            <button
              type="button"
              ref={launcherRef}
              aria-label={label}
              aria-expanded={open}
              inert={open}
              onClick={openPanel}
              className={cn(
                LAUNCHER,
                open && "pointer-events-none scale-75 opacity-0",
              )}
            >
              <SlidersHorizontal className="size-4" />
            </button>

            {/* Always mounted so DialKit's height is settled; it fades and scales from the corner. */}
            <motion.div
              {...dragProps}
              inert={!open}
              aria-hidden={!open}
              style={{ x, y, borderRadius: 8, minWidth }}
              className={cn(
                "cy-dial pointer-events-auto",
                SURFACE,
                "absolute bottom-0 right-0 origin-bottom-right transition-[opacity,scale] duration-200 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none",
                !open && "pointer-events-none scale-95 opacity-0",
              )}
            >
              <div className="flex items-center gap-2">
                {grip}
                <span className="flex-1 text-center text-[13px] font-medium text-foreground/70">{label}</span>
                <button
                  type="button"
                  ref={closeRef}
                  aria-label="Close options"
                  onClick={() => {
                    setOpen(false)
                    requestAnimationFrame(() => launcherRef.current?.focus({ preventScroll: true }))
                  }}
                  className={`${ICON_BUTTON} w-5`}
                >
                  <X className="size-4" />
                </button>
              </div>
              <div className="pb-2">{dial}</div>
            </motion.div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div ref={stageRef} className={cn("relative h-full w-full", className)}>
      {children}

      {/* Centering lives on this wrapper so it doesn't fight the drag transform. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-4 z-30 flex justify-center">
        <motion.div
          {...dragProps}
          style={{ borderRadius: 8, minWidth }}
          className={`cy-dial pointer-events-auto ${SURFACE}`}
        >
          <div className="flex items-center gap-2">
            {grip}

            <div role="radiogroup" aria-label={presetsLabel} className="flex flex-1 items-center justify-center gap-2">
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
                <div className="pb-2">{dial}</div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
