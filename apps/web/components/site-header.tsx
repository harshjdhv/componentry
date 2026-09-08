"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ComponentryLogomark } from "@/components/logos/componentry-logomark"
import { CommandMenu } from "@/components/command-menu"
import { landingGutterClass } from "@/components/landing/landing-frame"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

interface SiteHeaderProps {
    sidebarToggle?: React.ReactNode
    /** Kept for existing call sites; the header rail stays consistent across pages. */
    landingGutter?: boolean
}

const LAST_KNOWN_GITHUB_STARS = 465

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M12 0C5.373 0 0 5.372 0 12c0 5.303 3.438 9.8 8.207 11.387.6.11.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.388-1.333-1.757-1.333-1.757-1.089-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.807 1.305 3.493.998.108-.776.418-1.305.762-1.605-2.666-.304-5.467-1.333-5.467-5.93 0-1.312.469-2.382 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.009-.323 3.301 1.23A11.52 11.52 0 0 1 12 5.8c1.02.005 2.047.139 3.006.404 2.291-1.553 3.298-1.23 3.298-1.23.652 1.653.241 2.874.117 3.176.769.839 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.48 5.921.431.371.824 1.103.824 2.222v3.293c0 .319.192.688.802.576C20.566 21.795 24 17.298 24 12 24 5.372 18.627 0 12 0Z" />
        </svg>
    )
}

