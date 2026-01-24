import type React from "react"
import type { Metadata } from "next"
import { ParticleGalaxyDemo } from "./particle-galaxy-client"
import { InstallCommand } from "@/components/install-command"
import { CodeBlock } from "@/components/code-block"
import { ComponentLayout, Section, InfoBox } from "@/components/component-layout"

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
            badge="Visual Effect"
        >
            <Section title="Installation" id="install" step={1}>
                <p className="text-muted-foreground mb-4">
                    Install the component using the shadcn CLI. This will automatically add all required dependencies.
                </p>
                <InstallCommand component="particle-galaxy" />
            </Section>

            <Section title="Basic Usage" id="usage" step={2}>
                <p className="text-muted-foreground mb-4">
                    Import and use the component in your project. Perfect for hero sections and landing pages.
                </p>
                <CodeBlock code={basicUsageCode} lang="tsx" filename="app/page.tsx" />
            </Section>

            <Section title="Examples" id="examples" step={3}>
                <div className="space-y-12">

                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Custom Colors & 5 Arms</h3>
                        <p className="text-sm text-muted-foreground">
                            Customize the galaxy with your brand colors and adjust the number of spiral arms.
                        </p>
                        <div className="relative h-[500px] w-full overflow-hidden rounded-t-xl border border-border/50">
                            <ParticleGalaxyDemo
                                colors={["#10b981", "#06b6d4", "#3b82f6"]}
                                spiralArms={5}
                                particleCount={15000}
                                spread={3.5}
                            />
                        </div>
                        <CodeBlock code={customColorsCode} lang="tsx" className="rounded-t-none" />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Dense Center & High Glow</h3>
                        <p className="text-sm text-muted-foreground">
                            Create a more intense galaxy with higher particle concentration in the center.
                        </p>
                        <div className="relative h-[500px] w-full overflow-hidden rounded-t-xl border border-border/50">
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

                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Slow Rotation & Static Camera</h3>
                        <p className="text-sm text-muted-foreground">
                            A calmer version with slower rotation for more subtle backgrounds.
                        </p>
                        <div className="relative h-[500px] w-full overflow-hidden rounded-t-xl border border-border/50">
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

            <Section title="Props Reference" id="props" step={4}>
                <InfoBox type="tip">
                    All props are optional. The component works great with defaults, but you can customize everything.
                </InfoBox>

                <div className="mt-6 rounded-xl border border-border/50 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border/50 bg-muted/30">
                                <th className="text-left font-medium p-4">Prop</th>
                                <th className="text-left font-medium p-4">Type</th>
                                <th className="text-left font-medium p-4">Default</th>
                                <th className="text-left font-medium p-4 hidden md:table-cell">Description</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30">
                            <tr>
                                <td className="p-4 font-mono text-cyan-600 dark:text-cyan-400">particleCount</td>
                                <td className="p-4 text-muted-foreground">number</td>
                                <td className="p-4 text-muted-foreground">10000</td>
                                <td className="p-4 text-muted-foreground hidden md:table-cell">Number of particles in the galaxy</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-mono text-cyan-600 dark:text-cyan-400">particleSize</td>
                                <td className="p-4 text-muted-foreground">number</td>
                                <td className="p-4 text-muted-foreground">0.02</td>
                                <td className="p-4 text-muted-foreground hidden md:table-cell">Base size of individual particles</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-mono text-cyan-600 dark:text-cyan-400">rotationSpeed</td>
                                <td className="p-4 text-muted-foreground">number</td>
                                <td className="p-4 text-muted-foreground">0.001</td>
                                <td className="p-4 text-muted-foreground hidden md:table-cell">Speed of automatic galaxy rotation</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-mono text-cyan-600 dark:text-cyan-400">spiralArms</td>
                                <td className="p-4 text-muted-foreground">number</td>
                                <td className="p-4 text-muted-foreground">3</td>
                                <td className="p-4 text-muted-foreground hidden md:table-cell">Number of spiral arms in the galaxy</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-mono text-cyan-600 dark:text-cyan-400">colors</td>
                                <td className="p-4 text-muted-foreground">string[]</td>
                                <td className="p-4 text-muted-foreground font-mono text-xs">[&quot;#4f46e5&quot;, ...]</td>
                                <td className="p-4 text-muted-foreground hidden md:table-cell">Array of 3 hex colors for galaxy coloring</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-mono text-cyan-600 dark:text-cyan-400">mouseInfluence</td>
                                <td className="p-4 text-muted-foreground">number</td>
                                <td className="p-4 text-muted-foreground">0.5</td>
                                <td className="p-4 text-muted-foreground hidden md:table-cell">Strength of mouse interaction (0-1)</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-mono text-cyan-600 dark:text-cyan-400">autoRotate</td>
                                <td className="p-4 text-muted-foreground">boolean</td>
                                <td className="p-4 text-muted-foreground">true</td>
                                <td className="p-4 text-muted-foreground hidden md:table-cell">Enable automatic rotation</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-mono text-cyan-600 dark:text-cyan-400">blendMode</td>
                                <td className="p-4 text-muted-foreground">&quot;additive&quot; | &quot;normal&quot;</td>
                                <td className="p-4 text-muted-foreground">&quot;additive&quot;</td>
                                <td className="p-4 text-muted-foreground hidden md:table-cell">Blend mode for particles</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-mono text-cyan-600 dark:text-cyan-400">spread</td>
                                <td className="p-4 text-muted-foreground">number</td>
                                <td className="p-4 text-muted-foreground">2.5</td>
                                <td className="p-4 text-muted-foreground hidden md:table-cell">How spread out the galaxy is (1-5)</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-mono text-cyan-600 dark:text-cyan-400">density</td>
                                <td className="p-4 text-muted-foreground">number</td>
                                <td className="p-4 text-muted-foreground">0.7</td>
                                <td className="p-4 text-muted-foreground hidden md:table-cell">Particle opacity/density (0-1)</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-mono text-cyan-600 dark:text-cyan-400">glow</td>
                                <td className="p-4 text-muted-foreground">number</td>
                                <td className="p-4 text-muted-foreground">60</td>
                                <td className="p-4 text-muted-foreground hidden md:table-cell">Glow intensity around particles (0-100)</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-mono text-cyan-600 dark:text-cyan-400">cameraMovement</td>
                                <td className="p-4 text-muted-foreground">boolean</td>
                                <td className="p-4 text-muted-foreground">true</td>
                                <td className="p-4 text-muted-foreground hidden md:table-cell">Enable gentle camera movement</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-mono text-cyan-600 dark:text-cyan-400">centerConcentration</td>
                                <td className="p-4 text-muted-foreground">number</td>
                                <td className="p-4 text-muted-foreground">0.5</td>
                                <td className="p-4 text-muted-foreground hidden md:table-cell">Concentration of particles toward center (0-1)</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-mono text-cyan-600 dark:text-cyan-400">pulsate</td>
                                <td className="p-4 text-muted-foreground">boolean</td>
                                <td className="p-4 text-muted-foreground">true</td>
                                <td className="p-4 text-muted-foreground hidden md:table-cell">Enable particle pulsation animation</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-mono text-cyan-600 dark:text-cyan-400">pulsateSpeed</td>
                                <td className="p-4 text-muted-foreground">number</td>
                                <td className="p-4 text-muted-foreground">1</td>
                                <td className="p-4 text-muted-foreground hidden md:table-cell">Speed of particle pulsation (0.1-2)</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-mono text-cyan-600 dark:text-cyan-400">className</td>
                                <td className="p-4 text-muted-foreground">string</td>
                                <td className="p-4 text-muted-foreground">-</td>
                                <td className="p-4 text-muted-foreground hidden md:table-cell">Additional CSS classes for the container</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>
        </ComponentLayout>
    )
}
