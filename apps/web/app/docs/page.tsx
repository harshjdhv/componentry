"use client"

import type React from "react"
import { useState, useEffect, useMemo, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { components, getFeaturedComponents, isNewComponent, type ComponentCategory, type ComponentMetadata } from "@/registry"

import { SiteHeader } from "@/components/site-header"
import { DocsScrollEdgeFade } from "@/components/docs-scroll-edge-fade"
import { cn } from "@/lib/utils"
import { AsciiCatalogPreview } from "@/components/docs/previews/ascii-effect-preview"
import { TextMorphCardPreview } from "@/components/docs/previews/text-morph-card-preview"
import { FlippingWordSwapCardPreview } from "@/components/docs/previews/flipping-word-swap-card-preview"
import { AuroraFlowCardPreview } from "@/components/docs/previews/aurora-flow-card-preview"
import { SpectralRibbonCardPreview } from "@/components/docs/previews/spectral-ribbon-card-preview"

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
  videoOnly = false,
}: {
  component: ComponentMetadata
  index: number
  /** Skip live/WebGL previews — catalog video/poster only (featured strip). */
  videoOnly?: boolean
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
    () =>
      previewSources
        ? component.previewVideo?.startsWith("/")
          ? previewSources.mp4
          : getPreferredPreviewSrc(previewSources)
        : "",
    [component.previewVideo, previewSources]
  )
  const previewPosterSrc = useMemo(
    () => component.previewImage ?? getPreviewPosterSrc(component.previewVideo),
    [component.previewImage, component.previewVideo]
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
            className={cn(
              "relative w-full rounded-xl transition-colors border border-dashed border-border shadow-surface-inset overflow-hidden",
              component.slug === "text-morph" ||
                component.slug === "flipping-word-swap"
                ? "bg-background"
                : component.slug === "spectral-ribbon"
                  ? "bg-black"
                : "bg-zinc-50 dark:bg-zinc-900/80 group-hover:bg-zinc-100/50 dark:group-hover:bg-zinc-800/80",
            )}
          >
            {!videoOnly && component.category === "ASCII Effects" && (
              <AsciiCatalogPreview />
            )}
            {!videoOnly && component.slug === "text-morph" && (
              <TextMorphCardPreview />
            )}
            {!videoOnly && component.slug === "flipping-word-swap" && (
              <FlippingWordSwapCardPreview />
            )}
            {!videoOnly && component.slug === "aurora-flow" && (
              <AuroraFlowCardPreview />
            )}
            {!videoOnly && component.slug === "spectral-ribbon" && (
              <SpectralRibbonCardPreview />
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
                autoPlay={isHovered}
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
        <div className="flex flex-col gap-1 px-4 pb-4 pt-2">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-[15px] font-medium tracking-[-0.01em] text-zinc-900 transition-colors group-hover:text-zinc-700 dark:text-zinc-100 dark:group-hover:text-zinc-300">
              {component.title}
            </h3>
            {isNewComponent(component) && (
              <span className="shrink-0 rounded-md bg-[#4775c7]/8 px-2 py-0.5 text-[10px] font-medium leading-4 text-[#345b9e] dark:bg-[#4775c7]/15 dark:text-[#b5d0ff]">
                New
              </span>
            )}
          </div>
          <p className="line-clamp-1 text-[13px] leading-5 tracking-[-0.01em] text-zinc-500 dark:text-zinc-400">
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

// ─── Main Docs Page ─────────────────────────────────────────────────────────
export default function DocsPage() {
  const allComponents = Object.values(components)
  const featured = getFeaturedComponents()
  const grouped = categoryOrder
    .map(cat => ({
      category: cat,
      items: allComponents.filter(c => c.category === cat),
    }))
    .filter(g => g.items.length > 0)

  return (
    <div className="min-h-screen bg-white dark:bg-background text-zinc-900 dark:text-zinc-100 font-sans overflow-x-hidden">
      <DocsScrollEdgeFade position="bottom" />

      {/* ── Top Floating Header ── */}
      <SiteHeader docsInset />

      {/* Docs inset on normal screens; cap width only on 2xl+ */}
      <main className="relative z-10 px-6 pt-28 pb-32 sm:px-8 lg:px-8 xl:px-10">
        <div className="mx-auto w-full 2xl:max-w-[1360px]">

        {/* ── Hero ── */}
        <header className="mb-12 max-w-2xl space-y-2.5">
          <h1 className="text-[28px] font-medium leading-[1.1] tracking-[-0.035em] text-zinc-900 sm:text-[32px] dark:text-zinc-50">
            Crafted Components.
          </h1>
          <p className="max-w-xl text-pretty text-[15px] font-normal leading-6 tracking-[-0.01em] text-zinc-500 sm:text-[16px] sm:leading-7 dark:text-zinc-400">
            A growing collection of animated primitives for React.
          </p>
        </header>

        {/* ── Featured (video previews only) ── */}
        {featured.length > 0 && (
          <section id="featured" className="mb-20 scroll-mt-32">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-[13px] font-medium uppercase leading-5 tracking-[0.06em] text-zinc-500 dark:text-zinc-400">
                Featured
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((component, i) => (
                <ComponentCard
                  key={component.slug}
                  component={component}
                  index={i}
                  videoOnly={Boolean(component.previewVideo)}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── Categories ── */}
        <div className="space-y-20">
          {grouped.map(({ category, items }) => {
            return (
              <section key={category} id={category.toLowerCase().replace(/\s+/g, '-')} className="scroll-mt-32">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <h2 className="text-[13px] font-medium uppercase leading-5 tracking-[0.06em] text-zinc-500 dark:text-zinc-400">
                    {category}
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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


        </div>
      </main >
    </div >
  )
}
