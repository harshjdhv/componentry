import { ChladniPlate } from "@workspace/ui/components/chladni-plate";

import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";

const usageCode = `import { ChladniPlate } from "@/components/ui/chladni-plate"

<div className="relative h-[520px] w-full overflow-hidden">
  <ChladniPlate className="absolute inset-0" />
</div>`;

const boneCode = `import { ChladniPlate } from "@/components/ui/chladni-plate"

<ChladniPlate tint={[0.86, 0.84, 0.78]} focus={9} speed={1} />`;

const copperCode = `import { ChladniPlate } from "@/components/ui/chladni-plate"

<ChladniPlate tint={[0.95, 0.62, 0.35]} focus={14} speed={0.6} />`;

const sparseCode = `import { ChladniPlate } from "@/components/ui/chladni-plate"

<ChladniPlate tint={[0.55, 0.70, 0.90]} focus={5} speed={1.4} />`;

export async function ChladniPlateDocs() {
  const sourceCode =
    (await readComponentSource("chladni-plate")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Chladni Plate"
      description="Cymatic sand patterns driven by two standing-wave modes on a square plate. A slow, structural hero background that reads as a physical experiment rather than a gradient."
      preview={
        <div className="relative h-[420px] w-full overflow-hidden rounded-lg">
          <ChladniPlate className="absolute inset-0" />
        </div>
      }
      previewCode={usageCode}
      installPackageName="chladni-plate"
      installSourceCode={sourceCode}
      usageCode={usageCode}
      installationNote="The component renders a WebGL canvas that fills its container, so give the parent an explicit height. If WebGL is unavailable it renders nothing rather than throwing."
      usageNote="Lower focus values widen the sand into clouds; higher values sharpen it into fine nodal lines. Reduce speed when the background sits behind long-form copy."
      examples={[
        {
          title: "Bone",
          code: boneCode,
          preview: (
            <div className="relative h-[240px] w-full overflow-hidden rounded-lg">
              <ChladniPlate className="absolute inset-0" tint={[0.86, 0.84, 0.78]} focus={9} />
            </div>
          ),
        },
        {
          title: "Copper",
          code: copperCode,
          preview: (
            <div className="relative h-[240px] w-full overflow-hidden rounded-lg">
              <ChladniPlate className="absolute inset-0" tint={[0.95, 0.62, 0.35]} focus={14} speed={0.6} />
            </div>
          ),
        },
        {
          title: "Sparse",
          code: sparseCode,
          preview: (
            <div className="relative h-[240px] w-full overflow-hidden rounded-lg">
              <ChladniPlate className="absolute inset-0" tint={[0.55, 0.7, 0.9]} focus={5} speed={1.4} />
            </div>
          ),
        },
      ]}
      props={[
        {
          name: "tint",
          type: "[number, number, number]",
          default: "[0.86, 0.84, 0.78]",
          description: "Sand colour as linear RGB, 0–1 per channel.",
        },
        {
          name: "focus",
          type: "number",
          default: "9",
          description: "Sharpness of the nodal lines. Higher is finer and more defined.",
        },
        {
          name: "speed",
          type: "number",
          default: "1",
          description: "Animation speed multiplier.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional styles. The canvas fills its parent, so set a height there.",
        },
      ]}
    />
  );
}
