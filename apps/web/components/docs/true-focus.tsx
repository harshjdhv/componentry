"use client"

import React from "react"
import { TrueFocus } from "@workspace/ui/components/true-focus"
import { DocsPageLayout } from "@/components/docs-page-layout"

const trueFocusSource = `"use client";

import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TrueFocusProps {
    sentence?: string;
    manualMode?: boolean;
    blurAmount?: number;
    borderColor?: string;
    glowColor?: string;
    animationDuration?: number;
    pauseBetweenAnimations?: number;
}

export const TrueFocus = ({
    sentence = "True Focus",
    manualMode = false,
    blurAmount = 5,
    borderColor = "green",
    glowColor = "rgba(0, 255, 0, 0.6)",
    animationDuration = 0.5,
    pauseBetweenAnimations = 1,
}: TrueFocusProps) => {
    const words = sentence.split(" ");
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

    useEffect(() => {
        if (!manualMode) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % words.length);
            }, (animationDuration + pauseBetweenAnimations) * 1000);

            return () => clearInterval(interval);
        }
    }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

    useEffect(() => {
        if (currentIndex === null || currentIndex === -1) return;
        if (!wordRefs.current[currentIndex] || !containerRef.current) return;

        const parentRect = containerRef.current.getBoundingClientRect();
        const activeRect = wordRefs.current[currentIndex]!.getBoundingClientRect();

        setFocusRect({
            x: activeRect.left - parentRect.left,
            y: activeRect.top - parentRect.top,
            width: activeRect.width,
            height: activeRect.height,
        });
    }, [currentIndex, words.length]);

    const handleMouseEnter = (index: number) => {
        if (manualMode) {
            setCurrentIndex(index);
        }
    };

    const handleMouseLeave = () => {
        if (manualMode) {
            setCurrentIndex(-1);
        }
    };

    return (
        <div
            className="relative flex gap-4 items-center justify-center flex-wrap"
            ref={containerRef}
        >
            {words.map((word, index) => {
                const isActive = index === currentIndex;
                return (
                    <span
                        key={index}
                        ref={(el) => {
                            wordRefs.current[index] = el;
                        }}
                        className="relative text-[3rem] font-black cursor-pointer"
                        style={{
                            filter: manualMode
                                ? isActive ? "blur(0px)" : \`blur(\${blurAmount}px)\`
                                : isActive ? "blur(0px)" : \`blur(\${blurAmount}px)\`,
                            transition: \`filter \${animationDuration}s ease\`,
                        }}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                    >
                        {word}
                    </span>
                );
            })}

            <motion.div
                className="absolute top-0 left-0 pointer-events-none box-border border-0"
                initial={{ x: 0, y: 0, width: 0, height: 0, opacity: 0 }}
                animate={{
                    x: focusRect.x,
                    y: focusRect.y,
                    width: focusRect.width,
                    height: focusRect.height,
                    opacity: currentIndex >= 0 ? 1 : 0,
                }}
                transition={{
                    duration: animationDuration,
                }}
                style={{
                    "--border-color": borderColor,
                    "--glow-color": glowColor,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } as React.CSSProperties as any}
            >
                <span
                    className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] left-[-10px] border-r-0 border-b-0"
                    style={{
                        borderColor: "var(--border-color)",
                        filter: "drop-shadow(0 0 4px var(--glow-color))",
                    }}
                ></span>
                <span
                    className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] right-[-10px] border-l-0 border-b-0"
                    style={{
                        borderColor: "var(--border-color)",
                        filter: "drop-shadow(0 0 4px var(--glow-color))",
                    }}
                ></span>
                <span
                    className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] left-[-10px] border-r-0 border-t-0"
                    style={{
                        borderColor: "var(--border-color)",
                        filter: "drop-shadow(0 0 4px var(--glow-color))",
                    }}
                ></span>
                <span
                    className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] right-[-10px] border-l-0 border-t-0"
                    style={{
                        borderColor: "var(--border-color)",
                        filter: "drop-shadow(0 0 4px var(--glow-color))",
                    }}
                ></span>
            </motion.div>
        </div>
    );
};
`

const autoCode = `import { TrueFocus } from "@/components/ui/true-focus"

export function TrueFocusDemo() {
  return (
    <TrueFocus 
      sentence="Reality Is Broken"
      manualMode={false}
      blurAmount={5}
      borderColor="green"
      glowColor="rgba(0, 255, 0, 0.6)"
    />
  )
}
`

const manualCode = `import { TrueFocus } from "@/components/ui/true-focus"

export function TrueFocusManualDemo() {
  return (
    <TrueFocus 
      sentence="Hover To Focus"
      manualMode={true}
      blurAmount={5}
      borderColor="cyan"
      glowColor="rgba(0, 255, 255, 0.6)"
    />
  )
}
`

export function TrueFocusDocs() {
    return (
        <DocsPageLayout
            title="True Focus"
            description="A 'temporal illusion' that directs attention by blurring everything except the current focal point. It mimics how the human eye processes depth of field."
            preview={
                <TrueFocus
                    sentence="Reality Is Broken"
                    manualMode={false}
                    blurAmount={5}
                    borderColor="#22c55e"
                    glowColor="rgba(34, 197, 94, 0.6)"
                />
            }
            previewCode={autoCode}
            installPackageName="true-focus"
            installDependencies="framer-motion"
            installSourceCode={trueFocusSource}
            usageCode={autoCode}
            examples={[
                {
                    title: "Manual Hover Mode",
                    preview: (
                        <TrueFocus
                            sentence="Hover To Focus"
                            manualMode={true}
                            blurAmount={5}
                            borderColor="#06b6d4"
                            glowColor="rgba(6, 182, 212, 0.6)"
                        />
                    ),
                    code: manualCode,
                },
            ]}
            props={[
                {
                    name: "sentence",
                    type: "string",
                    description: "The text content to display and animate through.",
                    default: "True Focus",
                },
                {
                    name: "manualMode",
                    type: "boolean",
                    description: "If true, focus follows mouse hover. If false, it auto-cycles.",
                    default: "false",
                },
                {
                    name: "blurAmount",
                    type: "number",
                    description: "The blur radius (in px) for non-focused words.",
                    default: "5",
                },
                {
                    name: "borderColor",
                    type: "string",
                    description: "Color of the focus bracket border.",
                    default: "green",
                },
                {
                    name: "glowColor",
                    type: "string",
                    description: "Color of the focus bracket glow/shadow.",
                    default: "rgba(0, 255, 0, 0.6)",
                },
                {
                    name: "animationDuration",
                    type: "number",
                    description: "Duration of the focus transition in seconds.",
                    default: "0.5",
                },
                {
                    name: "pauseBetweenAnimations",
                    type: "number",
                    description: "Pause time in seconds between auto-cycle steps.",
                    default: "1",
                },
            ]}
        />
    )
}
