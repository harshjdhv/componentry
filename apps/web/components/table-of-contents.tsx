"use client"

import React from "react"
import { useEffect, useState, useRef, useCallback, useMemo } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"

interface TocHeading {
  id: string
  text: string
  level: number
}

// Generate URL-friendly slug from text
const slugify = (text: string): string =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")

// Memoized CTA Card component - defined outside to prevent recreation
const CTACard = () => (
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
      href="https://x.com/harshjdhv"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-foreground text-background hover:opacity-90 text-xs font-medium transition-all shadow-sm"
    >
      Connect on X
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
)

// TOC Link component - memoized for performance
const TocLink = React.memo(function TocLink({
  heading,
  isActive,
  onClick
}: {
  heading: TocHeading
  isActive: boolean
  onClick: (e: React.MouseEvent, id: string) => void
}) {
  return (
    <a
      href={`#${heading.id}`}
      onClick={(e) => onClick(e, heading.id)}
      className={`
        relative py-1.5 pr-2 text-[13px] transition-colors duration-150
        ${heading.level === 3 ? "pl-6" : "pl-4"}
        ${isActive
          ? "text-foreground font-medium"
          : "text-muted-foreground hover:text-foreground"
        }
      `}
    >
      {heading.text}
    </a>
  )
}, (prev, next) => prev.isActive === next.isActive && prev.heading.id === next.heading.id)

export function TableOfContents(): React.JSX.Element | null {
  const pathname = usePathname()
  const [headings, setHeadings] = useState<TocHeading[]>([])
  const [activeId, setActiveId] = useState<string>("")
  const navRef = useRef<HTMLElement>(null)
  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const headingsRef = useRef<TocHeading[]>([])
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Extract headings from the page - only on pathname change
  useEffect(() => {
    // Use requestIdleCallback for non-blocking extraction
    const extractHeadings = () => {
      const sectionSelectors = [
        "[data-section-title]",
        "div.text-xs.uppercase.tracking-widest.text-muted-foreground",
        "p.text-xs.uppercase.tracking-widest.text-muted-foreground",
      ]

      const sectionElements = document.querySelectorAll(sectionSelectors.join(","))
      const h3Elements = document.querySelectorAll("main h3")
      const items: TocHeading[] = []
      const seenIds = new Set<string>()

      // Process section titles (level 2)
      sectionElements.forEach((elem) => {
        if (elem.closest("aside")) return

        const text = (elem.getAttribute("data-section-title") || elem.textContent || "").trim()
        if (!text) return

        const target = elem.hasAttribute("data-section-title") ? elem : elem.parentElement || elem

        if (!target.id) {
          let id = slugify(text)
          let counter = 1
          while (seenIds.has(id)) {
            id = `${slugify(text)}-${counter++}`
          }
          target.id = id
        }

        if (!seenIds.has(target.id)) {
          seenIds.add(target.id)
          items.push({ id: target.id, text, level: 2 })
        }
      })

      // Process h3 elements (level 3)
      h3Elements.forEach((elem) => {
        if (elem.closest("aside")) return

        const text = (elem.textContent || "").trim()
        if (!text) return

        if (!elem.id) {
          let id = slugify(text)
          let counter = 1
          while (seenIds.has(id)) {
            id = `${slugify(text)}-${counter++}`
          }
          elem.id = id
        }

        if (!seenIds.has(elem.id)) {
          seenIds.add(elem.id)
          items.push({ id: elem.id, text, level: 3 })
        }
      })

      // Sort by document order using a more efficient approach
      items.sort((a, b) => {
        const elemA = document.getElementById(a.id)
        const elemB = document.getElementById(b.id)
        if (!elemA || !elemB) return 0
        return elemA.compareDocumentPosition(elemB) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
      })

      headingsRef.current = items
      setHeadings(items)

      // Set initial active
      if (items.length > 0) {
        setActiveId(items[0]!.id)
      }
    }

    // Use requestIdleCallback if available, otherwise use setTimeout
    if ('requestIdleCallback' in window) {
      requestIdleCallback(extractHeadings, { timeout: 100 })
    } else {
      setTimeout(extractHeadings, 0)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [pathname])

  // Optimized scroll handler with IntersectionObserver
  useEffect(() => {
    if (headingsRef.current.length === 0) return

    // Create intersection observer for efficient scroll tracking
    const callback: IntersectionObserverCallback = (entries) => {
      if (isScrollingRef.current) return

      // Find the topmost visible heading
      const visibleEntries = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

      if (visibleEntries.length > 0) {
        setActiveId(visibleEntries[0]!.target.id)
      }
    }

    observerRef.current = new IntersectionObserver(callback, {
      rootMargin: "-80px 0px -70% 0px",
      threshold: [0, 0.5, 1]
    })

    // Observe all heading elements
    headingsRef.current.forEach(heading => {
      const element = document.getElementById(heading.id)
      if (element) {
        if (observerRef.current) {
          observerRef.current.observe(element)
        }
      }
    })

    return () => {
      observerRef.current?.disconnect()
    }
  }, [headings])

  // Handle link click with smooth scroll
  const handleClick = useCallback((e: React.MouseEvent, headingId: string) => {
    e.preventDefault()
    isScrollingRef.current = true

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)

    setActiveId(headingId)
    document.getElementById(headingId)?.scrollIntoView({ behavior: "smooth" })

    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false
    }, 600)
  }, [])

  // Memoize indicator position calculation
  const indicatorPos = useMemo(() => {
    if (!activeId || !navRef.current) return null

    const activeLink = navRef.current.querySelector(`a[href="#${activeId}"]`) as HTMLElement
    if (!activeLink) return null

    return {
      top: activeLink.offsetTop + (activeLink.offsetHeight - 16) / 2,
      height: 16
    }
  }, [activeId])

  if (headings.length === 0) {
    return (
      <aside className="w-64 shrink-0 hidden xl:block border-l border-border/50">
        <div className="sticky top-14 h-[calc(100svh-3.5rem)] overflow-y-auto pl-6 pr-4 py-10 flex flex-col">
          <div className="mt-auto pt-6" />
          <CTACard />
        </div>
      </aside>
    )
  }

  return (
    <aside className="w-64 shrink-0 hidden xl:block border-l border-border/50">
      <div className="sticky top-14 h-[calc(100svh-3.5rem)] overflow-y-auto pl-6 pr-4 py-10 flex flex-col">
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1 w-1 rounded-full bg-foreground" />
            <p className="font-medium text-xs text-muted-foreground uppercase tracking-wider">
              On This Page
            </p>
          </div>

          {/* Navigation */}
          <nav ref={navRef} className="relative flex flex-col">
            {/* Background track line */}
            <div className="absolute left-[1px] top-0 bottom-0 w-px bg-border/50" />

            {/* Active indicator */}
            {indicatorPos && (
              <motion.div
                className="absolute left-0 w-[2px] rounded-full bg-foreground"
                initial={false}
                animate={{ top: indicatorPos.top, height: indicatorPos.height }}
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />
            )}

            {/* Links */}
            {headings.map((heading) => (
              <TocLink
                key={heading.id}
                heading={heading}
                isActive={activeId === heading.id}
                onClick={handleClick}
              />
            ))}
          </nav>
        </div>

        <div className="mt-auto pt-6" />
        <CTACard />
      </div>
    </aside>
  )
}
