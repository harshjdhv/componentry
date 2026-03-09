import type React from "react"
import type { Metadata } from "next"

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



export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <div className="min-h-svh flex flex-col bg-background">
      <div className="flex-1 flex flex-col">
        {/* Main content - Full screen split view handled by pages */}
        <main className="flex-1 w-full flex flex-col">
          {children}
        </main>
      </div>
    </div>
  )
}
