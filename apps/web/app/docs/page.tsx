"use client"

import type React from "react"
import { useState, useEffect, useMemo, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { components, isNewComponent, type ComponentCategory, type ComponentMetadata } from "@/registry"

import { SiteHeader } from "@/components/site-header"
import { DocsScrollEdgeFade } from "@/components/docs-scroll-edge-fade"
import {
  LandingGuideLines,
  landingGutterClass,
} from "@/components/landing/landing-frame"
import { cn } from "@/lib/utils"
import { AsciiCatalogPreview } from "@/components/docs/previews/ascii-effects-preview"

type PreviewSources = {
  mp4: string
  webm: string
}

let preferredPreviewFormat: "webm" | "mp4" | null = null

function getPreferredPreviewSrc(sources: PreviewSources) {
  if (typeof window === "undefined") return sources.mp4
  if (!preferredPreviewFormat) {
    const probe = document.createElement("video")
    const supportsWebm = Boolean(probe.canPlayType('video/webm; codecs="vp9,opus"'))
    preferredPreviewFormat = supportsWebm ? "webm" : "mp4"
  }
  return preferredPreviewFormat === "webm" ? sources.webm : sources.mp4
}

function getPreviewSources(previewVideo?: string) {
  if (!previewVideo) return null

  const match = previewVideo.match(/^(.*)\.(mov|mp4|webm)(\?.*)?$/i)
  if (!match) return null

  const [, base, , query = ""] = match
  return {
    mp4: `${base}.mp4${query}`,
    webm: `${base}.webm${query}`,
  }
}

function getPreviewPosterSrc(previewVideo?: string) {
  if (!previewVideo) return null

  const match = previewVideo.match(/^(.*)\.(mov|mp4|webm)(\?.*)?$/i)
  if (!match) return null

  const [, base, , query = ""] = match
  return `${base}.webp${query}`
}

// ─── Component Card ────────────────────────────────────────────────────────
function ComponentCard({
  component,
  index,
  asciiColors,
}: {
  component: ComponentMetadata
  index: number
  asciiColors?: string[]
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const previewSources = useMemo(
    () => getPreviewSources(component.previewVideo),
    [component.previewVideo]
  ) as PreviewSources | null
  const previewVideoSrc = useMemo(
    () => (previewSources ? getPreferredPreviewSrc(previewSources) : ""),
    [previewSources]
  )
  const previewPosterSrc = useMemo(
    () => getPreviewPosterSrc(component.previewVideo),
    [component.previewVideo]
  )

  useEffect(() => {
    setIsVideoReady(false)
    setShouldLoadVideo(false)
  }, [component.slug, previewVideoSrc])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (!shouldLoadVideo) return

    if (isHovered) {
      const playPromise = video.play()
      if (playPromise) {
        playPromise.catch(() => { })
      }
      return
    }

    video.pause()
    video.currentTime = 0.01
  }, [isHovered, shouldLoadVideo])

  const shouldRenderVideo = Boolean(previewSources && shouldLoadVideo)
  const startPreview = () => {
    setIsHovered(true)
    setShouldLoadVideo(true)
    const video = videoRef.current
    if (!video) return
    video.preload = "auto"
    const playPromise = video.play()
    if (playPromise) {
      playPromise.catch(() => { })
    }
  }

  const stopPreview = () => {
    setIsHovered(false)
    const video = videoRef.current
    if (!video) return
    video.pause()
    video.currentTime = 0.01
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.02 * index,
        ease: "easeOut",
      }}
    >
      <Link
        href={`/docs/components/${component.slug}`}
        onMouseEnter={startPreview}
        onMouseLeave={stopPreview}
        onFocus={startPreview}
        onBlur={stopPreview}
        className="group relative flex flex-col rounded-2xl border border-border bg-white dark:bg-zinc-900/50 overflow-hidden transition-all duration-300 shadow-card hover:-translate-y-0.5 hover:border-input hover:shadow-card-hover"
      >
        {/* ── Expandable hover info (upper side) ── */}
        <motion.div
          initial={false}
          animate={{
            height: isHovered ? 32 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="overflow-hidden"
        >
          <div className="px-4 pb-1 pt-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400">{component.category}</span>
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                View component
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  <path
                    d="M5 2L9 6L5 10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Preview area (Floating) ── */}
        <div className="p-1.5">
          <motion.div 
            initial={false}
            animate={{ height: isHovered ? 228 : 260 }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative w-full rounded-xl bg-zinc-50 dark:bg-zinc-900/80 group-hover:bg-zinc-100/50 dark:group-hover:bg-zinc-800/80 transition-colors border border-dashed border-border shadow-surface-inset overflow-hidden"
          >
            {component.category === "ASCII Effects" && (
              <AsciiCatalogPreview slug={component.slug} colors={asciiColors} />
            )}
            {previewPosterSrc && (
              <img
                src={previewPosterSrc}
                alt=""
                aria-hidden="true"
                loading={component.category === "Text Animations" ? "eager" : "lazy"}
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ${isVideoReady && isHovered ? "opacity-0" : "opacity-100"}`}
              />
            )}
            {shouldRenderVideo && previewSources && (
              <video
                ref={videoRef}
                src={previewVideoSrc}
                loop
                muted
                playsInline
                preload="metadata"
                poster={previewPosterSrc ?? undefined}
                onLoadedData={(e) => {
                  setIsVideoReady(true)
                  if (!isHovered) {
                    const video = e.currentTarget
                    if (video.currentTime < 0.01) {
                      video.currentTime = 0.01
                    }
                  }
                }}
                onCanPlay={() => {
                  if (isHovered) {
                    const video = videoRef.current
                    if (!video) return
                    const playPromise = video.play()
                    if (playPromise) {
                      playPromise.catch(() => { })
                    }
                  }
                }}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ${isVideoReady && isHovered ? "opacity-100" : "opacity-0"}`}
              />
            )}
          </motion.div>
        </div>

        {/* ── Info area ── */}
        <div className="flex flex-col gap-1.5 px-4 pb-4 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
              {component.title}
            </h3>
            {isNewComponent(component) && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 border border-border shadow-panel">
                New
              </span>
            )}
          </div>
          <p className="text-[13px] text-zinc-500 dark:text-zinc-400 line-clamp-1">
            {component.description}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

const categoryOrder: ComponentCategory[] = [
  "Text Animations",
  "Components",
  "Hero Backgrounds",
  "Visual Effects",
  "ASCII Effects",
]

const asciiPalettes: Array<{ label: string; colors: string[] }> = [
  { label: "Graphite", colors: ["#171719", "#888b91", "#f4f4f5"] },
  { label: "Crimson", colors: ["#180407", "#821421", "#e34a55"] },
  { label: "Matrix", colors: ["#04180b", "#18a448", "#baffca"] },
  { label: "Cobalt", colors: ["#071426", "#2566ad", "#d1e5ff"] },
  { label: "Amber", colors: ["#211304", "#b96b13", "#ffe0a3"] },
  { label: "Ultraviolet", colors: ["#170923", "#7d2db3", "#e8caff"] },
]

// ─── Main Docs Page ─────────────────────────────────────────────────────────
export default function DocsPage() {
  const allComponents = Object.values(components)
  const [activeSection, setActiveSection] = useState<string>("")
  const [asciiPalette, setAsciiPalette] = useState(0)

  useEffect(() => {
    const observers = categoryOrder.map((cat) => {
      const id = cat.toLowerCase().replace(/\s+/g, "-")
      const element = document.getElementById(id)
      if (!element) return null

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            setActiveSection(cat)
          }
        },
        { rootMargin: "-20% 0px -50% 0px" } // Trigger when section is near center/top
      )
      observer.observe(element)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  // Scroll active nav item into view
  useEffect(() => {
    if (activeSection) {
      const id = `nav-item-${activeSection}`
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        })
      }
    }
  }, [activeSection])

  const grouped = categoryOrder
    .map(cat => ({
      category: cat,
      items: allComponents.filter(c => c.category === cat),
    }))
    .filter(g => g.items.length > 0)

  return (
    <div className="min-h-screen bg-white dark:bg-background text-zinc-900 dark:text-zinc-100 font-sans overflow-x-hidden">
      <LandingGuideLines />
      <DocsScrollEdgeFade position="bottom" />

      {/* ── Top Floating Header ── */}
      <SiteHeader />

      {/* ── Floating Dock Nav ── */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-[calc(100vw-2rem)] sm:max-w-fit pointer-events-none">
        <nav className="flex items-center gap-1 p-1.5 rounded-2xl border border-border bg-white/80 dark:bg-[#121212] backdrop-blur-xl shadow-card pointer-events-auto overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {categoryOrder.map((cat) => {
            const isActive = activeSection === cat
            return (
              <a
                key={cat}
                id={`nav-item-${cat}`}
                href={`#${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(cat.toLowerCase().replace(/\s+/g, '-'))?.scrollIntoView({ behavior: 'smooth' })
                  setActiveSection(cat)
                }}
                className={`relative px-4 py-2 text-[13px] font-medium transition-all duration-300 rounded-lg whitespace-nowrap flex-shrink-0 ${isActive
                  ? "text-zinc-900 dark:text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50"
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 rounded-lg bg-secondary shadow-panel"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </a>
            )
          })}
        </nav>
      </div>

      <main className={cn("relative z-10 pt-32 pb-32", landingGutterClass)}>
        <div className="mx-auto w-full max-w-[1360px]">

        {/* ── Hero ── */}
        <div className="mb-12 max-w-3xl">
          <h1 className="inline-block text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-zinc-900 dark:text-white sm:text-4xl">
            Crafted Components.
          </h1>
          <p className="mt-3 max-w-2xl text-sm font-medium tracking-tight text-zinc-400 sm:text-base dark:text-zinc-600">
            A growing collection of animated primitives for React.
          </p>
        </div>





        {/* ── Categories ── */}
        <div className="space-y-24">
          {grouped.map(({ category, items }) => {
            return (
              <section key={category} id={category.toLowerCase().replace(/\s+/g, '-')} className="scroll-mt-32">
                <div className="mb-8 flex items-center justify-between gap-4">
                  <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                    {category}
                  </h2>
                  {category === "ASCII Effects" && (
                    <div
                      className="flex items-center gap-0.5 rounded-full border border-zinc-200/80 bg-white/70 p-1 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-black/30"
                      role="group"
                      aria-label="ASCII color theme"
                    >
                      {asciiPalettes.map((palette, paletteIndex) => (
                        <button
                          key={palette.label}
                          type="button"
                          aria-label={palette.label}
                          aria-pressed={asciiPalette === paletteIndex}
                          title={palette.label}
                          onClick={() => setAsciiPalette(paletteIndex)}
                          className={cn(
                            "grid size-7 place-items-center rounded-full border border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400",
                            asciiPalette === paletteIndex
                              ? "border-zinc-300 bg-zinc-100 dark:border-white/15 dark:bg-white/10"
                              : "hover:bg-zinc-100 dark:hover:bg-white/[0.06]"
                          )}
                        >
                          <span
                            className="size-3.5 rounded-full border border-white/15"
                            style={{
                              backgroundColor: palette.colors[1],
                              boxShadow: asciiPalette === paletteIndex
                                ? `0 0 10px ${palette.colors[1]}`
                                : `0 0 0 1px ${palette.colors[0]}`,
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((component, i) => (
                    <ComponentCard
                      key={component.slug}
                      component={component}
                      index={i}
                      asciiColors={category === "ASCII Effects" ? asciiPalettes[asciiPalette]?.colors : undefined}
                    />
                  ))}
                </div>
              </section>
            )
          })}
        </div>


        </div>
      </main >
    </div >
  )
}
