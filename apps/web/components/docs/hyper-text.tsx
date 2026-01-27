"use client"

import type React from "react"
import { HyperText } from "@workspace/ui/components/hyper-text"
import { InstallCommand } from "@/components/install-command"
import { CodeBlock } from "@/components/code-block"
import { Section } from "@/components/component-layout"
import { InstallationTabs } from "@/components/installation-tabs"
import { ComponentPreview } from "@/components/component-preview"

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

export function HyperTextDocs() {
    return (
        <>
            <div className="space-y-0">
                <ComponentPreview>
                    <HyperText
                        text="Hyper Text"
                        className="text-4xl md:text-5xl font-bold text-foreground"
                    />
                </ComponentPreview>
                <CodeBlock code={defaultCode} lang="tsx" className="rounded-t-none" />
            </div>

            <Section title="Installation">
                <InstallationTabs
                    cliContent={<InstallCommand component="hyper-text" />}
                    manualContent={
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <p className="text-base font-semibold">1. Install dependencies</p>
                                <p className="text-sm text-muted-foreground">
                                    Ensure you have the utility function <code className="text-xs bg-muted px-1 py-0.5 rounded font-mono text-foreground">cn</code> in <code className="text-xs bg-muted px-1 py-0.5 rounded font-mono text-foreground">lib/utils.ts</code>
                                </p>
                                <CodeBlock code={`npm install clsx tailwind-merge`} lang="bash" />
                            </div>
                            <div className="space-y-3">
                                <p className="text-base font-semibold">2. Copy the source code</p>
                                <p className="text-sm text-muted-foreground">
                                    Copy the following code to <code className="text-xs bg-muted px-1 py-0.5 rounded font-mono text-foreground">components/ui/hyper-text.tsx</code>
                                </p>
                                <CodeBlock
                                    code={hyperTextSource}
                                    lang="tsx"
                                    filename="components/ui/hyper-text.tsx"
                                />
                            </div>
                        </div>
                    }
                />
            </Section>

            <Section title="Usage">
                <CodeBlock code={importCode} lang="tsx" />
            </Section>

            <Section title="Examples">
                <div className="space-y-10">
                    <div className="space-y-4">
                        <h3 className="font-heading text-xl font-semibold tracking-tight">Custom Duration</h3>
                        <div className="space-y-0">
                            <ComponentPreview>
                                <HyperText
                                    text="Slower Reveal"
                                    duration={2000}
                                    className="text-4xl font-bold text-foreground"
                                />
                            </ComponentPreview>
                            <CodeBlock code={customDurationCode} lang="tsx" className="rounded-t-none" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-heading text-xl font-semibold tracking-tight">Hover Trigger Only</h3>
                        <div className="space-y-0">
                            <ComponentPreview>
                                <HyperText
                                    text="Hover Me"
                                    animateOnLoad={false}
                                    className="text-4xl font-bold text-foreground"
                                />
                            </ComponentPreview>
                            <CodeBlock code={hoverOnlyCode} lang="tsx" className="rounded-t-none" />
                        </div>
                    </div>
                </div>
            </Section>

            <Section title="Props">
                <div className="my-6 w-full overflow-y-auto rounded-lg border">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/50">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 w-[150px]">
                                    Prop
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 w-[150px]">
                                    Type
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 w-[150px]">
                                    Default
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                                    Description
                                </th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            <tr className="border-b transition-colors data-[state=selected]:bg-muted">
                                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-mono font-semibold text-foreground">
                                    text
                                </td>
                                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-mono text-muted-foreground">
                                    string
                                </td>
                                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-mono text-muted-foreground">
                                    -
                                </td>
                                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-muted-foreground">
                                    The text content to be animated.
                                </td>
                            </tr>
                            <tr className="border-b transition-colors data-[state=selected]:bg-muted">
                                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-mono font-semibold text-foreground">
                                    duration
                                </td>
                                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-mono text-muted-foreground">
                                    number
                                </td>
                                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-mono text-muted-foreground">
                                    800
                                </td>
                                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-muted-foreground">
                                    Total animation duration in milliseconds.
                                </td>
                            </tr>
                            <tr className="border-b transition-colors data-[state=selected]:bg-muted">
                                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-mono font-semibold text-foreground">
                                    animateOnLoad
                                </td>
                                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-mono text-muted-foreground">
                                    boolean
                                </td>
                                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-mono text-muted-foreground">
                                    true
                                </td>
                                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-muted-foreground">
                                    Whether to start the animation automatically on mount.
                                </td>
                            </tr>
                            <tr className="border-b transition-colors data-[state=selected]:bg-muted">
                                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-mono font-semibold text-foreground">
                                    className
                                </td>
                                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-mono text-muted-foreground">
                                    string
                                </td>
                                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-mono text-muted-foreground">
                                    -
                                </td>
                                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-muted-foreground">
                                    Additional CSS classes for styling.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>
        </>
    )
}

const pageContext = `
# Hyper Text

A text component that scrambles letters before revealing the final text on hover or load.

## Installation

### CLI
\`\`\`bash
npx shadcn@latest add "http://localhost:3000/r/hyper-text.json"
\`\`\`

### Manual
1. Install dependencies
\`\`\`bash
npm install clsx tailwind-merge
\`\`\`

2. Copy source code
\`\`\`tsx
${hyperTextSource}
\`\`\`

## Usage
\`\`\`tsx
${importCode}
\`\`\`

## Examples

### Custom Duration
\`\`\`tsx
${customDurationCode}
\`\`\`

### Hover Trigger Only
\`\`\`tsx
${hoverOnlyCode}
\`\`\`
`



export const hyperTextPageContext = pageContext
