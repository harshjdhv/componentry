import type React from "react"
import Link from "next/link"
import { docsConfig } from "@/config/docs"

export default function DocsIntroPage(): React.JSX.Element {
  return (
    <div className="space-y-16">
      <header className="space-y-6">
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Introduction
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
          Copy-paste ready React components built with Tailwind CSS and Framer
          Motion. No npm installs, no bloated dependencies just grab the code
          and ship.
        </p>
      </header>

      <div className="space-y-12">
        {docsConfig.nav.slice(1).map((category) => (
          <div key={category.title} id={category.title.toLowerCase().replace(/\s+/g, "-")} data-section-title={category.title} className="scroll-mt-20">
            <h2 className="text-2xl font-semibold tracking-tight mb-6">
              {category.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {category.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
                >
                  <span className="font-medium">{item.title}</span>
                  <svg
                    className="h-4 w-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
