import { DocsPageLayout, type PropItem } from "@/components/docs-page-layout";
import {
  AsciiFlowPreview,
  AsciiGlitchPreview,
  AsciiImagePreview,
} from "@/components/docs/previews/ascii-effect-preview";
import { readComponentSource } from "@/lib/source-code";

const importCode = `import { AsciiEffect } from "@/components/ui/ascii-effect"`;

const imageCode = `${importCode}

<div className="h-[520px] overflow-hidden rounded-2xl">
  <AsciiEffect
    variant="image"
    imageSrc="/images/portrait.jpg"
    fontSize={9}
    scale={1.15}
  />
</div>`;

const flowCode = `${importCode}

<div className="h-[520px] overflow-hidden rounded-2xl">
  <AsciiEffect
    variant="flow"
    imageSrc="/images/portrait.jpg"
    flowSpeed={0.22}
    flowStrength={12}
    mouseRadius={150}
    mouseStrength={22}
  />
</div>`;

const glitchCode = `${importCode}

<div className="h-[520px] overflow-hidden rounded-2xl">
  <AsciiEffect
    variant="glitch"
    imageSrc="/images/portrait.jpg"
    glitchIntensity={0.65}
    glitchFrequency={1.4}
    revealDuration={1400}
  />
</div>`;

const props: PropItem[] = [
  {
    name: "imageSrc",
    type: "string",
    description: "Image URL rendered as ASCII characters.",
  },
  {
    name: "variant",
    type: '"image" | "flow" | "glitch"',
    default: '"image"',
    description: "Visual effect variation.",
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
    description: "Flow cycles per second for the flow variant.",
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
    name: "glitchIntensity",
    type: "number",
    default: "0.65",
    description: "Strength and number of displaced signal bands.",
  },
  {
    name: "glitchFrequency",
    type: "number",
    default: "1.4",
    description: "Approximate glitches per second.",
  },
  {
    name: "revealDuration",
    type: "number",
    default: "1400",
    description: "Radial reveal duration in milliseconds.",
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
      description="A responsive image-to-ASCII renderer with image, flowing ripple, and signal-glitch variations."
      preview={<AsciiImagePreview />}
      previewCode={imageCode}
      installPackageName="ascii-effect"
      installSourceCode={source ?? "// Unable to load source code"}
      installSourceFilename="components/ui/ascii-effect.tsx"
      usageCode={imageCode}
      examples={[
        { title: "Flow", preview: <AsciiFlowPreview />, code: flowCode },
        { title: "Glitch", preview: <AsciiGlitchPreview />, code: glitchCode },
      ]}
      props={props}
      fullWidthPreview
    />
  );
}
