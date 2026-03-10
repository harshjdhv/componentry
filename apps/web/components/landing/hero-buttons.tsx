"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Terminal } from "lucide-react"
import { CopyButton } from "@/components/copy-button"

export function HeroButtons() {
    const installCommand = "npx shadcn@latest add @componentry/magnetic-dock"

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 pb-2">
            <motion.div whileTap={{ scale: 0.98 }}>
                <div className="group relative inline-flex h-12 items-center justify-center gap-3 overflow-hidden rounded-xl bg-[#E3E3E3]/80 px-4 hover:px-6 text-sm font-semibold text-zinc-900 backdrop-blur-xl transition-all duration-300 shadow-[0_2px_4px_0_rgba(0,0,0,0.10),0_0_0_1px_rgba(0,0,0,0.16),inset_0_1px_0_0_rgba(255,255,255,1)] hover:shadow-[0_4px_8px_0_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.16),inset_0_1px_0_0_rgba(255,255,255,1)] dark:bg-zinc-800/80 dark:text-zinc-100 dark:shadow-[0_2px_4px_0_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1)]">
                    <Terminal className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                    <span className="font-mono text-sm tracking-tight text-zinc-700 dark:text-zinc-400 max-w-[180px] sm:max-w-[260px] whitespace-nowrap overflow-hidden text-ellipsis">
                        {installCommand}
                    </span>
                    <CopyButton code={installCommand} absolute={false} className="p-1.5" />
                </div>
            </motion.div>

            <motion.div whileTap={{ scale: 0.98 }} className="relative z-10">
                <Link
                    href="/docs"
                    className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-8 hover:px-10 text-sm font-semibold text-primary-foreground transition-all duration-300 shadow-[0_2px_4px_0_rgba(0,0,0,0.12),0_0_0_1px_rgba(255,255,255,0.2),inset_0_1px_0_0_rgba(255,255,255,0.2)] hover:shadow-[0_4px_8px_0_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.2),inset_0_1px_0_0_rgba(255,255,255,0.2)] dark:shadow-[0_2px_4px_0_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1)]"
                >
                    <span>Quick Start</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
            </motion.div>
        </div>
    )
}
