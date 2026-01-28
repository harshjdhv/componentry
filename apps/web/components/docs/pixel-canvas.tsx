import React from "react";
import {
  PixelCanvasDemo,
  PixelCanvasTrailDemo,
  PixelCanvasGlowDemo,
  PixelCanvasSubtleDemo,
} from "@/components/docs/previews/pixel-canvas-preview";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";

const basicUsageCode = `import { PixelCanvas } from "@/components/ui/pixel-canvas"

<div className="relative h-[400px] w-full overflow-hidden rounded-xl border bg-neutral-950">
  <PixelCanvas 
    colors={["#e879f9", "#a78bfa", "#38bdf8", "#22d3ee"]}
    speed={0.02}
  />
</div>`;

const trailCode = `import { PixelCanvas } from "@/components/ui/pixel-canvas"

<PixelCanvas 
  variant="trail"
  colors={["#f97316", "#fb923c", "#fbbf24", "#facc15"]}
  gap={8}
  speed={0.015}
/>`;

const glowCode = `import { PixelCanvas } from "@/components/ui/pixel-canvas"

<PixelCanvas 
  variant="glow"
  colors={["#22c55e", "#10b981", "#14b8a6", "#06b6d4"]}
  gap={10}
  speed={0.01}
/>`;

const subtleCode = `import { PixelCanvas } from "@/components/ui/pixel-canvas"

<PixelCanvas 
  colors={["#525252", "#a3a3a3", "#737373"]}
  gap={5}
  speed={0.03}
/>`;

export async function PixelCanvasDocs() {
  const sourceCode =
    (await readComponentSource("pixel-canvas")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Pixel Canvas"
      description="An interactive pixel grid with beautiful trailing effects. Pixels light up under your cursor and smoothly fade with color interpolation. Highly performant and perfect for dark hero sections."
      preview={<PixelCanvasDemo />}
      previewCode={basicUsageCode}
      installDependencies="clsx tailwind-merge"
      installPackageName="pixel-canvas"
      installSourceCode={sourceCode}
      usageCode={basicUsageCode}
      fullWidthPreview={true}
      examples={[
        {
          title: "Trail Variant",
          preview: <PixelCanvasTrailDemo />,
          code: trailCode,
          fullWidth: true,
        },
        {
          title: "Glow Variant",
          preview: <PixelCanvasGlowDemo />,
          code: glowCode,
          fullWidth: true,
        },
        {
          title: "Subtle Monochrome",
          preview: <PixelCanvasSubtleDemo />,
          code: subtleCode,
          fullWidth: true,
        },
      ]}
      props={[
        {
          name: "gap",
          type: "number",
          default: "6",
          description: "Size of the pixel cells in pixels.",
        },
        {
          name: "speed",
          type: "number",
          default: "0.02",
          description:
            "Decay speed of the pixel trail. Lower values create longer trails.",
        },
        {
          name: "colors",
          type: "string[]",
          default: "pink to cyan gradient",
          description:
            "Array of hex colors for the gradient. Pixels interpolate through these colors as they fade.",
        },
        {
          name: "variant",
          type: '"default" | "trail" | "glow"',
          default: '"default"',
          description:
            'Visual variant: "default", "trail" (rounded pixels), or "glow" (adds glow effect).',
        },
        {
          name: "noFocus",
          type: "boolean",
          default: "false",
          description: "Disables mouse/touch tracking.",
        },
      ]}
    />
  );
}
