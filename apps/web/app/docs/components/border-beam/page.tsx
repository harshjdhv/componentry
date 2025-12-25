import type React from "react"
import { BorderBeam } from "@workspace/ui/components/border-beam"
import { InstallCommand } from "@/components/install-command"
import { CodeBlock } from "@/components/code-block"
import { ComponentLayout, Section } from "@/components/component-layout"

const usageCode = `import { BorderBeam } from "components/ui/border-beam"

<div className="relative h-[200px] w-full rounded-xl border bg-background">
  <BorderBeam />
</div>`

const customCode = `<div className="relative h-[200px] w-full rounded-xl border bg-background">
  <BorderBeam 
    size={300}
    duration={10}
    delay={5}
    colorFrom="#ff0000"
    colorTo="#0000ff"
  />
</div>`

export default function BorderBeamPage(): React.JSX.Element {
  return (
    <ComponentLayout
      title="Border Beam"
      description="A moving gradient beam that travels along the border of its container. Perfect for highlighting active states, new features, or premium content."
      componentId="004"
    >
      <Section title="Preview">
        <div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-xl border bg-background shadow-sm">
          <div className="z-10 text-center">
            <h3 className="text-2xl font-bold tracking-tight">Border Beam</h3>
            <p className="text-muted-foreground">The beam follows the border path</p>
          </div>
          <BorderBeam />
        </div>
      </Section>

      <Section title="Custom">
        <div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-xl border bg-background shadow-sm">
          <div className="z-10 text-center">
            <h3 className="text-2xl font-bold tracking-tight">Customized</h3>
            <p className="text-muted-foreground">Slower, larger, custom colors</p>
          </div>
          <BorderBeam 
            size={500}
            duration={20}
            borderWidth={2}
            colorFrom="#10b981"
            colorTo="#3b82f6"
          />
        </div>
      </Section>

      <Section title="Install">
        <div className="space-y-3">
          <InstallCommand component="border-beam" />
          <p className="text-xs text-muted-foreground">
            Make sure to update your globals.css with the keyframes animation.
          </p>
        </div>
      </Section>

      <Section title="Code">
        <div className="space-y-4">
          <CodeBlock code={usageCode} lang="tsx" />
          <p className="text-xs text-muted-foreground">
            Wrap the BorderBeam in a relative container. The component is absolutely positioned.
          </p>
        </div>
      </Section>

      <Section title="Props">
        <div className="grid grid-cols-1 divide-y border rounded-xl bg-muted/30">
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
            <div className="font-mono text-sm">size</div>
            <div className="text-sm text-muted-foreground">
              Length of the beam in pixels (default: 200)
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
            <div className="font-mono text-sm">duration</div>
            <div className="text-sm text-muted-foreground">
              Animation duration in seconds (default: 15)
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
            <div className="font-mono text-sm">borderWidth</div>
            <div className="text-sm text-muted-foreground">
              Width of the border/beam in pixels (default: 1.5)
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
            <div className="font-mono text-sm">colorFrom</div>
            <div className="text-sm text-muted-foreground">
              Start color of the gradient (default: #ffaa40)
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
            <div className="font-mono text-sm">colorTo</div>
            <div className="text-sm text-muted-foreground">
              End color of the gradient (default: #9c40ff)
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
            <div className="font-mono text-sm">delay</div>
            <div className="text-sm text-muted-foreground">
              Animation delay in seconds (default: 0)
            </div>
          </div>
        </div>
      </Section>
    </ComponentLayout>
  )
}
