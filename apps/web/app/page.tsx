"use client"

import React, { useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Command, Search, Layout, MousePointer2, Zap, Terminal, Component, CreditCard, Settings } from "lucide-react"

export default function LandingPage() {
    const containerRef = useRef(null)

    return (
        <div className="min-h-screen w-full bg-[#FFFFFF] text-slate-950 font-sans selection:bg-slate-200" ref={containerRef}>

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

            {/* --- Featured Components Section (Dark) --- */}
            <section className="bg-[#050505] text-white py-32 px-6 rounded-t-[3rem] relative z-20 shadow-2xl">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Featured Components</h2>
                        <p className="text-slate-400">Explore our most popular copy-paste primitives.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1: Button/Interaction */}
                        <div className="group relative aspect-[4/3] rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden hover:border-neutral-700 transition-colors">
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-800/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <button className="px-6 py-2.5 rounded-lg bg-white text-black font-medium shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-shadow scale-100 active:scale-95 duration-200">
                                    Hover Me
                                </button>
                            </div>
                            <span className="absolute bottom-4 left-4 text-xs font-mono text-neutral-500 bg-neutral-950/50 px-2 py-1 rounded border border-neutral-800">
                                Glow Button
                            </span>
                        </div>

                        {/* Card 2: Stacked/Depth */}
                        <div className="group relative aspect-[4/3] rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden hover:border-neutral-700 transition-colors">
                            <div className="absolute inset-0 bg-[#0A0A0A]" />
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <div className="w-48 h-16 bg-neutral-800 rounded-xl border border-neutral-700 shadow-xl z-20 flex items-center px-4 animate-in slide-in-from-bottom-4 duration-700">
                                    <div className="h-2 w-2 rounded-full bg-red-500 mr-2" />
                                    <div className="h-2 w-20 bg-neutral-600 rounded-full" />
                                </div>
                                <div className="w-40 h-16 bg-neutral-800/50 rounded-xl border border-neutral-700/50 -mt-12 z-10 scale-90 blur-[1px]" />
                            </div>
                            <span className="absolute bottom-4 left-4 text-xs font-mono text-neutral-500 bg-neutral-950/50 px-2 py-1 rounded border border-neutral-800">
                                Stacked Toast
                            </span>
                        </div>

                        {/* Card 3: Input/Command */}
                        <div className="group relative aspect-[4/3] rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden hover:border-neutral-700 transition-colors">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-64 bg-black border border-neutral-800 rounded-lg p-2 shadow-2xl">
                                    <div className="flex items-center px-3 py-2 border-b border-neutral-800 mb-2">
                                        <Command className="w-4 h-4 text-neutral-500 mr-3" />
                                        <div className="h-2 w-24 bg-neutral-800 rounded-full" />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="h-8 rounded flex items-center px-2 bg-neutral-900">
                                            <div className="h-2 w-16 bg-neutral-700 rounded-full" />
                                        </div>
                                        <div className="h-8 rounded flex items-center px-2">
                                            <div className="h-2 w-12 bg-neutral-800 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <span className="absolute bottom-4 left-4 text-xs font-mono text-neutral-500 bg-neutral-950/50 px-2 py-1 rounded border border-neutral-800">
                                Command Menu
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-center mt-12">
                        <button className="px-6 py-2 rounded-full border border-neutral-800 text-sm font-medium hover:bg-neutral-900 transition-colors">
                            View all components
                        </button>
                    </div>
                </div>
            </section>

            {/* --- Typography Curve / Scale --- */}
            <section className="bg-black text-white py-24 overflow-hidden relative">
                <div className="max-w-7xl mx-auto flex justify-center py-12">
                    <div className="relative">
                        {/* Pseudo-wave text effect using simple transforms */}
                        <div className="flex text-8xl md:text-[10rem] font-bold tracking-tighter opacity-20 select-none">
                            <span className="translate-y-12">C</span>
                            <span className="translate-y-6">O</span>
                            <span className="translate-y-2">M</span>
                            <span className="translate-y-0">P</span>
                            <span className="translate-y-0">O</span>
                            <span className="translate-y-2">N</span>
                            <span className="translate-y-6">E</span>
                            <span className="translate-y-12">N</span>
                            <span className="translate-y-20">T</span>
                            <span className="translate-y-28">S</span>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-xl md:text-2xl font-light text-neutral-400 max-w-md text-center">
                                Primitives for the modern web. <br />
                                <span className="text-white">Copy. Paste. Ship.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Bento Grid Section --- */}
            <section className="bg-black pb-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4 h-[600px]">

                        {/* Large Item */}
                        <div className="col-span-2 row-span-2 rounded-3xl bg-neutral-900 border border-neutral-800 p-8 flex flex-col justify-between group overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity">
                                <Layout className="w-24 h-24 text-white" />
                            </div>
                            <div className="z-10 bg-neutral-950 border border-neutral-800 rounded-xl p-4 shadow-2xl group-hover:-translate-y-2 transition-transform duration-500">
                                <div className="flex gap-4 mb-4">
                                    <div className="h-10 w-10 rounded bg-neutral-800" />
                                    <div className="space-y-2">
                                        <div className="h-4 w-32 bg-neutral-800 rounded" />
                                        <div className="h-3 w-20 bg-neutral-800 rounded" />
                                    </div>
                                </div>
                                <div className="h-24 bg-neutral-900 rounded border-2 border-dashed border-neutral-800" />
                            </div>
                            <div>
                                <h3 className="text-white text-xl font-bold">Layouts</h3>
                                <p className="text-neutral-500 text-sm">Responsive sidebar, dashboard, and marketing layouts.</p>
                            </div>
                        </div>

                        {/* Small Item */}
                        <div className="rounded-3xl bg-neutral-900 border border-neutral-800 p-6 flex flex-col justify-between group hover:bg-neutral-800/50 transition-colors">
                            <div className="flex justify-between items-start">
                                <div className="p-2 bg-neutral-800 rounded-lg">
                                    <MousePointer2 className="w-5 h-5 text-white" />
                                </div>
                                <div className="h-2 w-2 bg-green-500 rounded-full" />
                            </div>
                            <div className="text-white font-medium">Interactions</div>
                        </div>

                        {/* Small Item */}
                        <div className="rounded-3xl bg-neutral-900 border border-neutral-800 p-6 flex flex-col justify-between group hover:bg-neutral-800/50 transition-colors">
                            <div className="flex justify-between items-start">
                                <div className="p-2 bg-neutral-800 rounded-lg">
                                    <Zap className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            <div className="text-white font-medium">Animations</div>
                        </div>

                        {/* Wide Item */}
                        <div className="col-span-2 rounded-3xl bg-neutral-900 border border-neutral-800 p-6 flex items-center justify-between group relative overflow-hidden">
                            <div className="absolute inset-0 bg-neutral-950/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="z-10">
                                <h3 className="text-white font-bold mb-1">Dark Mode Ready</h3>
                                <p className="text-neutral-500 text-sm">Automatic variable switching.</p>
                            </div>
                            <div className="flex gap-2 z-10">
                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black">
                                    <div className="w-4 h-4 rounded-full bg-black" />
                                </div>
                                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center border border-neutral-700">
                                    <div className="w-4 h-4 rounded-full bg-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CTA Section --- */}
            <section className="bg-black pb-24 px-6 md:px-12">
                <div className="max-w-7xl mx-auto rounded-[3rem] bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-800 p-12 md:p-24 text-center overflow-hidden relative">
                    {/* Abstract blurred blobs */}
                    <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-6">
                            Ship your next project<br />
                            faster than ever.
                        </h2>
                        <p className="text-neutral-400 max-w-xl mx-auto mb-10 text-lg">
                            Join thousands of developers building better software with Componentry.
                            Free and open source.
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            <Link href="/components" className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2">
                                Get Started <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link href="https://github.com/harshjdhv/componentry" className="px-8 py-4 rounded-full bg-neutral-800 text-white font-bold border border-neutral-700 hover:bg-neutral-700 transition-colors">
                                Star on GitHub
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Footer --- */}
            <footer className="bg-black text-neutral-500 py-12 px-6 border-t border-neutral-900">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 text-white font-bold">
                        <div className="w-4 h-4 bg-white rounded-full" />
                        Componentry
                    </div>
                    <div className="flex gap-8 text-sm">
                        <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
                        <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
                        <Link href="#" className="hover:text-white transition-colors">Discord</Link>
                    </div>
                    <div className="text-xs">
                        © 2024 Harsh Jadhav. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    )
}