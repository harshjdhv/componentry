import type React from "react"

import { FloatingDocsSidebarLazy } from "@/components/floating-docs-sidebar-lazy"
import { SiteHeader } from "@/components/site-header"
import { DocsInsetSidebar } from "./docs-inset-sidebar"
import { DocsInsetRail } from "./docs-inset-rail"

/**
 * Persistent frame for component docs: header, component list, content and the
 * right column, all on one continuous surface. Mounted once from the route layout, so navigating
 * between components keeps the sidebar's scroll and lets the active pill glide.
 *
 * The window scrolls, so the scrollbar sits at the far right edge. Side columns
 * are fixed.
 */
export function DocsInsetShell({ children }: { children: React.ReactNode }) {
  return (
    <div data-docs-inset className="min-h-svh w-full bg-docs-surface">
      <SiteHeader inset sidebarToggle={<FloatingDocsSidebarLazy />} />

      <DocsInsetSidebar className="fixed top-[57px] bottom-0 left-0 z-[36] hidden border-r border-line lg:flex" />

      {/* Not <main>: app/docs/layout.tsx already provides it. */}
      <div data-docs-inset-content className="min-w-0 pt-[57px] lg:pl-64 xl:pr-[296px]">
        <div className="min-h-[calc(100svh-57px)]">
          <div className="mx-auto w-full max-w-[1120px] px-5 pt-8 pb-24 sm:px-8 lg:px-10 lg:pt-10">
            {children}
          </div>
        </div>
      </div>

      <DocsInsetRail className="fixed top-[57px] bottom-0 right-0 z-[36] hidden xl:block" />
    </div>
  )
}
