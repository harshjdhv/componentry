"use client"

import type React from "react"
import { HyperText } from "@workspace/ui/components/hyper-text"
import { InstallCommand } from "@/components/install-command"
import { CodeBlock } from "@/components/code-block"
import { Section } from "@/components/component-layout"
import { InstallationTabs } from "@/components/installation-tabs"

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

const defaultCode = `import { HyperText } from "@/components/ui/hyper-text"

<HyperText text="Hyper Text" className="text-4xl font-bold" />`

const customDurationCode = `import { HyperText } from "@/components/ui/hyper-text"

<HyperText
  text="Slower Reveal"
  duration={2000}
  className="text-4xl font-bold"
/>`

const hoverOnlyCode = `import { HyperText } from "@/components/ui/hyper-text"

<HyperText
  text="Hover Me"
  animateOnLoad={false}
  className="text-4xl font-bold"
/>`

export function HyperTextDocs() {
    return (
        <>
            <div className="border border-border rounded-xl p-12 flex flex-col justify-center items-center bg-muted/20 min-h-[350px] gap-4">
                <HyperText text="Hyper Text" className="text-4xl md:text-5xl font-bold text-foreground" />
                <p className="text-sm text-muted-foreground mt-4">Hover to trigger effect</p>
            </div>

            <Section title="Installation">
                <InstallationTabs
                    cliContent={<InstallCommand component="hyper-text" />}
                    manualContent={
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <p className="text-sm font-medium">1. Install dependencies</p>
                                <div className="text-sm text-muted-foreground mb-2">
                                    Ensure you have the utility function <code className="text-xs bg-muted px-1 py-0.5 rounded">cn</code> in <code className="text-xs bg-muted px-1 py-0.5 rounded">lib/utils.ts</code>
                                </div>
                                <CodeBlock code={`npm install clsx tailwind-merge`} lang="bash" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm font-medium">2. Copy the source code</p>
                                <div className="text-sm text-muted-foreground mb-2">
                                    Copy the following code to <code className="text-xs bg-muted px-1 py-0.5 rounded">components/ui/hyper-text.tsx</code>
                                </div>
                                <CodeBlock code={hyperTextSource} lang="tsx" filename="components/ui/hyper-text.tsx" />
                            </div>
                        </div>
                    }
                />
            </Section>

            <Section title="Usage">
                <div className="space-y-12">
                    <div className="space-y-4">
                        <h3 className="text-xl font-medium">Default</h3>
                        <div className="p-8 bg-muted/30 rounded-t-xl rounded-b-none border border-border flex items-center justify-center min-h-[200px]">
                            <HyperText text="Hyper Text" className="text-4xl font-bold text-neutral-900 dark:text-white" />
                        </div>
                        <CodeBlock code={defaultCode} lang="tsx" className="rounded-t-none mt-0" />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-medium">Custom Duration</h3>
                        <div className="p-8 bg-muted/30 rounded-t-xl rounded-b-none border border-border flex items-center justify-center min-h-[200px]">
                            <HyperText text="Slower Reveal" duration={2000} className="text-4xl font-bold text-neutral-900 dark:text-white" />
                        </div>
                        <CodeBlock code={customDurationCode} lang="tsx" className="rounded-t-none mt-0" />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-medium">Hover Trigger Only</h3>
                        <div className="p-8 bg-muted/30 rounded-t-xl rounded-b-none border border-border flex items-center justify-center min-h-[200px]">
                            <HyperText text="Hover Me" animateOnLoad={false} className="text-4xl font-bold cursor-pointer text-neutral-900 dark:text-white" />
                        </div>
                        <CodeBlock code={hoverOnlyCode} lang="tsx" className="rounded-t-none mt-0" />
                    </div>
                </div>
            </Section>

            <Section title="Props">
                <div className="grid grid-cols-1 divide-y border rounded-xl bg-muted/30">
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">text</div>
                        <div className="text-sm text-muted-foreground">
                            The text to be displayed and animated.
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">duration</div>
                        <div className="text-sm text-muted-foreground">
                            Total animation duration in milliseconds (default: 800).
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">animateOnLoad</div>
                        <div className="text-sm text-muted-foreground">
                            Whether to start the animation automatically on mount (default: true).
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">className</div>
                        <div className="text-sm text-muted-foreground">
                            CSS class for the container. Font size and color styles should be applied here.
                        </div>
                    </div>
                </div>
            </Section>
        </>
    )
}
