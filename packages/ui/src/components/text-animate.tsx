"use client"

import { cn } from "@workspace/ui/lib/utils"
import { AnimatePresence, motion, useInView, MotionProps, Variants } from "framer-motion"
import { ElementType, useRef } from "react"

type AnimationType =
    | "fadeIn"
    | "blurIn"
    | "blurInUp"
    | "blurInDown"
    | "slideUp"
    | "slideDown"
    | "slideLeft"
    | "slideRight"
    | "scaleUp"
    | "scaleDown"

interface TextAnimateProps extends MotionProps {
    /**
     * The text to animate
     */
    children: string
    /**
     * The class name for the wrapper element
     */
    className?: string
    /**
     * The class name for the segmented elements (words or characters)
     */
    segmentClassName?: string
    /**
     * The base component to use for the wrapper
     */
    as?: ElementType
    /**
     * The base delay for the animation
     */
    delay?: number
    /**
     * The duration of the animation per item
     */
    duration?: number
    /**
     * The type of animation to perform
     */
    /**
     * The type of animation to perform
     */
    animation?: AnimationType
    /**
     * How to split the text
     */
    by?: "text" | "word" | "character"
    /**
     * Whether to start the animation when the element comes into view
     */
    startOnView?: boolean
    /**
     * Whether to run the animation only once
     */
    once?: boolean
}

export function TextAnimate({
    children,
    delay = 0,
    duration = 0.3,
    className,
    segmentClassName,
    as: Component = "p",
    startOnView = true,
    once = true,
    by = "word",
    animation = "fadeIn",
    ...props
}: TextAnimateProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once })

    const segments =
        by === "character"
            ? children.split("")
            : by === "word"
                ? children.split(" ")
                : [children]

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: delay,
            },
        },
        exit: {
            opacity: 0,
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1,
            },
        },
    }

    const itemVariants: Record<
        AnimationType,
        Variants
    > = {
        fadeIn: {
            hidden: { opacity: 0 },
            show: {
                opacity: 1,
                transition: { duration },
            },
        },
        blurIn: {
            hidden: { opacity: 0, filter: "blur(10px)" },
            show: {
                opacity: 1,
                filter: "blur(0px)",
                transition: { duration },
            },
        },
        blurInUp: {
            hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
            show: {
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
                transition: { duration },
            },
        },
        blurInDown: {
            hidden: { opacity: 0, filter: "blur(10px)", y: -20 },
            show: {
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
                transition: { duration },
            },
        },
        slideUp: {
            hidden: { y: 20, opacity: 0 },
            show: {
                y: 0,
                opacity: 1,
                transition: { duration },
            },
        },
        slideDown: {
            hidden: { y: -20, opacity: 0 },
            show: {
                y: 0,
                opacity: 1,
                transition: { duration },
            },
        },
        slideLeft: {
            hidden: { x: 20, opacity: 0 },
            show: {
                x: 0,
                opacity: 1,
                transition: { duration },
            },
        },
        slideRight: {
            hidden: { x: -20, opacity: 0 },
            show: {
                x: 0,
                opacity: 1,
                transition: { duration },
            },
        },
        scaleUp: {
            hidden: { scale: 0.5, opacity: 0 },
            show: {
                scale: 1,
                opacity: 1,
                transition: { duration },
            },
        },
        scaleDown: {
            hidden: { scale: 1.5, opacity: 0 },
            show: {
                scale: 1,
                opacity: 1,
                transition: { duration },
            },
        },
    }

    const finalVariants = itemVariants[animation]

    // Use the 'as' prop to dynmically render the motion component
    const MotionComponent = motion.create(Component)

    return (
        <AnimatePresence mode="popLayout">
            <MotionComponent
                ref={ref}
                className={cn("whitespace-pre-wrap", className)}
                initial="hidden"
                animate={startOnView ? (isInView ? "show" : "hidden") : "show"}
                exit="exit"
                variants={containerVariants}
                {...props}
            >
                {segments.map((segment, i) => (
                    <motion.span
                        key={`${by}-${i}-${segment}`}
                        className={cn("inline-block", segmentClassName)}
                        variants={finalVariants}
                    >
                        {segment}
                        {by === "word" && i < segments.length - 1 && (
                            <span className="inline-block">&nbsp;</span>
                        )}
                    </motion.span>
                ))}
            </MotionComponent>
        </AnimatePresence>
    )
}
