"use client"

import type React from "react"
import { useState, useEffect, useMemo, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { components, isNewComponent, type ComponentCategory, type ComponentMetadata } from "@/registry"
import { Logomark } from "@/components/logos/logomark"
import { usePrefetchPreviewVideos } from "@/hooks/use-prefetch-preview-videos"

import { SiteHeader } from "@/components/site-header"

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

// ─── Component Card ────────────────────────────────────────────────────────
function ComponentCard({
  component,
  index,
}: {
  component: ComponentMetadata
  index: number
}) {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isNearViewport, setIsNearViewport] = useState(false)
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
  const shouldAutoWarmVideo = index < 9

  useEffect(() => {
    const element = cardRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsNearViewport(Boolean(entry?.isIntersecting)),
      { rootMargin: "800px 0px 800px 0px", threshold: 0.01 }
    )
    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isNearViewport) return
    if (shouldAutoWarmVideo) {
      setShouldLoadVideo(true)
      return
    }

    const warmWhenIdle = () => setShouldLoadVideo(true)
    const idleApi = window as Window & {
      requestIdleCallback?: (cb: IdleRequestCallback, options?: IdleRequestOptions) => number
      cancelIdleCallback?: (handle: number) => void
    }

    if (typeof idleApi.requestIdleCallback === "function") {
      const idleId = idleApi.requestIdleCallback(warmWhenIdle, { timeout: 800 })
      return () => idleApi.cancelIdleCallback?.(idleId)
    }

    const timeoutId = setTimeout(warmWhenIdle, 400)
    return () => clearTimeout(timeoutId)
  }, [isNearViewport, shouldAutoWarmVideo])

  useEffect(() => {
    setIsVideoReady(false)
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

  const shouldRenderVideo = Boolean(previewSources)
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
      ref={cardRef}
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
        className="group relative flex flex-col rounded-2xl border border-zinc-200/60 dark:border-zinc-800/80 bg-white dark:bg-[#1a1a1a] shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.03)] hover:border-zinc-300 dark:hover:border-zinc-700 p-2"
      >
        {/* ── Preview area (Floating) ── */}
        <div className="relative h-[220px] w-full rounded-xl bg-zinc-50 dark:bg-[#111] transition-colors border border-dashed border-zinc-200/50 dark:border-zinc-800/80 overflow-hidden group-hover:dark:bg-[#141414]">
          {shouldRenderVideo && previewSources && (
              <video
                ref={videoRef}
                src={shouldLoadVideo ? previewVideoSrc : undefined}
                loop
                muted
                playsInline
                preload={shouldLoadVideo ? "auto" : "metadata"}
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
                className={`w-full h-full object-cover transition-opacity duration-200 ${isVideoReady ? "opacity-100" : "opacity-0"}`}
              />
            )}
        </div>

        {/* ── Info area ── */}
        <div className="shrink-0 pt-3 pb-1 px-3">
          <div className="flex items-center justify-between font-medium text-zinc-700 dark:text-zinc-400">
            <h3 className="text-sm">
              {component.title}
            </h3>
            {isNewComponent(component) && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                New
              </span>
            )}
          </div>
          {/* We do not show the description string anymore to match the landing page */}
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
]

// ─── Main Docs Page ─────────────────────────────────────────────────────────
export default function DocsPage() {
  const allComponents = Object.values(components)
  const [activeSection, setActiveSection] = useState<string>("")

  // Continue prefetching any videos not yet cached
  usePrefetchPreviewVideos()



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
    <div className="relative min-h-screen w-full bg-white dark:bg-[#111] text-foreground transition-colors duration-300 selection:bg-zinc-200 dark:selection:bg-zinc-800 overflow-x-hidden font-sans">
      {/* ── Overlays ── */}
      <div className="fixed top-0 left-0 right-0 z-40 h-24 bg-gradient-to-b from-white via-white/80 to-transparent dark:from-[#111] dark:via-[#111]/80 pointer-events-none backdrop-blur-[1px]" />
      <div className="fixed bottom-0 left-0 right-0 z-40 h-24 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#111] dark:via-[#111]/80 pointer-events-none backdrop-blur-[1px]" />

      {/* ── Top Floating Header ── */}
      <SiteHeader />

      {/* ── Floating Dock Nav ── */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-[calc(100vw-2rem)] sm:max-w-fit pointer-events-none">
        <nav className="flex items-center gap-1 p-1.5 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/80 bg-white/80 dark:bg-[#1a1a1a]/90 backdrop-blur-xl shadow-lg shadow-zinc-200/20 dark:shadow-black/40 pointer-events-auto overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
                    className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg shadow-sm"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </a>
            )
          })}
        </nav>
      </div>

      <main className="max-w-[1400px] mx-auto pt-32 pb-32 px-6 sm:px-8 relative z-10">

        {/* ── Hero ── */}
        <div className="mb-12 max-w-3xl">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter bg-gradient-to-br from-zinc-900 via-zinc-500 to-zinc-900 dark:from-white dark:via-zinc-400 dark:to-white bg-clip-text text-transparent leading-[1.1] mb-2 inline-block">
            Crafted Components.
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed">
            A growing collection of animated primitives for React.
          </p>
        </div>





        {/* ── Categories ── */}
        <div className="space-y-24">
          {grouped.map(({ category, items }) => {
            return (
              <section key={category} id={category.toLowerCase().replace(/\s+/g, '-')} className="scroll-mt-32">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-8 tracking-tight">
                  {category}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((component, i) => (
                    <ComponentCard
                      key={component.slug}
                      component={component}
                      index={i}
                    />
                  ))}
                </div>
              </section>
            )
          })}
        </div>


      </main >
    </div >
  )
}
