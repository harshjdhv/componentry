import React from "react"
import Link from "next/link"
import { ComponentryLogomark } from "@/components/logos/componentry-logomark"

const links = {
  product: [
    { label: "Components", href: "/docs" },
    { label: "MCP Server", href: "/docs/mcp" },
    { label: "Quick Start", href: "/docs" },
  ],
  resources: [
    { label: "Documentation", href: "/docs" },
    { label: "GitHub", href: "https://github.com/harshjdhv/componentry", external: true },
    { label: "Sponsors", href: "/sponsors" },
  ],
  connect: [
    { label: "Twitter / X", href: "https://x.com/harshjdhv", external: true },
    { label: "GitHub", href: "https://github.com/harshjdhv", external: true },
  ],
}

export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-[#111]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main footer content */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <ComponentryLogomark className="size-5 text-zinc-900 dark:text-white" />
              <span className="text-sm font-bold tracking-wide text-zinc-900 dark:text-white">
                COMPONENTRY
              </span>
            </Link>
            <p className="text-sm text-zinc-500 dark:text-zinc-500 leading-relaxed max-w-[200px]">
              Beautiful animated React components. Copy, paste, ship.
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50 dark:bg-zinc-900 px-2.5 py-1 text-[11px] font-medium text-zinc-500 dark:text-zinc-500">
                MIT License
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50 dark:bg-zinc-900 px-2.5 py-1 text-[11px] font-medium text-zinc-500 dark:text-zinc-500">
                Open Source
              </span>
            </div>
          </div>

          {/* Product */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-zinc-400 dark:text-zinc-600">
              Product
            </p>
            <ul className="flex flex-col gap-2.5">
              {links.product.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-zinc-400 dark:text-zinc-600">
              Resources
            </p>
            <ul className="flex flex-col gap-2.5">
              {links.resources.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-zinc-400 dark:text-zinc-600">
              Connect
            </p>
            <ul className="flex flex-col gap-2.5">
              {links.connect.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-zinc-200/60 dark:border-zinc-800/60 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-400 dark:text-zinc-600">
            © {new Date().getFullYear()} Componentry. Built by{" "}
            <Link
              href="https://x.com/harshjdhv"
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
            >
              Harsh Jadhav
            </Link>
            .
          </p>
          <p className="text-xs text-zinc-400 dark:text-zinc-600">
            Powered by Next.js · Tailwind CSS · Framer Motion
          </p>
        </div>

      </div>
    </footer>
  )
}
