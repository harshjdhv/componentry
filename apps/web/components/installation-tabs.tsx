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
        <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-border/50">
                <button
                    onClick={() => setMethod("cli")}
                    className={cn(
                        "px-4 py-2 text-sm font-medium border-b-2 transition-all duration-200",
                        method === "cli"
                            ? "border-foreground text-foreground"
                            : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                >
                    CLI
                </button>
                <button
                    onClick={() => setMethod("manual")}
                    className={cn(
                        "px-4 py-2 text-sm font-medium border-b-2 transition-all duration-200",
                        method === "manual"
                            ? "border-foreground text-foreground"
                            : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
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
