import type React from "react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { CommandMenu } from "@/components/command-menu"
import { docsConfig } from "@/config/docs"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <div className="min-h-svh flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
            >
              Playground
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/docs"
                className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
              >
                Docs
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <CommandMenu />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 border-r border-border hidden md:block">
          <div className="sticky top-14 h-[calc(100svh-3.5rem)] overflow-y-auto px-6 py-8">
            <nav className="space-y-8">
              {docsConfig.nav.map((group) => (
                <div key={group.title} className="space-y-3">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground/60">
                    {group.title}
                  </p>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 md:py-16">
          {children}
        </main>
      </div>
    </div>
  )
}
