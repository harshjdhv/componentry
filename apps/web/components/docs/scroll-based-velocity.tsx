"use client"

import React from "react"
import { ScrollBasedVelocity } from "@workspace/ui/components/scroll-based-velocity"
import { DocsPageLayout } from "@/components/docs-page-layout"

const scrollBasedVelocitySource = `"use client";

import React, { useRef } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame,
    wrap,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollBasedVelocityProps {
    text: string;
    default_velocity?: number;
    className?: string;
}

interface ParallaxProps {
    children: string;
    baseVelocity: number;
    className?: string;
}

function ParallaxText({ children, baseVelocity = 100, className }: ParallaxProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400,
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false,
    });

    const x = useTransform(baseX, (v) => \`\${wrap(-20, -45, v)}%\`);

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className="overflow-hidden whitespace-nowrap flex flex-nowrap">
            <motion.div
                className={cn("flex whitespace-nowrap gap-10", className)}
                style={{ x }}
            >
                <span className="block mr-10">{children}</span>
                <span className="block mr-10">{children}</span>
                <span className="block mr-10">{children}</span>
                <span className="block mr-10">{children}</span>
            </motion.div>
        </div>
    );
}

export function ScrollBasedVelocity({
    text,
    default_velocity = 5,
    className,
}: ScrollBasedVelocityProps) {
    return (
        <section className="relative w-full">
            <ParallaxText baseVelocity={default_velocity} className={className}>
                {text}
            </ParallaxText>
            <ParallaxText baseVelocity={-default_velocity} className={className}>
                {text}
            </ParallaxText>
        </section>
    );
}
`

const basicCode = `import { ScrollBasedVelocity } from "@/components/ui/scroll-based-velocity";

<ScrollBasedVelocity
  text="Velocity Scroll"
  default_velocity={5}
  className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-foreground drop-shadow-sm md:text-7xl md:leading-[5rem]"
/>`

export function ScrollBasedVelocityDocs() {
    return (
        <DocsPageLayout
            title="Scroll Based Velocity"
            description="Text that scrolls across the screen and speeds up based on the user's scroll velocity."
            preview={
                <div className="w-full flex items-center justify-center">
                    <ScrollBasedVelocity
                        text="Velocity Scroll"
                        default_velocity={5}
                        className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-foreground drop-shadow-sm md:text-7xl md:leading-[5rem]"
                    />
                </div>
            }
            previewCode={basicCode}
            installPackageName="scroll-based-velocity"
            installDependencies="framer-motion"
            installSourceCode={scrollBasedVelocitySource}
            usageCode={basicCode}
            examples={[
                {
                    title: "Basic",
                    preview: (
                        <div className="w-full flex items-center justify-center">
                            <ScrollBasedVelocity
                                text="Velocity Scroll"
                                default_velocity={5}
                                className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-foreground drop-shadow-sm md:text-7xl md:leading-[5rem]"
                            />
                        </div>
                    ),
                    code: basicCode,
                },
            ]}
            props={[
                {
                    name: "text",
                    type: "string",
                    description: "The text to display and scroll.",
                },
                {
                    name: "default_velocity",
                    type: "number",
                    default: "5",
                    description: "The base speed of the scrolling.",
                },
                {
                    name: "className",
                    type: "string",
                    description: "Classes to style the text element.",
                },
            ]}
        />
    )
}
