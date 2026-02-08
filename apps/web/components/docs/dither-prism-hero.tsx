import React from "react";
import {
    DitherPrismHeroDemo,
    DitherPrismHeroCyberpunkDemo,
    DitherPrismHeroSunsetDemo,
    DitherPrismHeroOceanDemo,
    DitherPrismHeroIntenseDemo,
} from "@/components/docs/previews/dither-prism-hero-preview";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";

const basicUsageCode = `import { DitherPrismHero } from "@/components/ui/dither-prism-hero"

<DitherPrismHero 
    title1="Experience" 
    title2="The Future"
    description="Move your cursor to interact"
/>`;

const cyberpunkCode = `<DitherPrismHero 
    color1="#0a0a0a"
    color2="#00ff88"
    color3="#00ffff"
    title1="Cyber"
    title2="Punk"
    ditherIntensity={0.25}
    prismIntensity={0.7}
/>`;

const sunsetCode = `<DitherPrismHero 
    color1="#1a0a0a"
    color2="#ff6b35"
    color3="#ffd93d"
    title1="Golden"
    title2="Hour"
    ditherIntensity={0.12}
    prismIntensity={0.4}
/>`;

const oceanCode = `<DitherPrismHero 
    color1="#0a1628"
    color2="#0ea5e9"
    color3="#22d3ee"
    title1="Deep"
    title2="Ocean"
    speed={0.7}
    showParticles={true}
    particleCount={100}
/>`;

const intenseCode = `<DitherPrismHero 
    ditherIntensity={0.3}
    prismIntensity={0.9}
    mouseIntensity={1.0}
    speed={1.5}
    title1="Maximum"
    title2="Impact"
/>`;

export async function DitherPrismHeroDocs() {
    const sourceCode =
        (await readComponentSource("dither-prism-hero")) ||
        "// Unable to load source code";

    return (
        <DocsPageLayout
            title="Dither Prism Hero"
            description="A breathtaking WebGL hero background that combines advanced dithering techniques (8x8 Bayer matrix + animated blue noise), prismatic color refraction, holographic iridescence, morphing crystal patterns, mouse-reactive ripples, floating particles, and cinematic scanlines - all rendered in real-time with GLSL shaders. This component will leave users in awe."
            preview={<DitherPrismHeroDemo />}
            previewCode={basicUsageCode}
            installPackageName="dither-prism-hero"
            installDependencies="framer-motion @react-three/fiber three"
            installSourceCode={sourceCode}
            usageCode={basicUsageCode}
            fullWidthPreview={true}
            examples={[
                {
                    title: "Cyberpunk Theme",
                    preview: <DitherPrismHeroCyberpunkDemo />,
                    code: cyberpunkCode,
                    fullWidth: true,
                },
                {
                    title: "Sunset Theme",
                    preview: <DitherPrismHeroSunsetDemo />,
                    code: sunsetCode,
                    fullWidth: true,
                },
                {
                    title: "Ocean Theme",
                    preview: <DitherPrismHeroOceanDemo />,
                    code: oceanCode,
                    fullWidth: true,
                },
                {
                    title: "Maximum Intensity",
                    preview: <DitherPrismHeroIntenseDemo />,
                    code: intenseCode,
                    fullWidth: true,
                },
            ]}
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
