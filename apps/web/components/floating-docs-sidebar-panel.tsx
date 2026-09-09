"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"
import { docsConfig } from "@/config/docs"
import { components, isNewComponent } from "@/registry"
import { useDocsSidebar } from "@/components/docs-sidebar-context"
import { LineNav, type LineNavItem } from "@/components/line-nav"

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

export function FloatingDocsSidebarPanel() {
  const pathname = usePathname()
  const { isOpen, close } = useDocsSidebar()
  const [isHoverVideoReady, setIsHoverVideoReady] = React.useState(false)
  const [hoverPreview, setHoverPreview] = React.useState<{
    title: string
    videoSrc: string
    mp4: string
    webm: string
  } | null>(null)
  const [hoverPosition, setHoverPosition] = React.useState<{ x: number; y: number } | null>(null)
  const warmedPreviewKeys = React.useRef(new Set<string>())
  const warmingVideos = React.useRef(new Map<string, HTMLVideoElement>())

  const warmPreviewAssets = React.useCallback((sources: PreviewSources) => {
    if (typeof window === "undefined") return
    const selectedSrc = getPreferredPreviewSrc(sources)
    if (warmedPreviewKeys.current.has(selectedSrc)) return

    warmedPreviewKeys.current.add(selectedSrc)

    const video = document.createElement("video")
    video.preload = "auto"
    video.muted = true
    video.playsInline = true
    video.src = selectedSrc
    video.load()
    warmingVideos.current.set(selectedSrc, video)
  }, [])

  const getPreviewPosition = React.useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    const cardWidth = 224
    const cardHeight = 170
    const offset = 18
    const maxX = Math.max(16, window.innerWidth - cardWidth - 16)
    const maxY = Math.max(16, window.innerHeight - cardHeight - 16)
    const x = Math.max(16, Math.min(event.clientX + offset, maxX))
    const y = Math.max(16, Math.min(event.clientY + offset, maxY))
    return { x, y }
  }, [])

  const updateHoverPreview = React.useCallback(
    (item: { title: string; href: string }, event: React.MouseEvent<HTMLAnchorElement>) => {
      const slug = item.href.split("/").pop()
      if (!slug) {
        setHoverPreview(null)
        return
      }

      const previewVideo = components[slug]?.previewVideo
      const sources = getPreviewSources(previewVideo)
      if (!sources) {
        setHoverPreview(null)
        setHoverPosition(null)
        return
      }
      warmPreviewAssets(sources)
      setHoverPosition(getPreviewPosition(event))

      setHoverPreview({
        title: item.title,
        videoSrc: getPreferredPreviewSrc(sources),
        mp4: sources.mp4,
        webm: sources.webm,
      })
    },
    [getPreviewPosition, warmPreviewAssets]
  )

  const updateHoverPosition = React.useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      setHoverPosition(getPreviewPosition(event))
    },
    [getPreviewPosition]
  )

  React.useEffect(() => {
    close()
  }, [pathname, close])

  React.useEffect(() => {
    if (!isOpen) {
      setHoverPreview(null)
      setHoverPosition(null)
      setIsHoverVideoReady(false)
    }
  }, [isOpen])

  React.useEffect(() => {
    setIsHoverVideoReady(false)
  }, [hoverPreview?.videoSrc])

  React.useEffect(() => {
    if (!isOpen) return

    const initialSources: PreviewSources[] = []
    for (const group of docsConfig.nav) {
      for (const item of group.items) {
        const slug = item.href.split("/").pop()
        if (!slug) continue
        const previewVideo = components[slug]?.previewVideo
        const sources = getPreviewSources(previewVideo)
        if (!sources) continue
        initialSources.push(sources)
        if (initialSources.length >= 5) break
      }
      if (initialSources.length >= 5) break
    }

    initialSources.forEach((sources) => warmPreviewAssets(sources))
  }, [isOpen, warmPreviewAssets])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: -320, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -40, opacity: 0 }}
          transition={{ type: "spring", duration: 0.35, bounce: 0 }}
          className="fixed top-3 left-3 z-50 flex w-72 flex-col"
          onMouseLeave={close}
        >
          <div className="flex max-h-[calc(100vh-24px)] flex-col gap-1 overflow-hidden rounded-xl lg:rounded-2xl border border-border/50 bg-white p-2 shadow-card dark:bg-[#121212]">


            <div className="mask-image-b flex-1 overflow-y-auto px-2 pt-3 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {docsConfig.nav.map((group, index) => {
                const lineItems: LineNavItem[] = group.items.map((item) => {
                  const slug = item.href.split("/").pop()
                  const comp = slug ? components[slug] : undefined
                  const isNew = comp ? isNewComponent(comp) : false
                  return {
                    title: item.title,
                    href: item.href,
                    accessory: isNew ? (
                      <span className="inline-flex items-center rounded-full bg-blue-500/10 px-1.5 py-0.5 text-[9px] font-bold text-blue-600 dark:text-blue-400">
                        NEW
                      </span>
                    ) : undefined,
                  }
                })

                return (
                  <div
                    key={index}
                    className={index > 0 ? "border-t border-border/40 pt-5 mt-5" : ""}
                  >
                    <h4 className="mb-2.5 px-3 text-[11px] font-semibold uppercase tracking-widest text-zinc-700 dark:text-zinc-300">
                      {group.title}
                    </h4>
                    <LineNav
                      className="py-2"
                      items={lineItems}
                      activeHref={pathname ?? undefined}
                      onItemClick={() => {
                        setHoverPreview(null)
                        setHoverPosition(null)
                        close()
                      }}
                      onItemMouseEnter={(item, event) =>
                        updateHoverPreview(item, event)
                      }
                      onItemMouseMove={updateHoverPosition}
                      onItemMouseLeave={() => {
                        setHoverPreview(null)
                        setHoverPosition(null)
                      }}
                    />
                  </div>
                )
              })}
            </div>

            <div className="pointer-events-none absolute bottom-2 left-2 right-2 h-6 rounded-b-2xl bg-gradient-to-t from-white to-transparent dark:from-zinc-950" />
          </div>

          <AnimatePresence>
            {hoverPreview && hoverPosition && (
              <motion.div
                key={hoverPreview.videoSrc}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.08, ease: "easeOut" }}
                className="pointer-events-none fixed z-[70] w-56"
                style={{
                  left: hoverPosition.x,
                  top: hoverPosition.y,
                }}
              >
                <div className="overflow-hidden rounded-xl border border-zinc-200/70 bg-white/95 shadow-2xl backdrop-blur-md dark:border-zinc-800/70 dark:bg-zinc-900/95">
                  <div className="relative h-32 w-full bg-zinc-100 dark:bg-zinc-800/60">
                    <video
                      key={hoverPreview.videoSrc}
                      src={hoverPreview.videoSrc}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      onLoadedData={() => setIsHoverVideoReady(true)}
                      className={cn(
                        "relative h-full w-full object-cover transition-opacity duration-150",
                        isHoverVideoReady ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
