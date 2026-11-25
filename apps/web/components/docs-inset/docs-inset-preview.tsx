"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { useDocStore } from "@/hooks/use-doc-store"
import { Tabs, TabsList, TabsTab } from "@workspace/ui/components/tabs"
import type { VariantItem } from "@/components/docs-preview-wrapper"

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
 */
export function DocsInsetPreview({
  children,
  code,
  fullWidth,
  variants = [],
  hideDefaultVariant = false,
}: DocsInsetPreviewProps) {
  const [activeVariant, setActiveVariant] = React.useState(
    hideDefaultVariant && variants.length > 0 ? 0 : -1
  ) // -1 = default preview
  const { setActiveVariantIndex } = useDocStore()

  React.useEffect(() => {
    setActiveVariantIndex(activeVariant)
  }, [activeVariant, setActiveVariantIndex])

  const variant = activeVariant >= 0 ? variants[activeVariant] : undefined
  const isFullWidth = variant ? Boolean(variant.fullWidth || fullWidth) : fullWidth
  const [tab, setTab] = React.useState<"preview" | "code">("preview")

  return (
    <div>
      <Tabs
        value={tab}
        onValueChange={(value) => {
          if (value !== "preview" && value !== "code") return
          setTab(value)
        }}
        className="mb-3"
      >
        <TabsList aria-label="Preview or code">
          <TabsTab value="preview">Preview</TabsTab>
          {code && <TabsTab value="code">Code</TabsTab>}
        </TabsList>
      </Tabs>

    <div className="relative overflow-hidden rounded-2xl border border-black/[0.07] bg-white dark:border-white/[0.07] dark:bg-[#111111]">
      {/* Stage. Same colour as the inset window, so a component without its own
          background sits on neutral ground; ones that paint their own cover it. */}
      <div className="relative isolate h-[360px] bg-white sm:h-[430px] dark:bg-[#111111]">
        <div
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
            "absolute inset-0 z-[45] overflow-auto bg-white transition-opacity duration-200 ease-out motion-reduce:transition-none dark:bg-[#111111] [&_[data-code-block]]:min-h-full [&_[data-code-block]]:rounded-none [&_[data-code-block]]:bg-transparent",
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
