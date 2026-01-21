import type { Metadata } from "next"
import { TextAnimateDemo } from "./text-animate-demo"
import { InstallCommand } from "@/components/install-command"
import { CodeBlock } from "@/components/code-block"
import { ComponentLayout, Section } from "@/components/component-layout"

export const metadata: Metadata = {
    title: "Text Animate",
    description: "A premium text animation component with multiple presets including blur, fade, slide, and scale effects.",
    alternates: { canonical: "https://componentry.fun/docs/components/text-animate" },
}

const exampleCode = `import { TextAnimate } from "@/components/ui/text-animate"

export function TextAnimateDemo() {
  return (
    <TextAnimate animation="blurInUp" by="character">
      Blur In Up
    </TextAnimate>
  )
}`

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

export default function Page() {
    return (
        <ComponentLayout
            title="Text Animate"
            description="A versatile text animation component that supports staggering, blurring, sliding, and scaling of characters or words."
        >
            <Section title="Install" id="install">
                <InstallCommand component="text-animate" />
            </Section>

            <Section title="Examples" id="examples">
                <div className="space-y-12">
                    {/* Default Blur Character */}
                    <div className="space-y-0">
                        <h3 className="text-xl font-medium mb-4">Blur In Up (by Character)</h3>
                        <TextAnimateDemo animation="blurInUp" by="character" className="text-4xl font-bold">
                            Blur In Up
                        </TextAnimateDemo>
                        <CodeBlock code={exampleCode} lang="tsx" className="rounded-t-none" />
                    </div>

                    {/* Blur Word */}
                    <div className="space-y-0">
                        <h3 className="text-xl font-medium mb-4">Blur In Up (by Word)</h3>
                        <TextAnimateDemo animation="blurInUp" by="word" className="text-4xl font-bold">
                            Blur In Up By Word
                        </TextAnimateDemo>
                        <CodeBlock code={blurInUpWordCode} lang="tsx" className="rounded-t-none" />
                    </div>

                    {/* Fade In Word */}
                    <div className="space-y-0">
                        <h3 className="text-xl font-medium mb-4">Fade In (by Word)</h3>
                        <TextAnimateDemo animation="fadeIn" by="word" className="text-4xl font-bold text-primary">
                            Word Split Animation
                        </TextAnimateDemo>
                        <CodeBlock code={byWordCode} lang="tsx" className="rounded-t-none" />
                    </div>

                    {/* Fade In Character */}
                    <div className="space-y-0">
                        <h3 className="text-xl font-medium mb-4">Fade In (by Character)</h3>
                        <TextAnimateDemo animation="fadeIn" by="character" className="text-4xl font-bold text-primary">
                            Fade In By Character
                        </TextAnimateDemo>
                        <CodeBlock code={fadeInCharacterCode} lang="tsx" className="rounded-t-none" />
                    </div>

                    {/* Scale Up */}
                    <div className="space-y-0">
                        <h3 className="text-xl font-medium mb-4">Scale Up (Whole Text)</h3>
                        <TextAnimateDemo animation="scaleUp" by="text" className="text-5xl font-black">
                            Scale Up!
                        </TextAnimateDemo>
                        <CodeBlock code={scaleUpCode} lang="tsx" className="rounded-t-none" />
                    </div>
                </div>
            </Section>

            <Section title="Props" id="props">
                <div className="grid grid-cols-1 divide-y border rounded-xl bg-muted/30">
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">children</div>
                        <div className="text-sm text-muted-foreground">The text content to animate (string).</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">animation</div>
                        <div className="text-sm text-muted-foreground">
                            The animation type: <code>fadeIn</code>, <code>blurIn</code>, <code>blurInUp</code>, <code>blurInDown</code>, <code>slideUp</code>, <code>slideDown</code>, <code>slideLeft</code>, <code>slideRight</code>, <code>scaleUp</code>, <code>scaleDown</code>.
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">by</div>
                        <div className="text-sm text-muted-foreground">
                            How to split the text: <code>text</code>, <code>word</code>, or <code>character</code>. (default: <code>word</code>)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">startOnView</div>
                        <div className="text-sm text-muted-foreground">
                            Whether to start animation when element enters viewport. (default: <code>true</code>)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">once</div>
                        <div className="text-sm text-muted-foreground">
                            Whether to run animation only once. (default: <code>true</code>)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">duration</div>
                        <div className="text-sm text-muted-foreground">
                            Duration of the animation per segment in seconds. (default: <code>0.3</code>)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">delay</div>
                        <div className="text-sm text-muted-foreground">
                            Delay before starting the animation in seconds.
                        </div>
                    </div>
                </div>
            </Section>
        </ComponentLayout>
    )
}
