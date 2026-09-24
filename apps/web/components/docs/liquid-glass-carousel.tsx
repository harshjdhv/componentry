import { DocsPageLayout } from "@/components/docs-page-layout";
import { LiquidGlassCarouselPreview } from "@/components/docs/previews/liquid-glass-carousel-preview";
import { readComponentSource } from "@/lib/source-code";

const usageCode = `import { LiquidGlassCarousel } from "@/components/ui/liquid-glass-carousel"

export default function Page() {
  return (
    <div className="h-svh w-full">
      <LiquidGlassCarousel />
    </div>
  )
}`;

export async function LiquidGlassCarouselDocs() {
  const sourceCode =
    (await readComponentSource("liquid-glass-carousel")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Liquid Glass Carousel"
      description="An infinite image row refracted through a WebGL liquid-glass lens — chromatic rim, inertial drag, and a click-to-focus expand."
      fullWidthPreview
      preview={
        <LiquidGlassCarouselPreview
          src="/demo/liquid-glass-carousel"
          title="Liquid Glass Carousel Demo"
        />
      }
      previewCode={usageCode}
      installPackageName="liquid-glass-carousel"
      installSourceCode={sourceCode}
      installSourceFilename="components/ui/liquid-glass-carousel.tsx"
      usageCode={usageCode}
      props={[
        {
          name: "items",
          type: "LiquidGlassCarouselItem[]",
          description:
            "Projects to show. Each item needs a title and src. Optional aspect avoids a layout jump while the image loads.",
        },
        {
          name: "panelHeight",
          type: "number",
          default: "450",
          description:
            "Target panel height in pixels. Scaled down when the container is shorter than about twice this value.",
        },
        {
          name: "gap",
          type: "number",
          default: "12",
          description: "Space between panels, in pixels.",
        },
        {
          name: "background",
          type: "string",
          default: '"#ffffff"',
          description:
            "Clear color for the WebGL canvas. Use a hex value so framebuffer gaps match the page.",
        },
        {
          name: "entry",
          type: "boolean",
          default: "true",
          description:
            "Play the rise-and-grow intro. Disabled automatically when the user prefers reduced motion.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional classes for the root container.",
        },
        {
          name: "onActiveChange",
          type: "(index: number) => void",
          description: "Fires when the centered project changes.",
        },
        {
          name: "onFocusChange",
          type: "(focused: boolean) => void",
          description: "Fires when a project expands or returns to the row.",
        },
      ]}
    />
  );
}
