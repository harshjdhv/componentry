import React from "react";
import { DitheredLogo } from "@workspace/ui/components/dithered-logo";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";

const componentryLogoSrc = "/images/dithered-logo/logo.svg";

const defaultCode = `import { DitheredLogo } from "@/components/ui/dithered-logo"

<div className="h-[430px] w-full bg-white text-black">
  <DitheredLogo
    imageSrc="https://componentry.dev/images/dithered-logo/logo.svg"
    className="h-full w-full"
    gridSize={200}
    scale={0.36}
    dotScale={1}
    invert={true}
    cornerRadius={0.2}
    gamma={1.0}
    blur={3.75}
    diffusionStrength={1.0}
  />
</div>`;

export async function DitheredLogoDocs() {
  const sourceCode =
    (await readComponentSource("dithered-logo")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Dithered Logo"
      description="A canvas-rendered particle logo that converts SVG or image assets into an interactive error-diffusion dither field with cursor repulsion and click ripples."
      preview={
        <div className="h-full min-h-full w-full bg-white text-black">
          <DitheredLogo
            imageSrc={componentryLogoSrc}
            className="h-full w-full"
            scale={0.36}
          />
        </div>
      }
      previewCode={defaultCode}
      installPackageName="dithered-logo"
      installDependencies="clsx tailwind-merge"
      installSourceCode={sourceCode}
      usageCode={defaultCode}
      fullWidthPreview
      props={[
        {
          name: "imageSrc",
          type: "string",
          description: "Image or SVG source used to generate the dithered particle field.",
        },
        {
          name: "gridSize",
          type: "number",
          default: "200",
          description: "Maximum sampled image dimension before dithering.",
        },
        {
          name: "scale",
          type: "number",
          default: "0.5",
          description: "Relative scale of the generated particle logo inside the canvas.",
        },
        {
          name: "dotScale",
          type: "number",
          default: "1",
          description: "Multiplier for each rendered particle size.",
        },
        {
          name: "invert",
          type: "boolean",
          default: "true",
          description: "Invert the generated dithered mask.",
        },
        {
          name: "cornerRadius",
          type: "number",
          default: "0.2",
          description: "Rounded mask radius used when invert mode is enabled.",
        },
        {
          name: "threshold",
          type: "number",
          default: "180",
          description: "Brightness threshold for error-diffusion dithering.",
        },
        {
          name: "contrast",
          type: "number",
          default: "0",
          description: "Contrast adjustment applied before dithering.",
        },
        {
          name: "gamma",
          type: "number",
          default: "1",
          description: "Gamma correction applied before dithering.",
        },
        {
          name: "blur",
          type: "number",
          default: "3.75",
          description: "Image blur amount applied before sampling the grayscale grid.",
        },
        {
          name: "diffusionStrength",
          type: "number",
          default: "1",
          description: "Strength of the Floyd-Steinberg error diffusion.",
        },
        {
          name: "serpentine",
          type: "boolean",
          default: "true",
          description: "Alternate dither scan direction on every row.",
        },
        {
          name: "particleColor",
          type: "string",
          default: '"currentColor"',
          description: "Canvas particle color. Uses the element text color by default.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes for the root element.",
        },
      ]}
    />
  );
}
