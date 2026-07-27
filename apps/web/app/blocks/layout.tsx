import type { Metadata } from "next";

import { BlocksNav } from "@/components/blocks/blocks-nav";
import {
  LandingGuideLines,
  landingGutterClass,
} from "@/components/landing/landing-frame";
import { SiteHeader } from "@/components/site-header";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blocks",
  description: "Production-ready Componentry blocks for React applications.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function BlocksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <LandingGuideLines />
      <SiteHeader />
      <main className="overflow-x-clip pt-14">
        <div
          data-blocks-layout
          className={cn(
            "min-h-[calc(100vh-3.5rem)] overflow-x-clip bg-background",
            landingGutterClass,
          )}
        >
          <BlocksNav />
          <div className="relative overflow-x-clip">{children}</div>
        </div>
      </main>
    </div>
  );
}
