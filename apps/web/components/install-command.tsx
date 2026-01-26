"use client"

import * as React from "react"

import { CopyButton } from "@/components/copy-button"

const PACKAGE_MANAGERS = ["npm", "pnpm", "yarn", "bun"] as const
type PackageManager = (typeof PACKAGE_MANAGERS)[number]

const COMMANDS: Record<PackageManager, string> = {
  pnpm: "pnpm dlx shadcn@latest add",
  npm: "npx shadcn@latest add",
  yarn: "yarn dlx shadcn@latest add",
  bun: "bunx shadcn@latest add",
}


interface InstallCommandProps {
  component: string
}

export function InstallCommand({ component }: InstallCommandProps) {
  const [selected, setSelected] = React.useState<PackageManager>("npm")

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  const componentUrl = `${baseUrl}/r/${component}.json`
  const command = `${COMMANDS[selected]} "${componentUrl}"`

  return (
    <div className="relative rounded-xl overflow-hidden border border-border bg-zinc-100 dark:bg-zinc-950">
      <div className="flex items-center border-b border-border/10 bg-white/50 dark:bg-zinc-900/50 p-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border/10 bg-white dark:bg-zinc-800/50 shadow-sm dark:shadow-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground"
            >
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" x2="20" y1="19" y2="19" />
            </svg>
          </div>
          <div className="flex items-center gap-1 rounded-md bg-zinc-200/50 dark:bg-zinc-950 p-1 ring-1 ring-border/10">
            {PACKAGE_MANAGERS.map((pm) => (
              <button
                key={pm}
                onClick={() => setSelected(pm)}
                className={`rounded px-2 py-1 text-xs font-medium transition-all ${selected === pm
                  ? "bg-white dark:bg-zinc-800 text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {pm}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative">
        <pre className="overflow-x-auto p-4 text-sm font-mono leading-relaxed text-zinc-100">
          <span className="text-zinc-400 dark:text-zinc-500 mr-2">$</span>
          <span className="text-purple-600 dark:text-purple-400">{selected === "npm" ? "npx" : selected === "pnpm" ? "pnpm dlx" : selected === "yarn" ? "yarn dlx" : "bunx"}</span>
          <span className="text-zinc-600 dark:text-zinc-400"> shadcn@latest add</span>
          {" "}
          <span className="text-green-600 dark:text-green-400">{`"${componentUrl}"`}</span>
        </pre>
        <CopyButton code={command} />
      </div>
    </div>
  )
}
