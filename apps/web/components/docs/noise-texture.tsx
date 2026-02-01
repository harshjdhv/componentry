import React from "react";
import {
  NoiseTextureDemo,
  NoiseTextureCoarseDemo,
  NoiseTextureStaticDemo,
} from "@/components/docs/previews/noise-texture-preview";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";

const basicUsageCode = `import { NoiseTexture } from "@/components/ui/noise-texture"

<div className="relative h-[300px] w-full overflow-hidden rounded-xl border bg-gradient-to-br from-violet-500 to-pink-500">
  <NoiseTexture />
  <div className="relative z-10 flex h-full items-center justify-center">
    <h3 className="text-2xl font-bold text-white">Noise Texture</h3>
  </div>
</div>`;

const coarseGrainCode = `import { NoiseTexture } from "@/components/ui/noise-texture"

<NoiseTexture 
  grain="coarse"
  opacity={0.2}
/>`;

const staticNoiseCode = `import { NoiseTexture } from "@/components/ui/noise-texture"

<NoiseTexture 
  grain="fine"
  opacity={0.25}
  animate={false}
/>`;

export async function NoiseTextureDocs() {
  const sourceCode =
    (await readComponentSource("noise-texture")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Noise Texture"
      description="An animated noise/grain texture overlay effect. Adds a film grain aesthetic to any background with customizable grain size, animation speed, and blend modes."
      preview={<NoiseTextureDemo />}
      previewCode={basicUsageCode}
      installPackageName="noise-texture"
      installDependencies="clsx tailwind-merge"
      installSourceCode={sourceCode}
      usageCode={basicUsageCode}
      fullWidthPreview={true}
      examples={[
        {
          title: "Coarse Grain",
          preview: <NoiseTextureCoarseDemo />,
          code: coarseGrainCode,
          fullWidth: true,
        },
        {
          title: "Static Noise",
          preview: <NoiseTextureStaticDemo />,
          code: staticNoiseCode,
          fullWidth: true,
        },
      ]}
      props={[
        {
          name: "opacity",
          type: "number",
          default: "0.15",
          description: "Noise overlay opacity from 0 to 1.",
        },
        {
          name: "speed",
          type: "number",
          default: "10",
          description: "Animation frames per second.",
        },
        {
          name: "grain",
          type: '"fine" | "medium" | "coarse"',
          default: '"medium"',
          description: "Grain size preset.",
        },
        {
          name: "blend",
          type: '"overlay" | "soft-light" | "multiply" | "screen"',
          default: '"overlay"',
          description: "CSS blend mode for the noise overlay.",
        },
        {
          name: "animate",
          type: "boolean",
          default: "true",
          description: "Enable/disable animation.",
        },
      ]}
    />
  );
}
