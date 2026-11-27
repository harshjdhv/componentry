import Link from "next/link"

import { cn } from "@/lib/utils"
import { PACKAGE_MANAGERS, registryNamespace, registryUrl, type PackageManager } from "@/lib/install-command"
import { DocsInsetShell } from "@/components/docs-inset/docs-inset-shell"
import { docsLine, docsPanel, docsShell } from "@/components/docs-inset/surface"
import { Section } from "@/components/component-layout"
import { CopyButton } from "@/components/copy-button"
import { PackageManagerCommand, type HighlightedPmCommand } from "@/components/package-manager-command"

const MCP_INIT_COMMANDS: Record<PackageManager, string> = {
  pnpm: "pnpm dlx shadcn@latest mcp init",
  npm: "npx shadcn@latest mcp init",
  yarn: "yarn dlx shadcn@latest mcp init",
  bun: "bunx --bun shadcn@latest mcp init",
}

// Plain data, since this server page can't hand a getCommand function to the client
// component. Only `code` is rendered.
const MCP_INIT = Object.fromEntries(
  PACKAGE_MANAGERS.map((pm) => [pm, { code: MCP_INIT_COMMANDS[pm], html: "" }])
) as Record<PackageManager, HighlightedPmCommand>

const REGISTRY_CONFIG = JSON.stringify({ registries: { [registryNamespace]: registryUrl } }, null, 2)

const PROMPTS = [
  "Add the magnetic dock component",
  "Add the kinetic text reveal animation to the hero",
  "Use the sticky scroll cards for the features section",
]

// Same type styles as the introduction page.
const prose = "text-pretty text-[15.5px] leading-7 text-zinc-600 dark:text-zinc-400"
const code =
  "rounded bg-black/[0.05] px-1.5 py-0.5 font-mono text-[13.5px] text-zinc-900 dark:bg-white/[0.07] dark:text-zinc-100"
const link =
  "font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-[3px] transition-colors hover:decoration-zinc-900 dark:text-zinc-100 dark:decoration-zinc-600 dark:hover:decoration-zinc-100"

/** File snippet in the two-layer docs surface: filename + copy in the shell, code in the panel. */
function FileBlock({ filename, code: source }: { filename: string; code: string }) {
  return (
    <div className={docsShell}>
      <div className="mb-1 flex h-9 items-center justify-between pr-0.5 pl-3">
        <span className="font-mono text-[12.5px] text-zinc-500 dark:text-zinc-400">{filename}</span>
        <CopyButton
          code={source}
          absolute={false}
          className="size-8 rounded-md hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
        />
      </div>
      <div className={cn(docsPanel, "px-4 py-3.5")}>
        <pre className="no-scrollbar m-0 overflow-x-auto font-mono text-[13px] leading-5 whitespace-pre text-zinc-800 sm:text-sm dark:text-zinc-200">
          <code>{source}</code>
        </pre>
      </div>
    </div>
  )
}

export default function McpDocsPage() {
  return (
    <DocsInsetShell>
      <article className="max-w-[680px]">
        <header className="mb-12">
          <h1 className="text-[32px] font-medium leading-[1.1] tracking-[-0.03em] text-zinc-900 sm:text-[38px] dark:text-zinc-50">
            MCP
          </h1>
          <p className="mt-3 text-pretty text-[17px] leading-8 text-zinc-500 dark:text-zinc-400">
            Let your editor’s AI assistant find and add Componentry components for you.
          </p>
        </header>

        <div className="space-y-14">
          <Section title="Set up MCP">
            <p className={prose}>
              The shadcn MCP server gives assistants like Claude Code, Cursor and VS Code access to
              component registries. Run this in your project to configure it for your editor:
            </p>
            <PackageManagerCommand commands={MCP_INIT} />
          </Section>

          <Section title="Add the registry">
            <p className={prose}>
              Point the <code className={code}>{registryNamespace}</code> namespace at the Componentry
              registry in your project’s <code className={code}>components.json</code>:
            </p>
            <FileBlock filename="components.json" code={REGISTRY_CONFIG} />
            <p className={prose}>
              No <code className={code}>components.json</code> yet? Run{" "}
              <code className={code}>npx shadcn@latest init</code> first, as in the{" "}
              <Link href="/docs/introduction" className={link}>
                introduction
              </Link>
              .
            </p>
          </Section>

          <Section title="Usage">
            <p className={prose}>
              Ask for a component by name, or describe where it should go. A few to try:
            </p>
            <div className={docsShell}>
              <div className="px-3 pt-1.5 pb-2 text-[12.5px] font-medium text-zinc-500 dark:text-zinc-400">
                Try asking
              </div>
              <ul className={docsPanel}>
                {PROMPTS.map((prompt) => (
                  <li
                    key={prompt}
                    className={cn("border-b px-4 py-3 text-[14.5px] text-zinc-800 last:border-b-0 dark:text-zinc-200", docsLine)}
                  >
                    “{prompt}”
                  </li>
                ))}
              </ul>
            </div>
            <p className={prose}>
              Browse{" "}
              <Link href="/docs/components" className={link}>
                all components
              </Link>{" "}
              to find names; each page has the install command your assistant will run.
            </p>
          </Section>
        </div>
      </article>
    </DocsInsetShell>
  )
}
