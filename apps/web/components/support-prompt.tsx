"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { X } from "lucide-react"
import posthog from "posthog-js"
import { ComponentryLogomark } from "@/components/logos/componentry-logomark"
import { formatStars, useGithubStars } from "@/hooks/use-github-stars"

const STORAGE_KEY = "componentry-support-prompt"
/** Short beat after the page lands so the card doesn't fight the first paint. */
const DELAY_MS = 2500
/** Once shown, stay quiet this long whether it was closed, ignored or the tab was left. */
const COOLDOWN_MS = 12 * 60 * 60 * 1000

const GITHUB_URL = "https://github.com/harshjdhv/componentry"
const X_URL = "https://x.com/harshjdhv"

type PromptState = {
    lastShownAt?: number
    /** Clicked Star or Follow: never ask again. */
    converted?: boolean
}

function readState(): PromptState {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return {}
        const parsed = JSON.parse(raw) as Partial<PromptState>
        return {
            lastShownAt: typeof parsed.lastShownAt === "number" ? parsed.lastShownAt : undefined,
            converted: parsed.converted === true,
        }
    } catch {
        return {}
    }
}

function writeState(patch: PromptState) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...readState(), ...patch }))
    } catch {
        // Private mode / blocked storage: the prompt just won't remember anything.
    }
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
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    )
}

const ease = [0.23, 1, 0.32, 1] as const

/**
 * "Enjoying Componentry?" card. Slides in bottom-right on a component page,
 * then stays quiet for 12 hours (or for good once they star / follow).
 */
export function SupportPrompt(): React.JSX.Element {
    const pathname = usePathname()
    const reducedMotion = useReducedMotion()
    const stars = useGithubStars()
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
        if (open || !pathname.startsWith("/docs/components/")) return

        const state = readState()
        if (state.converted) return
        if (state.lastShownAt && Date.now() - state.lastShownAt < COOLDOWN_MS) return

        const timer = window.setTimeout(() => {
            setOpen(true)
            writeState({ lastShownAt: Date.now() })
            posthog.capture("support_prompt_shown")
        }, DELAY_MS)
        return () => window.clearTimeout(timer)
    }, [pathname, open])

    const dismiss = React.useCallback(() => {
        setOpen(false)
        posthog.capture("support_prompt_dismissed")
    }, [])

    const convert = (target: "github" | "x") => {
        writeState({ converted: true })
        posthog.capture("support_prompt_clicked", { target })
        window.setTimeout(() => setOpen(false), 150)
    }

    React.useEffect(() => {
        if (!open) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") dismiss()
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [open, dismiss])

    const hidden = reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }

    return (
        <AnimatePresence>
            {open && (
                <motion.aside
                    aria-labelledby="support-prompt-title"
                    initial={hidden}
                    animate={{ opacity: 1, y: 0, scale: 1, transition: { type: "spring", duration: 0.45, bounce: 0.12 } }}
                    exit={{ ...hidden, transition: { duration: 0.15, ease } }}
                    style={{ transformOrigin: "bottom right" }}
                    className="fixed bottom-4 right-4 z-40 w-[calc(100vw-2rem)] max-w-[300px] rounded-2xl border border-black/[0.07] bg-white p-4 shadow-[0_12px_32px_-8px_rgb(0_0_0/0.14)] dark:border-white/[0.07] dark:bg-[#141415] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.04),0_12px_32px_-8px_rgb(0_0_0/0.6)] sm:bottom-6 sm:right-6"
                >
                    <button
                        type="button"
                        onClick={dismiss}
                        aria-label="Dismiss"
                        className="absolute right-2.5 top-2.5 inline-flex size-7 items-center justify-center rounded-md text-foreground/35 transition-colors hover:bg-foreground/[0.06] hover:text-foreground/80 focus-visible:outline-2 focus-visible:outline-ring"
                    >
                        <X className="size-3.5" />
                    </button>

                    <ComponentryLogomark className="size-5 text-foreground" />

                    <h2 id="support-prompt-title" className="mt-3 pr-6 text-[14px] font-semibold tracking-[-0.01em] text-foreground">
                        Enjoying Componentry?
                    </h2>
                    <p className="mt-1 text-pretty text-[13px] leading-snug text-foreground/55">
                        Star the repo and follow along on X for new components.
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                        <a
                            href={X_URL}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => convert("x")}
                            className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg bg-foreground/[0.06] text-[13px] font-medium text-foreground transition-[background-color,transform] duration-150 hover:bg-foreground/[0.1] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                        >
                            <XIcon className="size-3" />
                            Follow
                        </a>
                        <a
                            href={GITHUB_URL}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => convert("github")}
                            className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg bg-foreground text-[13px] font-medium text-background transition-[opacity,transform] duration-150 hover:opacity-90 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                        >
                            <GitHubIcon className="size-3.5" />
                            Star
                            <span className="tabular-nums opacity-55">{formatStars(stars)}</span>
                        </a>
                    </div>
                </motion.aside>
            )}
        </AnimatePresence>
    )
}
