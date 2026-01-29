"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Github, Star } from "lucide-react"

export function HeroButtons() {
    const [stars, setStars] = React.useState<number | null>(null)

    React.useEffect(() => {
        fetch("https://api.github.com/repos/harshjdhv/componentry")
            .then((res) => res.json())
            .then((data) => {
                if (typeof data.stargazers_count === "number") {
                    setStars(data.stargazers_count)
                }
            })
            .catch(console.error)
    }, [])

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 pb-2">
            <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative z-10"
            >
                <Link
                    href="/docs"
                    className="group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-full bg-zinc-900 px-8 font-medium text-zinc-50 transition-all duration-300 hover:bg-zinc-900/90 hover:ring-2 hover:ring-zinc-900/20 hover:ring-offset-2 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:hover:ring-zinc-50/20"
                >
                    <span className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="mr-2">Explore Components</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <a
                    href="https://github.com/harshjdhv/componentry"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex h-11 items-center justify-center gap-2 overflow-hidden rounded-full border border-zinc-200 bg-white px-8 text-sm font-medium text-zinc-900 transition-all hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
                >
                    <span className="relative flex items-center gap-2">
                        <Github className="h-4 w-4" />
                        <span>GitHub</span>
                        {stars !== null && (
                            <span className="flex items-center gap-1 border-l border-zinc-200 pl-2 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 font-mono text-xs group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">
                                <div className="relative">
                                    <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500 transition-all group-hover:fill-yellow-400 group-hover:text-yellow-400 group-hover:scale-110" />
                                    <div className="absolute inset-0 animate-ping opacity-0 group-hover:opacity-75 duration-1000">
                                        <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                                    </div>
                                </div>
                                <span>{stars.toLocaleString()}</span>
                            </span>
                        )}
                    </span>
                </a>
            </motion.div>
        </div>
    )
}
