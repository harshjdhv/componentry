import type { Metadata } from "next"
import { absoluteUrl, siteConfig } from "@/lib/site"

export function pageMetadata({ title, description, path }: {
  title: string
  description: string
  path: string
}): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title: fullTitle,
      description,
      url: absoluteUrl(path),
      type: "website",
      siteName: siteConfig.name,
      images: [{ url: absoluteUrl("/opengraph-image.png"), width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl("/opengraph-image.png")],
    },
  }
}
