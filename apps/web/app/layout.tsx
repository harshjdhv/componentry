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
  title: "Componentry - Premium UI Components",
  description: "A curated collection of handcrafted React components. Meticulously designed, beautifully animated, and built for modern interfaces.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://componentry.dev"),
  keywords: ["React", "UI Components", "Tailwind CSS", "TypeScript", "Framer Motion", "Next.js"],
  authors: [{ name: "Harsh" }],
  creator: "Harsh",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Componentry - Premium UI Components",
    description: "Handcrafted React components. Beautifully animated.",
    siteName: "Componentry",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "Componentry - Premium UI Components",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Componentry - Premium UI Components",
    description: "Handcrafted React components. Beautifully animated.",
    images: ["/preview.png"],
    creator: "@harshjdhv",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  other: {
    "msapplication-TileImage": "/preview.png",
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
