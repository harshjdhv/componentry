import type React from "react"
import type { Metadata } from "next"
import { ParticleGalaxyDemo } from "./particle-galaxy-client"
import { InstallCommand } from "@/components/install-command"
import { CodeBlock } from "@/components/code-block"
import { ComponentLayout, Section } from "@/components/component-layout"

export const metadata: Metadata = {
    title: "Particle Galaxy Component",
    description: "Stunning 3D particle galaxy with Three.js - interactive spiral galaxy with custom shaders, mouse controls, and smooth animations. Fully customizable with extensive props. Works on both light and dark backgrounds.",
    alternates: {
        canonical: "https://componentry.fun/docs/components/particle-galaxy",
    },
}

const basicUsageCode = `import { ParticleGalaxy } from "@/components/ui/particle-galaxy"

export default function Hero() {
  return (
    <div className="relative h-screen w-full">
      <ParticleGalaxy />
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-6xl font-bold">Your Content Here</h1>
      </div>
    </div>
  )
}`

const customColorsCode = `import { ParticleGalaxy } from "@/components/ui/particle-galaxy"

<div className="relative h-[600px] w-full overflow-hidden rounded-xl border">
  <ParticleGalaxy 
    colors={["#10b981", "#06b6d4", "#3b82f6"]}
    spiralArms={5}
    particleCount={15000}
    spread={3.5}
  />
</div>`

const denseGalaxyCode = `import { ParticleGalaxy } from "@/components/ui/particle-galaxy"

<div className="relative h-[600px] w-full overflow-hidden rounded-xl border">
  <ParticleGalaxy 
    colors={["#f97316", "#ef4444", "#ec4899"]}
    particleCount={20000}
    particleSize={0.025}
    centerConcentration={0.8}
    density={0.9}
    glow={80}
    spread={2}
  />
</div>`

const slowRotateCode = `import { ParticleGalaxy } from "@/components/ui/particle-galaxy"

<div className="relative h-[600px] w-full overflow-hidden rounded-xl border">
  <ParticleGalaxy 
    colors={["#8b5cf6", "#ec4899", "#f97316"]}
    rotationSpeed={0.0005}
    mouseInfluence={0.8}
    cameraMovement={false}
    pulsate={false}
  />
</div>`

export default function ParticleGalaxyPage(): React.JSX.Element {
    return (
        <ComponentLayout
            title="Particle Galaxy"
            description="A stunning 3D particle system that creates an interactive spiral galaxy using Three.js and custom WebGL shaders. Features smooth mouse-controlled rotation, realistic particle distribution, and extensive customization options."
        >
            <Section title="Install">
                <InstallCommand component="particle-galaxy" />
            </Section>

            <Section title="Usage">
                <CodeBlock code={basicUsageCode} lang="tsx" filename="app/page.tsx" />
            </Section>

            <Section title="Examples">
                <div className="space-y-12">

                    <div className="space-y-0">
                        <h3 className="text-xl font-medium mb-4">Custom Colors & 5 Arms</h3>
                        <div className="relative h-[500px] w-full overflow-hidden rounded-t-xl border border-border">
                            <ParticleGalaxyDemo
                                colors={["#10b981", "#06b6d4", "#3b82f6"]}
                                spiralArms={5}
                                particleCount={15000}
                                spread={3.5}
                            />
                        </div>
                        <CodeBlock code={customColorsCode} lang="tsx" className="rounded-t-none" />
                    </div>

                    <div className="space-y-0">
                        <h3 className="text-xl font-medium mb-4">Dense Center & High Glow</h3>
                        <div className="relative h-[500px] w-full overflow-hidden rounded-t-xl border border-border">
                            <ParticleGalaxyDemo
                                colors={["#f97316", "#ef4444", "#ec4899"]}
                                particleCount={20000}
                                particleSize={0.025}
                                centerConcentration={0.8}
                                density={0.9}
                                glow={80}
                                spread={2}
                            />
                        </div>
                        <CodeBlock code={denseGalaxyCode} lang="tsx" className="rounded-t-none" />
                    </div>

                    <div className="space-y-0">
                        <h3 className="text-xl font-medium mb-4">Slow Rotation & Static Camera</h3>
                        <div className="relative h-[500px] w-full overflow-hidden rounded-t-xl border border-border">
                            <ParticleGalaxyDemo
                                colors={["#8b5cf6", "#ec4899", "#f97316"]}
                                rotationSpeed={0.0005}
                                mouseInfluence={0.8}
                                cameraMovement={false}
                                pulsate={false}
                            />
                        </div>
                        <CodeBlock code={slowRotateCode} lang="tsx" className="rounded-t-none" />
                    </div>

                </div>
            </Section>

            <Section title="Props">
                <div className="grid grid-cols-1 divide-y border rounded-xl bg-muted/30">
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">particleCount</div>
                        <div className="text-sm text-muted-foreground">
                            Number of particles in the galaxy (default: 10000)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">particleSize</div>
                        <div className="text-sm text-muted-foreground">
                            Base size of individual particles (default: 0.02)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">rotationSpeed</div>
                        <div className="text-sm text-muted-foreground">
                            Speed of automatic galaxy rotation (default: 0.001)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">spiralArms</div>
                        <div className="text-sm text-muted-foreground">
                            Number of spiral arms in the galaxy (default: 3)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">colors</div>
                        <div className="text-sm text-muted-foreground">
                            Array of 3 hex colors for galaxy coloring (default: ["#4f46e5", "#8b5cf6", "#06b6d4"])
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">mouseInfluence</div>
                        <div className="text-sm text-muted-foreground">
                            Strength of mouse interaction, 0-1 (default: 0.5)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">autoRotate</div>
                        <div className="text-sm text-muted-foreground">
                            Enable automatic rotation (default: true)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">blendMode</div>
                        <div className="text-sm text-muted-foreground">
                            Blend mode for particles: "additive" or "normal" (default: "additive")
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">spread</div>
                        <div className="text-sm text-muted-foreground">
                            How spread out the galaxy is, 1-5 (default: 2.5)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">density</div>
                        <div className="text-sm text-muted-foreground">
                            Particle opacity/density, 0-1 (default: 0.7)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">glow</div>
                        <div className="text-sm text-muted-foreground">
                            Glow intensity around particles, 0-100 (default: 60)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">cameraMovement</div>
                        <div className="text-sm text-muted-foreground">
                            Enable gentle camera movement (default: true)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">centerConcentration</div>
                        <div className="text-sm text-muted-foreground">
                            Concentration of particles toward center, 0-1 (default: 0.5)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">pulsate</div>
                        <div className="text-sm text-muted-foreground">
                            Enable particle pulsation animation (default: true)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">pulsateSpeed</div>
                        <div className="text-sm text-muted-foreground">
                            Speed of particle pulsation, 0.1-2 (default: 1)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">className</div>
                        <div className="text-sm text-muted-foreground">
                            Additional CSS classes for the container.
                        </div>
                    </div>
                </div>
            </Section>
        </ComponentLayout>
    )
}
