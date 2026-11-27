"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"
import { docsConfig } from "@/config/docs"
import { components, isNewComponent } from "@/registry"


/** Persistent component list for the inset docs shell. */
export function DocsInsetSidebar({ className }: { className?: string }) {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const navRef = React.useRef<HTMLElement | null>(null)
  const activeRef = React.useRef<HTMLAnchorElement | null>(null)
  const hasMounted = React.useRef(false)
  const [pill, setPill] = React.useState<{ y: number; animate: boolean } | null>(null)

  // Move the pill on click, not when the next page finishes loading, so the
  // list answers immediately. The route catches up and confirms it.
  const [activeHref, setActiveHref] = React.useState(pathname)
  React.useEffect(() => setActiveHref(pathname), [pathname])

  // Pill offset inside the list. Rows no longer hold the pill, so the link's
  // offsetTop is measured from the nav (the positioned scroll container).
  const measure = React.useCallback((animate: boolean) => {
    const link = activeRef.current
    if (!link) return
    setPill({ y: link.offsetTop, animate })
  }, [])

  // Keep the active item in view. First load: jump to center. Afterwards (prev/
  // next arrows, ⌘K), glide only if it's off screen. Scrolls the list alone;
  // scrollIntoView would also move the window, which owns the page scroll.
  React.useLayoutEffect(() => {
    const nav = navRef.current
    const link = activeRef.current
    if (!nav || !link) return
    // One pill for the whole list, moved with a CSS transform. A transform
    // transition runs on the compositor, so it stays smooth while the next page
    // renders; a JS (framer) layout animation stalls on the busy main thread.
    measure(hasMounted.current)

    const centered = link.offsetTop - nav.clientHeight / 2 + link.clientHeight / 2
    if (!hasMounted.current) {
      hasMounted.current = true
      nav.scrollTop = centered
      return
    }
    const top = link.offsetTop - nav.scrollTop
    const outOfView = top < 24 || top + link.clientHeight > nav.clientHeight - 40
    if (outOfView) {
      nav.scrollTo({ top: centered, behavior: reduceMotion ? "auto" : "smooth" })
    }
  }, [activeHref, reduceMotion, measure])

  // Rows can shift after the first measure (web font swap, resize). Re-place
  // the pill without animating so it never visibly drifts.
  React.useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const resync = () => measure(false)
    document.fonts?.ready.then(resync)
    const observer = new ResizeObserver(resync)
    observer.observe(nav)
    return () => observer.disconnect()
  }, [measure])

  return (
    <aside className={cn("flex h-full w-64 shrink-0 flex-col", className)}>
      <nav
        ref={navRef}
        aria-label="Components"
        className="relative min-h-0 flex-1 overflow-y-auto px-3 pt-3 pb-8 [mask-image:linear-gradient(to_bottom,transparent,#000_12px,#000_calc(100%-32px),transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {pill && (
          <span
            aria-hidden
            style={{ transform: `translateY(${pill.y}px)` }}
            className={cn(
              "pointer-events-none absolute top-0 right-3 left-3 h-[30px] rounded-md bg-black/[0.05] will-change-transform dark:bg-white/[0.07]",
              pill.animate && !reduceMotion && "transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
            )}
          />
        )}
        {docsConfig.nav.map((group) => {
          return (
            <div key={group.title} className="pt-5 first:pt-2">
              <h4 className="mb-1 px-2.5 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
                {group.title}
              </h4>
              <ul className="flex flex-col gap-px">
                {group.items.map((item) => {
                  const slug = item.href.split("/").pop()
                  const comp = slug ? components[slug] : undefined
                  const isActive = activeHref === item.href
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        ref={isActive ? activeRef : undefined}
                        aria-current={pathname === item.href ? "page" : undefined}
                        onClick={(event) => {
                          if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
                          setActiveHref(item.href)
                        }}
                        className={cn(
                          "relative flex h-[30px] items-center gap-2 rounded-md px-2.5 text-[14px] leading-none transition-[color,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
                          isActive
                            ? "font-medium text-zinc-950 dark:text-white"
                            : "text-zinc-600 hover:bg-black/[0.03] hover:text-zinc-950 hover:duration-100 dark:text-zinc-300/80 dark:hover:bg-white/[0.03] dark:hover:text-zinc-50"
                        )}
                      >
                        <span className="truncate">{item.title}</span>
                        {comp && isNewComponent(comp) && (
                          <span className="ml-auto shrink-0 rounded-sm px-1.5 py-[3px] text-[10.5px] font-medium leading-none text-emerald-700 bg-emerald-500/10 dark:text-emerald-400">
                            New
                          </span>
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
