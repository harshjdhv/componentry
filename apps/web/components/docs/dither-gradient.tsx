import React from "react";
import {
  DitherGradientDemo,
  DitherGradientOceanDemo,
  DitherGradientSunsetDemo,
} from "@/components/docs/previews/dither-gradient-preview";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";

const basicUsageCode = `import { DitherGradient } from "@/components/ui/dither-gradient"

<div className="relative h-[300px] w-full overflow-hidden rounded-xl border bg-background">
  <DitherGradient />
  <div className="relative z-10 flex h-full items-center justify-center">
    <h3 className="text-2xl font-bold text-white">Dither Gradient</h3>
  </div>
</div>`;

const oceanThemeCode = `import { DitherGradient } from "@/components/ui/dither-gradient"

<div className="relative h-[300px] w-full overflow-hidden rounded-xl border bg-background">
  <DitherGradient 
    colorFrom="#06b6d4"
    colorMid="#10b981"
    colorTo="#84cc16"
  />
  <div className="relative z-10 flex h-full items-center justify-center">
    <h3 className="text-2xl font-bold text-white">Ocean to Forest</h3>
  </div>
</div>`;

const sunsetThemeCode = `import { DitherGradient } from "@/components/ui/dither-gradient"

<div className="relative h-[300px] w-full overflow-hidden rounded-xl border bg-background">
  <DitherGradient 
    colorFrom="#f97316"
    colorMid="#ef4444"
    colorTo="#be185d"
    intensity={0.2}
    speed={4}
    angle={120}
  />
  <div className="relative z-10 flex h-full items-center justify-center">
    <h3 className="text-2xl font-bold text-white">Sunset Fire</h3>
  </div>
</div>`;

export async function DitherGradientDocs() {
  const sourceCode =
    (await readComponentSource("dither-gradient")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Dither Gradient"
      description="An animated dithered gradient background effect using canvas with Bayer matrix dithering. Creates a beautiful retro-style aesthetic with customizable colors and animation."
      preview={<DitherGradientDemo />}
      previewCode={basicUsageCode}
      installPackageName="dither-gradient"
      installDependencies="clsx tailwind-merge"
      installSourceCode={sourceCode}
      usageCode={basicUsageCode}
      fullWidthPreview={true}
      examples={[
        {
          title: "Ocean to Forest",
          preview: <DitherGradientOceanDemo />,
          code: oceanThemeCode,
          fullWidth: true,
        },
        {
          title: "Sunset Fire",
          preview: <DitherGradientSunsetDemo />,
          code: sunsetThemeCode,
          fullWidth: true,
        },
      ]}
      props={[
        {
          name: "colorFrom",
          type: "string",
          default: '"#6366f1"',
          description: "Start color of the gradient.",
        },
        {
          name: "colorMid",
          type: "string",
          default: '"#8b5cf6"',
          description: "Middle color of the gradient.",
        },
        {
          name: "colorTo",
          type: "string",
          default: '"#ec4899"',
          description: "End color of the gradient.",
        },
        {
          name: "intensity",
          type: "number",
          default: "0.15",
          description: "Dithering intensity from 0 to 1.",
        },
        {
          name: "speed",
          type: "number",
          default: "3",
          description: "Animation speed multiplier.",
        },
        {
          name: "angle",
          type: "number",
          default: "45",
          description: "Gradient angle in degrees.",
        },
      ]}
    />
  );
}
