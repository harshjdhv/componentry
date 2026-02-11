// apps/web/components/docs-page-layout.tsx
import type React from "react"
import Link from "next/link"
import { Suspense } from "react"
import { InstallCommand } from "@/components/install-command"
import { CodeBlock } from "@/components/code-block"
import { Section } from "@/components/component-layout"
import { InstallationTabs } from "@/components/installation-tabs"
import { DocsPreviewWrapper } from "@/components/docs-preview-wrapper"

export interface PropItem {
  name: string
  type: string
  default?: string
  description: string
}

export interface ExampleItem {
  title: string
  preview: React.ReactNode
  code: string
  fullWidth?: boolean
}

export interface DocsPageLayoutProps {
  title: string
  description: string
  preview: React.ReactNode
  previewCode: string
  installPackageName: string
  installDependencies?: string
  installSourceCode?: string
  installSourceFilename?: string
  usageCode: string | React.ReactNode
  examples?: ExampleItem[]
  props?: PropItem[]
  action?: React.ReactNode
  fullWidthPreview?: boolean
  unstyledPreview?: boolean
  type?: string
  dependencies?: string[]
}

function CodeBlockSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={`h-48 w-full bg-muted/20 rounded-xl border border-border animate-pulse ${className || ""}`}
    />
  )
}



