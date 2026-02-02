import React from "react"
import {
    SpotlightCard,
    SpotlightCardContent,
    SpotlightCardHeader,
    SpotlightCardTitle,
    SpotlightCardDescription,
    MultiSpotlightCard,
    BeamSpotlightCard,
    TiltSpotlightCard,
} from "@workspace/ui/components/spotlight-card"
import { DocsPageLayout } from "@/components/docs-page-layout"
import { readComponentSource } from "@/lib/source-code"

const defaultSpotlightCode = `import {
  SpotlightCard,
  SpotlightCardContent,
  SpotlightCardHeader,
  SpotlightCardTitle,
  SpotlightCardDescription,
} from "@/components/ui/spotlight-card"

<SpotlightCard className="w-96">
  <SpotlightCardHeader>
    <SpotlightCardTitle>Spotlight Effect</SpotlightCardTitle>
    <SpotlightCardDescription>
      Hover over this card to see the spotlight follow your cursor
    </SpotlightCardDescription>
  </SpotlightCardHeader>
  <SpotlightCardContent>
    <p className="text-neutral-300 text-sm">
      This card features an animated gradient border and a soft
      spotlight glow that tracks your mouse movement.
    </p>
  </SpotlightCardContent>
</SpotlightCard>`

const customSpotlightCode = `import {
  SpotlightCard,
  SpotlightCardContent,
  SpotlightCardHeader,
  SpotlightCardTitle,
  SpotlightCardDescription,
} from "@/components/ui/spotlight-card"

<SpotlightCard
  className="w-96"
  spotlightColor="rgba(255, 100, 100, 0.4)"
  glowIntensity={0.2}
  borderRadius={24}
>
  <SpotlightCardHeader>
    <SpotlightCardTitle>Custom Colors</SpotlightCardTitle>
    <SpotlightCardDescription>
      Fully customizable spotlight color and intensity
    </SpotlightCardDescription>
  </SpotlightCardHeader>
  <SpotlightCardContent>
    <p className="text-neutral-300 text-sm">
      Customize the spotlight color, glow intensity, border radius,
      and more to match your design system.
    </p>
  </SpotlightCardContent>
</SpotlightCard>`

const multiSpotlightCode = `import { MultiSpotlightCard } from "@/components/ui/spotlight-card"

<MultiSpotlightCard className="w-full max-w-lg mx-auto p-6 h-64">
  <h4 className="text-white font-medium mb-2">Multi Spotlight</h4>
  <p className="text-neutral-400 text-sm">
    Multiple colored spotlight sources follow your cursor
  </p>
</MultiSpotlightCard>`

const beamSpotlightCode = `import { BeamSpotlightCard } from "@/components/ui/spotlight-card"

<BeamSpotlightCard className="w-full max-w-lg mx-auto p-6 h-64">
  <h4 className="text-white font-medium mb-2">Beam Spotlight</h4>
  <p className="text-neutral-400 text-sm">
    Crossing light beams create a dramatic effect
  </p>
</BeamSpotlightCard>`

const tiltSpotlightCode = `import { TiltSpotlightCard } from "@/components/ui/spotlight-card"

<TiltSpotlightCard className="w-full max-w-lg mx-auto p-6 h-64">
  <h4 className="text-white font-medium mb-2">3D Tilt</h4>
  <p className="text-neutral-400 text-sm">
    Perspective tilt with glare effect for depth
  </p>
</TiltSpotlightCard>`

