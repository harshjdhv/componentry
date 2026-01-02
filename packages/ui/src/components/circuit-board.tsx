"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@workspace/ui/lib/utils"

interface CircuitNode {
  id: string
  x: number
  y: number
  label?: string
  icon?: React.ReactNode
  status?: "active" | "inactive" | "processing" | "error"
  size?: "sm" | "md" | "lg"
}

interface CircuitConnection {
  from: string
  to: string
  animated?: boolean
  bidirectional?: boolean
  color?: string
  pulseColor?: string
}

interface CircuitBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  nodes: CircuitNode[]
  connections: CircuitConnection[]
  width?: number
  height?: number
  gridSize?: number
  showGrid?: boolean
  gridColor?: string
  traceColor?: string
  pulseColor?: string
  nodeColor?: string
  pulseSpeed?: number
  traceWidth?: number
}

function CircuitBoard({
  nodes,
  connections,
  width = 600,
  height = 400,
  gridSize = 20,
  showGrid = true,
  gridColor = "rgba(163, 163, 163, 0.08)",
  traceColor = "rgba(163, 163, 163, 0.25)",
  pulseColor = "rgba(163, 163, 163, 0.6)",
  nodeColor = "rgba(163, 163, 163, 0.5)",
  pulseSpeed = 2,
  traceWidth = 2,
  className,
  ...props
}: CircuitBoardProps) {
  const nodeMap = React.useMemo(() => {
    return new Map(nodes.map((node) => [node.id, node]))
  }, [nodes])

  const getNodeSize = React.useCallback((size?: CircuitNode["size"]) => {
    switch (size) {
      case "sm":
        return 24
      case "lg":
        return 48
      default:
        return 36
    }
  }, [])

  const calculatePath = React.useCallback(
    (from: CircuitNode, to: CircuitNode): string => {
      const fromSize = getNodeSize(from.size) / 2 + 4
      const toSize = getNodeSize(to.size) / 2 + 4
      
      const dx = to.x - from.x
      const dy = to.y - from.y
      
      // Calculate start and end points offset from node centers
      let startX = from.x
      let startY = from.y
      let endX = to.x
      let endY = to.y

      // Create circuit-like paths with right angles
      if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal first, then vertical
        startX = from.x + (dx > 0 ? fromSize : -fromSize)
        endX = to.x + (dx > 0 ? -toSize : toSize)
        const midX = from.x + dx / 2
        return `M ${startX} ${startY} H ${midX} V ${endY} H ${endX}`
      } else {
        // Vertical first, then horizontal
        startY = from.y + (dy > 0 ? fromSize : -fromSize)
        endY = to.y + (dy > 0 ? -toSize : toSize)
        const midY = from.y + dy / 2
        return `M ${startX} ${startY} V ${midY} H ${endX} V ${endY}`
      }
    },
    [getNodeSize]
  )

  const getStatusColor = (status?: CircuitNode["status"]) => {
    switch (status) {
      case "active":
        return "rgba(163, 163, 163, 0.7)"
      case "processing":
        return "rgba(163, 163, 163, 0.5)"
      case "error":
        return "rgba(120, 113, 108, 0.6)"
      default:
        return nodeColor
    }
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-neutral-950/50 border border-neutral-800/50",
        className
      )}
      style={{ width, height }}
      {...props}
    >
      <svg
        width={width}
        height={height}
        className="absolute inset-0"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Glow filter for the pulse effect */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Grid pattern */}
          {showGrid && (
            <pattern
              id="circuitGrid"
              width={gridSize}
              height={gridSize}
              patternUnits="userSpaceOnUse"
            >
              <circle cx={gridSize / 2} cy={gridSize / 2} r="0.5" fill={gridColor} />
            </pattern>
          )}

          {/* Animated gradient for electricity effect */}
          {connections.map((conn, i) => (
            <linearGradient
              key={`gradient-${i}`}
              id={`electricGradient-${i}`}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="transparent" />
              <stop offset="40%" stopColor="transparent" />
              <stop offset="50%" stopColor={conn.pulseColor || pulseColor} />
              <stop offset="60%" stopColor="transparent" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          ))}
        </defs>

        {/* Grid background */}
        {showGrid && (
          <rect width={width} height={height} fill="url(#circuitGrid)" />
        )}

        {/* Connection traces */}
        {connections.map((conn, i) => {
          const fromNode = nodeMap.get(conn.from)
          const toNode = nodeMap.get(conn.to)
          if (!fromNode || !toNode) return null

          const path = calculatePath(fromNode, toNode)
          const pathLength = 500 // Approximate path length for animation

          return (
            <g key={`connection-${i}`}>
              {/* Base trace */}
              <motion.path
                d={path}
                fill="none"
                stroke={conn.color || traceColor}
                strokeWidth={traceWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: i * 0.2 }}
              />

              {/* Animated electricity pulse */}
              {conn.animated !== false && (
                <motion.path
                  d={path}
                  fill="none"
                  stroke={conn.pulseColor || pulseColor}
                  strokeWidth={traceWidth + 2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#glow)"
                  strokeDasharray={`${pathLength * 0.1} ${pathLength * 0.9}`}
                  initial={{ strokeDashoffset: pathLength }}
                  animate={{ strokeDashoffset: -pathLength }}
                  transition={{
                    duration: pulseSpeed,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.3,
                  }}
                />
              )}

              {/* Bidirectional pulse */}
              {conn.bidirectional && (
                <motion.path
                  d={path}
                  fill="none"
                  stroke={conn.pulseColor || pulseColor}
                  strokeWidth={traceWidth + 2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#glow)"
                  strokeDasharray={`${pathLength * 0.1} ${pathLength * 0.9}`}
                  initial={{ strokeDashoffset: -pathLength }}
                  animate={{ strokeDashoffset: pathLength }}
                  transition={{
                    duration: pulseSpeed,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.3 + pulseSpeed / 2,
                  }}
                />
              )}


            </g>
          )
        })}
      </svg>

      {/* Nodes */}
      {nodes.map((node, i) => {
        const size = getNodeSize(node.size)
        const statusColor = getStatusColor(node.status)

        return (
          <motion.div
            key={node.id}
            className="absolute flex items-center justify-center"
            style={{
              left: node.x - size / 2,
              top: node.y - size / 2,
              width: size,
              height: size,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1 + 0.5, type: "spring" }}
          >
            {/* Node background with pulse */}
            <motion.div
              className="absolute inset-0 rounded-lg"
              style={{ backgroundColor: statusColor }}
              animate={
                node.status === "processing"
                  ? { opacity: [0.2, 0.5, 0.2] }
                  : { opacity: 0.2 }
              }
              transition={
                node.status === "processing"
                  ? { duration: 1.5, repeat: Infinity }
                  : {}
              }
            />

            {/* Node border */}
            <div
              className="absolute inset-0 rounded-lg border-2"
              style={{ borderColor: statusColor }}
            />

            {/* Inner glow for active nodes */}
            {node.status === "active" && (
              <motion.div
                className="absolute inset-0 rounded-lg"
                style={{
                  boxShadow: `0 0 20px ${statusColor}40, inset 0 0 10px ${statusColor}20`,
                }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}

            {/* Node content */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              {node.icon && (
                <div style={{ color: statusColor }}>{node.icon}</div>
              )}
            </div>

            {/* Label */}
            {node.label && (
              <div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium"
                style={{ color: statusColor }}
              >
                {node.label}
              </div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

// Pre-built circuit patterns
interface CircuitPatternProps extends Omit<CircuitBoardProps, "nodes" | "connections"> {
  pattern: "data-flow" | "network" | "processor" | "tree"
}

function CircuitPattern({ pattern, ...props }: CircuitPatternProps) {
  const patterns = {
    "data-flow": {
      nodes: [
        { id: "input", x: 50, y: 200, label: "Input", status: "active" as const },
        { id: "process1", x: 200, y: 100, label: "Process", status: "processing" as const },
        { id: "process2", x: 200, y: 300, label: "Validate", status: "active" as const },
        { id: "merge", x: 400, y: 200, label: "Merge", status: "active" as const },
        { id: "output", x: 550, y: 200, label: "Output", status: "active" as const },
      ],
      connections: [
        { from: "input", to: "process1", animated: true },
        { from: "input", to: "process2", animated: true },
        { from: "process1", to: "merge", animated: true },
        { from: "process2", to: "merge", animated: true },
        { from: "merge", to: "output", animated: true },
      ],
    },
    network: {
      nodes: [
        { id: "server", x: 300, y: 80, label: "Server", status: "active" as const, size: "lg" as const },
        { id: "client1", x: 100, y: 200, label: "Client 1", status: "active" as const },
        { id: "client2", x: 300, y: 250, label: "Client 2", status: "processing" as const },
        { id: "client3", x: 500, y: 200, label: "Client 3", status: "active" as const },
        { id: "db", x: 300, y: 350, label: "Database", status: "active" as const },
      ],
      connections: [
        { from: "server", to: "client1", bidirectional: true },
        { from: "server", to: "client2", bidirectional: true },
        { from: "server", to: "client3", bidirectional: true },
        { from: "server", to: "db", bidirectional: true },
      ],
    },
    processor: {
      nodes: [
        { id: "alu", x: 300, y: 200, label: "ALU", status: "processing" as const, size: "lg" as const },
        { id: "reg1", x: 150, y: 100, label: "R1", status: "active" as const, size: "sm" as const },
        { id: "reg2", x: 150, y: 200, label: "R2", status: "active" as const, size: "sm" as const },
        { id: "reg3", x: 150, y: 300, label: "R3", status: "active" as const, size: "sm" as const },
        { id: "cache", x: 450, y: 200, label: "Cache", status: "active" as const },
        { id: "out", x: 550, y: 200, label: "Out", status: "active" as const, size: "sm" as const },
      ],
      connections: [
        { from: "reg1", to: "alu", animated: true },
        { from: "reg2", to: "alu", animated: true },
        { from: "reg3", to: "alu", animated: true },
        { from: "alu", to: "cache", animated: true },
        { from: "cache", to: "out", animated: true },
      ],
    },
    tree: {
      nodes: [
        { id: "root", x: 300, y: 50, label: "Root", status: "active" as const },
        { id: "l1", x: 150, y: 150, label: "L1", status: "active" as const },
        { id: "r1", x: 450, y: 150, label: "R1", status: "processing" as const },
        { id: "l1l", x: 80, y: 280, label: "L1L", status: "active" as const, size: "sm" as const },
        { id: "l1r", x: 220, y: 280, label: "L1R", status: "active" as const, size: "sm" as const },
        { id: "r1l", x: 380, y: 280, label: "R1L", status: "error" as const, size: "sm" as const },
        { id: "r1r", x: 520, y: 280, label: "R1R", status: "active" as const, size: "sm" as const },
      ],
      connections: [
        { from: "root", to: "l1", animated: true },
        { from: "root", to: "r1", animated: true },
        { from: "l1", to: "l1l", animated: true },
        { from: "l1", to: "l1r", animated: true },
        { from: "r1", to: "r1l", animated: true },
        { from: "r1", to: "r1r", animated: true },
      ],
    },
  }

  const selectedPattern = patterns[pattern]
  return <CircuitBoard nodes={selectedPattern.nodes} connections={selectedPattern.connections} {...props} />
}

// Interactive circuit node for building custom circuits
interface CircuitNodeComponentProps {
  status?: "active" | "inactive" | "processing" | "error"
  size?: "sm" | "md" | "lg"
  glowColor?: string
  children?: React.ReactNode
  className?: string
  onClick?: () => void
}

function CircuitNode({
  status = "inactive",
  size = "md",
  glowColor,
  children,
  className,
  onClick,
}: CircuitNodeComponentProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  const statusColors = {
    active: "rgba(163, 163, 163, 0.7)",
    inactive: "rgba(115, 115, 115, 0.4)",
    processing: "rgba(163, 163, 163, 0.5)",
    error: "rgba(120, 113, 108, 0.6)",
  }

  const color = glowColor || statusColors[status]

  return (
    <motion.div
      className={cn(
        "relative flex items-center justify-center rounded-lg border bg-neutral-900/50",
        sizeClasses[size],
        className
      )}
      style={{ borderColor: color }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {/* Pulse animation for processing state */}
      {status === "processing" && (
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{ backgroundColor: color }}
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}

      {/* Active glow */}
      {status === "active" && (
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            boxShadow: `0 0 20px ${color}60, 0 0 40px ${color}30`,
          }}
        />
      )}

      {/* Error pulse */}
      {status === "error" && (
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{ boxShadow: `0 0 20px ${color}80` }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}

      <div className="relative z-10" style={{ color }}>
        {children}
      </div>
    </motion.div>
  )
}

// Animated trace line component for custom layouts
interface CircuitTraceProps {
  path: string
  animated?: boolean
  color?: string
  pulseColor?: string
  width?: number
  pulseSpeed?: number
}

function CircuitTrace({
  path,
  animated = true,
  color = "rgba(163, 163, 163, 0.25)",
  pulseColor = "rgba(163, 163, 163, 0.6)",
  width = 2,
  pulseSpeed = 2,
}: CircuitTraceProps) {
  const pathLength = 500

  return (
    <svg className="absolute inset-0 overflow-visible pointer-events-none">
      <defs>
        <filter id="traceGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Base trace */}
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Animated pulse */}
      {animated && (
        <motion.path
          d={path}
          fill="none"
          stroke={pulseColor}
          strokeWidth={width + 2}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#traceGlow)"
          strokeDasharray={`${pathLength * 0.1} ${pathLength * 0.9}`}
          initial={{ strokeDashoffset: pathLength }}
          animate={{ strokeDashoffset: -pathLength }}
          transition={{
            duration: pulseSpeed,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}
    </svg>
  )
}

export {
  CircuitBoard,
  CircuitPattern,
  CircuitNode,
  CircuitTrace,
  type CircuitNode as CircuitNodeType,
  type CircuitConnection,
  type CircuitBoardProps,
}
