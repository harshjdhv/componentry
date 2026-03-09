"use client"

import * as React from "react"
import Link from "next/link"
import { useDocStore } from "@/hooks/use-doc-store"

import { FloatingDocsSidebar } from "@/components/floating-docs-sidebar"
import { DocsSidebar } from "@/components/docs-sidebar"
import { LayoutToggle } from "@/components/layout-toggle"
import { motion, AnimatePresence } from "framer-motion"
import { TableOfContents } from "@/components/table-of-contents"

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
                className="flex flex-col w-full min-h-screen bg-white dark:bg-[#111] text-foreground transition-colors duration-300"
            >
                {/* Top Navbar */}
                <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-[#111]/60 border-b border-border/40">
                    <div className="flex items-center h-14 px-4 sm:px-6 lg:px-8 max-w-[95rem] mx-auto w-full">
                        <div className="flex items-center gap-4">
                            <div className="md:hidden">
                                <FloatingDocsSidebar />
                            </div>
                            <nav className="flex items-center space-x-2 text-sm text-muted-foreground font-medium">
                                <Link href="/docs" className="transition-colors hover:text-foreground">Docs</Link>
                                <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-border"
                                >
                                    <path
                                        d="M6.1584 3.13508C6.35985 2.95692 6.66473 2.9753 6.84289 3.17675L10.8429 7.67675C11.006 7.86107 11.006 8.13893 10.8429 8.32325L6.84289 12.8233C6.66473 13.0247 6.35985 13.0431 6.1584 12.8649C5.95695 12.6868 5.93857 12.3819 6.11673 12.1805L9.75488 8L6.11673 3.81951C5.93857 3.61806 5.95695 3.31317 6.1584 3.13508Z"
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <span className="text-foreground max-w-[200px] truncate">{title}</span>
                            </nav>
                        </div>
                        <div className="ml-auto flex items-center gap-4">
                            <LayoutToggle />
                        </div>
                    </div>
                </header>

                <div className="flex-1 w-full max-w-[95rem] mx-auto flex">
                    {/* Fixed Sidebar for desktop */}
                    <DocsSidebar />

                    {/* Main Content Area */}
                    <main className="flex-1 w-full min-w-0 px-6 sm:px-12 lg:px-16 xl:px-24 py-16 space-y-16 pb-40 dark:bg-[#141414]">
                        <header className="space-y-4">
                            <AnimatePresence mode="popLayout">
                                <motion.h1
                                    layoutId="title"
                                    className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 dark:from-white dark:via-zinc-200 dark:to-white bg-clip-text text-transparent pb-1"
                                >
                                    {title}
                                </motion.h1>
                                <motion.p
                                    layoutId="desc"
                                    className="text-lg text-muted-foreground leading-relaxed max-w-2xl font-normal"
                                >
                                    {description}
                                </motion.p>
                            </AnimatePresence>
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
            className="flex flex-col lg:flex-row w-full h-full min-h-screen lg:h-screen bg-[#f3f4f6] dark:bg-[#080808] text-foreground transition-colors duration-300"
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
                className="w-full lg:basis-1/2 lg:max-w-1/2 h-full flex flex-col relative z-20 bg-[#f3f4f6] dark:bg-[#080808]"
            >
                <div className="absolute top-0 left-0 right-0 z-30 h-32 bg-gradient-to-b from-[#f3f4f6] via-[#f3f4f6]/95 to-transparent dark:from-[#080808] dark:via-[#080808]/95 pointer-events-none backdrop-blur-[1px] hidden lg:block" />
                <div className="absolute bottom-0 left-0 right-0 z-30 h-32 bg-gradient-to-t from-[#f3f4f6] via-[#f3f4f6]/95 to-transparent dark:from-[#080808] dark:via-[#080808]/95 pointer-events-none backdrop-blur-[1px]" />

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
                className="flex-1 lg:basis-1/2 lg:max-w-1/2 lg:h-full lg:sticky lg:top-0 order-first lg:order-last bg-[#f3f4f6] dark:bg-[#080808] flex flex-col z-10"
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
