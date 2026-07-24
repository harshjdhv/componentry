"use client";

import React from "react";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/site-header";
import { HeroButtons } from "@/components/landing/hero-buttons";
import {
  LandingContent,
  LandingDivider,
  LandingGutter,
  LandingGuideLines,
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
      className="relative min-h-screen w-full overflow-x-hidden bg-white dark:bg-background text-foreground transition-colors duration-300 selection:bg-zinc-200 dark:selection:bg-zinc-800"
    >
      <LandingGuideLines />
      <SiteHeader landingGutter />

      <main className="relative z-10 flex min-h-screen min-w-0 flex-col justify-start overflow-x-clip pt-36 pb-32 sm:pt-44 lg:pt-48">
        <LandingGutter>
          <LandingContent className="pb-0">
            <section className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <a
                  href="https://vercel.com/open-source-program"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white/40 dark:bg-zinc-900/30 px-2.5 py-1 text-[11px] sm:text-xs font-medium text-zinc-700 dark:text-zinc-300 backdrop-blur-xl shadow-panel transition-colors hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50"
                >
                  Backed by
                  <svg
                    viewBox="0 0 76 65"
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
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="mt-6 max-w-3xl text-[clamp(1.85rem,9vw,3rem)] font-medium leading-[0.98] tracking-[-0.035em] text-zinc-950 dark:text-white sm:text-5xl md:text-6xl"
              >
                <span className="whitespace-nowrap">Beautiful Animated UI</span>
                <br />
                <span className="whitespace-nowrap">Components for React</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.6,
                  delay: 0.35,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="mt-5 max-w-2xl text-[clamp(0.9rem,4vw,1rem)] font-normal leading-6 text-zinc-500 dark:text-zinc-400 sm:text-lg sm:leading-7"
              >
                <span className="block whitespace-nowrap sm:hidden">
                  Polished interactions for React projects
                </span>
                <span className="block whitespace-nowrap sm:hidden">
                  with styling and animations handled.
                </span>
                <span className="hidden sm:inline">
                  Effortlessly add polished, production-ready interactions to your projects,
                </span>
                <span className="hidden sm:block">
                  with the styling and animations already handled.
                </span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.5,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="mt-2 flex w-full justify-center"
              >
                <HeroButtons />
              </motion.div>
            </section>
          </LandingContent>

          <LandingContent>
            <motion.div
              data-home-showcase
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06 } },
              }}
              className="mb-20 mt-10 grid w-full min-w-0 auto-rows-[min(300px,70vw)] grid-cols-1 gap-2.5 md:mt-12 md:auto-rows-[300px] md:grid-cols-4"
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
          </LandingContent>

          <LandingDivider />
        </LandingGutter>
      </main>

      <LandingGutter>
        <Testimonials />
        <CustomWorkCta />
        <LandingDivider />
      </LandingGutter>

      <Footer />
    </div>
  );
}
