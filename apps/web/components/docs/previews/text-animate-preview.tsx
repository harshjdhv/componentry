"use client"

import React, { useState } from "react"
import { TextAnimate } from "@workspace/ui/components/text-animate"
import { RotateCcw } from "lucide-react"

export function TextAnimatePreview({ children, ...props }: React.ComponentProps<typeof TextAnimate>) {
    const [key, setKey] = useState(0)

    return (
        <div className="flex w-full items-center justify-center">
            <button
                onClick={() => setKey((prev) => prev + 1)}
                className="absolute top-4 right-4 z-10 p-2 text-muted-foreground hover:text-foreground transition-all cursor-pointer bg-background/50 rounded-md border border-border hover:bg-background"
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
