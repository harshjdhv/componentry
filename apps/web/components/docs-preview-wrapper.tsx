"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { cn } from "@/lib/utils"
import { RotateCcw, Search, Settings2, X, Check, Maximize, Minimize, CodeXml, ChevronLeft, Copy } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { CommandMenu } from "@/components/command-menu"
import { motion, AnimatePresence } from "framer-motion"
import {
  Drawer,
  DrawerContent,
  DrawerClose,
} from "@/components/ui/drawer"

interface DocsPreviewWrapperProps {
  children: React.ReactNode
  fullWidthPreview?: boolean
  sourceCodeContent?: React.ReactNode
  sourceCodeFilename?: string
  sourceCode?: string
}

export function DocsPreviewWrapper({ children, fullWidthPreview, sourceCodeContent, sourceCodeFilename, sourceCode }: DocsPreviewWrapperProps) {
  const [key, setKey] = React.useState(0)
  const [showSettings, setShowSettings] = React.useState(false)
  const [showSource, setShowSource] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  const [isExpanded, setIsExpanded] = React.useState(false)
  const previewRef = React.useRef<HTMLDivElement>(null)
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

    const easing = "cubic-bezier(0.22, 1, 0.36, 1)"
    leftColumn.style.transition = `flex-basis 420ms ${easing}, max-width 420ms ${easing}, opacity 280ms ease, border-color 220ms ease`
    rightColumn.style.transition = `flex-basis 420ms ${easing}, max-width 420ms ${easing}`
    previewShell.style.transition = `padding 340ms ${easing}`
    leftColumn.style.overflow = "hidden"
    leftColumn.style.minWidth = "0"
    rightColumn.style.minWidth = "0"

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

    return () => {
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
      previewShell.style.transition = ""
    }
  }, [isExpanded])

  return (
    <div className={cn(
      "relative w-full h-full rounded-xl lg:rounded-2xl border border-border/50 overflow-hidden bg-white dark:bg-[#121212] flex flex-col"
    )} ref={previewRef}>
      {/* Toolbar */}
      <div className="absolute top-4 right-4 z-20">
        <div className="flex items-center gap-0.5 rounded-lg border border-border/70 bg-white/95 dark:bg-[#121212] px-1 py-1">
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
              onClick={() => setShowSource(true)}
              className={cn(
                iconButtonClass,
                showSource && "border-primary/30 bg-primary/90 text-primary-foreground"
              )}
              aria-label="View Source"
            >
              <CodeXml className="w-4 h-4" />
            </button>
          )}

          {/* Settings */}
          <button
            onClick={() => setShowSettings(true)}
            className={cn(
              iconButtonClass,
              showSettings && "border-primary/30 bg-primary/90 text-primary-foreground"
            )}
            aria-label="Code Style"
          >
            <Settings2 className="w-4 h-4" />
          </button>

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

      {/* Content Area */}
      <div className={cn(
        "w-full h-full overflow-auto flex bg-white dark:bg-[#121212]",
        !fullWidthPreview && "items-center justify-center"
      )}>
        <div key={key} className={cn(
          "w-full",
          fullWidthPreview ? "h-full" : "p-10 flex items-center justify-center"
        )}>
          {children}
        </div>
      </div>

      {/* Settings Drawer Portal */}
      {mounted && ReactDOM.createPortal(
        <AnimatePresence>
          {showSettings && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-sm"
                onClick={() => setShowSettings(false)}
              />

              {/* Drawer */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="fixed left-0 top-0 bottom-0 z-[101] w-80 bg-background border-r border-border shadow-2xl flex flex-col"
              >
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h2 className="font-semibold text-sm">Code Style</h2>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="p-2 hover:bg-accent rounded-md transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 space-y-6">
                  <div className="space-y-3">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Appearance</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="flex items-center gap-2 p-2 rounded-md border border-primary bg-primary/5 text-primary text-sm font-medium">
                        <div className="w-4 h-4 rounded-full border border-current bg-background flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-current" />
                        </div>
                        Default
                      </button>
                      <button className="flex items-center gap-2 p-2 rounded-md border border-border hover:border-border/80 hover:bg-accent/50 text-muted-foreground text-sm font-medium transition-colors">
                        <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center" />
                        Minimal
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Density</label>
                    <div className="space-y-1">
                      {['Comfortable', 'Compact'].map((option) => (
                        <button key={option} className="flex w-full items-center justify-between p-2 rounded-md hover:bg-accent transition-colors text-sm">
                          <span>{option}</span>
                          {option === 'Comfortable' && <Check className="w-4 h-4" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}

      <Drawer direction="bottom" open={showSource} onOpenChange={setShowSource} modal={false}>
        <DrawerContent className="fixed bottom-0 left-0 z-50 flex flex-col outline-none lg:!h-screen lg:!max-h-screen lg:top-0 lg:!mt-0 lg:w-1/2 lg:rounded-none lg:border-none border-border/20 bg-transparent shadow-none lg:pt-3 lg:pb-0 lg:pl-3 lg:pr-1.5 [&>div[data-slot=drawer-overlay]]:hidden">
          <div className="flex flex-col h-full bg-[#121212] lg:rounded-t-2xl lg:rounded-b-none overflow-hidden border-t border-x border-border/20 border-b-0 shadow-2xl">
            {/* Drag handle - top edge-to-edge */}
            <div className="flex-none flex items-center justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-white/[0.08] transition-colors hover:bg-white/[0.15]" />
            </div>

            {/* Header row */}
            <div className="flex-none flex items-center justify-between px-4 py-2.5">
              <DrawerClose asChild>
                <button className="inline-flex items-center gap-1.5 text-zinc-400 transition-colors hover:text-white focus-visible:outline-none">
                  <ChevronLeft className="w-4 h-4" />
                  <span className="text-xs font-mono tracking-wide">Source Code</span>
                </button>
              </DrawerClose>

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
                    className="inline-flex items-center justify-center w-7 h-7 rounded-md text-zinc-500 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    aria-label={copied ? "Copied" : "Copy code"}
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                )}
              </div>
            </div>

            {/* Code content - full height, hidden scrollbar */}
            <div className="relative flex-1 min-h-0">
              {/* Top gradient overlay */}
              <div className="absolute top-0 left-0 right-0 z-10 h-16 bg-gradient-to-b from-[#121212] via-[#121212]/80 to-transparent pointer-events-none" />
              {/* Hide line numbers inside drawer */}
              <style>{`
                [data-drawer-code] .shiki [data-line]::before {
                  display: none !important;
                }
              `}</style>
              {/* Bottom gradient overlay */}
              <div className="absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-[#121212] via-[#121212]/80 to-transparent pointer-events-none backdrop-blur-[2px] [mask-image:linear-gradient(to_top,black,transparent)]" />
              <div data-drawer-code className="h-full overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&_>_div]:h-full [&_>_div_>_div]:h-full [&_>_div_>_div]:flex [&_>_div_>_div]:flex-col [&_.relative.group]:flex-1 [&_.relative.group]:min-h-0 [&_.relative.group_>_div]:h-full [&_pre]:min-h-full [&_.relative.group_>_button]:hidden">
                <div className="h-full w-full [&_>_*]:h-full [&_>_*]:flex [&_>_*]:flex-col [&_>_*_>_*]:border-none [&_>_*_>_*]:rounded-none [&_>_*_>_*]:bg-transparent">
                  {sourceCodeContent}
                </div>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
