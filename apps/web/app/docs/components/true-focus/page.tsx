import type React from "react"
import type { Metadata } from "next"
import { TrueFocus } from "@workspace/ui/components/true-focus"
import { InstallCommand } from "@/components/install-command"
import { CodeBlock } from "@/components/code-block"
import { ComponentLayout, Section } from "@/components/component-layout"

export const metadata: Metadata = {
    title: "True Focus Component",
    description: "A focus effect that blurs surrounding text and highlights the active word, creating a tunnel vision effect.",
    alternates: {
        canonical: "https://componentry.fun/docs/components/true-focus",
    },
}

const autoCode = `import { TrueFocus } from "@workspace/ui/components/true-focus"

<TrueFocus 
  sentence="Reality Is Broken"
  manualMode={false}
  blurAmount={5}
  borderColor="green"
  glowColor="rgba(0, 255, 0, 0.6)"
/>`

const manualCode = `import { TrueFocus } from "@workspace/ui/components/true-focus"

<TrueFocus 
  sentence="Hover To Focus"
  manualMode={true}
  blurAmount={5}
  borderColor="cyan"
  glowColor="rgba(0, 255, 255, 0.6)"
/>`

export default function TrueFocusPage(): React.JSX.Element {
    return (
        <ComponentLayout
            title="True Focus"
            description="A 'temporal illusion' that directs attention by blurring everything except the current focal point. It mimics how the human eye processes depth of field."
        >
            <Section title="Install">
                <InstallCommand component="true-focus" />
            </Section>

            <Section title="Examples">
                <div className="space-y-12">
                    <div className="space-y-0">
                        <h3 className="text-xl font-medium mb-4">Auto Mode</h3>
                        <div className="p-8 bg-black rounded-t-xl rounded-b-none border border-border flex items-center justify-center min-h-[300px]">
                            <TrueFocus
                                sentence="Reality Is Broken"
                                manualMode={false}
                                blurAmount={5}
                                borderColor="#22c55e"
                                glowColor="rgba(34, 197, 94, 0.6)"
                            />
                        </div>
                        <CodeBlock code={autoCode} lang="tsx" className="rounded-t-none" />
                    </div>

                    <div className="space-y-0">
                        <h3 className="text-xl font-medium mb-4">Manual Hover Mode</h3>
                        <div className="p-8 bg-black rounded-t-xl rounded-b-none border border-border flex items-center justify-center min-h-[300px]">
                            <TrueFocus
                                sentence="Hover To Focus"
                                manualMode={true}
                                blurAmount={5}
                                borderColor="#06b6d4"
                                glowColor="rgba(6, 182, 212, 0.6)"
                            />
                        </div>
                        <CodeBlock code={manualCode} lang="tsx" className="rounded-t-none" />
                    </div>
                </div>
            </Section>

            <Section title="Props">
                <div className="grid grid-cols-1 divide-y border rounded-xl bg-muted/30">
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">sentence</div>
                        <div className="text-sm text-muted-foreground">The text content to display and animate through.</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">manualMode</div>
                        <div className="text-sm text-muted-foreground">If true, focus follows mouse hover. If false, it auto-cycles.</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">blurAmount</div>
                        <div className="text-sm text-muted-foreground">The blur radius (in px) for non-focused words.</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">borderColor</div>
                        <div className="text-sm text-muted-foreground">Color of the focus bracket border.</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">glowColor</div>
                        <div className="text-sm text-muted-foreground">Color of the focus bracket glow/shadow.</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">animationDuration</div>
                        <div className="text-sm text-muted-foreground">Duration of the focus transition in seconds.</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">pauseBetweenAnimations</div>
                        <div className="text-sm text-muted-foreground">Pause time in seconds between auto-cycle steps.</div>
                    </div>
                </div>
            </Section>
        </ComponentLayout>
    )
}
