"use client"

import type React from "react"
import Link from "next/link"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Layers, Zap, Box, Github, ArrowUpRight } from "lucide-react"
import { Logomark } from "@/components/logos/logomark"
import Lenis from "lenis"

function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])
}

function NoiseOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <svg className="absolute inset-0 h-full w-full opacity-[0.08] dark:opacity-[0.06]" style={{ mixBlendMode: "overlay" }}>
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  )
}

function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-[30%] -right-[10%] w-[800px] h-[800px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(200,200,255,0.03) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(200,200,255,0.02) 0%, transparent 70%)" }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
}

function GridLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at center, transparent 0%, var(--background) 70%)"
      }} />
    </div>
  )
}

function AnimatedText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  )
}

function FloatingElement({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      animate={{ y: [-8, 8, -8] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  )
}

function OrbitingElement({ className = "", duration = 20, radius = 300, startAngle = 0 }: { className?: string; duration?: number; radius?: number; startAngle?: number }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{
        left: "50%",
        top: "50%",
      }}
      animate={{
        rotate: 360,
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <motion.div
        style={{
          x: radius,
          rotate: startAngle,
        }}
        className="w-2 h-2 rounded-full bg-foreground/20"
      />
    </motion.div>
  )
}

function CodePreviewCard({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <motion.div
        className="w-64 rounded-xl border border-border/30 bg-card/40 backdrop-blur-md shadow-2xl shadow-black/5 dark:shadow-white/5 overflow-hidden"
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border/30">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <span className="ml-2 text-[10px] text-muted-foreground/50">component.tsx</span>
        </div>
        <div className="p-3 font-mono text-[10px] leading-relaxed">
          <div className="text-muted-foreground/40">{"// Premium UI"}</div>
          <div><span className="text-purple-400/70">import</span> <span className="text-foreground/60">{"{ Button }"}</span></div>
          <div className="text-muted-foreground/40 mt-2">{"// ..."}</div>
          <div className="mt-2">
            <span className="text-foreground/40">{"<"}</span>
            <span className="text-blue-400/70">Button</span>
            <span className="text-foreground/40">{" "}</span>
            <span className="text-green-400/70">variant</span>
            <span className="text-foreground/40">{"="}</span>
            <span className="text-amber-400/70">{'"shine"'}</span>
            <span className="text-foreground/40">{">"}</span>
          </div>
          <div className="pl-2 text-foreground/50">Click me</div>
          <div>
            <span className="text-foreground/40">{"</"}</span>
            <span className="text-blue-400/70">Button</span>
            <span className="text-foreground/40">{">"}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ComponentPreviewCard({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <motion.div
        className="w-56 rounded-xl border border-border/30 bg-card/40 backdrop-blur-md shadow-2xl shadow-black/5 dark:shadow-white/5 overflow-hidden"
        animate={{ y: [5, -5, 5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-foreground/10 to-foreground/5 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-foreground/40" />
            </div>
            <div>
              <div className="text-xs font-medium text-foreground/70">Border Beam</div>
              <div className="text-[10px] text-muted-foreground/50">Animated effect</div>
            </div>
          </div>
          <div className="h-20 rounded-lg border border-border/30 bg-background/50 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 border-2 border-transparent rounded-lg"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-[10px] text-muted-foreground/30">Preview</div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 h-7 rounded-md bg-foreground/10 flex items-center justify-center text-[10px] text-foreground/50">Copy</div>
            <div className="flex-1 h-7 rounded-md bg-foreground flex items-center justify-center text-[10px] text-background/80">Use</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function FloatingBadge({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <motion.div
        animate={{ y: [-3, 3, -3], rotate: [-1, 1, -1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="px-3 py-1.5 rounded-full border border-border/10 bg-background/50 backdrop-blur-md shadow-sm text-[10px] text-muted-foreground/80 whitespace-nowrap"
      >
        {text}
      </motion.div>
    </motion.div>
  )
}



function ConnectingLines() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
      <motion.line
        x1="10%"
        y1="20%"
        x2="30%"
        y2="50%"
        stroke="currentColor"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 1 }}
      />
      <motion.line
        x1="90%"
        y1="30%"
        x2="70%"
        y2="50%"
        stroke="currentColor"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 1.2 }}
      />
      <motion.line
        x1="15%"
        y1="70%"
        x2="35%"
        y2="55%"
        stroke="currentColor"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 1.4 }}
      />
      <motion.line
        x1="85%"
        y1="75%"
        x2="65%"
        y2="55%"
        stroke="currentColor"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 1.6 }}
      />
    </svg>
  )
}









export default function Page(): React.JSX.Element {
  useSmoothScroll()

  return (
    <div className="min-h-svh relative">
      <NoiseOverlay />
      <GridLines />
      <GradientOrbs />

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-40 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center group-hover:scale-105 transition-transform">
              <Logomark className="w-4 h-4 text-background" />
            </div>
            <span className="font-semibold tracking-tight hidden sm:block">Componentry</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/docs"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5"
            >
              Components
            </Link>
            <a
              href="https://github.com/harshjdhv/componentry"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm border border-border/50 rounded-full px-4 py-1.5 hover:bg-accent transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section
        className="min-h-svh flex flex-col items-center justify-center px-6 pt-20 pb-12 relative"
      >
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-wider uppercase text-muted-foreground border border-border/50 rounded-full bg-card/50 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Now Open Source
            </span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.9] mb-8" style={{ fontFamily: "var(--font-serif)" }}>
            <AnimatedText text="Crafted Interfaces." />
            <br />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-muted-foreground/60"
            >
              Zero Abstraction.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Production-ready animation primitives. Framer Motion + Tailwind.<br className="hidden sm:block" />
            Copy the source. Own the implementation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/docs"
              className="group relative inline-flex items-center justify-center gap-2 bg-foreground text-background px-8 py-4 rounded-full text-sm font-medium overflow-hidden transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-foreground/20 active:scale-[0.98]"
            >
              <span className="relative z-10">Browse Components</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" style={{ transform: 'skewX(-20deg)' }} />
              </div>
            </Link>
            <a
              href="https://github.com/harshjdhv/componentry"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-medium border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-accent hover:border-border transition-all"
            >
              <Github className="w-4 h-4" />
              Star on GitHub
            </a>
          </motion.div>
        </div>

        {/* Connecting Lines */}
        <ConnectingLines />

        {/* Left Side Elements */}
        <CodePreviewCard className="absolute top-[25%] left-[3%] hidden xl:block" delay={0.8} />
        <FloatingBadge text="Copy & Paste" className="absolute top-[18%] left-[18%] hidden lg:block" delay={1.4} />
        <FloatingElement className="absolute bottom-[30%] left-[5%] hidden lg:block" delay={0}>
          <div className="w-14 h-14 rounded-2xl border border-border/30 bg-card/30 backdrop-blur-sm flex items-center justify-center">
            <Layers className="w-5 h-5 text-muted-foreground/50" />
          </div>
        </FloatingElement>
        <FloatingBadge text="TypeScript" className="absolute bottom-[22%] left-[16%] hidden lg:block" delay={1.6} />

        {/* Right Side Elements */}
        <ComponentPreviewCard className="absolute top-[22%] right-[3%] hidden xl:block" delay={1} />
        <FloatingBadge text="Tailwind CSS" className="absolute top-[16%] right-[20%] hidden lg:block" delay={1.5} />
        <FloatingElement className="absolute bottom-[35%] right-[6%] hidden lg:block" delay={1.5}>
          <div className="w-16 h-16 rounded-2xl border border-border/30 bg-card/30 backdrop-blur-sm flex items-center justify-center">
            <Zap className="w-6 h-6 text-muted-foreground/50" />
          </div>
        </FloatingElement>
        <FloatingBadge text="Framer Motion" className="absolute bottom-[25%] right-[18%] hidden lg:block" delay={1.7} />

        {/* Small Floating Icons */}
        <FloatingElement className="absolute top-[45%] left-[6%] hidden md:block" delay={2}>
          <div className="w-10 h-10 rounded-xl border border-border/20 bg-card/20 backdrop-blur-sm flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-muted-foreground/30" />
          </div>
        </FloatingElement>
        <FloatingElement className="absolute top-[50%] right-[5%] hidden md:block" delay={2.5}>
          <div className="w-12 h-12 rounded-xl border border-border/20 bg-card/20 backdrop-blur-sm flex items-center justify-center">
            <Box className="w-5 h-5 text-muted-foreground/30" />
          </div>
        </FloatingElement>

        {/* Orbiting Dots */}
        <div className="absolute inset-0 hidden lg:block pointer-events-none">
          <OrbitingElement duration={25} radius={350} startAngle={0} />
          <OrbitingElement duration={30} radius={400} startAngle={90} />
          <OrbitingElement duration={35} radius={300} startAngle={180} />
          <OrbitingElement duration={40} radius={450} startAngle={270} />
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-border/50 flex items-start justify-center p-2"
          >
            <motion.div
              className="w-1 h-2 bg-muted-foreground/50 rounded-full"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </section>





      {/* Philosophy / Why Trust */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6" style={{ fontFamily: "var(--font-serif)" }}>
              The Architecture
            </h2>
          </motion.div>

          <div className="divide-y divide-border/20 border-y border-border/20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="py-6 md:py-8 grid grid-cols-1 md:grid-cols-[100px_1fr] gap-4"
            >
              <span className="font-mono text-xs text-muted-foreground/50 pt-1">01</span>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-1">It lives in your repo.</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  No abstraction layer. No waiting for maintainers. You have full control over the source code.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="py-6 md:py-8 grid grid-cols-1 md:grid-cols-[100px_1fr] gap-4"
            >
              <span className="font-mono text-xs text-muted-foreground/50 pt-1">02</span>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-1">Consumes your config.</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Built on standard Tailwind classes. Automatically inherits your project&apos;s fonts, colors, and spacing.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="py-6 md:py-8 grid grid-cols-1 md:grid-cols-[100px_1fr] gap-4"
            >
              <span className="font-mono text-xs text-muted-foreground/50 pt-1">03</span>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-1">Zero bloat.</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Copy only the components you need. No huge bundle to tree-shake.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 md:py-40 px-6 relative z-10 border-t border-foreground/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-foreground/[0.02] pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-10" style={{ fontFamily: "var(--font-serif)" }}>
              Ship faster.
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/docs"
                className="group relative inline-flex items-center justify-center gap-2 bg-foreground text-background px-8 py-4 rounded-full text-sm font-medium overflow-hidden transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-foreground/20 active:scale-[0.98]"
              >
                <span className="relative z-10">Start Building</span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" style={{ transform: 'skewX(-20deg)' }} />
                </div>
              </Link>
              <a
                href="https://github.com/harshjdhv/componentry"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-medium border border-border/50 hover:bg-accent hover:border-border transition-all"
              >
                View Source
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/30 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-foreground flex items-center justify-center">
              <Logomark className="w-3 h-3 text-background" />
            </div>
            <span className="text-sm text-muted-foreground">Built with obsession by Harsh</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/docs" className="hover:text-foreground transition-colors">Components</Link>
            <a href="https://github.com/harshjdhv/componentry" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
            <a href="https://twitter.com/harshjdhv" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
