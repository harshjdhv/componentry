import type { Metadata } from "next"
import { pageMetadata } from "@/lib/page-metadata"

export const metadata: Metadata = pageMetadata({
  title: "Sponsor Componentry",
  description: "Support the development of Componentry’s open-source React components and explore sponsorship options.",
  path: "/sponsors",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
