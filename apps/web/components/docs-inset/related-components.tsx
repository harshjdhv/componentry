"use client"

import { components, type ComponentMetadata } from "@/registry"
import { docsConfig } from "@/config/docs"
import { ComponentCard } from "@/components/docs/component-card"
import { Section } from "@/components/component-layout"

const COUNT = 3

/** Components in sidebar order, so "related" follows the same order people browse in. */
const ordered: ComponentMetadata[] = docsConfig.nav
  .flatMap((group) => group.items)
  .map((item) => components[item.href.split("/").pop() ?? ""])
  .filter((c): c is ComponentMetadata => Boolean(c))

const hasMedia = (c: ComponentMetadata) => Boolean(c.previewVideo || c.previewImage)

/**
 * Up to three components with a preview video/poster: same category first,
 * starting two after the current one (the next one is in the pagination below;
 * neighbouring pages show different picks),
 * then topped up from other categories.
 */
function pickRelated(slug: string): ComponentMetadata[] {
  const current = components[slug]
  if (!current) return []

  const index = ordered.findIndex((c) => c.slug === slug)
  // Skip the next component: the pagination link right below already offers it.
  const rotated = [...ordered.slice(index + 2), ...ordered.slice(0, index)].filter(hasMedia)

  const sameCategory = rotated.filter((c) => c.category === current.category)
  const others = rotated.filter((c) => c.category !== current.category)
  return [...sameCategory, ...others].slice(0, COUNT)
}

export function RelatedComponents({ slug }: { slug: string }) {
  const related = pickRelated(slug)
  if (related.length === 0) return null

  return (
    <Section title="Related components">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {related.map((component, i) => (
          <ComponentCard
            key={component.slug}
            component={component}
            index={i}
            videoOnly
            size="compact"
          />
        ))}
      </div>
    </Section>
  )
}
