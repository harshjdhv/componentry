"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"

interface TocItem {
  id: string
  title: string
  /** 2 for a section, 3 for a subsection (indented). From `data-section-depth`. */
  depth: number
}

/** Fixed header height plus breathing room, used for both scroll targets and the active line. */
const HEADER_OFFSET = 57 + 24

/**
 * "On this page" list for the right rail. The rail lives in the persistent docs
 * shell, so it reads the current page's sections from the DOM: every <Section>
 * (and the preview) renders `id` + `data-section-title`. It re-reads on
 * navigation and when streamed content lands, and highlights the section whose
 * heading last passed under the header. Elements with `data-section-depth="3"`
 * are listed as indented subsections.
 */
export function DocsToc({ className }: { className?: string }) {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const [items, setItems] = React.useState<TocItem[]>([])
  const [activeId, setActiveId] = React.useState<string | null>(null)
  // While a click-scroll is in flight, keep the clicked item active instead of
  // letting the scroll handler flick through every section it passes.
  const lockUntil = React.useRef(0)

  // Collect sections for the current page.
  React.useEffect(() => {
    const content = document.querySelector("[data-docs-inset-content]")
    if (!content) return

    let frame = 0
    const collect = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const next = Array.from(content.querySelectorAll<HTMLElement>("[data-section-title][id]")).map(
          (element) => ({
            id: element.id,
            title: element.dataset.sectionTitle ?? element.id,
            depth: Number(element.dataset.sectionDepth ?? 2),
          })
        )
        setItems((prev) =>
          prev.length === next.length && prev.every((item, i) => item.id === next[i]!.id && item.title === next[i]!.title && item.depth === next[i]!.depth)
            ? prev
            : next
        )
      })
    }

    collect()
    const observer = new MutationObserver(collect)
    observer.observe(content, { childList: true, subtree: true })
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [pathname])

  // Track the active section from the window scroll.
  React.useEffect(() => {
    if (items.length === 0) return

    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (performance.now() < lockUntil.current) return
        const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
        let current = items[0]!.id
        for (const item of items) {
          const element = document.getElementById(item.id)
          if (element && element.getBoundingClientRect().top <= HEADER_OFFSET + 40) current = item.id
        }
        setActiveId(atBottom ? items[items.length - 1]!.id : current)
      })
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
      cancelAnimationFrame(frame)
    }
  }, [items])

  if (items.length < 2) return null

  const jump = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const element = document.getElementById(id)
    if (!element || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
    event.preventDefault()
    setActiveId(id)
    lockUntil.current = performance.now() + (reduceMotion ? 0 : 700)
    window.scrollTo({
      top: element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET,
      behavior: reduceMotion ? "auto" : "smooth",
    })
    history.replaceState(null, "", `#${id}`)
  }

  // Plain list: subsections step in, and only colour marks the current item so
  // nothing shifts or reflows.
  return (
    <nav aria-label="On this page" className={cn("text-sm", className)}>
      {/* Same label style as the left sidebar's group headings. */}
      <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">On this page</p>
      <ul className="flex flex-col gap-1">
        {items.map((item) => {
          const active = item.id === activeId
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(event) => jump(event, item.id)}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "block text-[0.8rem] leading-5 transition-colors duration-150",
                  item.depth >= 3 && "pl-3",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.title}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
