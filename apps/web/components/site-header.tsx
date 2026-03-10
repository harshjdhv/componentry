"use client"

import Link from "next/link"
import { ComponentryLogomark } from "@/components/logos/componentry-logomark"
import { CommandMenu } from "@/components/command-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faXTwitter } from "@fortawesome/free-brands-svg-icons"

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-[#111]/60 border-b border-border/40">
            <div className="flex items-center h-14 px-4 sm:px-6 lg:px-8 max-w-[95rem] mx-auto w-full">
                <div className="flex flex-1 items-center gap-2 sm:gap-4">
                    <Link href="/" className="flex items-center gap-2 group">
                        <ComponentryLogomark className="size-6 text-zinc-900 dark:text-white transition-opacity group-hover:opacity-80" />
                        <span className="text-sm font-bold tracking-wide text-zinc-900 dark:text-white">COMPONENTRY</span>
                    </Link>
                    <nav className="flex items-center gap-4 text-sm font-medium ml-4">
                        <Link href="/docs" className="text-foreground/60 transition-colors hover:text-foreground">
                            Docs
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
                            <FontAwesomeIcon icon={faGithub} className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                            <span className="sr-only">GitHub</span>
                        </Link>
                        <Link
                            href="https://x.com/harshjdhv"
                            target="_blank"
                            rel="noreferrer"
                            className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent group"
                        >
                            <FontAwesomeIcon icon={faXTwitter} className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                            <span className="sr-only">X (Twitter)</span>
                        </Link>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </header>
    )
}
