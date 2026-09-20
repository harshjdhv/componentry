import { absoluteUrl } from "@/lib/site"

export function BreadcrumbJsonLd({ items }: {
  items: { name: string; path: string }[]
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: absoluteUrl(item.path),
        })),
      }).replace(/</g, "\\u003c") }}
    />
  )
}
