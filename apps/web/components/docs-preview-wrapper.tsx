"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { cn } from "@/lib/utils"
import { RotateCcw, Search, SlidersHorizontal, Maximize, Minimize, CodeXml, ChevronLeft } from "lucide-react"
import { CopyButton } from "@/components/copy-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion, AnimatePresence, useDragControls, type PanInfo } from "framer-motion"
import { useDocStore } from "@/hooks/use-doc-store"
import { Tabs, TabsList, TabsTab } from "@workspace/ui/components/tabs"

const CommandMenu = React.lazy(() =>
  import("@/components/command-menu").then((mod) => ({ default: mod.CommandMenu }))
)

export interface VariantItem {
  title: string
  preview: React.ReactNode
  code?: string
  fullWidth?: boolean
}

interface DocsPreviewWrapperProps {
  children: React.ReactNode
  fullWidthPreview?: boolean
  personalizeContent?: React.ReactNode
  sourceCodeFilename?: string
  sourceCodeKey?: string
  variants?: VariantItem[]
  hideDefaultVariant?: boolean
}

function PreviewToolbarCell({
  children,
  active,
  className,
}: {
  children: React.ReactNode
  active?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-2xl bg-zinc-200/40 text-foreground/70 dark:bg-zinc-800/40 dark:text-foreground/70",
        active && "bg-foreground text-background dark:bg-zinc-100 dark:text-zinc-900",
        className
      )}
    >
      {children}
    </div>
  )
}

const previewToolbarIconClass =
  "flex size-full items-center justify-center rounded-2xl text-current transition-all ease-in-out active:scale-95"

const PREVIEW_EXPAND_MS = 420
const PREVIEW_EXPAND_EASING = "cubic-bezier(0.22, 1, 0.36, 1)"

type PreviewRect = { top: number; left: number; width: number; height: number }

function toPreviewRect(rect: DOMRect | PreviewRect): PreviewRect {
  return { top: rect.top, left: rect.left, width: rect.width, height: rect.height }
}

