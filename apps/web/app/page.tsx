"use client";

import React from "react";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/site-header";
import { HeroAtmosphere } from "@/components/landing/hero-atmosphere";
import { HeroButtons } from "@/components/landing/hero-buttons";
import { DeferredGallery } from "@/components/landing/deferred-gallery";
import {
  LandingContent,
  LandingGutter,
} from "@/components/landing/landing-frame";
import { ResponsiveMagnetLines } from "@/components/landing/responsive-magnet-lines";
import { Testimonials } from "@/components/landing/testimonials";
import { CustomWorkCta } from "@/components/landing/custom-work-cta";
import { InfiniteIconField } from "@/components/landing/infinite-icon-field";
import { Footer } from "@/components/footer";

// Componentry Previews for Bento
import { MatrixRain } from "@workspace/ui/components/matrix-rain";
import { ScrollBasedVelocity } from "@workspace/ui/components/scroll-based-velocity";
import { AnimatedGradient } from "@workspace/ui/components/animated-gradient";
import { DitherGradient } from "@workspace/ui/components/dither-gradient";
import {
  MagneticDock,
  DockIconHome,
  DockIconSearch,
  DockIconMail,
  DockIconSettings,
  DockIconFolder,
} from "@workspace/ui/components/magnetic-dock";

const showcaseCardClass =
  "relative flex flex-col rounded-2xl bg-white p-1.5 shadow-[0_0_0_1px_rgba(0,0,0,0.055),0_10px_30px_-18px_rgba(0,0,0,0.35)] transition-[box-shadow,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.075),0_18px_48px_-22px_rgba(0,0,0,0.45)] dark:bg-[#161616] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.07)] dark:hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)] transform-gpu will-change-transform";

const showcasePreviewClass =
  "relative flex-1 w-full overflow-hidden rounded-[10px] bg-zinc-50 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.045)] dark:bg-background dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.055)]";

const showcaseLabelClass =
  "shrink-0 px-2.5 pb-1 pt-2 text-[13px] font-medium leading-5 text-zinc-700 text-pretty dark:text-zinc-400";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] as const },
  },
};

