import React from "react";
import {
  HeroGeometricPlayground,
} from "@/components/docs/previews/hero-geometric-playground";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { LiveCodeBlock } from "@/components/live-code-block";
import { readComponentSource } from "@/lib/source-code";

const basicUsageCode = `import { HeroGeometric } from "@/components/ui/hero-geometric"

<HeroGeometric 
    color1="#3B82F6" 
    color2="#F0F9FF" 
/>`;

export async function HeroGeometricDocs() {
  const sourceCode =
    (await readComponentSource("hero-geometric")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Hero Geometric"
      description="A geometric hero background inspired by premium editorial designs, featuring a custom WebGL shader with Simplex noise for fluid, organic movement."
      preview={<HeroGeometricPlayground />}
      previewCode=""
      installPackageName="hero-geometric"
      installDependencies="@react-three/fiber three"
      installSourceCode={sourceCode}
      usageCode={<LiveCodeBlock defaultCode={basicUsageCode} />}
      fullWidthPreview={true}
      unstyledPreview={true}
      props={[
        {
          name: "color1",
          type: "string",
          default: '"#3B82F6"',
          description: "Primary color for the gradient shader.",
        },
        {
          name: "color2",
          type: "string",
          default: '"#F0F9FF"',
          description: "Secondary color for the gradient shader.",
        },
        {
          name: "speed",
          type: "number",
          default: "1",
          description: "Animation speed multiplier for the shader noise.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes for the container.",
        },
      ]}
    />
  );
}
