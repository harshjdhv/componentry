import React from "react";
import {
  ParticleGalaxyDemo,
  ParticleGalaxyCustomDemo,
  ParticleGalaxyDenseDemo,
  ParticleGalaxySlowDemo,
} from "@/components/docs/previews/particle-galaxy-preview";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";

const basicUsageCode = `import { ParticleGalaxy } from "@/components/ui/particle-galaxy"

export default function Hero() {
  return (
    <div className="relative h-screen w-full">
      <ParticleGalaxy />
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-6xl font-bold">Your Content Here</h1>
      </div>
    </div>
  )
}`;

const customColorsCode = `import { ParticleGalaxy } from "@/components/ui/particle-galaxy"

<ParticleGalaxy 
  colors={["#10b981", "#06b6d4", "#3b82f6"]}
  spiralArms={5}
  particleCount={15000}
  spread={3.5}
/>`;

const denseGalaxyCode = `import { ParticleGalaxy } from "@/components/ui/particle-galaxy"

<ParticleGalaxy 
  colors={["#f97316", "#ef4444", "#ec4899"]}
  particleCount={20000}
  particleSize={0.025}
  centerConcentration={0.8}
  density={0.9}
  glow={80}
  spread={2}
/>`;

const slowRotateCode = `import { ParticleGalaxy } from "@/components/ui/particle-galaxy"

<ParticleGalaxy 
  colors={["#8b5cf6", "#ec4899", "#f97316"]}
  rotationSpeed={0.0005}
  mouseInfluence={0.8}
  cameraMovement={false}
  pulsate={false}
/>`;

export async function ParticleGalaxyDocs() {
  const sourceCode =
    (await readComponentSource("particle-galaxy")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Particle Galaxy"
      description="A stunning 3D particle system that creates an interactive spiral galaxy using Three.js and custom WebGL shaders. Features smooth mouse-controlled rotation, realistic particle distribution, and extensive customization options."
      preview={<ParticleGalaxyDemo />}
      previewCode={basicUsageCode}
      installPackageName="particle-galaxy"
      installDependencies="three clsx tailwind-merge"
      installSourceCode={sourceCode}
      usageCode={basicUsageCode}
      fullWidthPreview={true}
      examples={[
        {
          title: "Custom Colors & 5 Arms",
          preview: <ParticleGalaxyCustomDemo />,
          code: customColorsCode,
          fullWidth: true,
        },
        {
          title: "Dense Center & High Glow",
          preview: <ParticleGalaxyDenseDemo />,
          code: denseGalaxyCode,
          fullWidth: true,
        },
        {
          title: "Slow Rotation & Static Camera",
          preview: <ParticleGalaxySlowDemo />,
          code: slowRotateCode,
          fullWidth: true,
        },
      ]}
      props={[
        {
          name: "particleCount",
          type: "number",
          default: "10000",
          description: "Number of particles in the galaxy.",
        },
        {
          name: "particleSize",
          type: "number",
          default: "0.02",
          description: "Base size of individual particles.",
        },
        {
          name: "rotationSpeed",
          type: "number",
          default: "0.001",
          description: "Speed of automatic galaxy rotation.",
        },
        {
          name: "spiralArms",
          type: "number",
          default: "3",
          description: "Number of spiral arms in the galaxy.",
        },
        {
          name: "colors",
          type: "[string, string, string]",
          default: '["#4f46e5", "#8b5cf6", "#06b6d4"]',
          description: "Array of 3 hex colors for galaxy coloring.",
        },
        {
          name: "mouseInfluence",
          type: "number",
          default: "0.5",
          description: "Strength of mouse interaction, 0-1.",
        },
        {
          name: "autoRotate",
          type: "boolean",
          default: "true",
          description: "Enable automatic rotation.",
        },
        {
          name: "blendMode",
          type: '"additive" | "normal"',
          default: '"additive"',
          description: "Blend mode for particles.",
        },
        {
          name: "spread",
          type: "number",
          default: "2.5",
          description: "How spread out the galaxy is, 1-5.",
        },
        {
          name: "density",
          type: "number",
          default: "0.7",
          description: "Particle opacity/density, 0-1.",
        },
        {
          name: "glow",
          type: "number",
          default: "60",
          description: "Glow intensity around particles, 0-100.",
        },
        {
          name: "cameraMovement",
          type: "boolean",
          default: "true",
          description: "Enable gentle camera movement.",
        },
        {
          name: "centerConcentration",
          type: "number",
          default: "0.5",
          description: "Concentration of particles toward center, 0-1.",
        },
        {
          name: "pulsate",
          type: "boolean",
          default: "true",
          description: "Enable particle pulsation animation.",
        },
        {
          name: "pulsateSpeed",
          type: "number",
          default: "1",
          description: "Speed of particle pulsation, 0.1-2.",
        },
      ]}
    />
  );
}
