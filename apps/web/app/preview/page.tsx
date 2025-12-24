import type React from "react"
import { cn } from "@workspace/ui/lib/utils"

function BackgroundGrid({ className }: { className?: string }) {
  return (
    <svg
      className={cn("absolute inset-0 pointer-events-none", className)}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="grid-pattern"
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1" fill="currentColor" className="text-white/20" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  )
}

function HalftoneEffect({ className }: { className?: string }) {
  return (
    <svg
      className={cn("absolute inset-0 pointer-events-none", className)}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="halftone-dot"
          x="0"
          y="0"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.2" fill="currentColor" />
        </pattern>
        <radialGradient id="halftone-fade" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="0.15" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="halftone-mask">
          <rect width="100%" height="100%" fill="url(#halftone-fade)" />
        </mask>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="url(#halftone-dot)"
        mask="url(#halftone-mask)"
        className="text-white"
      />
    </svg>
  )
}

export default function PreviewPage(): React.JSX.Element {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#111] text-white overflow-hidden selection:bg-white/20 font-sans">
      {/* Backgrounds */}
      <BackgroundGrid />
      <HalftoneEffect />
      
      {/* Frame Border */}
      <div className="absolute inset-4 sm:inset-8 border border-white/10 rounded-3xl pointer-events-none z-20" />
      
      {/* Main Layout */}
      <div className="relative z-10 flex-1 flex flex-col p-8 sm:p-12">
        {/* Center Content */}
        <main className="flex-1 flex flex-col items-center justify-center text-center gap-8">
          <div className="space-y-2">
            <h1 
              className="text-7xl sm:text-8xl md:text-9xl tracking-tighter leading-[0.85] text-white mix-blend-difference"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Component
              <br />
              Playground
            </h1>
          </div>
          
          <div className="max-w-[400px] w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <p className="text-white/60 font-mono text-xs sm:text-sm tracking-widest uppercase max-w-md">
            Precision Crafted React Components
          </p>
        </main>
      </div>
    </div>
  )
}
