"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { cn } from "@/lib/utils"
import { RotateCcw, Search, Settings2, X, Check, Maximize, Minimize, Code } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { CommandMenu } from "@/components/command-menu"
import { motion, AnimatePresence } from "framer-motion"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer"

interface DocsPreviewWrapperProps {
  children: React.ReactNode
  fullWidthPreview?: boolean
  sourceCodeContent?: React.ReactNode
}

export function DocsPreviewWrapper({ children, fullWidthPreview, sourceCodeContent }: DocsPreviewWrapperProps) {
  const [key, setKey] = React.useState(0)
  const [showSettings, setShowSettings] = React.useState(false)
  const [showSource, setShowSource] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
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
              <Code className="w-4 h-4" />
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

      <Drawer direction="bottom" open={showSource} onOpenChange={setShowSource}>
        <DrawerContent className="rounded-t-[10px] lg:w-1/2 lg:left-0 lg:right-auto">
          <DrawerHeader className="border-b border-border bg-zinc-50/50 dark:bg-zinc-900/20 px-4 py-3">
            <div className="flex items-center justify-between">
              <DrawerTitle className="font-semibold text-sm">Source Code</DrawerTitle>
              <DrawerClose asChild>
                <button className="p-2 hover:bg-accent rounded-md transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </DrawerClose>
            </div>
            <DrawerDescription className="sr-only">
              View the source code for this component.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex-1 overflow-auto p-0">
            {sourceCodeContent}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
