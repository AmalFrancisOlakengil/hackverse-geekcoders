import type React from "react"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
}

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <div
      className={cn(
        "relative group p-6 rounded-lg border bg-card text-card-foreground shadow-sm card-hover animate-in",
        className,
      )}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 font-heading">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

