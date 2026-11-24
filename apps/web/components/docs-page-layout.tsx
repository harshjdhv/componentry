// apps/web/components/docs-page-layout.tsx
import type React from "react"
import { Suspense } from "react"
import { DynamicCodeBlock } from "@/components/dynamic-code-block"
import type { VariantItem } from "@/components/docs-preview-wrapper"
import { DocsInsetLayout } from "@/components/docs-inset/docs-inset-layout"
import { highlightCode } from "@/lib/shiki"
import { splitImportAndUsage, stripImportFromCode, joinImportAndUsage } from "@/lib/split-import"
import type { BundledLanguage } from "shiki"

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
  installDependencies,
  installSourceCode,
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

  const code =
    typeof usageCode === "string" ? (
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
    )

  return (
    <DocsInsetLayout
      title={title}
      description={description}
      slug={installPackageName}
      preview={preview}
      code={code}
      fullWidthPreview={fullWidthPreview}
      installDependencies={installDependencies}
      installationNote={installationNote}
      usageNote={usageNote}
      props={props}
      variants={examples as VariantItem[]}
      hideDefaultVariant={hideDefaultPreviewVariant}
      sourceCode={installSourceCode}
      sourceFilename={installSourceFilename}
    />
  )
}
