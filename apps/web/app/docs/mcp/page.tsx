"use client"

import { registryNamespace, registryUrl } from "@/lib/install-command"
import { landingGutterClass } from "@/components/landing/landing-frame"
import { SiteHeader } from "@/components/site-header"
import { DocsScrollEdgeFade } from "@/components/docs-scroll-edge-fade"
import { CodeInline, Section } from "@/components/component-layout"
import { CopyButton } from "@/components/copy-button"
import {
  PackageManagerCommand,
  type PackageManager,
} from "@/components/package-manager-command"

const MCP_INIT_COMMANDS: Record<PackageManager, string> = {
  pnpm: "pnpm dlx shadcn@latest mcp init",
  npm: "npx shadcn@latest mcp init",
  yarn: "yarn dlx shadcn@latest mcp init",
  bun: "bunx --bun shadcn@latest mcp init",
}

function slugifyForMd(title: string) {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div className="relative rounded-xl border border-border overflow-hidden bg-zinc-100 dark:bg-zinc-900/50 font-mono text-sm leading-relaxed text-foreground">
      <pre className="overflow-x-auto p-4 pr-12 whitespace-pre">
        <code className="text-zinc-950 dark:text-zinc-100">{code}</code>
      </pre>
      <CopyButton code={code.trim()} />
    </div>
  )
}


export default function McpDocsPage() {

  return (
    <div className="min-h-screen bg-white dark:bg-background text-zinc-900 dark:text-zinc-100 font-sans overflow-x-hidden">
      <DocsScrollEdgeFade position="bottom" />

      <SiteHeader />

      <main className={`${landingGutterClass} relative z-10 pt-28 pb-32`}>
        <div className="mx-auto w-full max-w-3xl">
        {/* ── Hero (match /docs) ── */}
        <header className="mb-12 max-w-2xl space-y-2.5">
          <h1 className="text-[28px] font-medium leading-[1.1] tracking-[-0.035em] text-zinc-900 sm:text-[32px] dark:text-zinc-50">
            MCP
          </h1>
          <p className="max-w-xl text-pretty text-[15px] font-normal leading-6 tracking-[-0.01em] text-zinc-500 sm:text-[16px] sm:leading-7 dark:text-zinc-400">
            Integrating MCP with Componentry lets you control it via AI.
          </p>
        </header>

        <div className="space-y-16">
          <Section title="Installation" id="installation" className="pt-2">
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Enable MCP in your project environment. (Supports Claude Code, Cursor, etc.)
            </p>
            <McpInitTabs />
          </Section>

          <Section title="Add the registry to your project" id={slugifyForMd("Add the registry to your project")} className="pt-2">
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Add the following to your <CodeInline>components.json</CodeInline> file.
            </p>
            <CodeBlock
              code={JSON.stringify(
                {
                  registries: {
                    [registryNamespace]: registryUrl,
                  },
                },
                null,
                2
              )}
            />
          </Section>

          <Section title="Usage" id="usage" className="pt-2">
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
              You can now ask your IDE to use any Componentry component. Here are some examples:
            </p>
            <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
              <li className="font-mono text-[13px] sm:text-sm">"Add the magnetic dock component"</li>
              <li className="font-mono text-[13px] sm:text-sm">"Add the kinetic text reveal animation"</li>
              <li className="font-mono text-[13px] sm:text-sm">"Add the sticky scroll cards"</li>
            </ul>
          </Section>
        </div>
        </div>
      </main>
    </div>
  )
}

function McpInitTabs() {
  return (
    <PackageManagerCommand getCommand={(pm) => MCP_INIT_COMMANDS[pm]} />
  )
}
