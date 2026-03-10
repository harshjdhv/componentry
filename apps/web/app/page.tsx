"use client"

import React from "react"
import { motion } from "framer-motion"
import { SiteHeader } from "@/components/site-header"
import { HeroButtons } from "@/components/landing/hero-buttons"

// Componentry Previews for Bento
import { MagnetLines } from "@workspace/ui/components/magnet-lines"
import { BorderBeam } from "@workspace/ui/components/border-beam"
import { HyperText } from "@workspace/ui/components/hyper-text"
import { MatrixRain } from "@workspace/ui/components/matrix-rain"
import { ScrollBasedVelocity } from "@workspace/ui/components/scroll-based-velocity"
import { InteractiveHoverButton } from "@workspace/ui/components/interactive-hover-button"
import { DitherGradient } from "@workspace/ui/components/dither-gradient"
import { MagneticDock, DockIconHome, DockIconSearch, DockIconMail, DockIconSettings, DockIconFolder } from "@workspace/ui/components/magnetic-dock"

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-[#111] text-foreground transition-colors duration-300 selection:bg-zinc-200 dark:selection:bg-zinc-800">
      <SiteHeader />

      {/* Hero Content */}
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-start pt-24 pb-32 px-4 sm:px-6 overflow-hidden">

        {/* Subtle pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="group inline-flex cursor-pointer items-center rounded-full border border-zinc-200/60 bg-white/40 dark:border-zinc-800/60 dark:bg-zinc-900/30 px-3 py-1.5 text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 backdrop-blur-xl shadow-sm transition-colors hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50">
            <span className="flex size-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] mr-2.5 animate-pulse" />
            Componentry v1.0 is now live
            <svg className="ml-2 size-3.5 opacity-60 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </motion.div>

        {/* Headline */}
        <div className="max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-zinc-900 dark:text-white leading-[1.05] sm:leading-[1.05]"
          >
            Craft premium interfaces <br className="hidden sm:block" />
            <span className="text-zinc-400 dark:text-zinc-500">with absolute precision.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-medium tracking-tight"
          >
            An exquisite collection of copy-paste React components. Built for teams that refuse to compromise on design aesthetics or developer experience.
          </motion.p>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 md:mt-12 w-full"
        >
          <HeroButtons />
        </motion.div>

        {/* Bento Grid Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 w-full max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-3 md:gap-4 auto-rows-[300px] mb-20 px-4"
        >
          {/* Card 1: 1x1 Dark */}
          <div className="md:col-span-1 md:row-span-1 relative flex flex-col rounded-2xl border border-zinc-200/60 dark:border-zinc-800/80 bg-white dark:bg-[#1a1a1a] shadow-sm p-2">
            <div className="relative flex-1 w-full rounded-xl bg-zinc-50 dark:bg-[#111] border border-dashed border-zinc-200/50 dark:border-zinc-800/80 overflow-hidden flex flex-col items-center justify-center p-6 pb-0 pt-0">
               <div className="absolute inset-0 opacity-40 mix-blend-screen scale-150">
                 <MatrixRain speed={30} fontSize={10} variant="cyan" />
               </div>
               <HyperText text="reveal" className="absolute z-10 font-bold text-xl text-zinc-800 dark:text-white tracking-widest uppercase" />
            </div>
            <div className="shrink-0 pt-3 pb-1 px-3 text-sm font-medium text-zinc-700 dark:text-zinc-400">
              Matrix rain
            </div>
          </div>

          {/* Card 2: 2x1 Dark */}
          <div className="md:col-span-2 md:row-span-1 relative flex flex-col rounded-2xl border border-zinc-200/60 dark:border-zinc-800/80 bg-white dark:bg-[#1a1a1a] shadow-sm p-2">
            <div className="relative flex-1 w-full rounded-xl bg-zinc-50 dark:bg-[#111] border border-dashed border-zinc-200/50 dark:border-zinc-800/80 overflow-hidden flex flex-col items-center justify-center pt-8">
                <div className="flex -space-x-3 mb-6 relative z-10">
                    <div className="size-8 rounded-full border-2 border-zinc-50 dark:border-[#111] bg-zinc-300 dark:bg-zinc-800" />
                    <div className="size-8 rounded-full border-2 border-zinc-50 dark:border-[#111] bg-zinc-400 dark:bg-zinc-700" />
                    <div className="size-8 rounded-full border-2 border-zinc-50 dark:border-[#111] bg-zinc-500 dark:bg-zinc-600" />
                    <div className="size-8 rounded-full border-2 border-zinc-50 dark:border-[#111] bg-zinc-600 dark:bg-zinc-500" />
                    <div className="size-8 rounded-full border-2 border-zinc-50 dark:border-[#111] bg-zinc-700 dark:bg-[#1a1a1a] flex items-center justify-center text-[10px] text-zinc-800 dark:text-white">+5</div>
                </div>
                <div className="w-full flex h-24 overflow-hidden relative" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
                   <ScrollBasedVelocity text="COMPONENTRY" default_velocity={3} className="font-sans font-black text-6xl md:text-8xl tracking-tighter text-zinc-800 dark:text-white" />
                </div>
            </div>
            <div className="shrink-0 pt-3 pb-1 px-3 text-sm font-medium text-zinc-700 dark:text-zinc-400">
              Hover members
            </div>
          </div>

          {/* Card 3: 1x2 White */}
          <div className="md:col-span-1 md:row-span-2 relative flex flex-col rounded-2xl border border-zinc-200/60 dark:border-zinc-800/80 bg-white dark:bg-[#1a1a1a] shadow-sm p-2">
            <div className="relative flex-1 w-full rounded-xl bg-zinc-50 dark:bg-[#111] border border-dashed border-zinc-200/50 dark:border-zinc-800/80 overflow-hidden flex flex-col items-center justify-center p-8 gap-6">
                 <div className="absolute inset-0 bg-gradient-to-t from-zinc-50/80 dark:from-zinc-900/50 to-transparent pointer-events-none z-10" />
                 <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="text-[64px] drop-shadow-2xl grayscale hover:grayscale-0 transition-all">🦁</motion.div>
                 <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="text-[64px] drop-shadow-2xl grayscale hover:grayscale-0 transition-all">🍷</motion.div>
                 <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3.5 }} className="text-[64px] drop-shadow-2xl grayscale hover:grayscale-0 transition-all">🍝</motion.div>
                 <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 4.5 }} className="text-[64px] drop-shadow-2xl grayscale hover:grayscale-0 transition-all">🔫</motion.div>
            </div>
            <div className="shrink-0 pt-3 pb-1 px-3 text-sm font-medium text-zinc-700 dark:text-zinc-400">
              Drag and scroll
            </div>
          </div>

          {/* Card 4: 2x1 White */}
          <div className="md:col-span-2 md:row-span-1 relative flex flex-col rounded-2xl border border-zinc-200/60 dark:border-zinc-800/80 bg-white dark:bg-[#1a1a1a] shadow-sm p-2">
            <div className="relative flex-1 w-full rounded-xl bg-zinc-50 dark:bg-[#111] border border-dashed border-zinc-200/50 dark:border-zinc-800/80 overflow-hidden flex flex-col items-center justify-center p-0">
                 <MagnetLines 
                    rows={5} 
                    columns={22} 
                    containerSize="100%" 
                    lineColor="rgba(113,113,122,0.5)" 
                    lineWidth="4px" 
                    lineHeight="32px"
                 />
                 <BorderBeam duration={12} size={150} colorFrom="#e5e5e5" colorTo="#333333" className="rounded-xl opacity-10 dark:opacity-30 absolute inset-0 pointer-events-none" borderWidth={1} />
            </div>
            <div className="shrink-0 pt-3 pb-1 px-3 text-sm font-medium text-zinc-700 dark:text-zinc-400 flex items-center justify-between">
              Magnet lines
              <span className="text-zinc-400 font-mono text-xs tracking-wider opacity-60">[ hover over me ]</span>
            </div>
          </div>

          {/* Card 5: 1x1 Dark */}
          <div className="md:col-span-1 md:row-span-1 relative flex flex-col rounded-2xl border border-zinc-200/60 dark:border-zinc-800/80 bg-white dark:bg-[#1a1a1a] shadow-sm p-2">
            <div className="relative flex-1 w-full rounded-xl bg-zinc-50 dark:bg-[#111] border border-dashed border-zinc-200/50 dark:border-zinc-800/80 overflow-hidden flex flex-col items-center justify-center p-6">
                <div className="relative hover:scale-105 transition-transform duration-300 w-full flex justify-center">
                   <InteractiveHoverButton text="Silent Notification" className="bg-white dark:bg-[#1a1a1a] text-zinc-900 border border-zinc-200/80 dark:border-white/5 dark:text-zinc-300 w-[180px] shadow-sm rounded-full py-3" />
                </div>
            </div>
            <div className="shrink-0 pt-3 pb-1 px-3 text-sm font-medium text-zinc-700 dark:text-zinc-400">
              Dynamic island
            </div>
          </div>

          {/* Card 6: 1x1 Dither Gradient */}
          <div className="md:col-span-1 md:row-span-1 relative flex flex-col rounded-2xl border border-zinc-200/60 dark:border-zinc-800/80 bg-white dark:bg-[#1a1a1a] shadow-sm p-2">
            <div className="relative flex-1 w-full rounded-xl bg-zinc-50 dark:bg-[#111] border border-dashed border-zinc-200/50 dark:border-zinc-800/80 overflow-hidden flex flex-col items-center justify-center">
              <div className="absolute inset-0 z-0 opacity-100 rounded-xl overflow-hidden">
                 <DitherGradient colorFrom="#ffaa40" colorTo="#9c40ff" colorMid="#ff00cc" intensity={0.5} speed={2} />
              </div>
            </div>
            <div className="shrink-0 pt-3 pb-1 px-3 text-sm font-medium text-zinc-700 dark:text-zinc-400">
              Dither gradient
            </div>
          </div>

          {/* Card 7: 3x1 Magnetic Dock */}
          <div className="md:col-span-3 md:row-span-1 relative flex flex-col rounded-2xl border border-zinc-200/60 dark:border-zinc-800/80 bg-white dark:bg-[#1a1a1a] shadow-sm p-2">
            <div className="relative flex-1 w-full rounded-xl bg-zinc-50 dark:bg-[#111] border border-dashed border-zinc-200/50 dark:border-zinc-800/80 overflow-hidden flex flex-col items-center justify-center p-10 text-black">
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-70 dark:opacity-60" />
              
              <div className="z-10 w-full flex justify-center items-center relative translate-y-2">
                 <MagneticDock 
                    items={[
                       { id: "home", label: "Home", icon: <DockIconHome /> },
                       { id: "search", label: "Search", icon: <DockIconSearch /> },
                       { id: "mail", label: "Mail", icon: <DockIconMail />, badge: 3 },
                       { id: "folder", label: "Projects", icon: <DockIconFolder /> },
                       { id: "settings", label: "Settings", icon: <DockIconSettings /> },
                    ]}
                    position="bottom"
                    variant="glass"
                    className="mx-auto"
                 />
              </div>
            </div>
            <div className="shrink-0 pt-3 pb-1 px-3 text-sm font-medium text-zinc-700 dark:text-zinc-400">
              Magnetic dock
            </div>
          </div>
        </motion.div>

      </main>


    </div>
  )
}