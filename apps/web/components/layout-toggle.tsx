"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export function LayoutToggle() {
    const router = useRouter()
    const [isLegacy, setIsLegacy] = useState(false)

    useEffect(() => {
        const match = document.cookie.match(new RegExp('(^| )docs_layout=([^;]+)'))
        if (match) setIsLegacy(match[2] === "legacy")
    }, [])

    const handleToggle = () => {
        const newValue = isLegacy ? "modern" : "legacy"
        document.cookie = `docs_layout=${newValue}; path=/; max-age=31536000`
        setIsLegacy(!isLegacy)
        router.refresh()
        // Navigate to docs if on home
        if (window.location.pathname === "/") {
            router.push("/docs")
        }
    }

    return (
        <button
            onClick={handleToggle}
            className="group relative inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 overflow-hidden rounded-2xl border border-zinc-300 bg-white/60 px-8 text-sm font-semibold text-zinc-700 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white/80 hover:border-zinc-400 hover:shadow-zinc-200/40 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:hover:border-white/20 dark:hover:shadow-white/10"
        >
            <span>{isLegacy ? "Use Modern Docs Layout" : "View Legacy Docs Layout"}</span>
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-zinc-100/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-white/10" />
        </button>
    )
}
