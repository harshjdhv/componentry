import React from "react"
import { HyperText } from "@workspace/ui/components/hyper-text"
import { DocsPageLayout } from "@/components/docs-page-layout"
import { readComponentSource } from "@/lib/source-code"

const importCode = `import { HyperText } from "@/components/ui/hyper-text"`

const defaultCode = `import { HyperText } from "@/components/ui/hyper-text"

<HyperText text="Hyper Text" className="text-4xl font-bold" />`

const customDurationCode = `<HyperText
  text="Slower Reveal"
  duration={2000}
  className="text-4xl font-bold"
/>`

const hoverOnlyCode = `<HyperText
  text="Hover Me"
  animateOnLoad={false}
  className="text-4xl font-bold"
/>`

export async function HyperTextDocs() {
    const sourceCode = (await readComponentSource("hyper-text")) || "// Unable to load source code"

    return (
        <DocsPageLayout
            title="Hyper Text"
            description="A text component that scrambles letters before revealing the final text on hover or load."
            preview={
                <HyperText
                    text="Hyper Text"
                    className="text-4xl md:text-5xl font-bold text-foreground"
                />
            }
            previewCode={defaultCode}
            installPackageName="hyper-text"
            installDependencies="clsx tailwind-merge"
            installSourceCode={sourceCode}
            usageCode={importCode}
            examples={[
                {
                    title: "Custom Duration",
                    preview: (
                        <HyperText
                            text="Slower Reveal"
                            duration={2000}
                            className="text-4xl font-bold text-foreground"
                        />
                    ),
                    code: customDurationCode,
                },
                {
                    title: "Hover Trigger Only",
                    preview: (
                        <HyperText
                            text="Hover Me"
                            animateOnLoad={false}
                            className="text-4xl font-bold text-foreground"
                        />
                    ),
                    code: hoverOnlyCode,
                },
            ]}
            props={[
                {
                    name: "text",
                    type: "string",
                    description: "The text content to be animated.",
                },
                {
                    name: "duration",
                    type: "number",
                    default: "800",
                    description: "Total animation duration in milliseconds.",
                },
                {
                    name: "animateOnLoad",
                    type: "boolean",
                    default: "true",
                    description: "Whether to start the animation automatically on mount.",
                },
                {
                    name: "className",
                    type: "string",
                    description: "Additional CSS classes for styling.",
                },
            ]}
        />
    )
}
