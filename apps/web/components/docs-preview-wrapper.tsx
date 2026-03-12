"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { cn } from "@/lib/utils"
import { RotateCcw, Search, Settings2, Check, Maximize, Minimize, CodeXml, ChevronLeft, Copy } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { CommandMenu } from "@/components/command-menu"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"
import { useDocStore } from "@/hooks/use-doc-store"

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
  sourceCodeContent?: React.ReactNode
  sourceCodeFilename?: string
  sourceCode?: string
  variants?: VariantItem[]
  hideDefaultVariant?: boolean
}

export function DocsPreviewWrapper({
  children,
  fullWidthPreview,
  personalizeContent,
  sourceCodeContent,
  sourceCodeFilename,
  sourceCode,
  variants = [],
  hideDefaultVariant = false,
}: DocsPreviewWrapperProps) {
  const [key, setKey] = React.useState(0)
  const [showPersonalize, setShowPersonalize] = React.useState(false)
  const [showSource, setShowSource] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [activeVariant, setActiveVariant] = React.useState(
    hideDefaultVariant && variants.length > 0 ? 0 : -1
  ) // -1 = default preview

  const resolvedActiveVariant = hideDefaultVariant && activeVariant === -1 ? 0 : activeVariant

  const { setActiveVariantIndex } = useDocStore()

  // Sync state with store
  React.useEffect(() => {
    setActiveVariantIndex(resolvedActiveVariant)
  }, [resolvedActiveVariant, setActiveVariantIndex])

  const previewRef = React.useRef<HTMLDivElement>(null)
  const variantBarRef = React.useRef<HTMLDivElement>(null)
  const iconButtonClass =
    "inline-flex h-7 w-7 items-center justify-center rounded-md border border-transparent text-foreground/60 transition-all duration-150 hover:border-border/70 hover:bg-muted/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 active:scale-[0.97]"

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    const layout = previewRef.current?.closest("[data-docs-layout]")
    const leftColumn = layout?.querySelector<HTMLElement>("[data-docs-left-column]")
    const rightColumn = layout?.querySelector<HTMLElement>("[data-docs-right-column]")
    const previewShell = layout?.querySelector<HTMLElement>("[data-docs-preview-shell]")

    if (!leftColumn || !rightColumn || !previewShell) return

    // Set up transitions and base styles
    const easing = "cubic-bezier(0.22, 1, 0.36, 1)"
    leftColumn.style.transition = `flex-basis 420ms ${easing}, max-width 420ms ${easing}, opacity 280ms ease, border-color 220ms ease`
    rightColumn.style.transition = `flex-basis 420ms ${easing}, max-width 420ms ${easing}`
    previewShell.style.transition = `padding 340ms ${easing}`
    leftColumn.style.overflow = "hidden"
    leftColumn.style.minWidth = "0"
    rightColumn.style.minWidth = "0"

    const handleResize = () => {
      const isMobile = window.matchMedia("(max-width: 1023px)").matches

      if (isMobile) {
        // Mobile Logic
        if (isExpanded) {
          leftColumn.style.display = "none"
          rightColumn.style.flex = "1 1 100%"
          previewShell.style.height = "100dvh"
          previewShell.style.padding = "0"
        } else {
          leftColumn.style.display = ""
          rightColumn.style.flex = ""
          previewShell.style.height = ""
          previewShell.style.padding = ""
        }

        // Reset Desktop Specific Styles
        leftColumn.style.maxWidth = ""
        leftColumn.style.opacity = ""
        leftColumn.style.pointerEvents = ""
        leftColumn.style.borderRightColor = ""
        rightColumn.style.maxWidth = ""
      } else {
        // Desktop Logic
        // Reset Mobile Specific Styles
        leftColumn.style.display = ""
        previewShell.style.height = ""

        if (isExpanded) {
          leftColumn.style.flex = "0 0 0%"
          leftColumn.style.maxWidth = "0"
          leftColumn.style.opacity = "0"
          leftColumn.style.pointerEvents = "none"
          leftColumn.style.borderRightColor = "transparent"
          rightColumn.style.flex = "1 1 100%"
          rightColumn.style.maxWidth = "100%"
          previewShell.style.paddingLeft = "1rem"
          previewShell.style.paddingRight = "1rem"
        } else {
          leftColumn.style.flex = "0 0 50%"
          leftColumn.style.maxWidth = "50%"
          leftColumn.style.opacity = ""
          leftColumn.style.pointerEvents = ""
          leftColumn.style.borderRightColor = ""
          rightColumn.style.flex = "1 1 50%"
          rightColumn.style.maxWidth = "50%"
          previewShell.style.paddingLeft = ""
          previewShell.style.paddingRight = ""
        }
      }
    }

    // Initial call
    handleResize()

    // Add listener
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)

      // Cleanup
      leftColumn.style.display = ""
      leftColumn.style.flex = ""
      leftColumn.style.maxWidth = ""
      leftColumn.style.opacity = ""
      leftColumn.style.pointerEvents = ""
      leftColumn.style.borderRightColor = ""
      leftColumn.style.transition = ""
      leftColumn.style.overflow = ""
      leftColumn.style.minWidth = ""

      rightColumn.style.flex = ""
      rightColumn.style.maxWidth = ""
      rightColumn.style.transition = ""
      rightColumn.style.minWidth = ""

      previewShell.style.paddingLeft = ""
      previewShell.style.paddingRight = ""
      previewShell.style.padding = ""
      previewShell.style.height = ""
      previewShell.style.transition = ""
    }
  }, [isExpanded])

  return (
    <div className={cn(
      "relative w-full h-full rounded-xl lg:rounded-2xl border border-border/50 overflow-hidden bg-white dark:bg-[#191919] flex flex-col"
    )} ref={previewRef}>
      {/* Toolbar */}
      <div className="absolute top-4 right-4 z-20">
        <div className="flex items-center gap-0.5 rounded-lg border border-border/70 bg-white/95 dark:bg-[#191919] px-1 py-1">
          {/* Search */}
          <CommandMenu
            trigger={
              <button className={iconButtonClass} aria-label="Search">
                <Search className="w-4 h-4" />
              </button>
            }
          />

          {/* View Source */}
          {sourceCodeContent && (
            <button
              onClick={() => {
                setShowSource(true)
                setShowPersonalize(false)
              }}
              className={cn(
                iconButtonClass,
                showSource && "border-primary/30 bg-primary/90 text-primary-foreground"
              )}
              aria-label="View Source"
            >
              <CodeXml className="w-4 h-4" />
            </button>
          )}

          {/* Personalize */}
          {personalizeContent && (
            <button
              onClick={() => {
                setShowPersonalize(true)
                setShowSource(false)
              }}
              className={cn(
                iconButtonClass,
                showPersonalize && "border-primary/30 bg-primary/90 text-primary-foreground"
              )}
              aria-label="Personalize"
            >
              <Settings2 className="w-4 h-4" />
            </button>
          )}

          {/* Reload */}
          <button
            onClick={() => setKey(k => k + 1)}
            className={iconButtonClass}
            aria-label="Reload preview"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Expand Preview Pane */}
          <button
            onClick={() => setIsExpanded(prev => !prev)}
            className={iconButtonClass}
            aria-label={isExpanded ? "Collapse preview pane" : "Expand preview pane"}
          >
            {isExpanded ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          {/* Theme */}
          <div className="[&_button]:h-7 [&_button]:w-7 [&_button]:rounded-md [&_button]:border [&_button]:border-transparent [&_button]:text-foreground/60 [&_button]:transition-all [&_button]:duration-150 hover:[&_button]:border-border/70 hover:[&_button]:bg-muted/70 hover:[&_button]:text-foreground [&_button]:focus-visible:outline-none [&_button]:focus-visible:ring-2 [&_button]:focus-visible:ring-ring/40">
            <ThemeToggle className="inline-flex items-center justify-center" />
          </div>
        </div>
      </div>

      <div className={cn(
        "w-full overflow-auto flex bg-white dark:bg-[#191919] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
        "h-full",
        !fullWidthPreview && "items-center justify-center"
      )}>
        <div
          className={cn(
            "w-full",
            (resolvedActiveVariant >= 0 && variants[resolvedActiveVariant]?.fullWidth) || fullWidthPreview
              ? "h-full"
              : "flex items-center justify-center"
          )}
        >
          <div key={key} className="w-full h-full flex items-center justify-center">
            {resolvedActiveVariant === -1 ? children : variants[resolvedActiveVariant]?.preview}
          </div>
        </div>
      </div>

      {/* Bottom Variant Bar */}
      {variants.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 z-10 h-14 flex items-center">
          <div
            ref={variantBarRef}
            className="flex items-center gap-1.5 px-3 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {!hideDefaultVariant && (
              <button
                onClick={() => setActiveVariant(-1)}
                className={cn(
                  "shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border",
                  resolvedActiveVariant === -1
                    ? "bg-foreground text-background border-foreground shadow-sm"
                    : "bg-white/90 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-400 border-zinc-200/80 dark:border-zinc-700/80 hover:text-zinc-900 dark:hover:text-zinc-100 backdrop-blur-sm shadow-sm"
                )}
              >
                <span className={cn(
                  "w-1.5 h-1.5 rounded-full transition-colors",
                  resolvedActiveVariant === -1 ? "bg-background" : "bg-zinc-400 dark:bg-zinc-500"
                )} />
                Default
              </button>
            )}

            {/* Variant pills */}
            {variants.map((variant, i) => (
              <button
                key={i}
                onClick={() => setActiveVariant(i)}
                className={cn(
                  "shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border",
                  resolvedActiveVariant === i
                    ? "bg-foreground text-background border-foreground shadow-sm"
                    : "bg-white/90 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-400 border-zinc-200/80 dark:border-zinc-700/80 hover:text-zinc-900 dark:hover:text-zinc-100 backdrop-blur-sm shadow-sm"
                )}
              >
                <span className={cn(
                  "w-1.5 h-1.5 rounded-full transition-colors",
                  resolvedActiveVariant === i ? "bg-background" : "bg-zinc-400 dark:bg-zinc-500"
                )} />
                {variant.title}
              </button>
            ))}
          </div>
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
              <div className="relative h-full bg-[#f3f4f6] dark:bg-[#191919] lg:rounded-2xl overflow-hidden border border-border/20 shadow-2xl pointer-events-auto">
                <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none">
                  <div className="absolute inset-0 h-40 bg-gradient-to-b from-[#f3f4f6] via-[#f3f4f6] to-transparent dark:from-[#191919] dark:via-[#191919] dark:to-transparent backdrop-blur-sm [mask-image:linear-gradient(to_bottom,black_20%,transparent)]" />
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
                  <div className="absolute bottom-0 left-0 right-0 z-10 h-24 bg-gradient-to-t from-[#f3f4f6] via-[#f3f4f6]/80 to-transparent dark:from-[#191919] dark:via-[#191919]/80 dark:to-transparent pointer-events-none backdrop-blur-sm [mask-image:linear-gradient(to_top,black,transparent)]" />
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
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.4 }}
              onDragEnd={(_: unknown, info: PanInfo) => {
                if (info.offset.y > 100 || info.velocity.y > 500) {
                  setShowSource(false)
                }
              }}
              className="fixed bottom-0 left-0 z-50 flex flex-col outline-none h-[80vh] w-full rounded-t-lg border-t border-border/20 bg-transparent shadow-none pointer-events-none lg:top-0 lg:bottom-0 lg:h-screen lg:max-h-screen lg:w-1/2 lg:rounded-none lg:border-none lg:pt-3 lg:pb-3 lg:pl-3 lg:pr-1.5"
            >
              <div className="relative h-full bg-[#f3f4f6] dark:bg-[#191919] lg:rounded-2xl overflow-hidden border border-border/20 shadow-2xl pointer-events-auto">
                {/* Header Overlay */}
                <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none">
                  <div className="absolute inset-0 h-40 bg-gradient-to-b from-[#f3f4f6] via-[#f3f4f6] to-transparent dark:from-[#191919] dark:via-[#191919] dark:to-transparent backdrop-blur-sm [mask-image:linear-gradient(to_bottom,black_20%,transparent)]" />
                  <div className="relative z-10 flex flex-col pointer-events-auto">
                    {/* Drag handle - top edge-to-edge */}
                    <div className="flex items-center justify-center pt-2 pb-1">
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
                          <button
                            onClick={async () => {
                              await navigator.clipboard.writeText(sourceCode)
                              setCopied(true)
                              setTimeout(() => setCopied(false), 2000)
                            }}
                            className="inline-flex items-center justify-center w-7 h-7 rounded-md text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            aria-label={copied ? "Copied" : "Copy code"}
                          >
                            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Code content - full height, hidden scrollbar */}
                <div className="relative h-full min-h-0">
                  {/* Hide line numbers inside drawer */}
                  <style>{`
                    [data-drawer-code] .shiki [data-line]::before {
                      display: none !important;
                    }
                    [data-drawer-code] * {
                      -ms-overflow-style: none !important;
                      scrollbar-width: none !important;
                    }
                    [data-drawer-code] *::-webkit-scrollbar {
                      display: none !important;
                      width: 0 !important;
                      height: 0 !important;
                    }
                  `}</style>
                  {/* Bottom gradient overlay */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 h-24 bg-gradient-to-t from-[#f3f4f6] via-[#f3f4f6]/80 to-transparent dark:from-[#191919] dark:via-[#191919]/80 dark:to-transparent pointer-events-none backdrop-blur-sm [mask-image:linear-gradient(to_top,black,transparent)]" />
                  <div data-drawer-code className="h-full overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&_>_div]:h-full [&_>_div_>_div]:h-full [&_>_div_>_div]:flex [&_>_div_>_div]:flex-col [&_.relative.group]:flex-1 [&_.relative.group]:min-h-0 [&_.relative.group_>_div]:h-full [&_pre]:min-h-full [&_pre]:!pt-24 [&_.relative.group_>_button]:hidden">
                    <div className="h-full w-full [&_>_*]:h-full [&_>_*]:flex [&_>_*]:flex-col [&_>_*_>_*]:border-none [&_>_*_>_*]:rounded-none [&_>_*_>_*]:bg-transparent">
                      {sourceCodeContent}
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
