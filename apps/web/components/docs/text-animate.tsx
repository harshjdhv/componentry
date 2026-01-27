"use client"

import React, { useState } from "react"
import { TextAnimate } from "@workspace/ui/components/text-animate"
import { DocsPageLayout } from "@/components/docs-page-layout"
import { RotateCcw } from "lucide-react"

const textAnimateSource = `"use client"

import { cn } from "@/lib/utils"
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
                        key={\`\${by}-\${i}-\${segment}\`}
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
`

const exampleCode = `import { TextAnimate } from "@/components/ui/text-animate"

export function TextAnimateDemo() {
  return (
    <TextAnimate animation="blurInUp" by="character">
      Blur In Up
    </TextAnimate>
  )
}
`

const blurInUpWordCode = `<TextAnimate animation="blurInUp" by="word">
  Blur In Up By Word
</TextAnimate>`

const byWordCode = `<TextAnimate animation="fadeIn" by="word">
  Word Split Animation
</TextAnimate>`

const fadeInCharacterCode = `<TextAnimate animation="fadeIn" by="character">
  Fade In By Character
</TextAnimate>`

const scaleUpCode = `<TextAnimate animation="scaleUp" by="text">
  Scale Up Text
</TextAnimate>`

function TextAnimatePreview({ children, ...props }: React.ComponentProps<typeof TextAnimate>) {
    const [key, setKey] = useState(0)

    return (
        <div className="flex w-full items-center justify-center">
            <button
                onClick={() => setKey((prev) => prev + 1)}
                className="absolute top-4 right-4 z-10 p-2 text-muted-foreground hover:text-foreground transition-all cursor-pointer bg-background/50 rounded-md border border-border hover:bg-background"
                aria-label="Reload animation"
            >
                <RotateCcw className="w-4 h-4" />
            </button>
            <TextAnimate key={key} {...props}>
                {children}
            </TextAnimate>
        </div>
    )
}

export function TextAnimateDocs() {
    return (
        <DocsPageLayout
            title="Text Animate"
            description="A premium text animation component with multiple presets including blur, fade, slide, and scale effects."
            preview={
                <TextAnimatePreview animation="blurInUp" by="character" className="text-4xl font-bold">
                    Blur In Up
                </TextAnimatePreview>
            }
            previewCode={exampleCode}
            installPackageName="text-animate"
            installDependencies="framer-motion"
            installSourceCode={textAnimateSource}
            usageCode={exampleCode}
            examples={[
                {
                    title: "Blur In Up (by Character)",
                    preview: (
                        <TextAnimatePreview animation="blurInUp" by="character" className="text-4xl font-bold">
                            Blur In Up
                        </TextAnimatePreview>
                    ),
                    code: exampleCode,
                },
                {
                    title: "Blur In Up (by Word)",
                    preview: (
                        <TextAnimatePreview animation="blurInUp" by="word" className="text-4xl font-bold">
                            Blur In Up By Word
                        </TextAnimatePreview>
                    ),
                    code: blurInUpWordCode,
                },
                {
                    title: "Fade In (by Word)",
                    preview: (
                        <TextAnimatePreview animation="fadeIn" by="word" className="text-4xl font-bold text-primary">
                            Word Split Animation
                        </TextAnimatePreview>
                    ),
                    code: byWordCode,
                },
                {
                    title: "Fade In (by Character)",
                    preview: (
                        <TextAnimatePreview animation="fadeIn" by="character" className="text-4xl font-bold text-primary">
                            Fade In By Character
                        </TextAnimatePreview>
                    ),
                    code: fadeInCharacterCode,
                },
                {
                    title: "Scale Up (Whole Text)",
                    preview: (
                        <TextAnimatePreview animation="scaleUp" by="text" className="text-5xl font-black">
                            Scale Up!
                        </TextAnimatePreview>
                    ),
                    code: scaleUpCode,
                },
            ]}
            props={[
                {
                    name: "children",
                    type: "string",
                    description: "The text content to animate.",
                },
                {
                    name: "animation",
                    type: "union", // simplified from exact enum for brevity/display
                    description: "fadeIn, blurIn, blurInUp, blurInDown, slideUp, slideDown, slideLeft, slideRight, scaleUp, scaleDown",
                },
                {
                    name: "by",
                    type: "text | word | character",
                    default: "word",
                    description: "How to split the text.",
                },
                {
                    name: "startOnView",
                    type: "boolean",
                    default: "true",
                    description: "Whether to start animation when element enters viewport.",
                },
                {
                    name: "once",
                    type: "boolean",
                    default: "true",
                    description: "Whether to run animation only once.",
                },
                {
                    name: "duration",
                    type: "number",
                    default: "0.3",
                    description: "Duration of the animation per segment in seconds.",
                },
                {
                    name: "delay",
                    type: "number",
                    default: "0",
                    description: "Delay before starting the animation in seconds.",
                },
            ]}
        />
    )
}
