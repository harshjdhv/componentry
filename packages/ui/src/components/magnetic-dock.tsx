"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useReducedMotion, type MotionValue } from "framer-motion"
import { cn } from "@workspace/ui/lib/utils"

interface MagneticDockProps {
    /** Array of dock items */
    items: DockItemData[]
    /** Size of icons in pixels */
    iconSize?: number
    /** Maximum scale on hover */
    maxScale?: number
    /** Distance of magnetic effect in pixels */
    magneticDistance?: number
    /** Show labels on hover */
    showLabels?: boolean
    /** Dock position */
    position?: "bottom" | "top" | "left" | "right"
    /** Background style */
    variant?: "glass" | "solid" | "transparent"
    /** Custom class name */
    className?: string
}

interface DockItemData {
    /** Unique identifier */
    id: string
    /** Display label */
    label: string
    /** Icon component (rendered inside the tile). Optional when `src` is provided. */
    icon?: React.ReactNode
    /** Image URL for the icon. Rendered as a full-bleed tile — ideal for real app icon PNGs (squircle artwork with transparent corners). */
    src?: string
    /** Click handler */
    onClick?: () => void
    /** Whether item is active */
    isActive?: boolean
    /** Badge count */
    badge?: number
    /**
     * When true, the `icon` node fills the entire tile (macOS app-icon style)
     * and the neutral placeholder background is hidden. Implied when `src` is set.
     */
    fullBleed?: boolean
}

interface DockItemProps {
    item: DockItemData
    mouseX: MotionValue<number>
    iconSize: number
    maxScale: number
    magneticDistance: number
    showLabels: boolean
    position: DockPosition
    reducedMotion: boolean
}

type DockPosition = NonNullable<MagneticDockProps["position"]>

/**
 * Per-position layout. The icon is anchored to the dock edge and grows away from
 * it, so the dock keeps its size and magnified icons rise out of it, as on macOS.
 */
const EDGE = {
    bottom: {
        stage: "bottom-0 left-0",
        origin: "bottom center",
        dot: "-bottom-2 left-1/2 -translate-x-1/2",
        tooltip: "bottom-full left-1/2 -translate-x-1/2 mb-3",
        arrow: "left-1/2 -translate-x-1/2 -bottom-1 border-r border-b",
        offset: { y: 8 },
    },
    top: {
        stage: "top-0 left-0",
        origin: "top center",
        dot: "-top-2 left-1/2 -translate-x-1/2",
        tooltip: "top-full left-1/2 -translate-x-1/2 mt-3",
        arrow: "left-1/2 -translate-x-1/2 -top-1 border-l border-t",
        offset: { y: -8 },
    },
    left: {
        stage: "top-0 left-0",
        origin: "center left",
        dot: "-left-2 top-1/2 -translate-y-1/2",
        tooltip: "left-full top-1/2 -translate-y-1/2 ml-3",
        arrow: "top-1/2 -translate-y-1/2 -left-1 border-l border-b",
        offset: { x: -8 },
    },
    right: {
        stage: "top-0 right-0",
        origin: "center right",
        dot: "-right-2 top-1/2 -translate-y-1/2",
        tooltip: "right-full top-1/2 -translate-y-1/2 mr-3",
        arrow: "top-1/2 -translate-y-1/2 -right-1 border-r border-t",
        offset: { x: 8 },
    },
} as const

