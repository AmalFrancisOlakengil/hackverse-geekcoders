"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    quote:
      "CollabVerse has transformed how I collaborate with researchers globally. The blockchain-based data sharing gives me confidence in protecting my work while enabling meaningful partnerships.",
    author: "Dr. Sarah Chen",
    role: "Quantum Computing Researcher",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SC",
  },
  {
    quote:
      "Finding funding used to be my biggest challenge. With CollabVerse's marketplace, I've secured grants for my climate research that would have been impossible through traditional channels.",
    author: "Prof. Michael Okonjo",
    role: "Environmental Scientist",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MO",
  },
  {
    quote:
      "As a student, the mentorship opportunities on CollabVerse have been invaluable. I've connected with leading experts who've guided my research and opened doors to opportunities I never imagined.",
    author: "Aisha Patel",
    role: "PhD Candidate, Biotechnology",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AP",
  },
  {
    quote:
      "The real-time peer review system has cut months off my publication timeline. My research is making an impact faster than ever before thanks to CollabVerse.",
    author: "Dr. James Wilson",
    role: "Medical Researcher",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JW",
  },
  {
    quote:
      "As an industry partner, CollabVerse has helped us find academic collaborators whose research aligns perfectly with our innovation goals. It's a win-win for everyone involved.",
    author: "Maria Rodriguez",
    role: "R&D Director, TechInnovate",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MR",
  },
]

export function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState<"left" | "right" | null>(null)

  const nextTestimonial = () => {
    setDirection("right")
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setDirection("left")
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial()
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden py-10">
        <div
          className={cn(
            "transition-all duration-500 ease-in-out flex",
            direction === "right" ? "animate-slide-in" : direction === "left" ? "animate-slide-out" : "",
          )}
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="min-w-full bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 sm:p-10">
                <Quote className="h-10 w-10 text-primary/20 mb-4" />
                <blockquote className="text-lg sm:text-xl mb-6 italic">"{testimonial.quote}"</blockquote>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                    <AvatarFallback>{testimonial.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              index === activeIndex ? "bg-primary w-6" : "bg-primary/30",
            )}
            onClick={() => {
              setDirection(index > activeIndex ? "right" : "left")
              setActiveIndex(index)
            }}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 sm:-translate-x-0 bg-background/80 backdrop-blur-sm shadow-md hover:bg-background hidden sm:flex"
        onClick={prevTestimonial}
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 sm:translate-x-0 bg-background/80 backdrop-blur-sm shadow-md hover:bg-background hidden sm:flex"
        onClick={nextTestimonial}
        aria-label="Next testimonial"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  )
}

