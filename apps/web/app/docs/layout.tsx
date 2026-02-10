import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { CommandMenu } from "@/components/command-menu"
import { Logomark } from "@/components/logos/logomark"
import { GitHubStarButton } from "@/components/github-star-button"

export const metadata: Metadata = {
  title: "Components Documentation",
  description: "Browse the complete collection of Componentry UI components. Free, open-source React components with copy-paste code, Tailwind CSS styling, and Framer Motion animations by Harsh Jadhav.",
  openGraph: {
    title: "UI Components Documentation | Componentry by Harsh Jadhav",
    description: "Browse all React UI components. Copy-paste ready code with Tailwind CSS and Framer Motion.",
  },
  alternates: {
    canonical: "https://componentry.fun/docs",
  },
}

import { MobileNav } from "@/components/mobile-nav"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <div className="min-h-svh flex flex-col bg-background">
      <div className="flex-1 flex overflow-hidden">
        {/* Main content - Full screen split view handled by pages */}
        <main className="flex-1 w-full h-full">
          {children}
        </main>
      </div>
    </div>
  )
}
