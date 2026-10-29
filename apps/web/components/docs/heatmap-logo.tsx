import { HeatmapLogo } from "@workspace/ui/components/heatmap-logo"
import { DocsPageLayout } from "@/components/docs-page-layout"
import { readComponentSource } from "@/lib/source-code"

const COMPONENTRY_MARK = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="371 347 520 520"><g fill="#000"><path d="M457 376H595Q619 376 619 400V505C619 541 605 564 577 579C564 586 552 591 544 596C536 601 532 604 532 607C532 610 536 613 544 618C552 623 564 628 577 635C605 650 619 673 619 709V814Q619 838 595 838H457Q409 838 409 790V424Q409 376 457 376Z"/><rect x="643" y="376" width="210" height="216" rx="24"/><rect x="643" y="622" width="210" height="216" rx="24"/></g></svg>'
)}`

const usageCode = `import { HeatmapLogo } from "@/components/ui/heatmap-logo"

export default function Demo() {
  return (
    <div className="flex justify-center rounded-2xl bg-[#09090a] p-6">
      <HeatmapLogo image="/logo.svg" className="w-96" />
    </div>
  )
}`

const coolCode = `import { HeatmapLogo } from "@/components/ui/heatmap-logo"

const ice = ["#050b1a", "#0f2550", "#1f4fa8", "#4f8ef0", "#9cc8ff", "#e2f0ff", "#ffffff"]

export default function Demo() {
  return (
    <div className="flex justify-center rounded-2xl bg-[#05070d] p-6">
      <HeatmapLogo image="/logo.svg" colors={ice} background="#05070d" glow={0.5} className="w-96" />
    </div>
  )
}`

const ICE = ["#050b1a", "#0f2550", "#1f4fa8", "#4f8ef0", "#9cc8ff", "#e2f0ff", "#ffffff"]

export async function HeatmapLogoDocs() {
  const sourceCode = await readComponentSource("heatmap-logo")

  return (
    <DocsPageLayout
      title="Heatmap Logo"
      description="A logo that glows like hot metal, with heat drifting slowly through the mark. Feed it any solid logo and a color ramp."
      preview={
        <div className="flex w-full justify-center rounded-2xl bg-[#09090a] py-6">
          <HeatmapLogo image={COMPONENTRY_MARK} className="w-96 max-w-full" />
        </div>
      }
      previewCode={usageCode}
      installPackageName="heatmap-logo"
      installDependencies="@paper-design/shaders-react"
      installSourceCode={sourceCode ?? "// Unable to load source code"}
      usageCode={usageCode}
      usageNote="Use a solid, single-color logo; the shader reads its silhouette, so a transparent PNG or SVG works best. Set background to the color of the surface behind it so the edges blend. The animation stops when reduced motion is on."
      examples={[
        {
          title: "Cool palette",
          preview: (
            <div className="flex w-full justify-center rounded-2xl bg-[#05070d] py-6">
              <HeatmapLogo
                image={COMPONENTRY_MARK}
                colors={ICE}
                background="#05070d"
                glow={0.5}
                className="w-96 max-w-full"
              />
            </div>
          ),
          code: coolCode,
        },
      ]}
      props={[
        {
          name: "image",
          type: "string",
          description: "Logo URL or data URI. Only the silhouette is used.",
        },
        {
          name: "colors",
          type: "string[]",
          description: "Heat ramp from coolest to hottest, as hex colors. Defaults to an ember ramp.",
        },
        {
          name: "background",
          type: "string",
          description: 'Fill behind the logo. Defaults to "#09090a".',
        },
        {
          name: "glow",
          type: "number",
          description: "Strength of the halo around the logo, 0 to 1. Defaults to 0.3.",
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
