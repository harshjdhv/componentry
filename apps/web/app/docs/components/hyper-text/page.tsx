import type React from "react"
import type { Metadata } from "next"
import { HyperText } from "@workspace/ui/components/hyper-text"
import { InstallCommand } from "@/components/install-command"
import { CodeBlock } from "@/components/code-block"
import { ComponentLayout, Section } from "@/components/component-layout"

export const metadata: Metadata = {
    title: "Hyper Text Component",
    description: "A text scramble effect that cycles through characters before revealing the final text. Inspired by cyberpunk and futuristic UIs.",
    alternates: {
        canonical: "https://componentry.fun/docs/components/hyper-text",
    },
}

const defaultCode = `import { HyperText } from "@workspace/ui/components/hyper-text"

<HyperText text="Hyper Text" className="text-4xl font-bold" />`

const customDurationCode = `import { HyperText } from "@workspace/ui/components/hyper-text"

<HyperText
  text="Slower Reveal"
  duration={2000}
  className="text-4xl font-bold"
/>`

const hoverOnlyCode = `import { HyperText } from "@workspace/ui/components/hyper-text"

<HyperText
  text="Hover Me"
  animateOnLoad={false}
  className="text-4xl font-bold"
/>`

export default function HyperTextPage(): React.JSX.Element {
    return (
        <ComponentLayout
            title="Hyper Text"
            description="A text scrambler effect that cycles through random characters before revealing the final text. Great for titles, loading states, or hover interactions."
        >
            <Section title="Install">
                <InstallCommand component="hyper-text" />
            </Section>

            <Section title="Examples">
                <div className="space-y-12">
                    <div className="space-y-0">
                        <h3 className="text-xl font-medium mb-4">Default</h3>
                        <div className="p-8 bg-muted/30 rounded-t-xl rounded-b-none border border-border flex items-center justify-center">
                            <HyperText text="Hyper Text" className="text-4xl font-bold text-neutral-900 dark:text-white" />
                        </div>
                        <CodeBlock code={defaultCode} lang="tsx" className="rounded-t-none" />
                    </div>

                    <div className="space-y-0">
                        <h3 className="text-xl font-medium mb-4">Custom Duration</h3>
                        <div className="p-8 bg-muted/30 rounded-t-xl rounded-b-none border border-border flex items-center justify-center">
                            <HyperText text="Slower Reveal" duration={2000} className="text-4xl font-bold text-neutral-900 dark:text-white" />
                        </div>
                        <CodeBlock code={customDurationCode} lang="tsx" className="rounded-t-none" />
                    </div>

                    <div className="space-y-0">
                        <h3 className="text-xl font-medium mb-4">Hover Trigger Only</h3>
                        <div className="p-8 bg-muted/30 rounded-t-xl rounded-b-none border border-border flex items-center justify-center">
                            <HyperText text="Hover Me" animateOnLoad={false} className="text-4xl font-bold cursor-pointer text-neutral-900 dark:text-white" />
                        </div>
                        <CodeBlock code={hoverOnlyCode} lang="tsx" className="rounded-t-none" />
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
        </ComponentLayout>
    )
}
