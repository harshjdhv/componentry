import type React from "react"
import type { Metadata } from "next"
import { Inter, Instrument_Serif, Syne } from "next/font/google"

import "@workspace/ui/globals.css"
import { Providers } from "@/components/providers"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
})

const fontDisplay = Syne({
  subsets: ["latin"],
  variable: "--font-display",
})

export const metadata: Metadata = {
  title: "Component Playground",
  description: "A personal workshop for handcrafted UI components.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || ""),
  openGraph: {
    title: "Component Playground",
    description: "A personal workshop for handcrafted UI components.",
    siteName: "Component Playground",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "Component Playground Preview",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Component Playground",
    description: "A personal workshop for handcrafted UI components.",
    images: ["/preview.png"],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): React.JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontSerif.variable} ${fontDisplay.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
