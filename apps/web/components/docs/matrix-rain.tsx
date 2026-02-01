import React from "react";
import {
  MatrixRainDemo,
  MatrixRainRainbowDemo,
  MatrixRainCustomDemo,
} from "@/components/docs/previews/matrix-rain-preview";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";

const basicUsageCode = `import { MatrixRain } from "@/components/ui/matrix-rain"

<div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background">
  <MatrixRain />
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <h1 className="text-4xl font-bold text-foreground tracking-wider">
      MATRIX
    </h1>
  </div>
</div>`;

const rainbowCode = `import { MatrixRain } from "@/components/ui/matrix-rain"

<MatrixRain variant="rainbow" />`;

const customCode = `import { MatrixRain } from "@/components/ui/matrix-rain"

<MatrixRain 
  fixedColor="#ec4899" 
  speed={80} 
  fontSize={20}
/>`;

export async function MatrixRainDocs() {
  const sourceCode =
    (await readComponentSource("matrix-rain")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Matrix Rain"
      description="A classic digital rain animation effect consisting of falling characters. Customizable colors, speed, and size. Perfect for hacker themes, sci-fi UIs, or just looking cool."
      preview={<MatrixRainDemo />}
      previewCode={basicUsageCode}
      installDependencies="clsx tailwind-merge"
      installPackageName="matrix-rain"
      installSourceCode={sourceCode}
      usageCode={basicUsageCode}
      fullWidthPreview={true}
      examples={[
        {
          title: "Rainbow Variant",
          preview: <MatrixRainRainbowDemo />,
          code: rainbowCode,
          fullWidth: true,
        },
        {
          title: "Custom Configuration",
          preview: <MatrixRainCustomDemo />,
          code: customCode,
          fullWidth: true,
        },
      ]}
      props={[
        {
          name: "variant",
          type: '"default" | "cyan" | "rainbow"',
          default: '"default"',
          description: "Preset theme for the rain effect.",
        },
        {
          name: "fixedColor",
          type: "string",
          description: "Override the text color with a specific hex color.",
        },
        {
          name: "speed",
          type: "number",
          default: "50",
          description: "Animation interval in ms. Lower is faster.",
        },
        {
          name: "fontSize",
          type: "number",
          default: "16",
          description: "Size of the characters in pixels.",
        },
      ]}
    />
  );
}
