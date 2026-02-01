import React from "react"
import { CircuitBoard } from "@workspace/ui/components/circuit-board"
import { DocsPageLayout } from "@/components/docs-page-layout"
import { readComponentSource } from "@/lib/source-code"
import { Cloud, Server, Shield, Database, Globe, GitBranch, Cpu, HardDrive, Wifi } from "lucide-react"

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

export async function CircuitBoardDocs() {
    const sourceCode = (await readComponentSource("circuit-board")) || "// Unable to load source code"

    return (
        <DocsPageLayout
            title="Circuit Board"
            description="Animated circuit board visualization with nodes and connections. Perfect for tech diagrams and flow visualizations."
            preview={
                <div className="flex items-center justify-center w-full overflow-hidden p-4">
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
                </div>
            }
            previewCode={simpleFlowCode}
            installPackageName="circuit-board"
            installDependencies="framer-motion clsx tailwind-merge lucide-react"
            installSourceCode={sourceCode}
            usageCode={simpleFlowCode}
            examples={[
                {
                    title: "Simple Flow",
                    preview: (
                        <div className="flex items-center justify-center p-4">
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
                        </div>
                    ),
                    code: simpleFlowCode,
                },
                {
                    title: "Load Balancer",
                    preview: (
                        <div className="flex items-center justify-center p-4">
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
                        </div>
                    ),
                    code: loadBalancerCode,
                },
                {
                    title: "Bidirectional",
                    preview: (
                        <div className="flex items-center justify-center p-4">
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
                        </div>
                    ),
                    code: bidirectionalCode,
                },
                {
                    title: "Network Topology",
                    preview: (
                        <div className="flex items-center justify-center p-4">
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
                        </div>
                    ),
                    code: networkCode,
                },
            ]}
            props={[
                {
                    name: "nodes",
                    type: "CircuitNode[]",
                    description: "Array of node objects with id, x, y, label, size, and icon",
                },
                {
                    name: "connections",
                    type: "CircuitConnection[]",
                    description: "Array of connection objects with from, to, animated, bidirectional",
                },
                {
                    name: "width",
                    type: "number",
                    default: "600",
                    description: "Width of the circuit board canvas",
                },
                {
                    name: "height",
                    type: "number",
                    default: "400",
                    description: "Height of the circuit board canvas",
                },
                {
                    name: "showGrid",
                    type: "boolean",
                    default: "true",
                    description: "Show dot grid background",
                },
                {
                    name: "pulseSpeed",
                    type: "number",
                    default: "2",
                    description: "Speed of the electricity animation in seconds",
                },
                {
                    name: "traceWidth",
                    type: "number",
                    default: "2",
                    description: "Width of the connection traces in pixels",
                },
                {
                    name: "className",
                    type: "string",
                    description: "Additional CSS classes for the container",
                }
            ]}
        />
    )
}
