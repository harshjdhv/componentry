"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Logomark } from "@/components/logos/logomark"
import { ThemeToggle } from "@/components/theme-toggle"

export default function ChangelogPage() {
    return (
        <div className="min-h-screen w-full bg-[#FFFFFF] text-slate-950 font-sans selection:bg-slate-200">
            {/* --- Navigation (matching docs page exactly) --- */}
            <header className="sticky top-0 z-50 border-b border-slate-200/40 bg-white/80 backdrop-blur-xl">
                <div className="flex h-14 items-center justify-between px-4 md:px-6">
                    <div className="flex items-center gap-4 md:gap-6">
                        <Link
                            href="/"
                            className="flex items-center gap-2.5 text-sm font-medium text-slate-950 hover:text-slate-950/90 transition-colors"
                        >
                            <Logomark className="h-5 w-5" />
                            <span className="font-semibold">COMPONENTRY</span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        <nav className="hidden md:flex items-center gap-1">
                            <Link
                                href="/docs"
                                className="px-3 py-1.5 text-sm text-slate-500 hover:text-slate-950 transition-colors"
                            >
                                Docs
                            </Link>
                            <Link
                                href="/changelog"
                                className="px-3 py-1.5 text-sm font-medium rounded-md text-slate-950 bg-slate-100"
                            >
                                Changelog
                            </Link>
                            <Link
                                href="https://github.com/harshjdhv/componentry"
                                target="_blank"
                                className="px-3 py-1.5 text-sm text-slate-500 hover:text-slate-950 transition-colors"
                            >
                                GitHub
                            </Link>
                        </nav>

                        <div className="hidden md:block h-4 w-px bg-slate-200 mx-1" />
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            {/* --- Content --- */}
            <main className="pt-24 pb-20 px-6">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-12"
                    >
                        <h1
                            className="text-4xl md:text-5xl font-black tracking-tight text-slate-950 mb-3"
                            style={{ fontFamily: "var(--font-serif)" }}
                        >
                            Changelog
                        </h1>
                        <p className="text-slate-500">
                            Updates and improvements to Componentry.
                        </p>
                    </motion.div>

                    {/* Single Release */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="grid grid-cols-[80px_1fr] gap-6"
                    >
                        {/* Version */}
                        <div>
                            <span className="text-sm font-bold text-slate-950">v2.0</span>
                            <p className="text-xs text-slate-400 mt-0.5">Feb 3</p>
                        </div>

                        {/* Content */}
                        <div>
                            <h2 className="font-bold text-slate-950 mb-2">Launch of Componentry v2</h2>
                            <ul className="space-y-1">
                                <li className="text-sm text-slate-600 flex items-start gap-2">
                                    <span className="mt-2 w-1 h-1 rounded-full bg-slate-300 flex-shrink-0" />
                                    Revamped landing page
                                </li>
                                <li className="text-sm text-slate-600 flex items-start gap-2">
                                    <span className="mt-2 w-1 h-1 rounded-full bg-slate-300 flex-shrink-0" />
                                    Revamped docs page
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* --- Footer --- */}
            <footer className="py-8 px-6 border-t border-slate-100">
                <div className="max-w-3xl mx-auto flex items-center justify-between text-sm text-slate-400">
                    <Link href="/" className="hover:text-slate-950 transition-colors">← Back to home</Link>
                    <span>@harshjdhv</span>
                </div>
            </footer>
        </div>
    )
}
