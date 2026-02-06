"use client"

import React, { Suspense, lazy } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Logomark } from "@/components/logos/logomark"
import { GitHubStarButton } from "@/components/github-star-button"

// Lazy load heavy WebGL/Canvas components - they won't block initial render
const MagnetLines = lazy(() => import("@workspace/ui/components/magnet-lines").then(m => ({ default: m.MagnetLines })))
const LiquidBlob = lazy(() => import("@workspace/ui/components/liquid-blob").then(m => ({ default: m.LiquidBlob })))
const PixelCanvas = lazy(() => import("@workspace/ui/components/pixel-canvas").then(m => ({ default: m.PixelCanvas })))
const MatrixRain = lazy(() => import("@workspace/ui/components/matrix-rain").then(m => ({ default: m.MatrixRain })))
const MagneticDock = lazy(() => import("@workspace/ui/components/magnetic-dock").then(m => ({ default: m.MagneticDock })))

// Import dock icons normally (small)
import {
  DockIconHome,
  DockIconSearch,
  DockIconFolder,
  DockIconMail,
  DockIconMusic,
  DockIconSettings,
  DockIconTrash,
} from "@workspace/ui/components/magnetic-dock"

// Loading placeholder for heavy components
const ComponentPlaceholder = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse bg-slate-800/50 rounded-3xl ${className}`} />
)

// Dock items config - defined once
const dockItems = [
  { id: "home", label: "Home", icon: <DockIconHome />, isActive: true },
  { id: "search", label: "Search", icon: <DockIconSearch /> },
  { id: "folder", label: "Finder", icon: <DockIconFolder /> },
  { id: "mail", label: "Mail", icon: <DockIconMail />, badge: 3 },
  { id: "music", label: "Music", icon: <DockIconMusic /> },
  { id: "settings", label: "Settings", icon: <DockIconSettings /> },
  { id: "trash", label: "Trash", icon: <DockIconTrash /> },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-[#FFFFFF] text-slate-950 font-sans selection:bg-slate-200">

      {/* --- Navigation (mix-blend for landing) --- */}
      <header className="fixed top-0 left-0 right-0 z-50 mix-blend-exclusion">
        <div className="flex h-14 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4 md:gap-6">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-sm font-medium text-white hover:text-white/90 transition-colors"
            >
              <Logomark className="h-5 w-5" />
              <span className="font-semibold uppercase tracking-tight">Componentry</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/docs"
                className="px-3 py-1.5 text-sm text-white/70 hover:text-white transition-colors"
              >
                Docs
              </Link>
              <Link
                href="/changelog"
                className="px-3 py-1.5 text-sm text-white/70 hover:text-white transition-colors"
              >
                Changelog
              </Link>
              <Link
                href="https://github.com/harshjdhv/componentry"
                target="_blank"
                className="px-3 py-1.5 text-sm text-white/70 hover:text-white transition-colors"
              >
                GitHub
              </Link>
            </nav>
          </div>
        </div>
      </header>


      {/* --- Hero Section --- */}
      <section className="relative px-6 pt-32 pb-24 md:pt-48 md:pb-36 lg:pt-56 lg:pb-44 overflow-hidden">
        {/* Ambient Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] left-[20%] w-[600px] h-[600px] rounded-full bg-violet-200/30 blur-[120px]"
          />
          <motion.div
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.25, 0.4, 0.25] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[15%] right-[15%] w-[500px] h-[500px] rounded-full bg-sky-200/30 blur-[120px]"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[10%] left-[40%] w-[400px] h-[400px] rounded-full bg-rose-200/20 blur-[120px]"
          />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.12) 1px, transparent 1px)`,
              backgroundSize: '64px 64px'
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200/60 shadow-[0_1px_6px_rgba(0,0,0,0.04)] text-[13px] text-slate-600 font-medium mb-10 md:mb-14">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Open Source · 50+ Components
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[2.75rem] sm:text-7xl md:text-8xl lg:text-[6.5rem] font-black tracking-[-0.035em] leading-[0.9] text-slate-950"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Components for
            <br />
            <span className="bg-gradient-to-r from-slate-950 via-slate-600 to-slate-400 bg-clip-text text-transparent">
              Perfectionists.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 md:mt-10 text-lg md:text-xl text-slate-500 max-w-xl leading-relaxed tracking-tight font-medium"
          >
            Beautifully crafted components you can copy and paste into your apps. Accessible. Customizable. Open Source.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-10 md:mt-14"
          >
            <Link href="/docs" className="group h-12 px-8 rounded-full bg-slate-950 text-white font-semibold text-sm tracking-wide flex items-center gap-2.5 hover:bg-slate-800 hover:shadow-2xl hover:shadow-slate-950/25 transition-all active:scale-[0.98] shadow-xl shadow-slate-950/20">
              Browse Components
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <GitHubStarButton className="justify-center" theme="landing" />
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.2 }}
            className="mt-20 md:mt-28 flex items-center gap-6 md:gap-8 text-[11px] text-slate-400 font-mono uppercase tracking-[0.2em]"
          >
            <span>React</span>
            <span className="w-1 h-1 rounded-full bg-slate-200" />
            <span>Next.js</span>
            <span className="w-1 h-1 rounded-full bg-slate-200" />
            <span>Tailwind CSS</span>
            <span className="w-1 h-1 rounded-full bg-slate-200" />
            <span>Framer Motion</span>
          </motion.div>
        </div>
      </section>

      {/* --- DARK Section: The Collection --- */}
      <div className="py-8">
        <section className="py-20 md:py-28 px-6 relative overflow-hidden bg-neutral-950 rounded-[2.5rem] md:rounded-[3rem]">
          <div className="max-w-7xl mx-auto relative z-10">
            {/* Header - Dark mode typography */}
            <div className="mb-20 max-w-3xl">
              <motion.h2
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-8 text-white"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                The Collection.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-slate-400 max-w-[45ch] leading-relaxed font-medium tracking-tight"
              >
                Copy, paste, and ship. Every component is production-ready and designed to make your interfaces unforgettable.
              </motion.p>
            </div>

            {/* Asymmetric Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6" style={{ perspective: '1500px' }}>

              {/* Card 1: Magnet Lines - Large Featured */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotateX: 8 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7 group relative h-[380px] md:h-[450px] lg:h-[500px] rounded-3xl overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 bg-slate-900 rounded-3xl border border-slate-800" />
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center scale-[1.8] opacity-60">
                    <Suspense fallback={<ComponentPlaceholder className="w-full h-full" />}>
                      <MagnetLines
                        rows={9}
                        columns={9}
                        containerSize="60vmin"
                        lineColor="rgba(255,255,255,0.3)"
                        lineWidth="0.8vmin"
                        lineHeight="5vmin"
                        baseAngle={0}
                      />
                    </Suspense>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-slate-900 to-transparent">
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider mb-2 block">Background</span>
                      <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">Magnet Lines</h3>
                      <p className="text-sm text-white/50 mt-2 max-w-xs">Cursor-reactive magnetic field visualization with WebGL acceleration.</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-white/70" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: Liquid Blob */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotateX: 8 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 group relative h-[380px] md:h-[450px] lg:h-[500px] rounded-3xl overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 rounded-3xl overflow-hidden border border-slate-800 bg-neutral-950" />
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-0 z-20">
                  <Suspense fallback={<ComponentPlaceholder className="h-full w-full" />}>
                    <LiquidBlob interactive className="h-full w-full" />
                  </Suspense>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 z-30">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider mb-2 block">Visual Effect</span>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Liquid Blob</h3>
                  <p className="text-sm text-white/50 mt-2">Organic animated shape that responds to cursor movement.</p>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-6 right-6 w-3 h-3 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50 z-30"
                />
              </motion.div>

              {/* Card 3: Magnetic Dock - Full width */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotateX: 8 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-12 group relative h-[280px] rounded-3xl overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 bg-neutral-950 rounded-3xl border border-slate-800" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                  <span className="text-[12rem] md:text-[16rem] font-black text-white/[0.04] tracking-tighter leading-none">
                    DOCK
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center scale-[0.6] sm:scale-90 md:scale-100 -translate-y-8 md:translate-y-0">
                  <Suspense fallback={<ComponentPlaceholder className="w-96 h-20" />}>
                    <MagneticDock items={dockItems} />
                  </Suspense>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-slate-900/90 to-transparent flex items-end justify-between pointer-events-none">
                  <div>
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider mb-2 block">Navigation</span>
                    <h3 className="text-2xl font-bold text-white tracking-tight">Magnetic Dock</h3>
                  </div>
                  <p className="hidden md:block text-sm text-white/50 max-w-md text-right">macOS-inspired dock with physics-based magnetic scaling. Hover to experience.</p>
                </div>
              </motion.div>

              {/* Card 4: Matrix Rain */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotateX: 8 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6 group relative h-[320px] md:h-[380px] rounded-3xl overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 rounded-3xl overflow-hidden border border-slate-800 bg-black">
                  <Suspense fallback={<ComponentPlaceholder className="w-full h-full !bg-black" />}>
                    <MatrixRain variant="cyan" className="!bg-black" />
                  </Suspense>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900/95 via-slate-900/70 to-transparent">
                  <span className="text-[10px] font-mono text-emerald-400/60 uppercase tracking-wider mb-2 block">Iconic</span>
                  <h3 className="text-xl font-bold text-white tracking-tight">Matrix Rain</h3>
                  <p className="text-sm text-white/50 mt-1">Classic digital rain effect with customizable colors.</p>
                </div>
                <div className="absolute top-5 right-5 px-2 py-1 bg-emerald-500/20 backdrop-blur-sm rounded border border-emerald-500/30">
                  <span className="text-[10px] font-mono text-emerald-400">01101</span>
                </div>
              </motion.div>

              {/* Card 5: Pixel Canvas */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotateX: 8 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6 group relative h-[320px] md:h-[380px] rounded-3xl overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 rounded-3xl overflow-hidden border border-slate-800">
                  <Suspense fallback={<ComponentPlaceholder className="w-full h-full" />}>
                    <PixelCanvas
                      gap={10}
                      speed={0.04}
                      colors={["#a78bfa", "#f472b6", "#38bdf8", "#22d3ee"]}
                      variant="default"
                    />
                  </Suspense>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-neutral-950/95 via-neutral-950/70 to-transparent">
                  <span className="text-[10px] font-mono text-fuchsia-400/60 uppercase tracking-wider mb-2 block">Interactive</span>
                  <h3 className="text-xl font-bold text-white tracking-tight">Pixel Canvas</h3>
                  <p className="text-sm text-white/50 mt-1">Cursor-reactive pixel grid with stunning color trails.</p>
                </div>
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-5 right-5 flex gap-1"
                >
                  <div className="w-2 h-2 bg-fuchsia-400 rounded-sm" />
                  <div className="w-2 h-2 bg-violet-400 rounded-sm" />
                  <div className="w-2 h-2 bg-cyan-400 rounded-sm" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* --- Philosophy / Divider (Light Mode) --- */}
      <section className="py-24 md:py-32 px-6 bg-white text-slate-950 relative">
        <div className="max-w-4xl mx-auto text-center space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400">Philosophy</span>
            <h2
              className="text-4xl md:text-5xl lg:text-7xl text-slate-950 leading-[1.05] tracking-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              &quot;The best design is the one<br className="hidden md:block" /> you hardly notice.&quot;
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="grid md:grid-cols-3 gap-10 text-left max-w-4xl mx-auto pt-16"
          >
            <motion.div
              whileHover={{ y: -4 }}
              className="space-y-4 p-6 rounded-2xl hover:bg-slate-50 transition-colors cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center">
                <span className="font-mono font-bold text-sm text-white">01</span>
              </div>
              <h3 className="font-bold text-lg text-slate-950">Precision</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Every pixel is calculated. Spacing, typography, and motion are tuned for a cohesive feel.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -4 }}
              className="space-y-4 p-6 rounded-2xl hover:bg-slate-50 transition-colors cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center">
                <span className="font-mono font-bold text-sm text-white">02</span>
              </div>
              <h3 className="font-bold text-lg text-slate-950">Fluidity</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Animations that respect physics. Interactions that feel natural, not forced.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -4 }}
              className="space-y-4 p-6 rounded-2xl hover:bg-slate-50 transition-colors cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center">
                <span className="font-mono font-bold text-sm text-white">03</span>
              </div>
              <h3 className="font-bold text-lg text-slate-950">Restraint</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                No unnecessary flourishes. Just clean, functional design that stands the test of time.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- Footer --- */}
      <div className="pt-8">
        <footer className="py-20 md:py-32 bg-black relative overflow-hidden rounded-t-[2.5rem] md:rounded-t-[3rem]">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span className="text-[20vw] md:text-[15vw] font-black text-white/[0.03] tracking-tighter leading-none whitespace-nowrap">
              COMPONENTRY
            </span>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center text-center space-y-12">
              <h2
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[0.95]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Build Something<br />
                <span className="text-white/40 block mt-2 md:mt-4 md:inline md:text-white/40">Beautiful.</span>
              </h2>

              <div className="flex items-center gap-6 md:gap-10 text-sm md:text-base font-medium">
                <Link href="/docs" className="text-white/60 hover:text-white transition-colors">Docs</Link>
                <span className="text-white/20">·</span>
                <Link href="/components" className="text-white/60 hover:text-white transition-colors">Components</Link>
                <span className="text-white/20">·</span>
                <Link href="https://github.com/harshjdhv/componentry" target="_blank" className="text-white/60 hover:text-white transition-colors">GitHub</Link>
              </div>

              <div className="w-24 h-px bg-white/10" />

              <div className="space-y-4">
                <p className="text-white/40 text-xs uppercase tracking-widest">
                  Crafted with care by
                </p>
                <Link
                  href="https://x.com/harshjdhv"
                  target="_blank"
                  className="group inline-flex items-center gap-3 text-white text-2xl md:text-3xl font-bold hover:text-white/80 transition-colors tracking-tight"
                >
                  @harshjdhv
                  <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}