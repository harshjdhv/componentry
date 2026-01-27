import React from "react"
import { TextAnimate } from "@workspace/ui/components/text-animate"
import { DocsPageLayout } from "@/components/docs-page-layout"
import { TextAnimatePreview } from "@/components/docs/previews/text-animate-preview"
import { readComponentSource } from "@/lib/source-code"

const exampleCode = `import { TextAnimate } from "@/components/ui/text-animate"

export function TextAnimateDemo() {
  return (
    <TextAnimate animation="blurInUp" by="character">
      Blur In Up
    </TextAnimate>
  )
}
`

const blurInUpWordCode = `<TextAnimate animation="blurInUp" by="word">
  Blur In Up By Word
</TextAnimate>`

const byWordCode = `<TextAnimate animation="fadeIn" by="word">
  Word Split Animation
</TextAnimate>`

const fadeInCharacterCode = `<TextAnimate animation="fadeIn" by="character">
  Fade In By Character
</TextAnimate>`

const scaleUpCode = `<TextAnimate animation="scaleUp" by="text">
  Scale Up Text
</TextAnimate>`

export async function TextAnimateDocs() {
    const sourceCode = (await readComponentSource("text-animate")) || "// Unable to load source code"

    return (
        <DocsPageLayout
            title="Text Animate"
            description="A premium text animation component with multiple presets including blur, fade, slide, and scale effects."
            preview={
                <TextAnimatePreview animation="blurInUp" by="character" className="text-4xl font-bold">
                    Blur In Up
                </TextAnimatePreview>
            }
            previewCode={exampleCode}
            installPackageName="text-animate"
            installDependencies="framer-motion"
            installSourceCode={sourceCode}
            usageCode={exampleCode}
            examples={[
                {
                    title: "Blur In Up (by Character)",
                    preview: (
                        <TextAnimatePreview animation="blurInUp" by="character" className="text-4xl font-bold">
                            Blur In Up
                        </TextAnimatePreview>
                    ),
                    code: exampleCode,
                },
                {
                    title: "Blur In Up (by Word)",
                    preview: (
                        <TextAnimatePreview animation="blurInUp" by="word" className="text-4xl font-bold">
                            Blur In Up By Word
                        </TextAnimatePreview>
                    ),
                    code: blurInUpWordCode,
                },
                {
                    title: "Fade In (by Word)",
                    preview: (
                        <TextAnimatePreview animation="fadeIn" by="word" className="text-4xl font-bold text-primary">
                            Word Split Animation
                        </TextAnimatePreview>
                    ),
                    code: byWordCode,
                },
                {
                    title: "Fade In (by Character)",
                    preview: (
                        <TextAnimatePreview animation="fadeIn" by="character" className="text-4xl font-bold text-primary">
                            Fade In By Character
                        </TextAnimatePreview>
                    ),
                    code: fadeInCharacterCode,
                },
                {
                    title: "Scale Up (Whole Text)",
                    preview: (
                        <TextAnimatePreview animation="scaleUp" by="text" className="text-5xl font-black">
                            Scale Up!
                        </TextAnimatePreview>
                    ),
                    code: scaleUpCode,
                },
            ]}
            props={[
                {
                    name: "children",
                    type: "string",
                    description: "The text content to animate.",
                },
                {
                    name: "animation",
                    type: "union", // simplified from exact enum for brevity/display
                    description: "fadeIn, blurIn, blurInUp, blurInDown, slideUp, slideDown, slideLeft, slideRight, scaleUp, scaleDown",
                },
                {
                    name: "by",
                    type: "text | word | character",
                    default: "word",
                    description: "How to split the text.",
                },
                {
                    name: "startOnView",
                    type: "boolean",
                    default: "true",
                    description: "Whether to start animation when element enters viewport.",
                },
                {
                    name: "once",
                    type: "boolean",
                    default: "true",
                    description: "Whether to run animation only once.",
                },
                {
                    name: "duration",
                    type: "number",
                    default: "0.3",
                    description: "Duration of the animation per segment in seconds.",
                },
                {
                    name: "delay",
                    type: "number",
                    default: "0",
                    description: "Delay before starting the animation in seconds.",
                },
            ]}
        />
    )
}
