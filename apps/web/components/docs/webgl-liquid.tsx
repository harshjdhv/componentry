import React from "react";
import { WebGLLiquidPlayground } from "@/components/docs/previews/webgl-liquid-playground";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { LiveCodeBlock } from "@/components/live-code-block";
import { readComponentSource } from "@/lib/source-code";

const basicUsageCode = `import { WebGLLiquid } from "@/components/ui/webgl-liquid"

<WebGLLiquid
  title="Fluid Motion"
  subtitle="Premium Presence"
/>`;

export async function WebGLLiquidDocs() {
  const sourceCode =
    (await readComponentSource("webgl-liquid")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="WebGL Liquid"
      description="A premium liquid hero background powered by raw WebGL shaders, with configurable palette, grain, reveal timing, and flow behavior."
      preview={<WebGLLiquidPlayground />}
      previewCode=""
      installPackageName="webgl-liquid"
      installSourceCode={sourceCode}
      usageCode={<LiveCodeBlock defaultCode={basicUsageCode} />}
      fullWidthPreview={true}
      unstyledPreview={true}
      props={[
        {
          name: "title",
          type: "string",
          default: '"Fluid Motion"',
          description: "Primary headline line.",
        },
        {
          name: "subtitle",
          type: "string",
          default: '"Premium Presence"',
          description: "Secondary headline line.",
        },
        {
          name: "description",
          type: "string",
          description: "Supporting hero copy below the title.",
        },
        {
          name: "colorDeep",
          type: "string",
          default: '"#04050b"',
          description: "Base dark tone used in the liquid gradient.",
        },
        {
          name: "colorMid",
          type: "string",
          default: '"#134d93"',
          description: "Mid tone for blending transitions.",
        },
        {
          name: "colorHighlight",
          type: "string",
          default: '"#8cecff"',
          description: "Highlight tone for bright accents and glow.",
        },
        {
          name: "speed",
          type: "number",
          default: "1",
          description: "Global animation speed multiplier.",
        },
        {
          name: "flowStrength",
          type: "number",
          default: "1",
          description: "Intensity of flow distortion and liquid drift.",
        },
        {
          name: "grain",
          type: "number",
          default: "0.05",
          description: "Dither grain amount applied in the shader.",
        },
        {
          name: "contrast",
          type: "number",
          default: "1.1",
          description: "Shader contrast applied after color mixing.",
        },
        {
          name: "opacity",
          type: "number",
          default: "0.95",
          description: "Overall alpha of the liquid layer.",
        },
        {
          name: "reveal",
          type: "boolean",
          default: "true",
          description: "Enables left-to-right entrance wipe.",
        },
        {
          name: "delayMs",
          type: "number",
          default: "0",
          description: "Delay before animation/reveal begins, in milliseconds.",
        },
        {
          name: "revealDuration",
          type: "number",
          default: "1.2",
          description: "Duration of the reveal wipe in seconds.",
        },
        {
          name: "children",
          type: "ReactNode",
          description: "Custom content rendered above the liquid background.",
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
