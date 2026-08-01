"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import posthog from "posthog-js"

interface CopyButtonProps {
  code: string
  className?: string
  absolute?: boolean
  eventName?: "content_copied" | "component_install_command_copied"
}

export function CopyButton({
  code,
  className,
  absolute = true,
  eventName = "content_copied",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    posthog.capture(eventName)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className={`${absolute ? "absolute top-3 right-3" : ""} p-2 rounded-lg transition-all duration-200 z-10 ${copied
        ? "bg-transparent text-green-600 dark:text-green-400"
        : "bg-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50"
        } ${className || ""}`}
      aria-label={copied ? "Copied" : "Copy code"}
    >
      {copied ? (
        <Check className="w-4 h-4" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
  )
}
