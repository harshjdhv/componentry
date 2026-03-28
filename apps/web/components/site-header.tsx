"use client"

import React from "react"
import Link from "next/link"
import { ComponentryLogomark } from "@/components/logos/componentry-logomark"
import { CommandMenu } from "@/components/command-menu"
import { ThemeToggle } from "@/components/theme-toggle"

interface SiteHeaderProps {
    sidebarToggle?: React.ReactNode
}

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M12 0C5.373 0 0 5.372 0 12c0 5.303 3.438 9.8 8.207 11.387.6.11.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.388-1.333-1.757-1.333-1.757-1.089-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.807 1.305 3.493.998.108-.776.418-1.305.762-1.605-2.666-.304-5.467-1.333-5.467-5.93 0-1.312.469-2.382 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.009-.323 3.301 1.23A11.52 11.52 0 0 1 12 5.8c1.02.005 2.047.139 3.006.404 2.291-1.553 3.298-1.23 3.298-1.23.652 1.653.241 2.874.117 3.176.769.839 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.48 5.921.431.371.824 1.103.824 2.222v3.293c0 .319.192.688.802.576C20.566 21.795 24 17.298 24 12 24 5.372 18.627 0 12 0Z" />
        </svg>
    )
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.585-6.638 7.585H.474l8.6-9.83L0 1.153h7.594l5.243 6.932L18.901 1.153Zm-1.291 19.491h2.039L6.486 3.24H4.298L17.61 20.644Z" />
        </svg>
    )
}

export function SiteHeader({ sidebarToggle }: SiteHeaderProps) {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-[#111]/60 border-b border-border/40">
            <div className="flex items-center h-14 px-4 sm:px-6 lg:px-8 max-w-[95rem] mx-auto w-full">
                <div className="flex flex-1 items-center gap-2 sm:gap-4">
                    {sidebarToggle && (
                        <div className="md:hidden">
                            {sidebarToggle}
                        </div>
                    )}
                    <Link href="/" className="flex items-center gap-2 group">
                        <ComponentryLogomark className="size-6 text-zinc-900 dark:text-white transition-opacity group-hover:opacity-80" />
                        <span className="text-sm font-bold tracking-wide text-zinc-900 dark:text-white">COMPONENTRY</span>
                    </Link>
                    <nav className="hidden sm:flex items-center gap-4 text-sm font-medium ml-4">
                        <Link href="/docs" className="text-foreground/60 transition-colors hover:text-foreground">
                            Docs
                        </Link>
                        <Link href="/docs/mcp" className="text-foreground/60 transition-colors hover:text-foreground">
                            MCP
                        </Link>
                        <Link
                            href="/sponsors"
                            className="text-foreground/60 transition-colors hover:text-foreground"
                        >
                            Sponsors
                        </Link>
                    </nav>
                </div>
                <div className="ml-auto flex items-center gap-2 sm:gap-4">
                    <CommandMenu />
                    <div className="flex items-center gap-1 sm:gap-2 border-l border-border/40 pl-2 sm:pl-4">
                        <Link
                            href="https://github.com/harshjdhv/componentry"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent group"
                        >
                            <GitHubIcon className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                            <span className="sr-only">GitHub</span>
                        </Link>
                        <Link
                            href="https://x.com/harshjdhv"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent group"
                        >
                            <XIcon className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                            <span className="sr-only">X (Twitter)</span>
                        </Link>
                        <div className="hidden sm:block">
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
