"use client"

import type React from "react"
import { HyperText } from "@workspace/ui/components/hyper-text"

const hyperTextSource = `"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface HyperTextProps {
    className?: string;
    duration?: number;
    text: string;
    animateOnLoad?: boolean;
}

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const HyperText = ({
    className,
    duration = 800,
    text,
    animateOnLoad = true,
}: HyperTextProps) => {
    const [displayText, setDisplayText] = useState(text.split(""));
    const [trigger, setTrigger] = useState(false);
    const iterations = useRef(0);
    const isFirstRender = useRef(true);

    const triggerAnimation = () => {
        iterations.current = 0;
        setTrigger(true);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (!animateOnLoad && isFirstRender.current) {
                clearInterval(interval);
                isFirstRender.current = false;
                return;
            }
            if (iterations.current < text.length) {
                setDisplayText((t) =>
                    t.map((l, i) =>
                        l === " "
                            ? l
                            : i <= iterations.current
                                ? text[i] ?? ""
                                : alphabets[Math.floor(Math.random() * alphabets.length)] ?? ""
                    )
                );
                iterations.current = iterations.current + 0.1;
            } else {
                setTrigger(false);
                clearInterval(interval);
            }
        }, duration / (text.length * 10));
        // Clean up interval on unmount
        return () => clearInterval(interval);
    }, [text, duration, trigger, animateOnLoad]);

    return (
        <div
            className={cn("flex cursor-default overflow-hidden py-2 font-mono", className)}
            onMouseEnter={triggerAnimation}
        >
            {displayText.map((letter, i) => (
                <span key={i} className="min-w-[0.1em]">
                    {letter}
                </span>
            ))}
        </div>
    );
};`

const importCode = `import { HyperText } from "@/components/ui/hyper-text"`

const defaultCode = `import { HyperText } from "@/components/ui/hyper-text"

<HyperText text="Hyper Text" className="text-4xl font-bold" />`

const customDurationCode = `<HyperText
  text="Slower Reveal"
  duration={2000}
  className="text-4xl font-bold"
/>`

const hoverOnlyCode = `<HyperText
  text="Hover Me"
  animateOnLoad={false}
  className="text-4xl font-bold"
/>`

import { DocsPageLayout } from "@/components/docs-page-layout"

// ... existing code ...

export function HyperTextDocs() {
    return (
        <DocsPageLayout
            title="Hyper Text"
            description="A text component that scrambles letters before revealing the final text on hover or load."
            preview={
                <HyperText
                    text="Hyper Text"
                    className="text-4xl md:text-5xl font-bold text-foreground"
                />
            }
            previewCode={defaultCode}
            installPackageName="hyper-text"
            installDependencies="clsx tailwind-merge"
            installSourceCode={hyperTextSource}
            usageCode={importCode}
            examples={[
                {
                    title: "Custom Duration",
                    preview: (
                        <HyperText
                            text="Slower Reveal"
                            duration={2000}
                            className="text-4xl font-bold text-foreground"
                        />
                    ),
                    code: customDurationCode,
                },
                {
                    title: "Hover Trigger Only",
                    preview: (
                        <HyperText
                            text="Hover Me"
                            animateOnLoad={false}
                            className="text-4xl font-bold text-foreground"
                        />
                    ),
                    code: hoverOnlyCode,
                },
            ]}
            props={[
                {
                    name: "text",
                    type: "string",
                    description: "The text content to be animated.",
                },
                {
                    name: "duration",
                    type: "number",
                    default: "800",
                    description: "Total animation duration in milliseconds.",
                },
                {
                    name: "animateOnLoad",
                    type: "boolean",
                    default: "true",
                    description: "Whether to start the animation automatically on mount.",
                },
                {
                    name: "className",
                    type: "string",
                    description: "Additional CSS classes for styling.",
                },
            ]}
        />
    )
}
