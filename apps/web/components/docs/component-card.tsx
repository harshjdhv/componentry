"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

import { isNewComponent, type ComponentMetadata } from "@/registry"
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

/**
 * Catalog card: poster image, swapped for the preview video while hovered or
 * focused. Used on /docs and in "Related components" on each component page.
 */
export function ComponentCard({
  component,
  index,
  videoOnly = false,
  size = "default",
}: {
  component: ComponentMetadata
  index: number
  /** Skip live/WebGL previews — catalog video/poster only (featured strip). */
  videoOnly?: boolean
  /** "compact": shorter preview, tighter padding and smaller type (related components). */
  size?: "default" | "compact"
}) {
  const compact = size === "compact"
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
        className={cn(
          "group relative flex flex-col overflow-hidden border border-border transition-colors duration-200 ease-out hover:border-black/[0.14] dark:hover:border-white/[0.14]",
          compact ? "rounded-xl" : "rounded-2xl",
        )}
      >
        {/* ── Preview area ── */}
        <div className={compact ? "p-[3px]" : "p-1"}>
          <div
            className={cn(
              "relative w-full border border-dashed border-border shadow-surface-inset overflow-hidden",
              // Preview videos/posters are ~1.54:1 (1280×832, 960×624); keep that shape at any width.
              "aspect-[20/13]",
              compact ? "rounded-[9px]" : "rounded-xl",
              component.slug === "text-morph" ||
                component.slug === "flipping-word-swap"
                ? "bg-background"
                : component.slug === "spectral-ribbon"
                  ? "bg-black"
                : "bg-zinc-50 dark:bg-zinc-900/80",
            )}
          >
            {!videoOnly && component.slug === "ascii-effect" && (
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
          </div>
        </div>

        {/* ── Info area ── */}
        <div className={cn("flex flex-col", compact ? "gap-0.5 px-2.5 pb-2.5 pt-2" : "gap-0.5 px-3 pb-3 pt-2.5")}>
          <div className="flex items-center justify-between gap-2">
            <h3
              className={cn(
                "font-medium tracking-[-0.01em] text-zinc-900 dark:text-zinc-100",
                compact ? "text-[13.5px] leading-5" : "text-[14.5px] leading-5",
              )}
            >
              {component.title}
            </h3>
            {isNewComponent(component) && (
              <span className="shrink-0 rounded-md bg-[#4775c7]/8 px-2 py-0.5 text-[10px] font-medium leading-4 text-[#345b9e] dark:bg-[#4775c7]/15 dark:text-[#b5d0ff]">
                New
              </span>
            )}
          </div>
          <p
            className={cn(
              "line-clamp-1 leading-5 tracking-[-0.01em] text-zinc-500 dark:text-zinc-400",
              compact ? "text-[12.5px]" : "text-[13px]",
            )}
          >
            {component.description}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
