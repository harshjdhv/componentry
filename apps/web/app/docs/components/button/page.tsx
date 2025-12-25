import type React from "react"
import { Button } from "@workspace/ui/components/button"
import { ShimmerButton } from "@workspace/ui/components/shimmer-button"
import { InteractiveHoverButton } from "@workspace/ui/components/interactive-hover-button"
import { PulsatingButton } from "@workspace/ui/components/pulsating-button"
import { ComponentLayout, Section } from "@/components/component-layout"
import { CodeBlock } from "@/components/code-block"

export default function ButtonPage(): React.JSX.Element {
  return (
    <ComponentLayout
      title="Button"
      description="The most fundamental interactive element. From basic actions to high-impact calls to action."
      componentId="001"
    >
      <Section title="Standard Variants">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { variant: "default" as const, label: "Default" },
            { variant: "secondary" as const, label: "Secondary" },
            { variant: "outline" as const, label: "Outline" },
            { variant: "ghost" as const, label: "Ghost" },
            { variant: "destructive" as const, label: "Destructive" },
            { variant: "link" as const, label: "Link" },
          ].map(({ variant, label }) => (
            <div key={variant} className="space-y-3">
              <div className="h-24 flex items-center justify-center bg-muted/30">
                <Button variant={variant}>{label}</Button>
              </div>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Creative Variants">
        <div className="space-y-12">
          
          <div className="space-y-0">
            <h3 className="text-xl font-medium mb-3">Shimmer Button</h3>
            <p className="text-sm text-muted-foreground mb-4">
              A high-performance button with a rotating shimmer effect on the border. Ideal for primary CTAs.
            </p>
            <div className="p-10 bg-muted/30 rounded-t-xl rounded-b-none border-b border-border flex items-center justify-center">
              <ShimmerButton className="shadow-2xl">
                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                  Shimmer Button
                </span>
              </ShimmerButton>
            </div>
            <CodeBlock 
              code={`import { ShimmerButton } from "components/ui/shimmer-button"\n\n<ShimmerButton>\n  <span>Shimmer Button</span>\n</ShimmerButton>`} 
              lang="tsx" 
              className="rounded-t-none"
            />
          </div>

          <div className="space-y-0">
            <h3 className="text-xl font-medium mb-3">Interactive Hover</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Expands on hover to reveal an arrow icon. Great for &quot;Learn More&quot; or navigation links.
            </p>
            <div className="p-10 bg-muted/30 rounded-t-xl rounded-b-none border-b border-border flex items-center justify-center">
              <InteractiveHoverButton />
            </div>
            <CodeBlock 
              code={`import { InteractiveHoverButton } from "components/ui/interactive-hover-button"\n\n<InteractiveHoverButton text="Get Started" />`} 
              lang="tsx" 
              className="rounded-t-none"
            />
          </div>

          <div className="space-y-0">
            <h3 className="text-xl font-medium mb-3">Pulsating Button</h3>
            <p className="text-sm text-muted-foreground mb-4">
              A button with a subtle, continuous pulse animation. Useful for drawing attention without being overwhelming.
            </p>
            <div className="p-10 bg-muted/30 rounded-t-xl rounded-b-none border-b border-border flex items-center justify-center">
              <PulsatingButton>Click me</PulsatingButton>
            </div>
            <CodeBlock 
              code={`import { PulsatingButton } from "components/ui/pulsating-button"\n\n<PulsatingButton>Click me</PulsatingButton>`} 
              lang="tsx" 
              className="rounded-t-none"
            />
          </div>

        </div>
      </Section>

      <Section title="Scale">
        <div className="flex items-end gap-6 pb-4">
          {[
            { size: "sm" as const, label: "S" },
            { size: "default" as const, label: "M" },
            { size: "lg" as const, label: "L" },
          ].map(({ size, label }) => (
            <div key={size} className="flex flex-col items-center gap-3">
              <Button size={size} variant="outline">
                Button
              </Button>
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Code">
        <div className="space-y-4">
          <CodeBlock code={`import { Button } from "@workspace/ui/components/button"

<Button>Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost" size="sm">Small ghost</Button>`} lang="tsx" />
          <p className="text-xs text-muted-foreground">
            Standard button usage.
          </p>
        </div>
      </Section>
    </ComponentLayout>
  )
}
