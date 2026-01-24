"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function TableOfContents(): React.JSX.Element | null {
  const pathname = usePathname()
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    // Helper to generate IDs
    const slugify = (text: string) =>
      text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "")

    // 1. Select elements that look like section titles
    // - Existing data attributes
    // - The specific "label" styling used in docs (div or p tags only to avoid links)
    const selectors = [
      "[data-section-title]",
      "div.text-xs.uppercase.tracking-widest.text-muted-foreground",
      "p.text-xs.uppercase.tracking-widest.text-muted-foreground",
    ]

    const candidateElements = Array.from(document.querySelectorAll(selectors.join(",")))

    const items: { id: string; text: string }[] = []
    const observedElements: Element[] = []

    candidateElements.forEach((elem) => {
      // Avoid processing the TOC's own header if it happens to match (it does!)
      if (elem.closest("aside")) return

      // Determine text content
      let text = elem.getAttribute("data-section-title") || elem.textContent || ""
      text = text.trim()
      if (!text) return

      // Determine the target element that should have the ID
      // If it's the "label" style, the ID should usually be on the parent container 
      // to handle scroll offset correctly (especially for the grid layouts).
      let target: Element = elem
      if (!elem.hasAttribute("data-section-title")) {
        // If it's a label inside a grid or stack, try to use the parent
        if (elem.parentElement) {
          target = elem.parentElement
        }
      }

      // Determine or Generate ID
      let id = target.id
      if (!id) {
        id = slugify(text)
        // Ensure uniqueness
        if (document.getElementById(id) && document.getElementById(id) !== target) {
          let counter = 1
          while (document.getElementById(`${id}-${counter}`)) {
            counter++
          }
          id = `${id}-${counter}`
        }
        target.id = id
      }

      // Add to list if not already added
      if (!items.find((item) => item.id === id)) {
        items.push({ id, text })
        observedElements.push(target)
      }
    })

    setHeadings(items)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-20% 0% -35% 0%" }
    )

    observedElements.forEach((elem) => observer.observe(elem))

    return () => observer.disconnect()
  }, [pathname])

  return (
    <aside className="w-56 shrink-0 hidden xl:block">
      {headings.length > 0 && (
        <div className="sticky top-14 h-[calc(100svh-3.5rem)] overflow-y-auto pl-6 pr-4 py-10">
          {/* Header with accent color matching c15t */}
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1 w-1 rounded-full bg-cyan-500" />
            <p className="font-medium text-xs text-muted-foreground uppercase tracking-wider">
              On This Page
            </p>
          </div>

          {/* Navigation with vertical line */}
          <nav className="relative flex flex-col gap-0.5">
            {/* Vertical line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border/50" />

            {headings.map((heading) => {
              const isActive = activeId === heading.id
              return (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className={`
                    relative text-xs transition-all duration-200 block py-1.5 pl-4
                    ${isActive
                      ? "text-cyan-500 font-medium"
                      : "text-muted-foreground hover:text-foreground"
                    }
                  `}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(heading.id)?.scrollIntoView({
                      behavior: "smooth",
                    })
                    setActiveId(heading.id)
                  }}
                >
                  {/* Active indicator line */}
                  <span
                    className={`
                      absolute left-0 top-1/2 -translate-y-1/2 h-4 w-0.5 rounded-full transition-all duration-200
                      ${isActive ? "bg-cyan-500" : "bg-transparent"}
                    `}
                  />
                  {heading.text}
                </a>
              )
            })}
          </nav>
        </div>
      )}
    </aside>
  )
}
