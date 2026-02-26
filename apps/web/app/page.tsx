"use client"

import React, { useRef } from "react"
import Link from "next/link"
import { motion, type Variants, useInView } from "framer-motion"
import { Github, ArrowUpRight, ArrowRight } from "lucide-react"
import { FloatingNavbar } from "@/components/floating-navbar"
import { HeroButtons } from "@/components/landing/hero-buttons"
import { ComponentryLogomark } from "@/components/logos/componentry-logomark"
import { LayoutToggle } from "@/components/layout-toggle"

import { WebGLLiquid } from "@/components/landing/webgl-liquid"
import dynamic from "next/dynamic"

const HeroGeometric = dynamic(
  () => import("@workspace/ui/components/hero-geometric"),
  { ssr: false }
)
const ParticleGalaxy = dynamic(
  () => import("@workspace/ui/components/particle-galaxy").then((mod) => mod.ParticleGalaxy),
  { ssr: false }
)
const MatrixRain = dynamic(
  () => import("@workspace/ui/components/matrix-rain").then((mod) => mod.MatrixRain),
  { ssr: false }
)
const DitherGradient = dynamic(
  () => import("@workspace/ui/components/dither-gradient").then((mod) => mod.DitherGradient),
  { ssr: false }
)
const MagnetLines = dynamic(
  () => import("@workspace/ui/components/magnet-lines").then((mod) => mod.MagnetLines),
  { ssr: false }
)
const ClosingPlasma = dynamic(
  () => import("@/components/landing/closing-plasma").then((mod) => mod.ClosingPlasma),
  { ssr: false }
)


import {
  MagneticDock,
  DockIconHome,
  DockIconSearch,
  DockIconFolder,
  DockIconMail,
  DockIconMusic,
  DockIconSettings,
  DockIconTrash,
} from "@workspace/ui/components/magnetic-dock"

const dockItems = [
  { id: "home", label: "Home", icon: <DockIconHome />, isActive: true },
  { id: "search", label: "Search", icon: <DockIconSearch /> },
  { id: "folder", label: "Finder", icon: <DockIconFolder /> },
  { id: "mail", label: "Mail", icon: <DockIconMail />, badge: 2 },
  { id: "music", label: "Music", icon: <DockIconMusic /> },
  { id: "settings", label: "Settings", icon: <DockIconSettings /> },
  { id: "trash", label: "Trash", icon: <DockIconTrash /> },
]

// ─── Scroll reveal ──────────────────────────────────────
function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Lazy Render Utility ────────────────────────────────
function LazyRender({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: "100px" })
  return (
    <div ref={ref} className={className}>
      {isInView && children}
    </div>
  )
}

