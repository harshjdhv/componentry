"use client"

import * as React from "react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"

export interface DocsCodePanelTab {
  id: string
  label: string
}

interface DocsCodePanelProps {
  icon: LucideIcon
  copyCode: string
  copyEventName?: "content_copied" | "component_install_command_copied"
  tabs?: DocsCodePanelTab[]
  activeTab?: string
  onTabChange?: (id: string) => void
  tabListAriaLabel?: string
  children: React.ReactNode
  className?: string
}

export function DocsCodePanel({
  icon: Icon,
  copyCode,
  copyEventName,
  tabs,
  activeTab,
  onTabChange,
  tabListAriaLabel = "Options",
  children,
  className,
}: DocsCodePanelProps) {
  const hasTabs = tabs && tabs.length > 0

  return (
    <div
      data-code-block
      data-line-numbers="false"
      className={cn(
        "not-prose relative flex w-full max-w-full flex-col overflow-clip rounded-lg border border-neutral-200 bg-neutral-200/40 text-sm text-neutral-950 shadow-xs dark:border-neutral-800 dark:bg-[#222222] dark:text-neutral-50",
        className
      )}
    >
      <div className="not-prose flex h-9 items-center justify-between gap-3 px-2 py-1.5 text-sm text-neutral-600 dark:text-neutral-400">
        <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto no-scrollbar">
          <Icon className="size-4 shrink-0" aria-hidden />

          {hasTabs && (
            <div
              role="tablist"
              aria-label={tabListAriaLabel}
              className="flex items-center gap-1"
            >
              {tabs.map((tab) => {
                const isSelected = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => onTabChange?.(tab.id)}
                    className={cn(
                      "shrink-0 rounded-md px-2 py-0.5 text-sm font-normal outline-none transition-colors",
                      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                      isSelected
                        ? "text-neutral-950 dark:text-neutral-50"
                        : "text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50"
                    )}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        <CopyButton
          code={copyCode}
          eventName={copyEventName}
          absolute={false}
          className="shrink-0 p-1.5"
        />
      </div>

      <div className="relative">{children}</div>
    </div>
  )
}
