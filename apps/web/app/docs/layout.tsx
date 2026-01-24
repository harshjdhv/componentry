import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { CommandMenu } from "@/components/command-menu"
import { DocsSidebar } from "@/components/docs-sidebar"
import { TableOfContents } from "@/components/table-of-contents"
import { Logomark } from "@/components/logos/logomark"

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
      {/* Header - Sleek with subtle border */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4 md:gap-6">
            <MobileNav />
            <Link
              href="/"
              className="hidden md:flex items-center gap-2.5 text-sm font-medium text-foreground hover:text-foreground/90 transition-colors"
            >
              <Logomark className="h-5 w-5" />
              <span className="font-semibold">Componentry</span>
            </Link>

            {/* Nav Divider */}
            <div className="hidden md:block h-4 w-px bg-border/60" />

            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/docs"
                className="px-3 py-1.5 text-sm font-medium rounded-md text-foreground bg-accent/50 transition-colors"
              >
                Docs
              </Link>
              <a
                href="https://github.com/harshjdhv/componentry"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <CommandMenu />
            <div className="hidden md:block h-4 w-px bg-border/60" />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <DocsSidebar />

        {/* Main content */}
        <main className="flex-1 w-full">
          <div className="max-w-4xl mx-auto px-6 md:px-8 py-10 md:py-16">
            {children}
          </div>
        </main>

        {/* Right Sidebar (TOC) */}
        <TableOfContents />
      </div>
    </div>
  )
}
