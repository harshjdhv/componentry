"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { docsConfig } from "@/config/docs"
import { cn } from "@/lib/utils"
import { Logomark } from "@/components/logos/logomark"

export function MobileNav() {
    const [open, setOpen] = React.useState(false)
    const pathname = usePathname()

    // Close on path change
    React.useEffect(() => {
        setOpen(false)
    }, [pathname])

    // Prevent scrolling when open
    React.useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [open])

    const [mounted, setMounted] = React.useState(false)
    React.useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div className="md:hidden">
            <button
                onClick={() => setOpen(true)}
                className="flex items-center justify-center p-2 rounded-md hover:bg-accent transition-colors"
                aria-label="Open Menu"
            >
                <Menu className="h-5 w-5" />
            </button>

            {mounted && createPortal(
                <AnimatePresence>
                    {open && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
                                onClick={() => setOpen(false)}
                            />

                            {/* Sidebar */}
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "-100%" }}
                                transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                                className="fixed inset-y-0 left-0 z-[100] w-[300px] bg-background border-r border-border shadow-2xl flex flex-col"
                            >
                                <div className="flex items-center justify-between p-4 border-b border-border">
                                    <Link
                                        href="/"
                                        className="flex items-center gap-2 text-xs uppercase tracking-widest text-foreground transition-colors"
                                        onClick={() => setOpen(false)}
                                    >
                                        <Logomark className="h-5 w-5" />
                                        <span>Componentry</span>
                                    </Link>
                                    <button
                                        onClick={() => setOpen(false)}
                                        className="p-2 rounded-md hover:bg-accent transition-colors"
                                        aria-label="Close Menu"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto p-6">
                                    <nav className="space-y-8">
                                        {docsConfig.nav.map((group) => (
                                            <div key={group.title} className="space-y-3">
                                                <p className="text-xs uppercase tracking-widest text-muted-foreground/60">
                                                    {group.title}
                                                </p>
                                                <ul className="space-y-1">
                                                    {group.items.map((item) => {
                                                        const isActive = pathname === item.href
                                                        return (
                                                            <li key={item.href}>
                                                                <Link
                                                                    href={item.href}
                                                                    className={cn(
                                                                        "group relative flex items-center gap-2 py-1 pl-4 pr-3 text-sm transition-colors",
                                                                        isActive
                                                                            ? "text-foreground font-medium"
                                                                            : "text-muted-foreground hover:text-foreground"
                                                                    )}
                                                                >
                                                                    {isActive && (
                                                                        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-[2px] rounded-full bg-foreground" />
                                                                    )}
                                                                    {item.title}
                                                                </Link>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                        ))}

                                        {/* Mobile only links */}
                                        <div className="pt-4 border-t border-border">
                                            <Link
                                                href="https://github.com/harshjdhv/component-playground"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground"
                                            >
                                                GitHub
                                            </Link>
                                        </div>
                                    </nav>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    )
}
