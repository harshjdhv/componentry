import React from "react";
import { SilkAurora } from "@workspace/ui/components/silk-aurora";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";

const basicUsageCode = `import { SilkAurora } from "@/components/ui/silk-aurora"

<SilkAurora
  title="Silk Aurora"
  subtitle="Premium Atmosphere"
  description="A satin-dark WebGL background with aurora ribbons, pearlescent highlights, fine grain, and cursor-driven depth."
/>`;

const champagneCode = `import { SilkAurora } from "@/components/ui/silk-aurora"

<SilkAurora
  title="Maison Lumiere"
  subtitle="Private Preview"
  description="Quiet motion, warm sheen, and a velvet base for refined product launches."
  baseColor="#060505"
  midColor="#19130f"
  sheenColor="#ffe2a9"
  accentColor="#c58d5d"
  intensity={0.9}
  speed={0.75}
/>`;

const editorialCode = `import { SilkAurora } from "@/components/ui/silk-aurora"

<SilkAurora
  title="Nocturne Index"
  subtitle="Editorial Systems"
  description="A cooler metallic palette for dashboards, media covers, and cinematic editorial moments."
  baseColor="#030407"
  midColor="#101827"
  sheenColor="#d6e8ff"
  accentColor="#86f0dc"
  intensity={1.15}
  grain={0.7}
/>`;

export async function SilkAuroraDocs() {
  const sourceCode =
    (await readComponentSource("silk-aurora")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Silk Aurora"
      description="A premium WebGL hero background with satin-dark aurora ribbons, pearlescent highlights, subtle grain, and optional cursor depth."
      preview={
        <div className="relative h-full w-full bg-[#f3f4f6] dark:bg-background">
          <SilkAurora
            title="Silk Aurora"
            subtitle="Premium Atmosphere"
            description="Polished motion for luxury product heroes, editorial launches, and high-end SaaS moments."
            className="h-full w-full min-h-0"
          />
        </div>
      }
      previewCode={basicUsageCode}
      installPackageName="silk-aurora"
      installSourceCode={sourceCode}
      usageCode={basicUsageCode}
      fullWidthPreview
      unstyledPreview
      examples={[
        {
          title: "Champagne",
          preview: (
            <div className="relative h-full w-full bg-[#f3f4f6] dark:bg-background">
              <SilkAurora
                title="Maison Lumiere"
                subtitle="Private Preview"
                description="Quiet motion, warm sheen, and a velvet base for refined product launches."
                baseColor="#060505"
                midColor="#19130f"
                sheenColor="#ffe2a9"
                accentColor="#c58d5d"
                intensity={0.9}
                speed={0.75}
                className="h-full w-full min-h-0"
              />
            </div>
          ),
          code: champagneCode,
          fullWidth: true,
        },
        {
          title: "Editorial",
          preview: (
            <div className="relative h-full w-full bg-[#f3f4f6] dark:bg-background">
              <SilkAurora
                title="Nocturne Index"
                subtitle="Editorial Systems"
                description="A cooler metallic palette for dashboards, media covers, and cinematic editorial moments."
                baseColor="#030407"
                midColor="#101827"
                sheenColor="#d6e8ff"
                accentColor="#86f0dc"
                intensity={1.15}
                grain={0.7}
                className="h-full w-full min-h-0"
              />
            </div>
          ),
          code: editorialCode,
          fullWidth: true,
        },
      ]}
      props={[
        {
          name: "title",
          type: "string",
          default: '"Silk Aurora"',
          description: "Primary hero headline rendered above the background.",
        },
        {
          name: "subtitle",
          type: "string",
          default: '"Premium Atmosphere"',
          description: "Small uppercase label rendered above the title.",
        },
        {
          name: "description",
          type: "string",
          description: "Supporting copy rendered below the title.",
        },
        {
          name: "baseColor",
          type: "string",
          default: '"#050507"',
          description: "Deepest background color.",
        },
        {
          name: "midColor",
          type: "string",
          default: '"#14151d"',
          description: "Secondary base color for atmospheric depth.",
        },
        {
          name: "sheenColor",
          type: "string",
          default: '"#f4dfb8"',
          description: "Pearlescent highlight color.",
        },
        {
          name: "accentColor",
          type: "string",
          default: '"#6ed6c9"',
          description: "Aurora ribbon accent color.",
        },
        {
          name: "speed",
          type: "number",
          default: "1",
          description: "Global animation speed multiplier.",
        },
        {
          name: "intensity",
          type: "number",
          default: "1",
          description: "Strength of aurora ribbons, glints, and sheen.",
        },
        {
          name: "grain",
          type: "number",
          default: "0.85",
          description: "Amount of fine shader grain.",
        },
        {
          name: "vignette",
          type: "number",
          default: "1",
          description: "Edge darkening strength.",
        },
        {
          name: "mouseInfluence",
          type: "number",
          default: "1",
          description: "Cursor-driven distortion strength.",
        },
        {
          name: "interactive",
          type: "boolean",
          default: "true",
          description: "Enables pointer movement response.",
        },
        {
          name: "children",
          type: "ReactNode",
          description: "Custom content rendered above the background.",
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