export function SiteHeader({ sidebarToggle, landingGutter }: SiteHeaderProps) {
    const pathname = usePathname()
    const [stars, setStars] = React.useState<number | null>(LAST_KNOWN_GITHUB_STARS)
    const [mobileNavOpen, setMobileNavOpen] = React.useState(false)

    React.useEffect(() => {
        setMobileNavOpen(false)
    }, [pathname])

    React.useLayoutEffect(() => {
        try {
            const cached = localStorage.getItem("github-stars-cache")
            if (!cached) return

            const { count } = JSON.parse(cached) as { count?: unknown }
            if (typeof count === "number") {
                setStars(count)
            }
        } catch {
            // The regular fetch below remains the fallback.
        }
    }, [])

    React.useEffect(() => {
        const fetchStars = async () => {
            try {
                const cacheKey = "github-stars-cache"
                const cacheExpiry = 15 * 60 * 1000
                const cached = localStorage.getItem(cacheKey)

                if (cached) {
                    const { count, timestamp } = JSON.parse(cached) as {
                        count?: unknown
                        timestamp?: unknown
                    }

                    if (typeof count === "number") {
                        setStars(count)

                        if (typeof timestamp === "number" && Date.now() - timestamp < cacheExpiry) {
                            return
                        }
                    }
                }

                const response = await fetch("https://api.github.com/repos/harshjdhv/componentry")
                if (!response.ok) return

                const data = (await response.json()) as { stargazers_count?: number }
                if (typeof data.stargazers_count === "number") {
                    setStars(data.stargazers_count)
                    localStorage.setItem(
                        cacheKey,
                        JSON.stringify({ count: data.stargazers_count, timestamp: Date.now() })
                    )
                }
            } catch {
                // Keep the header quiet if GitHub rate-limits or localStorage is unavailable.
            }
        }

        fetchStars()
    }, [])

    const formattedStars =
        stars === null
            ? null
            : new Intl.NumberFormat("en-US", {
                notation: "compact",
                compactDisplay: "short",
            })
                .format(stars)
                .toLowerCase()
    const fullStars = stars === null ? "GitHub" : `${new Intl.NumberFormat("en-US").format(stars)} stars`
    const navItems = [
        {
            href: "/docs",
            label: "Docs",
            active: pathname === "/docs" || (pathname.startsWith("/docs/") && !pathname.startsWith("/docs/mcp")),
        },
        {
            href: "/blocks",
            label: "Blocks",
            active: pathname === "/blocks" || pathname.startsWith("/blocks/"),
        },
        {
            href: "/docs/mcp",
            label: "MCP",
            active: pathname === "/docs/mcp",
        },
        {
            href: "/sponsors",
            label: "Sponsors",
            active: pathname === "/sponsors",
        },
    ]

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 w-full transition-[background-color,border-color] duration-200",
                landingGutter
                    ? "border-b border-transparent bg-white dark:bg-[#0a0a0a]"
                    : "border-b border-line bg-white dark:bg-background"
            )}
        >
            <div
                className={cn(
                    "h-14 w-full",
                    landingGutterClass
                )}
            >
                <div className="mx-auto flex h-full w-full max-w-[1360px] items-center">
                <div className="flex flex-1 items-center gap-5">
                    {sidebarToggle && (
                        <div className="md:hidden">
                            {sidebarToggle}
                        </div>
                    )}
                    <Link
                        href="/"
                        className="group inline-flex h-8 items-center gap-1.5 rounded-md px-1 transition-colors duration-200 hover:bg-muted/60 dark:hover:bg-muted/40"
                    >
                        <ComponentryLogomark className="size-5 text-zinc-900 dark:text-white transition-opacity group-hover:opacity-80" />
                        <span className="text-[16px] font-semibold font-display tracking-tight text-zinc-900 dark:text-white">COMPONENTRY</span>
                    </Link>
                    <nav className="hidden items-center gap-0.5 text-sm font-medium lg:flex">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={item.active ? "page" : undefined}
                                className={cn(
                                    "inline-flex h-8 items-center px-1.5 transition-[color,opacity] duration-200 ease-out",
                                    item.active
                                        ? "text-foreground"
                                        : "text-foreground/55 hover:text-foreground/80"
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="ml-auto flex items-center gap-1">
                    <Link
                        href="https://shadcnblocks.com/?utm_source=componentry&utm_medium=sponsor&utm_campaign=header_badge"
                        target="_blank"
                        data-umami-event="click-sponsor-shadcnblocks"
                        className="hidden h-8 items-center gap-1.5 rounded-md border border-input/50 bg-muted/30 pl-2 pr-2.5 text-sm font-normal transition-colors hover:border-input hover:bg-accent/50 lg:inline-flex"
                    >
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">Sponsor</span>
                        <span className="w-px h-4 bg-border/40" />
                        <img
                            src="https://cdn.shadcnblocks.com/shadcnblocks/images/logo/shadcnblocks-logo.svg"
                            className="w-4 dark:invert"
                            alt="Shadcnblocks Logo"
                        />
                        <span className="text-foreground/80 hover:text-foreground">Shadcnblocks.com</span>
                    </Link>
                    <div className="hidden h-4 w-px bg-foreground/15 dark:bg-foreground/20 md:block" />
                    <CommandMenu />
                    <div className="hidden h-4 w-px bg-foreground/15 dark:bg-foreground/20 sm:block" />
                    <div className="flex items-center gap-1">
                        <Link
                            href="https://github.com/harshjdhv/componentry"
                            target="_blank"
                            rel="noreferrer"
                            title={fullStars}
                            className="group inline-flex h-8 items-center justify-center gap-1 rounded-md px-1.5 text-sm text-foreground/80 transition-colors hover:bg-muted hover:text-foreground dark:hover:bg-muted/50"
                        >
                            <GitHubIcon className="size-4 transition-opacity group-hover:opacity-100" />
                            <span
                                aria-hidden={stars === null}
                                className="hidden w-[3ch] text-right tabular-nums leading-none sm:inline-block"
                                style={{ textBox: "trim-end cap alphabetic" }}
                            >
                                {formattedStars ?? LAST_KNOWN_GITHUB_STARS}
                            </span>
                            <span className="sr-only">GitHub</span>
                        </Link>
                        <div className="hidden h-4 w-px bg-foreground/15 dark:bg-foreground/20 sm:block" />
                        <div className="hidden sm:block">
                            <ThemeToggle />
                        </div>
                        <button
                            type="button"
                            className="group relative flex size-8 touch-manipulation flex-col items-center justify-center gap-1 rounded-md border-none transition-colors before:absolute before:-inset-x-2 before:-top-8 before:-bottom-1 active:scale-none aria-expanded:bg-accent lg:hidden"
                            aria-label={mobileNavOpen ? "Close navigation" : "Open navigation"}
                            aria-expanded={mobileNavOpen}
                            onClick={() => setMobileNavOpen((open) => !open)}
                        >
                            <span
                                className={cn(
                                    "h-0.5 w-4 rounded-[1px] bg-foreground transition-transform",
                                    mobileNavOpen && "translate-y-[3px] rotate-45"
                                )}
                            />
                            <span
                                className={cn(
                                    "h-0.5 w-4 rounded-[1px] bg-foreground transition-transform",
                                    mobileNavOpen && "-translate-y-[3px] -rotate-45"
                                )}
                            />
                        </button>
                    </div>
                </div>
                </div>
            </div>
            {mobileNavOpen && (
                <div className="absolute right-4 top-[calc(100%+0.5rem)] z-50 flex w-48 origin-top-right flex-col gap-4 rounded-xl bg-popover p-1 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden lg:hidden dark:ring-foreground/20">
                    <nav className="flex flex-col" aria-label="Mobile navigation">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={item.active ? "page" : undefined}
                                className="rounded-lg px-3 py-1.5 text-base aria-[current=page]:bg-accent"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                    <div className="px-2 pb-2 sm:hidden"><ThemeToggle /></div>
                </div>
            )}
        </header>
    )
}
