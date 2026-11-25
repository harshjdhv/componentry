import type React from "react"

import { FloatingDocsSidebarLazy } from "@/components/floating-docs-sidebar-lazy"
import { SiteHeader } from "@/components/site-header"
import { DocsInsetSidebar } from "./docs-inset-sidebar"
import { DocsInsetRail } from "./docs-inset-rail"

/**
 * Persistent frame for component docs: header, component list, inset window and
 * "On this page" rail. Mounted once from the route layout, so navigating
 * between components keeps the sidebar's scroll and lets the active pill glide.
 *
 * The window (not the panel) scrolls, so the scrollbar sits at the far right
 * edge. Side columns are fixed; a fixed frame masks the page background over the
 * panel's edges so it still reads as an inset window mid-scroll.
 */
export function DocsInsetShell({ children }: { children: React.ReactNode }) {
  return (
    <div data-docs-inset className="min-h-svh w-full bg-[#f4f4f5] dark:bg-[#0a0a0a]">
      <SiteHeader inset sidebarToggle={<FloatingDocsSidebarLazy />} />

      <DocsInsetSidebar className="fixed top-[57px] bottom-0 left-0 z-[36] hidden lg:flex" />

      {/* Rounded top edge of the inset window; the bottom runs off the viewport so
          content flows out the bottom. Its huge spread shadow paints the page
          background around the rounded rect, hiding content scrolled past it. */}
      <div
        aria-hidden
        className="pointer-events-none fixed top-[65px] -bottom-px left-64 right-2 z-[35] hidden rounded-t-2xl border border-black/[0.06] shadow-[0_0_0_100vmax_#f4f4f5] lg:block xl:right-[296px] dark:border-white/[0.06] dark:shadow-[0_0_0_100vmax_#0a0a0a]"
      />

      {/* Not <main>: app/docs/layout.tsx already provides it. */}
      <div data-docs-inset-content className="min-w-0 pt-[57px] lg:pt-[65px] lg:pr-2 lg:pl-64 xl:pr-[296px]">
        <div className="min-h-[calc(100svh-65px)] bg-white dark:bg-[#111111]">
          <div className="mx-auto w-full max-w-[1120px] px-5 pt-8 pb-24 sm:px-8 lg:px-10 lg:pt-10">
            {children}
          </div>
        </div>
      </div>

      <DocsInsetRail className="fixed top-[57px] bottom-0 right-0 z-[36] hidden xl:block" />
    </div>
  )
}
