"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { ComponentryLogomark } from "@/components/logos/componentry-logomark"
import { formatStars, useGithubStars } from "@/hooks/use-github-stars"

const GITHUB_URL = "https://github.com/harshjdhv/componentry"
const X_URL = "https://x.com/harshjdhv"

type TocItem = { id: string; title: string }

const MARKER_SPRING = { type: "spring", duration: 0.3, bounce: 0 } as const

/**
 * Reads the page's sections ([data-section-title] in the content column) and highlights
 * the one nearest the top as the window scrolls. The rail stays mounted across
 * navigation, so it re-reads whenever the content changes (new route, or a
 * section streaming in after Suspense).
 */
function useToc() {
  const pathname = usePathname()
  const [items, setItems] = React.useState<TocItem[]>([])
  const [activeId, setActiveId] = React.useState<string | null>(null)

  React.useEffect(() => {
    const main = document.querySelector("[data-docs-inset-content]")
    if (!main) return
    let sections: HTMLElement[] = []
    let frame = 0

    const update = () => {
      let current = sections[0]?.id ?? null
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= 120) current = el.id
      }
      // At the very bottom the last short section never reaches the line; pick it anyway.
      const root = document.documentElement
      if (sections.length && window.scrollY + window.innerHeight >= root.scrollHeight - 4) {
        current = sections.at(-1)!.id
      }
      setActiveId(current)
    }

    const collect = () => {
      sections = Array.from(main.querySelectorAll<HTMLElement>("[data-section-title][id]"))
      const next = sections.map((el) => ({ id: el.id, title: el.dataset.sectionTitle! }))
      setItems((prev) =>
        prev.length === next.length && prev.every((p, i) => p.id === next[i]!.id) ? prev : next
      )
      update()
    }

    const observer = new MutationObserver(() => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(collect)
    })
    observer.observe(main, { childList: true, subtree: true })
    collect()
    window.addEventListener("scroll", update, { passive: true })
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", update)
    }
  }, [pathname])

  return { items, activeId }
}

export function DocsInsetRail({ className }: { className?: string }) {
  const { items, activeId } = useToc()
  const stars = useGithubStars()

  const reduceMotion = useReducedMotion()

  const scrollTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" })
  }

  return (
    <aside className={cn("h-full w-72 shrink-0", className)}>
      <div className="flex h-full flex-col overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.length > 0 && (
          <nav aria-label="On this page" className="px-6 pt-12">
            <h4 className="mb-3 text-[12px] font-medium text-zinc-400 dark:text-zinc-500">
              On this page
            </h4>
            {/* Track on the left; the active marker glides along it. */}
            <ul className="relative flex flex-col before:absolute before:inset-y-1.5 before:left-0 before:w-px before:bg-black/[0.08] dark:before:bg-white/[0.08]">
              {items.map((item) => {
                const active = item.id === activeId
                return (
                  <li key={item.id} className="relative">
                    {active && (
                      <motion.span
                        layoutId="docs-toc-marker"
                        aria-hidden
                        transition={reduceMotion ? { duration: 0 } : MARKER_SPRING}
                        className="absolute inset-y-1.5 left-0 w-px bg-zinc-900 dark:bg-zinc-50"
                      />
                    )}
                    <a
                      href={`#${item.id}`}
                      onClick={(event) => {
                        event.preventDefault()
                        scrollTo(item.id)
                      }}
                      aria-current={active ? "location" : undefined}
                      className={cn(
                        "flex h-8 items-center pl-3.5 text-[13.5px] tracking-[-0.006em] transition-colors duration-150 ease-out",
                        active
                          ? "text-zinc-900 dark:text-zinc-50"
                          : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                      )}
                    >
                      {item.title}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
        )}

        {/* Pinned to the bottom of the panel. */}
        <div className="mt-auto px-6 pt-10 pb-6">
          <div className="border-t border-black/[0.06] pt-6 dark:border-white/[0.06]">
            <ComponentryLogomark className="size-5" />
            <p className="mt-3 text-[14px] font-medium tracking-[-0.01em] text-zinc-900 dark:text-zinc-50">
              Free and open source
            </p>
            <p className="mt-1 text-[13px] leading-5 text-zinc-500 dark:text-zinc-400">
              Star the repo and follow along on X for new components.
            </p>
            <div className="mt-4 flex gap-1.5">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg bg-zinc-900 text-[12.5px] font-medium text-white transition-[scale] duration-150 ease-out active:scale-[0.96] dark:bg-zinc-100 dark:text-zinc-900"
              >
                Star
                <span className="tabular-nums opacity-60">{formatStars(stars)}</span>
              </a>
              <a
                href={X_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 flex-1 items-center justify-center rounded-lg bg-black/[0.04] text-[12.5px] font-medium text-zinc-800 transition-[scale] duration-150 ease-out active:scale-[0.96] dark:bg-white/[0.06] dark:text-zinc-100"
              >
                Follow
              </a>
            </div>
          </div>

          <Link
            href="/sponsors"
            className="group mt-6 flex items-center justify-between border-t border-black/[0.06] pt-5 text-[13px] text-zinc-500 transition-colors hover:text-zinc-900 dark:border-white/[0.06] dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Sponsor Componentry
            <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
          </Link>
        </div>
      </div>
    </aside>
  )
}
