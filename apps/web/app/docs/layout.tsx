import type React from "react"
import Link from "next/link"

const components = [
  { id: "001", title: "Button", href: "/docs/components/button" },
  { id: "002", title: "Flight Status Card", href: "/docs/components/flight-status-card" },
]

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <div className="min-h-svh flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-border hidden md:block">
        <div className="sticky top-0 h-svh overflow-y-auto px-6 py-8">
          <Link
            href="/"
            className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
          >
            Playground
          </Link>

          <nav className="mt-12 space-y-8">
            <div className="space-y-3">
              <Link
                href="/docs"
                className="block text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
              >
                Introduction
              </Link>
            </div>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-muted-foreground/60">
                Components
              </p>
              <ul className="space-y-2">
                {components.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span className="text-xs tabular-nums">{item.id}</span>
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="flex-1 flex flex-col">
        <header className="border-b border-border md:hidden">
          <div className="px-6 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
            >
              Playground
            </Link>
            <nav className="flex items-center gap-4">
              <Link
                href="/docs"
                className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
              >
                About
              </Link>
              {components.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-xs tabular-nums text-muted-foreground hover:text-foreground"
                >
                  {item.id}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 md:py-20">
          {children}
        </main>
      </div>
    </div>
  )
}
