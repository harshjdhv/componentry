import { DocsInsetLayout } from "@/components/docs-inset/docs-inset-layout"
import { LiveCodeBlock } from "@/components/live-code-block"
import { readComponentSource } from "@/lib/source-code"
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
    <DocsInsetLayout
      title="Heatmap Logo"
      description="A logo that glows like hot metal, with heat drifting slowly through the mark. Feed it any solid logo and a color ramp."
      slug="heatmap-logo"
      preview={<HeatmapLogoPlayground />}
      fullWidthPreview
      code={<LiveCodeBlock defaultCode={usageCode} />}
      installDependencies="@paper-design/shaders-react"
      sourceCode={sourceCode ?? undefined}
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
