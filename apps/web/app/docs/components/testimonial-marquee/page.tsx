"use client"

import { TestimonialMarquee } from "@workspace/ui/components/testimonial-marquee"
import { InstallCommand } from "@/components/install-command"
import { CodeBlock } from "@/components/code-block"
import { ComponentLayout, Section } from "@/components/component-layout"

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
  // Note: The component automatically duplicates items if there are fewer than 10.
  // For optimal performance and variety, provide 5+ unique items.
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
}
`

const flushDualCode = `import { TestimonialMarquee } from "@/components/ui/testimonial-marquee"

export function TestimonialMarqueeFlushDual() {
  return (
    <div className="relative w-full overflow-hidden border bg-background/50">
      <TestimonialMarquee items={items} variant="flush-dual" />
    </div>
  )
}`

export default function TestimonialMarqueePage() {
  return (
    <ComponentLayout
      title="Testimonial Marquee"
      description="A smooth, infinite scrolling marquee component for showcasing social proof and testimonials. Features micro-interactions, multiple layout variants, and seamless looping."
    >
      <Section title="Install">
        <InstallCommand component="testimonial-marquee" />
      </Section>

      <Section title="Examples">
        <div className="space-y-12">

          <div className="space-y-0">
            <h3 className="text-xl font-medium mb-4">Default Variant</h3>
            <div className="relative overflow-hidden rounded-t-xl rounded-b-none border border-border bg-background/50 p-6">
              <TestimonialMarquee items={items} />
            </div>
            <CodeBlock code={defaultCode} lang="tsx" className="rounded-t-none" />
          </div>

          <div className="space-y-0">
            <h3 className="text-xl font-medium mb-4">Dual Row Variant</h3>
            <div className="relative overflow-hidden rounded-t-xl rounded-b-none border border-border bg-background/50 p-6">
              <TestimonialMarquee items={items} variant="dual" />
            </div>
            <CodeBlock code={dualCode} lang="tsx" className="rounded-t-none" />
          </div>

          <div className="space-y-0">
            <h3 className="text-xl font-medium mb-4">Stacked Variant</h3>
            <div className="relative flex h-[600px] items-center justify-center overflow-hidden rounded-t-xl rounded-b-none border border-border bg-background/50 p-6">
              <TestimonialMarquee items={items} variant="stacked" />
            </div>
            <CodeBlock code={stackedCode} lang="tsx" className="rounded-t-none" />
          </div>

          <div className="space-y-0">
            <h3 className="text-xl font-medium mb-4">Flush Variant</h3>
            <div className="relative overflow-hidden border border-border bg-background/50 p-6">
              <TestimonialMarquee items={items} variant="flush" />
            </div>
            <CodeBlock code={flushCode} lang="tsx" className="rounded-t-none" />
          </div>

          <div className="space-y-0">
            <h3 className="text-xl font-medium mb-4">Flush Dual Variant</h3>
            <div className="relative overflow-hidden border border-border bg-background/50 p-6">
              <TestimonialMarquee items={items} variant="flush-dual" />
            </div>
            <CodeBlock code={flushDualCode} lang="tsx" className="rounded-t-none" />
          </div>

        </div>
      </Section>

      <Section title="Props">
        <div className="grid grid-cols-1 divide-y border rounded-xl bg-muted/30">
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
            <div className="font-mono text-sm">items</div>
            <div className="text-sm text-muted-foreground">
              Array of Testimonial objects (name, text, avatar, username?, role?, profileLink?)
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
            <div className="font-mono text-sm">variant</div>
            <div className="text-sm text-muted-foreground">
              Layout variant: &apos;default&apos; | &apos;stacked&apos; | &apos;dual&apos; | &apos;flush&apos; | &apos;flush-dual&apos; (default: &apos;default&apos;)
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
            <div className="font-mono text-sm">speed</div>
            <div className="text-sm text-muted-foreground">
              Animation speed in seconds. Higher is slower. (default: 30)
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
            <div className="font-mono text-sm">containerClassName</div>
            <div className="text-sm text-muted-foreground">
              Optional class name for the inner container.
            </div>
          </div>
        </div>
      </Section>
    </ComponentLayout>
  )
}
