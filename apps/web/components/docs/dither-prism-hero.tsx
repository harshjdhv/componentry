import React from "react";
import { DitherPrismHeroPlayground } from "@/components/docs/previews/dither-prism-hero-playground";
import { LiveCodeBlock } from "@/components/live-code-block";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";

const basicUsageCode = `import { DitherPrismHero } from "@/components/ui/dither-prism-hero"

<DitherPrismHero 
    title1="Experience" 
    title2="The Future"
    description="Move your cursor to interact"
/>`;

export async function DitherPrismHeroDocs() {
    const sourceCode =
        (await readComponentSource("dither-prism-hero")) ||
        "// Unable to load source code";

    return (
        <DocsPageLayout
            title="Dither Prism Hero"
            description="A breathtaking WebGL hero background featuring advanced dithering, prismatic refraction, holographic iridescence, and mouse-reactive ripples - rendered in real-time with GLSL."
            preview={<DitherPrismHeroPlayground />}
            previewCode=""
            installPackageName="dither-prism-hero"
            installDependencies="framer-motion @react-three/fiber three"
            installSourceCode={sourceCode}
            usageCode={<LiveCodeBlock defaultCode={basicUsageCode} />}
            fullWidthPreview={false}
            unstyledPreview={true}
            props={[
                {
                    name: "title1",
                    type: "string",
                    description: "First line of the main headline (serif, italic font).",
                },
                {
                    name: "title2",
                    type: "string",
                    description: "Second line of the main headline (sans-serif, bold).",
                },
                {
                    name: "description",
                    type: "string",
                    description: "Subtitle text displayed below the headline.",
                },
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
                    name: "mouseIntensity",
                    type: "number",
                    default: "0.5",
                    description: "Intensity of mouse-reactive ripple effects (0-1).",
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
                    name: "children",
                    type: "ReactNode",
                    description: "Custom content to render on top of the background (e.g., buttons, forms).",
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
