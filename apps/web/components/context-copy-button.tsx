"use client"

import { useState } from "react"
import { Check, Clipboard } from "lucide-react"

interface ContextCopyButtonProps {
    content: string
}

export function ContextCopyButton({ content }: ContextCopyButtonProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(content)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <button
            onClick={handleCopy}
            className={`
        inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 border
        ${copied
                    ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-200 dark:border-zinc-700"
                    : "bg-white dark:bg-zinc-950 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100"
                }
      `}
        >
            {copied ? (
                <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied Context</span>
                </>
            ) : (
                <>
                    <Clipboard className="w-3.5 h-3.5" />
                    <span>Copy Page Context</span>
                </>
            )}
        </button>
    )
}
