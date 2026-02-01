"use client"

import type React from "react"
import { useEffect, useState, useRef, useCallback } from "react"
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

// Generate unique ID for an element
const generateUniqueId = (text: string, element: Element): string => {
  let id = slugify(text)
  if (document.getElementById(id) && document.getElementById(id) !== element) {
    let counter = 1
    while (document.getElementById(`${id}-${counter}`)) counter++
    id = `${id}-${counter}`
  }
  return id
}

export function TableOfContents(): React.JSX.Element | null {
  const pathname = usePathname()
  const [headings, setHeadings] = useState<TocHeading[]>([])
  const [activeId, setActiveId] = useState<string>("")
  const navRef = useRef<HTMLElement>(null)
  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Extract headings from the page
  useEffect(() => {
    const sectionSelectors = [
      "[data-section-title]",
      "div.text-xs.uppercase.tracking-widest.text-muted-foreground",
      "p.text-xs.uppercase.tracking-widest.text-muted-foreground",
    ]

    const sectionElements = document.querySelectorAll(sectionSelectors.join(","))
    const h3Elements = document.querySelectorAll("main h3")
    const items: TocHeading[] = []

    // Process section titles (level 2)
    sectionElements.forEach((elem) => {
      if (elem.closest("aside")) return

      const text = (elem.getAttribute("data-section-title") || elem.textContent || "").trim()
      if (!text) return

      const target = elem.hasAttribute("data-section-title") ? elem : elem.parentElement || elem

      if (!target.id) {
        target.id = generateUniqueId(text, target)
      }

      if (!items.some((item) => item.id === target.id)) {
        items.push({ id: target.id, text, level: 2 })
      }
    })

    // Process h3 elements (level 3)
    h3Elements.forEach((elem) => {
      if (elem.closest("aside")) return

      const text = (elem.textContent || "").trim()
      if (!text) return

      if (!elem.id) {
        elem.id = generateUniqueId(text, elem)
      }

      if (!items.some((item) => item.id === elem.id)) {
        items.push({ id: elem.id, text, level: 3 })
      }
    })

    // Sort by document order
    items.sort((a, b) => {
      const elemA = document.getElementById(a.id)
      const elemB = document.getElementById(b.id)
      if (!elemA || !elemB) return 0
      return elemA.compareDocumentPosition(elemB) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
    })

    setHeadings(items)
  }, [pathname])

  // Handle scroll to determine active section
  const handleScroll = useCallback(() => {
    if (isScrollingRef.current || headings.length === 0) return

    const scrollY = window.scrollY
    const windowHeight = window.innerHeight
    const docHeight = document.documentElement.scrollHeight

    // At bottom of page, activate last item
    if (scrollY + windowHeight >= docHeight - 50) {
      const lastItem = headings[headings.length - 1]
      if (lastItem) {
        setActiveId(lastItem.id)
        return
      }
    }

    // Find active section (last one above the offset threshold)
    const offset = 100
    // Default to the first heading so it's active initially (when at top of page)
    let currentId = headings[0]?.id || ""

    for (const item of headings) {
      const element = document.getElementById(item.id)
      if (!element) continue

      if (element.getBoundingClientRect().top < offset) {
        currentId = item.id
      } else {
        break
      }
    }

    setActiveId(currentId)
  }, [headings])

  // Set up scroll listener
  useEffect(() => {
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
    handleScroll()

    return () => {
      window.removeEventListener("scroll", onScroll)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    }
  }, [handleScroll])

  // Handle link click with smooth scroll
  const handleClick = (e: React.MouseEvent, headingId: string) => {
    e.preventDefault()
    isScrollingRef.current = true

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)

    setActiveId(headingId)
    document.getElementById(headingId)?.scrollIntoView({ behavior: "smooth" })

    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false
    }, 800)
  }

  // Get active link position for indicator
  const getIndicatorPosition = () => {
    if (!activeId || !navRef.current) return null

    const activeLink = navRef.current.querySelector(`a[href="#${activeId}"]`) as HTMLElement
    if (!activeLink) return null

    return {
      top: activeLink.offsetTop + (activeLink.offsetHeight - 16) / 2,
      height: 16
    }
  }

  const indicatorPos = getIndicatorPosition()

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
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}

            {/* Links */}
            {headings.map((heading) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={`
                  relative py-1.5 pr-2 text-[13px] transition-colors duration-200
                  ${heading.level === 3 ? "pl-6" : "pl-4"}
                  ${activeId === heading.id
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                  }
                `}
              >
                {heading.text}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-auto pt-6" />
        <CTACard />
      </div>
    </aside>
  )
}

// Extracted CTA Card component
function CTACard() {
  return (
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
}
