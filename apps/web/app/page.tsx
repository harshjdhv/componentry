"use client";

import React from "react";
import heroStyles from "./hero.module.css";
import { motion } from "framer-motion";
import { Badge } from "@workspace/ui/components/coss-badge";
import { SiteHeader } from "@/components/site-header";
import { HeroAtmosphere } from "@/components/landing/hero-atmosphere";
import { HeroButtons } from "@/components/landing/hero-buttons";
import { LatestComponent } from "@/components/landing/latest-component";
import { DeferredGallery } from "@/components/landing/deferred-gallery";
import {
  LandingContent,
  LandingGutter,
} from "@/components/landing/landing-frame";
import { ResponsiveMagnetLines } from "@/components/landing/responsive-magnet-lines";
import { Testimonials } from "@/components/landing/testimonials";
import { Features } from "@/components/landing/features";
import { CustomWorkCta } from "@/components/landing/custom-work-cta";
import { Footer } from "@/components/footer";
import { ShowcaseCard } from "@/components/landing/showcase-card";

// Componentry Previews for Bento
import { MatrixRain } from "@workspace/ui/components/matrix-rain";
import { ScrollBasedVelocity } from "@workspace/ui/components/scroll-based-velocity";
import { EyeTracking } from "@workspace/ui/components/eye-tracking";
import { DitherGradient } from "@workspace/ui/components/dither-gradient";
import { MagneticDock } from "@workspace/ui/components/magnetic-dock";
import { MACOS_DOCK_ITEMS } from "@workspace/ui/components/magnetic-dock-icons";
import { HeatmapLogo } from "@workspace/ui/components/heatmap-logo";

