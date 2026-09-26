import type React from "react";
import type { Metadata, Viewport } from "next";
import {
  Geist,
  JetBrains_Mono,
  Instrument_Serif,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";
import { JsonLd } from "@/components/seo/json-ld";
import { RouteScrollbarController } from "@/components/route-scrollbar-controller";
import { absoluteUrl, siteConfig } from "@/lib/site";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const fontSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
  display: "swap",
});

const fontDisplay = Geist({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1A61EC" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | Componentry - UI Component Library",
  },
  description: siteConfig.description,
  keywords: [
    "Componentry",
    "Componentry UI",
    "componentry.dev",
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
    "React developer",
    "frontend developer",
    "shadcn alternative",
    "radix ui",
    "beautiful UI",
    "premium components",
    "handcrafted components",
  ],
  authors: [
    { name: siteConfig.author.name, url: siteConfig.author.twitter },
    { name: siteConfig.author.name, url: siteConfig.author.github },
  ],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: absoluteUrl("/opengraph-image.png"),
        width: 1200,
        height: 630,
        alt: "Componentry - Premium React UI Component Library",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Componentry - Premium React UI Component Library",
    description: siteConfig.description,
    images: [
      {
        url: absoluteUrl("/opengraph-image.png"),
        width: 1200,
        height: 630,
        alt: "Componentry - Premium React UI Component Library",
      },
    ],
    creator: siteConfig.author.handle,
    site: siteConfig.author.handle,
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
    icon: "/logo-new.svg",
    shortcut: "/logo-new.svg",
    apple: "/logo-new.svg",
  },
  manifest: "/manifest.json",
  category: "technology",
  classification: "UI Component Library",
  other: {
    "msapplication-TileImage": "/opengraph-image.png",
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
      "google-site-verification":
        process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      style={{ backgroundColor: "#0a0a0a", colorScheme: "dark" }}
    >
      <Analytics />
      <head>
        <JsonLd />
      </head>
      <body
        className={`${fontSans.variable} ${fontMono.variable} ${fontSerif.variable} ${fontDisplay.variable} relative font-sans antialiased`}
        style={
          { "--font-heading": "var(--font-display)" } as React.CSSProperties
        }
      >
        <div className="isolate relative flex min-h-svh flex-col">
          <RouteScrollbarController />
          <Providers>{children}</Providers>
        </div>
        <SpeedInsights />
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="26f17963-74a5-48ce-8d5c-6cebb2ca2baa"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
