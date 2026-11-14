import React from "react";
import {
  InfiniteImageFieldPlayground,
} from "@/components/docs/previews/infinite-image-field-playground";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { LiveCodeBlock } from "@/components/live-code-block";
import { readComponentSource } from "@/lib/source-code";

const basicUsageCode = `import { InfiniteImageField } from "@/components/ui/infinite-image-field"

<InfiniteImageField className="w-full h-screen" />`;
export async function InfiniteImageFieldDocs() {
  const sourceCode =
    (await readComponentSource("infinite-image-field")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Infinite Image Field"
      description="An endless, cursor-driven photo canvas. Images tile infinitely in all directions — move your cursor to pan the field, and it glides fluidly toward where you point."
      preview={<InfiniteImageFieldPlayground />}
      previewCode=""
      installPackageName="infinite-image-field"
      installDependencies="clsx tailwind-merge"
      installSourceCode={sourceCode}
      usageCode={<LiveCodeBlock defaultCode={basicUsageCode} />}
      fullWidthPreview
      unstyledPreview
      props={[
        {
          name: "images",
          type: "string[]",
          default: "12 built-in sci-fi Unsplash images",
          description:
            "Array of image URLs tiled across the infinite canvas. Images repeat in a deterministic pattern so the same grid cell always shows the same photo.",
        },
        {
          name: "imageWidth",
          type: "number",
          default: "300",
          description: "Width of each image tile in CSS pixels.",
        },
        {
          name: "imageHeight",
          type: "number",
          default: "200",
          description: "Height of each image tile in CSS pixels.",
        },
        {
          name: "gap",
          type: "number",
          default: "28",
          description: "Spacing between adjacent tiles in CSS pixels.",
        },
        {
          name: "maxSpeed",
          type: "number",
          default: "5",
          description:
            "Maximum pan speed when the cursor is at the edge of the canvas (pixels per frame).",
        },
        {
          name: "smoothing",
          type: "number",
          default: "0.07",
          description:
            "Lerp factor controlling how quickly velocity catches up to the cursor direction. Lower values feel heavier and dreamy; higher values feel snappy.",
        },
        {
          name: "borderRadius",
          type: "number",
          default: "0",
          description: "Corner radius applied to each image tile.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional classes applied to the root container.",
        },
      ]}
    />
  );
}
