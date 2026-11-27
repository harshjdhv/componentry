"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"
import { docsPanel, docsShell } from "@/components/docs-inset/surface"
import {
  Tabs,
  TabsList,
  TabsTab,
} from "@workspace/ui/components/tabs"

import { PACKAGE_MANAGERS, type PackageManager } from "@/lib/install-command"
export { INSTALL_COMMANDS, PACKAGE_MANAGERS, type PackageManager } from "@/lib/install-command"

export type HighlightedPmCommand = {
  code: string
  html: string
}

interface PackageManagerCommandProps {
  /** Precomputed commands (only `code` is rendered). */
  commands?: Record<PackageManager, HighlightedPmCommand>
  /** Builds the command when `commands` isn't given. */
  getCommand?: (pm: PackageManager) => string
  defaultPm?: PackageManager
}

export function PackageManagerCommand({
  commands: commandsProp,
  getCommand,
  defaultPm = "pnpm",
}: PackageManagerCommandProps) {
  const [selected, setSelected] = React.useState<PackageManager>(defaultPm)
  const code = commandsProp?.[selected]?.code ?? getCommand?.(selected) ?? ""

  return (
    <div className={docsShell}>
      <div className="mb-1 flex items-center justify-between p-0.5">
        <Tabs
          value={selected}
          onValueChange={(value) => {
            if (value) setSelected(value as PackageManager)
          }}
        >
          <TabsList aria-label="Package manager" className="bg-transparent p-0">
            {PACKAGE_MANAGERS.map((pm) => (
              <TabsTab key={pm} value={pm}>
                {pm}
              </TabsTab>
            ))}
          </TabsList>
        </Tabs>
        <CopyButton
          code={code}
          eventName="component_install_command_copied"
          absolute={false}
          className="size-8 rounded-md hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
        />
      </div>

      <div className={cn(docsPanel, "px-4 py-3.5")}>
        <pre className="no-scrollbar m-0 overflow-x-auto font-mono text-[13px] leading-5 whitespace-pre text-zinc-800 sm:text-sm dark:text-zinc-200">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}
