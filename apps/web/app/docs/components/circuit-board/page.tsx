import type React from "react"
import type { Metadata } from "next"
import { CircuitBoard } from "@workspace/ui/components/circuit-board"
import { InstallCommand } from "@/components/install-command"
import { CodeBlock } from "@/components/code-block"
import { ComponentLayout, Section } from "@/components/component-layout"
import { ComponentPreview } from "@/components/component-preview"
import { Database, Server, Cloud, Globe, Shield, GitBranch, Cpu, HardDrive, Wifi } from "lucide-react"

export const metadata: Metadata = {
  title: "Circuit Board Component",
  description: "Animated circuit board visualization with nodes and connections. Perfect for tech diagrams and flow visualizations. Free React component by Harsh Jadhav.",
  alternates: {
    canonical: "https://componentry.fun/docs/components/circuit-board",
  },
}

const simpleFlowCode = `import { CircuitBoard } from "@/components/ui/circuit-board"
import { Cloud, Server, Shield, Database } from "lucide-react"

<CircuitBoard
  nodes={[
    { id: "start", x: 80, y: 150, label: "Cloud", icon: <Cloud className="w-4 h-4" /> },
    { id: "process", x: 250, y: 80, label: "Server", icon: <Server className="w-4 h-4" /> },
    { id: "validate", x: 250, y: 220, label: "Validate", icon: <Shield className="w-4 h-4" /> },
    { id: "end", x: 420, y: 150, label: "Database", icon: <Database className="w-4 h-4" /> },
  ]}
  connections={[
    { from: "start", to: "process", animated: true },
    { from: "start", to: "validate", animated: true },
    { from: "process", to: "end", animated: true },
    { from: "validate", to: "end", animated: true },
  ]}
  width={500}
  height={300}
/>`

const loadBalancerCode = `import { CircuitBoard } from "@/components/ui/circuit-board"
import { Globe, GitBranch, Server, Database } from "lucide-react"

<CircuitBoard
  nodes={[
    { id: "user", x: 60, y: 150, label: "User", icon: <Globe className="w-4 h-4" /> },
    { id: "lb", x: 180, y: 150, label: "Load Balancer", icon: <GitBranch className="w-4 h-4" /> },
    { id: "api1", x: 300, y: 80, label: "API 1", icon: <Server className="w-4 h-4" /> },
    { id: "api2", x: 300, y: 220, label: "API 2", icon: <Server className="w-4 h-4" /> },
    { id: "db", x: 420, y: 150, label: "Database", icon: <Database className="w-4 h-4" /> },
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
/>`

const bidirectionalCode = `import { CircuitBoard } from "@/components/ui/circuit-board"
import { Cpu, HardDrive, Database } from "lucide-react"

<CircuitBoard
  nodes={[
    { id: "cpu", x: 100, y: 100, label: "CPU", icon: <Cpu className="w-4 h-4" /> },
    { id: "ram", x: 250, y: 100, label: "RAM", icon: <HardDrive className="w-4 h-4" /> },
    { id: "storage", x: 400, y: 100, label: "Storage", icon: <Database className="w-4 h-4" /> },
  ]}
  connections={[
    { from: "cpu", to: "ram", bidirectional: true },
    { from: "ram", to: "storage", bidirectional: true },
  ]}
  width={500}
  height={200}
  showGrid={false}
/>`

const networkCode = `import { CircuitBoard } from "@/components/ui/circuit-board"
import { Wifi, Server, Globe } from "lucide-react"

<CircuitBoard
  nodes={[
    { id: "router", x: 240, y: 100, label: "Router", icon: <Wifi className="w-4 h-4" /> },
    { id: "server1", x: 100, y: 220, label: "Server 1", icon: <Server className="w-4 h-4" /> },
    { id: "server2", x: 240, y: 220, label: "Server 2", icon: <Server className="w-4 h-4" /> },
    { id: "server3", x: 380, y: 220, label: "Server 3", icon: <Server className="w-4 h-4" /> },
  ]}
  connections={[
    { from: "router", to: "server1", animated: true },
    { from: "router", to: "server2", animated: true },
    { from: "router", to: "server3", animated: true },
  ]}
  width={480}
  height={300}
  pulseSpeed={1.5}
/>`

