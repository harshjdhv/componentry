"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { docsConfig } from "@/config/docs"

// Pre-compute static data outside component
const navGroups = docsConfig.nav

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
    activeHref
  }: {
    title: string
    items: readonly { title: string; href: string }[]
    activeHref: string | null
  }) {
    return (
      <div className="sidebar-group">
        {/* Group header */}
        <div
          className="w-full flex items-center justify-between py-1.5 px-2 rounded-md text-sm font-semibold text-foreground mb-1"
        >
          <span>{title}</span>
        </div>

        {/* Items container */}
        <div className="sidebar-items-container">
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
    )
  },
  (prev, next) =>
    prev.activeHref === next.activeHref &&
    prev.title === next.title
)

export function DocsSidebar() {
  const pathname = usePathname()

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
    <aside className="w-64 shrink-0 border-r border-border/50 hidden md:block bg-white/50 dark:bg-[#111]/50">
      <div className="sticky top-14 h-[calc(100svh-3.5rem)] overflow-y-auto px-4 py-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <nav className="space-y-6">
          {navGroups.map((group) => (
            <SidebarGroup
              key={group.title}
              title={group.title}
              items={group.items}
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