export async function DocsPageLayout({
  title,
  description,
  preview,
  installPackageName,
  installSourceCode,
  installSourceFilename,
  usageCode,
  examples = [],
  props = [],
  fullWidthPreview = false,

}: DocsPageLayoutProps) {

  // Generate the page context markdown automatically


  return (
    <div
      data-docs-layout
      className="flex flex-col lg:flex-row w-full h-full min-h-screen lg:h-screen bg-[#f3f4f6] dark:bg-[#080808] text-foreground"
    >

      {/* Left Column: Scrollable Content */}
      <div
        data-docs-left-column
        className="w-full lg:basis-1/2 lg:max-w-1/2 h-full flex flex-col relative z-20 bg-[#f3f4f6] dark:bg-[#080808]"
      >
        {/* Premium Overlay & Navigation */}
        <div className="absolute top-0 left-0 right-0 z-30 h-32 bg-gradient-to-b from-[#f3f4f6] via-[#f3f4f6]/95 to-transparent dark:from-[#080808] dark:via-[#080808]/95 pointer-events-none backdrop-blur-[1px]" />
        <div className="absolute bottom-0 left-0 right-0 z-30 h-32 bg-gradient-to-t from-[#f3f4f6] via-[#f3f4f6]/95 to-transparent dark:from-[#080808] dark:via-[#080808]/95 pointer-events-none backdrop-blur-[1px]" />

        <div className="absolute top-8 left-8 lg:left-16 z-40">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-white/50 dark:bg-white/[0.03] px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground backdrop-blur-md shadow-sm">
            <Link href="/docs" className="hover:text-foreground transition-colors">Docs</Link>
            <span aria-hidden="true" className="text-border">/</span>
            <span className="text-foreground font-medium">{title}</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="px-8 lg:px-16 pt-32 lg:pt-48 pb-40 space-y-20 max-w-3xl mx-auto">

            {/* Header Section */}
            <header className="space-y-10">
              {/* Nav / Breadcrumb moved to absolute position above */}

              <div className="space-y-6">
                {/* Title */}
                <h1 className="text-4xl lg:text-6xl font-bold tracking-tighter bg-gradient-to-br from-zinc-900 via-zinc-500 to-zinc-900 dark:from-white dark:via-zinc-400 dark:to-white bg-clip-text text-transparent leading-[1.1] mb-2 pb-2">
                  {title}
                </h1>

                {/* Description */}
                <p className="text-lg text-muted-foreground/90 leading-relaxed max-w-2xl font-normal">
                  {description}
                </p>
              </div>
            </header>

            {/* Installation */}
            <Section title="Installation" className="border-t border-border/40 pt-14">
              <InstallationTabs
                cliContent={<InstallCommand component={installPackageName} />}
                manualContent={
                  <div className="space-y-6">
                    {installSourceCode && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Source code</p>
                          <span className="text-xs text-muted-foreground font-mono">{installSourceFilename || `${installPackageName}.tsx`}</span>
                        </div>
                        <Suspense fallback={<CodeBlockSkeleton />}>
                          <CodeBlock
                            code={installSourceCode}
                            lang="tsx"
                            filename={installSourceFilename || `components/ui/${installPackageName}.tsx`}
                          />
                        </Suspense>
                      </div>
                    )}
                  </div>
                }
              />
            </Section>

            {/* Usage */}
            <Section title="Usage" className="border-t border-border/40 pt-14">
              <div className="space-y-4">
                <Suspense fallback={<CodeBlockSkeleton />}>
                  {typeof usageCode === "string" ? (
                    <CodeBlock code={usageCode} lang="tsx" />
                  ) : (
                    usageCode
                  )}
                </Suspense>
              </div>
            </Section>

            {/* Props */}
            {props.length > 0 && (
              <Section title="API Reference" className="border-t border-border/40 pt-14">
                <div className="rounded-xl border border-border/60 overflow-hidden text-sm bg-white/80 dark:bg-white/[0.02]">
                  <table className="w-full">
                    <thead className="bg-secondary/30">
                      <tr>
                        <th className="h-10 px-4 text-left text-[10px] font-mono font-medium text-muted-foreground/70 uppercase tracking-widest w-1/3 border-b border-border/50">Prop</th>
                        <th className="h-10 px-4 text-left text-[10px] font-mono font-medium text-muted-foreground/70 uppercase tracking-widest w-1/3 border-b border-border/50">Type</th>
                        <th className="h-10 px-4 text-left text-[10px] font-mono font-medium text-muted-foreground/70 uppercase tracking-widest border-b border-border/50">Default</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40">
                      {props.map((prop, i) => (
                        <tr key={i} className="hover:bg-secondary/15 transition-colors">
                          <td className="p-4 align-top">
                            <div className="font-mono text-xs font-semibold text-primary">{prop.name}</div>
                            {prop.description && (
                              <p className="mt-1 text-muted-foreground text-xs leading-relaxed">{prop.description}</p>
                            )}
                          </td>
                          <td className="p-4 align-top font-mono text-xs text-muted-foreground break-all">{prop.type}</td>
                          <td className="p-4 align-top font-mono text-xs text-muted-foreground">{prop.default || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Section>
            )}

            {/* Examples */}
            {examples.length > 0 && (
              <Section title="Examples" className="border-t border-border/40 pt-14">
                <div className="space-y-20">
                  {examples.map((ex, i) => (
                    <div key={i} className="space-y-6">
                      <div className="flex items-center gap-4">
                        <span className="flex-none flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold ring-4 ring-[#f3f4f6] dark:ring-[#080808]">
                          {i + 1}
                        </span>
                        <h3 className="text-xl font-semibold tracking-tight">{ex.title}</h3>
                      </div>
                      <div className="border border-border/60 rounded-xl overflow-hidden bg-white dark:bg-[#121212]">
                        <div className="p-8 flex justify-center bg-secondary/10 min-h-[200px]">
                          {ex.preview}
                        </div>
                        <CodeBlock code={ex.code} lang="tsx" className="border-t border-border/50 rounded-t-none" />
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            <div className="h-12" />
          </div>
        </div>
      </div>

      {/* Right Column: Sticky Preview */}
      <div
        data-docs-right-column
        className="flex-1 lg:basis-1/2 lg:max-w-1/2 lg:h-full lg:sticky lg:top-0 order-first lg:order-last bg-[#f3f4f6] dark:bg-[#080808] flex flex-col z-10"
      >
        {/* We use a large padding to offset the card from the left side, mimicking the image */}
        <div
          data-docs-preview-shell
          className="relative w-full h-[400px] lg:h-full p-4 lg:p-3 overflow-hidden"
        >

          {/* Floating Card Container */}
          <DocsPreviewWrapper fullWidthPreview={fullWidthPreview}>
            {preview}
          </DocsPreviewWrapper>

        </div>
      </div>
    </div>
  )
}
