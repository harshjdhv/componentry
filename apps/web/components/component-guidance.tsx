import { Section } from "@/components/component-layout"
import { componentGuides } from "@/lib/component-guides"

export function ComponentGuidance({ slug }: { slug: string }) {
  const guide = componentGuides[slug]
  if (!guide) return null

  return (
    <Section title="Working with this component" className="pt-8">
      <div className="space-y-7">
        {guide.sections.map((section) => (
          <div key={section.title}>
            <h3 className="mb-2 text-[15px] font-medium text-zinc-800 dark:text-zinc-200">{section.title}</h3>
            <p className="text-pretty text-[15px] leading-7 text-zinc-500 dark:text-zinc-400">{section.body}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
