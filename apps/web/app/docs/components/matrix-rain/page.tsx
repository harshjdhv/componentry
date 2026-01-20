import type React from "react"
import type { Metadata } from "next"
import { MatrixRain } from "@workspace/ui/components/matrix-rain"
import { InstallCommand } from "@/components/install-command"
import { CodeBlock } from "@/components/code-block"
import { ComponentLayout, Section } from "@/components/component-layout"

export const metadata: Metadata = {
  title: "Matrix Rain Component",
  description: "A digital rain animation effect inspired by The Matrix. Perfect for hacker themes, sci-fi UIs, or just looking cool.",
  alternates: {
    canonical: "https://componentry.fun/docs/components/matrix-rain",
  },
}

const defaultCode = `import { MatrixRain } from "@/components/ui/matrix-rain"

<div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background">
  <MatrixRain />
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <h1 className="text-4xl font-bold text-white tracking-wider">
      MATRIX
    </h1>
  </div>
</div>`

const rainbowCode = `import { MatrixRain } from "@/components/ui/matrix-rain"

<div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background">
  <MatrixRain variant="rainbow" />
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <h1 className="text-4xl font-bold text-white tracking-widest">
      RGB
    </h1>
  </div>
</div>`

const customCode = `import { MatrixRain } from "@/components/ui/matrix-rain"

<div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background">
  <MatrixRain 
    fixedColor="#ec4899" 
    speed={80} 
    fontSize={20}
  />
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <h1 className="text-4xl font-bold text-white">
      CYBERPUNK
    </h1>
  </div>
</div>`

export default function MatrixRainPage(): React.JSX.Element {
  return (
    <ComponentLayout
      title="Matrix Rain"
      description="A classic digital rain animation effect consisting of falling characters. Customizable colors, speed, and size."
    >
      <Section title="Install" id="install">
        <InstallCommand component="matrix-rain" />
      </Section>

      <Section title="Examples" id="examples">
        <div className="space-y-12">

          <div className="space-y-0">
            <h3 className="text-xl font-medium mb-4">Default</h3>
            <div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-t-xl rounded-b-none border border-border bg-black shadow-sm">
              <MatrixRain />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <h1 className="text-4xl font-bold text-white tracking-wider">
                  MATRIX
                </h1>
              </div>
            </div>
            <CodeBlock code={defaultCode} lang="tsx" className="rounded-t-none" />
          </div>

          <div className="space-y-0">
            <h3 className="text-xl font-medium mb-4">Rainbow Variant</h3>
            <div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-t-xl rounded-b-none border border-border bg-black shadow-sm">
              <MatrixRain variant="rainbow" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <h1 className="text-4xl font-bold text-white tracking-widest">
                  RGB
                </h1>
              </div>
            </div>
            <CodeBlock code={rainbowCode} lang="tsx" className="rounded-t-none" />
          </div>

          <div className="space-y-0">
            <h3 className="text-xl font-medium mb-4">Custom Configuration</h3>
            <div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-t-xl rounded-b-none border border-border bg-black shadow-sm">
              <MatrixRain
                fixedColor="#ec4899"
                speed={80}
                fontSize={20}
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <h1 className="text-4xl font-bold text-white">
                  CYBERPUNK
                </h1>
              </div>
            </div>
            <CodeBlock code={customCode} lang="tsx" className="rounded-t-none" />
          </div>

        </div>
      </Section>

      <Section title="Props" id="props">
        <div className="grid grid-cols-1 divide-y border rounded-xl bg-muted/30">
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
            <div className="font-mono text-sm">variant</div>
            <div className="text-sm text-muted-foreground">
              Preset theme: "default", "cyan", or "rainbow" (default: "default")
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
            <div className="font-mono text-sm">fixedColor</div>
            <div className="text-sm text-muted-foreground">
              Override the text color with a specific hex/taildwind color
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
            <div className="font-mono text-sm">speed</div>
            <div className="text-sm text-muted-foreground">
              Animation interval in ms. Lower is faster (default: 50)
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
            <div className="font-mono text-sm">fontSize</div>
            <div className="text-sm text-muted-foreground">
              Size of the characters in pixels (default: 16)
            </div>
          </div>
        </div>
      </Section>
    </ComponentLayout>
  )
}
