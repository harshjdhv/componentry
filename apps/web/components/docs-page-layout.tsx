// apps/web/components/docs-page-layout.tsx
import type React from "react"
import Link from "next/link"
import { Suspense } from "react"
import { InstallCommand } from "@/components/install-command"
import { DynamicCodeBlock } from "@/components/dynamic-code-block"
import { DocsPropsTable } from "@/components/docs-props-table"
import { DocsFooterSection } from "@/components/docs-footer-section"
import { ComponentPagination } from "@/components/component-pagination"
import { Section } from "@/components/component-layout"
import { components } from "@/registry"
import { DocsPreviewWrapper, type VariantItem } from "@/components/docs-preview-wrapper"
import { highlightCode } from "@/lib/shiki"
import { splitImportAndUsage, stripImportFromCode, joinImportAndUsage } from "@/lib/split-import"
import type { BundledLanguage } from "shiki"
import { FloatingDocsSidebarLazy } from "@/components/floating-docs-sidebar-lazy"
import { DocsScrollEdgeFade } from "@/components/docs-scroll-edge-fade"
import { ChevronRight } from "lucide-react"
import { ComponentGuidance } from "@/components/component-guidance"
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld"
import { cn } from "@/lib/utils"

// Docs columns run full width, so they use a fixed inset instead of the
// landing page's centered 1360px rail (which left a wide empty gutter).
const docsGutterLeftClass = "pl-6 sm:pl-8 lg:pl-12 xl:pl-16"
const docsGutterLeftOffsetClass = "left-6 sm:left-8 lg:left-12 xl:left-16"

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
  hideDefaultPreviewVariant?: boolean
  installationNote?: React.ReactNode
  usageNote?: React.ReactNode
}

function CodeBlockSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={`h-48 w-full animate-pulse rounded-xl bg-zinc-100/70 dark:bg-white/[0.035] ${className || ""}`}
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
  hideDefaultPreviewVariant = false,
  installationNote,
  usageNote,
}: DocsPageLayoutProps) {

  // Build one usage block: import + example (people expect this as a single snippet)
  let resolvedUsageCode = ""
  let usageHtml = ""
  let variantCodes: string[] = []
  let variantTitles: string[] = []

  if (typeof usageCode === "string") {
    const split = splitImportAndUsage(usageCode)

    const resolvedImportCode =
      typeof importCode === "string" && importCode.trim()
        ? importCode.trim()
        : split.importCode

    let usageBody = split.usageCode || usageCode.trim()
    if (usageBody.startsWith("import ")) {
      usageBody = stripImportFromCode(usageBody)
    }

    resolvedUsageCode = joinImportAndUsage(resolvedImportCode, usageBody)

    if (resolvedUsageCode) {
      usageHtml = await highlightCode(resolvedUsageCode, "tsx" as BundledLanguage)
    }

    variantTitles = examples.map((ex) => ex.title)
    variantCodes = examples.map((ex) => {
      const body = stripImportFromCode(ex.code || "")
      return joinImportAndUsage(resolvedImportCode, body)
    })
  } else {
    variantTitles = examples.map((ex) => ex.title)
    variantCodes = examples.map((ex) => stripImportFromCode(ex.code || ""))
  }

  // Category of the current component, used as the middle breadcrumb crumb
  const category = components[installPackageName]?.category

  return (
    <div
      data-docs-layout
      className="relative flex flex-col lg:flex-row w-full min-h-screen lg:h-screen bg-white dark:bg-background text-foreground"
    >
      <BreadcrumbJsonLd items={[{ name: "Docs", path: "/docs" }, { name: title, path: `/docs/components/${installPackageName}` }]} />
      {/* Minimal Navigation Cluster — optically align icon glyph with heading left edge */}
      <div className={cn("group/docs-navigation pointer-events-none absolute top-3 z-50 flex items-center gap-2 lg:absolute lg:top-6", docsGutterLeftOffsetClass)}>
        <div className="pointer-events-auto -ml-2 shrink-0">
          <FloatingDocsSidebarLazy />
        </div>
        <div className="inline-flex min-h-8 min-w-0 items-center gap-1.5 text-sm font-normal tracking-[-0.01em] leading-normal text-black/50 pointer-events-auto dark:text-white/50 group-has-[[data-sidebar-open=true]]/docs-navigation:invisible">
          <Link
            href="/docs"
            className="relative shrink-0 font-normal transition-colors after:absolute after:-inset-x-1.5 after:-inset-y-2.5 after:content-[''] hover:text-black/90 dark:hover:text-white/90"
          >
            Docs
          </Link>
          <ChevronRight
            className="size-3 shrink-0 text-black/35 dark:text-white/35"
            aria-hidden="true"
          />
          {category && (
            <>
              <Link
                href={`/docs#${category.toLowerCase().replace(/\s+/g, "-")}`}
                className="relative shrink-0 font-normal transition-colors after:absolute after:-inset-x-1.5 after:-inset-y-2.5 after:content-[''] hover:text-black/90 dark:hover:text-white/90"
              >
                {category}
              </Link>
              <ChevronRight
                className="size-3 shrink-0 text-black/35 dark:text-white/35"
                aria-hidden="true"
              />
            </>
          )}
          <span
            aria-current="page"
            className="min-w-0 truncate font-medium tracking-[-0.01em] text-black/85 dark:text-white/85"
          >
            {title}
          </span>
        </div>
      </div>

      {/* Left Column: Scrollable Content */}
      <div
        data-docs-left-column
        className="w-full min-w-0 flex flex-col relative z-10 bg-white dark:bg-background lg:h-full lg:w-1/2 lg:max-w-[50%] lg:basis-1/2"
      >
        {/* Progressive blur edge fades — content softens into the column edges */}
        <DocsScrollEdgeFade
          position="top"
          placement="absolute"
          className="hidden lg:block"
        />
        <DocsScrollEdgeFade position="bottom" placement="absolute" />

        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* Full-bleed within the column — no centered max-width gutter on large screens */}
          <div className={cn("w-full space-y-14 pt-14 pb-40 pr-6 sm:pr-8 lg:space-y-16 lg:pt-40 lg:pb-40 lg:pr-8", docsGutterLeftClass)}>

            {/* Header Section */}
            <header>
              <div className="space-y-4">
                <h1 className="mb-1 min-w-0 max-w-2xl text-balance pb-1 text-[34px] font-medium leading-[1.08] tracking-[-0.03em] text-[#2a2a2a] sm:text-[40px] lg:text-[46px] dark:text-zinc-50">
                  {title}
                </h1>

                <p className="max-w-2xl text-pretty text-[16px] font-normal leading-7 tracking-[-0.01em] text-zinc-500 sm:text-[17px] sm:leading-8 dark:text-zinc-400">
                  {description}
                </p>
              </div>
            </header>


            {/* Installation */}
            <Section title="Installation" className="pt-8">
              {installationNote && (
                <div className="mb-4 text-pretty text-[15px] leading-7 text-zinc-500 dark:text-zinc-400 [&_.text-muted-foreground]:text-zinc-500 dark:[&_.text-muted-foreground]:text-zinc-400">
                  {installationNote}
                </div>
              )}
              <InstallCommand component={installPackageName} />
              {installDependencies && (
                <p className="mt-4 break-words text-[13px] leading-6 text-zinc-500 dark:text-zinc-400">
                  Dependencies: <code className="font-mono text-[12px]">{installDependencies}</code>
                </p>
              )}
            </Section>

            {/* Usage */}
            <Section title="Usage" className="pt-8">
              {usageNote && (
                <div className="mb-4 text-pretty text-[15px] leading-7 text-zinc-500 dark:text-zinc-400 [&_.text-muted-foreground]:text-zinc-500 dark:[&_.text-muted-foreground]:text-zinc-400">
                  {usageNote}
                </div>
              )}
              <div className="usage-code-scrollbar-none">
                {typeof usageCode === "string" ? (
                  resolvedUsageCode ? (
                    <Suspense fallback={<CodeBlockSkeleton />}>
                      <DynamicCodeBlock
                        originalCode={resolvedUsageCode}
                        defaultHtml={usageHtml}
                        variantTitles={variantTitles}
                        variantCodes={variantCodes}
                        hideDefaultTab={hideDefaultPreviewVariant}
                      />
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

            <ComponentGuidance slug={installPackageName} />

            <div className="mt-12 space-y-10">
              <DocsFooterSection />
              <ComponentPagination currentSlug={installPackageName} />
            </div>

            {/* Examples section removed as per user request to avoid redundancy with the interactive preview */}


            <div className="h-12" />
          </div>
        </div>
      </div>

      {/* Right Column: Sticky Preview */}
      <div
        data-docs-right-column
        className="order-first z-20 mt-14 flex aspect-[4/5] w-full max-h-[75svh] min-w-0 shrink-0 flex-col bg-white dark:bg-background lg:sticky lg:top-0 lg:order-last lg:mt-0 lg:aspect-auto lg:h-full lg:max-h-none lg:w-1/2 lg:max-w-[50%] lg:flex-1 lg:basis-1/2"
      >
        {/* We use a large padding to offset the card from the left side, mimicking the image */}
        <div
          data-docs-preview-shell
          className="relative h-full w-full overflow-hidden bg-white p-3 dark:bg-background lg:p-0 lg:pt-3 lg:pb-3 lg:pr-3 lg:pl-1.5"
        >

          {/* Floating Card Container */}
          <DocsPreviewWrapper
            fullWidthPreview={fullWidthPreview}
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
