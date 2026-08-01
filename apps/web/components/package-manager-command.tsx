"use client"

import * as React from "react"
import { Terminal } from "lucide-react"
import { DocsCodePanel } from "@/components/docs-code-panel"
import { useSmoothCodeHeight } from "@/hooks/use-smooth-code-height"

export const PACKAGE_MANAGERS = ["bun", "npm", "pnpm", "yarn"] as const
export type PackageManager = (typeof PACKAGE_MANAGERS)[number]

export const INSTALL_COMMANDS: Record<PackageManager, string> = {
  pnpm: "pnpm dlx shadcn@latest add",
  npm: "npx shadcn@latest add",
  yarn: "yarn dlx shadcn@latest add",
  bun: "bunx --bun shadcn@latest add",
}

interface PackageManagerCommandProps {
  getCommand: (pm: PackageManager) => string
  defaultPm?: PackageManager
}

function HighlightedCommand({ command }: { command: string }) {
  const [commandName, ...rest] = command.split(" ")

  return (
    <code className="text-sm">
      <span className="text-violet-500 dark:text-violet-400">{commandName}</span>
      {rest.length > 0 ? (
        <span className="text-sky-600 dark:text-sky-300"> {rest.join(" ")}</span>
      ) : null}
    </code>
  )
}

export function PackageManagerCommand({
  getCommand,
  defaultPm = "pnpm",
}: PackageManagerCommandProps) {
  const [selected, setSelected] = React.useState<PackageManager>(defaultPm)
  const command = getCommand(selected)
  const { contentRef, wrapperProps } = useSmoothCodeHeight([command, selected])

  const tabs = PACKAGE_MANAGERS.map((pm) => ({ id: pm, label: pm }))

  return (
    <DocsCodePanel
      icon={Terminal}
      copyCode={command}
      copyEventName="component_install_command_copied"
      tabs={tabs}
      activeTab={selected}
      onTabChange={(id) => setSelected(id as PackageManager)}
      tabListAriaLabel="Package manager"
    >
      <div {...wrapperProps}>
        <div ref={contentRef}>
          <pre className="max-h-96 overflow-x-auto overflow-y-auto whitespace-pre rounded-lg bg-white p-4 font-mono text-sm leading-5 no-scrollbar dark:!bg-[#121212]">
            <HighlightedCommand command={command} />
          </pre>
        </div>
      </div>
    </DocsCodePanel>
  )
}
