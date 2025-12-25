import type React from "react"
import { cn } from "@workspace/ui/lib/utils"

interface ComponentLayoutProps {
  title: string
  description: string
  componentId: string
  children: React.ReactNode
}

export function ComponentLayout({
  title,
  description,
  componentId,
  children,
}: ComponentLayoutProps) {
  return (
    <div className="space-y-16">
      <header className="grid md:grid-cols-[120px_1fr] gap-8">
        <div>
          <span className="text-6xl font-light text-muted-foreground/50">
            {componentId}
          </span>
        </div>
        <div className="space-y-4">
          <h1
            className="text-5xl md:text-6xl tracking-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {title}
          </h1>
          <p className="text-muted-foreground max-w-md">{description}</p>
        </div>
      </header>

      {children}
    </div>
  )
}

interface SectionProps {
  title: string
  children: React.ReactNode
  id?: string
}

export function Section({ title, children, id }: SectionProps) {
  const sectionId = id || title.toLowerCase().replace(/\s+/g, "-")
  
  return (
    <div 
      className="grid md:grid-cols-[120px_1fr] gap-8" 
      id={sectionId} 
      data-section-title={title}
    >
      <div className="text-xs uppercase tracking-widest text-muted-foreground pt-1">
        {title}
      </div>
      <div className="space-y-6 min-w-0">
        {children}
      </div>
    </div>
  )
}
