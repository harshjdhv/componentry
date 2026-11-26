import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";
import { PixelImageTrail } from "@workspace/ui/components/pixel-image-trail";

const defaultCode = `import { PixelImageTrail } from "@/components/ui/pixel-image-trail"

<PixelImageTrail
  src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1800&q=85"
  alt="A green mountain lake beneath a cloudy sky"
  className="h-[600px]"
/>`;

export async function PixelImageTrailDocs() {
  const sourceCode =
    (await readComponentSource("pixel-image-trail")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Pixel Image Trail"
      description="An image reveal made from cursor-painted square fragments. New pixels appear around the pointer while the oldest fragments fade away, keeping the trail expressive but bounded."
      preview={
        <PixelImageTrail
          src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1800&q=85"
          alt="A green mountain lake beneath a cloudy sky"
          className="h-full min-h-[600px] w-full"
        />
      }
      previewCode={defaultCode}
      installPackageName="pixel-image-trail"
      installDependencies="clsx tailwind-merge"
      installSourceCode={sourceCode}
      installSourceFilename="components/ui/pixel-image-trail.tsx"
      usageCode={defaultCode}
      fullWidthPreview
      props={[
        {
          name: "src",
          type: "string",
          description: "Image URL revealed by the pixel trail.",
        },
        {
          name: "alt",
          type: "string",
          description: "Accessible description for the image.",
        },
        {
          name: "pixelSize",
          type: "number",
          default: "36",
          description: "Width and height of each square in pixels.",
        },
        {
          name: "radius",
          type: "number",
          default: "58",
          description: "Maximum distance for an occasional satellite pixel.",
        },
        {
          name: "fadeDuration",
          type: "number",
          default: "900",
          description: "Milliseconds before an untouched square disappears.",
        },
        {
          name: "maxPixels",
          type: "number",
          default: "84",
          description:
            "Maximum squares retained before the oldest are removed.",
        },
        {
          name: "initialPixels",
          type: "number",
          default: "24",
          description: "Image fragments visible before the first interaction.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional classes for size, surface, and shape.",
        },
        {
          name: "children",
          type: "ReactNode",
          description: "Optional content rendered above the pixel canvas.",
        },
      ]}
    />
  );
}
