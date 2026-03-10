"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-transparent transition-shadow hover:bg-accent relative [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        color="currentColor"
        className="-rotate-45 size-4"
        strokeWidth="2"
        stroke="currentColor"
      >
        <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" />
        <path d="M5 20L19 5" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
        <path d="M16 9L22 13.8528M12.4128 12.4059L19.3601 18.3634M8 15.6672L15 21.5" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
      </svg>
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
