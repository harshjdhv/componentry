import { absoluteUrl, siteConfig } from "@/lib/site"

export function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/logo-new.svg"),
    sameAs: [
      siteConfig.repository,
      siteConfig.author.twitter,
    ],
    founder: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.author.twitter,
      sameAs: [
        siteConfig.author.twitter,
        siteConfig.author.github,
      ],
    },
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    alternateName: ["Componentry UI", "Componentry Components"],
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.author.twitter,
    },

  }

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    codeRepository: siteConfig.repository,
    programmingLanguage: ["TypeScript", "JavaScript", "React", "CSS"],
    runtimePlatform: "Node.js",
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.author.twitter,
    },
    license: "https://opensource.org/licenses/MIT",
    operatingSystem: "Cross-platform",
    applicationCategory: "DeveloperApplication",
    keywords:
      "React, UI components, Tailwind CSS, TypeScript, Framer Motion, Next.js, component library",
  }

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author.name,
    alternateName: ["harshjdhv", "Harsh"],
    url: siteConfig.author.twitter,
    jobTitle: "Frontend Developer",
    knowsAbout: [
      "React",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Next.js",
      "UI/UX Design",
      "Web Development",
      "Frontend Development",
    ],
    sameAs: [
      siteConfig.author.twitter,
      siteConfig.author.github,
      siteConfig.url,
    ],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": siteConfig.url,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  )
}
