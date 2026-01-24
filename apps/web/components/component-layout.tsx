import type React from "react"
import { cn } from "@workspace/ui/lib/utils"

interface ComponentLayoutProps {
  title: string
  description: string
  children: React.ReactNode
  badge?: string
  date?: string
}

export function ComponentLayout({
  title,
  description,
  children,
  badge,
  date,
}: ComponentLayoutProps) {
  return (
    <div className="space-y-16">
      <header className="space-y-6">
        {/* Optional badge and date row */}
        {(badge || date) && (
          <div className="flex items-center gap-4">
            {badge && (
              <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                {badge}
              </span>
            )}
            {date && (
              <span className="text-sm text-muted-foreground">
                {date}
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {title}
        </h1>

        {/* Description */}
        <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
          {description}
        </p>
      </header>

      <div className="space-y-16">
        {children}
      </div>
    </div>
  )
}

interface SectionProps {
  title: string
  children: React.ReactNode
  id?: string
  step?: number
}

export function Section({ title, children, id, step }: SectionProps) {
  const sectionId = id || title.toLowerCase().replace(/\s+/g, "-")

  return (
    <div
      className="scroll-mt-20"
      id={sectionId}
      data-section-title={title}
    >
      {/* Section header with optional step number */}
      <div className="flex items-center gap-4 mb-6">
        {step !== undefined && (
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-foreground text-background text-sm font-semibold shrink-0">
            {step}
          </div>
        )}
        <h2 className="text-2xl font-semibold tracking-tight">
          {title}
        </h2>
      </div>

      <div className={cn("space-y-6", step !== undefined && "pl-12")}>
        {children}
      </div>
    </div>
  )
}

interface SubSectionProps {
  title: string
  children: React.ReactNode
  id?: string
}

export function SubSection({ title, children, id }: SubSectionProps) {
  const sectionId = id || title.toLowerCase().replace(/\s+/g, "-")

  return (
    <div id={sectionId} className="space-y-4">
      <h3 className="text-xl font-medium text-foreground/90">
        {title}
      </h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  )
}

interface InfoBoxProps {
  children: React.ReactNode
  type?: "info" | "warning" | "tip"
}

export function InfoBox({ children, type = "info" }: InfoBoxProps) {
  const styles = {
    info: "bg-cyan-500/5 border-cyan-500/20 text-cyan-700 dark:text-cyan-300",
    warning: "bg-amber-500/5 border-amber-500/20 text-amber-700 dark:text-amber-300",
    tip: "bg-emerald-500/5 border-emerald-500/20 text-emerald-700 dark:text-emerald-300",
  }

  const icons = {
    info: (
      <svg className="h-4 w-4 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
    ),
    warning: (
      <svg className="h-4 w-4 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <path d="M12 9v4M12 17h.01" />
      </svg>
    ),
    tip: (
      <svg className="h-4 w-4 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  }

  const labels = {
    info: "Info",
    warning: "Warning",
    tip: "Tip",
  }

  return (
    <div className={cn("flex gap-3 px-4 py-3 rounded-lg border", styles[type])}>
      {icons[type]}
      <div className="space-y-1">
        <p className="font-medium text-sm">{labels[type]}</p>
        <div className="text-sm opacity-90">{children}</div>
      </div>
    </div>
  )
}

interface CodeInlineProps {
  children: React.ReactNode
}

export function CodeInline({ children }: CodeInlineProps) {
  return (
    <code className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-sm font-mono text-cyan-600 dark:text-cyan-400">
      {children}
    </code>
  )
}
