import { DocsPageLayout } from "@/components/docs-page-layout"
import { readComponentSource } from "@/lib/source-code"
import { LiveCodeBlock } from "@/components/live-code-block"
import { HeatmapLogoPlayground } from "@/components/docs/previews/heatmap-logo-playground"

const usageCode = `import { HeatmapLogo } from "@/components/ui/heatmap-logo"

export default function Demo() {
  return (
    <div className="flex justify-center p-6">
      <HeatmapLogo image="/logo.svg" className="w-96" />
    </div>
  )
}`

export async function HeatmapLogoDocs() {
  const sourceCode = await readComponentSource("heatmap-logo")

  return (
    <DocsPageLayout
      title="Heatmap Logo"
      description="A logo that glows like hot metal, with heat drifting slowly through the mark. Feed it any solid logo and a color ramp."
      preview={<HeatmapLogoPlayground />}
      fullWidthPreview
      previewCode={usageCode}
      installPackageName="heatmap-logo"
      installDependencies="@paper-design/shaders-react"
      installSourceCode={sourceCode ?? "// Unable to load source code"}
      usageCode={<LiveCodeBlock defaultCode={usageCode} />}
      usageNote="Use a solid, single-color logo; the shader reads its silhouette, so a transparent PNG or SVG works best. The background is transparent by default, so the glow blends into whatever sits behind it. The animation stops when reduced motion is on."
      props={[
        {
          name: "image",
          type: "string",
          description: "Logo URL or data URI. Only the silhouette is used.",
        },
        {
          name: "colors",
          type: "string[]",
          description: "Heat ramp from coolest to hottest, as hex colors. Defaults to an icy blue ramp.",
        },
        {
          name: "background",
          type: "string",
          description: "Fill behind the logo. Defaults to transparent.",
        },
        {
          name: "glow",
          type: "number",
          description: "Strength of the halo around the logo, 0 to 1. Defaults to 0.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional styles. Defaults to a square w-80.",
        },
      ]}
    />
  )
}
