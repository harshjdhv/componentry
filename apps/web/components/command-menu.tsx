"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { useRouter } from "next/navigation"
import { Command } from "cmdk"
import { Search, FileText, Hash, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { docsConfig } from "@/config/docs"

export function CommandMenu() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
      if (e.key === "Escape") {
        setOpen(false)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  React.useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
    } else {
      setQuery("")
    }
  }, [open])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group inline-flex items-center gap-2 whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 border border-input/50 hover:border-input hover:bg-accent/50 px-3 py-2 relative h-9 w-full justify-start rounded-lg bg-muted/30 text-sm font-normal text-muted-foreground sm:pr-12 md:w-40 lg:w-56"
      >
        <Search className="h-4 w-4 opacity-50 group-hover:opacity-70 transition-opacity" />
        <span className="hidden lg:inline-flex">Search...</span>
        <span className="inline-flex lg:hidden">Search</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-0.5 rounded-md border bg-background/80 px-1.5 font-mono text-[10px] font-medium text-muted-foreground/70 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {typeof document !== "undefined" && ReactDOM.createPortal(
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                onClick={() => setOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ 
                  duration: 0.2,
                  ease: [0.32, 0.72, 0, 1]
                }}
                className="fixed left-1/2 top-1/2 z-50 w-full max-w-[680px] -translate-x-1/2 -translate-y-1/2 p-4"
              >
              <Command
                label="Spotlight Search"
                className="overflow-hidden rounded-2xl border border-border/50 bg-popover/95 backdrop-blur-xl shadow-2xl shadow-black/20"
                shouldFilter={true}
              >
                <div className="flex items-center gap-3 border-b border-border/50 px-4 py-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/5">
                    <Search className="h-4 w-4 text-primary" />
                  </div>
                  <Command.Input
                    ref={inputRef}
                    value={query}
                    onValueChange={setQuery}
                    placeholder="Search documentation..."
                    className="flex-1 bg-transparent text-base font-normal outline-none placeholder:text-muted-foreground/60"
                    autoFocus
                  />
                  {query && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      onClick={() => setQuery("")}
                      className="rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      Clear
                    </motion.button>
                  )}
                  <kbd className="hidden sm:inline-flex h-6 items-center gap-1 rounded-md border bg-muted/50 px-2 font-mono text-[10px] font-medium text-muted-foreground">
                    ESC
                  </kbd>
                </div>

                <Command.List className="max-h-[400px] overflow-y-auto overscroll-contain p-2">
                  <Command.Empty className="flex flex-col items-center justify-center py-14 text-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted/50">
                      <Search className="h-5 w-5 text-muted-foreground/50" />
                    </div>
                    <p className="text-sm text-muted-foreground">No results found</p>
                    <p className="text-xs text-muted-foreground/60">Try searching for something else</p>
                  </Command.Empty>

                  {docsConfig.nav.map((group) => (
                    <Command.Group 
                      key={group.title} 
                      heading={group.title}
                      className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground/60"
                    >
                      {group.items.map((navItem) => (
                        <Command.Item
                          key={navItem.href}
                          value={`${group.title} ${navItem.title}`}
                          onSelect={() => {
                            runCommand(() => router.push(navItem.href))
                          }}
                          className="group/item relative flex cursor-pointer select-none items-center gap-3 rounded-xl px-3 py-2.5 text-sm outline-none transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground group-aria-selected/item:bg-primary/10 group-aria-selected/item:text-primary transition-colors">
                            {group.title === "Getting Started" ? (
                              <FileText className="h-4 w-4" />
                            ) : (
                              <Hash className="h-4 w-4" />
                            )}
                          </div>
                          <div className="flex flex-1 flex-col gap-0.5">
                            <span className="font-medium">{navItem.title}</span>
                            <span className="text-xs text-muted-foreground/60">{group.title}</span>
                          </div>
                          <ArrowRight className="h-4 w-4 opacity-0 transition-all group-aria-selected/item:opacity-100 group-aria-selected/item:translate-x-0 -translate-x-2 text-muted-foreground" />
                        </Command.Item>
                      ))}
                    </Command.Group>
                  ))}
                </Command.List>

                <div className="flex items-center justify-between border-t border-border/50 bg-muted/30 px-4 py-2.5">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground/60">
                    <span className="flex items-center gap-1.5">
                      <kbd className="rounded border bg-background/80 px-1.5 py-0.5 font-mono text-[10px]">↑↓</kbd>
                      Navigate
                    </span>
                    <span className="flex items-center gap-1.5">
                      <kbd className="rounded border bg-background/80 px-1.5 py-0.5 font-mono text-[10px]">↵</kbd>
                      Select
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground/40">Componentry</span>
                </div>
              </Command>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
