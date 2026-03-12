"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

import { CopyButton } from "@/components/copy-button"

const PACKAGE_MANAGERS = ["npm", "pnpm", "yarn", "bun"] as const
type PackageManager = (typeof PACKAGE_MANAGERS)[number]

const COMMANDS: Record<PackageManager, string> = {
  pnpm: "pnpm dlx shadcn@latest add",
  npm: "npx shadcn@latest add",
  yarn: "yarn dlx shadcn@latest add",
  bun: "bunx --bun shadcn@latest add",
}

interface InstallCommandProps {
  component: string
}


export function InstallCommand({ component }: InstallCommandProps) {
  const [selected, setSelected] = React.useState<PackageManager>("pnpm")

  const registryNamespace = process.env.NEXT_PUBLIC_REGISTRY_NAMESPACE || "@componentry"
  const componentRef = component.startsWith("@")
    ? component
    : `${registryNamespace}/${component}`
  const command = `${COMMANDS[selected]} ${componentRef}`

  return (
    <div className="w-full max-w-full">
      <div className="relative rounded-xl border border-zinc-200 dark:border-border/60 bg-zinc-50 dark:bg-[#191919] font-mono text-sm leading-relaxed text-foreground shadow-sm">

        {/* Tab Header */}
        <div className="flex items-center px-4 py-3 border-b border-zinc-200 dark:border-zinc-800/80">
          <div className="mr-4 text-muted-foreground/70">
            {/* Minimal Square Terminal Icon matching screenshot */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="4" ry="4" strokeWidth="1.5"></rect>
              <path d="m3 21 18-18" strokeWidth="1.5"></path>
            </svg>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {PACKAGE_MANAGERS.map((pm) => (
              <button
                key={pm}
                onClick={() => setSelected(pm)}
                className={cn(
                  "px-3 py-1 text-sm font-medium rounded-md transition-all outline-none",
                  selected === pm
                    ? "bg-zinc-200 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-50"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {pm}
              </button>
            ))}
          </div>

          <div className="ml-auto" />
          <div className="pl-4">
            <CopyButton code={command} />
          </div>
        </div>

        {/* Command Content */}
        <div className="p-4 overflow-x-auto">
          <span className="text-zinc-800 dark:text-zinc-300 whitespace-nowrap px-1">
            {command}
          </span>
        </div>
      </div>
    </div>
  )
}
