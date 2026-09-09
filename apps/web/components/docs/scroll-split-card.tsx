import React from "react";
import { readComponentSource } from "@/lib/source-code";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { ScrollSplitCardPreview } from "@/components/docs/previews/scroll-split-card-preview";

const usageCode = `"use client"

import { useRef } from "react"
import { ScrollSplitCard } from "@/components/ui/scroll-split-card"

export function Example() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      data-lenis-prevent
      className="relative h-[100dvh] w-full overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      <ScrollSplitCard
        containerRef={containerRef}
        imageSrc="https://images.unsplash.com/photo-1773058373644-74e4120bfc77?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        cards={[
          {
            title: "Going Zero to One",
            description: "If you're navigating a new business... breaking into a new market.",
            bgColor: "#e2e2e2",
            textColor: "#111111"
          },
          {
            title: "Scaling from One to N",
            description: "If you've achieved Product/Market Fit...",
            bgColor: "#1a5bcf",
            textColor: "#ffffff"
          },
          {
            title: "Need Quick Solutions",
            description: "If you know exactly what you want and need...",
            bgColor: "#1c1c1c",
            textColor: "#ffffff"
          }
        ]}
      />
    </div>
  )
}`;

const previewCode = `"use client"

import { useRef } from "react"
import { ScrollSplitCard } from "@/components/ui/scroll-split-card"

export function ScrollSplitCardPreview() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="w-full h-full overflow-y-auto relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <ScrollSplitCard
        containerRef={containerRef}
        className="h-[250vh]"
        imageSrc="https://images.unsplash.com/photo-1773058373644-74e4120bfc77?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        cards={[
          { title: "Going Zero to One", description: "...", bgColor: "#e2e2e2", textColor: "#111111" },
          { title: "Scaling from One to N", description: "...", bgColor: "#1a5bcf", textColor: "#ffffff" },
          { title: "Need Quick Solutions", description: "...", bgColor: "#1c1c1c", textColor: "#ffffff" }
        ]}
      />
    </div>
  )
}`;

export async function ScrollSplitCardDocs() {
  const sourceCode = (await readComponentSource("scroll-split-card")) || "// Unable to load source code";
  return (
    <DocsPageLayout
      title="Scroll Split Card"
      description="A scroll-driven interactive card component that separates into three panels and flips to reveal custom content, inspired by high-end landing page motion."
      preview={<ScrollSplitCardPreview />}
      previewCode={previewCode}
      installPackageName="scroll-split-card"
      installSourceCode={sourceCode}
      installDependencies="framer-motion"
      props={[
        { name: "imageSrc", type: "string", description: "Image split across the three panels." },
        { name: "cards", type: "ScrollSplitCardItem[]", description: "Three cards with title, description, bgColor, textColor and an optional icon." },
        { name: "containerRef", type: "React.RefObject<HTMLElement | null>", description: "Optional scroll container; otherwise tracks page scrolling." },
        { name: "className", type: "string", description: "Styles for the outer scroll region; controls its scroll distance." },
      ]}
      usageCode={usageCode}
      fullWidthPreview={true}
    />
  );
}