function DockItem({
    item,
    mouseX,
    iconSize,
    maxScale,
    magneticDistance,
    showLabels,
    position,
    reducedMotion,
}: DockItemProps) {
    const ref = React.useRef<HTMLButtonElement>(null)
    const [isHovered, setIsHovered] = React.useState(false)
    const [isFocused, setIsFocused] = React.useState(false)
    // The magnified width is a motion value, which cannot be resolved on the
    // server. Rendering it during SSR produces "56px" from the server and 56 on
    // the client — a hydration mismatch. Hold the resting size until mount, when
    // both sides agree, then let the motion value take over.
    const [isMounted, setIsMounted] = React.useState(false)
    React.useEffect(() => setIsMounted(true), [])
    const showLabel = showLabels && (isHovered || isFocused)
    const isVertical = position === "left" || position === "right"
    const edge = EDGE[position]
    // Real app icons (`src` images, or opt-in `fullBleed` nodes) fill the whole tile.
    const isFullBleed = Boolean(item.src) || Boolean(item.fullBleed)
    // macOS badges are roughly 40% of the icon tile.
    const badgeSize = Math.round(iconSize * 0.4)

    // Distance from the cursor to the center of this slot, along the dock axis
    const distance = useTransform(mouseX, (val: number) => {
        if (!ref.current) return magneticDistance + 1
        const rect = ref.current.getBoundingClientRect()
        const center = isVertical
            ? rect.top + rect.height / 2
            : rect.left + rect.width / 2
        return val - center
    })

    // Closer = larger, smoothed with a spring
    const scale = useTransform(distance, [-magneticDistance, 0, magneticDistance], [1, maxScale, 1])
    const smoothScale = useSpring(scale, { damping: 20, stiffness: 300, mass: 0.5 })
    const size = useTransform(smoothScale, (s) => s * iconSize)
    const currentSize = reducedMotion ? iconSize : size
    const layoutSize = isMounted ? currentSize : iconSize

    return (
        <motion.button
            ref={ref}
            type="button"
            aria-label={item.label}
            aria-current={item.isActive ? "page" : undefined}
            onClick={item.onClick}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cn(
                "group/dock-item relative shrink-0 rounded-2xl",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-white/50"
            )}
            // The slot widens along the dock so neighbors make room, but keeps its
            // depth, so the dock never grows. The icon overflows out of it instead.
            style={{
                width: isVertical ? iconSize : layoutSize,
                height: isVertical ? layoutSize : iconSize,
            }}
        >
            {/* Stage: the magnified icon, anchored to the dock edge */}
            <motion.div
                className={cn("absolute", edge.stage)}
                style={{ width: currentSize, height: currentSize }}
            >
                <motion.div
                    className="relative flex h-full w-full items-center justify-center"
                    // Framer Motion adds tabIndex=0 to any element with tap/hover
                    // gestures, which puts a second, unlabelled tab stop inside the
                    // button. The button is already the focusable control.
                    tabIndex={-1}
                    whileTap={reducedMotion ? undefined : { scale: 0.9 }}
                    style={{ transformOrigin: edge.origin }}
                >
                    {/* Icon tile */}
                    <div
                        className={cn(
                            "relative flex h-full w-full items-center justify-center",
                            // Real app icons carry their own squircle and shadow, so they render bare.
                            !isFullBleed &&
                                cn(
                                    // Inset like macOS icon artwork (104 of 128px), so tiles and
                                    // real app icons share the same spacing in the dock.
                                    "!h-[81.25%] !w-[81.25%] overflow-hidden rounded-[22.5%]",
                                    "bg-gradient-to-b from-neutral-100 to-neutral-50",
                                    "dark:from-neutral-800 dark:to-neutral-900",
                                    "border border-neutral-300 dark:border-neutral-700"
                                )
                        )}
                        style={
                            isFullBleed
                                ? undefined
                                : {
                                      boxShadow: isHovered
                                          ? "0 8px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.5)"
                                          : "0 4px 12px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.3)",
                                  }
                        }
                    >
                        <div
                            aria-hidden="true"
                            className={cn(
                                "flex items-center justify-center",
                                isFullBleed ? "h-full w-full" : "h-[60%] w-[60%] text-neutral-700 dark:text-white"
                            )}
                        >
                            {item.src ? (
                                <img
                                    src={item.src}
                                    alt=""
                                    draggable={false}
                                    className="h-full w-full select-none object-contain"
                                />
                            ) : (
                                item.icon
                            )}
                        </div>

                        {/* Shine (monochrome tiles only) */}
                        {!isFullBleed && (
                            <div
                                className="pointer-events-none absolute inset-0 transition-opacity duration-200"
                                style={{
                                    background:
                                        "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 50%, transparent 100%)",
                                    opacity: isHovered ? 0.9 : 0.5,
                                }}
                            />
                        )}
                    </div>

                    {/* Badge: sized from iconSize and scaled with the icon, like the macOS Dock */}
                    <motion.div
                        aria-hidden="true"
                        className="pointer-events-none absolute right-0 top-0"
                        style={{
                            scale: reducedMotion ? 1 : smoothScale,
                            transformOrigin: "top right",
                        }}
                    >
                        <AnimatePresence initial={false}>
                            {item.badge !== undefined && item.badge > 0 && (
                                <motion.div
                                    initial={reducedMotion ? false : { scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={reducedMotion ? { opacity: 0 } : { scale: 0, opacity: 0 }}
                                    className={cn(
                                        "translate-x-[20%] -translate-y-[10%]",
                                        "rounded-full bg-[#ff3b30]",
                                        "font-semibold leading-none tabular-nums text-white",
                                        "flex items-center justify-center"
                                    )}
                                    style={{
                                        height: badgeSize,
                                        minWidth: badgeSize,
                                        paddingInline: badgeSize * 0.28,
                                        fontSize: badgeSize * 0.6,
                                    }}
                                >
                                    {item.badge > 99 ? "99+" : item.badge}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>

                {/* Tooltip: sits past the magnified icon */}
                <AnimatePresence initial={false}>
                    {showLabel && (
                        <motion.div
                            aria-hidden="true"
                            initial={reducedMotion ? false : { opacity: 0, scale: 0.9, ...edge.offset }}
                            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, ...edge.offset }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            className={cn(
                                "absolute",
                                edge.tooltip,
                                "rounded-lg px-3 py-1.5",
                                "bg-white dark:bg-neutral-900/95",
                                "backdrop-blur-sm",
                                "whitespace-nowrap text-sm font-medium text-neutral-800 dark:text-white",
                                "border border-neutral-200 dark:border-white/10",
                                "shadow-xl shadow-black/10 dark:shadow-black/20",
                                "pointer-events-none z-50"
                            )}
                        >
                            {item.label}
                            <div
                                className={cn(
                                    "absolute h-2 w-2 rotate-45",
                                    edge.arrow,
                                    "bg-white dark:bg-neutral-900/95",
                                    "border-neutral-200 dark:border-white/10"
                                )}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Active indicator */}
            <AnimatePresence initial={false}>
                {item.isActive && (
                    <motion.div
                        initial={reducedMotion ? false : { scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={reducedMotion ? { opacity: 0 } : { scale: 0, opacity: 0 }}
                        className={cn(
                            "absolute h-1 w-1 rounded-full",
                            edge.dot,
                            "bg-neutral-600 dark:bg-white/80"
                        )}
                    />
                )}
            </AnimatePresence>
        </motion.button>
    )
}

function MagneticDock({
    items,
    iconSize = 56,
    maxScale = 1.5,
    magneticDistance = 150,
    showLabels = true,
    position = "bottom",
    variant = "glass",
    className,
}: MagneticDockProps) {
    const mousePosition = useMotionValue(Infinity)
    const reducedMotion = useReducedMotion() ?? false
    const isVertical = position === "left" || position === "right"

    const handleMouseMove = React.useCallback(
        (e: React.MouseEvent) => {
            if (isVertical) {
                mousePosition.set(e.clientY)
            } else {
                mousePosition.set(e.clientX)
            }
        },
        [mousePosition, isVertical]
    )

    const handleMouseLeave = () => {
        mousePosition.set(Infinity)
    }

    // Concentric corners, as on macOS: the icon artwork's radius (22.5% of its
    // 81.25% tile) plus the gap to the dock edge (the artwork's 9.4% margin, the
    // 4px padding and the 1px border). Scales with iconSize, so it never turns
    // into a pill at small sizes or a box at large ones.
    const dockRadius = Math.round(iconSize * (0.8125 * 0.225 + 0.094) + 5)

    const variantStyles = {
        glass: cn(
            "bg-white/80 dark:bg-neutral-900/80",
            "backdrop-blur-xl backdrop-saturate-150",
            "border border-neutral-200 dark:border-neutral-700"
        ),
        solid: cn(
            "bg-neutral-100 dark:bg-neutral-900",
            "border border-neutral-300 dark:border-neutral-700"
        ),
        transparent: "bg-transparent border-0",
    }

    const positionStyles = {
        bottom: "flex-row",
        top: "flex-row",
        left: "flex-col",
        right: "flex-col",
    }

    return (
        <motion.div
            onMouseMove={reducedMotion ? undefined : handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "inline-flex items-center gap-0 p-1",
                // Continuous (squircle) corners where supported; squircles read
                // tighter, so they get a larger radius to match the optical size.
                "rounded-[var(--dock-radius)]",
                "supports-[corner-shape:squircle]:rounded-[calc(var(--dock-radius)*1.5)]",
                "supports-[corner-shape:squircle]:[corner-shape:squircle]",
                variantStyles[variant],
                positionStyles[position],
                "shadow-xl shadow-black/10 dark:shadow-black/30",
                className
            )}
            style={{ "--dock-radius": `${dockRadius}px` } as React.CSSProperties}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            {items.map((item) => (
                <DockItem
                    key={item.id}
                    item={item}
                    mouseX={mousePosition}
                    iconSize={iconSize}
                    maxScale={maxScale}
                    magneticDistance={magneticDistance}
                    showLabels={showLabels}
                    position={position}
                    reducedMotion={reducedMotion}
                />
            ))}
        </motion.div>
    )
}

// Legacy monochrome icons for common use cases
function DockIconHome({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("w-full h-full", className)}
        >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    )
}

function DockIconSearch({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("w-full h-full", className)}
        >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    )
}

function DockIconFolder({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("w-full h-full", className)}
        >
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
    )
}

function DockIconMail({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("w-full h-full", className)}
        >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
        </svg>
    )
}

function DockIconMusic({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("w-full h-full", className)}
        >
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
        </svg>
    )
}

function DockIconSettings({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("w-full h-full", className)}
        >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
    )
}

function DockIconTrash({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("w-full h-full", className)}
        >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
    )
}

export {
    MagneticDock,
    DockIconHome,
    DockIconSearch,
    DockIconFolder,
    DockIconMail,
    DockIconMusic,
    DockIconSettings,
    DockIconTrash,
    type MagneticDockProps,
    type DockItemData,
}
