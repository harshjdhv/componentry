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

// Pre-compute nav groups at module level
const navGroups = docsConfig.nav

// Memoized nav item to prevent re-renders
const NavItem = React.memo(
    function NavItem({
        href,
        title,
        isActive,
        onClose
    }: {
        href: string
        title: string
        isActive: boolean
        onClose: () => void
    }) {
        return (
            <li>
                <Link
                    href={href}
                    prefetch={false}
                    onClick={onClose}
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
                    {title}
                </Link>
            </li>
        )
    },
    (prev, next) => prev.isActive === next.isActive && prev.href === next.href
)

// Memoized nav group
const NavGroup = React.memo(
    function NavGroup({
        title,
        items,
        activeHref,
        onClose
    }: {
        title: string
        items: readonly { title: string; href: string }[]
        activeHref: string | null
        onClose: () => void
    }) {
        return (
            <div className="space-y-3">
                <p className="text-xs uppercase tracking-widest text-muted-foreground/60">
                    {title}
                </p>
                <ul className="space-y-1">
                    {items.map((item) => (
                        <NavItem
                            key={item.href}
                            href={item.href}
                            title={item.title}
                            isActive={activeHref === item.href}
                            onClose={onClose}
                        />
                    ))}
                </ul>
            </div>
        )
    },
    (prev, next) => prev.activeHref === next.activeHref && prev.title === next.title
)

export function MobileNav() {
    const [open, setOpen] = React.useState(false)
    const pathname = usePathname()
    const [mounted, setMounted] = React.useState(false)

    // Stable close handler
    const handleClose = React.useCallback(() => setOpen(false), [])

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

    React.useEffect(() => {
        setMounted(true)
    }, [])

    // Pre-compute active href per group
    const activeHrefByGroup = React.useMemo(() => {
        const result: Record<string, string | null> = {}
        for (const group of navGroups) {
            const activeItem = group.items.find((item) => pathname === item.href)
            result[group.title] = activeItem?.href ?? null
        }
        return result
    }, [pathname])

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
                <AnimatePresence mode="sync">
                    {open && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
                                onClick={handleClose}
                            />

                            {/* Sidebar */}
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "-100%" }}
                                transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
                                className="fixed inset-y-0 left-0 z-[100] w-[300px] bg-background border-r border-border shadow-2xl flex flex-col"
                            >
                                <div className="flex items-center justify-between p-4 border-b border-border">
                                    <Link
                                        href="/"
                                        className="flex items-center gap-2 text-xs uppercase tracking-widest text-foreground transition-colors"
                                        onClick={handleClose}
                                    >
                                        <Logomark className="h-5 w-5" />
                                        <span>Componentry</span>
                                    </Link>
                                    <button
                                        onClick={handleClose}
                                        className="p-2 rounded-md hover:bg-accent transition-colors"
                                        aria-label="Close Menu"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto p-6">
                                    <nav className="space-y-8">
                                        {navGroups.map((group) => (
                                            <NavGroup
                                                key={group.title}
                                                title={group.title}
                                                items={group.items}
                                                activeHref={activeHrefByGroup[group.title]!}
                                                onClose={handleClose}
                                            />
                                        ))}

                                        {/* Mobile only links */}
                                        <div className="pt-4 border-t border-border">
                                            <Link
                                                href="https://github.com/harshjdhv/componentry"
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
