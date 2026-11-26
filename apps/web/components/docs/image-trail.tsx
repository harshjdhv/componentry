import React from "react";
import { ImageTrailDemo } from "@/components/docs/previews/image-trail-preview";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";

const basicUsageCode = `import { ImageTrail } from "@/components/ui/image-trail"

const myImages = [
  "https://example.com/image1.jpg",
  "https://example.com/image2.jpg",
  "https://example.com/image3.jpg",
]

export function Hero() {
  return (
    <div className="relative w-full h-[500px] overflow-hidden bg-black">
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <h1 className="text-4xl font-bold text-white">DISCOVERY</h1>
      </div>
      <ImageTrail 
        images={myImages}
        imageWidth={250}
        imageHeight={320}
        threshold={50}
        duration={1.6}
      />
    </div>
  )
}`;

export async function ImageTrailDocs() {
    const sourceCode =
        (await readComponentSource("image-trail")) ||
        "// Unable to load source code";

    return (
        <DocsPageLayout
            title="Image Trail"
            description="Leaves a beautiful, premium track of images behind the cursor. Powered by GSAP for buttery smooth animations."
            preview={<ImageTrailDemo />}
            previewCode={basicUsageCode}
            installPackageName="image-trail"
            installDependencies="gsap clsx tailwind-merge"
            installSourceCode={sourceCode}
            usageCode={basicUsageCode}
            fullWidthPreview={true}
            props={[
                {
                    name: "images",
                    type: "string[]",
                    default: "[]",
                    description: "Array of image URLs to cycle through.",
                },
                {
                    name: "imageWidth",
                    type: "number",
                    default: "200",
                    description: "The width of the individual trail images (px).",
                },
                {
                    name: "imageHeight",
                    type: "number",
                    default: "200",
                    description: "The height of the individual trail images (px).",
                },
                {
                    name: "threshold",
                    type: "number",
                    default: "50",
                    description: "Distance in pixels the cursor must move before a new image is added.",
                },
                {
                    name: "duration",
                    type: "number",
                    default: "1.6",
                    description: "Total duration in seconds for the entire trail animation timeline.",
                },
            ]}
        />
    );
}
