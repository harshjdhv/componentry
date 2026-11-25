import type React from "react"

import { InstallCommand } from "@/components/install-command"
import { DocsPropsTable } from "@/components/docs-props-table"
import { ComponentPagination } from "@/components/component-pagination"
import { ComponentGuidance } from "@/components/component-guidance"
import { Section } from "@/components/component-layout"
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld"
import type { PropItem } from "@/components/docs-page-layout"
import type { VariantItem } from "@/components/docs-preview-wrapper"
import { DocsInsetPreview } from "./docs-inset-preview"
import { DocsInsetInstall } from "./docs-inset-install"
import { RelatedComponents } from "./related-components"
import { highlightCode } from "@/lib/shiki"
import type { BundledLanguage } from "shiki"

export interface DocsInsetLayoutProps {
  title: string
  description: string
  /** Registry slug, used for install, breadcrumbs and pagination. */
  slug: string
  preview: React.ReactNode
  /** Code rendered under the preview, e.g. a <LiveCodeBlock>. */
  code?: React.ReactNode
  fullWidthPreview?: boolean
  installDependencies?: string
  installationNote?: React.ReactNode
  props?: PropItem[]
  variants?: VariantItem[]
  hideDefaultVariant?: boolean
  /** Shown under the preview card. */
  usageNote?: React.ReactNode
  /** Full component source for the Manual install tab. */
  sourceCode?: string
  sourceFilename?: string
}

/**
 * Content column of a component docs page. The surrounding shell (header,
 * sidebar, rail, inset frame) lives in app/docs/components/layout.tsx so it
 * stays mounted across navigation.
 */
export async function DocsInsetLayout({
  title,
  description,
  slug,
  preview,
  code,
  fullWidthPreview,
  installDependencies,
  installationNote,
  props = [],
  variants,
  hideDefaultVariant,
  usageNote,
  sourceCode,
  sourceFilename,
}: DocsInsetLayoutProps) {
  const hasSource = Boolean(sourceCode && !sourceCode.startsWith("// Unable to load"))
  const sourceHtml = hasSource ? await highlightCode(sourceCode!, "tsx" as BundledLanguage) : undefined

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Docs", path: "/docs" },
          { name: title, path: `/docs/components/${slug}` },
        ]}
      />
      <header className="mb-8">
        <div className="min-w-0 space-y-3">
          <h1 className="text-balance text-[32px] font-medium leading-[1.1] tracking-[-0.03em] text-zinc-900 sm:text-[38px] dark:text-zinc-50">
            {title}
          </h1>
          <p className="max-w-xl text-pretty text-[15.5px] leading-7 text-zinc-500 dark:text-zinc-400">
            {description}
          </p>
        </div>
      </header>

      <div id="preview" data-section-title="Preview" className="scroll-mt-6">
        <DocsInsetPreview
          code={code}
          fullWidth={fullWidthPreview}
          variants={variants}
          hideDefaultVariant={hideDefaultVariant}
        >
          {preview}
        </DocsInsetPreview>
        {usageNote && (
          <div className="mt-4 text-pretty text-[14px] leading-6 text-zinc-500 dark:text-zinc-400 [&_.text-muted-foreground]:text-zinc-500 dark:[&_.text-muted-foreground]:text-zinc-400">
            {usageNote}
          </div>
        )}
      </div>

      <div className="mt-16 space-y-16">
        <Section title="Installation">
          {installationNote && (
            <div className="mb-4 text-pretty text-[15px] leading-7 text-zinc-500 dark:text-zinc-400">
              {installationNote}
            </div>
          )}
          <DocsInsetInstall
            cli={<InstallCommand component={slug} />}
            dependencies={installDependencies}
            sourceCode={hasSource ? sourceCode : undefined}
            sourceHtml={sourceHtml}
            sourceFilename={sourceFilename ?? `${slug}.tsx`}
          />
        </Section>

        {props.length > 0 && (
          <Section title="API Reference">
            <DocsPropsTable props={props} />
          </Section>
        )}

        <ComponentGuidance slug={slug} />

        <div className="space-y-10">
          <RelatedComponents slug={slug} />
          <ComponentPagination currentSlug={slug} />
        </div>
      </div>
    </>
  )
}
