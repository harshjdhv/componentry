import { ShaderBackground } from "@workspace/ui/components/shader-background";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";

const ghostCode = `import { ShaderBackground } from "@/components/ui/shader-background"

<div className="h-[560px] overflow-hidden rounded-2xl">
  <ShaderBackground variant="ghost" />
</div>`;

const waterCode = `import { ShaderBackground } from "@/components/ui/shader-background"

<div className="h-[560px] overflow-hidden rounded-2xl">
  <ShaderBackground variant="water" />
</div>`;

export async function ShaderBackgroundDocs() {
  const sourceCode =
    (await readComponentSource("shader-background")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Shader Background"
      description="A locally vendored Neuro Noise WebGL background with four presets, full visual controls, and no runtime package dependency."
      preview={
        <div className="relative h-full min-h-0 w-full overflow-hidden bg-white">
          <ShaderBackground variant="ghost" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-8 pt-28 text-white">
            <p className="text-xs uppercase tracking-[0.32em] text-white/55">
              Ghost
            </p>
            <p className="mt-2 max-w-xl text-3xl font-medium tracking-tight">
              Neuro Noise, running locally.
            </p>
          </div>
        </div>
      }
      previewCode={ghostCode}
      installPackageName="shader-background"
      installSourceCode={sourceCode}
      installSourceFilename="components/ui/shader-background.tsx"
      usageCode={ghostCode}
      fullWidthPreview
      examples={[
        {
          title: "Water",
          preview: (
            <div className="h-full min-h-0 w-full overflow-hidden bg-[#06171b]">
              <ShaderBackground variant="water" />
            </div>
          ),
          code: waterCode,
          fullWidth: true,
        },
      ]}
      props={[
        {
          name: "variant",
          type: '"default" | "sensation" | "bloodstream" | "ghost" | "water"',
          default: '"ghost"',
          description: "Applies one of the original Neuro Noise presets.",
        },
        {
          name: "colorFront / colorMid / colorBack",
          type: "string",
          description: "Hex colors that override the selected preset.",
        },
        {
          name: "brightness / contrast",
          type: "number",
          description: "Controls the shader's luminance and tonal separation.",
        },
        {
          name: "speed",
          type: "number",
          description: "Animation multiplier. Set to 0 for a still frame.",
        },
        {
          name: "frame",
          type: "number",
          default: "0",
          description: "Initial deterministic animation time in milliseconds.",
        },
        {
          name: "scale / rotation / offsetX / offsetY",
          type: "number",
          description: "Transforms the generated pattern in world space.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional classes applied to the shader container.",
        },
      ]}
    />
  );
}
