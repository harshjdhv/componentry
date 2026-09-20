import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { componentCollections } from "@/lib/component-collections"
import { pageMetadata } from "@/lib/page-metadata"
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld"

export const metadata = pageMetadata({
  title: "React Animation Collections",
  description: "Find React components by the effect you want to build. Compare text animations, scroll interactions, animated backgrounds, and image effects.",
  path: "/collections",
})

export default function CollectionsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Components", path: "/docs" }, { name: "Collections", path: "/collections" }]} />
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-zinc-500"><Link href="/docs" className="underline underline-offset-4">Components</Link><span aria-hidden="true"> / </span><span>Collections</span></nav>
      <header className="mb-14 max-w-2xl">
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">Find the right effect.</h1>
        <p className="mt-5 text-pretty text-base leading-7 text-zinc-500 dark:text-zinc-400">React components, grouped by what you want to build. Compare the interactions, explore the demos, and make the source your own.</p>
      </header>
      <div className="grid gap-x-12 sm:grid-cols-2">
        {componentCollections.map((collection) => (
          <article key={collection.slug} className="border-t border-zinc-200 py-8 dark:border-zinc-800">
            <h2><Link href={`/collections/${collection.slug}`} className="group inline-flex items-center gap-3 rounded-sm text-xl font-medium tracking-tight hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">{collection.title}<ArrowUpRight className="size-4 shrink-0 text-zinc-500" aria-hidden="true" /></Link></h2>
            <p className="mt-3 text-pretty text-sm leading-7 text-zinc-500 dark:text-zinc-400">{collection.description}</p>
            <p className="mt-4 text-xs text-zinc-500">{collection.entries.length} selected components</p>
          </article>
        ))}
      </div>
    </>
  )
}
