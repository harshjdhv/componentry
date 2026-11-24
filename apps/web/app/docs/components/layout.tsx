import type React from "react"
import { DocsInsetShell } from "@/components/docs-inset/docs-inset-shell"

export default function ComponentDocsLayout({ children }: { children: React.ReactNode }) {
  return <DocsInsetShell>{children}</DocsInsetShell>
}
