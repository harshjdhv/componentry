"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@workspace/ui/lib/utils"

interface ShowcaseCardProps {
    /** Top tagline text */
    tagline?: string
    /** Main heading text */
    heading: string
    /** Description text below heading */
    description?: string
    /** Image URL for the hero section */
    imageUrl: string
    /** Alt text for the image */
    imageAlt?: string
    /** CTA button text */
    ctaText?: string
    /** CTA button click handler */
    onCtaClick?: () => void
    /** Brand name or logo text */
    brandName?: string
    /** Array of service tags */
    services?: string[]
    /** Custom class name */
    className?: string
    /** Enable 3D tilt effect on hover */
    enableTilt?: boolean
    /** Maximum tilt angle in degrees */
    maxTilt?: number
    /** Enable parallax effect on image */
    enableParallax?: boolean
}

function ShowcaseCard({
    tagline,
    heading,
    description,
    imageUrl,
    imageAlt = "Showcase image",
    ctaText,
    onCtaClick,
    brandName,
    services = [],
    className,
    enableTilt = true,
    maxTilt = 8,
    enableParallax = true,
}: ShowcaseCardProps) {
    const cardRef = React.useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = React.useState(false)

    // Mouse position for tilt effect
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth spring animation for tilt
    const springConfig = { damping: 25, stiffness: 150 }
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [maxTilt, -maxTilt]), springConfig)
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-maxTilt, maxTilt]), springConfig)

    // Parallax transform for image
    const parallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig)
    const parallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-15, 15]), springConfig)

    // Glow effect position
    const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig)
    const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig)

    const handleMouseMove = React.useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!cardRef.current || !enableTilt) return

            const rect = cardRef.current.getBoundingClientRect()
            const x = (e.clientX - rect.left) / rect.width - 0.5
            const y = (e.clientY - rect.top) / rect.height - 0.5

            mouseX.set(x)
            mouseY.set(y)
        },
        [mouseX, mouseY, enableTilt]
    )

    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
        mouseX.set(0)
        mouseY.set(0)
    }

    return (
        <motion.div
            ref={cardRef}
            className={cn(
                "relative w-full max-w-[400px] rounded-3xl overflow-hidden",
                "bg-neutral-950 dark:bg-neutral-950",
                "shadow-2xl shadow-black/20 dark:shadow-black/40",
                "cursor-pointer select-none",
                className
            )}
            style={{
                transformStyle: "preserve-3d",
                perspective: 1000,
                rotateX: enableTilt ? rotateX : 0,
                rotateY: enableTilt ? rotateY : 0,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{
                scale: 1.02,
                boxShadow: "0 40px 80px -20px rgba(0,0,0,0.5)",
            }}
        >
            {/* Subtle glow overlay on hover */}
            <motion.div
                className="absolute inset-0 z-10 pointer-events-none opacity-0"
                style={{
                    background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.08) 0%, transparent 50%)`,
                }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            />

            {/* Image Section */}
            <div className="relative aspect-[4/3] overflow-hidden">
                {/* Tagline */}
                {tagline && (
                    <motion.div
                        className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <span className="text-white/90 text-sm sm:text-base font-medium tracking-tight">
                            {tagline}
                        </span>
                    </motion.div>
                )}

                {/* Hero Image with Parallax */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        x: enableParallax ? parallaxX : 0,
                        y: enableParallax ? parallaxY : 0,
                        scale: 1.1,
                    }}
                >
                    <motion.img
                        src={imageUrl}
                        alt={imageAlt}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1.2 }}
                        animate={{ scale: isHovered ? 1.15 : 1.1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                </motion.div>

                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60" />
            </div>

            {/* Content Section */}
            <div className="relative z-10 px-4 sm:px-6 pb-4 sm:pb-6 -mt-8">
                {/* Heading */}
                <motion.h2
                    className="text-2xl sm:text-3xl lg:text-4xl font-medium text-white tracking-tight leading-tight mb-2 sm:mb-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    {heading}
                </motion.h2>

                {/* Description */}
                {description && (
                    <motion.p
                        className="text-sm sm:text-base text-neutral-400 mb-4 sm:mb-6 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        {description}
                    </motion.p>
                )}

                {/* CTA Button */}
                {ctaText && (
                    <motion.button
                        onClick={onCtaClick}
                        className={cn(
                            "relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full",
                            "text-sm font-medium",
                            "bg-neutral-800/80 text-neutral-200",
                            "border border-neutral-700/50",
                            "overflow-hidden",
                            "transition-colors duration-300",
                            "hover:border-neutral-600/80"
                        )}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {/* Button hover shine effect */}
                        <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                            animate={isHovered ? { translateX: "200%" } : { translateX: "-100%" }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                        />
                        <span className="relative z-10">{ctaText}</span>
                    </motion.button>
                )}
            </div>

            {/* Footer Section */}
            {(brandName || services.length > 0) && (
                <motion.div
                    className="px-4 sm:px-6 py-4 sm:py-5 border-t border-neutral-800/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        {/* Brand Name */}
                        {brandName && (
                            <motion.span
                                className="text-xs sm:text-sm text-neutral-400 font-medium"
                                whileHover={{ color: "#ffffff" }}
                                transition={{ duration: 0.2 }}
                            >
                                {brandName}
                            </motion.span>
                        )}

                        {/* Services */}
                        {services.length > 0 && (
                            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                                {services.map((service, index) => (
                                    <React.Fragment key={service}>
                                        <motion.span
                                            className="text-xs sm:text-sm text-neutral-500"
                                            whileHover={{ color: "#ffffff", scale: 1.05 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {service}
                                        </motion.span>
                                        {index < services.length - 1 && (
                                            <motion.span
                                                className="text-neutral-600"
                                                initial={{ rotate: 0 }}
                                                whileHover={{ rotate: 90 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                ✦
                                            </motion.span>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            )}

            {/* Border glow effect */}
            <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
                }}
                animate={{
                    boxShadow: isHovered
                        ? "inset 0 0 0 1px rgba(255,255,255,0.1)"
                        : "inset 0 0 0 1px rgba(255,255,255,0.05)",
                }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    )
}

// Compact variant for grids
interface ShowcaseCardCompactProps {
    heading: string
    description?: string
    imageUrl: string
    imageAlt?: string
    className?: string
    onClick?: () => void
}

function ShowcaseCardCompact({
    heading,
    description,
    imageUrl,
    imageAlt = "Showcase image",
    className,
    onClick,
}: ShowcaseCardCompactProps) {
    const [isHovered, setIsHovered] = React.useState(false)

    return (
        <motion.div
            className={cn(
                "relative w-full rounded-2xl overflow-hidden cursor-pointer",
                "bg-neutral-900 dark:bg-neutral-900",
                "shadow-lg shadow-black/10",
                className
            )}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
        >
            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden">
                <motion.img
                    src={imageUrl}
                    alt={imageAlt}
                    className="w-full h-full object-cover"
                    animate={{ scale: isHovered ? 1.08 : 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-80" />
            </div>

            {/* Content */}
            <div className="p-4 -mt-6 relative z-10">
                <h3 className="text-lg font-medium text-white mb-1 line-clamp-2">{heading}</h3>
                {description && (
                    <p className="text-sm text-neutral-400 line-clamp-2">{description}</p>
                )}
            </div>

            {/* Hover indicator */}
            <motion.div
                className="absolute bottom-4 right-4"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                transition={{ duration: 0.2 }}
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-neutral-400"
                >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                </svg>
            </motion.div>
        </motion.div>
    )
}

// Horizontal variant for featured sections
interface ShowcaseCardHorizontalProps extends Omit<ShowcaseCardProps, "enableTilt" | "maxTilt"> {
    imagePosition?: "left" | "right"
}

function ShowcaseCardHorizontal({
    tagline,
    heading,
    description,
    imageUrl,
    imageAlt = "Showcase image",
    ctaText,
    onCtaClick,
    brandName,
    services = [],
    className,
    imagePosition = "left",
    enableParallax = true,
}: ShowcaseCardHorizontalProps) {
    const [isHovered, setIsHovered] = React.useState(false)

    return (
        <motion.div
            className={cn(
                "relative w-full rounded-3xl overflow-hidden",
                "bg-neutral-950 dark:bg-neutral-950",
                "shadow-2xl shadow-black/20",
                "flex flex-col md:flex-row",
                imagePosition === "right" && "md:flex-row-reverse",
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.01 }}
        >
            {/* Image Section */}
            <div className="relative w-full md:w-1/2 aspect-[4/3] md:aspect-auto md:min-h-[400px] overflow-hidden">
                {tagline && (
                    <div className="absolute top-6 left-6 z-20">
                        <span className="text-white/90 text-sm font-medium">{tagline}</span>
                    </div>
                )}

                <motion.img
                    src={imageUrl}
                    alt={imageAlt}
                    className="w-full h-full object-cover"
                    animate={{ scale: isHovered ? 1.05 : 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/60 via-transparent to-transparent md:hidden" />
            </div>

            {/* Content Section */}
            <div className="relative z-10 w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
                <motion.h2
                    className="text-3xl md:text-4xl lg:text-5xl font-medium text-white tracking-tight leading-tight mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    {heading}
                </motion.h2>

                {description && (
                    <motion.p
                        className="text-base md:text-lg text-neutral-400 mb-8 leading-relaxed max-w-md"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        {description}
                    </motion.p>
                )}

                {ctaText && (
                    <motion.button
                        onClick={onCtaClick}
                        className={cn(
                            "w-fit px-6 py-3 rounded-full",
                            "text-sm font-medium",
                            "bg-white text-neutral-900",
                            "transition-all duration-300",
                            "hover:bg-neutral-200"
                        )}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {ctaText}
                    </motion.button>
                )}

                {(brandName || services.length > 0) && (
                    <div className="mt-auto pt-8 flex items-center justify-between">
                        {brandName && (
                            <span className="text-sm text-neutral-500">{brandName}</span>
                        )}
                        {services.length > 0 && (
                            <div className="flex items-center gap-3">
                                {services.map((service, index) => (
                                    <React.Fragment key={service}>
                                        <span className="text-sm text-neutral-500">{service}</span>
                                        {index < services.length - 1 && (
                                            <span className="text-neutral-600">✦</span>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    )
}

// Grid container for showcase cards
interface ShowcaseGridProps {
    children: React.ReactNode
    columns?: 1 | 2 | 3 | 4
    gap?: "sm" | "md" | "lg"
    className?: string
}

function ShowcaseGrid({
    children,
    columns = 3,
    gap = "md",
    className,
}: ShowcaseGridProps) {
    const gapClasses = {
        sm: "gap-4",
        md: "gap-6",
        lg: "gap-8",
    }

    const columnClasses = {
        1: "grid-cols-1",
        2: "grid-cols-1 sm:grid-cols-2",
        3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    }

    return (
        <div className={cn("grid", columnClasses[columns], gapClasses[gap], className)}>
            {children}
        </div>
    )
}

export {
    ShowcaseCard,
    ShowcaseCardCompact,
    ShowcaseCardHorizontal,
    ShowcaseGrid,
    type ShowcaseCardProps,
    type ShowcaseCardCompactProps,
    type ShowcaseCardHorizontalProps,
    type ShowcaseGridProps,
}
