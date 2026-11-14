/** Used only if GitHub is unreachable when the page is rendered. */
export const FALLBACK_GITHUB_STARS = 650

/**
 * Componentry's star count, fetched on the server and cached for an hour, so
 * pages ship with the real number instead of swapping it in after load.
 */
export async function getGithubStars(): Promise<number> {
    try {
        const response = await fetch("https://api.github.com/repos/harshjdhv/componentry", {
            headers: { Accept: "application/vnd.github+json" },
            next: { revalidate: 3600 },
        })
        if (!response.ok) return FALLBACK_GITHUB_STARS

        const data = (await response.json()) as { stargazers_count?: unknown }
        return typeof data.stargazers_count === "number" ? data.stargazers_count : FALLBACK_GITHUB_STARS
    } catch {
        return FALLBACK_GITHUB_STARS
    }
}
