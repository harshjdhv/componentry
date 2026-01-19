import type React from "react"
import type { Metadata } from "next"
import { PixelCanvas } from "@workspace/ui/components/pixel-canvas"
import { InstallCommand } from "@/components/install-command"
import { CodeBlock } from "@/components/code-block"
import { ComponentLayout, Section } from "@/components/component-layout"

export const metadata: Metadata = {
    title: "Pixel Canvas Component",
    description: "An interactive pixel grid with smooth trailing effects that lights up on hover and decays over time. Perfect for backgrounds or hero sections.",
    alternates: {
        canonical: "https://componentry.fun/docs/components/pixel-canvas",
    },
}

const defaultCode = `import { PixelCanvas } from "@/components/ui/pixel-canvas"

<div className="relative h-[400px] w-full overflow-hidden rounded-xl border bg-neutral-950">
  <PixelCanvas 
    colors={["#e879f9", "#a78bfa", "#38bdf8", "#22d3ee"]}
    speed={0.02}
  />
</div>`

const trailCode = `import { PixelCanvas } from "@/components/ui/pixel-canvas"

<div className="relative h-[400px] w-full overflow-hidden rounded-xl border bg-neutral-950">
  <PixelCanvas 
    variant="trail"
    colors={["#f97316", "#fb923c", "#fbbf24", "#facc15"]}
    gap={8}
    speed={0.015}
  />
</div>`

const glowCode = `import { PixelCanvas } from "@/components/ui/pixel-canvas"

<div className="relative h-[400px] w-full overflow-hidden rounded-xl border bg-neutral-950">
  <PixelCanvas 
    variant="glow"
    colors={["#22c55e", "#10b981", "#14b8a6", "#06b6d4"]}
    gap={10}
    speed={0.01}
  />
</div>`

const subtleCode = `import { PixelCanvas } from "@/components/ui/pixel-canvas"

<div className="relative h-[400px] w-full overflow-hidden rounded-xl border bg-neutral-900">
  <PixelCanvas 
    colors={["#525252", "#a3a3a3", "#737373"]}
    gap={5}
    speed={0.03}
  />
</div>`

function CursorHint() {
    return (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-medium tracking-tight text-white/50">
                Move your cursor
            </span>
        </div>
    )
}

export default function PixelCanvasPage(): React.JSX.Element {
    return (
        <ComponentLayout
            title="Pixel Canvas"
            description="An interactive pixel grid with beautiful trailing effects. Pixels light up under your cursor and smoothly fade with color interpolation. Highly performant and perfect for dark hero sections."
        >
            <Section title="Install">
                <InstallCommand component="pixel-canvas" />
            </Section>

            <Section title="Examples">
                <div className="space-y-12">

                    {/* Default Variant */}
                    <div className="space-y-0">
                        <h3 className="text-xl font-medium mb-4">Default</h3>
                        <p className="text-muted-foreground mb-4">The default variant with smooth color gradient trailing.</p>
                        <div className="relative h-[400px] w-full overflow-hidden rounded-t-xl rounded-b-none border border-border bg-neutral-950 shadow-sm">
                            <PixelCanvas
                                colors={["#e879f9", "#a78bfa", "#38bdf8", "#22d3ee"]}
                                speed={0.02}
                            />
                            <CursorHint />
                        </div>
                        <CodeBlock code={defaultCode} lang="tsx" className="rounded-t-none" />
                    </div>

                    {/* Trail Variant */}
                    <div className="space-y-0">
                        <h3 className="text-xl font-medium mb-4">Trail Variant</h3>
                        <p className="text-muted-foreground mb-4">Rounded pixels with warm colors for a softer trailing effect.</p>
                        <div className="relative h-[400px] w-full overflow-hidden rounded-t-xl rounded-b-none border border-border bg-neutral-950 shadow-sm">
                            <PixelCanvas
                                variant="trail"
                                colors={["#f97316", "#fb923c", "#fbbf24", "#facc15"]}
                                gap={8}
                                speed={0.015}
                            />
                            <CursorHint />
                        </div>
                        <CodeBlock code={trailCode} lang="tsx" className="rounded-t-none" />
                    </div>

                    {/* Glow Variant */}
                    <div className="space-y-0">
                        <h3 className="text-xl font-medium mb-4">Glow Variant</h3>
                        <p className="text-muted-foreground mb-4">Adds a soft glow around active pixels for a more ethereal effect.</p>
                        <div className="relative h-[400px] w-full overflow-hidden rounded-t-xl rounded-b-none border border-border bg-neutral-950 shadow-sm">
                            <PixelCanvas
                                variant="glow"
                                colors={["#22c55e", "#10b981", "#14b8a6", "#06b6d4"]}
                                gap={10}
                                speed={0.01}
                            />
                            <CursorHint />
                        </div>
                        <CodeBlock code={glowCode} lang="tsx" className="rounded-t-none" />
                    </div>

                    {/* Subtle */}
                    <div className="space-y-0">
                        <h3 className="text-xl font-medium mb-4">Subtle Monochrome</h3>
                        <p className="text-muted-foreground mb-4">A minimal, grayscale version for subtle backgrounds.</p>
                        <div className="relative h-[400px] w-full overflow-hidden rounded-t-xl rounded-b-none border border-border bg-neutral-900 shadow-sm">
                            <PixelCanvas
                                colors={["#525252", "#a3a3a3", "#737373"]}
                                gap={5}
                                speed={0.03}
                            />
                            <CursorHint />
                        </div>
                        <CodeBlock code={subtleCode} lang="tsx" className="rounded-t-none" />
                    </div>

                </div>
            </Section>

            <Section title="Props">
                <div className="grid grid-cols-1 divide-y border rounded-xl bg-muted/30">
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">gap</div>
                        <div className="text-sm text-muted-foreground">
                            Size of the pixel cells in pixels. (default: 6)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">speed</div>
                        <div className="text-sm text-muted-foreground">
                            Decay speed of the pixel trail. Lower values create longer trails. (default: 0.02)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">colors</div>
                        <div className="text-sm text-muted-foreground">
                            Array of hex colors for the gradient. Pixels interpolate through these colors as they fade. (default: pink to cyan gradient)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">variant</div>
                        <div className="text-sm text-muted-foreground">
                            Visual variant: &quot;default&quot; | &quot;trail&quot; (rounded pixels) | &quot;glow&quot; (adds glow effect). (default: &quot;default&quot;)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">noFocus</div>
                        <div className="text-sm text-muted-foreground">
                            Disables mouse/touch tracking. (default: false)
                        </div>
                    </div>
                </div>
            </Section>
        </ComponentLayout>
    )
}
