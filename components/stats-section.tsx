"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useInView } from "react-intersection-observer"
import { Users, FileText, Award, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatProps {
  icon: React.ReactNode
  value: number
  label: string
  suffix?: string
  delay?: number
}

function Stat({ icon, value, label, suffix = "", delay = 0 }: StatProps) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  const countRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (inView) {
      const timeout = setTimeout(() => {
        const duration = 2000
        const start = 0
        const end = value
        const increment = end / (duration / 16)
        let current = start

        const step = () => {
          current += increment
          setCount(Math.min(Math.floor(current), end))

          if (current < end) {
            countRef.current = setTimeout(step, 16)
          }
        }

        countRef.current = setTimeout(step, 16)
      }, delay)

      return () => clearTimeout(timeout)
    }

    return () => {
      if (countRef.current) {
        clearTimeout(countRef.current)
      }
    }
  }, [inView, value, delay])

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center text-center transition-opacity duration-700",
        inView ? "opacity-100" : "opacity-0",
      )}
    >
      <div className="mb-4 p-4 rounded-full bg-primary/10 text-primary">{icon}</div>
      <h3 className="text-4xl font-bold mb-2 font-heading tabular-nums">
        {count}
        {suffix}
      </h3>
      <p className="text-muted-foreground">{label}</p>
    </div>
  )
}

export function StatsSection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-in">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">CollabVerse by the Numbers</h2>
          <p className="text-muted-foreground">Our growing community is transforming the global research landscape.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <Stat
            icon={<Users className="h-8 w-8" />}
            value={15000}
            label="Researchers & Students"
            suffix="+"
            delay={0}
          />
          <Stat icon={<FileText className="h-8 w-8" />} value={2800} label="Research Projects" delay={200} />
          <Stat icon={<Award className="h-8 w-8" />} value={120} label="Million in Funding" suffix="M" delay={400} />
          <Stat icon={<Globe className="h-8 w-8" />} value={75} label="Countries Represented" delay={600} />
        </div>
      </div>
    </section>
  )
}

