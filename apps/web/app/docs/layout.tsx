import type React from "react"
import type { Metadata } from "next"
import { cookies } from "next/headers"
import { LegacyDocsWrapper } from "@/components/legacy-docs-wrapper"

export const metadata: Metadata = {
  title: "Components Documentation",
  description: "Browse the complete collection of Componentry UI components. Free, open-source React components with copy-paste code, Tailwind CSS styling, and Framer Motion animations by Harsh Jadhav.",
  openGraph: {
    title: "UI Components Documentation | Componentry by Harsh Jadhav",
    description: "Browse all React UI components. Copy-paste ready code with Tailwind CSS and Framer Motion.",
  },
  alternates: {
    canonical: "https://componentry.fun/docs",
  },
}

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode
}): Promise<React.JSX.Element> {
  const cookieStore = await cookies()
  const isLegacy = cookieStore.get("docs_layout")?.value === "legacy"

  if (isLegacy) {
    return <LegacyDocsWrapper>{children}</LegacyDocsWrapper>
  }

  return (
    <div className="min-h-svh flex flex-col bg-background">
      <div className="flex-1 flex overflow-hidden">
        {/* Main content - Full screen split view handled by pages */}
        <main className="flex-1 w-full h-full">
          {children}
        </main>
      </div>
    </div>
  )
}
