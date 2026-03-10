"use client"

import React from "react"
import { motion } from "framer-motion"
import { SiteHeader } from "@/components/site-header"
import { HeroButtons } from "@/components/landing/hero-buttons"

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

        {/* Center Image Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 w-full max-w-5xl aspect-[16/9] rounded-2xl border border-border/50 bg-zinc-100/50 dark:bg-zinc-900/30 flex flex-col items-center justify-center shadow-xl backdrop-blur-sm relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-100/20 to-zinc-200/20 dark:from-[#1A1A1A]/50 dark:to-[#111]/50" />
          <span className="relative z-10 font-medium text-lg text-zinc-500">Component Showcase Placeholder</span>
        </motion.div>

        {/* Tech Stack Subtle Intro */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
          className="absolute bottom-10 left-0 right-0 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-zinc-400 dark:text-zinc-600 font-medium tracking-wide"
        >
          <span className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors cursor-default">React</span>
          <span className="size-1 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <span className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors cursor-default">Next.js</span>
          <span className="size-1 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <span className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors cursor-default">Tailwind CSS</span>
          <span className="size-1 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <span className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors cursor-default">Framer Motion</span>
        </motion.div>
      </main>


    </div>
  )
}