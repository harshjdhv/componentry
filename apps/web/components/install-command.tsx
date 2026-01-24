"use client"

import * as React from "react"

const PACKAGE_MANAGERS = ["npm", "pnpm", "yarn", "bun"] as const
type PackageManager = (typeof PACKAGE_MANAGERS)[number]

const COMMANDS: Record<PackageManager, string> = {
  pnpm: "pnpm dlx shadcn@latest add",
  npm: "npx shadcn@latest add",
  yarn: "yarn dlx shadcn@latest add",
  bun: "bunx shadcn@latest add",
}

// Colored brand icons for each package manager
const PM_ICONS: Record<PackageManager, React.ReactNode> = {
  npm: (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5">
      <path fill="#CB3837" d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331zM10.665 10H12v2.667h-1.335V10z" />
    </svg>
  ),
  pnpm: (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5">
      <path fill="#F69220" d="M0 0v7.5h7.5V0zm8.25 0v7.5h7.498V0zm8.25 0v7.5H24V0zM8.25 8.25v7.5h7.498v-7.5zm8.25 0v7.5H24v-7.5zM0 16.5V24h7.5v-7.5zm8.25 0V24h7.498v-7.5zm8.25 0V24H24v-7.5z" />
    </svg>
  ),
  yarn: (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5">
      <path fill="#2C8EBB" d="M12 0C5.375 0 0 5.375 0 12s5.375 12 12 12 12-5.375 12-12S18.625 0 12 0zm.768 4.105c.183 0 .363.053.525.157.125.083.287.185.755 1.154.31-.088.468-.042.551-.019.204.056.366.19.463.375.477.917.542 2.553.334 3.605-.241 1.232-.755 2.029-1.131 2.576.324.329.778.899 1.117 1.825.278.774.31 1.478.273 2.015a5.51 5.51 0 0 0 .602-.329c.593-.366 1.487-.917 2.553-.931.714-.009 1.269.445 1.353 1.103a1.23 1.23 0 0 1-.945 1.362c-.649.158-.95.278-1.821.843-1.232.797-2.539 1.242-3.012 1.39a1.686 1.686 0 0 1-.704.343c-.737.181-3.266.315-3.466.315h-.046c-.783 0-1.214-.241-1.45-.491-.658.329-1.51.19-2.122-.134a1.078 1.078 0 0 1-.58-1.153 1.243 1.243 0 0 1-.153-.195c-.162-.25-.528-.936-.454-1.946.056-.723.556-1.367.88-1.71a5.522 5.522 0 0 1 .408-2.256c.306-.727.885-1.348 1.32-1.737-.32-.537-.644-1.367-.329-2.21.227-.602.412-.936.82-1.08h-.005c.199-.074.389-.153.486-.259a3.418 3.418 0 0 1 2.298-1.103c.037-.093.079-.185.125-.283.31-.658.639-1.029 1.024-1.168a.94.94 0 0 1 .328-.06z" />
    </svg>
  ),
  bun: (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5">
      <path fill="#FBF0DF" d="M12 22.596c-5.804 0-10.5-3.757-10.5-8.404 0-4.144 3.885-8.05 7.428-8.05a4.396 4.396 0 0 0-.164 1.212c0 2.388 1.853 4.348 4.136 4.348 1.178 0 2.24-.525 2.988-1.366a7.174 7.174 0 0 1 2.112-.32c3.543 0 7.428 3.906 7.428 8.05 0 4.647-4.696 8.404-10.5 8.404zm-2.676-6.56c-.606 0-1.096.552-1.096 1.232 0 .68.49 1.232 1.096 1.232.606 0 1.096-.552 1.096-1.232 0-.68-.49-1.232-1.096-1.232zm5.352 0c-.606 0-1.096.552-1.096 1.232 0 .68.49 1.232 1.096 1.232.606 0 1.096-.552 1.096-1.232 0-.68-.49-1.232-1.096-1.232z" />
      <path fill="#FFAC33" d="M12 22.596c-5.804 0-10.5-3.757-10.5-8.404 0-4.144 3.885-8.05 7.428-8.05a4.396 4.396 0 0 0-.164 1.212c0 2.388 1.853 4.348 4.136 4.348 1.178 0 2.24-.525 2.988-1.366a7.174 7.174 0 0 1 2.112-.32c3.543 0 7.428 3.906 7.428 8.05 0 4.647-4.696 8.404-10.5 8.404z" />
      <ellipse cx="9.324" cy="17.268" rx="1.096" ry="1.232" fill="#000" />
      <ellipse cx="14.676" cy="17.268" rx="1.096" ry="1.232" fill="#000" />
    </svg>
  ),
}

interface InstallCommandProps {
  component: string
}

export function InstallCommand({ component }: InstallCommandProps) {
  const [selected, setSelected] = React.useState<PackageManager>("npm")

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
    <div className="space-y-0 rounded-xl overflow-hidden border border-border bg-muted/30 dark:bg-zinc-900/50">
      {/* Package manager tabs with colored icons */}
      <div className="flex items-center gap-1 px-4 py-3 border-b border-border/50 bg-muted/50 dark:bg-zinc-900/80">
        {PACKAGE_MANAGERS.map((pm) => (
          <button
            key={pm}
            onClick={() => setSelected(pm)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-md transition-all duration-200 ${selected === pm
              ? "bg-background dark:bg-zinc-800 text-foreground shadow-sm ring-1 ring-border dark:ring-zinc-700"
              : "text-muted-foreground hover:text-foreground hover:bg-accent/50 dark:hover:bg-zinc-800/50"
              }`}
          >
            {PM_ICONS[pm]}
            {pm}
          </button>
        ))}
      </div>

      {/* Command display */}
      <div className="relative group bg-zinc-100 dark:bg-zinc-950">
        <pre className="px-4 py-4 text-sm font-mono overflow-x-auto whitespace-nowrap selection:bg-emerald-500/30">
          <span className="text-zinc-500 dark:text-zinc-500">{selected === "npm" ? "npx" : selected === "pnpm" ? "pnpm dlx" : selected === "yarn" ? "yarn dlx" : "bunx"}</span>
          <span className="text-zinc-700 dark:text-zinc-300"> shadcn@latest add</span>
          <span className="text-cyan-600 dark:text-cyan-400">{` "${componentUrl}"`}</span>
        </pre>
        <button
          onClick={copyToClipboard}
          className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all duration-200 ${hasCopied
            ? "bg-emerald-500/20 text-emerald-500 dark:text-emerald-400"
            : "bg-zinc-200/80 dark:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-300/80 dark:hover:bg-zinc-700/80 opacity-0 group-hover:opacity-100"
            }`}
          aria-label="Copy command"
        >
          {hasCopied ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
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
              width="16"
              height="16"
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
