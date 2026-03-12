"use client"

import React, { useState } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import Link from "next/link"
import { FloatingNavbar } from "@/components/floating-navbar"
import { ArrowRight, Code, Eye, Search } from "lucide-react"

const CATEGORIES = ["All", "Hero", "Marketing", "Application", "Forms", "Pricing"]

const MOCK_BLOCKS = [
    { id: 1, title: "Geometric Hero Area", category: "Hero", date: "Added Feb 2026", color: "from-blue-500/10 to-transparent" },
    { id: 2, title: "Bento Pricing Board", category: "Pricing", date: "Added Feb 2026", color: "from-orange-500/10 to-transparent" },
    { id: 3, title: "Feature Cards", category: "Marketing", date: "Added Jan 2026", color: "from-purple-500/10 to-transparent" },
    { id: 4, title: "Authentication Form", category: "Forms", date: "Added Jan 2026", color: "from-zinc-500/10 to-transparent" },
    { id: 5, title: "SaaS Dashboard Grid", category: "Application", date: "Added Dec 2025", color: "from-emerald-500/10 to-transparent" },
    { id: 6, title: "Newsletter CTA", category: "Marketing", date: "Added Dec 2025", color: "from-sky-500/10 to-transparent" },
]

export default function BlocksPage() {
    const [activeCategory, setActiveCategory] = useState("All")
    const [searchQuery, setSearchQuery] = useState("")

    const filteredBlocks = MOCK_BLOCKS.filter((block) => {
        const matchesCategory = activeCategory === "All" || block.category === activeCategory
        const matchesSearch = block.title.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    // Animation Variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
            },
        }
    }

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 15, scale: 0.98 },
        show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0, duration: 0.6 } }
    }

    return (
        <div className="relative min-h-screen bg-white font-sans text-zinc-900 selection:bg-zinc-900 selection:text-white dark:bg-[#09090b] dark:text-zinc-100 dark:selection:bg-white dark:selection:text-zinc-900">
            <FloatingNavbar />

            {/* ─── Refined Hero Section ─────────────────────────── */}
            {/* 
        The hero is intentionally shorter (not min-h-screen), with balanced typography 
        avoiding excessive boldness or massive font sizes, ensuring it fits easily within standard viewports.
      */}
            <section className="relative w-full pt-32 pb-16 md:pt-40 md:pb-24 px-6 overflow-hidden flex flex-col items-center justify-center">
                {/* Subtle background gradient / noise */}
                <div className="absolute inset-0 top-0 left-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_0%,rgba(56,189,248,0.06)_0%,transparent_100%)] dark:bg-[radial-gradient(ellipse_100%_60%_at_50%_0%,rgba(56,189,248,0.04)_0%,transparent_100%)] pointer-events-none" />

                <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="inline-flex items-center rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                            Introducing Blocks
                        </span>
                    </motion.div>

                    <motion.h1
                        className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-white max-w-3xl"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Ready-to-use sections for your next project.
                    </motion.h1>

                    <motion.p
                        className="text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl text-balance"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Beautifully designed, fully responsive page sections built with Tailwind CSS.
                        Drop them into your app and ship faster.
                    </motion.p>
                </div>
            </section>

            {/* ─── Main Content Canvas ────────────────────────── */}
            <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">

                {/* Sticky Utility Bar */}
                <div className="sticky top-[80px] z-30 pb-4 pt-4 mb-8 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50 flex flex-col md:flex-row gap-4 justify-between items-center transition-all">

                    {/* Filters (Horizontal Scroll on Mobile) */}
                    <div className="w-full md:w-auto overflow-x-auto scrollbar-hide">
                        <div className="flex items-center gap-2 min-w-max pb-1 md:pb-0">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat
                                        ? "bg-zinc-900 text-white shadow-md dark:bg-white dark:text-zinc-900"
                                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full md:w-64 shrink-0">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Search blocks..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 rounded-full bg-zinc-100/50 border border-zinc-200/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/5 dark:bg-zinc-900/50 dark:border-zinc-800/50 dark:text-white dark:focus:bg-zinc-900 text-sm transition-all"
                        />
                    </div>
                </div>

                {/* Blocks Grid */}
                <motion.div
                    layout
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredBlocks.length > 0 ? (
                            filteredBlocks.map((block) => (
                                <motion.div
                                    layout
                                    key={block.id}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="show"
                                    exit="hidden"
                                    className="group relative flex flex-col overflow-hidden rounded-[24px] border border-zinc-200/60 bg-white shadow-sm transition-all hover:shadow-xl dark:border-zinc-800/60 dark:bg-zinc-950 hover:border-zinc-300 dark:hover:border-zinc-700"
                                >
                                    {/* Block Preview Canvas */}
                                    <div className={`relative h-56 w-full overflow-hidden bg-gradient-to-b ${block.color} flex items-center justify-center p-6 border-b border-zinc-100 dark:border-zinc-900`}>
                                        <div className="w-full h-full max-w-sm border border-zinc-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-xl flex items-center justify-center text-zinc-300 dark:text-zinc-700 font-mono text-sm shadow-inner group-hover:scale-[1.02] transition-transform duration-500 ease-out">
                                            {/* Abstract visual representation of a "block" */}
                                            <div className="flex flex-col gap-2 w-3/4 opacity-40">
                                                <div className="h-4 w-1/3 bg-current rounded-full" />
                                                <div className="h-2 w-full bg-current rounded-full" />
                                                <div className="h-2 w-5/6 bg-current rounded-full" />
                                                <div className="h-8 w-1/2 bg-current rounded-md mt-2" />
                                            </div>
                                        </div>

                                        {/* Hover Overlay Actions */}
                                        <div className="absolute inset-0 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                                            <button className="flex items-center gap-2 bg-zinc-900 text-white dark:bg-white dark:text-black px-4 py-2 rounded-full text-sm font-medium shadow-md hover:scale-105 active:scale-95 transition-transform">
                                                <Eye className="w-4 h-4" /> Preview
                                            </button>
                                            <button className="flex items-center gap-2 bg-white text-zinc-900 dark:bg-zinc-800 dark:text-white border border-zinc-200 dark:border-zinc-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:scale-105 active:scale-95 transition-transform">
                                                <Code className="w-4 h-4" /> Copy
                                            </button>
                                        </div>
                                    </div>

                                    {/* Block Metadata */}
                                    <div className="flex flex-col p-5 bg-white dark:bg-zinc-950">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                                                {block.title}
                                            </h3>
                                            <span className="text-xs px-2 py-1 rounded-md bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400 font-medium tracking-wide">
                                                {block.category}
                                            </span>
                                        </div>
                                        <p className="text-sm font-medium text-zinc-400 dark:text-zinc-500">
                                            {block.date}
                                        </p>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full py-24 flex flex-col items-center justify-center text-center space-y-4"
                            >
                                <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-400 mb-2">
                                    <Search className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-medium text-zinc-900 dark:text-white">No blocks found</h3>
                                <p className="text-zinc-500 max-w-sm text-balance">
                                    We couldn't find any blocks matching "{searchQuery}" in the {activeCategory} category.
                                </p>
                                <button
                                    onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                                    className="mt-2 text-sm font-medium text-sky-500 hover:text-sky-600 dark:hover:text-sky-400"
                                >
                                    Clear all filters
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Global CTA at the bottom of blocks */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="mt-32 rounded-[32px] overflow-hidden bg-zinc-900 dark:bg-zinc-900 border border-zinc-800 p-8 sm:p-12 md:p-16 flex flex-col items-center text-center relative"
                >
                    {/* Subtle noise/gradient for CTA */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,95,31,0.1),transparent_70%)] pointer-events-none" />

                    <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4 relative z-10 font-display">
                        Need a custom layout?
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mb-8 relative z-10 text-lg">
                        Can't find the exact block you're looking for? Let's build something unique together.
                        We offer premium design and implementation services.
                    </p>
                    <Link
                        href="/contact"
                        className="relative z-10 group inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-white px-8 text-sm font-semibold text-black transition-all hover:bg-zinc-200"
                    >
                        <span>Request Custom Block</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </motion.div>

            </main>
        </div>
    )
}
