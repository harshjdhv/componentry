"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { docsConfig } from "@/config/docs"

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 shrink-0 border-r border-border hidden md:block">
      <div className="sticky top-14 h-[calc(100svh-3.5rem)] overflow-y-auto px-6 py-8">
        <nav className="space-y-8">
          {docsConfig.nav.map((group) => (
            <div key={group.title} className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-muted-foreground/60">
                {group.title}
              </p>
              <ul className="space-y-2">
                {group.items.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`
                          group relative flex items-center gap-2 py-1.5 pl-4 pr-3 text-sm transition-colors
                          ${isActive ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}
                        `}
                      >
                         {/* Active/Hover Line Indicator */}
                         <span
                           className={`
                             absolute left-0 top-1/2 -translate-y-1/2 h-4 w-[2px] rounded-full transition-all duration-200
                             ${isActive ? "bg-foreground opacity-100" : "bg-muted-foreground/50 opacity-0 group-hover:opacity-100"}
                           `}
                         />

                        <span className={`transition-transform duration-200 ${isActive ? "translate-x-1" : "group-hover:translate-x-1"}`}>
                          {item.title}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  )
}
