import { motion, useScroll, useTransform, useSpring, useMotionValue, MotionValue } from "framer-motion";
import React from "react";

export interface CollectionItem {
    id: number;
    image: string;
    title: string;
}

export type CollectionSurferVariant = "magnetic" | "uplift" | "simple";

interface CollectionSurferProps {
    items: CollectionItem[];
    variant?: CollectionSurferVariant;
}

export function CollectionSurfer({ items, variant = "magnetic" }: CollectionSurferProps) {
    // 1. Loop Setup: Duplicate items to create a buffer
    // We render the list twice: [Original Set, Duplicate Set]
    // When we scroll past the Original Set, we snap back to the start.
    const duplicatedItems = [...items, ...items];

    // Scroll sensitivity
    const scrollPerItem = 600;

    // The exact scroll distance to complete one full loop of the ORIGINAL items
    const loopDistance = items.length * scrollPerItem;

    const { scrollY } = useScroll();

    const smoothScroll = useSpring(scrollY, {
        mass: 0.1,
        stiffness: 100,
        damping: 20
    });

    // 2. Modulo Logic:
    // Instead of mapping 0 -> totalScroll, we map to a looped value.
    // loops 0 -> loopDistance -> 0 -> loopDistance...
    const loopedProgress = useTransform(smoothScroll, (value) => value % loopDistance);

    // Step vector
    const stepX = 240;
    const stepY = -84;
    const stepZ = -288;

    // We only move the scene backwards by the length of ONE set of items
    const x = useTransform(loopedProgress, [0, loopDistance], [0, -items.length * stepX]);
    const y = useTransform(loopedProgress, [0, loopDistance], [0, -items.length * stepY]);
    const z = useTransform(loopedProgress, [0, loopDistance], [0, -items.length * stepZ]);

    // Mouse position for magnetic effect
    // Initialize off-screen so no card is scaled by default
    const mouseX = useMotionValue(-10000);
    const mouseY = useMotionValue(-10000);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (variant === "simple") return;
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    const handleMouseLeave = () => {
        if (variant === "simple") return;
        mouseX.set(-10000);
        mouseY.set(-10000);
    };

    return (
        <div className="relative bg-black min-h-screen text-white w-full">
            {/* 3. Infinite Spacer: 
                We make this huge so the user can scroll for a very long time.
                (e.g., 50,000px) */}
            <div style={{ height: "50000px" }} className="w-full" />

            {/* Fixed viewport */}
            <div
                className="fixed inset-0 w-full h-screen overflow-hidden flex items-center justify-center perspective-container"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >

                {/* UI Overlays */}
                <div className="absolute top-[3vw] left-[3vw] z-50 pointer-events-none mix-blend-difference">
                    <h1 className="font-heading font-bold text-[clamp(2rem,6vw,5rem)] leading-[0.9] tracking-tighter ml-[4vw]">
                        HERITAGE FW25/26
                    </h1>
                    <h1 className="font-heading font-bold text-[clamp(2rem,6vw,5rem)] leading-[0.9] tracking-tighter">
                        COLLECTION
                        <span className="text-[0.4em] align-top relative top-[0.6em] ml-2 font-mono tabular-nums">
                            ({items.length})
                        </span>
                    </h1>
                </div>

                <div className="absolute bottom-[3vw] right-[3vw] z-50 font-mono text-xs tracking-wider uppercase opacity-70">
                    scroll to surf
                </div>

                {/* 3D Scene */}
                <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                        perspective: "2000px",
                        perspectiveOrigin: "10% 10%",
                    }}
                >
                    {/* Animated Track */}
                    <motion.div
                        className="relative w-0 h-0"
                        style={{
                            x,
                            y,
                            z,
                            transformStyle: "preserve-3d",
                        }}
                    >
                        {duplicatedItems.map((item, i) => (
                            <Card
                                // We need a unique key because IDs repeat in the duplicated array
                                key={`${item.id}-${i}`}
                                item={item}
                                i={i}
                                stepX={stepX}
                                stepY={stepY}
                                stepZ={stepZ}
                                mouseX={mouseX}
                                mouseY={mouseY}
                                scrollSpring={smoothScroll}
                                variant={variant}
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

function Card({
    item,
    i,
    stepX,
    stepY,
    stepZ,
    mouseX,
    mouseY,
    scrollSpring,
    variant
}: {
    item: CollectionItem,
    i: number,
    stepX: number,
    stepY: number,
    stepZ: number,
    mouseX: MotionValue<number>,
    mouseY: MotionValue<number>,
    scrollSpring: MotionValue<number>,
    variant: CollectionSurferVariant
}) {
    const ref = React.useRef<HTMLDivElement>(null);

    // Calculate distance from mouse to center of card
    const distance = useTransform([mouseX, mouseY, scrollSpring], ([x, y]: any[]) => {
        if (!ref.current || variant === "simple") return 200; // Default large distance
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        return dist;
    });

    // --- Magnetic Variant ---
    // Map distance to scale: Closer = larger
    const targetScale = useTransform(distance, [0, 400], [1.5, 1]);
    const springScale = useSpring(targetScale, {
        mass: 0.5,
        stiffness: 300,
        damping: 20
    });

    // --- Uplift Variant ---
    // Map distance to Y uplift: Closer = move up (negative Y)
    // We want it to move UP relative to the card's local space or world space? 
    // Moving up in Y (negative) usually works.
    const targetUplift = useTransform(distance, [0, 400], [-100, 0]);
    const springUplift = useSpring(targetUplift, {
        mass: 0.5,
        stiffness: 300,
        damping: 20
    });

    // Combine transforms based on variant
    const transform = useTransform(
        [springScale, springUplift],
        ([s, u]: any[]) => {
            let scaleValue = 1;
            let upliftValue = 0;

            if (variant === "magnetic") {
                scaleValue = Number(s);
            } else if (variant === "uplift") {
                upliftValue = Number(u);
            }
            // simple variant: scale=1, uplift=0

            // Base position
            const baseX = i * stepX;
            const baseY = i * stepY;
            const baseZ = i * stepZ;

            return `translate3d(${baseX}px, ${baseY + upliftValue}px, ${baseZ}px) rotateY(-50deg) scale(${scaleValue})`;
        }
    );

    return (
        <motion.div
            ref={ref}
            className="absolute w-[300px] h-[400px] bg-neutral-900 overflow-hidden shadow-2xl transition-colors duration-500 ease-out group"
            style={{
                transform,
                transformStyle: "preserve-3d",
            }}
        >
            {/* Index number: Using i % 16 + 1 so the duplicate cards show correct numbers (01-16) */}
            <div className="absolute -top-6 -left-4 text-white font-mono text-xs opacity-50 transition-opacity group-hover:opacity-100">
                {String((i % 16) + 1).padStart(2, '0')}
            </div>

            {/* Image */}
            <div className="relative w-full h-full brightness-75 group-hover:brightness-100 transition-all duration-300">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />
        </motion.div>
    );
}