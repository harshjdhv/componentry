"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Star } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

interface GitHubStarButtonProps {
    className?: string
    theme?: "default" | "landing"
}

export function GitHubStarButton({ className, theme = "default" }: GitHubStarButtonProps) {
    const [stars, setStars] = useState<number | null>(null)

    useEffect(() => {
        const fetchStars = async () => {
            try {
                const CACHE_KEY = "github-stars-cache"
                const CACHE_EXPIRY = 15 * 60 * 1000 // 15 minutes

                const cached = localStorage.getItem(CACHE_KEY)
                let shouldUseCache = false

                if (cached) {
                    try {
                        const { count, timestamp } = JSON.parse(cached)
                        if (typeof count === "number") {
                            // If fresh, use it and skip fetch
                            if (Date.now() - timestamp < CACHE_EXPIRY) {
                                setStars(count)
                                shouldUseCache = true
                            } else {
                                // If stale, set it temporarily but continue to fetch
                                setStars(count)
                            }
                        }
                    } catch (e) {
                        // Invalid cache, ignore
                    }
                }

                if (shouldUseCache) return

                const res = await fetch("https://api.github.com/repos/harshjdhv/componentry")
                if (!res.ok) throw new Error("Failed to fetch")

                const data = await res.json()
                if (typeof data.stargazers_count === "number") {
                    setStars(data.stargazers_count)
                    localStorage.setItem(CACHE_KEY, JSON.stringify({
                        count: data.stargazers_count,
                        timestamp: Date.now()
                    }))
                }
            } catch (error) {
                // If fetch fails, we keep whatever was in state (stale cache or null)
                console.error("Error fetching GitHub stars:", error)
            }
        }

        fetchStars()
    }, [])

    const isLanding = theme === "landing"

    return (
        <Link
            href="https://github.com/harshjdhv/componentry"
            target="_blank"
            className={cn(
                "group relative inline-flex h-9 items-center gap-2 rounded-md md:rounded-lg border px-3 text-sm font-medium transition-all",
                isLanding
                    ? "border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900"
                    : "border-yellow-500/15 bg-yellow-500/[0.02] text-muted-foreground hover:bg-yellow-500/10 hover:text-foreground",
                className
            )}
        >
            <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 transition-transform duration-300 group-hover:rotate-[15deg] group-hover:scale-110" />
                <span>Star on GitHub</span>
            </div>

            {stars !== null && (
                <>
                    <div className={cn(
                        "h-4 w-px",
                        isLanding ? "bg-slate-200" : "bg-yellow-500/15"
                    )} />
                    <span className="font-mono text-xs opacity-80 group-hover:opacity-100">
                        {stars.toLocaleString()}
                    </span>
                </>
            )}
        </Link>
    )
}
