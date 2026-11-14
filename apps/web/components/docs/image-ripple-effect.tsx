import React from "react";
import { ImageRippleEffectPlayground } from "@/components/docs/previews/image-ripple-effect-playground";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { LiveCodeBlock } from "@/components/live-code-block";
import { readComponentSource } from "@/lib/source-code";
import { Download } from "lucide-react";

const basicUsageCode = `import { ImageRippleEffect } from "@/components/ui/image-ripple-effect"

const images = [
  { src: "/images/picture.jpg", x: 0, y: 0, widthScale: 0.34, heightScale: 0.42 },
]

<ImageRippleEffect
  images={images}
/>`;

export async function ImageRippleEffectDocs() {
  const sourceCode =
    (await readComponentSource("image-ripple-effect")) ||
    "// Unable to load source code";
  const usageNote = (
    <div className="mb-4 flex flex-col gap-2 rounded-lg border border-orange-500/20 bg-orange-500/10 p-4 text-sm text-orange-900 dark:text-orange-200">
      <p>
        <strong>Brush Asset Note:</strong> This component works without any extra
        file using its built-in radial brush. If you set
        <code className="rounded bg-orange-500/20 px-1 py-0.5">
          brushTextureUrl=&quot;/brush.png&quot;
        </code>
        , then your project must include that file under
        <code className="rounded bg-orange-500/20 px-1 py-0.5">public/brush.png</code>.
      </p>
      <a
        href="/brush.png"
        download="brush.png"
        className="mt-1 inline-flex w-fit items-center gap-2 rounded-md bg-orange-500/20 px-3 py-1.5 font-medium transition-colors hover:bg-orange-500/30"
      >
        <Download className="h-4 w-4" />
        Download brush.png
      </a>
    </div>
  );

  return (
    <DocsPageLayout
      title="Image Ripple Effect"
      description="A WebGL image ripple component powered by React Three Fiber. Cursor movement paints displacement waves that refract image cards in real time."
      preview={<ImageRippleEffectPlayground />}
      previewCode=""
      installPackageName="image-ripple-effect"
      installDependencies="three @types/three @react-three/fiber @react-three/drei clsx tailwind-merge"
      installSourceCode={sourceCode}
      usageNote={usageNote}
      usageCode={<LiveCodeBlock defaultCode={basicUsageCode} />}
      fullWidthPreview
      unstyledPreview
      props={[
        {
          name: "images",
          type: "RippleImageItem[]",
          default: "gradient demo images",
          description:
            "Image descriptors. Each item accepts src, x, y, widthScale and heightScale.",
        },
        {
          name: "brushTextureUrl",
          type: "string",
          default: "generated radial brush",
          description: "Brush texture used for displacement stamps.",
        },
        {
          name: "distortionStrength",
          type: "number",
          default: "0.075",
          description: "How strongly waves distort sampled image UVs.",
        },
        {
          name: "waveCount",
          type: "number",
          default: "100",
          description: "Pool size for simultaneous ripple waves.",
        },
        {
          name: "waveSize",
          type: "number",
          default: "48",
          description: "Base wave stamp plane size.",
        },
        {
          name: "waveRotationSpeed",
          type: "number",
          default: "0.025",
          description: "Per-frame rotation speed of each visible wave.",
        },
        {
          name: "waveFadeMultiplier",
          type: "number",
          default: "0.95",
          description: "Opacity multiplier applied per frame (lower fades faster).",
        },
        {
          name: "waveGrowth",
          type: "number",
          default: "0.155",
          description: "How fast each wave expands while fading.",
        },
        {
          name: "waveSpawnThreshold",
          type: "number",
          default: "0.1",
          description: "Minimum pointer delta required to spawn a new ripple.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional classes for the root container.",
        },
        {
          name: "children",
          type: "ReactNode",
          description: "Optional overlay content rendered above the canvas.",
        },
      ]}
    />
  );
}
