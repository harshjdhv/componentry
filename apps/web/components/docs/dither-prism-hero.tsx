import React from "react";
import { DitherPrismHeroPlayground } from "@/components/docs/previews/dither-prism-hero-playground";
import { LiveCodeBlock } from "@/components/live-code-block";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";

const basicUsageCode = `import { DitherPrismHero } from "@/components/ui/dither-prism-hero"

<DitherPrismHero 
    color1="#0f0f23" 
    color2="#6366f1"
/>`;

export async function DitherPrismHeroDocs() {
    const sourceCode =
        (await readComponentSource("dither-prism-hero")) ||
        "// Unable to load source code";

    return (
        <DocsPageLayout
            title="Dither Prism Hero"
            description="A breathtaking WebGL hero background featuring advanced dithering, prismatic refraction, and holographic iridescence rendered in real-time with GLSL."
            preview={<DitherPrismHeroPlayground />}
            previewCode=""
            installPackageName="dither-prism-hero"
            installDependencies="@react-three/fiber three"
            installSourceCode={sourceCode}
            usageCode={<LiveCodeBlock defaultCode={basicUsageCode} />}
            fullWidthPreview={true}
            unstyledPreview={true}
            props={[
                {
                    name: "color1",
                    type: "string",
                    default: '"#0f0f23"',
                    description: "Primary color (deep/dark) for the gradient base.",
                },
                {
                    name: "color2",
                    type: "string",
                    default: '"#6366f1"',
                    description: "Secondary color (mid-tone) for gradient transitions.",
                },
                {
                    name: "color3",
                    type: "string",
                    default: '"#ec4899"',
                    description: "Tertiary color (bright/accent) for gradient highlights.",
                },
                {
                    name: "speed",
                    type: "number",
                    default: "1",
                    description: "Animation speed multiplier for all shader effects.",
                },
                {
                    name: "ditherIntensity",
                    type: "number",
                    default: "0.15",
                    description: "Intensity of the dithering effect (0-1). Higher values create a more pronounced retro/grainy look.",
                },
                {
                    name: "prismIntensity",
                    type: "number",
                    default: "0.5",
                    description: "Intensity of the prismatic rainbow refraction (0-1).",
                },
                {
                    name: "showParticles",
                    type: "boolean",
                    default: "true",
                    description: "Whether to show floating particles layer.",
                },
                {
                    name: "particleCount",
                    type: "number",
                    default: "50",
                    description: "Number of floating particles (performance consideration).",
                },
                {
                    name: "particleColor",
                    type: "string",
                    default: '"#ffffff"',
                    description: "Color of the floating particles.",
                },
                {
                    name: "className",
                    type: "string",
                    description: "Additional CSS classes for the container.",
                },
            ]}
        />
    );
}
