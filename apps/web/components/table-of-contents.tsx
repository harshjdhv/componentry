"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"

interface TocHeading {
  id: string
  text: string
  level: number // 2 for h2/section, 3 for h3/subsection
}

export function TableOfContents(): React.JSX.Element | null {
  const pathname = usePathname()
  const [headings, setHeadings] = useState<TocHeading[]>([])
  const [activeId, setActiveId] = useState<string>("")
  const navRef = useRef<HTMLElement>(null)
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 32 })

  // Refs to prevent scroll handler from fighting with click navigation
  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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

    const handleScroll = () => {
      // Skip scroll updates when we're programmatically scrolling after a click
      if (isScrollingRef.current) return

      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight

      // Check if we're at the bottom of the page
      if (scrollY + windowHeight >= docHeight - 50) {
        const lastItem = items[items.length - 1]
        if (lastItem) {
          setActiveId(lastItem.id)
          return
        }
      }

      // Find the current active section
      // We look for the last section that has its top position above (or close to) the viewport top
      // 100px offset provides a comfortable "read ahead" buffer and accounts for the sticky header
      const offset = 100
      let currentId = ""

      for (const item of items) {
        const element = document.getElementById(item.id)
        if (!element) continue

        const rect = element.getBoundingClientRect()

        // If the section header is above the threshold line
        if (rect.top < offset) {
          currentId = item.id
        } else {
          // Since items are sorted by position, once we find a header below the line,
          // we know all subsequent headers are also below.
          break
        }
      }

      setActiveId(currentId)
    }

    // Throttle the scroll event
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", onScroll)
    // Initial check to set active state on load
    handleScroll()

    return () => {
      window.removeEventListener("scroll", onScroll)
      // Clean up timeout on unmount
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [pathname])

  // Update indicator position when activeId changes
  useEffect(() => {
    if (!activeId || !navRef.current) return

    const activeLink = navRef.current.querySelector(`a[href="#${activeId}"]`) as HTMLElement
    if (activeLink) {
      setIndicatorStyle({
        top: activeLink.offsetTop,
        height: activeLink.offsetHeight,
      })
    }
  }, [activeId, headings])

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

            {/* Navigation with custom track */}
            <nav ref={navRef} className="relative flex flex-col">
              {/* Single animated active indicator - moves directly without intermediate stops */}
              {activeId && (() => {
                const activeIndex = headings.findIndex(h => h.id === activeId)
                if (activeIndex === -1) return null

                const activeHeading = headings[activeIndex]
                if (!activeHeading) return null

                const isSubsection = activeHeading.level === 3
                const prevHeading = headings[activeIndex - 1]
                const prevLevel = prevHeading ? prevHeading.level : activeHeading.level

                const startX = prevLevel === 3 ? 12.5 : 0.5
                const currentX = isSubsection ? 12.5 : 0.5
                const effectiveStartX = activeIndex === 0 ? currentX : startX

                const pathD = `
                  M ${effectiveStartX} 0 
                  C ${effectiveStartX} 25 ${currentX} 25 ${currentX} 50 
                  L ${currentX} 100
                `

                return (
                  <motion.div
                    className="absolute left-0 w-4 pointer-events-none"
                    initial={false}
                    animate={{
                      top: indicatorStyle.top,
                      height: indicatorStyle.height,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 30,
                    }}
                  >
                    <svg
                      className="w-full h-full text-cyan-500"
                      viewBox="0 0 16 100"
                      preserveAspectRatio="none"
                    >
                      <motion.path
                        d={pathD}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        className="drop-shadow-[0_0_4px_rgba(6,182,212,0.6)]"
                        initial={false}
                        animate={{ d: pathD }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 30,
                        }}
                      />
                    </svg>
                  </motion.div>
                )
              })()}

              {headings.map((heading, index) => {
                const isActive = activeId === heading.id
                const isSubsection = heading.level === 3
                const prevHeading = headings[index - 1]
                const prevLevel = prevHeading ? prevHeading.level : heading.level

                // Track curve calculation
                const startX = prevLevel === 3 ? 12.5 : 0.5
                const currentX = isSubsection ? 12.5 : 0.5
                const effectiveStartX = index === 0 ? currentX : startX

                const pathD = `
                  M ${effectiveStartX} 0 
                  C ${effectiveStartX} 25 ${currentX} 25 ${currentX} 50 
                  L ${currentX} 100
                `

                return (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className={`
                      relative transition-colors duration-200 block py-1.5 pr-2 text-[13px]
                      ${isSubsection ? "pl-7" : "pl-4"}
                      ${isActive
                        ? "text-cyan-600 dark:text-cyan-400 font-medium"
                        : "text-muted-foreground hover:text-foreground"
                      }
                    `}
                    onClick={(e) => {
                      e.preventDefault()

                      // Lock scroll handler updates during programmatic scroll
                      isScrollingRef.current = true

                      // Clear any existing timeout
                      if (scrollTimeoutRef.current) {
                        clearTimeout(scrollTimeoutRef.current)
                      }

                      // Immediately set the active state for instant feedback
                      setActiveId(heading.id)

                      // Perform smooth scroll
                      document.getElementById(heading.id)?.scrollIntoView({
                        behavior: "smooth",
                      })

                      // Release scroll handler after animation completes (~800ms for smooth scroll)
                      scrollTimeoutRef.current = setTimeout(() => {
                        isScrollingRef.current = false
                      }, 800)
                    }}
                  >
                    {/* Track Container - Background track only */}
                    <div className="absolute left-0 top-0 w-4 h-full pointer-events-none">
                      {/* Background Track */}
                      <svg
                        className="w-full h-full"
                        viewBox="0 0 16 100"
                        preserveAspectRatio="none"
                      >
                        <path
                          d={pathD}
                          fill="none"
                          className="stroke-border/50"
                          strokeWidth="1"
                        />
                      </svg>
                    </div>

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
        <div className="rounded-xl border border-border/50 bg-muted/20 p-4 space-y-3">
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-foreground tracking-tight">
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
            className="group flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-foreground text-background hover:opacity-90 text-xs font-medium transition-all shadow-sm"
          >
            Explore Studio
            <svg
              className="h-3 w-3 opacity-70 group-hover:translate-x-0.5 transition-transform"
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
