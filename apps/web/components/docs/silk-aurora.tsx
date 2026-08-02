import { DocsPageLayout } from "@/components/docs-page-layout";
import { LiveCodeBlock } from "@/components/live-code-block";
import {
  SilkAuroraPersonalizePanel,
  SilkAuroraPlayground,
} from "@/components/docs/previews/silk-aurora-playground";
import { readComponentSource } from "@/lib/source-code";

const basicUsageCode = `import { SilkAurora } from "@/components/ui/silk-aurora"

<SilkAurora
  preset="ocean"
  className="min-h-[600px]"
/>`;

export async function SilkAuroraDocs() {
  const sourceCode =
    (await readComponentSource("silk-aurora")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Silk Aurora"
      description="A procedural atmospheric hero background with layered silk flow, diffused aurora light, subtle interaction, and production-ready presets."
      preview={<SilkAuroraPlayground />}
      personalizeContent={<SilkAuroraPersonalizePanel />}
      previewCode={basicUsageCode}
      installPackageName="silk-aurora"
      installDependencies="clsx tailwind-merge"
      installSourceCode={sourceCode}
      installSourceFilename="components/ui/silk-aurora.tsx"
      usageCode={<LiveCodeBlock defaultCode={basicUsageCode} />}
      usageNote={
        <p className="text-sm leading-6 text-muted-foreground">
          Silk Aurora renders one WebGL quad, caps pixel density, pauses outside
          the viewport, and draws only a static frame when reduced motion is
          requested.
        </p>
      }
      fullWidthPreview
      unstyledPreview
      props={[
        {
          name: "colors",
          type: "readonly string[]",
          description:
            "Up to five custom hex colors overriding the selected preset.",
        },
        {
          name: "preset",
          type: "SilkAuroraPreset",
          default: '"ocean"',
          description:
            "Production palette: ocean, aurora, sky, cloud, sunset, midnight, ice, dream, nebula, emerald, lavender, or mono.",
        },
        {
          name: "speed",
          type: "number",
          default: "1",
          description: "Global motion speed multiplier.",
        },
        {
          name: "intensity",
          type: "number",
          default: "1",
          description: "Strength of flowing color and silk highlights.",
        },
        {
          name: "opacity",
          type: "number",
          default: "1",
          description: "Final canvas opacity.",
        },
        {
          name: "blur",
          type: "number",
          default: "1",
          description: "Diffusion softness applied to atmospheric fields.",
        },
        {
          name: "contrast",
          type: "number",
          default: "1.04",
          description: "Final color contrast.",
        },
        {
          name: "brightness",
          type: "number",
          default: "1",
          description: "Final scene brightness.",
        },
        {
          name: "grain",
          type: "boolean",
          default: "true",
          description: "Enables fine film-inspired grain.",
        },
        {
          name: "grainOpacity",
          type: "number",
          default: "0.22",
          description: "Strength of fine grain.",
        },
        {
          name: "layers",
          type: "number",
          default: "6",
          description: "Procedural FBM depth, clamped from 3 to 7.",
        },
        {
          name: "flowScale",
          type: "number",
          default: "1",
          description: "Scale of the broad atmospheric structures.",
        },
        {
          name: "flowStrength",
          type: "number",
          default: "1",
          description: "Strength of domain warping and silk folds.",
        },
        {
          name: "flowDirection",
          type: "number",
          default: "-18",
          description: "Primary flow direction in degrees.",
        },
        {
          name: "animationSpeed",
          type: "number",
          default: "1",
          description: "Fine multiplier for procedural evolution.",
        },
        {
          name: "pointerInteraction",
          type: "boolean",
          default: "true",
          description: "Enables restrained pointer-driven flow bending.",
        },
        {
          name: "pointerStrength",
          type: "number",
          default: "0.7",
          description: "Maximum pointer influence.",
        },
        {
          name: "scrollInteraction",
          type: "boolean",
          default: "false",
          description: "Enables subtle scroll-driven depth movement.",
        },
        {
          name: "parallaxStrength",
          type: "number",
          default: "0.5",
          description: "Strength of scroll parallax.",
        },
        {
          name: "lighting",
          type: "boolean",
          default: "true",
          description: "Enables the broad traveling bloom.",
        },
        {
          name: "lightingIntensity",
          type: "number",
          default: "0.8",
          description: "Brightness of traveling light.",
        },
        {
          name: "lightingRadius",
          type: "number",
          default: "1",
          description: "Diffusion radius of traveling light.",
        },
        {
          name: "lightingSpeed",
          type: "number",
          default: "0.8",
          description: "Independent light movement speed.",
        },
        {
          name: "ambientGlow",
          type: "boolean",
          default: "true",
          description: "Enables the broad central ambient lift.",
        },
        {
          name: "ambientOpacity",
          type: "number",
          default: "0.7",
          description: "Strength of ambient illumination.",
        },
        {
          name: "noise",
          type: "boolean",
          default: "true",
          description: "Enables low-frequency atmospheric haze.",
        },
        {
          name: "noiseOpacity",
          type: "number",
          default: "0.16",
          description: "Strength of atmospheric haze.",
        },
        {
          name: "noiseScale",
          type: "number",
          default: "1",
          description: "Scale of the haze field.",
        },
        {
          name: "vignette",
          type: "boolean",
          default: "true",
          description: "Enables soft edge falloff.",
        },
        {
          name: "vignetteStrength",
          type: "number",
          default: "0.55",
          description: "Strength of edge falloff.",
        },
        {
          name: "borderRadius",
          type: "CSSProperties['borderRadius']",
          default: "0",
          description: "Radius applied to the background container.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional classes for sizing and placement.",
        },
        {
          name: "style",
          type: "CSSProperties",
          description: "Additional inline styles for the root container.",
        },
        {
          name: "children",
          type: "ReactNode",
          description:
            "Optional content rendered above the atmospheric canvas.",
        },
      ]}
    />
  );
}
