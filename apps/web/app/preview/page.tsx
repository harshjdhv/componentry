"use client"

import React from "react"
import { ComponentryLogomark } from "@/components/logos/componentry-logomark"
import { WebGLLiquid } from "@/components/landing/webgl-liquid"

export default function PreviewPage() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#09090b] text-zinc-100 selection:bg-white/20">

      {/* Background with WebGLLiquid */}
      <div className="absolute inset-0 z-0 bg-[#09090b]">
        <WebGLLiquid delayMs={0} className="absolute inset-0 z-10 block h-full w-full opacity-90" />
        {/* Subtle vignette/gradient overlays for depth and text legibility */}
        <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_0%,#09090b_90%)] opacity-80" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#09090b] via-transparent to-[#09090b]/40" />
      </div>

      {/* Main Content */}
      <div className="relative z-30 flex flex-col items-center gap-2 p-12 text-center">

        {/* Badge / Status */}
        <div className="animate-fade-in-up inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md mb-2 shadow-lg shadow-black/20">
          <span className="mr-2.5 flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-sm font-semibold tracking-wide text-zinc-300 uppercase">
            Premium UI Library
          </span>
        </div>

        {/* Logo & Title Section */}
        <div className="flex flex-row items-center justify-center gap-10 md:gap-16">
          <div className="relative group">
            <div className="absolute inset-0 animate-pulse bg-indigo-500/20 blur-[60px] rounded-full duration-[3s]" />
            <ComponentryLogomark className="relative h-32 w-32 md:h-48 md:w-48 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-transform duration-700 hover:scale-105" />
          </div>

          <div className="flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-[8rem] leading-none pb-2 pr-2">
              <span className="bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent block pb-4 pr-2">
                Componentry
              </span>
            </h1>
          </div>
        </div>

        {/* Subtitle / Description */}
        <p className="max-w-3xl text-2xl font-medium text-zinc-400 md:text-3xl leading-relaxed tracking-tight">
          A collection of refined, animated React primitives <br className="hidden md:block" /> for building premium product interfaces.
        </p>
      </div>
    </div>
  )
}
