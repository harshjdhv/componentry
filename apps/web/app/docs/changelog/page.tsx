import type { Metadata } from "next"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { absoluteUrl } from "@/lib/site"
import { components } from "@/registry"
import { changelog, type ChangeKind, type ChangelogChange } from "@/config/changelog"
import { DocsInsetShell } from "@/components/docs-inset/docs-inset-shell"
import { docsLine } from "@/components/docs-inset/surface"

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "What's new in Componentry: new animated React components, improvements and fixes, month by month.",
  openGraph: {
    title: "Changelog | Componentry",
    description: "New components, improvements and fixes in Componentry, month by month.",
    url: absoluteUrl("/docs/changelog"),
  },
  alternates: {
    canonical: absoluteUrl("/docs/changelog"),
  },
}

const kindLabel: Record<ChangeKind, string> = {
  new: "New",
  improved: "Improved",
  fixed: "Fixed",
  removed: "Removed",
}

// Same tag shape as the sidebar's "New" badge.
const kindStyle: Record<ChangeKind, string> = {
  new: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  improved: "bg-sky-500/10 text-sky-700 dark:text-sky-400",
  fixed: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  removed: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400",
}

const link =
  "font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-[3px] transition-colors hover:decoration-zinc-900 dark:text-zinc-100 dark:decoration-zinc-600 dark:hover:decoration-zinc-100"

function formatMonth(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })
}

function ChangeLine({ change }: { change: ChangelogChange }) {
  const component = change.component ? components[change.component] : undefined
  // A new component with no hand-written line reads its registry description.
  const text = change.text ?? component?.description

  return (
    <li className="flex gap-3">
      {/* Fixed column keeps the text aligned; the badge itself hugs its label. */}
      <span className="flex h-6 w-[64px] shrink-0 items-center">
        <span
          className={cn(
            "rounded-sm px-1.5 py-[3px] text-[10.5px] leading-none font-medium",
            kindStyle[change.kind]
          )}
        >
          {kindLabel[change.kind]}
        </span>
      </span>
      <p className="min-w-0 text-pretty text-[14.5px] leading-6 text-zinc-600 dark:text-zinc-400">
        {component && (
          <>
            <Link href={`/docs/components/${component.slug}`} className={link}>
              {component.title}
            </Link>
            {change.text ? " " : " — "}
          </>
        )}
        {text}
        {change.by && change.by.length > 0 && (
          <span className="text-zinc-400 dark:text-zinc-500">
            {" "}
            · by{" "}
            {change.by.map((handle, i) => (
              <span key={handle}>
                {i > 0 && ", "}
                <a
                  href={`https://github.com/${handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-zinc-700 dark:hover:text-zinc-300"
                >
                  @{handle}
                </a>
              </span>
            ))}
          </span>
        )}
      </p>
    </li>
  )
}

export default function DocsChangelogPage() {
  const shipped = changelog
    .flatMap((entry) => entry.changes)
    .filter((change) => change.kind === "new" && change.component && components[change.component]).length

  return (
    <DocsInsetShell>
      <article className="max-w-[760px]">
        <header className="mb-12">
          <h1 className="text-[32px] font-medium leading-[1.1] tracking-[-0.03em] text-zinc-900 sm:text-[38px] dark:text-zinc-50">
            Changelog
          </h1>
          <p className="mt-3 text-pretty text-[17px] leading-8 text-zinc-500 dark:text-zinc-400">
            New components, improvements and fixes, month by month. {shipped} components shipped since
            launch in December 2025.
          </p>
        </header>

        <ol>
          {changelog.map((entry) => (
            <li
              key={entry.id}
              id={entry.id}
              className={cn(
                "grid scroll-mt-24 gap-3 border-t py-10 first:border-t-0 first:pt-0 md:grid-cols-[148px_1fr] md:gap-8",
                docsLine
              )}
            >
              <div className="md:pt-[3px]">
                <a
                  href={`#${entry.id}`}
                  className="text-[13.5px] font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  <time dateTime={entry.date.slice(0, 7)}>{formatMonth(entry.date)}</time>
                </a>
              </div>

              <div className="min-w-0">
                <h2 className="text-balance text-[20px] font-medium leading-7 tracking-[-0.02em] text-zinc-900 dark:text-zinc-50">
                  {entry.title}
                </h2>
                <p className="mt-2 text-pretty text-[15.5px] leading-7 text-zinc-600 dark:text-zinc-400">
                  {entry.summary}
                </p>
                <ul className="mt-6 space-y-3">
                  {entry.changes.map((change, i) => (
                    <ChangeLine key={i} change={change} />
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </article>
    </DocsInsetShell>
  )
}
