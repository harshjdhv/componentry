"use client"

import type React from "react"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { ArrowRight, Sparkles, Layers, Zap, Box, Github, ArrowUpRight } from "lucide-react"

function NoiseOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <svg className="absolute inset-0 h-full w-full opacity-[0.35] dark:opacity-[0.2]" style={{ mixBlendMode: "overlay" }}>
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
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
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute -bottom-60 -left-60 w-[800px] h-[800px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)" }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.015) 0%, transparent 50%)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
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
        className="px-3 py-1.5 rounded-full border border-border/30 bg-card/50 backdrop-blur-sm text-[10px] text-muted-foreground/70 whitespace-nowrap"
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

function ComponentCard({ 
  title, 
  description, 
  icon: Icon, 
  href, 
  gradient,
  delay = 0 
}: { 
  title: string
  description: string
  icon: React.ElementType
  href: string
  gradient: string
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={href} className="group block">
        <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 h-full transition-all duration-500 hover:border-border hover:bg-card/80 hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-white/5">
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${gradient}`} />
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-foreground/5 border border-border/50 group-hover:bg-foreground/10 transition-colors">
                <Icon className="w-5 h-5 text-foreground/70" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
            </div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-foreground transition-colors">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function StatCard({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-semibold tracking-tight mb-1" style={{ fontFamily: "var(--font-display)" }}>
        {value}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </motion.div>
  )
}

function MarqueeItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 px-6 py-3 mx-2 rounded-full border border-border/30 bg-card/30 backdrop-blur-sm">
      {children}
    </div>
  )
}

function InfiniteMarquee() {
  const items = [
    "Handcrafted with precision",
    "Built for developers",
    "Open source forever",
    "Pixel-perfect details",
    "Smooth animations",
    "Dark mode ready",
    "TypeScript first",
    "Tailwind powered",
  ]
  
  return (
    <div className="relative overflow-hidden py-4">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      <motion.div
        className="flex"
        animate={{ x: [0, -1920] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <MarqueeItem key={i}>
            <Sparkles className="w-3.5 h-3.5 text-muted-foreground/50" />
            <span className="text-sm text-muted-foreground whitespace-nowrap">{item}</span>
          </MarqueeItem>
        ))}
      </motion.div>
    </div>
  )
}

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="text-center max-w-2xl mx-auto mb-16"
    >
      <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-muted-foreground border border-border/50 rounded-full mb-6">
        {eyebrow}
      </span>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-4" style={{ fontFamily: "var(--font-serif)" }}>
        {title}
      </h2>
      <p className="text-muted-foreground text-lg leading-relaxed">{description}</p>
    </motion.div>
  )
}

export default function Page(): React.JSX.Element {
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])
  
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
              <Box className="w-4 h-4 text-background" />
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
              href="https://github.com/jadhavharshh/componentry"
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
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale }}
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
            <AnimatedText text="Premium UI" />
            <br />
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-muted-foreground/60"
            >
              Components
            </motion.span>
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10"
          >
            A curated collection of handcrafted React components. Meticulously designed, 
            beautifully animated, and built for modern interfaces.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/docs"
              className="group relative inline-flex items-center justify-center gap-2 bg-foreground text-background px-8 py-4 rounded-full text-sm font-medium overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10">Explore Components</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/80 to-foreground"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
            </Link>
            <a
              href="https://github.com/jadhavharshh/componentry"
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
      </motion.section>

      {/* Marquee */}
      <section className="py-8 border-y border-border/30 bg-card/20 backdrop-blur-sm relative z-10">
        <InfiniteMarquee />
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <StatCard value="10+" label="Components" delay={0} />
            <StatCard value="100%" label="TypeScript" delay={0.1} />
            <StatCard value="0" label="Dependencies*" delay={0.2} />
            <StatCard value="∞" label="Possibilities" delay={0.3} />
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center text-xs text-muted-foreground/50 mt-8"
          >
            *Beyond React and Tailwind CSS
          </motion.p>
        </div>
      </section>

      {/* Components Showcase */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="The Collection"
            title="Crafted with obsession"
            description="Every component is built with attention to detail, smooth animations, and developer experience in mind."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ComponentCard
              title="Flight Status Card"
              description="A premium data visualization component with dot-matrix typography and real-time progress tracking."
              icon={Layers}
              href="/docs/components/flight-status-card"
              gradient="bg-gradient-to-br from-blue-500/5 via-transparent to-transparent"
              delay={0}
            />
            <ComponentCard
              title="Spotlight Card"
              description="Interactive cards with cursor-following spotlight effects and smooth hover transitions."
              icon={Zap}
              href="/docs/components/spotlight-card"
              gradient="bg-gradient-to-br from-purple-500/5 via-transparent to-transparent"
              delay={0.1}
            />
            <ComponentCard
              title="Border Beam"
              description="Animated border effects that add a premium touch to any card or container element."
              icon={Sparkles}
              href="/docs/components/border-beam"
              gradient="bg-gradient-to-br from-amber-500/5 via-transparent to-transparent"
              delay={0.2}
            />
            <ComponentCard
              title="Button Variants"
              description="A comprehensive button system with multiple variants, sizes, and animation states."
              icon={Box}
              href="/docs/components/button"
              gradient="bg-gradient-to-br from-green-500/5 via-transparent to-transparent"
              delay={0.3}
            />
            <div className="md:col-span-2 lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href="/docs" className="group block">
                  <div className="relative overflow-hidden rounded-2xl border border-dashed border-border/50 bg-card/30 backdrop-blur-sm p-8 h-full transition-all duration-500 hover:border-border hover:bg-card/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">More Components</h3>
                        <p className="text-sm text-muted-foreground">Explore the full collection and find what you need</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        <span>View all</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 md:p-12"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-foreground/[0.02] to-transparent rounded-full blur-3xl" />
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-muted-foreground border border-border/50 rounded-full mb-6">
                Philosophy
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl leading-relaxed mb-6" style={{ fontFamily: "var(--font-serif)" }}>
                &ldquo;A sketchbook, not a system. Ideas are rough. Experiments are welcome. 
                Nothing here is meant to be complete.&rdquo;
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                This is a personal workshop for building UI components in public. Progress over polish. 
                Learning in the open. Every component is an iteration, every update a step forward.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6" style={{ fontFamily: "var(--font-serif)" }}>
              Start building today
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              Copy, paste, and customize. Every component is yours to use and modify freely.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/docs"
                className="group inline-flex items-center justify-center gap-2 bg-foreground text-background px-8 py-4 rounded-full text-sm font-medium hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Started
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="https://github.com/jadhavharshh/componentry"
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
              <Box className="w-3 h-3 text-background" />
            </div>
            <span className="text-sm text-muted-foreground">Built with obsession by Harsh</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/docs" className="hover:text-foreground transition-colors">Components</Link>
            <a href="https://github.com/jadhavharshh/componentry" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
            <a href="https://twitter.com/jadhavharshh" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
