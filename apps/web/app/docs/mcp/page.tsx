"use client"

import { registryNamespace, registryUrl } from "@/lib/install-command"
import { SiteHeader } from "@/components/site-header"
import { DocsScrollEdgeFade } from "@/components/docs-scroll-edge-fade"
import { LandingGuideLines } from "@/components/landing/landing-frame"
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
      <LandingGuideLines />
      <DocsScrollEdgeFade position="bottom" />

      <SiteHeader />

      <main className="max-w-3xl mx-auto pt-32 pb-32 px-6 sm:px-8 relative z-10">
        {/* ── Hero (match /docs) ── */}
        <div className="mb-12">
          <h1 className="inline-block text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-zinc-900 dark:text-white sm:text-4xl">
            MCP
          </h1>
          <p className="mt-3 max-w-2xl text-sm font-medium tracking-tight text-zinc-400 sm:text-base dark:text-zinc-600">
            Integrating MCP with Componentry lets you control it via AI.
          </p>
        </div>

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
      </main>
    </div>
  )
}

function McpInitTabs() {
  return (
    <PackageManagerCommand getCommand={(pm) => MCP_INIT_COMMANDS[pm]} />
  )
}
