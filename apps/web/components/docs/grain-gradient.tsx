import { DocsPageLayout } from "@/components/docs-page-layout";
import { LiveCodeBlock } from "@/components/live-code-block";
import { GrainGradientPlayground } from "@/components/docs/previews/grain-gradient-playground";
import { readComponentSource } from "@/lib/source-code";

const usageCode = `import { GrainGradient } from "@/components/ui/grain-gradient"

<GrainGradient
  colorLight="#dce5df"
  colorMid="#83b9ad"
  colorDark="#031419"
  speed={1}
  grain={0.32}
  className="h-[560px] rounded-2xl"
/>`;

export async function GrainGradientDocs() {
  const source = await readComponentSource("grain-gradient");
  return (
    <DocsPageLayout
      title="Grain Gradient"
      description="A softly curved color field with fine film grain. Breathing light and flowing shadows, with customizable palette, composition, texture, and motion."
      preview={<GrainGradientPlayground />}
      previewCode={usageCode}
      usageCode={<LiveCodeBlock defaultCode={usageCode} />}
      installPackageName="grain-gradient"
      installDependencies="clsx tailwind-merge"
      installSourceCode={source ?? "// Unable to load source code"}
      fullWidthPreview
      usageNote={
        <p className="text-sm leading-6 text-muted-foreground">
          Set a height on the component or its parent. This decorative surface
          is hidden from assistive technology; place any content in a separate
          layer. Colors accept three- or six-digit hex values and stay the same
          in either theme. WebGL is optional: a CSS gradient appears when
          unavailable. Motion pauses offscreen, in hidden tabs, and with reduced
          motion. The default gently breathes; set speed to zero to pause.
        </p>
      }
      props={[
        {
          name: "colorLight",
          type: "string",
          default: '"#dce5df"',
          description: "Pale highlight color (hex).",
        },
        {
          name: "colorMid",
          type: "string",
          default: '"#83b9ad"',
          description: "Upper-left wash and diffused edge color (hex).",
        },
        {
          name: "colorDark",
          type: "string",
          default: '"#031419"',
          description: "Deep shadow color (hex).",
        },
        {
          name: "angle",
          type: "number",
          default: "0",
          description: "Composition rotation in degrees, -360 to 360.",
        },
        {
          name: "position",
          type: "number",
          default: "0",
          description: "Horizontal edge offset, -1 to 1.",
        },
        {
          name: "curve",
          type: "number",
          default: "0.48",
          description: "Shadow edge curvature, -1 to 1.",
        },
        {
          name: "softness",
          type: "number",
          default: "0.13",
          description: "Edge diffusion width, 0.01 to 1.",
        },
        {
          name: "scale",
          type: "number",
          default: "1",
          description: "Composition zoom, 0.25 to 3.",
        },
        {
          name: "grain",
          type: "number",
          default: "0.32",
          description:
            "Film grain intensity, 0 to 1. Zero removes the texture.",
        },
        {
          name: "grainSize",
          type: "number",
          default: "1",
          description: "Grain size in CSS pixels, 0.5 to 4.",
        },
        {
          name: "seed",
          type: "number",
          default: "1",
          description: "Reproducible texture seed, 0 to 100000.",
        },
        {
          name: "speed",
          type: "number",
          default: "0",
          description:
            "Breathing speed, 0 to 2. At 1, the primary cycle lasts about 12 seconds. Zero pauses on the current frame.",
        },
        {
          name: "className",
          type: "string",
          description: "Container sizing, rounding, and styling.",
        },
        {
          name: "style",
          type: "CSSProperties",
          description: "Inline container styles.",
        },
      ]}
    />
  );
}
