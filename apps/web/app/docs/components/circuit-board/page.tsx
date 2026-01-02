import type React from "react"
import { CircuitBoard } from "@workspace/ui/components/circuit-board"
import { InstallCommand } from "@/components/install-command"
import { CodeBlock } from "@/components/code-block"
import { ComponentLayout, Section } from "@/components/component-layout"
import { Database, Server, Cloud, Globe, Shield, GitBranch } from "lucide-react"

const basicUsageCode = `import { CircuitBoard } from "@workspace/ui/components/circuit-board"
import { Globe, Server, Database } from "lucide-react"

const nodes = [
  { id: "user", x: 80, y: 150, icon: <Globe className="w-4 h-4" /> },
  { id: "api", x: 250, y: 150, icon: <Server className="w-4 h-4" /> },
  { id: "db", x: 420, y: 150, icon: <Database className="w-4 h-4" /> },
]

const connections = [
  { from: "user", to: "api", animated: true },
  { from: "api", to: "db", bidirectional: true },
]

<CircuitBoard
  nodes={nodes}
  connections={connections}
  width={500}
  height={300}
/>`

export default function CircuitBoardPage(): React.JSX.Element {
  return (
    <ComponentLayout
      title="Circuit Board"
      description="An interactive circuit board layout component with animated electricity paths that pulse between connected nodes. Perfect for visualizing data flows, system architectures, and network topologies."
      componentId="005"
    >
      <Section title="Preview">
        <div className="flex justify-center p-8 bg-neutral-900/50 rounded-xl border border-neutral-800">
          <CircuitBoard
            nodes={[
              { id: "start", x: 80, y: 150, icon: <Cloud className="w-4 h-4" /> },
              { id: "process", x: 250, y: 80, icon: <Server className="w-4 h-4" /> },
              { id: "validate", x: 250, y: 220, icon: <Shield className="w-4 h-4" /> },
              { id: "end", x: 420, y: 150, icon: <Database className="w-4 h-4" /> },
            ]}
            connections={[
              { from: "start", to: "process", animated: true },
              { from: "start", to: "validate", animated: true },
              { from: "process", to: "end", animated: true },
              { from: "validate", to: "end", animated: true },
            ]}
            width={500}
            height={300}
          />
        </div>
      </Section>

      <Section title="Server Architecture">
        <div className="flex justify-center p-8 bg-neutral-900/50 rounded-xl border border-neutral-800">
          <CircuitBoard
            nodes={[
              { id: "user", x: 60, y: 150, icon: <Globe className="w-4 h-4" /> },
              { id: "lb", x: 180, y: 150, icon: <GitBranch className="w-4 h-4" /> },
              { id: "api1", x: 300, y: 80, icon: <Server className="w-4 h-4" /> },
              { id: "api2", x: 300, y: 220, icon: <Server className="w-4 h-4" /> },
              { id: "db", x: 420, y: 150, icon: <Database className="w-4 h-4" /> },
            ]}
            connections={[
              { from: "user", to: "lb", animated: true },
              { from: "lb", to: "api1", animated: true },
              { from: "lb", to: "api2", animated: true },
              { from: "api1", to: "db", animated: true },
              { from: "api2", to: "db", animated: true },
            ]}
            width={480}
            height={300}
          />
        </div>
      </Section>

      <Section title="Install">
        <InstallCommand component="circuit-board" />
      </Section>

      <Section title="Usage">
        <CodeBlock code={basicUsageCode} lang="tsx" />
      </Section>

      <Section title="Props">
        <div className="grid grid-cols-1 divide-y border rounded-xl bg-muted/30">
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
            <div className="font-mono text-sm">nodes</div>
            <div className="text-sm text-muted-foreground">
              Array of node objects with id, x, y, label, status, size, and icon
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
            <div className="font-mono text-sm">connections</div>
            <div className="text-sm text-muted-foreground">
              Array of connection objects with from, to, animated, bidirectional
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
            <div className="font-mono text-sm">width / height</div>
            <div className="text-sm text-muted-foreground">
              Dimensions of the circuit board (default: 600 x 400)
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
            <div className="font-mono text-sm">showGrid</div>
            <div className="text-sm text-muted-foreground">
              Show dot grid background (default: true)
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
            <div className="font-mono text-sm">pulseSpeed</div>
            <div className="text-sm text-muted-foreground">
              Speed of the electricity animation in seconds (default: 2)
            </div>
          </div>
        </div>
      </Section>
    </ComponentLayout>
  )
}
