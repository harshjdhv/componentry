// apps/web/components/docs-page-layout.tsx
import type React from "react"
import Link from "next/link"
import { Suspense } from "react"
import { InstallCommand } from "@/components/install-command"
import { ImportCodeBlock } from "@/components/import-code-block"
import { DynamicCodeBlock } from "@/components/dynamic-code-block"
import { DocsPropsTable } from "@/components/docs-props-table"
import { DocsFooterSection } from "@/components/docs-footer-section"
import { ComponentPagination } from "@/components/component-pagination"
import { Section } from "@/components/component-layout"
import { DocsPreviewWrapper, type VariantItem } from "@/components/docs-preview-wrapper"
import { highlightCode } from "@/lib/shiki"
import { splitImportAndUsage, stripImportFromCode } from "@/lib/split-import"
import type { BundledLanguage } from "shiki"
import { FloatingDocsSidebarLazy } from "@/components/floating-docs-sidebar-lazy"
import { buildDocsPageMarkdown } from "@/lib/docs-page-markdown"
import { PageContextMenu } from "@/components/page-context-menu"
import { ChevronRight } from "lucide-react"

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
  installationNote?: React.ReactNode
  usageNote?: React.ReactNode
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
  installDependencies,
  installSourceFilename,
  importCode,
  usageCode,
  examples = [],
  props = [],
  fullWidthPreview = false,
  personalizeContent,
  hideDefaultPreviewVariant = false,
  installationNote,
  usageNote,
}: DocsPageLayoutProps) {

  const pageMarkdown = buildDocsPageMarkdown({
    title,
    description,
    installPackageName,
    installDependencies,
    installSourceCode,
    installSourceFilename,
    usageCode: typeof usageCode === "string" ? usageCode : "",
    examples,
    props,
  })

  // Auto-split import lines from usageCode for Import + Usage sections
  let resolvedImportCode = ""
  let resolvedUsageCode = ""
  let importHtml = ""
  let usageHtml = ""

  if (typeof usageCode === "string") {
    const split = splitImportAndUsage(usageCode)

    resolvedImportCode =
      typeof importCode === "string" && importCode.trim()
        ? importCode.trim()
        : split.importCode

    resolvedUsageCode = split.usageCode || usageCode.trim()

    // If usage still starts with imports (e.g. explicit importCode + full usageCode), strip them
    if (resolvedUsageCode.startsWith("import ")) {
      resolvedUsageCode = stripImportFromCode(resolvedUsageCode)
    }

    if (resolvedImportCode) {
      importHtml = await highlightCode(resolvedImportCode, "tsx" as BundledLanguage)
    }
    if (resolvedUsageCode) {
      usageHtml = await highlightCode(resolvedUsageCode, "tsx" as BundledLanguage)
    }
  }

  const variantCodes = examples.map((ex) => stripImportFromCode(ex.code || ""))
  const variantTitles = examples.map((ex) => ex.title)

  return (
    <div
      data-docs-layout
      className="flex flex-col lg:flex-row w-full h-full min-h-screen lg:h-screen bg-white dark:bg-background text-foreground"
    >
      {/* Minimal Navigation Cluster */}
      <div className="fixed left-1 top-3 z-50 flex items-center gap-2.5 pointer-events-none sm:left-3 lg:absolute lg:left-6 lg:top-6">
        <div className="pointer-events-auto shrink-0">
          <FloatingDocsSidebarLazy />
        </div>
          <div className="inline-flex min-h-8 min-w-0 items-center gap-2 text-[15px] font-normal tracking-[-0.02em] leading-normal text-black/45 pointer-events-auto dark:text-white/45">
          <Link
            href="/docs"
            className="shrink-0 font-normal transition-colors hover:text-black/70 dark:hover:text-white/70"
          >
            Docs
          </Link>
          <ChevronRight
            className="size-3.5 shrink-0 text-black/30 dark:text-white/30"
            aria-hidden="true"
          />
          <span className="max-w-[130px] truncate font-medium text-black/60 sm:max-w-[220px] dark:text-white/60">
            {title}
          </span>
        </div>
      </div>

      {/* Left Column: Scrollable Content */}
      <div
        data-docs-left-column
        className="w-full lg:basis-1/2 lg:max-w-1/2 h-full flex flex-col relative z-10 bg-white dark:bg-background"
      >
        {/* Scroll edge fades — subtly blend content into page background */}
        <div className="absolute top-0 left-0 right-0 z-30 h-24 bg-gradient-to-b from-white to-transparent dark:from-background pointer-events-none hidden lg:block" />
        <div className="absolute bottom-0 left-0 right-0 z-30 h-24 bg-gradient-to-t from-white to-transparent dark:from-background pointer-events-none" />

        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="px-6 lg:px-16 pt-12 lg:pt-48 pb-40 space-y-14 lg:space-y-16 max-w-3xl mx-auto">

            {/* Header Section */}
            <header>
              <div className="space-y-4">
                <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between xl:gap-5">
                  <h1 className="mb-1 min-w-0 max-w-2xl pb-1 text-[34px] font-medium leading-[1.08] tracking-[-0.025em] text-[#333333] sm:text-[40px] lg:text-[46px] dark:text-zinc-100">
                    {title}
                  </h1>
                  <div className="self-end xl:self-auto">
                    <ComponentPagination currentSlug={installPackageName} />
                  </div>
                </div>

                <p className="max-w-xl text-[15px] font-normal leading-7 tracking-normal text-muted-foreground/85">
                  {description}
                </p>

                <PageContextMenu content={pageMarkdown} />
              </div>
            </header>


            {/* Installation */}
            <Section title="Installation" className="pt-8">
              {installationNote && (
                <div className="mb-4">
                  {installationNote}
                </div>
              )}
              <InstallCommand component={installPackageName} />
            </Section>

            {/* Usage */}
            <Section title="Usage" className="pt-8">
              {usageNote && (
                <div className="mb-4">
                  {usageNote}
                </div>
              )}
              <div className="usage-code-scrollbar-none">
                {typeof usageCode === "string" ? (
                  resolvedUsageCode ? (
                    <Suspense fallback={<CodeBlockSkeleton />}>
                      {resolvedImportCode ? (
                        <div className="space-y-3">
                          <ImportCodeBlock html={importHtml} />
                          <DynamicCodeBlock
                            originalCode={resolvedUsageCode}
                            defaultHtml={usageHtml}
                            variantTitles={variantTitles}
                            variantCodes={variantCodes}
                            hideDefaultTab={hideDefaultPreviewVariant}
                          />
                        </div>
                      ) : (
                        <DynamicCodeBlock
                          originalCode={resolvedUsageCode}
                          defaultHtml={usageHtml}
                          variantTitles={variantTitles}
                          variantCodes={variantCodes}
                          hideDefaultTab={hideDefaultPreviewVariant}
                        />
                      )}
                    </Suspense>
                  ) : null
                ) : (
                  usageCode
                )}
              </div>
            </Section>

            {/* Props */}
            {props.length > 0 && (
              <Section title="API Reference" className="pt-8">
                <DocsPropsTable props={props} />
              </Section>
            )}

            <div className="mt-12">
              <DocsFooterSection />
            </div>

            {/* Examples section removed as per user request to avoid redundancy with the interactive preview */}


            <div className="h-12" />
          </div>
        </div>
      </div>

      {/* Right Column: Sticky Preview */}
      <div
        data-docs-right-column
        className="flex-1 lg:basis-1/2 lg:max-w-1/2 lg:h-full lg:sticky lg:top-0 order-first lg:order-last bg-white dark:bg-background flex flex-col z-20"
      >
        {/* We use a large padding to offset the card from the left side, mimicking the image */}
        <div
          data-docs-preview-shell
          className="relative w-full h-[55vh] lg:h-full p-4 lg:pt-3 lg:pb-3 lg:pr-3 lg:pl-1.5 overflow-hidden bg-white dark:bg-background"
        >

          {/* Floating Card Container */}
          <DocsPreviewWrapper
            fullWidthPreview={fullWidthPreview}
            personalizeContent={personalizeContent}
            hideDefaultVariant={hideDefaultPreviewVariant}
            sourceCodeFilename={installSourceCode ? (installSourceFilename || `${installPackageName}.tsx`) : undefined}
            sourceCodeKey={installSourceCode ? installPackageName : undefined}
            variants={examples as VariantItem[]}
          >
            {preview}
          </DocsPreviewWrapper>

        </div>
      </div>
    </div>
  )
}
