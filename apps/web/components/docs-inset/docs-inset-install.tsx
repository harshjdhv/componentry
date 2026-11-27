"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"
import { PackageManagerCommand } from "@/components/package-manager-command"
import type { PackageManager } from "@/lib/install-command"
import { Tabs, TabsList, TabsPanel, TabsTab } from "@workspace/ui/components/tabs"

const ADD_COMMANDS: Record<PackageManager, string> = {
  pnpm: "pnpm add",
  npm: "npm install",
  yarn: "yarn add",
  bun: "bun add",
}

/** Collapsed source height: a screenful of code, then "Expand". */
const SOURCE_PEEK = 360

interface DocsInsetInstallProps {
  /** Server-rendered registry command (the existing package-manager tabs). */
  cli: React.ReactNode
  /** Space-separated npm packages, e.g. "framer-motion clsx". */
  dependencies?: string
  sourceCode?: string
  /** Pre-highlighted source (Shiki HTML). */
  sourceHtml?: string
  sourceFilename?: string
}

function Step({ n, title, children }: { n: number; title: string; children?: React.ReactNode }) {
  return (
    <li className="relative pl-9">
      <span className="absolute top-0 left-0 flex size-6 items-center justify-center rounded-full bg-black/[0.05] text-[12px] font-medium tabular-nums text-zinc-600 dark:bg-white/[0.07] dark:text-zinc-300">
        {n}
      </span>
      <p className="pt-0.5 text-[14.5px] font-medium tracking-[-0.01em] text-zinc-900 dark:text-zinc-100">
        {title}
      </p>
      {children && <div className="mt-3">{children}</div>}
    </li>
  )
}

/** Full component source, collapsed to a peek with an animated Expand. */
function SourceBlock({ code, html, filename }: { code: string; html: string; filename?: string }) {
  const [open, setOpen] = React.useState(false)
  const innerRef = React.useRef<HTMLDivElement>(null)
  const [height, setHeight] = React.useState<number | null>(null)

  React.useEffect(() => {
    const el = innerRef.current
    if (!el) return
    const observer = new ResizeObserver(() => setHeight(el.offsetHeight))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const collapsible = height === null || height > SOURCE_PEEK + 40

  return (
    <div className="overflow-hidden rounded-xl bg-zinc-100/70 dark:bg-white/[0.035]">
      <div className="flex h-10 items-center justify-between border-b border-black/[0.05] pr-2 pl-4 dark:border-white/[0.05]">
        <span className="font-mono text-[12px] text-zinc-500 dark:text-zinc-400">{filename}</span>
        <CopyButton code={code} absolute={false} />
      </div>

      <div className="relative">
        <div
          style={{ height: !collapsible || open ? (height ?? undefined) : SOURCE_PEEK }}
          className="overflow-hidden transition-[height] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none"
        >
          <div
            ref={innerRef}
            data-code-block
            className="text-sm [&_.shiki]:!bg-transparent [&_pre]:overflow-x-auto [&_pre]:p-4"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>

        {collapsible && (
          <div
            className={cn(
              "flex justify-center transition-[padding] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
              open
                ? "border-t border-black/[0.05] py-2 dark:border-white/[0.05]"
                : "absolute inset-x-0 bottom-0 bg-gradient-to-b from-transparent via-[#f4f4f5]/80 to-[#f4f4f5] pt-16 pb-4 dark:via-[#161616]/80 dark:to-[#161616]"
            )}
          >
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="h-8 rounded-lg bg-white px-3 text-[13px] font-medium text-zinc-800 shadow-[0_0_0_1px_rgb(0_0_0/0.08),0_1px_2px_rgb(0_0_0/0.06)] transition-[scale] duration-150 ease-out active:scale-[0.96] dark:bg-[#1c1c1c] dark:text-zinc-100 dark:shadow-[0_0_0_1px_rgb(255_255_255/0.08)]"
            >
              {open ? "Collapse" : "Expand"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export function DocsInsetInstall({
  cli,
  dependencies,
  sourceCode,
  sourceHtml,
  sourceFilename,
}: DocsInsetInstallProps) {
  const deps = dependencies?.trim()
  const hasManual = Boolean(sourceCode && sourceHtml)

  if (!hasManual) return <>{cli}</>

  let step = 0
  return (
    <Tabs defaultValue="cli" className="gap-5">
      <TabsList
        variant="underline"
        aria-label="Installation method"
        className="justify-start gap-x-5 data-[orientation=horizontal]:py-0 *:data-[slot=tab-indicator]:rounded-full *:data-[slot=tabs-tab]:hover:bg-transparent"
      >
        {(["cli", "manual"] as const).map((value) => (
          <TabsTab
            key={value}
            value={value}
            className="h-9 grow-0 rounded-none px-0 text-[14px] font-medium text-zinc-500 hover:text-zinc-800 data-active:text-zinc-950 sm:h-9 sm:text-[14px] dark:text-zinc-500 dark:hover:text-zinc-200 dark:data-active:text-zinc-50"
          >
            {value === "cli" ? "CLI" : "Manual"}
          </TabsTab>
        ))}
      </TabsList>

      <TabsPanel value="cli">{cli}</TabsPanel>

      <TabsPanel value="manual">
        <ol className="flex flex-col gap-8">
          {deps && (
            <Step n={++step} title="Install the dependencies">
              <PackageManagerCommand getCommand={(pm) => `${ADD_COMMANDS[pm]} ${deps}`} />
            </Step>
          )}
          <Step n={++step} title="Copy and paste the following code into your project">
            <SourceBlock code={sourceCode!} html={sourceHtml!} filename={sourceFilename} />
          </Step>
          <Step n={++step} title="Update the import paths to match your project setup" />
        </ol>
      </TabsPanel>
    </Tabs>
  )
}
