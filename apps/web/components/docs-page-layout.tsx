// apps/web/components/docs-page-layout.tsx
import type React from "react"
import Link from "next/link"
import { Suspense } from "react"
import { InstallCommand } from "@/components/install-command"
import { CodeBlock } from "@/components/code-block"
import { cn } from "@/lib/utils"
import { DynamicCodeBlock } from "@/components/dynamic-code-block"
import { Section } from "@/components/component-layout"
import { DocsPreviewWrapper, type VariantItem } from "@/components/docs-preview-wrapper"
import { highlightCode } from "@/lib/shiki"
import type { BundledLanguage } from "shiki"
import { CodeXml, Info } from "lucide-react"
import { InstallationTabs } from "@/components/installation-tabs"
import { PreviewCodeTabs } from "@/components/preview-code-tabs"

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
  importCode?: string | React.ReactNode
  usageCode: string | React.ReactNode
  examples?: ExampleItem[]
  props?: PropItem[]
  action?: React.ReactNode
  fullWidthPreview?: boolean
  unstyledPreview?: boolean
  type?: string
  dependencies?: string[]
  personalizeContent?: React.ReactNode
  hideDefaultPreviewVariant?: boolean
}

function CodeBlockSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={`h-48 w-full bg-muted/20 rounded-xl border border-border animate-pulse ${className || ""}`}
    />
  )
}




import { DocsClientLayout } from "@/components/docs-client-layout"

