"use client"

import { useEffect, useState, useRef } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface BlockchainNode {
  id: number
  x: number
  y: number
  size: number
  pulse: boolean
  label: string
}

interface Connection {
  from: number
  to: number
  active: boolean
}

export function BlockchainVisual() {
  const { theme } = useTheme()
  const [nodes, setNodes] = useState<BlockchainNode[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  // Generate random nodes and connections
  useEffect(() => {
    setMounted(true)
    if (!containerRef.current) return

    const width = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight

    // Create nodes
    const newNodes: BlockchainNode[] = []
    const nodeCount = 8

    for (let i = 0; i < nodeCount; i++) {
      newNodes.push({
        id: i,
        x: Math.random() * (width - 100) + 50,
        y: Math.random() * (height - 100) + 50,
        size: Math.random() * 20 + 60,
        pulse: Math.random() > 0.7,
        label: ["Data", "Research", "Funding", "Review", "Patent", "Collab", "Paper", "Grant"][i],
      })
    }

    setNodes(newNodes)

    // Create connections
    const newConnections: Connection[] = []

    // Ensure all nodes are connected at least once
    for (let i = 0; i < nodeCount; i++) {
      const to = (i + 1) % nodeCount
      newConnections.push({
        from: i,
        to,
        active: Math.random() > 0.3,
      })
    }

    // Add some random connections
    for (let i = 0; i < nodeCount; i++) {
      for (let j = 0; j < nodeCount; j++) {
        if (i !== j && Math.random() > 0.7) {
          newConnections.push({
            from: i,
            to: j,
            active: Math.random() > 0.5,
          })
        }
      }
    }

    setConnections(newConnections)

    // Animate nodes
    const interval = setInterval(() => {
      setNodes((prev) =>
        prev.map((node) => ({
          ...node,
          pulse: Math.random() > 0.7,
        })),
      )

      setConnections((prev) =>
        prev.map((conn) => ({
          ...conn,
          active: Math.random() > 0.3,
        })),
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative rounded-lg overflow-hidden border bg-background/50 backdrop-blur-sm"
      style={{ minHeight: "400px" }}
    >
      {/* Connections */}
      {connections.map((conn, i) => {
        const fromNode = nodes[conn.from]
        const toNode = nodes[conn.to]

        if (!fromNode || !toNode) return null

        const dx = toNode.x - fromNode.x
        const dy = toNode.y - fromNode.y
        const angle = Math.atan2(dy, dx) * (180 / Math.PI)
        const length = Math.sqrt(dx * dx + dy * dy)

        return (
          <div
            key={`conn-${i}`}
            className={cn(
              "blockchain-connection transition-opacity duration-1000",
              conn.active ? "opacity-100" : "opacity-30",
            )}
            style={{
              left: fromNode.x + fromNode.size / 2,
              top: fromNode.y + fromNode.size / 2,
              width: length,
              transform: `rotate(${angle}deg)`,
            }}
          />
        )
      })}

      {/* Nodes */}
      {nodes.map((node) => (
        <div
          key={`node-${node.id}`}
          className={cn("blockchain-node absolute transition-all duration-300", node.pulse && "animate-pulse-slow")}
          style={{
            left: node.x,
            top: node.y,
            width: node.size,
            height: node.size,
          }}
        >
          <div className="text-xs font-medium text-center">{node.label}</div>
        </div>
      ))}
    </div>
  )
}

