import Link from "next/link"
import { notFound } from "next/navigation"
import { componentCollections } from "@/lib/component-collections"
import { pageMetadata } from "@/lib/page-metadata"
import { absoluteUrl } from "@/lib/site"
import { getComponent } from "@/registry"
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld"

type PageProps = { params: Promise<{ slug: string }> }
export const dynamicParams = false
export function generateStaticParams() {
  return componentCollections.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const collection = componentCollections.find((item) => item.slug === slug)
  if (!collection) return {}
  return pageMetadata({ title: collection.title, description: collection.description, path: `/collections/${slug}` })
}

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params
  const collection = componentCollections.find((item) => item.slug === slug)
  if (!collection) notFound()
  const entries = collection.entries.map((entry) => {
    const component = getComponent(entry.slug)
    if (!component) throw new Error(`Unknown collection component: ${entry.slug}`)
    return { ...entry, component }
  })
  const linkClass = "rounded-sm underline decoration-zinc-300 underline-offset-4 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring dark:decoration-zinc-600"

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Collections", path: "/collections" }, { name: collection.title, path: `/collections/${slug}` }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: collection.title,
        description: collection.description,
        url: absoluteUrl(`/collections/${slug}`),
        mainEntity: {
          "@type": "ItemList",
          itemListElement: entries.map(({ component }, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: component.title,
            url: absoluteUrl(`/docs/components/${component.slug}`),
          })),
        },
      }).replace(/</g, "\\u003c") }} />
      <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap gap-x-2 text-sm text-zinc-500"><Link href="/collections" className={linkClass}>Collections</Link><span aria-hidden="true">/</span><span>{collection.title}</span></nav>
      <header className="max-w-2xl">
        <h1 className="text-balance text-3xl font-medium tracking-tight sm:text-4xl">{collection.title}</h1>
        <p className="mt-5 text-pretty text-base leading-7 text-zinc-500 dark:text-zinc-400">{collection.description}</p>
      </header>
      <section className="mb-12 mt-12 max-w-2xl" aria-labelledby="selection-guide">
        <h2 id="selection-guide" className="text-lg font-medium">{collection.guideHeading}</h2>
        <p className="mt-3 text-pretty text-sm leading-7 text-zinc-500 dark:text-zinc-400">{collection.guide}</p>
      </section>
      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
        {entries.map(({ component, heading, reason }) => (
          <article key={component.slug} className="min-w-0 border-t border-zinc-200 pt-6 dark:border-zinc-800">
            <h2 className="text-xl font-medium tracking-tight"><Link className={linkClass} href={`/docs/components/${component.slug}`}>{component.title}</Link></h2>
            {component.previewVideo && (
              <video className="mt-5 aspect-video w-full rounded-lg bg-zinc-100 object-contain dark:bg-zinc-900" controls muted playsInline preload="metadata" poster={component.previewImage} aria-label={`${component.title} preview`}>
                <source src={component.previewVideo.replace(/\.(mov|mp4|webm)(\?.*)?$/i, ".webm$2")} type="video/webm" />
                <source src={component.previewVideo.replace(/\.(mov|mp4|webm)(\?.*)?$/i, ".mp4$2")} type="video/mp4" />
                <a href={`/docs/components/${component.slug}`}>Open the {component.title} demo</a>
              </video>
            )}
            <h3 className="mt-5 text-sm font-medium">{heading}</h3>
            <p className="mt-2 text-pretty text-sm leading-7 text-zinc-500 dark:text-zinc-400">{reason}</p>
            <Link href={`/docs/components/${component.slug}`} className={`${linkClass} mt-4 inline-block py-2 text-sm`}>Preview & install {component.title}</Link>
          </article>
        ))}
      </div>
      <section className="mt-16 max-w-2xl border-t border-zinc-200 pt-8 dark:border-zinc-800">
        <h2 className="text-lg font-medium">{collection.question}</h2>
        <p className="mt-3 text-pretty text-sm leading-7 text-zinc-500 dark:text-zinc-400">{collection.answer}</p>
      </section>
      <nav aria-label="More collections" className="mt-12 flex flex-wrap gap-x-6 gap-y-4 border-t border-zinc-200 pt-8 text-sm dark:border-zinc-800">
        {componentCollections.filter((item) => item.slug !== slug).map((item) => <Link key={item.slug} className={linkClass} href={`/collections/${item.slug}`}>{item.title}</Link>)}
      </nav>
    </>
  )
}
