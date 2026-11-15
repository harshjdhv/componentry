import React from "react";
import { ClosingPlasmaPlayground } from "@/components/docs/previews/closing-plasma-playground";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { LiveCodeBlock } from "@/components/live-code-block";
import { readComponentSource } from "@/lib/source-code";

const basicUsageCode = `import { ClosingPlasma } from "@/components/ui/closing-plasma"

<div className="w-full h-screen">
  <ClosingPlasma
    speed={1}
  />
</div>`;

export async function ClosingPlasmaDocs() {
  const sourceCode =
    (await readComponentSource("closing-plasma")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Closing Plasma"
      description="A premium footer-ready plasma background with atmospheric noise and smooth pointer-driven flow."
      preview={<ClosingPlasmaPlayground />}
      previewCode=""
      installPackageName="closing-plasma"
      installSourceCode={sourceCode}
      usageCode={<LiveCodeBlock defaultCode={basicUsageCode} />}
      fullWidthPreview={true}
      unstyledPreview={true}
      props={[
        {
          name: "speed",
          type: "number",
          default: "1",
          description: "Animation speed multiplier.",
        },
        {
          name: "turbulence",
          type: "number",
          default: "1",
          description: "Amount of layered FBM deformation.",
        },
        {
          name: "mouseInfluence",
          type: "number",
          default: "1",
          description: "Strength of pointer distortion.",
        },
        {
          name: "grain",
          type: "number",
          default: "1",
          description: "Procedural grain intensity.",
        },
        {
          name: "sparkle",
          type: "number",
          default: "1",
          description: "Sparkle highlight intensity.",
        },
        {
          name: "vignette",
          type: "number",
          default: "1",
          description: "Edge falloff intensity.",
        },
        {
          name: "opacity",
          type: "number",
          default: "1",
          description: "Final alpha of the plasma output.",
        },
        {
          name: "interactive",
          type: "boolean",
          default: "true",
          description: "Enables pointer interaction and drift response.",
        },
        {
          name: "darkColorA",
          type: "string",
          default: '"#0d0d14"',
          description: "Dark palette base tone.",
        },
        {
          name: "darkColorB",
          type: "string",
          default: '"#1f2540"',
          description: "Dark palette mid tone.",
        },
        {
          name: "darkColorC",
          type: "string",
          default: '"#4a6191"',
          description: "Dark palette highlight tone.",
        },
        {
          name: "lightColorA",
          type: "string",
          default: '"#f0f2f7"',
          description: "Light palette base tone.",
        },
        {
          name: "lightColorB",
          type: "string",
          default: '"#d7dceb"',
          description: "Light palette mid tone.",
        },
        {
          name: "lightColorC",
          type: "string",
          default: '"#bcc5e0"',
          description: "Light palette highlight tone.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes for the root container.",
        },
      ]}
    />
  );
}
