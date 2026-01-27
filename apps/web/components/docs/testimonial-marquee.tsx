import React from "react"
import { TestimonialMarquee } from "@workspace/ui/components/testimonial-marquee"
import { DocsPageLayout } from "@/components/docs-page-layout"
import { readComponentSource } from "@/lib/source-code"

const items = [
    {
        name: "Sarah Chen",
        username: "sarahchen",
        text: "This library has completely transformed how we build our UI. The animations are so smooth!",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
    },
    {
        name: "Alex Morgan",
        username: "alexm",
        text: "The best developer experience I've had in years. Highly recommended for any React project.",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=faces",
    },
    {
        name: "David Kim",
        username: "davidkim",
        text: "Incredible attention to detail. The micro-interactions are subtle but impactful.",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=faces",
    },
    {
        name: "Emily Watson",
        username: "emilyw",
        text: "Just copy and paste instantly. It's like magic for your frontend workflow.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces",
    },
    {
        name: "James Wilson",
        username: "jamesw",
        text: "I've tried many UI libraries, but Componentry stands out for its premium feel.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces",
    },
    {
        name: "Lisa Park",
        username: "lisap",
        text: "The stacked variant is exactly what I needed for my landing page's social proof section.",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=faces",
    },
]

const defaultCode = `import { TestimonialMarquee } from "@/components/ui/testimonial-marquee"

const items = [
  {
    name: "Sarah Chen",
    username: "sarahchen",
    text: "This library has completely transformed how we build our UI. The animations are so smooth!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
  },
  // ... other items
]

export function TestimonialMarqueeDemo() {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border bg-background/50">
      <TestimonialMarquee items={items} />
    </div>
  )
}`

const dualCode = `import { TestimonialMarquee } from "@/components/ui/testimonial-marquee"

export function TestimonialMarqueeDual() {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border bg-background/50">
      <TestimonialMarquee items={items} variant="dual" />
    </div>
  )
}`

const stackedCode = `import { TestimonialMarquee } from "@/components/ui/testimonial-marquee"

export function TestimonialMarqueeStacked() {
  return (
    <div className="relative h-[600px] w-full items-center justify-center overflow-hidden rounded-xl border bg-background/50">
      <TestimonialMarquee items={items} variant="stacked" />
    </div>
  )
}`

const flushCode = `import { TestimonialMarquee } from "@/components/ui/testimonial-marquee"

export function TestimonialMarqueeFlush() {
  return (
    <div className="relative w-full overflow-hidden border bg-background/50">
      <TestimonialMarquee items={items} variant="flush" />
    </div>
  )
}`

const flushDualCode = `import { TestimonialMarquee } from "@/components/ui/testimonial-marquee"

export function TestimonialMarqueeFlushDual() {
  return (
    <div className="relative w-full overflow-hidden border bg-background/50">
      <TestimonialMarquee items={items} variant="flush-dual" />
    </div>
  )
}`

export async function TestimonialMarqueeDocs() {
    const sourceCode = (await readComponentSource("testimonial-marquee")) || "// Unable to load source code"

    return (
        <DocsPageLayout
            title="Testimonial Marquee"
            description="A smooth, infinite scrolling marquee component for showcasing social proof and testimonials. Features micro-interactions, multiple layout variants, and seamless looping."
            preview={
                <div className="relative w-full overflow-hidden rounded-lg">
                    <TestimonialMarquee items={items} />
                </div>
            }
            previewCode={defaultCode}
            installPackageName="testimonial-marquee"
            installDependencies="clsx tailwind-merge"
            installSourceCode={sourceCode}
            usageCode={defaultCode}
            fullWidthPreview={true}
            examples={[
                {
                    title: "Dual Row Variant",
                    preview: (
                        <div className="relative w-full overflow-hidden rounded-lg">
                            <TestimonialMarquee items={items} variant="dual" />
                        </div>
                    ),
                    code: dualCode,
                    fullWidth: true,
                },
                {
                    title: "Stacked Variant",
                    preview: (
                        <div className="relative w-full overflow-hidden rounded-lg h-[600px]">
                            <TestimonialMarquee items={items} variant="stacked" />
                        </div>
                    ),
                    code: stackedCode,
                    fullWidth: true,
                },
                {
                    title: "Flush Variant",
                    preview: (
                        <div className="relative w-full overflow-hidden rounded-lg">
                            <TestimonialMarquee items={items} variant="flush" />
                        </div>
                    ),
                    code: flushCode,
                    fullWidth: true,
                },
                {
                    title: "Flush Dual Variant",
                    preview: (
                        <div className="relative w-full overflow-hidden rounded-lg">
                            <TestimonialMarquee items={items} variant="flush-dual" />
                        </div>
                    ),
                    code: flushDualCode,
                    fullWidth: true,
                },
            ]}
            props={[
                {
                    name: "items",
                    type: "Testimonial[]",
                    description: "Array of Testimonial objects (name, text, avatar, username?, role?, profileLink?)",
                },
                {
                    name: "variant",
                    type: "string",
                    default: "default",
                    description: "Layout variant: 'default' | 'stacked' | 'dual' | 'flush' | 'flush-dual'",
                },
                {
                    name: "speed",
                    type: "number",
                    default: "30",
                    description: "Animation speed in seconds. Higher is slower.",
                },
                {
                    name: "containerClassName",
                    type: "string",
                    description: "Optional class name for the inner container.",
                },
            ]}
        />
    )
}
