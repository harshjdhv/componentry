import { DocsPageLayout, type PropItem } from "@/components/docs-page-layout"
import {
  AsciiGlitchPreview,
  AsciiImagePreview,
  AsciiFlowPreview,
} from "@/components/docs/previews/ascii-effects-preview"
import { readComponentSource } from "@/lib/source-code"

const props: PropItem[] = [
  { name: "imageSrc", type: "string", description: "Image URL rendered as ASCII characters." },
  { name: "chars", type: "string", default: '" .:-=+*#%@"', description: "Characters ordered from darkest to brightest." },
  { name: "fontSize", type: "number", default: "9", description: "Character height in pixels." },
  { name: "fontFamily", type: "string", default: "Arial, Helvetica, sans-serif", description: "Font stack used to draw the characters." },
  { name: "fontWeight", type: "number | string", default: "400", description: "Canvas font weight." },
  { name: "lineHeight", type: "number", default: "1", description: "Character row height multiplier." },
  { name: "characterSpacing", type: "number", default: "1", description: "Horizontal character-cell spacing multiplier." },
  { name: "brightnessBoost", type: "number", default: "2.2", description: "Multiplier applied to sampled image luminance." },
  { name: "contrast", type: "number", default: "1.1", description: "Contrast applied before character selection." },
  { name: "threshold", type: "number", default: "0.06", description: "Dark-pixel cutoff used to keep the background clean." },
  { name: "posterize", type: "number", default: "32", description: "Number of luminance steps." },
  { name: "dither", type: '"none" | "floyd-steinberg" | "bayer"', default: '"floyd-steinberg"', description: "Dithering algorithm used to preserve photographic detail." },
  { name: "ditherStrength", type: "number", default: "0.8", description: "Amount of error diffusion or ordered dithering." },
  { name: "flowSpeed", type: "number", default: "0.22", description: "Flow cycles per second." },
  { name: "flowDirection", type: "number", default: "0", description: "Flow direction in degrees." },
  { name: "flowStrength", type: "number", default: "12", description: "Directional displacement in pixels." },
  { name: "flowFrequency", type: "number", default: "0.018", description: "Size of the flowing wave field." },
  { name: "mouseRadius", type: "number", default: "150", description: "Radius of the pointer ripple in pixels." },
  { name: "mouseStrength", type: "number", default: "22", description: "Pointer ripple displacement in pixels." },
  { name: "mouseWaveSpeed", type: "number", default: "1.2", description: "Speed of the pointer ripple." },
  { name: "scale", type: "number", default: "1.15", description: "Image zoom inside the ASCII field." },
  { name: "fit", type: '"cover" | "contain" | "stretch"', default: '"cover"', description: "How the source image fits the canvas without distorting text." },
  { name: "colors", type: "string[]", description: "One or more colors used as a luminance gradient." },
  { name: "colorMode", type: '"gradient" | "source"', default: '"gradient"', description: "Use the supplied gradient or colors sampled from the image." },
  { name: "backgroundColor", type: "string", default: '"#07090d"', description: "Canvas background color." },
  { name: "invert", type: "boolean", default: "false", description: "Reverse the luminance-to-character mapping." },
  { name: "glitchIntensity", type: "number", default: "0.65", description: "Strength and number of displaced signal bands." },
  { name: "glitchFrequency", type: "number", default: "1.4", description: "Approximate glitches per second." },
  { name: "revealDuration", type: "number", default: "1400", description: "Radial reveal duration in milliseconds." },
  { name: "alt", type: "string", default: '"ASCII rendering"', description: "Accessible label for the canvas." },
]

const entries = {
  image: {
    title: "ASCII Image",
    description: "A clean, responsive image-to-ASCII renderer with custom character ramps, typography, luminance, and color controls.",
    Preview: AsciiImagePreview,
    usage: `import { AsciiImage } from "@/components/ui/ascii-effect"

<div className="h-[520px] overflow-hidden rounded-2xl">
  <AsciiImage
    imageSrc="/images/portrait.jpg"
    chars=" .:-=+*#%@"
    fontSize={9}
    fontFamily="Arial, Helvetica, sans-serif"
    brightnessBoost={2.2}
    posterize={32}
    dither="floyd-steinberg"
    scale={1.15}
    colors={["#71717a", "#fafafa"]}
  />
</div>`,
  },
  flow: {
    title: "ASCII Flow",
    description: "A directional ASCII flow field with configurable speed and a cursor-driven ripple.",
    Preview: AsciiFlowPreview,
    usage: `import { AsciiFlow } from "@/components/ui/ascii-effect"

<div className="h-[520px] overflow-hidden rounded-2xl">
  <AsciiFlow
    imageSrc="/images/portrait.jpg"
    chars=" .:-=+*#%@"
    fontSize={9}
    brightnessBoost={2.2}
    posterize={32}
    dither="floyd-steinberg"
    flowSpeed={0.22}
    flowDirection={0}
    flowStrength={12}
    flowFrequency={0.018}
    mouseRadius={150}
    mouseStrength={22}
    mouseWaveSpeed={1.2}
    scale={1.15}
    colors={["#cbd5e1", "#67e8f9", "#818cf8"]}
  />
</div>`,
  },
  glitch: {
    title: "ASCII Glitch",
    description: "A cinematic ASCII reconstruction with a radial reveal and configurable signal displacement.",
    Preview: AsciiGlitchPreview,
    usage: `import { AsciiGlitch } from "@/components/ui/ascii-effect"

<div className="h-[520px] overflow-hidden rounded-2xl">
  <AsciiGlitch
    imageSrc="/images/portrait.jpg"
    chars=" .:-=+*#%@"
    fontSize={9}
    brightnessBoost={2.2}
    posterize={32}
    dither="floyd-steinberg"
    scale={1.15}
    colors={["#ecfccb", "#a3e635", "#22d3ee"]}
    glitchIntensity={0.65}
    glitchFrequency={1.4}
    revealDuration={1400}
  />
</div>`,
  },
} as const

async function AsciiDocs({ kind }: { kind: keyof typeof entries }) {
  const entry = entries[kind]
  const source = await readComponentSource(`ascii-${kind}`)
  const Preview = entry.Preview

  return (
    <DocsPageLayout
      title={entry.title}
      description={entry.description}
      preview={<Preview />}
      previewCode={entry.usage}
      installPackageName={`ascii-${kind}`}
      installSourceCode={source ?? "// Unable to load source code"}
      usageCode={entry.usage}
      examples={[]}
      props={props}
      fullWidthPreview
    />
  )
}

export function AsciiImageDocs() {
  return <AsciiDocs kind="image" />
}

export function AsciiFlowDocs() {
  return <AsciiDocs kind="flow" />
}

export function AsciiGlitchDocs() {
  return <AsciiDocs kind="glitch" />
}
