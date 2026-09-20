import type { Metadata } from "next"
import { pageMetadata } from "@/lib/page-metadata"

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description: "Terms for using the Componentry website, component library, and code examples.",
  path: "/terms-of-service",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
