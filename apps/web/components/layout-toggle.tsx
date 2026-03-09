"use client"

import * as React from "react"
import { AppWindow, LayoutPanelLeft } from "lucide-react"
import { useDocStore } from "@/hooks/use-doc-store"
import { cn } from "@/lib/utils"

export function LayoutToggle() {
    const { layout, setLayout } = useDocStore()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="flex items-center gap-1 rounded-full border border-border/50 bg-background/50 p-1 backdrop-blur-sm opacity-0">
                <div className="h-7 w-7 rounded-full" />
                <div className="h-7 w-7 rounded-full" />
            </div>
        )
    }

    return (
        <div className="flex h-9 items-center gap-1 auto-rows-min rounded-full border border-border/50 bg-background/50 p-1 backdrop-blur-sm">
            <button
                onClick={() => setLayout("classic")}
                className={cn(
                    "flex items-center justify-center rounded-full p-1.5 transition-all duration-300",
                    layout === "classic"
                        ? "bg-foreground text-background shadow-sm"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                title="Classic Layout"
            >
                <AppWindow className="h-4 w-4" />
            </button>
            <button
                onClick={() => setLayout("split")}
                className={cn(
                    "flex items-center justify-center rounded-full p-1.5 transition-all duration-300",
                    layout === "split"
                        ? "bg-foreground text-background shadow-sm"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                title="Split Layout"
            >
                <LayoutPanelLeft className="h-4 w-4" />
            </button>
        </div>
    )
}
