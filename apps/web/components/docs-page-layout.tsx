// apps/web/components/docs-page-layout.tsx
import type React from "react"
import Link from "next/link"
import { Suspense } from "react"
import { InstallCommand } from "@/components/install-command"
import { CodeBlock } from "@/components/code-block"
import { DynamicCodeBlock } from "@/components/dynamic-code-block"
import { Section } from "@/components/component-layout"
import { DocsPreviewWrapper, type VariantItem } from "@/components/docs-preview-wrapper"
import { highlightCode } from "@/lib/shiki"
import type { BundledLanguage } from "shiki"
import { CodeXml, Info } from "lucide-react"

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
  personalizeContent?: React.ReactNode
}

function CodeBlockSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={`h-48 w-full bg-muted/20 rounded-xl border border-border animate-pulse ${className || ""}`}
    />
  )
}



import { FloatingDocsSidebar } from "@/components/floating-docs-sidebar"
import { cookies } from "next/headers"
import { DocsPageLayout as LegacyDocsPageLayout } from "./legacy-docs-page-layout"

export async function DocsPageLayout(props: DocsPageLayoutProps) {
  const {
    title,
    description,
    preview,
    installPackageName,
    installSourceCode,
    installSourceFilename,
    usageCode,
    examples = [],
    props: componentProps = [],
    fullWidthPreview = false,
    personalizeContent,
  } = props

  const cookieStore = await cookies()
  const isLegacy = cookieStore.get("docs_layout")?.value === "legacy"

  if (isLegacy) {
    return <LegacyDocsPageLayout {...props} />
  }


  // Generate the page context markdown automatically

  // Pre-highlight default usage code
  let usageHtml = ""
  if (typeof usageCode === "string") {
    usageHtml = await highlightCode(usageCode.trim(), "tsx" as BundledLanguage)
  }

  // Pre-highlight variant codes
  const variantHtmls = await Promise.all(
    examples.map(async (ex) => {
      // Use ex.code if available, otherwise fallback to usageCode or empty 
      // (Assuming variants usually have 'code' similar to how they have 'preview')
      // Note: ExampleItem interface has 'code' string obligatory in interface
      return await highlightCode((ex.code || "").trim(), "tsx" as BundledLanguage)
    })
  )

  const variantCodes = examples.map(ex => ex.code || "")
  const variantTitles = examples.map(ex => ex.title)

  return (
    <div
      data-docs-layout
      className="flex flex-col lg:flex-row w-full h-full min-h-screen lg:h-screen bg-[#f3f4f6] dark:bg-[#080808] text-foreground"
    >
      {/* Minimal Navigation Cluster */}
      <div className="fixed top-5 left-4 sm:left-6 lg:absolute lg:top-8 lg:left-16 z-50 flex items-center gap-2.5 pointer-events-none">
        <div className="pointer-events-auto">
          <FloatingDocsSidebar />
        </div>
        <div className="inline-flex h-9 items-center gap-2 rounded-md bg-background/55 px-3.5 text-xs text-muted-foreground backdrop-blur-sm pointer-events-auto">
          <Link
            href="/docs"
            className="text-sm font-medium transition-colors hover:text-foreground"
          >
            Docs
          </Link>
          <span className="text-border">/</span>
          <span className="max-w-[100px] sm:max-w-[180px] truncate text-sm font-semibold text-foreground">
            {title}
          </span>
        </div>
      </div>

      {/* Left Column: Scrollable Content */}
      <div
        data-docs-left-column
        className="w-full lg:basis-1/2 lg:max-w-1/2 h-full flex flex-col relative z-10 bg-[#f3f4f6] dark:bg-[#080808]"
      >
        {/* Premium Overlay & Navigation Gradients - Only visible on desktop or when navigation is over this column */}
        <div className="absolute top-0 left-0 right-0 z-30 h-32 bg-gradient-to-b from-[#f3f4f6] via-[#f3f4f6]/95 to-transparent dark:from-[#080808] dark:via-[#080808]/95 pointer-events-none backdrop-blur-[1px] hidden lg:block" />
        <div className="absolute bottom-0 left-0 right-0 z-30 h-32 bg-gradient-to-t from-[#f3f4f6] via-[#f3f4f6]/95 to-transparent dark:from-[#080808] dark:via-[#080808]/95 pointer-events-none backdrop-blur-[1px]" />

        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="px-6 lg:px-16 pt-12 lg:pt-48 pb-40 space-y-16 lg:space-y-20 max-w-3xl mx-auto">

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
            <Section title="Installation" className="pt-10">
              <InstallCommand component={installPackageName} />
            </Section>

            {/* Usage */}
            <Section title="Usage" className="pt-10">
              <div className="space-y-4 usage-code-scrollbar-none">
                <style>{`
                  .usage-code-scrollbar-none * {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                  }
                  .usage-code-scrollbar-none *::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                <div className="relative rounded-xl border border-border overflow-hidden bg-zinc-100 dark:bg-zinc-900/50">
                  <Suspense fallback={<CodeBlockSkeleton />}>
                    {typeof usageCode === "string" ? (
                      <DynamicCodeBlock
                        originalCode={usageCode}
                        defaultHtml={usageHtml}
                        variantHtmls={variantHtmls}
                        variantTitles={variantTitles}
                        variantCodes={variantCodes}
                        className="border-none !bg-transparent shadow-none !rounded-none [&_pre]:!overflow-x-auto [&_pre]:!overflow-y-hidden"
                      />
                    ) : (
                      usageCode
                    )}
                  </Suspense>
                </div>
              </div>
            </Section>

            {/* Props */}
            {componentProps.length > 0 && (
              <Section title="API Reference" className="pt-10">
                <div className="relative overflow-hidden rounded-lg border border-border/40 shadow-sm">
                  <div className="w-full overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead className="bg-zinc-50/50 dark:bg-zinc-900/40">
                        <tr className="border-b border-border/40 divide-x divide-border/40">
                          <th className="h-9 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-1/3">Prop</th>
                          <th className="h-9 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-1/3">Type</th>
                          <th className="h-9 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-1/3">Default</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/40 bg-white dark:bg-transparent">
                        {componentProps.map((prop, i) => (
                          <tr key={i} className="group transition-colors hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 divide-x divide-border/40">
                            <td className="px-4 py-3 align-top">
                              <div className="flex flex-col gap-1">
                                <span className="font-mono text-xs font-bold text-zinc-950 dark:text-zinc-100">
                                  {prop.name}
                                </span>
                                {prop.description && (
                                  <span className="text-muted-foreground text-xs leading-5">
                                    {prop.description}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3 align-top">
                              <code className="inline-flex items-center rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-300 font-mono border border-zinc-200 dark:border-zinc-700/50">
                                {prop.type}
                              </code>
                            </td>
                            <td className="px-4 py-3 align-top">
                              {prop.default ? (
                                <code className="text-[11px] text-muted-foreground font-mono bg-zinc-50 dark:bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-100 dark:border-zinc-800">
                                  {prop.default}
                                </code>
                              ) : (
                                <span className="text-muted-foreground/40 text-xs">—</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Section>
            )}

            <div className="mt-12 flex flex-col gap-4">
              {/* View Source Hint */}
              <div className="flex items-start gap-4 rounded-lg border border-zinc-200 bg-zinc-50/50 p-4 text-sm text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-100">
                <div className="mt-0.5 rounded-md border border-zinc-200 bg-white p-1 text-zinc-900 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
                  <CodeXml className="h-3.5 w-3.5" />
                </div>
                <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Click on the <CodeXml className="inline-block h-3 w-3 align-middle mx-0.5 text-zinc-900 dark:text-zinc-100" /> icon in the top right of the example preview to view the source code for specific variants.
                </p>
              </div>

              {/* Keep in Mind - Attribution */}
              <div className="flex items-start gap-4 rounded-lg border border-zinc-200 bg-zinc-50/50 p-4 text-sm text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-100">
                <div className="mt-0.5 rounded-md border border-zinc-200 bg-white p-1 text-zinc-900 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
                  <Info className="h-3.5 w-3.5" />
                </div>
                <div>
                  <span className="font-semibold block mb-1 text-zinc-900 dark:text-zinc-100 text-xs uppercase tracking-wide">Keep in mind</span>
                  <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
                    This component is inspired by various open-source projects and patterns. Please verify licenses and implementation details before using in production.
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50/50 p-2 pl-4 dark:border-zinc-800 dark:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors group">
                <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                  Have any questions?
                </div>
                <Link
                  href="https://x.com/harshjdhv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md bg-white border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-900 shadow-sm hover:bg-zinc-50 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-900 transition-all active:scale-95"
                >
                  <span>Contact on</span>
                  {/* X Logo SVG */}
                  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>
                  <span>@harshjdhv</span>
                </Link>
              </div>
            </div>

            {/* Examples section removed as per user request to avoid redundancy with the interactive preview */}


            <div className="h-12" />
          </div>
        </div>
      </div>

      {/* Right Column: Sticky Preview */}
      <div
        data-docs-right-column
        className="flex-1 lg:basis-1/2 lg:max-w-1/2 lg:h-full lg:sticky lg:top-0 order-first lg:order-last bg-[#f3f4f6] dark:bg-[#080808] flex flex-col z-20"
      >
        {/* We use a large padding to offset the card from the left side, mimicking the image */}
        <div
          data-docs-preview-shell
          className="relative w-full h-[55vh] lg:h-full p-4 lg:pt-3 lg:pb-3 lg:pr-3 lg:pl-1.5 overflow-hidden"
        >

          {/* Floating Card Container */}
          <DocsPreviewWrapper
            fullWidthPreview={fullWidthPreview}
            personalizeContent={personalizeContent}
            sourceCodeFilename={installSourceCode ? (installSourceFilename || `${installPackageName}.tsx`) : undefined}
            sourceCode={installSourceCode}
            sourceCodeContent={
              installSourceCode ? (
                <Suspense fallback={<CodeBlockSkeleton />}>
                  <CodeBlock
                    code={installSourceCode}
                    lang="tsx"
                    className="border-none rounded-none bg-transparent h-full max-h-none"
                  />
                </Suspense>
              ) : null
            }
            variants={examples as VariantItem[]}
          >
            {preview}
          </DocsPreviewWrapper>

        </div>
      </div>
    </div>
  )
}