const heroDockItems = MACOS_DOCK_ITEMS.filter((item) =>
  ["finder", "safari", "mail", "messages", "music", "settings"].includes(
    item.id
  )
);

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
              <div className={`${heroStyles.content} relative z-10 flex w-full min-w-0 flex-col items-start px-2 sm:items-center sm:px-4 lg:px-0`}>
                <Badge
                  variant="outline"
                  className="h-auto gap-1.5 rounded-[6px] border-transparent bg-zinc-100/70 px-3 py-1 text-[11px] text-zinc-900 shadow-none dark:bg-[#1a1a1a]/70 dark:text-zinc-300 sm:h-auto sm:text-xs [button&,a&]:hover:bg-zinc-200/80 dark:[button&,a&]:hover:bg-[#1f1f1f]/80"
                  render={
                    <a
                      href="https://vercel.com/open-source-program"
                      target="_blank"
                      rel="noreferrer"
                    />
                  }
                >
                  <span>Backed by</span>
                  <svg
                    viewBox="0 0 76 65"
                    aria-hidden="true"
                    className="size-4"
                    fill="currentColor"
                  >
                    <path d="M37.59.25l36.95 64H.64z" />
                  </svg>
                  <span className="font-semibold tracking-tight">Vercel OSS</span>
                  <span>Program</span>
                </Badge>
                               <h1 id="hero-heading" className="mt-6 max-w-[720px] text-balance text-[8.4vw] sm:text-[clamp(2.5rem,4vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.026em] text-zinc-950 dark:text-zinc-50">
                  <span className="block whitespace-nowrap sm:inline sm:whitespace-normal">The component library</span>{" "}<span className="block whitespace-nowrap sm:inline sm:whitespace-normal">for polished interfaces.</span>
                </h1>
                <p className="mt-5 max-w-[600px] sm:text-balance text-base leading-6 sm:text-[17px] sm:leading-7 text-zinc-600 dark:text-zinc-400">
                  Animated React components with editable source code. Install via shadcn CLI or your AI editor with MCP.
                </p>
                <div className="mt-8 w-full"><HeroButtons /></div>
                <LatestComponent />
              </div>
            </section>
          </LandingContent>

          <LandingContent>
            <section
              aria-labelledby="showcase-heading"
              className="mt-16 w-full sm:mt-20"
            >
              <h2
                id="showcase-heading"
                className="max-w-[720px] text-balance text-[32px] font-medium leading-[36px] tracking-[-0.028em] text-zinc-950 dark:text-zinc-50 sm:text-[42px] sm:leading-[46px] sm:tracking-[-0.033em]"
              >
                Not screenshots. Not mockups.{" "}
                <span className="text-neutral-500 dark:text-neutral-400">
                  Every card below is the live component, running in this page.
                </span>
              </h2>
            </section>

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
              <ShowcaseCard
                href="/docs/components/matrix-rain"
                title="Matrix rain"
                className="md:col-span-1 md:row-span-1"
                previewClassName="flex flex-col items-center justify-center p-6 pb-0 pt-0"
              >
                <div className="absolute inset-0 scale-150 opacity-60 mix-blend-multiply dark:mix-blend-screen">
                  <MatrixRain speed={30} fontSize={10} variant="cyan" />
                </div>
              </ShowcaseCard>

              <ShowcaseCard
                href="/docs/components/scroll-based-velocity"
                title="Scroll velocity"
                className="md:col-span-2 md:row-span-1"
                previewClassName="flex flex-col items-center justify-center pt-8"
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
              </ShowcaseCard>

              <ShowcaseCard
                href="/docs/components/heatmap-logo"
                title="Heatmap logo"
                className="md:col-span-1 md:row-span-2"
                previewClassName="flex items-center justify-center p-6"
              >
                <HeatmapLogo image="/logo-new.svg" className="w-full max-w-[220px]" />
              </ShowcaseCard>

              <ShowcaseCard
                href="/docs/components/magnet-lines"
                title="Magnet lines"
                hint="[ hover over me ]"
                interactive
                className="md:col-span-2 md:row-span-1"
                previewClassName="flex flex-col items-center justify-center p-0"
              >
                <ResponsiveMagnetLines
                  rows={5}
                  containerSize="100%"
                  lineColor="rgba(113,113,122,0.5)"
                  lineWidth="4px"
                  lineHeight="32px"
                />
              </ShowcaseCard>

              <ShowcaseCard
                href="/docs/components/dither-gradient"
                title="Dither gradient"
                className="md:col-span-1 md:row-span-1"
                previewClassName="flex flex-col items-center justify-center"
              >
                <div className="absolute inset-0 z-0 overflow-hidden rounded-xl opacity-100">
                  <DitherGradient
                    colorFrom="#ffaa40"
                    colorTo="#9c40ff"
                    colorMid="#ff00cc"
                    intensity={0.5}
                    speed={2}
                  />
                </div>
              </ShowcaseCard>

              <ShowcaseCard
                href="/docs/components/eye-tracking"
                title="Eye tracking"
                hint="[ move cursor ]"
                interactive
                className="md:col-span-1 md:row-span-1"
                previewClassName="flex flex-col items-center justify-center p-0"
              >
                <EyeTracking eyeSize={78} gap={22} variant="realistic" />
              </ShowcaseCard>

              <ShowcaseCard
                href="/docs/components/magnetic-dock"
                title="Magnetic dock"
                interactive
                className="md:col-span-3 md:row-span-1"
                previewClassName="flex max-h-[260px] items-center justify-center overflow-hidden p-6 text-black sm:p-10"
              >
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] opacity-70 [background-size:16px_16px] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] dark:opacity-60" />

                <div className="z-10 flex h-[80px] translate-y-2 items-center justify-center">
                  <MagneticDock
                    items={heroDockItems}
                    position="bottom"
                    variant="glass"
                    className="mx-auto"
                  />
                </div>
              </ShowcaseCard>
            </motion.div>
            </DeferredGallery>
          </LandingContent>
        </LandingGutter>
      </main>

      <LandingGutter>
        <Features />
        <Testimonials />
        <CustomWorkCta />
      </LandingGutter>

      <Footer />
    </div>
  );
}