export default function Home() {
  const titleLine1 = "PREMIUM UI"
  const titleLine2 = "COMPONENTS"

  const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]
  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  }

  const letter: Variants = {
    hidden: { y: 28, opacity: 0, filter: "blur(6px)" },
    show: (i: number) => ({
      y: [18, -6, 0],
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: 0.2 + i * 0.025,
        duration: 0.9,
        ease: easeOut,
      },
    }),
  }

  return (
    <div className="relative min-h-screen bg-white font-sans text-zinc-900 selection:bg-zinc-900 selection:text-white dark:bg-[#080808] dark:text-zinc-100 dark:selection:bg-white dark:selection:text-zinc-900">
      <FloatingNavbar />

      {/* ─── Hero ─────────────────────────────────────── */}
      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-24 pt-28 text-center">
        <div className="absolute inset-0 z-0 bg-white dark:bg-[#080808]">
          <div className="absolute bottom-0 left-0 right-0 z-0 h-28 bg-gradient-to-t from-white via-white/80 to-transparent backdrop-blur-[1px] pointer-events-none dark:from-[#080808] dark:via-[#080808]/80" />
          <LazyRender className="absolute inset-0 z-10 block h-full w-full pointer-events-none opacity-90"><WebGLLiquid delayMs={0} className="h-full w-full" /></LazyRender>
          <div className="absolute left-0 right-0 top-0 z-20 h-24 bg-gradient-to-b from-white via-white/80 to-transparent backdrop-blur-[1px] pointer-events-none dark:from-[#080808] dark:via-[#080808]/80" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex justify-center"
          >
            <div className="inline-flex items-center rounded-full border border-zinc-200 bg-white/50 px-3 py-1 text-sm font-medium text-zinc-800 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-200">
              <span className="mr-2 flex h-2 w-2 animate-pulse rounded-full bg-green-500" />
              <span>Open source and free to use</span>
            </div>
          </motion.div>

          <motion.div initial="hidden" animate="show" variants={container}>
            <h1 className="relative pb-0 text-5xl font-bold leading-[0.9] tracking-tighter sm:text-7xl md:text-8xl">
              {titleLine1.split("").map((char, i) => (
                <motion.span
                  key={`l1-${i}`}
                  className="inline-block text-zinc-900 dark:text-white drop-shadow-sm"
                  variants={letter}
                  custom={i}
                  style={{ transformOrigin: "50% 100%" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              <br />
              {titleLine2.split("").map((char, i) => (
                <motion.span
                  key={`l2-${i}`}
                  className="inline-block text-zinc-900 dark:text-white drop-shadow-sm"
                  variants={letter}
                  custom={titleLine1.length + i}
                  style={{ transformOrigin: "50% 100%" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          >
            <p className="mx-auto mt-0 max-w-xl text-lg font-medium leading-relaxed tracking-tight text-zinc-500 dark:text-zinc-400 sm:text-xl">
              Refined, animated React primitives for premium product UI.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center gap-4"
          >
            <HeroButtons />
            <div className="mt-4">
              <LayoutToggle />
            </div>
          </motion.div>
        </div>
      </main>



      {/* ─── Bento Grid ───────────────────────────────── */}
      <section className="relative z-40 w-full px-4 pb-40 pt-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-16 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">Components</p>
              <h2 className="mt-3 bg-gradient-to-br from-zinc-900 via-zinc-600 to-zinc-900 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-white dark:via-zinc-400 dark:to-white sm:text-4xl">
                Premium Component Showcase
              </h2>
              <p className="mt-3 text-base text-zinc-500 dark:text-zinc-400 sm:text-lg">
                Each block is a preview-ready container styled like the docs gallery.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-8">
            <Reveal className="overflow-hidden rounded-3xl border border-zinc-200/60 bg-white/70 backdrop-blur-xl dark:border-zinc-800/60 dark:bg-zinc-900/50 md:col-span-5 md:row-span-2 md:col-start-1 md:row-start-1">
              <div className="p-1.5">
                <div className="relative h-[360px] w-full overflow-hidden rounded-[24px] border border-zinc-200/60 bg-zinc-50 dark:border-zinc-800/60 dark:bg-zinc-900/80">
                  <HeroGeometric title1="Hero" title2="Geometric" className="!min-h-full" />
                </div>
              </div>
              <div className="px-5 pb-5 text-left">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Hero Geometric</h3>
              </div>
            </Reveal>

            <Reveal className="overflow-hidden rounded-3xl border border-zinc-200/60 bg-white/70 backdrop-blur-xl dark:border-zinc-800/60 dark:bg-zinc-900/50 md:col-span-3 md:col-start-6 md:row-start-1" delay={0.08}>
              <div className="p-1.5">
                <div className="relative h-[220px] w-full overflow-hidden rounded-[24px] border border-zinc-200/60 bg-zinc-50 dark:border-zinc-800/60 dark:bg-zinc-900/80">
                  <LazyRender className="absolute inset-0 bg-zinc-950">
                    <ParticleGalaxy
                      particleCount={1800}
                      spread={2.1}
                      glow={70}
                      density={0.85}
                      rotationSpeed={0.0013}
                      cameraMovement={false}
                      minZoom={2}
                      maxZoom={6}
                      enableZoom={false}
                    />
                  </LazyRender>
                </div>
              </div>
              <div className="px-5 pb-5 text-left">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Particle Galaxy</h3>
              </div>
            </Reveal>

            <Reveal className="overflow-hidden rounded-3xl border border-zinc-200/60 bg-white/70 backdrop-blur-xl dark:border-zinc-800/60 dark:bg-zinc-900/50 md:col-span-3 md:row-span-2 md:col-start-6 md:row-start-2" delay={0.12}>
              <div className="p-1.5">
                <div className="relative h-[320px] w-full overflow-hidden rounded-[24px] border border-zinc-200/60 bg-zinc-50 dark:border-zinc-800/60 dark:bg-zinc-900/80">
                  <LazyRender className="absolute inset-0 bg-zinc-950">
                    <DitherGradient
                      colorFrom="#0ea5e9"
                      colorMid="#8b5cf6"
                      colorTo="#ec4899"
                      intensity={0.18}
                      speed={2.4}
                    />
                  </LazyRender>
                </div>
              </div>
              <div className="px-5 pb-5 text-left">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Dither Gradient</h3>
              </div>
            </Reveal>

            <Reveal className="overflow-hidden rounded-3xl border border-zinc-200/60 bg-white/70 backdrop-blur-xl dark:border-zinc-800/60 dark:bg-zinc-900/50 md:col-span-5 md:col-start-1 md:row-start-3" delay={0.06}>
              <div className="p-1.5">
                <div className="relative h-[200px] w-full overflow-hidden rounded-[24px] border border-zinc-200/60 bg-zinc-50 dark:border-zinc-800/60 dark:bg-zinc-900/80">
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                    <div className="scale-[0.72] sm:scale-[0.88] md:scale-[1.02]">
                      <MagneticDock
                        items={dockItems}
                        iconSize={68}
                        maxScale={1.8}
                        magneticDistance={190}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-5 pb-5 text-left">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Magnetic Dock</h3>
              </div>
            </Reveal>

            <Reveal className="overflow-hidden rounded-3xl border border-zinc-200/60 bg-white/70 backdrop-blur-xl dark:border-zinc-800/60 dark:bg-zinc-900/50 md:col-span-5 md:col-start-4 md:row-start-4" delay={0.1}>
              <div className="p-1.5">
                <div className="relative h-[220px] w-full overflow-hidden rounded-[24px] border border-zinc-200/60 bg-zinc-50 dark:border-zinc-800/60 dark:bg-zinc-900/80">
                  <LazyRender className="absolute inset-0">
                    <MagnetLines
                      rows={8}
                      columns={14}
                      containerSize="100%"
                      lineColor="rgba(113,113,122,0.7)"
                      lineWidth="2px"
                      lineHeight="18px"
                      className="h-full w-full place-items-center bg-white dark:bg-zinc-950"
                    />
                  </LazyRender>
                </div>
              </div>
              <div className="px-5 pb-5 text-left">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Magnet Lines</h3>
              </div>
            </Reveal>

            <Reveal className="overflow-hidden rounded-3xl border border-zinc-200/60 bg-white/70 backdrop-blur-xl dark:border-zinc-800/60 dark:bg-zinc-900/50 md:col-span-3 md:col-start-1 md:row-start-4" delay={0.04}>
              <div className="p-1.5">
                <LazyRender className="relative h-[220px] w-full overflow-hidden rounded-[24px] border border-zinc-200/60 bg-zinc-50 dark:border-zinc-800/60 dark:bg-zinc-900/80">
                  <MatrixRain variant="cyan" />
                </LazyRender>
              </div>
              <div className="px-5 pb-5 text-left">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Matrix Rain</h3>
              </div>
            </Reveal>
          </div>

          {/* Explore all → */}
          <Reveal delay={0.15}>
            <div className="mt-12 flex justify-center">
              <Link
                href="/docs"
                className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-200"
              >
                <span>Explore all components</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Closing CTA ──────────────────────────────── */}
      <section className="relative z-40 w-full">
        <div className="relative h-[80vh] min-h-[560px] w-full overflow-hidden">
          {/* Dither canvas */}
          <LazyRender className="absolute inset-0">
            <ClosingPlasma className="h-full w-full" />
          </LazyRender>

          {/* Top fade from page bg */}
          <div className="absolute left-0 right-0 top-0 z-10 h-40 bg-gradient-to-b from-white via-white/70 to-transparent pointer-events-none dark:from-[#080808] dark:via-[#080808]/70" />
          {/* Bottom fade into footer */}
          <div className="absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-zinc-50 via-zinc-50/60 to-transparent pointer-events-none dark:from-[#080808]/90 dark:via-transparent" />

          {/* Content */}
          <div className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center">
            <Reveal>
              <h2 className="text-4xl font-bold tracking-tighter text-zinc-900 sm:text-5xl md:text-6xl lg:text-7xl dark:text-white/90">
                Ship your dream product.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-500 md:text-xl dark:text-zinc-400">
                Beautiful, performance-driven components to help you build faster and better.
                Open source and free to use.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/docs"
                    className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-zinc-900 px-8 text-sm font-semibold text-white shadow-lg shadow-zinc-900/20 transition-all duration-300 hover:bg-zinc-800 hover:shadow-zinc-900/40 dark:bg-white dark:text-black dark:shadow-white/20 dark:hover:bg-zinc-50 dark:hover:shadow-white/40"
                  >
                    <span>Start Building</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-zinc-800 to-zinc-900 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-white/80 dark:to-white" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="https://github.com/harshjdhv/componentry"
                    target="_blank"
                    className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-2xl border border-zinc-300 bg-white/60 px-8 text-sm font-semibold text-zinc-700 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white/80 hover:border-zinc-400 hover:shadow-zinc-200/40 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:hover:border-white/20 dark:hover:shadow-white/10"
                  >
                    <Github className="h-4 w-4 opacity-80 transition-opacity group-hover:opacity-100" />
                    <span>View on GitHub</span>
                    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-zinc-100/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-white/10" />
                  </Link>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Footer ───────────────────────────────────── */}
      <footer className="relative z-40 bg-zinc-50 py-16 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2">
                <ComponentryLogomark className="h-6 w-6 text-zinc-900 dark:text-white" />
                <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">Componentry</span>
              </Link>
              <p className="mt-4 max-w-xs text-sm text-zinc-500 dark:text-zinc-400">
                A collection of premium, copy-paste React components for building stunning interfaces.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Product</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link href="/docs" className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                    Components
                  </Link>
                </li>
                <li>
                  <Link href="/docs/installation" className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                    Installation
                  </Link>
                </li>
                <li>
                  <Link href="/docs/templates" className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                    Templates
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Resources</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link href="https://github.com/harshjdhv/componentry" target="_blank" className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link href="https://x.com/harshjdhv" target="_blank" className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                    X (@harshjdhv)
                  </Link>
                </li>
                <li>
                  <Link href="https://github.com/harshjdhv/componentry/blob/main/LICENSE" target="_blank" className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                    License
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-4 pt-8 md:flex-row">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              © {new Date().getFullYear()} Componentry. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
