"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { docsConfig } from "@/config/docs"
import { ChevronDown } from "lucide-react"

// Pre-compute static data outside component
const navGroups = docsConfig.nav
const initialExpandedState: Record<string, boolean> = {}
for (const group of navGroups) {
  initialExpandedState[group.title] = true
}

// Ultra-optimized sidebar item - no unnecessary re-renders
const SidebarItem = React.memo(
  function SidebarItem({
    title,
    href,
    isActive
  }: {
    title: string
    href: string
    isActive: boolean
  }) {
    return (
      <Link
        href={href}
        className={`
          group relative flex items-center py-1.5 px-3 ml-2 text-sm rounded-md
          ${isActive
            ? "bg-accent text-foreground font-medium"
            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
          }
        `}
      >
        <span>{title}</span>
      </Link>
    )
  },
  (prev, next) => prev.isActive === next.isActive && prev.href === next.href
)

// Optimized group with CSS-only transitions (no JS animation overhead)
const SidebarGroup = React.memo(
  function SidebarGroup({
    title,
    items,
    isExpanded,
    onToggle,
    activeHref
  }: {
    title: string
    items: readonly { title: string; href: string }[]
    isExpanded: boolean
    onToggle: () => void
    activeHref: string | null
  }) {
    // Check if this group has the active item
    const hasActiveItem = activeHref !== null

    return (
      <div className="sidebar-group">
        {/* Group header */}
        <button
          onClick={onToggle}
          className={`
            w-full flex items-center justify-between py-1.5 px-2 rounded-md 
            text-xs font-medium uppercase tracking-wider transition-colors
            ${hasActiveItem
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            }
          `}
        >
          <span>{title}</span>
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-150 ${isExpanded ? "" : "-rotate-90"}`}
          />
        </button>

        {/* Items container - CSS grid for smooth height animation */}
        <div
          className="sidebar-items-container"
          style={{
            display: "grid",
            gridTemplateRows: isExpanded ? "1fr" : "0fr",
            opacity: isExpanded ? 1 : 0,
            transition: "grid-template-rows 150ms ease-out, opacity 150ms ease-out"
          }}
        >
          <div className="overflow-hidden">
            <div className="space-y-0.5 pt-1">
              {items.map((item) => (
                <SidebarItem
                  key={item.href}
                  title={item.title}
                  href={item.href}
                  isActive={activeHref === item.href}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  },
  (prev, next) =>
    prev.isExpanded === next.isExpanded &&
    prev.activeHref === next.activeHref &&
    prev.title === next.title
)

export function DocsSidebar() {
  const pathname = usePathname()

  // Use ref for expanded state to avoid re-renders on toggle
  const [expandedGroups, setExpandedGroups] = React.useState<Record<string, boolean>>(initialExpandedState)

  // Memoize toggle handlers to prevent recreating functions
  const toggleHandlers = React.useMemo(() => {
    const handlers: Record<string, () => void> = {}
    for (const group of navGroups) {
      handlers[group.title] = () => {
        setExpandedGroups((prev) => ({
          ...prev,
          [group.title]: !prev[group.title],
        }))
      }
    }
    return handlers
  }, [])

  // Pre-compute active href per group for minimal prop passing
  const activeHrefByGroup = React.useMemo(() => {
    const result: Record<string, string | null> = {}
    for (const group of navGroups) {
      const activeItem = group.items.find((item) => pathname === item.href)
      result[group.title] = activeItem?.href ?? null
    }
    return result
  }, [pathname])

  return (
    <aside className="w-64 shrink-0 border-r border-border/50 hidden md:block bg-background/50">
      <div className="sticky top-14 h-[calc(100svh-3.5rem)] overflow-y-auto px-4 py-8 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border">
        <nav className="space-y-6">
          {navGroups.map((group) => (
            <SidebarGroup
              key={group.title}
              title={group.title}
              items={group.items}
              isExpanded={!!expandedGroups[group.title]}
              onToggle={toggleHandlers[group.title]!}
              activeHref={activeHrefByGroup[group.title]!}
            />
          ))}
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
