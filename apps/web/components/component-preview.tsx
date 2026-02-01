"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
    align?: "center" | "start" | "end"
}

export function ComponentPreview({
    children,
    className,
    align = "center",
    ...props
}: ComponentPreviewProps) {
    return (
        <div
            className={cn(
                "preview flex min-h-[350px] w-full justify-center p-10 items-center rounded-t-xl border border-border bg-muted/30 dark:bg-[#0A0A0A] overflow-x-auto relative",
                {
                    "items-center": align === "center",
                    "items-start": align === "start",
                    "items-end": align === "end",
                },
                className
            )}
            {...props}
        >
            <div className="min-w-fit">
                {children}
            </div>
        </div>
    )
}
