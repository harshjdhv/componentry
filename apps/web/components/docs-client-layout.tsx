"use client"

import * as React from "react"
import Link from "next/link"
import { useDocStore } from "@/hooks/use-doc-store"

import { FloatingDocsSidebar } from "@/components/floating-docs-sidebar"
import { DocsSidebar } from "@/components/docs-sidebar"
import { LayoutToggle } from "@/components/layout-toggle"
import { motion, AnimatePresence } from "framer-motion"
import { TableOfContents } from "@/components/table-of-contents"
import { CommandMenu } from "@/components/command-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { ComponentryLogomark } from "@/components/logos/componentry-logomark"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faXTwitter } from "@fortawesome/free-brands-svg-icons"

interface DocsClientLayoutProps {
    title: string
    description: string
    leftContent: React.ReactNode
    rightContent: React.ReactNode
    classicContent: React.ReactNode
}

export function DocsClientLayout({
    title,
    description,
    leftContent,
    rightContent,
    classicContent,
}: DocsClientLayoutProps) {
    const { layout } = useDocStore()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    const currentLayout = mounted ? layout : "classic"

    if (currentLayout === "classic") {
        return (
            <div
                key="classic-layout"
                className="flex flex-col w-full min-h-screen bg-[#f3f4f6] dark:bg-[#111] text-foreground transition-colors duration-300"
            >
                {/* Top Navbar */}
                <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-[#f3f4f6]/80 dark:bg-[#111]/80 dark:supports-[backdrop-filter]:bg-[#111]/80 border-b border-zinc-200/50 dark:border-zinc-800/50">
                    <div className="flex items-center h-16 px-4 sm:px-6 lg:px-8 max-w-[95rem] mx-auto w-full relative">
                        {/* Extension lines connecting grid through header */}
                        <div className="hidden md:block absolute top-0 bottom-0 left-0 w-64 border-l border-zinc-200/50 dark:border-zinc-800/50 pointer-events-none">
                            {/* Intersection Plus Icons at the Top */}
                            <div className="absolute -top-[1px] -left-[1px] w-3 h-3 flex items-center justify-center -translate-x-[50%] -translate-y-[50%] text-zinc-400 dark:text-zinc-600">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 0V10M0 5H10" stroke="currentColor" strokeWidth="1" /></svg>
                            </div>
                            {/* Intersection Plus Icons at the Bottom */}
                            <div className="absolute -bottom-[1px] -left-[1px] w-3 h-3 flex items-center justify-center -translate-x-[50%] translate-y-[50%] text-zinc-400 dark:text-zinc-600">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 0V10M0 5H10" stroke="currentColor" strokeWidth="1" /></svg>
                            </div>
                            <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 flex items-center justify-center translate-x-[50%] translate-y-[50%] text-zinc-400 dark:text-zinc-600">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 0V10M0 5H10" stroke="currentColor" strokeWidth="1" /></svg>
                            </div>
                        </div>

                        <div className="hidden xl:block absolute top-0 bottom-0 right-0 w-64 border-r border-zinc-200/50 dark:border-zinc-800/50 pointer-events-none">
                            {/* Intersection Plus Icons at the Top */}
                            <div className="absolute -top-[1px] -right-[1px] w-3 h-3 flex items-center justify-center translate-x-[50%] -translate-y-[50%] text-zinc-400 dark:text-zinc-600">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 0V10M0 5H10" stroke="currentColor" strokeWidth="1" /></svg>
                            </div>
                            {/* Intersection Plus Icons at the Bottom */}
                            <div className="absolute -bottom-[1px] -left-[1px] w-3 h-3 flex items-center justify-center -translate-x-[50%] translate-y-[50%] text-zinc-400 dark:text-zinc-600">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 0V10M0 5H10" stroke="currentColor" strokeWidth="1" /></svg>
                            </div>
                            <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 flex items-center justify-center translate-x-[50%] translate-y-[50%] text-zinc-400 dark:text-zinc-600">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 0V10M0 5H10" stroke="currentColor" strokeWidth="1" /></svg>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-4 relative z-10">
                            <div className="md:hidden">
                                <FloatingDocsSidebar />
                            </div>
                            <Link href="/" className="flex items-center gap-2 group">
                                <ComponentryLogomark className="size-6 text-zinc-900 dark:text-white transition-opacity group-hover:opacity-80" />
                                <span className="text-sm font-bold tracking-wide text-zinc-900 dark:text-white">COMPONENTRY</span>
                            </Link>
                            <LayoutToggle />
                        </div>
                        <div className="ml-auto flex items-center gap-2 sm:gap-4 relative z-10">
                            <CommandMenu />
                            <div className="flex items-center gap-1 sm:gap-2 border-l border-border/10 pl-2 sm:pl-4">
                                <Link
                                    href="https://github.com/harshjdhv/componentry"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-black/5 dark:hover:bg-white/5 group"
                                >
                                    <FontAwesomeIcon icon={faGithub} className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                                    <span className="sr-only">GitHub</span>
                                </Link>
                                <Link
                                    href="https://x.com/harshjdhv"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-black/5 dark:hover:bg-white/5 group"
                                >
                                    <FontAwesomeIcon icon={faXTwitter} className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                                    <span className="sr-only">X (Twitter)</span>
                                </Link>
                                <ThemeToggle />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 w-full max-w-[95rem] mx-auto flex">
                    {/* Fixed Sidebar for desktop */}
                    <DocsSidebar />

                    {/* Main Content Area */}
                    <main className="flex-1 w-full min-w-0 px-6 sm:px-12 lg:px-16 xl:px-24 py-16 space-y-16 lg:space-y-20 pb-40 dark:bg-[#141414]">
                        <header className="space-y-10">
                            <div className="space-y-6">
                                <AnimatePresence mode="popLayout">
                                    <motion.h1
                                        layoutId="title"
                                        className="text-4xl lg:text-6xl font-bold tracking-tighter bg-gradient-to-br from-zinc-900 via-zinc-500 to-zinc-900 dark:from-white dark:via-zinc-400 dark:to-white bg-clip-text text-transparent leading-[1.1] mb-2 pb-2"
                                    >
                                        {title}
                                    </motion.h1>
                                    <motion.p
                                        layoutId="desc"
                                        className="text-lg text-muted-foreground/90 leading-relaxed max-w-2xl font-normal"
                                    >
                                        {description}
                                    </motion.p>
                                </AnimatePresence>
                            </div>
                        </header>

                        <div className="w-full prose prose-zinc dark:prose-invert max-w-none">
                            {classicContent}
                        </div>
                    </main>

                    {/* Table of Contents */}
                    <TableOfContents />
                </div>
            </div>
        )
    }

    // Split Layout
    return (
        <div
            key="split-layout"
            data-docs-layout
            className="flex flex-col lg:flex-row w-full h-full min-h-screen lg:h-screen bg-[#f3f4f6] dark:bg-[#111] text-foreground transition-colors duration-300"
        >
            {/* Navigation Cluster */}
            <div className="fixed top-5 left-4 sm:left-6 lg:absolute lg:top-8 lg:left-12 xl:left-16 z-50 flex items-center gap-2.5 pointer-events-none">
                <div className="pointer-events-auto">
                    <FloatingDocsSidebar />
                </div>
                <div className="inline-flex h-9 items-center gap-2 rounded-md bg-background/55 px-3.5 text-xs text-muted-foreground backdrop-blur-sm shadow-sm border border-border/10 pointer-events-auto">
                    <Link
                        href="/docs"
                        className="text-sm font-medium transition-colors hover:text-foreground"
                    >
                        Docs
                    </Link>
                    <span className="text-border">/</span>
                    <span className="max-w-[100px] sm:max-w-[180px] truncate text-sm font-semibold text-foreground">
                        {title}
                    </span>
                </div>
                <div className="pointer-events-auto ml-2">
                    <LayoutToggle />
                </div>
            </div>

            <div
                data-docs-left-column
                className="w-full lg:basis-1/2 lg:max-w-1/2 h-full flex flex-col relative z-20 bg-[#f3f4f6] dark:bg-[#111]"
            >
                <div className="absolute top-0 left-0 right-0 z-30 h-16 bg-[#f3f4f6]/80 dark:bg-[#111]/80 pointer-events-none backdrop-blur-md hidden lg:block border-none" style={{ maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)' }} />
                <div className="absolute bottom-0 left-0 right-0 z-30 h-16 bg-[#f3f4f6]/80 dark:bg-[#111]/80 pointer-events-none backdrop-blur-md border-none" style={{ maskImage: 'linear-gradient(to top, black 20%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 20%, transparent 100%)' }} />

                <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <div className="px-6 lg:px-12 xl:px-16 pt-16 lg:pt-48 pb-40 space-y-16 lg:space-y-20 max-w-3xl mx-auto">
                        <header className="space-y-10">
                            <div className="space-y-6">
                                <AnimatePresence mode="popLayout">
                                    <motion.h1
                                        layoutId="title"
                                        className="text-4xl lg:text-6xl font-bold tracking-tighter bg-gradient-to-br from-zinc-900 via-zinc-500 to-zinc-900 dark:from-white dark:via-zinc-400 dark:to-white bg-clip-text text-transparent leading-[1.1] mb-2 pb-2"
                                    >
                                        {title}
                                    </motion.h1>
                                    <motion.p
                                        layoutId="desc"
                                        className="text-lg text-muted-foreground/90 leading-relaxed max-w-2xl font-normal"
                                    >
                                        {description}
                                    </motion.p>
                                </AnimatePresence>
                            </div>
                        </header>

                        {leftContent}

                        <div className="h-12" />
                    </div>
                </div>
            </div>

            <div
                data-docs-right-column
                className="flex-1 lg:basis-1/2 lg:max-w-1/2 lg:h-full lg:sticky lg:top-0 order-first lg:order-last bg-[#f3f4f6] dark:bg-[#111] flex flex-col z-10"
            >
                <div
                    data-docs-preview-shell
                    className="relative w-full h-[55vh] lg:h-full p-4 lg:pt-3 lg:pb-3 lg:pr-3 lg:pl-1.5 overflow-hidden"
                >
                    {rightContent}
                </div>
            </div>
        </div>
    )
}
