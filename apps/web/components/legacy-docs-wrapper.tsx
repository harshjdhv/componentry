import type React from "react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { CommandMenu } from "@/components/command-menu"
import { DocsSidebar } from "@/components/docs-sidebar"
import { TableOfContents } from "@/components/table-of-contents"
import { Logomark } from "@/components/logos/logomark"
import { GitHubStarButton } from "@/components/github-star-button"
import { MobileNav } from "@/components/mobile-nav"

export function LegacyDocsWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-svh flex flex-col bg-background">
            {/* Header - Sleek with subtle border */}
            <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
                <div className="flex h-14 items-center justify-between px-4 md:px-6">
                    <div className="flex items-center gap-4 md:gap-6">
                        <MobileNav />
                        <Link
                            href="/"
                            className="hidden md:flex items-center gap-2.5 text-sm font-medium text-foreground hover:text-foreground/90 transition-colors"
                        >
                            <Logomark className="h-5 w-5" />
                            <span className="font-semibold">COMPONENTRY</span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-2">
                        <CommandMenu />

                        <div className="hidden md:flex items-center">
                            <GitHubStarButton />
                        </div>

                        <ThemeToggle />
                    </div>
                </div>
            </header>

            <div className="flex-1 flex">
                {/* Sidebar */}
                <DocsSidebar />

                {/* Main content */}
                <main className="flex-1 w-full">
                    <div className="max-w-4xl mx-auto px-6 md:px-8 py-10 md:py-16">
                        {children}
                    </div>
                </main>

                {/* Right Sidebar (TOC) */}
                <TableOfContents />
            </div>
        </div>
    )
}
