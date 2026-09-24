import { Section } from "@/components/component-layout"
import { componentGuides } from "@/lib/component-guides"

function GuideLink({
  href,
  children,
}: {
  href: string
  children: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="font-medium text-zinc-800 underline decoration-zinc-300 underline-offset-[5px] transition-colors hover:decoration-zinc-500 dark:text-zinc-100 dark:decoration-white/25 dark:hover:decoration-white/55"
    >
      {children}
    </a>
  )
}

function GuideCopy({
  body,
  href,
  linkLabel,
}: {
  body: string
  href?: string
  linkLabel?: string
}) {
  if (!href) return body
  return (
    <>
      {body ? `${body} ` : null}
      <GuideLink href={href}>{linkLabel ?? href}</GuideLink>
    </>
  )
}

export function ComponentGuidance({ slug }: { slug: string }) {
  const guide = componentGuides[slug]
  if (!guide) return null

  if (guide.tone === "credit") {
    const [credit] = guide.sections
    if (!credit) return null
    return (
      <div className="pt-10">
        <p className="mb-2.5 text-[12px] font-medium uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
          {guide.heading ?? "Inspired by"}
        </p>
        <p className="max-w-xl text-pretty text-[17px] font-normal leading-8 tracking-[-0.015em] text-zinc-700 dark:text-zinc-200">
          <GuideCopy
            body={credit.body}
            href={credit.href}
            linkLabel={credit.linkLabel}
          />
          .
        </p>
      </div>
    )
  }

  return (
    <Section title={guide.heading ?? "Working with this component"} className="pt-8">
      <div className="space-y-7">
        {guide.sections.map((section) => (
          <div key={section.title || section.href || section.body}>
            {section.title ? (
              <h3 className="mb-2 text-[15px] font-medium text-zinc-800 dark:text-zinc-200">
                {section.title}
              </h3>
            ) : null}
            <p className="text-pretty text-[15px] leading-7 text-zinc-500 dark:text-zinc-400">
              <GuideCopy
                body={section.body}
                href={section.href}
                linkLabel={section.linkLabel}
              />
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}
