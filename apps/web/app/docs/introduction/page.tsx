import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { components } from "@/registry"
import { DocsInsetShell } from "@/components/docs-inset/docs-inset-shell"
import { InstallCommand } from "@/components/install-command"
import { Section } from "@/components/component-layout"
import { absoluteUrl } from "@/lib/site"

export const metadata: Metadata = {
  title: "Introduction",
  description:
    "Get started with Componentry: free, open-source animated React components built with Tailwind CSS and Motion. Install any component with the shadcn CLI and own the source.",
  openGraph: {
    title: "Introduction | Componentry",
    description: "Animated React components you can copy and own, built with Tailwind CSS and Motion.",
    url: absoluteUrl("/docs/introduction"),
  },
  alternates: {
    canonical: absoluteUrl("/docs/introduction"),
  },
}

const prose = "text-pretty text-[15.5px] leading-7 text-zinc-600 dark:text-zinc-400"
const code =
  "rounded bg-black/[0.05] px-1.5 py-0.5 font-mono text-[13.5px] text-zinc-900 dark:bg-white/[0.07] dark:text-zinc-100"
const link =
  "font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-[3px] transition-colors hover:decoration-zinc-900 dark:text-zinc-100 dark:decoration-zinc-600 dark:hover:decoration-zinc-100"

export default function DocsIntroductionPage() {
  const count = Object.keys(components).length

  return (
    <DocsInsetShell>
      <article className="max-w-[680px]">
        <header className="mb-12">
          <h1 className="text-[32px] font-medium leading-[1.1] tracking-[-0.03em] text-zinc-900 sm:text-[38px] dark:text-zinc-50">
            Introduction
          </h1>
          <p className="mt-3 text-pretty text-[17px] leading-8 text-zinc-500 dark:text-zinc-400">
            Animated components you can copy and own – built on Tailwind and Motion.
          </p>
        </header>

        <div className="space-y-14">
          <Section title="What is Componentry?">
            <p className={prose}>
              Componentry is a collection of {count} animated React components: text effects, hero
              backgrounds, interactive cards and visual effects. Each one is written in TypeScript and
              styled with Tailwind CSS, with motion from Motion.
            </p>
            <p className={prose}>
              It isn’t a package you depend on. You add a component and its source lands in your
              project, so you can read it, change it and ship it like your own code.
            </p>
          </Section>

          <Section title="Installation">
            <p className={prose}>
              Components install with the shadcn CLI, so your project needs a{" "}
              <code className={code}>components.json</code>. If it doesn’t have one yet, run{" "}
              <code className={code}>npx shadcn@latest init</code> first. Then add any component by name:
            </p>
            <InstallCommand component="text-morph" />
            <p className={prose}>
              Every component page has its own install command, plus a Manual tab with the full source
              if you’d rather copy it in by hand.
            </p>
          </Section>

          <Section title="Use it with AI">
            <p className={prose}>
              Connect the Componentry registry to your editor’s assistant over MCP, and it can find and
              add components for you. See the{" "}
              <Link href="/docs/mcp" className={link}>
                MCP guide
              </Link>
              .
            </p>
          </Section>

          <Link
            href="/docs/components"
            className="group flex items-center justify-between gap-4 rounded-xl bg-black/[0.03] px-5 py-4 transition-colors hover:bg-black/[0.05] dark:bg-white/[0.04] dark:hover:bg-white/[0.06]"
          >
            <span>
              <span className="block text-[15px] font-medium text-zinc-900 dark:text-zinc-50">
                Browse all components
              </span>
              <span className="mt-0.5 block text-[13.5px] text-zinc-500 dark:text-zinc-400">
                {count} components across text, heroes, backgrounds and effects.
              </span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-zinc-400 transition-transform group-hover:translate-x-0.5 dark:text-zinc-500" />
          </Link>
        </div>
      </article>
    </DocsInsetShell>
  )
}
