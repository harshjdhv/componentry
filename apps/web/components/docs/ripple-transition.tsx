import React from "react";
import { RippleTransitionPlayground } from "@/components/docs/previews/ripple-transition-playground";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { LiveCodeBlock } from "@/components/live-code-block";
import { readComponentSource } from "@/lib/source-code";

const usageCode = `import { RippleTransition } from "@/components/ui/ripple-transition"

const images = [
  "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=85&w=1800",
  "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&q=85&w=1800",
  "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=85&w=1800",
]

<RippleTransition
  images={images}
  className="h-[520px] w-full"
  autoPlay
  autoPlayInterval={3200}
  autoPlayOrigin="random"
  duration={1.4}
  pinch
/>`;

export async function RippleTransitionDocs() {
  const sourceCode =
    (await readComponentSource("ripple-transition")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Ripple Transition"
      description="A WebGL image transition that sends a noisy refractive wave across nature photos, with chromatic edges, glow, pinch, autoplay, and click-triggered origins."
      preview={<RippleTransitionPlayground />}
      previewCode=""
      installPackageName="ripple-transition"
      installDependencies="framer-motion clsx tailwind-merge"
      installSourceCode={sourceCode}
      usageCode={<LiveCodeBlock defaultCode={usageCode} />}
      fullWidthPreview
      unstyledPreview
      props={[
        {
          name: "images",
          type: "readonly string[]",
          default: "nature images",
          description: "Image URLs to transition through. Use at least two for swaps.",
        },
        {
          name: "duration",
          type: "number",
          default: "1.4",
          description: "Transition duration in seconds.",
        },
        {
          name: "ease",
          type: "Easing",
          default: '"easeInOut"',
          description: "Framer Motion easing curve for the transition progress.",
        },
        {
          name: "autoPlay",
          type: "boolean",
          default: "false",
          description: "Automatically trigger image transitions.",
        },
        {
          name: "autoPlayInterval",
          type: "number",
          default: "3200",
          description: "Delay between automatic transitions in milliseconds.",
        },
        {
          name: "autoPlayOrigin",
          type: '"center" | "random"',
          default: '"center"',
          description: "Ripple origin used for autoplay transitions.",
        },
        {
          name: "waveSpeed",
          type: "number",
          default: "1.6",
          description: "Speed of the expanding wavefront.",
        },
        {
          name: "sigma",
          type: "number",
          default: "0.15",
          description: "Thickness of the primary ripple band.",
        },
        {
          name: "waveFreq",
          type: "number",
          default: "5",
          description: "Frequency of the smaller concentric ripple lines.",
        },
        {
          name: "pushAmt",
          type: "number",
          default: "0.145",
          description: "Radial displacement strength applied by the wave.",
        },
        {
          name: "caStrength",
          type: "number",
          default: "0.02",
          description: "Chromatic aberration amount near the ripple edge.",
        },
        {
          name: "glow",
          type: "number",
          default: "0.73",
          description: "Brightness lift along the wavefront.",
        },
        {
          name: "noiseWarp",
          type: "number",
          default: "1",
          description: "Organic noise applied to the transition boundary.",
        },
        {
          name: "pinch",
          type: "boolean",
          default: "false",
          description: "Adds a subtle inward pull at the ripple origin.",
        },
        {
          name: "borderRadius",
          type: "number",
          default: "24",
          description: "Root border radius in pixels.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional classes for the root container.",
        },
      ]}
    />
  );
}
