"use client"

import * as React from "react"
import { FALLBACK_GITHUB_STARS } from "@/lib/github-stars"

const GithubStarsContext = React.createContext<number>(FALLBACK_GITHUB_STARS)

/** Provided once in the root layout with the server-fetched count. */
export function GithubStarsProvider({ stars, children }: { stars: number; children: React.ReactNode }) {
    return <GithubStarsContext.Provider value={stars}>{children}</GithubStarsContext.Provider>
}

/** Componentry's GitHub star count, already correct on first paint. */
export function useGithubStars(): number {
    return React.useContext(GithubStarsContext)
}

export function formatStars(stars: number): string {
    return new Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short" })
        .format(stars)
        .toLowerCase()
}
