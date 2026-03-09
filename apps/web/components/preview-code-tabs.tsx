"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface PreviewCodeTabsProps {
    previewContent: React.ReactNode
    codeContent: React.ReactNode
}

export function PreviewCodeTabs({ previewContent, codeContent }: PreviewCodeTabsProps) {
    const [mode, setMode] = React.useState<"preview" | "code">("preview")

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-1">
                <button
                    onClick={() => setMode("preview")}
                    className={cn(
                        "px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200",
                        mode === "preview"
                            ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                >
                    Preview
                </button>
                <button
                    onClick={() => setMode("code")}
                    className={cn(
                        "px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200",
                        mode === "code"
                            ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                >
                    Code
                </button>
            </div>

            <div className="relative grid min-w-0 w-full animate-in fade-in slide-in-from-top-1 duration-200">
                <div
                    className={cn(
                        "col-start-1 row-start-1 flex flex-col w-full min-w-0 transition-opacity duration-200",
                        mode === "preview"
                            ? "opacity-100 z-10"
                            : "opacity-0 z-0 pointer-events-none"
                    )}
                >
                    {previewContent}
                </div>
                <div
                    className={cn(
                        "col-start-1 row-start-1 flex flex-col w-full min-w-0 transition-opacity duration-200",
                        mode === "code"
                            ? "opacity-100 z-10"
                            : "opacity-0 z-0 pointer-events-none"
                    )}
                >
                    {codeContent}
                </div>
            </div>
        </div>
    )
}
