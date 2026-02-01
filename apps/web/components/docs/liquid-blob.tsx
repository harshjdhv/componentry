import React from "react";
import {
  LiquidBlobDemo,
  LiquidBlobTealDemo,
  LiquidBlobFastDemo,
} from "@/components/docs/previews/liquid-blob-preview";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";

const basicUsageCode = `import { LiquidBlob } from "@/components/ui/liquid-blob"

// Hover over the container to see the interactive effect!
<div className="relative h-[300px] w-full overflow-hidden rounded-xl border bg-zinc-900">
  <LiquidBlob interactive />
  <div className="relative z-10 flex h-full items-center justify-center pointer-events-none">
    <h3 className="text-2xl font-bold text-white">Liquid Blob</h3>
  </div>
</div>`;

const tealThemeCode = `import { LiquidBlob } from "@/components/ui/liquid-blob"

<div className="relative h-[300px] w-full overflow-hidden rounded-xl border bg-zinc-900">
  <LiquidBlob 
    color="#10b981"
    secondaryColor="#06b6d4"
    size={350}
    blur={80}
  />
  <div className="relative z-10 flex h-full items-center justify-center">
    <h3 className="text-2xl font-bold text-white">Teal Theme</h3>
  </div>
</div>`;

const fastAnimationCode = `import { LiquidBlob } from "@/components/ui/liquid-blob"

<div className="relative h-[300px] w-full overflow-hidden rounded-xl border bg-zinc-900">
  <LiquidBlob 
    color="#f97316"
    secondaryColor="#ef4444"
    size={250}
    speed={4}
    opacity={0.8}
  />
  <div className="relative z-10 flex h-full items-center justify-center">
    <h3 className="text-2xl font-bold text-white">Fast Animation</h3>
  </div>
</div>`;

export async function LiquidBlobDocs() {
  const sourceCode =
    (await readComponentSource("liquid-blob")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Liquid Blob"
      description="Animated liquid morphing blob shapes that create a beautiful organic background effect. Perfect for hero sections, cards, and creating depth with glassmorphism style."
      preview={<LiquidBlobDemo />}
      previewCode={basicUsageCode}
      installPackageName="liquid-blob"
      installDependencies="framer-motion clsx tailwind-merge"
      installSourceCode={sourceCode}
      usageCode={basicUsageCode}
      fullWidthPreview={true}
      examples={[
        {
          title: "Teal Theme",
          preview: <LiquidBlobTealDemo />,
          code: tealThemeCode,
          fullWidth: true,
        },
        {
          title: "Fast Animation",
          preview: <LiquidBlobFastDemo />,
          code: fastAnimationCode,
          fullWidth: true,
        },
      ]}
      props={[
        {
          name: "color",
          type: "string",
          default: '"#8b5cf6"',
          description: "Primary blob color.",
        },
        {
          name: "secondaryColor",
          type: "string",
          default: '"#ec4899"',
          description: "Secondary blob color.",
        },
        {
          name: "size",
          type: "number",
          default: "300",
          description: "Base size of the blobs in pixels.",
        },
        {
          name: "blur",
          type: "number",
          default: "60",
          description: "Blur amount for the soft glow effect.",
        },
        {
          name: "speed",
          type: "number",
          default: "8",
          description: "Animation duration in seconds.",
        },
        {
          name: "opacity",
          type: "number",
          default: "0.7",
          description: "Blob opacity from 0 to 1.",
        },
        {
          name: "interactive",
          type: "boolean",
          default: "true",
          description: "Enable mouse hover interaction.",
        },
      ]}
    />
  );
}
