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
      <Section title={guide.heading ?? "Inspired by"}>
        <p className="text-pretty text-[15px] leading-7 text-zinc-500 dark:text-zinc-400">
          <GuideCopy
            body={credit.body}
            href={credit.href}
            linkLabel={credit.linkLabel}
          />
          .
        </p>
      </Section>
    )
  }

  // Plain title + copy, held to a readable measure (~70ch). The full column
  // width made lines run ~140 characters.
  return (
    <Section title={guide.heading ?? "Working with this component"} className="pt-8">
      {/* Tips sit on a slight indent under the section heading. One foreground at
          three strengths keeps the block a step below the heading in both themes:
          title 85%, copy 55%. */}
      <div className="max-w-[640px] space-y-6 pl-4">
        {guide.sections.map((section) => (
          <div
            key={section.title || section.href || section.body}
            // Titled tips show as indented subsections in the page outline.
            {...(section.title
              ? {
                  id: `guide-${section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`,
                  "data-section-title": section.title,
                  "data-section-depth": "3",
                }
              : {})}
          >
            {section.title ? (
              <h3 className="mb-1 text-[15px] font-medium leading-6 text-foreground/85">
                {section.title}
              </h3>
            ) : null}
            <p className="text-pretty text-[14.5px] leading-6 text-foreground/55">
              <GuideCopy body={section.body} href={section.href} linkLabel={section.linkLabel} />
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}
