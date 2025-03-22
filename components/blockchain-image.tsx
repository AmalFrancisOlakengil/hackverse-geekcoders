"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function BlockchainImage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const isDark = theme === "dark"

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Colors
    const primaryColor = isDark ? "#6366f1" : "#4F46E5"
    const secondaryColor = isDark ? "#10b981" : "#10B981"
    const bgColor = isDark ? "#1f2937" : "#f8fafc"
    const textColor = isDark ? "#f8fafc" : "#1f2937"

    // Clear canvas
    ctx.fillStyle = "transparent"
    ctx.fillRect(0, 0, rect.width, rect.height)

    // Draw blockchain
    const blockWidth = 80
    const blockHeight = 50
    const blockGap = 20
    const chainWidth = 10
    const startX = (rect.width - blockWidth) / 2
    const startY = 30

    // Draw blocks
    for (let i = 0; i < 5; i++) {
      const x = startX
      const y = startY + i * (blockHeight + blockGap)

      // Connection lines
      if (i > 0) {
        ctx.beginPath()
        ctx.strokeStyle = i % 2 === 0 ? primaryColor : secondaryColor
        ctx.lineWidth = 2
        ctx.setLineDash([5, 3])
        ctx.moveTo(x + blockWidth / 2, y)
        ctx.lineTo(x + blockWidth / 2, y - blockGap)
        ctx.stroke()
        ctx.setLineDash([])
      }

      // Block
      ctx.beginPath()
      const gradient = ctx.createLinearGradient(x, y, x + blockWidth, y + blockHeight)
      gradient.addColorStop(0, i % 2 === 0 ? primaryColor : secondaryColor)
      gradient.addColorStop(1, i % 2 === 0 ? "#818cf8" : "#34d399")

      ctx.fillStyle = gradient
      ctx.strokeStyle = i % 2 === 0 ? primaryColor : secondaryColor
      ctx.lineWidth = 2
      ctx.roundRect(x, y, blockWidth, blockHeight, 8)
      ctx.fill()
      ctx.stroke()

      // Hash text
      ctx.fillStyle = textColor
      ctx.font = "10px monospace"
      ctx.textAlign = "center"
      ctx.fillText(`Block ${i + 1}`, x + blockWidth / 2, y + blockHeight / 2)

      // Hash value
      ctx.font = "8px monospace"
      ctx.fillText(`#${Math.random().toString(16).substring(2, 10)}`, x + blockWidth / 2, y + blockHeight / 2 + 12)

      // Small connecting dots on sides
      if (i < 4) {
        // Right dot
        ctx.beginPath()
        ctx.arc(x + blockWidth, y + blockHeight / 2, 3, 0, Math.PI * 2)
        ctx.fillStyle = i % 2 === 0 ? primaryColor : secondaryColor
        ctx.fill()

        // Left dot on next block
        ctx.beginPath()
        ctx.arc(x, y + blockHeight + blockGap, 3, 0, Math.PI * 2)
        ctx.fillStyle = i % 2 === 0 ? secondaryColor : primaryColor
        ctx.fill()

        // Connection line
        ctx.beginPath()
        ctx.strokeStyle = i % 2 === 0 ? primaryColor : secondaryColor
        ctx.lineWidth = 1.5
        ctx.setLineDash([3, 2])
        ctx.moveTo(x + blockWidth, y + blockHeight / 2)
        ctx.lineTo(x, y + blockHeight + blockGap)
        ctx.stroke()
        ctx.setLineDash([])
      }
    }

    // Draw some floating data bits
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * rect.width
      const y = Math.random() * rect.height
      const size = Math.random() * 4 + 2

      ctx.beginPath()
      ctx.fillStyle = i % 2 === 0 ? primaryColor : secondaryColor
      ctx.globalAlpha = Math.random() * 0.5 + 0.2
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalAlpha = 1
    }
  }, [theme])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full" style={{ maxWidth: "100%", height: "auto" }} />
    </div>
  )
}

