import React from "react";
import {
  BorderBeamDemo,
  BorderBeamCustomDemo,
  BorderBeamFastDemo,
  BorderBeamDelayedDemo,
} from "@/components/docs/previews/border-beam-preview";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";

const basicUsageCode = `import { BorderBeam } from "@/components/ui/border-beam"

<div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-xl border bg-background">
  <div className="z-10 text-center">
    <h3 className="text-2xl font-bold tracking-tight">Border Beam</h3>
    <p className="text-muted-foreground">The beam follows the border path</p>
  </div>
  <BorderBeam />
</div>`;

const customColorsCode = `import { BorderBeam } from "@/components/ui/border-beam"

<div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-xl border bg-background">
  <div className="z-10 text-center">
    <h3 className="text-2xl font-bold tracking-tight">Customized</h3>
    <p className="text-muted-foreground">Slower, larger, custom colors</p>
  </div>
  <BorderBeam 
    size={500}
    duration={20}
    borderWidth={2}
    colorFrom="#10b981"
    colorTo="#3b82f6"
  />
</div>`;

const fastBeamCode = `import { BorderBeam } from "@/components/ui/border-beam"

<div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-xl border bg-background">
  <div className="z-10 text-center">
    <h3 className="text-2xl font-bold tracking-tight">Fast Beam</h3>
    <p className="text-muted-foreground">Quick animation with warm colors</p>
  </div>
  <BorderBeam 
    size={150}
    duration={5}
    colorFrom="#f97316"
    colorTo="#eab308"
  />
</div>`;

const delayedBeamCode = `import { BorderBeam } from "@/components/ui/border-beam"

<div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-xl border bg-background">
  <div className="z-10 text-center">
    <h3 className="text-2xl font-bold tracking-tight">Delayed Start</h3>
    <p className="text-muted-foreground">Beam starts after a 3 second delay</p>
  </div>
  <BorderBeam 
    size={250}
    duration={12}
    delay={3}
    colorFrom="#ec4899"
    colorTo="#8b5cf6"
  />
</div>`;

export async function BorderBeamDocs() {
  const sourceCode =
    (await readComponentSource("border-beam")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Border Beam"
      description="A moving gradient beam that travels along the border of its container. Perfect for highlighting active states, new features, or premium content."
      preview={<BorderBeamDemo />}
      previewCode={basicUsageCode}
      installPackageName="border-beam"
      installDependencies="framer-motion clsx tailwind-merge"
      installSourceCode={sourceCode}
      usageCode={basicUsageCode}
      fullWidthPreview={true}
      examples={
        [
          {
            title: "Custom Colors",
            preview: <BorderBeamCustomDemo />,
            code: customColorsCode,
            fullWidth: true,
          },
          {
            title: "Fast Animation",
            preview: <BorderBeamFastDemo />,
            code: fastBeamCode,
            fullWidth: true,
          },
          {
            title: "Delayed Start",
            preview: <BorderBeamDelayedDemo />,
            code: delayedBeamCode,
            fullWidth: true,
          },
        ]}
      props={
        [
          {
            name: "size",
            type: "number",
            default: "200",
            description: "Length of the beam in pixels.",
          },
          {
            name: "duration",
            type: "number",
            default: "15",
            description: "Animation duration in seconds.",
          },
          {
            name: "borderWidth",
            type: "number",
            default: "1.5",
            description: "Width of the border/beam in pixels.",
          },
          {
            name: "colorFrom",
            type: "string",
            default: '"#ffaa40"',
            description: "Start color of the gradient.",
          },
          {
            name: "colorTo",
            type: "string",
            default: '"#9c40ff"',
            description: "End color of the gradient.",
          },
          {
            name: "delay",
            type: "number",
            default: "0",
            description: "Animation delay in seconds.",
          },
        ]}
    />
  );
}
