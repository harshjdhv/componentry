"use client"

import * as React from "react"
import { cn } from "@workspace/ui/lib/utils"

interface InstallationTabsProps {
    cliContent: React.ReactNode
    manualContent: React.ReactNode
}

export function InstallationTabs({ cliContent, manualContent }: InstallationTabsProps) {
    const [method, setMethod] = React.useState<"cli" | "manual">("cli")

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-1">
                <button
                    onClick={() => setMethod("cli")}
                    className={cn(
                        "px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200",
                        method === "cli"
                            ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                >
                    CLI
                </button>
                <button
                    onClick={() => setMethod("manual")}
                    className={cn(
                        "px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200",
                        method === "manual"
                            ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                >
                    Manual
                </button>
            </div>

            <div className="min-h-[100px] animate-in fade-in slide-in-from-top-1 duration-200">
                <div className={cn(method === "cli" ? "block" : "hidden")}>
                    {cliContent}
                </div>
                <div className={cn(method === "manual" ? "block" : "hidden")}>
                    {manualContent}
                </div>
            </div>
        </div>
    )
}
