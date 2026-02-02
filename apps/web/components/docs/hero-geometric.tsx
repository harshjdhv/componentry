import React from "react";
import {
  HeroGeometricDemo,
  HeroGeometricWarmDemo,
  HeroGeometricSpeedDemo,
} from "@/components/docs/previews/hero-geometric-preview";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";

const basicUsageCode = `import { HeroGeometric } from "@/components/ui/hero-geometric"

<HeroGeometric 
    title1="Elevate" 
    title2="Your Brand" 
/>`;

const warmThemeCode = `import { HeroGeometric } from "@/components/ui/hero-geometric"

<HeroGeometric 
    color1="#EA580C" 
    color2="#FFF7ED" 
    title1="Warm" 
    title2="Palette" 
/>`;

const highSpeedCode = `import { HeroGeometric } from "@/components/ui/hero-geometric"

<HeroGeometric 
    speed={2} 
    title1="High" 
    title2="Velocity" 
/>`;

export async function HeroGeometricDocs() {
  const sourceCode =
    (await readComponentSource("hero-geometric")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Hero Geometric"
      description="A geometric hero section inspired by premium editorial designs, featuring a custom WebGL shader background with Simplex noise for fluid, organic movement and advanced typography."
      preview={<HeroGeometricDemo />}
      previewCode={basicUsageCode}
      installPackageName="hero-geometric"
      installDependencies="framer-motion @react-three/fiber @react-three/drei three"
      installSourceCode={sourceCode}
      usageCode={basicUsageCode}
      fullWidthPreview={true}
      examples={[
        {
          title: "Warm Theme",
          preview: <HeroGeometricWarmDemo />,
          code: warmThemeCode,
          fullWidth: true,
        },
        {
          title: "Increased Speed",
          preview: <HeroGeometricSpeedDemo />,
          code: highSpeedCode,
          fullWidth: true,
        },
      ]}
      props={[
        {
          name: "title1",
          type: "string",
          description: "First line of the main headline (serif font).",
        },
        {
          name: "title2",
          type: "string",
          description: "Second line of the main headline (sans-serif, bold).",
        },
        {
          name: "description",
          type: "string",
          description: "Subtitle text displayed below the headline.",
        },
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