export default function CircuitBoardPage(): React.JSX.Element {
  return (
    <ComponentLayout
      title="Circuit Board"
      description="An interactive circuit board layout component with animated electricity paths that pulse between connected nodes. Perfect for visualizing data flows, system architectures, and network topologies."

    >
      <Section title="Install">
        <InstallCommand component="circuit-board" />
      </Section>

      <Section title="Examples">
        <div className="space-y-12">

          <div className="space-y-0">
            <h3 className="text-xl font-medium mb-4">Simple Flow</h3>
            <ComponentPreview>
              <CircuitBoard
                nodes={[
                  { id: "start", x: 80, y: 150, label: "Cloud", icon: <Cloud className="w-4 h-4" /> },
                  { id: "process", x: 250, y: 80, label: "Server", icon: <Server className="w-4 h-4" /> },
                  { id: "validate", x: 250, y: 220, label: "Validate", icon: <Shield className="w-4 h-4" /> },
                  { id: "end", x: 420, y: 150, label: "Database", icon: <Database className="w-4 h-4" /> },
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
            </ComponentPreview>
            <CodeBlock code={simpleFlowCode} lang="tsx" className="rounded-t-none" />
          </div>

          <div className="space-y-0">
            <h3 className="text-xl font-medium mb-4">Load Balancer</h3>
            <ComponentPreview>
              <CircuitBoard
                nodes={[
                  { id: "user", x: 60, y: 150, label: "User", icon: <Globe className="w-4 h-4" /> },
                  { id: "lb", x: 180, y: 150, label: "Load Balancer", icon: <GitBranch className="w-4 h-4" /> },
                  { id: "api1", x: 300, y: 80, label: "API 1", icon: <Server className="w-4 h-4" /> },
                  { id: "api2", x: 300, y: 220, label: "API 2", icon: <Server className="w-4 h-4" /> },
                  { id: "db", x: 420, y: 150, label: "Database", icon: <Database className="w-4 h-4" /> },
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
            </ComponentPreview>
            <CodeBlock code={loadBalancerCode} lang="tsx" className="rounded-t-none" />
          </div>

          <div className="space-y-0">
            <h3 className="text-xl font-medium mb-4">Bidirectional</h3>
            <ComponentPreview>
              <CircuitBoard
                nodes={[
                  { id: "cpu", x: 100, y: 100, label: "CPU", icon: <Cpu className="w-4 h-4" /> },
                  { id: "ram", x: 250, y: 100, label: "RAM", icon: <HardDrive className="w-4 h-4" /> },
                  { id: "storage", x: 400, y: 100, label: "Storage", icon: <Database className="w-4 h-4" /> },
                ]}
                connections={[
                  { from: "cpu", to: "ram", bidirectional: true },
                  { from: "ram", to: "storage", bidirectional: true },
                ]}
                width={500}
                height={200}
                showGrid={false}
              />
            </ComponentPreview>
            <CodeBlock code={bidirectionalCode} lang="tsx" className="rounded-t-none" />
          </div>

          <div className="space-y-0">
            <h3 className="text-xl font-medium mb-4">Network Topology</h3>
            <ComponentPreview>
              <CircuitBoard
                nodes={[
                  { id: "router", x: 240, y: 100, label: "Router", icon: <Wifi className="w-4 h-4" /> },
                  { id: "server1", x: 100, y: 220, label: "Server 1", icon: <Server className="w-4 h-4" /> },
                  { id: "server2", x: 240, y: 220, label: "Server 2", icon: <Server className="w-4 h-4" /> },
                  { id: "server3", x: 380, y: 220, label: "Server 3", icon: <Server className="w-4 h-4" /> },
                ]}
                connections={[
                  { from: "router", to: "server1", animated: true },
                  { from: "router", to: "server2", animated: true },
                  { from: "router", to: "server3", animated: true },
                ]}
                width={480}
                height={300}
                pulseSpeed={1.5}
              />
            </ComponentPreview>
            <CodeBlock code={networkCode} lang="tsx" className="rounded-t-none" />
          </div>

        </div>
      </Section>

      <Section title="Props">
        <div className="grid grid-cols-1 divide-y border rounded-xl bg-muted/30">
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
            <div className="font-mono text-sm">nodes</div>
            <div className="text-sm text-muted-foreground">
              Array of node objects with id, x, y, label, size, and icon
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
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
            <div className="font-mono text-sm">traceWidth</div>
            <div className="text-sm text-muted-foreground">
              Width of the connection traces in pixels (default: 2)
            </div>
          </div>
        </div>
      </Section>
    </ComponentLayout>
  )
}
