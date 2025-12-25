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

  if (headings.length === 0) return null

  return (
    <aside className="w-56 shrink-0 hidden xl:block">
      <div className="sticky top-14 h-[calc(100svh-3.5rem)] overflow-y-auto pl-8 py-10">
        <p className="font-medium text-xs mb-3 text-muted-foreground/70 uppercase tracking-wider">On This Page</p>
        <nav className="flex flex-col gap-0.5">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={`
                text-xs transition-colors block py-1
                ${
                  activeId === heading.id
                    ? "text-foreground font-medium"
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
              {heading.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  )
}
