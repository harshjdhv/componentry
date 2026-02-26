"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function LegacySidebarNav({ items }: { items: readonly { title: string; href: string }[] }) {
    const pathname = usePathname()

    return (
        <div className="flex flex-col gap-0.5">
            {items.map((item) => {
                const isActive = pathname === item.href
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "group flex items-center rounded-lg px-3 py-1.5 text-[13px] font-medium transition-all duration-200",
                            isActive
                                ? "text-zinc-900 dark:text-white bg-zinc-100/80 dark:bg-zinc-800/50"
                                : "text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 hover:bg-zinc-100/40 dark:hover:bg-zinc-800/20"
                        )}
                    >
                        <span className="truncate">{item.title}</span>
                    </Link>
                )
            })}
        </div>
    )
}
