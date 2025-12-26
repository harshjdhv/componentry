"use client"

import type React from "react"
import Link from "next/link"
import { useEffect, useState } from "react"

function NoiseOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden mix-blend-overlay">
      <svg className="absolute inset-0 h-full w-full opacity-[0.4] dark:opacity-[0.25]">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  )
}

function GridBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
    </div>
  )
}

function FloatingCard({ className, offset = 0 }: { className?: string; offset?: number }) {
  const [y, setY] = useState(0)
  
  useEffect(() => {
    let frame: number
    const animate = () => {
      setY(Math.sin((Date.now() + offset * 1000) / 1000) * 10)
      frame = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(frame)
  }, [offset])
  
  return (
    <div
      className={`absolute w-32 h-20 rounded-xl bg-card border border-border/50 shadow-lg backdrop-blur-sm transition-transform ${className}`}
      style={{ transform: `translateY(${y}px)` }}
    >
      <div className="p-3 space-y-2">
        <div className="h-2 w-16 bg-muted rounded" />
        <div className="h-2 w-10 bg-muted rounded" />
      </div>
    </div>
  )
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [visible, setVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])
  
  return (
    <div 
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      {children}
    </div>
  )
}

export default function Page(): React.JSX.Element {
  return (
    <div className="min-h-svh flex flex-col relative">
      <NoiseOverlay />
      <GridBackground />

      <FloatingCard className="top-[15%] left-[10%] hidden lg:block opacity-60" offset={0} />
      <FloatingCard className="top-[25%] right-[12%] hidden lg:block opacity-40" offset={1} />
      <FloatingCard className="bottom-[20%] left-[15%] hidden lg:block opacity-50" offset={2} />
      <FloatingCard className="bottom-[30%] right-[8%] hidden lg:block opacity-30" offset={3} />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-3xl text-center space-y-8">
          <FadeIn delay={0}>
            <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-muted-foreground border border-border rounded-full mb-6">
              Experiments in UI
            </span>
          </FadeIn>
          
          <FadeIn delay={100}>
            <h1
              className="text-5xl sm:text-6xl md:text-8xl tracking-tight leading-[0.9]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Component
              <br />
              <span className="text-muted-foreground/70">Playground</span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={200}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              A personal workshop for handcrafted UI components. Not a design
              system. Just experiments, ideas, and iterations built in public.
            </p>
          </FadeIn>
          
          <FadeIn delay={300} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 w-full">
            <Link
              href="/docs"
              className="group inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity w-full sm:w-auto"
            >
              Browse Components
              <svg 
                className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a
              href="https://github.com/jadhavharshh/component-playground"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-medium border border-border hover:bg-accent transition-colors w-full sm:w-auto"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </a>
          </FadeIn>

          <FadeIn delay={400} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Actively building</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border" />
            <span>Progress &gt; polish</span>
          </FadeIn>
        </div>
      </main>

      <footer className="py-6 px-6 text-center text-sm text-muted-foreground">
        <p>Built with care, shipped with curiosity</p>
      </footer>
    </div>
  )
}
