"use client"

import { useState } from "react"
import { RotateCcw } from "lucide-react"
import { TextAnimate } from "@workspace/ui/components/text-animate"
import type { ComponentProps } from "react"

export function TextAnimateDemo({ children, ...props }: ComponentProps<typeof TextAnimate>) {
    const [key, setKey] = useState(0)

    return (
        <div className="relative flex h-[150px] w-full items-center justify-center overflow-hidden rounded-t-xl rounded-b-none border border-border bg-background shadow-sm">
            <button
                onClick={() => setKey((prev) => prev + 1)}
                className="absolute top-3 right-3 z-10 p-2 bg-muted/50 hover:bg-muted backdrop-blur-md border border-border rounded-md text-foreground transition-all cursor-pointer"
                aria-label="Reload animation"
            >
                <RotateCcw className="w-4 h-4" />
            </button>
            <TextAnimate key={key} {...props}>
                {children}
            </TextAnimate>
        </div>
    )
}
