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
                "preview flex min-h-[350px] w-full justify-center p-10 items-center rounded-t-xl border-b border-border bg-muted/30 overflow-x-auto",
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
