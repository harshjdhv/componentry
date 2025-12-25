"use client"

import * as React from "react"

const PACKAGE_MANAGERS = ["pnpm", "npm", "yarn", "bun"] as const
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
  const [selected, setSelected] = React.useState<PackageManager>("pnpm")

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  const componentUrl = `${baseUrl}/r/${component}.json`
  const command = `${COMMANDS[selected]} "${componentUrl}"`

  const [hasCopied, setHasCopied] = React.useState(false)

  const copyToClipboard = React.useCallback(() => {
    navigator.clipboard.writeText(command)
    setHasCopied(true)
    setTimeout(() => setHasCopied(false), 2000)
  }, [command])

  return (
    <div className="space-y-3">
      <div className="flex gap-1 p-1 bg-muted/50 rounded-md w-fit">
        {PACKAGE_MANAGERS.map((pm) => (
          <button
            key={pm}
            onClick={() => setSelected(pm)}
            className={`px-3 py-1.5 text-xs font-mono rounded transition-colors ${
              selected === pm
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {pm}
          </button>
        ))}
      </div>
      <div className="relative group">
        <pre className="p-3 bg-muted/30 text-sm font-mono rounded-md overflow-x-auto whitespace-nowrap pr-12">
          {command}
        </pre>
        <button
          onClick={copyToClipboard}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md hover:bg-background/80 transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Copy command"
        >
          {hasCopied ? (
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
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
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
            >
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
