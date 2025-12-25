import type React from "react"
import { Button } from "@workspace/ui/components/button"
import { ComponentLayout, Section } from "@/components/component-layout"

export default function ButtonPage(): React.JSX.Element {
  return (
    <ComponentLayout
      title="Button"
      description="The most fundamental interactive element. A starting point for everything else."
      componentId="001"
    >
      <Section title="Variants">
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
          <pre className="p-6 bg-muted/30 text-sm overflow-x-auto font-mono">
            {`import { Button } from "@workspace/ui/components/button"

<Button>Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost" size="sm">Small ghost</Button>`}
          </pre>
          <p className="text-xs text-muted-foreground">
            Copy-paste ready. Tweak as needed.
          </p>
        </div>
      </Section>
    </ComponentLayout>
  )
}
