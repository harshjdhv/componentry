import type { Metadata } from "next"

import { absoluteUrl } from "@/lib/site"
import { ComponentsCatalog } from "@/components/docs/components-catalog"

export const metadata: Metadata = {
  title: "All Components",
  description:
    "Browse every Componentry component: animated React components for text, heroes, backgrounds and visual effects. Free, open source, built with Tailwind CSS and Motion.",
  openGraph: {
    title: "All Components | Componentry",
    description: "Browse every animated React component in Componentry. Copy the source or install it with the shadcn CLI.",
  },
  alternates: {
    canonical: absoluteUrl("/docs/components"),
  },
}

export default function ComponentsPage() {
  return <ComponentsCatalog />
}
