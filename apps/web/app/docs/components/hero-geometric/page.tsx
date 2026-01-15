import type React from "react"
import type { Metadata } from "next"
import { InstallCommand } from "@/components/install-command"
import { CodeBlock } from "@/components/code-block"
import { ComponentLayout, Section } from "@/components/component-layout"
import { HeroGeometricDemo } from "./hero-geometric-client"

export const metadata: Metadata = {
    title: "Hero Geometric",
    description: "A premium hero section with a geometric shader background.",
}

const basicCode = `import { HeroGeometric } from "@/components/ui/hero-geometric"

<HeroGeometric 
    title1="Elevate" 
    title2="Your Brand" 
    description="Scale your SaaS in minutes"
/>`

export default function HeroGeometricPage(): React.JSX.Element {
    return (
        <ComponentLayout
            title="Hero Geometric"
            description="A geometric hero section inspired by premium editorial designs, featuring a custom shader background and advanced typography."
        >
            <Section title="Install">
                <InstallCommand component="hero-geometric" />
            </Section>

            <Section title="Example">
                <div className="flex flex-col space-y-0">
                    <HeroGeometricDemo
                        title1="Elevate"
                        title2="Your Brand"
                        description="Scale your SaaS in minutes"
                    />
                    <CodeBlock code={basicCode} lang="tsx" className="mt-0 rounded-t-none border-t-0" />
                </div>
            </Section>

            <Section title="Variants">
                <div className="grid grid-cols-1 gap-12">
                    {/* Red Variant */}
                    <div>
                        <h3 className="text-xl font-medium mb-4">Warm Theme</h3>
                        <div className="flex flex-col space-y-0">
                            <HeroGeometricDemo color1="#EA580C" color2="#FFF7ED" title1="Warm" title2="Palette" />
                            <CodeBlock
                                code={`<HeroGeometric \n    color1="#EA580C" \n    color2="#FFF7ED" \n    title1="Warm" \n    title2="Palette" \n/>`}
                                lang="tsx"
                                className="mt-0 rounded-t-none border-t-0"
                            />
                        </div>
                    </div>

                    {/* Fast Variant */}
                    <div>
                        <h3 className="text-xl font-medium mb-4">Increased Speed</h3>
                        <div className="flex flex-col space-y-0">
                            <HeroGeometricDemo speed={2} title1="High" title2="Velocity" />
                            <CodeBlock
                                code={`<HeroGeometric \n    speed={2} \n    title1="High" \n    title2="Velocity" \n/>`}
                                lang="tsx"
                                className="mt-0 rounded-t-none border-t-0"
                            />
                        </div>
                    </div>
                </div>
            </Section>

            <Section title="Features">
                <div className="grid grid-cols-1 divide-y border rounded-xl bg-muted/30">
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-medium text-sm">Shader Background</div>
                        <div className="text-sm text-muted-foreground">
                            Custom WebGL fragment shader using Simplex noise for fluid, organic movement
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-medium text-sm">Premium Typography</div>
                        <div className="text-sm text-muted-foreground">
                            Mix of serif (Instrument Serif) and sans-serif fonts for an editorial look
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-medium text-sm">Framer Motion</div>
                        <div className="text-sm text-muted-foreground">
                            Smooth entrance animations for text elements with staggered delays
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-medium text-sm">Responsive Design</div>
                        <div className="text-sm text-muted-foreground">
                            Fluid typography scaling ensuring legibility on all device sizes
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-medium text-sm">Performance Optimization</div>
                        <div className="text-sm text-muted-foreground">
                            WebGL content is efficiently rendered using React Three Fiber
                        </div>
                    </div>
                </div>
            </Section>

            <Section title="Props">
                <div className="grid grid-cols-1 divide-y border rounded-xl bg-muted/30">
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">title1</div>
                        <div className="text-sm text-muted-foreground">
                            First line of the main headline (serif font)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">title2</div>
                        <div className="text-sm text-muted-foreground">
                            Second line of the main headline (sans-serif, bold)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">description</div>
                        <div className="text-sm text-muted-foreground">
                            Subtitle text displayed below the headline
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">color1</div>
                        <div className="text-sm text-muted-foreground">
                            Primary color for the gradient shader (default: "#3B82F6")
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">color2</div>
                        <div className="text-sm text-muted-foreground">
                            Secondary color for the gradient shader (default: "#F0F9FF")
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">speed</div>
                        <div className="text-sm text-muted-foreground">
                            Animation speed multiplier for the shader noise (default: 1)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">className</div>
                        <div className="text-sm text-muted-foreground">
                            Additional CSS classes for the container
                        </div>
                    </div>
                </div>
            </Section>
        </ComponentLayout>
    )
}
