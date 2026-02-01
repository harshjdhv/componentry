"use client"

import React, { useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { Grid, Layers, Box, Terminal, Zap, Hash, Command, CornerDownRight, Plus } from "lucide-react"

// --- Visual System ---
const colors = {
    bgLight: "#F5F5F4", // stone-100
    bgDark: "#1C1917", // stone-900
    textMain: "#0C0A09",
    textMuted: "#78716C",
    textInverted: "#E7E5E4",
    borderDark: "#292524",
    borderLight: "#D6D3D1",
}

export default function LandingPage() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    // Parallax for overlap effects
    const yOverlap = useTransform(scrollYProgress, [0, 0.2], [0, -80])

    return (
        <div
            className="min-h-screen w-full selection:bg-stone-900 selection:text-stone-50 font-sans overflow-hidden"
            style={{ backgroundColor: colors.bgLight, color: colors.textMain }}
            ref={containerRef}
        >
            {/* Navigation - Minimal */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 mix-blend-exclusion text-white pointer-events-none">
                <div className="text-xs font-bold tracking-tighter uppercase pointer-events-auto">
                    Componentry
                </div>
                <div className="flex gap-6 text-xs font-medium pointer-events-auto uppercase tracking-wider">
                    <Link href="/docs" className="hover:opacity-50">Docs</Link>
                    <Link href="/components" className="hover:opacity-50">Lib</Link>
                </div>
            </nav>

            {/* Hero Section - Aggressive Typography */}
            <section className="relative h-[85vh] flex flex-col justify-end px-4 pb-0 pt-32 overflow-hidden">
                <div className="w-full">
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[14vw] leading-[0.75] font-bold tracking-tighter text-[#1C1917] -ml-2 select-none"
                    >
                        BUILT FOR
                        <br />
                        <span className="opacity-20">DENSITY.</span>
                    </motion.h1>
                </div>

                <div className="absolute top-32 right-6 max-w-xs text-right">
                    <p className="text-sm font-medium leading-tight text-[#57534E]">
                        Not for marketing pages.<br />
                        For flight decks, data grids,<br />
                        and IDEs.
                    </p>
                </div>
            </section>

            {/* Feature Section: Overlapping & Cropped */}
            <motion.section
                style={{ y: yOverlap }}
                className="relative z-10 bg-[#1C1917] text-[#FAFAFA] pt-32 pb-48 px-0 overflow-visible"
            >
                <div className="max-w-screen-2xl mx-auto px-4 md:px-8 relative">
                    {/* Section Header as Layout Object */}
                    <h2 className="text-[8vw] font-medium tracking-tighter leading-none opacity-10 absolute -top-20 left-4 pointer-events-none select-none mix-blend-overlay">
                        PERMANENCE
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-t border-[#44403C]">
                        {/* Visual Fragment: The "Console" */}
                        <div className="lg:col-span-7 border-r border-[#44403C] relative min-h-[600px] overflow-hidden group">
                            <div className="absolute inset-0 bg-[#0C0A09]">
                                {/* Faux UI - Cropped offscreen */}
                                <div className="absolute top-8 left-8 right-[-100px] bottom-[-100px] bg-[#1C1917] border border-[#292524] rounded-tl-xl overflow-hidden shadow-2xl">
                                    <div className="h-10 border-b border-[#292524] flex items-center px-4 gap-4">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-[#292524]"></div>
                                            <div className="w-3 h-3 rounded-full bg-[#292524]"></div>
                                        </div>
                                        <div className="h-4 w-32 bg-[#292524] rounded-sm"></div>
                                    </div>
                                    <div className="p-0">
                                        {Array.from({ length: 15 }).map((_, i) => (
                                            <div key={i} className="flex border-b border-[#292524] hover:bg-[#292524] transition-colors">
                                                <div className="w-12 border-r border-[#292524] py-3 text-[#44403C] text-xs font-mono text-center">{i + 1}</div>
                                                <div className="flex-1 py-3 px-4 text-[#A8A29E] text-sm font-mono flex gap-4">
                                                    <span className="text-blue-400">const</span>
                                                    <span className="text-yellow-100">render</span>
                                                    <span className="opacity-50">=</span>
                                                    <span className="text-green-400">()</span>
                                                    <span className="opacity-50">=&gt;</span>
                                                    <span className="text-[#57534E]">{`{ /* logic fragments */ }`}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute bottom-8 left-8 text-xs font-mono text-[#78716C] uppercase tracking-widest bg-black/50 px-2 py-1 backdrop-blur-md">
                                Fragment 01 — Layout Engine
                            </div>
                        </div>

                        {/* Text Content - Pushed down */}
                        <div className="lg:col-span-5 p-12 flex flex-col justify-end bg-[#1C1917]">
                            <p className="text-2xl font-light leading-snug text-[#D6D3D1] max-w-sm ml-auto text-right">
                                Calculated weight.<br />
                                Components that claim space.<br />
                                <span className="opacity-40">No floating, no drifting.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* The Uncomfortable Grid - High Density */}
            <section className="bg-[#E7E5E4] py-0 border-t border-[#D6D3D1]">
                <div className="w-full">
                    <div className="flex justify-between px-4 py-4 border-b border-[#D6D3D1] bg-[#F5F5F4] sticky top-0 z-20">
                        <span className="text-[10px] uppercase tracking-widest font-bold">Primitive Map</span>
                        <span className="text-[10px] uppercase tracking-widest font-mono text-[#78716C]">0—100</span>
                    </div>
                    {/* 12 Column Grid - Very Dense */}
                    <div className="grid grid-cols-6 md:grid-cols-12 gap-px bg-[#D6D3D1] border-b border-[#D6D3D1]">
                        {Array.from({ length: 84 }).map((_, i) => (
                            <div
                                key={i}
                                className="bg-[#F5F5F4] aspect-square flex flex-col justify-between p-2 hover:bg-[#FFFFFF] transition-colors duration-75 group cursor-crosshair overflow-hidden"
                            >
                                <span className="text-[8px] text-[#A8A29E] font-mono opacity-50 group-hover:opacity-100">{i.toString().padStart(3, '0')}</span>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    {i % 5 === 0 && <Box className="w-3 h-3" />}
                                    {i % 5 === 1 && <Command className="w-3 h-3" />}
                                    {i % 5 === 2 && <Hash className="w-3 h-3" />}
                                    {i % 5 === 3 && <CornerDownRight className="w-3 h-3" />}
                                    {i % 5 === 4 && <Plus className="w-3 h-3" />}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Typographic Moment - Cut Off */}
            <section className="py-48 bg-[#0C0A09] text-[#F5F5F4] overflow-hidden relative">
                <h2 className="text-[18vw] font-bold tracking-tighter leading-[0.8] whitespace-nowrap absolute left-[-2vw]">
                    IF YOU KNOW
                </h2>
                <h2 className="text-[18vw] font-bold tracking-tighter leading-[0.8] whitespace-nowrap absolute left-[15vw] top-[30vw] md:top-[16vw] opacity-30">
                    YOU KNOW
                </h2>
                <div className="h-[40vh] md:h-[60vh] w-full"></div> {/* Spacer for the absolute text */}
            </section>

            {/* Footer / CTA - Stark */}
            <footer className="py-24 px-6 md:px-12 bg-[#F5F5F4] border-t border-[#E7E5E4] flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                <div className="max-w-xl">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#1C1917] mb-8 leading-none">
                        Start building<br />serious software.
                    </h2>
                    <div className="flex gap-0 border border-[#1C1917]">
                        <Link
                            href="/docs"
                            className="h-14 px-8 bg-[#1C1917] text-[#F5F5F4] flex items-center justify-center text-sm font-bold uppercase tracking-wider hover:bg-[#000] transition-colors"
                        >
                            Get V1.0
                        </Link>
                        <Link
                            href="https://github.com/harshjdhv/componentry"
                            className="h-14 px-8 bg-transparent text-[#1C1917] flex items-center justify-center text-sm font-bold uppercase tracking-wider hover:bg-[#E7E5E4] transition-colors border-l border-[#1C1917]"
                        >
                            GitHub
                        </Link>
                    </div>
                </div>

                <div className="text-xs font-mono text-[#78716C] flex gap-8">
                    <span>© 2024 COMPONENTRY</span>
                    <span>OS LAUNCH</span>
                </div>
            </footer>
        </div>
    )
}