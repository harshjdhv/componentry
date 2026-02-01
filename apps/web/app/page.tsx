"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Search, Zap } from "lucide-react"
import { MagnetLinesDemo } from "../components/docs/previews/magnet-lines-preview"
import { LiquidBlobDemo } from "../components/docs/previews/liquid-blob-preview"
import { PixelCanvasDemo } from "../components/docs/previews/pixel-canvas-preview"
import { MatrixRainDemo } from "../components/docs/previews/matrix-rain-preview"
import {
    MagneticDock,
    DockIconHome,
    DockIconSearch,
    DockIconFolder,
    DockIconMail,
    DockIconMusic,
    DockIconSettings,
    DockIconTrash,
} from "@workspace/ui/components/magnetic-dock"

export default function LandingPage() {


    return (
        <div className="min-h-screen w-full bg-[#FFFFFF] text-slate-950 font-sans selection:bg-slate-200">

            {/* --- Navigation --- */}
            <nav className="fixed top-0 left-0 right-0 z-50 pointer-events-none mix-blend-exclusion text-white">
                <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 font-bold tracking-tighter uppercase pointer-events-auto select-none">
                        <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-black" />
                        </div>
                        Componentry
                    </Link>
                    <div className="flex gap-6 text-xs font-medium pointer-events-auto uppercase tracking-wider">
                        <Link href="/docs" className="hover:opacity-50 transition-opacity">Docs</Link>
                        <Link href="/components" className="hover:opacity-50 transition-opacity">Components</Link>
                        <Link href="https://github.com/harshjdhv/componentry" className="hover:opacity-50 transition-opacity">GitHub</Link>
                    </div>
                </div>
            </nav>

            {/* --- Hero Section --- */}
            <section className="relative px-6 pt-32 pb-40 md:pt-48 md:pb-56 overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute top-[-20%] right-[-5%] w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-[100px] -z-10 mix-blend-multiply" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[80px] -z-10 mix-blend-multiply" />

                <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    {/* Left Column (Content) */}
                    <div className="flex flex-col items-start text-left space-y-8 order-2 lg:order-1">

                        {/* Micro-detail: Bolder, high-contrast badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-md bg-white border border-slate-950 text-[11px] font-mono font-bold text-slate-950 shadow-sm"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-950"></span>
                            </span>
                            <span className="tracking-wide uppercase">System v1.0</span>
                        </motion.div>

                        <div className="space-y-6">
                            <motion.h1
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
                                className="text-6xl sm:text-7xl md:text-8xl lg:text-[5.5rem] xl:text-[6rem] font-black tracking-tight leading-[0.95] text-balance max-w-[25ch]"
                                style={{ fontFamily: "var(--font-serif)" }}
                            >
                                <span className="bg-clip-text text-transparent bg-gradient-to-br from-neutral-950 via-neutral-800 to-neutral-600">
                                    Components for Perfectionists.
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="text-lg text-slate-800 max-w-[40ch] leading-relaxed font-medium tracking-tight"
                            >
                                Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2"
                        >
                            <Link href="/components" className="h-12 px-6 rounded-lg bg-slate-950 text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 hover:bg-slate-900 transition-all shadow-xl shadow-slate-950/20 active:scale-[0.98]">
                                Browse Components <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                            <div className="relative group min-w-[240px]">
                                <div className="h-12 pl-10 pr-4 rounded-lg border border-slate-200 bg-white/50 backdrop-blur-sm text-slate-500 w-full flex items-center text-sm transition-all group-hover:border-slate-300 group-hover:bg-white cursor-text shadow-sm">
                                    <Search className="w-4 h-4 absolute left-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                                    <span>Search components...</span>
                                    <div className="ml-auto text-[10px] font-bold bg-slate-100 border border-slate-200 px-1.5 py-1 rounded text-slate-400">⌘K</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Dramatic 3D Floating Card */}
                    <div className="relative w-full flex items-center justify-center order-1 lg:order-2" style={{ perspective: '1200px' }}>
                        {/* Ambient glow */}
                        <div className="absolute w-96 h-96 bg-gradient-to-br from-slate-300/30 via-slate-200/20 to-transparent rounded-full blur-3xl -z-10" />

                        {/* The floating card */}
                        <motion.div
                            initial={{ opacity: 0, rotateX: 25, rotateY: -15, scale: 0.9 }}
                            animate={{ opacity: 1, rotateX: 12, rotateY: -8, scale: 1 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ rotateX: 8, rotateY: -4, scale: 1.02 }}
                            className="relative w-full max-w-[400px] cursor-pointer group"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {/* Shadow layer */}
                            <div className="absolute inset-0 bg-slate-950/15 rounded-3xl blur-2xl translate-y-6 scale-95" />

                            {/* Component Grid */}
                            <div className="relative grid grid-cols-2 gap-4 p-6 bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200/80 shadow-2xl">

                                {/* Button Component */}
                                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-3 block">Button</span>
                                    <div className="space-y-2">
                                        <button className="w-full h-9 rounded-lg bg-slate-950 text-white text-xs font-bold hover:bg-slate-800 transition-colors">
                                            Primary
                                        </button>
                                        <button className="w-full h-9 rounded-lg border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition-colors">
                                            Secondary
                                        </button>
                                    </div>
                                </div>

                                {/* Toggle Component */}
                                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-3 block">Toggle</span>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-slate-600">Dark mode</span>
                                            <div className="w-10 h-6 rounded-full bg-slate-950 relative">
                                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow" />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-slate-600">Notifications</span>
                                            <div className="w-10 h-6 rounded-full bg-slate-200 relative">
                                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Input Component */}
                                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-3 block">Input</span>
                                    <div className="h-10 rounded-lg border border-slate-200 bg-white px-3 flex items-center">
                                        <Search className="w-4 h-4 text-slate-400 mr-2" />
                                        <span className="text-xs text-slate-400">Search...</span>
                                    </div>
                                </div>

                                {/* Badge Component */}
                                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-3 block">Badge</span>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-2 py-1 rounded-md bg-slate-950 text-white text-[10px] font-bold">New</span>
                                        <span className="px-2 py-1 rounded-md bg-emerald-100 text-emerald-700 text-[10px] font-bold">Active</span>
                                        <span className="px-2 py-1 rounded-md bg-amber-100 text-amber-700 text-[10px] font-bold">Pending</span>
                                    </div>
                                </div>

                                {/* Card Component - Full Width */}
                                <div className="col-span-2 bg-slate-950 rounded-2xl p-4 text-white">
                                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-3 block">Card</span>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                            <Zap className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-bold">Component Library</div>
                                            <div className="text-xs text-slate-400">50+ primitives ready to use</div>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-slate-500" />
                                    </div>
                                </div>
                            </div>

                            {/* Floating accent */}
                            <motion.div
                                animate={{ y: [0, -6, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-3 -right-3 px-3 py-1.5 bg-slate-950 text-white rounded-full text-[10px] font-bold shadow-xl"
                            >
                                50+ Components
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Large Background Text */}
                <div className="absolute bottom-0 left-0 right-0 select-none overflow-hidden pointer-events-none opacity-20">
                    <h1 className="text-[15vw] font-bold text-slate-100 text-center leading-[0.7] tracking-tighter" aria-hidden="true">
                        SYSTEM
                    </h1>
                </div>
            </section>

            {/* --- Dark Section Wrapper --- */}
            <div className="bg-black text-white">

                {/* --- The Collection (Redesigned) --- */}
                <section className="py-32 md:py-40 px-6 relative overflow-hidden bg-black">
                    {/* Premium background effects */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-[10%] right-[5%] w-[700px] h-[700px] bg-indigo-600/8 rounded-full blur-[150px]" />
                        <div className="absolute bottom-[20%] left-[-5%] w-[500px] h-[500px] bg-violet-600/8 rounded-full blur-[120px]" />
                    </div>

                    {/* Large background text like hero */}
                    <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 select-none overflow-hidden pointer-events-none opacity-[0.03]">
                        <h1 className="text-[20vw] font-black text-white text-center leading-[0.8] tracking-tighter whitespace-nowrap" aria-hidden="true">
                            PRIMITIVES
                        </h1>
                    </div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        {/* Header - Hero inspired typography */}
                        <div className="mb-24 max-w-3xl">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono font-bold text-white/70 mb-8"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                                </span>
                                <span className="tracking-wide uppercase">Live Components</span>
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, scale: 0.98 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
                                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-8"
                                style={{ fontFamily: "var(--font-serif)" }}
                            >
                                <span className="bg-clip-text text-transparent bg-gradient-to-br from-white via-white/90 to-white/50">
                                    Built Different.
                                </span>
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-lg md:text-xl text-white/50 max-w-[45ch] leading-relaxed font-medium tracking-tight"
                            >
                                Not mockups. Not screenshots. Real, interactive primitives engineered for the craft-obsessed.
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
                                className="lg:col-span-7 group relative h-[450px] lg:h-[500px] rounded-3xl overflow-hidden"
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                {/* Card shadow */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 rounded-3xl blur-xl translate-y-4 scale-95 -z-10" />

                                {/* Glass card */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-white/[0.02] rounded-3xl border border-white/10" />

                                {/* Component Display */}
                                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center scale-[1.8] opacity-60">
                                        <MagnetLinesDemo />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider mb-2 block">Background</span>
                                            <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">Magnet Lines</h3>
                                            <p className="text-sm text-white/50 mt-2 max-w-xs">Cursor-reactive magnetic field visualization with WebGL acceleration.</p>
                                        </div>
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                                            <ArrowRight className="w-5 h-5 text-white/70" />
                                        </div>
                                    </div>
                                </div>

                                {/* Floating tag */}
                                <motion.div
                                    animate={{ y: [0, -4, 0] }}
                                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute top-6 right-6 px-3 py-1.5 bg-white text-black rounded-full text-[10px] font-bold shadow-2xl"
                                >
                                    Interactive
                                </motion.div>
                            </motion.div>

                            {/* Card 2: Liquid Blob - Has its own dark bg */}
                            <motion.div
                                initial={{ opacity: 0, y: 30, rotateX: 8 }}
                                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="lg:col-span-5 group relative h-[450px] lg:h-[500px] rounded-3xl overflow-hidden"
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 rounded-3xl blur-xl translate-y-4 scale-95 -z-10" />

                                {/* Component fills the card - has its own zinc-900 bg */}
                                <div className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10">
                                    <LiquidBlobDemo />
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider mb-2 block">Visual Effect</span>
                                    <h3 className="text-2xl font-bold text-white tracking-tight">Liquid Blob</h3>
                                    <p className="text-sm text-white/50 mt-2">Organic animated shape that responds to cursor movement.</p>
                                </div>

                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute top-6 right-6 w-3 h-3 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"
                                />
                            </motion.div>

                            {/* Card 3: Magnetic Dock - Full width with background text */}
                            <motion.div
                                initial={{ opacity: 0, y: 30, rotateX: 8 }}
                                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="lg:col-span-12 group relative h-[280px] rounded-3xl overflow-hidden"
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 rounded-3xl blur-xl translate-y-4 scale-95 -z-10" />
                                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-white/[0.02] rounded-3xl border border-white/10" />

                                {/* Background text */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                                    <span className="text-[12rem] md:text-[16rem] font-black text-white/[0.03] tracking-tighter leading-none">
                                        DOCK
                                    </span>
                                </div>

                                {/* Dock component - directly without wrapper */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <MagneticDock
                                        items={[
                                            { id: "home", label: "Home", icon: <DockIconHome />, isActive: true },
                                            { id: "search", label: "Search", icon: <DockIconSearch /> },
                                            { id: "folder", label: "Finder", icon: <DockIconFolder /> },
                                            { id: "mail", label: "Mail", icon: <DockIconMail />, badge: 3 },
                                            { id: "music", label: "Music", icon: <DockIconMusic /> },
                                            { id: "settings", label: "Settings", icon: <DockIconSettings /> },
                                            { id: "trash", label: "Trash", icon: <DockIconTrash /> },
                                        ]}
                                    />
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-between">
                                    <div>
                                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider mb-2 block">Navigation</span>
                                        <h3 className="text-2xl font-bold text-white tracking-tight">Magnetic Dock</h3>
                                    </div>
                                    <p className="text-sm text-white/50 max-w-md text-right">macOS-inspired dock with physics-based magnetic scaling. Hover to experience.</p>
                                </div>
                            </motion.div>

                            {/* Card 4: Matrix Rain - Has its own dark bg */}
                            <motion.div
                                initial={{ opacity: 0, y: 30, rotateX: 8 }}
                                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="lg:col-span-6 group relative h-[380px] rounded-3xl overflow-hidden"
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 rounded-3xl blur-xl translate-y-4 scale-95 -z-10" />

                                {/* Full bleed component - has its own bg */}
                                <div className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10 bg-black">
                                    <MatrixRainDemo />
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/95 via-black/70 to-transparent">
                                    <span className="text-[10px] font-mono text-emerald-400/60 uppercase tracking-wider mb-2 block">Iconic</span>
                                    <h3 className="text-xl font-bold text-white tracking-tight">Matrix Rain</h3>
                                    <p className="text-sm text-white/50 mt-1">Classic digital rain effect with customizable colors.</p>
                                </div>

                                <div className="absolute top-5 right-5 px-2 py-1 bg-emerald-500/20 backdrop-blur-sm rounded border border-emerald-500/30">
                                    <span className="text-[10px] font-mono text-emerald-400">01101</span>
                                </div>
                            </motion.div>

                            {/* Card 5: Pixel Canvas - Has neutral-950 bg */}
                            <motion.div
                                initial={{ opacity: 0, y: 30, rotateX: 8 }}
                                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="lg:col-span-6 group relative h-[380px] rounded-3xl overflow-hidden"
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 rounded-3xl blur-xl translate-y-4 scale-95 -z-10" />

                                {/* Full bleed component - has its own bg */}
                                <div className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10">
                                    <PixelCanvasDemo />
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

                        {/* CTA - Hero inspired button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="mt-20 md:mt-28 flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Link
                                href="/components"
                                className="h-14 px-10 rounded-xl bg-white text-black font-bold text-sm tracking-wide flex items-center justify-center gap-3 hover:bg-white/90 transition-all shadow-2xl shadow-white/10 active:scale-[0.98]"
                            >
                                Explore All Components
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/docs"
                                className="h-14 px-10 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm text-white font-medium text-sm tracking-wide flex items-center justify-center hover:bg-white/10 transition-all"
                            >
                                Read Documentation
                            </Link>
                        </motion.div>

                        {/* Stats row */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="mt-20 pt-12 border-t border-white/5 grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center"
                        >
                            <div>
                                <div className="text-3xl md:text-4xl font-black text-white tracking-tight">50+</div>
                                <div className="text-sm text-white/40 mt-1">Components</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-black text-white tracking-tight">100%</div>
                                <div className="text-sm text-white/40 mt-1">Accessible</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-black text-white tracking-tight">0</div>
                                <div className="text-sm text-white/40 mt-1">Dependencies</div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* --- Philosophy / Divider (Dark Mode) --- */}
                <section className="py-24 md:py-32 px-6 border-t border-neutral-900 bg-black text-white relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] -z-10" />

                    <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.1] tracking-tight">
                                &quot;The best design is the one<br className="hidden md:block" /> you hardly notice.&quot;
                            </h2>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="grid md:grid-cols-3 gap-8 text-left max-w-3xl mx-auto pt-12"
                        >
                            <div className="space-y-3">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4 border border-white/10">
                                    <span className="font-mono font-bold text-sm text-white">01</span>
                                </div>
                                <h3 className="font-bold text-white">Precision</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Every pixel is calculated. Spacing, typography, and motion are tuned for a cohesive feel.
                                </p>
                            </div>
                            <div className="space-y-3">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4 border border-white/10">
                                    <span className="font-mono font-bold text-sm text-white">02</span>
                                </div>
                                <h3 className="font-bold text-white">Fluidity</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Animations that respect physics. Interactions that feel natural, not forced.
                                </p>
                            </div>
                            <div className="space-y-3">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4 border border-white/10">
                                    <span className="font-mono font-bold text-sm text-white">03</span>
                                </div>
                                <h3 className="font-bold text-white">Restraint</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    No unnecessary flourishes. Just clean, functional design that stands the test of time.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* --- CTA / Footer Mock --- */}
                <section className="py-24 md:py-32 px-6 overflow-hidden relative border-t border-neutral-900">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-neutral-900/40 via-black to-black" />

                    <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter" style={{ fontFamily: "var(--font-serif)" }}>
                            Start Building.
                        </h2>
                        <p className="text-lg text-slate-400 max-w-xl mx-auto">
                            Stop reinventing the wheel. Use the system that powers the next generation of web applications.
                        </p>
                        <div className="flex items-center justify-center gap-4 pt-8">
                            <Link href="/docs" className="h-12 px-8 rounded-full bg-white text-slate-950 font-bold text-sm tracking-wide flex items-center hover:scale-105 transition-transform">
                                Read the Docs
                            </Link>
                            <Link href="https://github.com/harshjdhv/componentry" className="h-12 px-8 rounded-full border border-slate-800 bg-slate-900/50 text-white font-medium text-sm tracking-wide flex items-center hover:bg-slate-800 transition-colors">
                                <span className="mr-2">GitHub</span>
                            </Link>
                        </div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto mt-32 pt-12 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center text-sm text-slate-600">
                        <p>&copy; 2024 Componentry. All rights reserved.</p>
                        <div className="flex gap-8 mt-4 md:mt-0">
                            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                            <Link href="https://twitter.com/harshjdhv" className="hover:text-white transition-colors">Twitter</Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}