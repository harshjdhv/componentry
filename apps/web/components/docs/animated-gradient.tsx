import React from "react";
import { AnimatedGradientPlayground } from "@/components/docs/previews/animated-gradient-playground";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { LiveCodeBlock } from "@/components/live-code-block";
import { readComponentSource } from "@/lib/source-code";

const importCode = `import { AnimatedGradient } from "@/components/ui/animated-gradient"`;
const defaultCode = `<AnimatedGradient config={{ preset: "Aurora" }} />`;

export async function AnimatedGradientDocs() {
    const sourceCode =
        (await readComponentSource("animated-gradient")) ||
        "// Unable to load source code";

    return (
        <DocsPageLayout
            title="Animated Gradient"
            description="A beautiful, animated, and customizable WebGL gradient with noise capabilities."
            preview={<AnimatedGradientPlayground />}
            previewCode=""
            installPackageName="animated-gradient"
            installDependencies=""
            installSourceCode={sourceCode}
            importCode={importCode}
            usageCode={<LiveCodeBlock defaultCode={defaultCode} />}
            fullWidthPreview={true}
            unstyledPreview={true}
            props={[
                {
                    name: "config",
                    type: "GradientConfig",
                    description: "Preset or custom configuration for the gradient pattern.",
                },
                {
                    name: "noise",
                    type: "NoiseConfig",
                    description: "Options to apply a noise overlay.",
                },
                {
                    name: "radius",
                    type: "string",
                    default: '"0px"',
                    description: "Border radius applied to the container.",
                },
                {
                    name: "className",
                    type: "string",
                    description: "Additional CSS classes for styling.",
                },
                {
                    name: "style",
                    type: "CSSProperties",
                    description: "Additional inline CSS styles.",
                },
            ]}
        />
    );
}