export function DocsPreviewWrapper({
  children,
  fullWidthPreview,
  personalizeContent,
  sourceCodeFilename,
  sourceCodeKey,
  variants = [],
  hideDefaultVariant = false,
}: DocsPreviewWrapperProps) {
  const [key, setKey] = React.useState(0)
  const [showPersonalize, setShowPersonalize] = React.useState(false)
  const [showSource, setShowSource] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [sourceHtml, setSourceHtml] = React.useState<string | null>(null)
  const [sourceCode, setSourceCode] = React.useState("")
  const [isSourceLoading, setIsSourceLoading] = React.useState(false)
  const [sourceLoadError, setSourceLoadError] = React.useState<string | null>(null)
  const [activeVariant, setActiveVariant] = React.useState(
    hideDefaultVariant && variants.length > 0 ? 0 : -1
  ) // -1 = default preview
  const sourceDragControls = useDragControls()

  const resolvedActiveVariant = hideDefaultVariant && activeVariant === -1 ? 0 : activeVariant

  const { setActiveVariantIndex } = useDocStore()

  // Sync state with store
  React.useEffect(() => {
    setActiveVariantIndex(resolvedActiveVariant)
  }, [resolvedActiveVariant, setActiveVariantIndex])

  const previewRef = React.useRef<HTMLDivElement>(null)
  const splitPreviewRectRef = React.useRef<PreviewRect | null>(null)
  const hasSourceCode = Boolean(sourceCodeKey)

  const cacheSplitPreviewRect = React.useCallback(() => {
    const layout = previewRef.current?.closest("[data-docs-layout]")
    const previewShell = layout?.querySelector<HTMLElement>("[data-docs-preview-shell]")
    if (!previewShell || previewShell.style.position === "fixed") return
    splitPreviewRectRef.current = toPreviewRect(previewShell.getBoundingClientRect())
  }, [])

  const handleSourceOpen = React.useCallback(async () => {
    setShowPersonalize(false)
    if (isExpanded) {
      setIsExpanded(false)
    }
    setShowSource(true)

    if (!sourceCodeKey || sourceHtml || isSourceLoading) {
      return
    }

    try {
      setIsSourceLoading(true)
      setSourceLoadError(null)
      const response = await fetch("/api/docs/source", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ component: sourceCodeKey }),
      })

      if (!response.ok) {
        throw new Error("Failed to load source code")
      }

      const data = (await response.json()) as { code?: string; html?: string }
      setSourceCode(data.code || "")
      setSourceHtml(data.html || "")
    } catch {
      setSourceLoadError("Unable to load source code right now.")
    } finally {
      setIsSourceLoading(false)
    }
  }, [isExpanded, isSourceLoading, sourceCodeKey, sourceHtml])

  const handleToggleExpanded = React.useCallback(() => {
    setIsExpanded((prev) => {
      const next = !prev
      if (next) {
        setShowSource(false)
        setShowPersonalize(false)
      }
      return next
    })
  }, [])

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    cacheSplitPreviewRect()
    if (!isExpanded) return
    const onResize = () => cacheSplitPreviewRect()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [isExpanded, cacheSplitPreviewRect, showSource, showPersonalize])

  React.useEffect(() => {
    const layout = previewRef.current?.closest("[data-docs-layout]")
    const previewShell = layout?.querySelector<HTMLElement>("[data-docs-preview-shell]")
    if (!previewShell) return

    const isMobile = window.matchMedia("(max-width: 1023px)").matches
    const fullPadding = isMobile ? "0px" : "12px"
    const splitPadding = isMobile ? "16px" : "12px 12px 12px 6px"
    const transition = `top ${PREVIEW_EXPAND_MS}ms ${PREVIEW_EXPAND_EASING}, left ${PREVIEW_EXPAND_MS}ms ${PREVIEW_EXPAND_EASING}, width ${PREVIEW_EXPAND_MS}ms ${PREVIEW_EXPAND_EASING}, height ${PREVIEW_EXPAND_MS}ms ${PREVIEW_EXPAND_EASING}, padding ${PREVIEW_EXPAND_MS}ms ${PREVIEW_EXPAND_EASING}`

    const applyFixedRect = (rect: PreviewRect, padding: string) => {
      previewShell.style.position = "fixed"
      previewShell.style.top = `${rect.top}px`
      previewShell.style.left = `${rect.left}px`
      previewShell.style.width = `${rect.width}px`
      previewShell.style.height = `${rect.height}px`
      previewShell.style.zIndex = "60"
      previewShell.style.padding = padding
      previewShell.classList.add("bg-[#f7f7f7]")
    }

    const clearFixedStyles = () => {
      delete previewShell.dataset.previewExpanded
      for (const prop of ["position", "top", "left", "width", "height", "zIndex", "padding", "transition"] as const) {
        previewShell.style.removeProperty(prop)
      }
      previewShell.classList.remove("bg-[#f7f7f7]")
      cacheSplitPreviewRect()
    }

    let onTransitionEnd: ((event: TransitionEvent) => void) | undefined

    if (isExpanded) {
      const from = toPreviewRect(previewShell.getBoundingClientRect())
      splitPreviewRectRef.current = from

      applyFixedRect(from, splitPadding)
      void previewShell.offsetHeight

      previewShell.style.transition = transition
      requestAnimationFrame(() => {
        applyFixedRect(
          { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight },
          fullPadding
        )
        previewShell.dataset.previewExpanded = "true"
      })
    } else if (previewShell.style.position === "fixed") {
      const rightColumn = layout?.querySelector<HTMLElement>("[data-docs-right-column]")
      const col = rightColumn?.getBoundingClientRect()
      const targetFromLayout: PreviewRect | null = col
        ? isMobile
          ? { top: col.top, left: col.left, width: col.width, height: col.height }
          : { top: col.top + 12, left: col.left + 6, width: col.width - 18, height: col.height - 24 }
        : null
      const target = targetFromLayout ?? splitPreviewRectRef.current
      if (!target) {
        clearFixedStyles()
        return
      }

      previewShell.style.transition = transition
      requestAnimationFrame(() => {
        applyFixedRect(target, splitPadding)
      })

      onTransitionEnd = (event: TransitionEvent) => {
        if (event.target !== previewShell || !["width", "height"].includes(event.propertyName)) return
        clearFixedStyles()
      }
      previewShell.addEventListener("transitionend", onTransitionEnd)
    } else {
      clearFixedStyles()
    }

    return () => {
      if (onTransitionEnd) {
        previewShell.removeEventListener("transitionend", onTransitionEnd)
      }
    }
  }, [isExpanded, cacheSplitPreviewRect])

  return (
    <div className={cn(
      "relative w-full h-full rounded-xl lg:rounded-2xl border border-border/50 overflow-hidden bg-[#f7f7f7] dark:border-[#121212] dark:bg-[#171717] flex flex-col"
    )} ref={previewRef}>
      {/* Toolbar — same frosted treatment as variant tabs */}
      <section
        aria-label="Preview controls"
        className={cn(
          "z-20 m-3 mb-0 flex shrink-0 self-end select-none lg:fixed lg:right-6 lg:top-6 lg:z-[99] lg:m-0 items-center gap-1 rounded-lg bg-zinc-100/30 p-1.5 shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)] backdrop-blur-md dark:bg-zinc-950/30 dark:shadow-[inset_0_1px_3px_rgba(0,0,0,0.2)]",
          fullWidthPreview ? "absolute right-0 top-0" : "relative"
        )}
      >
        <PreviewToolbarCell>
          <React.Suspense
            fallback={
              <button type="button" className={previewToolbarIconClass} aria-label="Search">
                <Search className="size-4 opacity-60" />
              </button>
            }
          >
            <CommandMenu
              trigger={
                <button type="button" className={previewToolbarIconClass} aria-label="Search">
                  <Search className="size-4" />
                </button>
              }
            />
          </React.Suspense>
        </PreviewToolbarCell>

        {hasSourceCode && (
          <PreviewToolbarCell active={showSource}>
            <button
              type="button"
              onClick={handleSourceOpen}
              className={previewToolbarIconClass}
              aria-label="View Source"
            >
              <CodeXml className="size-4" />
            </button>
          </PreviewToolbarCell>
        )}

        {personalizeContent && (
          <PreviewToolbarCell active={showPersonalize}>
            <button
              type="button"
              onClick={() => {
                if (isExpanded) {
                  setIsExpanded(false)
                }
                setShowPersonalize(true)
                setShowSource(false)
              }}
              className={previewToolbarIconClass}
              aria-label="Personalize"
            >
              <SlidersHorizontal className="size-4" />
            </button>
          </PreviewToolbarCell>
        )}

        <PreviewToolbarCell>
          <button
            type="button"
            onClick={() => setKey((k) => k + 1)}
            className={previewToolbarIconClass}
            aria-label="Reload preview"
          >
            <RotateCcw className="size-4" />
          </button>
        </PreviewToolbarCell>

        <PreviewToolbarCell active={isExpanded}>
          <button
            type="button"
            onClick={handleToggleExpanded}
            className={previewToolbarIconClass}
            aria-label={isExpanded ? "Collapse preview pane" : "Expand preview pane"}
          >
            {isExpanded ? <Minimize className="size-4" /> : <Maximize className="size-4" />}
          </button>
        </PreviewToolbarCell>

        <PreviewToolbarCell>
          <ThemeToggle
            className={cn(
              previewToolbarIconClass,
              "!size-full !rounded-2xl !border-0 !bg-transparent shadow-none hover:!bg-transparent"
            )}
          />
        </PreviewToolbarCell>
      </section>

      {/* Content Area */}
      <div className={cn(
        "w-full overflow-auto flex bg-[#f7f7f7] dark:bg-[#171717] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
        "min-h-0 flex-1 lg:h-full",
        !fullWidthPreview && "items-center justify-center"
      )}>
        <div
          className={cn(
            "w-full",
            (resolvedActiveVariant >= 0 && variants[resolvedActiveVariant]?.fullWidth) || fullWidthPreview
              ? "h-full"
              : "p-4 lg:p-10 flex items-center justify-center"
          )}
        >
          <div key={key} className={cn("w-full h-full", !fullWidthPreview && "flex items-center justify-center")}>
            {resolvedActiveVariant === -1 ? children : variants[resolvedActiveVariant]?.preview}
          </div>
        </div>
      </div>

      {/* Bottom Variant Bar — same Tabs shape as install; solid track (muted is 4% alpha) */}
      {variants.length > 0 && (
        <div className="pointer-events-none relative z-10 w-full min-w-0 shrink-0 p-3 lg:absolute lg:bottom-0 lg:left-0 lg:w-auto lg:max-w-[min(100%,36rem)] lg:p-4">
          <Tabs
            value={String(resolvedActiveVariant)}
            onValueChange={(value) => {
              if (value == null) return
              setActiveVariant(Number(value))
            }}
            className="pointer-events-auto min-w-0"
          >
            <TabsList
              aria-label="Preview variants"
              className="max-w-full justify-start overflow-x-auto bg-zinc-100/30 dark:bg-zinc-950/30 backdrop-blur-md [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {!hideDefaultVariant && (
                <TabsTab value="-1">Default</TabsTab>
              )}
              {variants.map((variant, i) => (
                <TabsTab key={i} value={String(i)}>
                  {variant.title}
                </TabsTab>
              ))}
            </TabsList>
          </Tabs>
        </div>
      )}

      {/* Personalize Drawer Portal */}
      {mounted && ReactDOM.createPortal(
        <AnimatePresence>
          {showPersonalize && personalizeContent && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.4 }}
              onDragEnd={(_: unknown, info: PanInfo) => {
                if (info.offset.y > 100 || info.velocity.y > 500) {
                  setShowPersonalize(false)
                }
              }}
              className="fixed bottom-0 left-0 z-50 flex flex-col outline-none h-[80vh] w-full rounded-t-lg border-t border-border/20 bg-transparent shadow-none pointer-events-none lg:top-0 lg:bottom-0 lg:h-screen lg:max-h-screen lg:w-1/2 lg:rounded-none lg:border-none lg:pt-3 lg:pb-3 lg:pl-3 lg:pr-1.5"
            >
              <div className="relative h-full bg-white dark:bg-[#171717] lg:rounded-2xl overflow-hidden border border-border/20 shadow-2xl pointer-events-auto">
                <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none">
                  <div className="absolute inset-0 h-32 bg-gradient-to-b from-white to-transparent dark:from-[#171717] [mask-image:linear-gradient(to_bottom,black_20%,transparent)]" />
                  <div className="relative z-10 flex flex-col pointer-events-auto">
                    <div className="flex items-center justify-center pt-2 pb-1">
                      <div className="w-10 h-1 rounded-full bg-zinc-900/[0.08] dark:bg-white/[0.08] transition-colors hover:bg-zinc-900/[0.15] dark:hover:bg-white/[0.15]" />
                    </div>

                    <div className="flex items-center justify-between px-4 py-1">
                      <button
                        onClick={() => setShowPersonalize(false)}
                        className="inline-flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-white focus-visible:outline-none"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span className="text-xs font-mono tracking-wide">Personalize</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="relative h-full min-h-0">
                  <div className="absolute bottom-0 left-0 right-0 z-10 h-16 bg-gradient-to-t from-white to-transparent dark:from-[#171717] pointer-events-none [mask-image:linear-gradient(to_top,black_30%,transparent)]" />
                  <div className="h-full">{personalizeContent}</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Source Code Panel Portal */}
      {mounted && ReactDOM.createPortal(
        <AnimatePresence>
          {showSource && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              drag="y"
              dragControls={sourceDragControls}
              dragListener={false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.4 }}
              onDragEnd={(_: unknown, info: PanInfo) => {
                if (info.offset.y > 100 || info.velocity.y > 500) {
                  setShowSource(false)
                }
              }}
              className="fixed bottom-0 left-0 z-50 flex flex-col outline-none h-[80vh] w-full rounded-t-lg border-t border-border/20 bg-transparent shadow-none pointer-events-none lg:top-0 lg:bottom-0 lg:h-screen lg:max-h-screen lg:w-1/2 lg:rounded-none lg:border-none lg:pt-3 lg:pb-3 lg:pl-3 lg:pr-1.5"
            >
              <div className="relative h-full bg-white dark:bg-[#171717] lg:rounded-2xl overflow-hidden border border-border/20 shadow-2xl pointer-events-auto">
                {/* Header Overlay */}
                <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none">
                  <div className="absolute inset-0 h-32 bg-gradient-to-b from-white to-transparent dark:from-[#171717] [mask-image:linear-gradient(to_bottom,black_20%,transparent)]" />
                  <div className="relative z-10 flex flex-col pointer-events-auto">
                    {/* Drag handle - top edge-to-edge */}
                    <div
                      className="flex items-center justify-center pt-2 pb-1 touch-none"
                      onPointerDown={(event) => sourceDragControls.start(event)}
                    >
                      <div className="w-10 h-1 rounded-full bg-zinc-900/[0.08] dark:bg-white/[0.08] transition-colors hover:bg-zinc-900/[0.15] dark:hover:bg-white/[0.15]" />
                    </div>

                    {/* Header row */}
                    <div className="flex items-center justify-between px-4 py-1">
                      <button
                        onClick={() => setShowSource(false)}
                        className="inline-flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-white focus-visible:outline-none"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span className="text-xs font-mono tracking-wide">Source Code</span>
                      </button>

                      <div className="flex items-center gap-3">
                        {sourceCodeFilename && (
                          <div className="flex items-center gap-1.5">
                            <svg className="h-3.5 w-3.5 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                              <polyline points="14 2 14 8 20 8" />
                            </svg>
                            <span className="text-xs font-mono text-zinc-500">{sourceCodeFilename}</span>
                          </div>
                        )}
                        {sourceCode && (
                          <CopyButton code={sourceCode} absolute={false} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Code content - full height, hidden scrollbar */}
                <div className="relative h-full min-h-0">
                  {/* Bottom gradient overlay */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 h-16 bg-gradient-to-t from-white to-transparent dark:from-[#171717] pointer-events-none [mask-image:linear-gradient(to_top,black_30%,transparent)]" />
                  <div data-drawer-code className="h-full overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&_pre]:min-h-full [&_pre]:!pt-24 [&_pre]:!px-4 [&_.relative.group_>_button]:hidden">
                    <div className="h-full w-full">
                      {isSourceLoading && (
                        <div className="flex h-full items-center justify-center px-4 pt-24 pb-8">
                          <span className="text-sm text-muted-foreground/60 font-mono tracking-wide">
                            Loading source code...
                          </span>
                        </div>
                      )}
                      {!isSourceLoading && sourceLoadError && (
                        <div className="px-4 pt-24 text-sm text-muted-foreground">{sourceLoadError}</div>
                      )}
                      {!isSourceLoading && !sourceLoadError && sourceHtml && (
                        <div
                          data-code-block
                          data-line-numbers="false"
                          className="relative text-sm w-full border-none bg-transparent [&_.relative.group_>_button]:hidden [&_.shiki]:border-none [&_.shiki]:rounded-none"
                          dangerouslySetInnerHTML={{ __html: sourceHtml }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  )
}
