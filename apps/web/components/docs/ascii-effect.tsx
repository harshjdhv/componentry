import { DocsPageLayout, type PropItem } from "@/components/docs-page-layout";
import { AsciiFlowPreview } from "@/components/docs/previews/ascii-effect-preview";
import { readComponentSource } from "@/lib/source-code";

const importCode = `import { AsciiEffect } from "@/components/ui/ascii-effect"

<div className="h-[520px] overflow-hidden rounded-2xl">
  <AsciiEffect
    imageSrc="/images/portrait.jpg"
    flowSpeed={0.22}
    flowStrength={12}
    mouseRadius={150}
    mouseStrength={22}
  />
</div>`;

const flowCode = importCode;

const props: PropItem[] = [
  {
    name: "imageSrc",
    type: "string",
    description: "Image URL rendered as ASCII characters.",
  },
  {
    name: "chars",
    type: "string",
    default: '" .:-=+*#%@"',
    description: "Characters ordered from darkest to brightest.",
  },
  {
    name: "fontSize",
    type: "number",
    default: "9",
    description: "Character height in pixels.",
  },
  {
    name: "fontFamily",
    type: "string",
    default: "Arial, Helvetica, sans-serif",
    description: "Font stack used to draw the characters.",
  },
  {
    name: "fontWeight",
    type: "number | string",
    default: "400",
    description: "Canvas font weight.",
  },
  {
    name: "lineHeight",
    type: "number",
    default: "1",
    description: "Character row height multiplier.",
  },
  {
    name: "characterSpacing",
    type: "number",
    default: "1",
    description: "Horizontal character-cell spacing multiplier.",
  },
  {
    name: "brightnessBoost",
    type: "number",
    default: "2.2",
    description: "Multiplier applied to sampled image luminance.",
  },
  {
    name: "contrast",
    type: "number",
    default: "1.1",
    description: "Contrast applied before character selection.",
  },
  {
    name: "threshold",
    type: "number",
    default: "0.06",
    description: "Dark-pixel cutoff used to keep the background clean.",
  },
  {
    name: "posterize",
    type: "number",
    default: "32",
    description: "Number of luminance steps.",
  },
  {
    name: "dither",
    type: '"none" | "floyd-steinberg" | "bayer"',
    default: '"floyd-steinberg"',
    description: "Dithering algorithm used to preserve photographic detail.",
  },
  {
    name: "ditherStrength",
    type: "number",
    default: "0.8",
    description: "Amount of error diffusion or ordered dithering.",
  },
  {
    name: "flowSpeed",
    type: "number",
    default: "0.22",
    description: "Flow cycles per second.",
  },
  {
    name: "flowDirection",
    type: "number",
    default: "0",
    description: "Flow direction in degrees.",
  },
  {
    name: "flowStrength",
    type: "number",
    default: "12",
    description: "Directional displacement in pixels.",
  },
  {
    name: "flowFrequency",
    type: "number",
    default: "0.018",
    description: "Size of the flowing wave field.",
  },
  {
    name: "mouseRadius",
    type: "number",
    default: "150",
    description: "Radius of the pointer ripple in pixels.",
  },
  {
    name: "mouseStrength",
    type: "number",
    default: "22",
    description: "Pointer ripple displacement in pixels.",
  },
  {
    name: "mouseWaveSpeed",
    type: "number",
    default: "1.2",
    description: "Speed of the pointer ripple.",
  },
  {
    name: "scale",
    type: "number",
    default: "1.15",
    description: "Image zoom inside the ASCII field.",
  },
  {
    name: "fit",
    type: '"cover" | "contain" | "stretch"',
    default: '"cover"',
    description: "How the source image fits the canvas.",
  },
  {
    name: "colors",
    type: "string[]",
    description: "One or more colors used as a luminance gradient.",
  },
  {
    name: "colorMode",
    type: '"gradient" | "source"',
    default: '"gradient"',
    description: "Use a supplied gradient or colors sampled from the image.",
  },
  {
    name: "backgroundColor",
    type: "string",
    default: '"#07090d"',
    description: "Canvas background color.",
  },
  {
    name: "invert",
    type: "boolean",
    default: "false",
    description: "Reverse the luminance-to-character mapping.",
  },
  {
    name: "alt",
    type: "string",
    default: '"ASCII rendering"',
    description: "Accessible label for the canvas.",
  },
  {
    name: "className",
    type: "string",
    description: "Additional classes for the container.",
  },
];

export async function AsciiEffectDocs() {
  const source = await readComponentSource("ascii-effect");

  return (
    <DocsPageLayout
      title="ASCII Effect"
      description="A responsive image-to-ASCII renderer with a flowing ripple that reacts to your cursor."
      preview={<AsciiFlowPreview />}
      previewCode={flowCode}
      installPackageName="ascii-effect"
      installSourceCode={source ?? "// Unable to load source code"}
      installSourceFilename="components/ui/ascii-effect.tsx"
      usageCode={flowCode}
      props={props}
      fullWidthPreview
    />
  );
}