export default function Home() {
  return (
    <div
      data-route-home
      className="relative min-h-screen w-full overflow-x-hidden text-foreground selection:bg-zinc-200 dark:selection:bg-zinc-800"
    >
      <HeroAtmosphere />
      <SiteHeader landingGutter />

      <main className="relative z-10 flex min-h-screen min-w-0 flex-col justify-start overflow-x-clip pt-14 pb-32">
        <LandingGutter>
          <LandingContent>
            <section aria-labelledby="hero-heading" className="relative mx-auto flex max-w-4xl min-w-0 flex-col items-center pt-[88px] pb-6 text-left sm:text-center sm:pt-[120px] md:pb-8 lg:pt-[136px]">
              <div className="relative z-10 flex w-full min-w-0 flex-col items-start px-2 sm:items-center sm:px-4 lg:px-0">
                <a
                  href="https://vercel.com/open-source-program"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-950/[0.08] px-3 py-1 text-[11px] font-medium text-zinc-600 dark:border-white/[0.08] dark:text-zinc-400 sm:text-xs"
                >
                  Backed by
                  <svg
                    viewBox="0 0 76 65"
                    aria-hidden="true"
                    className="size-4"
                    fill="currentColor"
                  >
                    <path d="M37.59.25l36.95 64H.64z" />
                  </svg>
                  <span className="font-semibold tracking-tight">
                    Vercel OSS
                  </span>
                  Program
                </a>
                <h1 id="hero-heading" className="mt-6 max-w-[720px] text-balance text-[8.4vw] sm:text-[clamp(2.5rem,4vw,3.5rem)] font-medium leading-[0.96] tracking-[-0.06em] text-zinc-950 dark:text-zinc-50">
                  <span className="block whitespace-nowrap sm:inline sm:whitespace-normal">The component library</span>{" "}<span className="block whitespace-nowrap sm:inline sm:whitespace-normal">for polished interfaces.</span>
                </h1>
                <p className="mt-5 max-w-[600px] sm:text-balance text-base leading-6 sm:text-[17px] sm:leading-7 text-zinc-600 dark:text-zinc-400">
                  Animated React components with editable source code. Install via shadcn CLI or your AI editor with MCP.
                </p>
                <div className="mt-8 w-full"><HeroButtons /></div>
              </div>
            </section>
          </LandingContent>

          <LandingContent>
            <DeferredGallery>
            <motion.div
              data-home-showcase
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06 } },
              }}
              className="mb-20 mt-6 grid w-full min-w-0 auto-rows-[min(300px,70vw)] grid-cols-1 gap-2.5 md:mt-6 md:auto-rows-[300px] md:grid-cols-4"
            >
              {/* Card 1: 1x1 Dark */}
              <motion.div
                variants={cardVariants}
                className={`md:col-span-1 md:row-span-1 ${showcaseCardClass}`}
              >
                <div
                  className={`${showcasePreviewClass} flex flex-col items-center justify-center p-6 pb-0 pt-0`}
                >
                  <div className="absolute inset-0 opacity-60 mix-blend-multiply dark:mix-blend-screen scale-150">
                    <MatrixRain speed={30} fontSize={10} variant="cyan" />
                  </div>
                </div>
                <div className={showcaseLabelClass}>
                  Matrix rain
                </div>
              </motion.div>

              {/* Card 2: 2x1 Dark */}
              <motion.div
                variants={cardVariants}
                className={`md:col-span-2 md:row-span-1 ${showcaseCardClass}`}
              >
                <div
                  className={`${showcasePreviewClass} flex flex-col items-center justify-center pt-8`}
                >
                  <div
                    className="relative flex h-24 w-full min-w-0 overflow-hidden"
                    style={{
                      maskImage:
                        "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                    }}
                  >
                    <ScrollBasedVelocity
                      text="COMPONENTRY"
                      default_velocity={3}
                      className="font-sans text-4xl font-black tracking-tighter text-zinc-800 dark:text-white sm:text-6xl md:text-8xl"
                    />
                  </div>
                </div>
                <div className={showcaseLabelClass}>
                  Scroll velocity
                </div>
              </motion.div>

              {/* Card 3: 1x2 White */}
              <motion.div
                variants={cardVariants}
                className={`md:col-span-1 md:row-span-2 ${showcaseCardClass}`}
              >
                <div className={showcasePreviewClass}>
                  <InfiniteIconField />
                </div>
                <div className={showcaseLabelClass}>
                  Infinite icon field
                </div>
              </motion.div>

              {/* Card 4: 2x1 White */}
              <motion.div
                variants={cardVariants}
                className={`md:col-span-2 md:row-span-1 ${showcaseCardClass}`}
              >
                <div
                  className={`${showcasePreviewClass} flex flex-col items-center justify-center p-0`}
                >
                  <ResponsiveMagnetLines
                    rows={5}
                    containerSize="100%"
                    lineColor="rgba(113,113,122,0.5)"
                    lineWidth="4px"
                    lineHeight="32px"
                  />
                </div>
                <div className="flex shrink-0 items-center justify-between gap-2 px-2.5 pb-1 pt-2 text-[13px] font-medium leading-5 text-zinc-700 dark:text-zinc-400">
                  Magnet lines
                  <span className="hidden shrink-0 font-mono text-xs tracking-wider text-zinc-400 opacity-60 sm:inline">
                    [ hover over me ]
                  </span>
                </div>
              </motion.div>

              {/* Card 5: 1x1 Dither Gradient */}
              <motion.div
                variants={cardVariants}
                className={`md:col-span-1 md:row-span-1 ${showcaseCardClass}`}
              >
                <div
                  className={`${showcasePreviewClass} flex flex-col items-center justify-center`}
                >
                  <div className="absolute inset-0 z-0 opacity-100 rounded-xl overflow-hidden">
                    <DitherGradient
                      colorFrom="#ffaa40"
                      colorTo="#9c40ff"
                      colorMid="#ff00cc"
                      intensity={0.5}
                      speed={2}
                    />
                  </div>
                </div>
                <div className={showcaseLabelClass}>
                  Dither gradient
                </div>
              </motion.div>

              {/* Card 6: 1x1 Dark */}
              <motion.div
                variants={cardVariants}
                className={`md:col-span-1 md:row-span-1 ${showcaseCardClass}`}
              >
                <div
                  className={`${showcasePreviewClass} flex flex-col items-center justify-center p-0`}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-[10px]">
                    <AnimatedGradient config={{ preset: "Aurora" }} />
                  </div>
                </div>
                <div className={showcaseLabelClass}>
                  Animated gradient
                </div>
              </motion.div>

              {/* Card 7: 3x1 Magnetic Dock */}
              <motion.div
                variants={cardVariants}
                className={`md:col-span-3 md:row-span-1 ${showcaseCardClass}`}
              >
                <div
                  className={`${showcasePreviewClass} flex max-h-[260px] items-center justify-center overflow-hidden p-6 text-black sm:p-10`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-70 dark:opacity-60" />

                  <div className="z-10 flex h-[80px] items-center justify-center translate-y-2">
                    <MagneticDock
                      items={[
                        { id: "home", label: "Home", icon: <DockIconHome /> },
                        {
                          id: "search",
                          label: "Search",
                          icon: <DockIconSearch />,
                        },
                        {
                          id: "mail",
                          label: "Mail",
                          icon: <DockIconMail />,
                          badge: 3,
                        },
                        {
                          id: "folder",
                          label: "Projects",
                          icon: <DockIconFolder />,
                        },
                        {
                          id: "settings",
                          label: "Settings",
                          icon: <DockIconSettings />,
                        },
                      ]}
                      position="bottom"
                      variant="glass"
                      className="mx-auto"
                    />
                  </div>
                </div>
                <div className={showcaseLabelClass}>
                  Magnetic dock
                </div>
              </motion.div>
            </motion.div>
            </DeferredGallery>
          </LandingContent>
        </LandingGutter>
      </main>

      <LandingGutter>
        <Testimonials />
        <CustomWorkCta />
      </LandingGutter>

      <Footer />
    </div>
  );
}