export async function DocsPageLayout({
  title,
  description,
  preview,
  installPackageName,
  installSourceCode,
  installSourceFilename,
  importCode,
  usageCode,
  examples = [],
  props = [],
  fullWidthPreview = false,
  personalizeContent,
  hideDefaultPreviewVariant = false,

}: DocsPageLayoutProps) {

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

  const leftContent = (
    <>
      {/* Installation */}
      <Section title="Installation" className="pt-10">
        <InstallCommand component={installPackageName} />
      </Section>

      {/* Import */}
      {importCode && (
        <Section title="Import" className="pt-10">
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
            <div className="relative rounded-xl border border-border overflow-hidden bg-zinc-100 dark:bg-[#191919]">
              <Suspense fallback={<CodeBlockSkeleton />}>
                {typeof importCode === "string" ? (
                  <CodeBlock
                    code={importCode}
                    lang="tsx"
                    className="border-none !bg-transparent shadow-none !rounded-none [&_pre]:!overflow-x-auto [&_pre]:!overflow-y-hidden"
                  />
                ) : (
                  importCode
                )}
              </Suspense>
            </div>
          </div>
        </Section>
      )}

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
          <div className="relative rounded-xl border border-border overflow-hidden bg-zinc-100 dark:bg-[#191919]">
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
      {props.length > 0 && (
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
                  {props.map((prop, i) => (
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
        <div className="flex items-start gap-4 rounded-lg border border-zinc-200 bg-zinc-50/50 p-4 text-sm text-zinc-900 dark:border-zinc-800 dark:bg-[#191919] dark:text-zinc-100">
          <div className="mt-0.5 rounded-md border border-zinc-200 bg-white p-1 text-zinc-900 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
            <CodeXml className="h-3.5 w-3.5" />
          </div>
          <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
            Click on the <CodeXml className="inline-block h-3 w-3 align-middle mx-0.5 text-zinc-900 dark:text-zinc-100" /> icon in the top right of the example preview to view the source code for specific variants.
          </p>
        </div>

        {/* Keep in Mind - Attribution */}
        <div className="flex items-start gap-4 rounded-lg border border-zinc-200 bg-zinc-50/50 p-4 text-sm text-zinc-900 dark:border-zinc-800 dark:bg-[#191919] dark:text-zinc-100">
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
        <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50/50 p-2 pl-4 dark:border-zinc-800 dark:bg-[#191919] hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors group">
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
    </>
  )

  const rightContent = (
    <DocsPreviewWrapper
      fullWidthPreview={fullWidthPreview}
      personalizeContent={personalizeContent}
      hideDefaultVariant={hideDefaultPreviewVariant}
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
  )

  const classicContent = (
    <div className="space-y-16">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">Preview</h2>

        {/* Default Preview with Tabs */}
        {!hideDefaultPreviewVariant && (
          <PreviewCodeTabs
            previewContent={
              <div className={cn(
                "relative flex min-h-[350px] h-full w-full items-center justify-center rounded-xl border border-border/60 bg-white dark:bg-[#191919] overflow-hidden shadow-sm",
                !fullWidthPreview && "p-4 sm:p-10"
              )}>
                <div className="w-full min-w-0 max-w-full flex flex-col items-center justify-center">
                  {preview}
                </div>
              </div>
            }
            codeContent={
              <div className="rounded-xl border border-border/60 flex flex-col h-full overflow-hidden bg-zinc-100 dark:bg-[#191919]">
                <Suspense fallback={<CodeBlockSkeleton />}>
                  {typeof usageCode === "string" ? (
                    <CodeBlock
                      code={usageCode}
                      lang="tsx"
                      className="border-none !bg-transparent shadow-none !rounded-none [&_pre]:!overflow-x-auto [&_pre]:!overflow-y-hidden"
                    />
                  ) : installSourceCode ? (
                    <CodeBlock
                      code={installSourceCode}
                      lang="tsx"
                      className="border-none !bg-transparent shadow-none !rounded-none [&_pre]:!overflow-x-auto [&_pre]:!overflow-y-hidden"
                    />
                  ) : (
                    <div className="p-4 text-sm text-muted-foreground text-center border-t border-dashed border-border/50">
                      No code available.
                    </div>
                  )}
                </Suspense>
              </div>
            }
          />
        )}
      </div>

      {/* Installation Segment */}
      <div className="pt-4">
        <Section title="Installation" className="pt-0">
          <InstallationTabs
            cliContent={<InstallCommand component={installPackageName} />}
            manualContent={
              installSourceCode ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">Copy and paste the following code into your project.</p>
                  <div className="rounded-xl border border-border/60 overflow-hidden bg-zinc-100 dark:bg-[#191919]">
                    <div className="flex items-center px-4 py-2.5 border-b border-border/60 bg-white/50 dark:bg-[#1e1e1e]/50">
                      <div className="flex items-center gap-1.5">
                        <svg className="h-3.5 w-3.5 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                        <span className="text-xs font-mono text-zinc-500">
                          {installSourceFilename || `${installPackageName}.tsx`}
                        </span>
                      </div>
                    </div>
                    <Suspense fallback={<CodeBlockSkeleton />}>
                      <CodeBlock
                        code={installSourceCode}
                        lang="tsx"
                        className="border-none !bg-transparent shadow-none !rounded-none [&_pre]:!overflow-x-auto [&_pre]:!overflow-y-hidden"
                      />
                    </Suspense>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No manual installation steps available.</p>
              )
            }
          />
        </Section>
      </div>

      {/* Import Code if provided */}
      {importCode && (
        <Section title="Import" className="pt-8">
          <div className="relative rounded-xl border border-border/60 overflow-hidden bg-zinc-100 dark:bg-[#191919]">
            <Suspense fallback={<CodeBlockSkeleton />}>
              {typeof importCode === "string" ? (
                <CodeBlock code={importCode} lang="tsx" className="border-none !bg-transparent shadow-none !rounded-none [&_pre]:!overflow-x-auto [&_pre]:!overflow-y-hidden" />
              ) : importCode}
            </Suspense>
          </div>
        </Section>
      )}

      {/* Usage Segment if provided without repeating default install code implicitly unless it's usageCode */}
      {usageCode && typeof usageCode === "string" && usageCode !== installSourceCode && (
        <Section title="Usage" className="pt-8">
          <div className="relative rounded-xl border border-border/60 overflow-hidden bg-zinc-100 dark:bg-[#191919]">
            <Suspense fallback={<CodeBlockSkeleton />}>
              <CodeBlock code={usageCode} lang="tsx" className="border-none !bg-transparent shadow-none !rounded-none [&_pre]:!overflow-x-auto [&_pre]:!overflow-y-hidden" />
            </Suspense>
          </div>
        </Section>
      )}

      {/* Variants with Preview and Code Tabs */}
      {examples.map((ex, i) => (
        <div key={i} className="space-y-4 pt-4 border-t border-border/20">
          <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-4">{ex.title}</h3>

          <PreviewCodeTabs
            previewContent={
              <div className={cn(
                "relative flex min-h-[350px] h-full w-full items-center justify-center rounded-xl border border-border/60 bg-white dark:bg-[#191919] overflow-hidden shadow-sm",
                !ex.fullWidth && "p-4 sm:p-10"
              )}>
                <div className="w-full min-w-0 max-w-full flex flex-col items-center justify-center">
                  {ex.preview}
                </div>
              </div>
            }
            codeContent={
              ex.code ? (
                <div className="rounded-xl border border-border/60 flex flex-col h-full overflow-hidden bg-zinc-100 dark:bg-[#191919]">
                  <Suspense fallback={<CodeBlockSkeleton />}>
                    <CodeBlock
                      code={ex.code}
                      lang="tsx"
                      className="border-none !bg-transparent shadow-none !rounded-none [&_pre]:!overflow-x-auto [&_pre]:!overflow-y-hidden"
                    />
                  </Suspense>
                </div>
              ) : (
                <div className="p-4 text-sm text-muted-foreground text-center border rounded-xl border-dashed">
                  No code available for this variant.
                </div>
              )
            }
          />
        </div>
      ))}

      {/* Props */}
      {props.length > 0 && (
        <Section title="API Reference" className="pt-8">
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
                  {props.map((prop, i) => (
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

      {/* Footer / Contact */}
      <div className="mt-12 flex flex-col gap-4">
        {/* Contact */}
        <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50/50 p-2 pl-4 dark:border-zinc-800 dark:bg-[#191919] hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors group">
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
            <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>
            <span>@harshjdhv</span>
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <DocsClientLayout
      title={title}
      description={description}
      leftContent={leftContent}
      rightContent={rightContent}
      classicContent={classicContent}
    />
  )
}
