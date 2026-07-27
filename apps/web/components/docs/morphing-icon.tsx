import React from "react";

import {
  MorphingIconPairsPreview,
  MorphingIconPreview,
} from "@/components/docs/previews/morphing-icon-preview";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";

const defaultCode = `"use client"

import { useState } from "react"
import { MorphingIcon } from "@/components/ui/morphing-icon"

export function MenuButton() {
  const [open, setOpen] = useState(false)

  return (
    <button
      type="button"
      onClick={() => setOpen((current) => !current)}
      aria-label={open ? "Close menu" : "Open menu"}
    >
      <MorphingIcon icon={open ? "cross" : "menu"} />
    </button>
  )
}`;

const pairsCode = `"use client"

import { useState } from "react"
import { MorphingIcon } from "@/components/ui/morphing-icon"

export function DisclosureButton() {
  const [expanded, setExpanded] = useState(false)

  return (
    <button
      type="button"
      aria-expanded={expanded}
      onClick={() => setExpanded((current) => !current)}
    >
      <MorphingIcon
        icon={expanded ? "chevron-down" : "chevron-right"}
        size={20}
      />
      Details
    </button>
  )
}`;

export async function MorphingIconDocs() {
  const sourceCode =
    (await readComponentSource("morphing-icon")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Morphing Icon"
      description="A compact set of three-stroke interface icons that transition smoothly between controlled states while remaining interruptible and reduced-motion aware."
      preview={<MorphingIconPreview />}
      previewCode={defaultCode}
      installPackageName="morphing-icon"
      installDependencies="framer-motion clsx tailwind-merge"
      installSourceCode={sourceCode}
      installSourceFilename="components/ui/morphing-icon.tsx"
      usageCode={defaultCode}
      examples={[
        {
          title: "State Pairs",
          preview: <MorphingIconPairsPreview />,
          code: pairsCode,
        },
      ]}
      props={[
        {
          name: "icon",
          type: "MorphingIconName",
          description:
            "The controlled icon state. Changing it triggers the morph.",
        },
        {
          name: "size",
          type: "number",
          default: "24",
          description: "Rendered width and height in pixels.",
        },
        {
          name: "duration",
          type: "number",
          default: "0.28",
          description: "Morph duration in seconds.",
        },
        {
          name: "strokeWidth",
          type: "number",
          default: "1.8",
          description: "SVG stroke width.",
        },
        {
          name: "label",
          type: "string",
          description:
            "Accessible label when the icon conveys meaning on its own. Icons are decorative by default.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional classes applied to the SVG.",
        },
      ]}
    />
  );
}
