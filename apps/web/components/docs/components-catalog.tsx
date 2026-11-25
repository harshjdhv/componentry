"use client"

import { components, getFeaturedComponents, type ComponentCategory } from "@/registry"
import { ComponentCard } from "@/components/docs/component-card"

const categoryOrder: ComponentCategory[] = [
  "Text Animations",
  "Components",
  "Hero Backgrounds",
  "Visual Effects",
]

/** Every component, grouped by category, with a featured strip on top. Rendered at /docs/components. */
export function ComponentsCatalog() {
  const allComponents = Object.values(components)
  const featured = getFeaturedComponents()
  const grouped = categoryOrder
    .map(cat => ({
      category: cat,
      items: allComponents.filter(c => c.category === cat),
    }))
    .filter(g => g.items.length > 0)

  return (
        <div className="w-full text-zinc-900 dark:text-zinc-100">

        {/* ── Hero ── */}
        <header className="mb-12">
          <h1 className="text-[28px] font-medium leading-[1.1] tracking-[-0.035em] text-zinc-900 sm:text-[32px] dark:text-zinc-50">
            Components
          </h1>
          <p className="mt-3 max-w-xl text-pretty text-[15.5px] leading-7 text-zinc-500 dark:text-zinc-400">
            All {allComponents.length} components. Hover a card to see it move, then open it for the code.
          </p>
        </header>

        {/* Three across from 1400px (87.5rem, same unit as sm: so it sorts after it). */}
        {/* ── Featured (video previews only) ── */}
        {featured.length > 0 && (
          <section id="featured" data-section-title="Featured" className="mb-20 scroll-mt-24">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-[20px] font-medium leading-7 tracking-[-0.02em] text-zinc-900 dark:text-zinc-50">
                Featured
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 min-[87.5rem]:grid-cols-3">
              {featured.map((component, i) => (
                <ComponentCard
                  key={component.slug}
                  component={component}
                  index={i}
                  videoOnly={Boolean(component.previewVideo)}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── Categories ── */}
        <div className="space-y-20">
          {grouped.map(({ category, items }) => {
            return (
              <section key={category} id={category.toLowerCase().replace(/\s+/g, '-')} data-section-title={category} className="scroll-mt-24">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <h2 className="text-[20px] font-medium leading-7 tracking-[-0.02em] text-zinc-900 dark:text-zinc-50">
                    {category}
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 min-[87.5rem]:grid-cols-3">
                  {items.map((component, i) => (
                    <ComponentCard
                      key={component.slug}
                      component={component}
                      index={i}
                    />
                  ))}
                </div>
              </section>
            )
          })}
        </div>


        </div>
  )
}
