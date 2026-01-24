"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"

interface TocHeading {
  id: string
  text: string
  level: number // 2 for h2/section, 3 for h3/subsection
}

export function TableOfContents(): React.JSX.Element | null {
  const pathname = usePathname()
  const [headings, setHeadings] = useState<TocHeading[]>([])
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

    // Select section titles (h2) and subsection titles (h3)
    const sectionSelectors = [
      "[data-section-title]",
      "div.text-xs.uppercase.tracking-widest.text-muted-foreground",
      "p.text-xs.uppercase.tracking-widest.text-muted-foreground",
    ]

    // Also find h3 elements for sub-sections
    const h3Selector = "main h3"

    const sectionElements = Array.from(document.querySelectorAll(sectionSelectors.join(",")))
    const h3Elements = Array.from(document.querySelectorAll(h3Selector))

    const items: TocHeading[] = []
    const observedElements: Element[] = []

    // Process section titles (level 2)
    sectionElements.forEach((elem) => {
      // Avoid processing the TOC's own header if it happens to match
      if (elem.closest("aside")) return

      // Determine text content
      let text = elem.getAttribute("data-section-title") || elem.textContent || ""
      text = text.trim()
      if (!text) return

      // Determine the target element that should have the ID
      let target: Element = elem
      if (!elem.hasAttribute("data-section-title")) {
        if (elem.parentElement) {
          target = elem.parentElement
        }
      }

      // Determine or Generate ID
      let id = target.id
      if (!id) {
        id = slugify(text)
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
        items.push({ id, text, level: 2 })
        observedElements.push(target)
      }
    })

    // Process h3 elements (level 3 - subsections)
    h3Elements.forEach((elem) => {
      // Avoid processing the TOC's own elements
      if (elem.closest("aside")) return

      let text = elem.textContent || ""
      text = text.trim()
      if (!text) return

      // Determine or Generate ID
      let id = elem.id
      if (!id) {
        id = slugify(text)
        if (document.getElementById(id) && document.getElementById(id) !== elem) {
          let counter = 1
          while (document.getElementById(`${id}-${counter}`)) {
            counter++
          }
          id = `${id}-${counter}`
        }
        elem.id = id
      }

      // Add to list if not already added
      if (!items.find((item) => item.id === id)) {
        items.push({ id, text, level: 3 })
        observedElements.push(elem)
      }
    })

    // Sort items by their position in the document
    items.sort((a, b) => {
      const elemA = document.getElementById(a.id)
      const elemB = document.getElementById(b.id)
      if (!elemA || !elemB) return 0
      return elemA.compareDocumentPosition(elemB) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
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
    <aside className="w-64 shrink-0 hidden xl:block border-l border-border/50">
      <div className="sticky top-14 h-[calc(100svh-3.5rem)] overflow-y-auto pl-6 pr-4 py-10 flex flex-col">
        {headings.length > 0 && (
          <div className="flex-1">
            {/* Header with accent color */}
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
                const isSubsection = heading.level === 3

                return (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className={`
                      relative text-xs transition-all duration-200 block py-1.5
                      ${isSubsection ? "pl-7" : "pl-4"}
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

        {/* Spacer */}
        <div className="mt-auto pt-6" />

        {/* CTA Card */}
        <div className="rounded-xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 p-4 space-y-3">
          <div className="space-y-1.5">
            <h4 className="text-sm font-semibold text-foreground">
              Need custom components?
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Get bespoke UI components & stunning websites tailored for your brand.
            </p>
          </div>
          <Link
            href="https://studio.componentry.fun"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-white text-xs font-medium text-center transition-all duration-200 shadow-lg shadow-cyan-500/20"
          >
            Explore Studio
            <svg
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </aside>
  )
}
