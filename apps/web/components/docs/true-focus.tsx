import React from "react"
import { TrueFocus } from "@workspace/ui/components/true-focus"
import { DocsPageLayout } from "@/components/docs-page-layout"
import { readComponentSource } from "@/lib/source-code"

const autoCode = `import { TrueFocus } from "@/components/ui/true-focus"

export function TrueFocusDemo() {
  return (
    <TrueFocus 
      sentence="Reality Is Broken"
      manualMode={false}
      blurAmount={5}
      borderColor="green"
      glowColor="rgba(0, 255, 0, 0.6)"
    />
  )
}
`

const manualCode = `import { TrueFocus } from "@/components/ui/true-focus"

export function TrueFocusManualDemo() {
  return (
    <TrueFocus 
      sentence="Hover To Focus"
      manualMode={true}
      blurAmount={5}
      borderColor="cyan"
      glowColor="rgba(0, 255, 255, 0.6)"
    />
  )
}
`

export async function TrueFocusDocs() {
    const sourceCode = (await readComponentSource("true-focus")) || "// Unable to load source code"

    return (
        <DocsPageLayout
            title="True Focus"
            description="A 'temporal illusion' that directs attention by blurring everything except the current focal point. It mimics how the human eye processes depth of field."
            preview={
                <TrueFocus
                    sentence="Reality Is Broken"
                    manualMode={false}
                    blurAmount={5}
                    borderColor="#22c55e"
                    glowColor="rgba(34, 197, 94, 0.6)"
                />
            }
            previewCode={autoCode}
            installPackageName="true-focus"
            installDependencies="framer-motion"
            installSourceCode={sourceCode}
            usageCode={autoCode}
            examples={[
                {
                    title: "Manual Hover Mode",
                    preview: (
                        <TrueFocus
                            sentence="Hover To Focus"
                            manualMode={true}
                            blurAmount={5}
                            borderColor="#06b6d4"
                            glowColor="rgba(6, 182, 212, 0.6)"
                        />
                    ),
                    code: manualCode,
                },
            ]}
            props={[
                {
                    name: "sentence",
                    type: "string",
                    description: "The text content to display and animate through.",
                    default: "True Focus",
                },
                {
                    name: "manualMode",
                    type: "boolean",
                    description: "If true, focus follows mouse hover. If false, it auto-cycles.",
                    default: "false",
                },
                {
                    name: "blurAmount",
                    type: "number",
                    description: "The blur radius (in px) for non-focused words.",
                    default: "5",
                },
                {
                    name: "borderColor",
                    type: "string",
                    description: "Color of the focus bracket border.",
                    default: "green",
                },
                {
                    name: "glowColor",
                    type: "string",
                    description: "Color of the focus bracket glow/shadow.",
                    default: "rgba(0, 255, 0, 0.6)",
                },
                {
                    name: "animationDuration",
                    type: "number",
                    description: "Duration of the focus transition in seconds.",
                    default: "0.5",
                },
                {
                    name: "pauseBetweenAnimations",
                    type: "number",
                    description: "Pause time in seconds between auto-cycle steps.",
                    default: "1",
                },
            ]}
        />
    )
}
