"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { RotateCcw, Search } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { CommandMenu } from "@/components/command-menu"

interface DocsPreviewWrapperProps {
  children: React.ReactNode
  fullWidthPreview?: boolean
}

export function DocsPreviewWrapper({ children, fullWidthPreview }: DocsPreviewWrapperProps) {
  const [key, setKey] = React.useState(0)

  return (
    <div className={cn(
      "relative w-full h-full rounded-2xl lg:rounded-[2rem] border border-border/50 shadow-2xl overflow-hidden bg-background flex flex-col",
    )}>
      {/* Toolbar */}
      <div className="absolute top-6 right-6 z-20 flex gap-2">
        <div className="bg-background/80 backdrop-blur-md border border-border/50 rounded-full p-1.5 flex items-center gap-1 shadow-sm">
          {/* Search */}
          <CommandMenu 
            trigger={
              <button className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground text-muted-foreground transition-colors group relative" aria-label="Search">
                <Search className="w-4 h-4" />
              </button>
            } 
          />
          
          <div className="w-px h-4 bg-border/60 mx-1" />

          {/* Reload */}
          <button 
            onClick={() => setKey(k => k + 1)}
            className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground text-muted-foreground transition-colors"
            aria-label="Reload preview"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="w-px h-4 bg-border/60 mx-1" />

          {/* Theme */}
          <div className="[&_button]:rounded-full [&_button]:p-2">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className={cn(
        "w-full h-full overflow-auto flex bg-secondary/20",
        !fullWidthPreview && "items-center justify-center"
      )}>
        <div key={key} className={cn(
          "w-full",
          fullWidthPreview ? "h-full" : "p-10 flex items-center justify-center"
        )}>
          {children}
        </div>
      </div>
    </div>
  )
}
