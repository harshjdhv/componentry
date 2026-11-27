"use client"

import * as React from "react"
import { AppWindow, CodeXml } from "lucide-react"

import { cn } from "@/lib/utils"
import { useDocStore } from "@/hooks/use-doc-store"
import { Tabs, TabsList, TabsTab } from "@workspace/ui/components/tabs"
import { PropsRowSlotContext } from "./props-row-slot"
import { CustomizePanel, VariantRow } from "./customize-panel"
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
  const [propsSlot, setPropsSlot] = React.useState<HTMLElement | null>(null)
  const stageInnerRef = React.useRef<HTMLDivElement>(null)
  const [tallStage, setTallStage] = React.useState<number | null>(null)

  // Several playgrounds ask for more height than the 360/430px stage gives them
  // (a 640px scroll demo, a card grid, a 3D ring). Rather than hand-tuning every
  // page, grow the stage to whatever the content actually needs, up to a cap so a
  // runaway preview cannot take over the page. Hysteresis stops it oscillating
  // between grown and base height on the next measurement.
  React.useEffect(() => {
    const el = stageInnerRef.current
    if (!el || typeof window === "undefined") return

    const baseHeight = () =>
      window.matchMedia("(min-width: 640px)").matches ? 430 : 360

    const CAP = 780

    const measure = () => {
      const base = baseHeight()
      const need = el.scrollHeight
      setTallStage((current) => {
        const stage = current ?? base
        if (need > stage + 4) return Math.min(need, CAP)
        if (need < stage - 48) return null
        return current
      })
    }

    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(el)
    const query = window.matchMedia("(min-width: 640px)")
    query.addEventListener("change", measure)

    return () => {
      observer.disconnect()
      query.removeEventListener("change", measure)
    }
  }, [isFullWidth, variant])

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
          <TabsTab value="preview">
            <AppWindow aria-hidden />
            Preview
          </TabsTab>
          {code && (
            <TabsTab value="code">
              <CodeXml aria-hidden />
              Code
            </TabsTab>
          )}
        </TabsList>
      </Tabs>

    <div className="relative overflow-hidden rounded-2xl border border-black/[0.07] bg-docs-surface dark:border-white/[0.07]">
      {/* Stage. Same colour as the inset window, so a component without its own
          background sits on neutral ground; ones that paint their own cover it. */}
      <div
        className="relative isolate h-[360px] bg-docs-surface sm:h-[430px]"
        style={tallStage ? { height: `${tallStage}px` } : undefined}
      >
        <div
          ref={stageInnerRef}
          className={cn(
            "h-full w-full",
            !isFullWidth &&
              "flex items-center justify-center overflow-auto p-6 [scrollbar-width:none] lg:p-10 [&::-webkit-scrollbar]:hidden"
          )}
        >
          <PropsRowSlotContext.Provider value={propsSlot}>
            {variant ? variant.preview : children}
          </PropsRowSlotContext.Provider>
        </div>
      </div>

      {/* Code tab: covers the stage at the same size, so switching never jumps. */}
      {code && (
        <div
          inert={tab !== "code"}
          aria-hidden={tab !== "code"}
          className={cn(
            "absolute inset-0 z-[45] overflow-auto bg-docs-surface transition-opacity duration-200 ease-out motion-reduce:transition-none [&_[data-code-block]]:min-h-full [&_[data-code-block]]:rounded-none [&_[data-code-block]]:bg-transparent",
            tab === "code" ? "opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          {code}
        </div>
      )}
    </div>

      {/* Customize panel: variant row here, then whatever the playground inside the
          stage portals into the slot (preset swatches, DialKit rows). Hidden when empty. */}
      <CustomizePanel slotRef={setPropsSlot}>
        {variants.length > 0 && (
          <VariantRow
            options={[
              ...(hideDefaultVariant ? [] : [{ value: "-1", label: "Default" }]),
              ...variants.map((v, i) => ({ value: String(i), label: v.title })),
            ]}
            value={String(activeVariant)}
            onChange={(value) => setActiveVariant(Number(value))}
          />
        )}
      </CustomizePanel>
    </div>
  )
}
