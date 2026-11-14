import React from "react";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { HoverTransitionPlayground } from "@/components/docs/previews/hover-transition-playground";
import { LiveCodeBlock } from "@/components/live-code-block";
import { readComponentSource } from "@/lib/source-code";

const usageCode = `"use client"

import { HoverTransition } from "@/components/ui/hover-transition"

function DefaultCard() {
  return (
    <article className="relative flex h-full flex-col justify-between overflow-hidden bg-[#ece9e1] p-6 text-[#151515]">
      <span className="text-xs font-medium uppercase tracking-[0.16em] text-black/50">
        Product Designer
      </span>
      <div aria-hidden="true" className="absolute inset-0 grid place-items-center text-[9rem] font-semibold tracking-[-0.08em] text-black/[0.06]">
        MC
      </div>
      <div className="relative">
        <h3 className="text-3xl font-medium tracking-[-0.05em]">Maya Chen</h3>
        <p className="mt-1 text-sm text-black/55">Designing thoughtful digital products.</p>
      </div>
    </article>
  )
}

function HoverCard() {
  return (
    <article className="flex h-full flex-col justify-between bg-[#dfff5f] p-6 text-[#111]">
      <p className="max-w-[24ch] text-xl font-medium leading-tight tracking-[-0.035em]">
        Turning complex product ideas into clear, expressive experiences that people enjoy using.
      </p>
      <div>
        <p className="font-semibold">Maya Chen</p>
        <p className="mt-1 text-xs uppercase tracking-[0.12em] text-black/55">
          Product Designer
        </p>
      </div>
    </article>
  )
}

export default function HoverTransitionDemo() {
  return (
    <HoverTransition
      effect="wipe"
      direction="right"
      duration={0.72}
      defaultComponent={<DefaultCard />}
      hoverComponent={<HoverCard />}
      className="aspect-[4/5] w-full max-w-sm rounded-3xl"
    />
  )
}`;

export async function HoverTransitionDocs() {
  const sourceCode =
    (await readComponentSource("hover-transition")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Hover Transition"
      description="A flexible hover wrapper with eight polished transitions, per-card direction and color controls, custom default and hover content, adjustable timing, and a built-in fallback card."
      preview={<HoverTransitionPlayground />}
      previewCode=""
      installPackageName="hover-transition"
      installDependencies="clsx tailwind-merge"
      installSourceCode={sourceCode}
      installSourceFilename="components/ui/hover-transition.tsx"
      usageCode={<LiveCodeBlock defaultCode={usageCode} />}
      fullWidthPreview
      unstyledPreview
      props={[
        {
          name: "defaultComponent",
          type: "React.ReactNode",
          default: "fallback card",
          description:
            "Content shown before the pointer or keyboard focus enters.",
        },
        {
          name: "hoverComponent",
          type: "React.ReactNode",
          default: "fallback hover card",
          description: "Content revealed by the selected hover effect.",
        },
        {
          name: "effect",
          type: '"wipe" | "ripple" | "parallax" | "curtain" | "diagonal" | "morph" | "strips" | "slide"',
          default: '"wipe"',
          description: "The transition style used to swap the two components.",
        },
        {
          name: "direction",
          type: '"top" | "right" | "bottom" | "left" | "top-left" | "top-right" | "bottom-right" | "bottom-left" | "center"',
          default: '"right"',
          description:
            "The origin or travel direction used by the active effect.",
        },
        {
          name: "duration",
          type: "number",
          default: "0.72",
          description: "Animation duration in seconds.",
        },
        {
          name: "easing",
          type: "string",
          default: '"cubic-bezier(0.22, 1, 0.36, 1)"',
          description: "Any valid CSS easing value.",
        },
        {
          name: "label",
          type: "string",
          default: '"Interactive hover transition"',
          description: "Accessible label for the focusable transition wrapper.",
        },
        {
          name: "className",
          type: "string",
          description:
            "Sizing, radius, and layout classes for the outer wrapper.",
        },
      ]}
    />
  );
}