export async function SpotlightCardDocs() {
    const sourceCode = (await readComponentSource("spotlight-card")) || "// Unable to load source code"

    return (
        <DocsPageLayout
            title="Spotlight Card"
            description="Interactive spotlight card with cursor tracking effects, tilt animations, and gradient highlights. Free React component by Harsh Jadhav."
            preview={
                <div className="flex items-center justify-center p-8 min-h-[400px]">
                    <SpotlightCard className="w-96">
                        <SpotlightCardHeader>
                            <SpotlightCardTitle>Spotlight Effect</SpotlightCardTitle>
                            <SpotlightCardDescription>
                                Hover over this card to see the spotlight follow your cursor
                            </SpotlightCardDescription>
                        </SpotlightCardHeader>
                        <SpotlightCardContent>
                            <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                                This card features an animated gradient border and a soft
                                spotlight glow that tracks your mouse movement.
                            </p>
                        </SpotlightCardContent>
                    </SpotlightCard>
                </div>
            }
            previewCode={defaultSpotlightCode}
            installPackageName="spotlight-card"
            installDependencies="clsx tailwind-merge"
            installSourceCode={sourceCode}
            usageCode={defaultSpotlightCode}
            examples={[
                {
                    title: "Custom Colors",
                    preview: (
                        <div className="flex items-center justify-center p-8 min-h-[400px]">
                            <SpotlightCard
                                className="w-96"
                                spotlightColor="rgba(255, 100, 100, 0.4)"
                                glowIntensity={0.2}
                                borderRadius={24}
                            >
                                <SpotlightCardHeader>
                                    <SpotlightCardTitle>Custom Colors</SpotlightCardTitle>
                                    <SpotlightCardDescription>
                                        Fully customizable spotlight color and intensity
                                    </SpotlightCardDescription>
                                </SpotlightCardHeader>
                                <SpotlightCardContent>
                                    <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                                        Customize the spotlight color, glow intensity, border radius,
                                        and more to match your design system.
                                    </p>
                                </SpotlightCardContent>
                            </SpotlightCard>
                        </div>
                    ),
                    code: customSpotlightCode,
                },
                {
                    title: "Multi Spotlight",
                    preview: (
                        <div className="flex items-center justify-center p-8 min-h-[400px]">
                            <MultiSpotlightCard className="w-full max-w-lg mx-auto p-6 h-64">
                                <h4 className="text-neutral-900 dark:text-white font-medium mb-2">Multi Spotlight</h4>
                                <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                                    Multiple colored spotlight sources follow your cursor
                                </p>
                            </MultiSpotlightCard>
                        </div>
                    ),
                    code: multiSpotlightCode,
                },
                {
                    title: "Beam Spotlight",
                    preview: (
                        <div className="flex items-center justify-center p-8 min-h-[400px]">
                            <BeamSpotlightCard className="w-full max-w-lg mx-auto p-6 h-64">
                                <h4 className="text-neutral-900 dark:text-white font-medium mb-2">Beam Spotlight</h4>
                                <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                                    Crossing light beams create a dramatic effect
                                </p>
                            </BeamSpotlightCard>
                        </div>
                    ),
                    code: beamSpotlightCode,
                },

                {
                    title: "3D Tilt",
                    preview: (
                        <div className="flex items-center justify-center p-8 min-h-[400px]">
                            <TiltSpotlightCard className="w-full max-w-lg mx-auto p-6 h-64">
                                <h4 className="text-neutral-900 dark:text-white font-medium mb-2">3D Tilt</h4>
                                <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                                    Perspective tilt with glare effect for depth
                                </p>
                            </TiltSpotlightCard>
                        </div>
                    ),
                    code: tiltSpotlightCode,
                },
            ]}
            props={[
                {
                    name: "spotlightColor",
                    type: "string",
                    default: "rgba(120, 119, 198, 0.3)",
                    description: "Color of the spotlight effect.",
                },
                {
                    name: "glowIntensity",
                    type: "number",
                    default: "0.15",
                    description: "Intensity of the glow effect (0-1).",
                },
                {
                    name: "borderRadius",
                    type: "number",
                    default: "16",
                    description: "Border radius in pixels.",
                },
                {
                    name: "maxTilt",
                    type: "number",
                    default: "10",
                    description: "Maximum tilt angle in degrees (for TiltSpotlightCard).",
                },
                {
                    name: "borderColor",
                    type: "string",
                    description: "Custom border color.",
                },
                {
                    name: "borderWidth",
                    type: "number",
                    default: "1",
                    description: "Width of the border in pixels.",
                },
            ]}
        />
    )
}
