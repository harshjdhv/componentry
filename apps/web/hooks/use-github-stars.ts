"use client"

import * as React from "react"

export const LAST_KNOWN_GITHUB_STARS = 465

const CACHE_KEY = "github-stars-cache"
const CACHE_EXPIRY_MS = 15 * 60 * 1000

/**
 * Componentry's GitHub star count. Reads the localStorage cache before paint,
 * then refreshes from the GitHub API at most every 15 minutes.
 */
export function useGithubStars(): number | null {
    const [stars, setStars] = React.useState<number | null>(LAST_KNOWN_GITHUB_STARS)

    React.useLayoutEffect(() => {
        try {
            const cached = localStorage.getItem(CACHE_KEY)
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
                const cached = localStorage.getItem(CACHE_KEY)

                if (cached) {
                    const { count, timestamp } = JSON.parse(cached) as {
                        count?: unknown
                        timestamp?: unknown
                    }

                    if (typeof count === "number") {
                        setStars(count)

                        if (typeof timestamp === "number" && Date.now() - timestamp < CACHE_EXPIRY_MS) {
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
                        CACHE_KEY,
                        JSON.stringify({ count: data.stargazers_count, timestamp: Date.now() })
                    )
                }
            } catch {
                // Stay quiet if GitHub rate-limits or localStorage is unavailable.
            }
        }

        fetchStars()
    }, [])

    return stars
}

export function formatStars(stars: number | null): string {
    return new Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short" })
        .format(stars ?? LAST_KNOWN_GITHUB_STARS)
        .toLowerCase()
}
