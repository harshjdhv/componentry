"use client"

import { useCallback, useState } from "react"
import Link from "next/link"
import { House, LayoutGrid } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { SiteHeader } from "@/components/site-header"
import { AssemblyLogo, PIECES } from "@/components/not-found/assembly-logo"

const swap = {
  initial: { opacity: 0, y: 6, filter: "blur(2px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -6, filter: "blur(2px)" },
  transition: { duration: 0.22, ease: [0.23, 1, 0.32, 1] as const },
}

const LINKS = [
  { href: "/", label: "Home", Icon: House },
  { href: "/docs", label: "Components", Icon: LayoutGrid },
] as const

export function NotFoundView() {
  const [placed, setPlaced] = useState<Record<string, boolean>>({})

  const solved = PIECES.every((p) => placed[p.id])

  const onPlace = useCallback((id: string) => {
    setPlaced((s) => (s[id] ? s : { ...s, [id]: true }))
  }, [])

  return (
    <div className="relative flex min-h-svh w-full flex-col bg-white text-foreground dark:bg-[#0a0a0a]">
      <SiteHeader landingGutter />

      <main className="flex flex-1 flex-col items-center justify-center px-6 pt-20 pb-16 text-center">
        <AssemblyLogo placed={placed} onPlace={onPlace} />

        <h1 className="mt-8 text-balance text-2xl font-medium tracking-[-0.04em] text-zinc-950 sm:text-3xl dark:text-zinc-50">
          <span className="text-zinc-400 dark:text-zinc-600">404 /</span> This page came apart.
        </h1>

        <div className="mt-3 grid min-h-12 w-full max-w-[25rem] content-start">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.p
              key={solved ? "solved" : "broken"}
              {...swap}
              className="text-balance text-sm leading-6 text-zinc-600 [grid-area:1/1] dark:text-zinc-400"
            >
              {solved
                ? "Good as new. Shame broken links can’t be fixed the same way, so try one of these instead."
                : "This page doesn’t exist or has moved. While you’re here, put the pieces back together."}
            </motion.p>
          </AnimatePresence>
        </div>

        <nav aria-label="Ways out" className="mt-6 flex items-center gap-2">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex h-8 items-center gap-1.5 rounded-lg bg-zinc-100 pr-3 pl-2.5 text-[13px] font-medium text-zinc-700 transition-[background-color,color,transform] duration-150 ease-out hover:bg-zinc-200 hover:text-zinc-950 active:scale-[0.97] dark:bg-[#1a1a1a] dark:text-zinc-300 dark:hover:bg-[#222] dark:hover:text-zinc-50"
            >
              <l.Icon
                aria-hidden
                strokeWidth={1.75}
                className="size-3.5"
              />
              {l.label}
            </Link>
          ))}
        </nav>
      </main>
    </div>
  )
}
