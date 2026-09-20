import type { Metadata } from "next"
import { pageMetadata } from "@/lib/page-metadata"

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Componentry collects, uses, and handles information when you use the website.",
  path: "/privacy-policy",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
