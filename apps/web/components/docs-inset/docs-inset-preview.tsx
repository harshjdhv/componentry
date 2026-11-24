"use client"

import * as React from "react"
import { Maximize, Minimize, RotateCcw } from "lucide-react"

import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { useDocStore } from "@/hooks/use-doc-store"
import { Tabs, TabsList, TabsTab } from "@workspace/ui/components/tabs"
import { underlineListClass, underlineTabClass } from "./underline-tabs"
import type { VariantItem } from "@/components/docs-preview-wrapper"

const toolButtonClass =
  "flex size-8 items-center justify-center rounded-lg text-foreground/60 transition-[color,background-color,scale] duration-150 ease-out hover:bg-black/[0.04] hover:text-foreground active:scale-[0.96] dark:hover:bg-white/[0.06]"

interface DocsInsetPreviewProps {
  /** The live preview (playground). */
  children: React.ReactNode
  /** Usage code, shown in the Code tab. */
  code?: React.ReactNode
  /** Stretch the preview edge to edge instead of centering it with padding. */
  fullWidth?: boolean
  /** Alternate previews, switched with tabs; the code block follows via useDocStore. */
  variants?: VariantItem[]
  hideDefaultVariant?: boolean
}

/**
 * shadcn-style preview: Preview / Code tabs over one card. The live stage stays
 * mounted under the Code tab (playgrounds feed the live code and clear it on
 * unmount, and WebGL canvases shouldn't resize to zero), so Code fades in on top.
 * Fullscreen toggles classes on the same stage element, so WebGL/DialKit state
 * isn't remounted when it expands.
 */
export function DocsInsetPreview({
  children,
  code,
  fullWidth,
  variants = [],
  hideDefaultVariant = false,
}: DocsInsetPreviewProps) {
  const [reloadKey, setReloadKey] = React.useState(0)
  const [activeVariant, setActiveVariant] = React.useState(
    hideDefaultVariant && variants.length > 0 ? 0 : -1
  ) // -1 = default preview
  const { setActiveVariantIndex } = useDocStore()

  React.useEffect(() => {
    setActiveVariantIndex(activeVariant)
  }, [activeVariant, setActiveVariantIndex])

  const variant = activeVariant >= 0 ? variants[activeVariant] : undefined
  const isFullWidth = variant ? Boolean(variant.fullWidth || fullWidth) : fullWidth
  const [expanded, setExpanded] = React.useState(false)
  const [tab, setTab] = React.useState<"preview" | "code">("preview")
  React.useEffect(() => {
    if (!expanded) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false)
    }
    const { overflow } = document.body.style
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [expanded])

  return (
    <div>
      <Tabs
        value={tab}
        onValueChange={(value) => {
          if (value !== "preview" && value !== "code") return
          setExpanded(false)
          setTab(value)
        }}
        className="mb-3"
      >
        <TabsList variant="underline" aria-label="Preview or code" className={underlineListClass}>
          <TabsTab value="preview" className={underlineTabClass}>Preview</TabsTab>
          {code && <TabsTab value="code" className={underlineTabClass}>Code</TabsTab>}
        </TabsList>
      </Tabs>

    <div className="relative overflow-hidden rounded-2xl border border-black/[0.07] bg-white dark:border-white/[0.07] dark:bg-[#141414]">
      {/* Stage */}
      <div
        className={cn(
          "relative isolate bg-[#f7f7f7] dark:bg-[#171717]",
          expanded
            ? "fixed inset-0 z-[60]"
            : "h-[440px] sm:h-[520px] xl:h-[580px]"
        )}
      >
        <div className="absolute top-3 right-3 z-40 flex items-center gap-0.5 rounded-xl border border-black/[0.06] bg-[#f1f1f2]/90 p-1 backdrop-blur-sm dark:border-white/[0.05] dark:bg-[#131313]/90">
          <button
            type="button"
            onClick={() => setReloadKey((k) => k + 1)}
            className={toolButtonClass}
            aria-label="Reload preview"
          >
            <RotateCcw className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className={toolButtonClass}
            aria-label={expanded ? "Exit fullscreen" : "Fullscreen preview"}
          >
            {expanded ? <Minimize className="size-3.5" /> : <Maximize className="size-3.5" />}
          </button>
          <ThemeToggle className={cn(toolButtonClass, "!border-0 [&_svg]:size-3.5")} />
        </div>

        <div
          key={reloadKey}
          className={cn(
            "h-full w-full",
            !isFullWidth &&
              "flex items-center justify-center overflow-auto p-6 [scrollbar-width:none] lg:p-10 [&::-webkit-scrollbar]:hidden"
          )}
        >
          {variant ? variant.preview : children}
        </div>

        {variants.length > 0 && (
          <div className="pointer-events-none absolute bottom-0 left-0 z-30 max-w-full p-3 lg:p-4">
            <Tabs
              value={String(activeVariant)}
              onValueChange={(value) => {
                if (value == null) return
                setActiveVariant(Number(value))
              }}
              className="pointer-events-auto min-w-0"
            >
              <TabsList
                aria-label="Preview variants"
                className="max-w-full justify-start overflow-x-auto bg-zinc-100/30 backdrop-blur-md dark:bg-zinc-950/30 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
              >
                {!hideDefaultVariant && <TabsTab value="-1">Default</TabsTab>}
                {variants.map((v, i) => (
                  <TabsTab key={i} value={String(i)}>
                    {v.title}
                  </TabsTab>
                ))}
              </TabsList>
            </Tabs>
          </div>
        )}
      </div>

      {/* Code tab: covers the stage at the same size, so switching never jumps. */}
      {code && (
        <div
          inert={tab !== "code"}
          aria-hidden={tab !== "code"}
          className={cn(
            "absolute inset-0 z-[45] overflow-auto bg-white transition-opacity duration-200 ease-out motion-reduce:transition-none dark:bg-[#141414] [&_[data-code-block]]:min-h-full [&_[data-code-block]]:rounded-none [&_[data-code-block]]:bg-transparent",
            tab === "code" ? "opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          {code}
        </div>
      )}
    </div>
    </div>
  )
}
