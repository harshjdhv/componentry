import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Instrument_Serif, Syne } from "next/font/google"

import "@workspace/ui/globals.css"
import { Providers } from "@/components/providers"
import { JsonLd } from "@/components/seo/json-ld"

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

const siteUrl = "https://www.componentry.fun"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Componentry - Premium React UI Component Library by Harsh Jadhav",
    template: "%s | Componentry - UI Component Library",
  },
  description: "Componentry is a free, open-source React UI component library by Harsh Jadhav. Beautiful, animated, copy-paste components built with Tailwind CSS, TypeScript, and Framer Motion. The best UI components for modern web applications.",
  keywords: [
    "UI component library",
    "React components",
    "React UI library",
    "UI components",
    "component library",
    "Tailwind CSS components",
    "TypeScript components",
    "Framer Motion",
    "Next.js components",
    "animated components",
    "copy paste components",
    "free UI components",
    "open source components",
    "modern UI",
    "web components",
    "frontend components",
    "design system",
    "Harsh Jadhav",
    "Harsh Jadhav developer",
    "Harsh Jadhav portfolio",
    "harshjdhv",
    "React developer",
    "frontend developer",
    "shadcn alternative",
    "radix ui",
    "beautiful UI",
    "premium components",
    "handcrafted components",
  ],
  authors: [
    { name: "Harsh Jadhav", url: "https://twitter.com/harshjdhv" },
    { name: "Harsh Jadhav", url: "https://github.com/harshjdhv" },
  ],
  creator: "Harsh Jadhav",
  publisher: "Harsh Jadhav",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Componentry - Premium React UI Component Library by Harsh Jadhav",
    description: "Free, open-source React UI components. Beautiful, animated, copy-paste components built with Tailwind CSS, TypeScript & Framer Motion by Harsh Jadhav.",
    siteName: "Componentry",
    images: [
      {
        url: `${siteUrl}/preview-wa.jpg`,
        width: 1200,
        height: 630,
        alt: "Componentry - Premium React UI Component Library",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Componentry - Premium React UI Component Library",
    description: "Free, open-source React UI components by Harsh Jadhav. Beautiful, animated, copy-paste components.",
    images: [`${siteUrl}/preview-wa.jpg`],
    creator: "@harshjdhv",
    site: "@harshjdhv",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  manifest: "/manifest.json",
  category: "technology",
  classification: "UI Component Library",
  other: {
    "msapplication-TileImage": "/preview.png",
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
      "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    }),
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): React.JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body
        className={`${fontSans.variable} ${fontSerif.variable} ${fontDisplay.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
