"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { docsConfig } from "@/config/docs"
import { ChevronDown, Circle } from "lucide-react"

export function DocsSidebar() {
  const pathname = usePathname()
  const [expandedGroups, setExpandedGroups] = React.useState<Record<string, boolean>>(() => {
    // Initialize all groups as expanded
    const initial: Record<string, boolean> = {}
    docsConfig.nav.forEach((group) => {
      initial[group.title] = true
    })
    return initial
  })

  const toggleGroup = (title: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  return (
    <aside className="w-64 shrink-0 border-r border-border/50 hidden md:block bg-background/50">
      <div className="sticky top-14 h-[calc(100svh-3.5rem)] overflow-y-auto px-4 py-8 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border">
        <nav className="space-y-6">
          {docsConfig.nav.map((group) => {
            const isExpanded = expandedGroups[group.title]
            const hasActiveItem = group.items.some((item) => pathname === item.href)

            return (
              <div key={group.title} className="space-y-1">
                {/* Group header - clickable to expand/collapse */}
                <button
                  onClick={() => toggleGroup(group.title)}
                  className={`w-full flex items-center justify-between py-1.5 px-2 rounded-md text-xs font-medium uppercase tracking-wider transition-colors ${hasActiveItem
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    }`}
                >
                  <span>{group.title}</span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${isExpanded ? "" : "-rotate-90"
                      }`}
                  />
                </button>

                {/* Collapsible items */}
                <div
                  className={`space-y-0.5 overflow-hidden transition-all duration-200 ${isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                  {group.items.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`
                          group relative flex items-center gap-2.5 py-1.5 px-3 ml-2 text-sm rounded-md transition-all duration-200
                          ${isActive
                            ? "bg-accent text-foreground font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                          }
                        `}
                      >
                        {/* Dot indicator */}
                        <Circle
                          className={`h-1.5 w-1.5 transition-all duration-200 ${isActive
                              ? "fill-current text-primary"
                              : "fill-current text-muted-foreground/30 group-hover:text-muted-foreground/60"
                            }`}
                        />
                        <span>{item.title}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </nav>

        {/* Bottom decoration */}
        <div className="mt-8 pt-6 border-t border-border/30">
          <p className="text-[10px] text-muted-foreground/50 uppercase tracking-wider px-2">
            More components coming soon
          </p>
        </div>
      </div>
    </aside>
  )
}
