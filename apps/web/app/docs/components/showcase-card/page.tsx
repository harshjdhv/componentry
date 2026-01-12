import type React from "react"
import type { Metadata } from "next"
import {
    ShowcaseCard,
    ShowcaseCardCompact,
    ShowcaseGrid,
} from "@workspace/ui/components/showcase-card"
import { InstallCommand } from "@/components/install-command"
import { CodeBlock } from "@/components/code-block"
import { ComponentLayout, Section } from "@/components/component-layout"

export const metadata: Metadata = {
    title: "Showcase Card Component",
    description: "A premium showcase card with 3D tilt effect, parallax image, and micro-interactions. Perfect for portfolios and agency sites. Free React component by Harsh Jadhav.",
    alternates: {
        canonical: "https://componentry.fun/docs/components/showcase-card",
    },
}

const defaultCardCode = `import { ShowcaseCard } from "@/components/ui/showcase-card"

<ShowcaseCard
  tagline="Work fast. Live slow."
  heading="Create your digital reality."
  description="From nothing to everything, let's bring your vision to life."
  imageUrl="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
  ctaText="Send a message"
  onCtaClick={() => console.log("CTA clicked")}
  brandName="studio.design"
  services={["web", "product", "brand"]}
/>`

const noTiltCode = `import { ShowcaseCard } from "@/components/ui/showcase-card"

<ShowcaseCard
  tagline="Simple & Clean"
  heading="Minimal interaction."
  description="A cleaner version without 3D effects."
  imageUrl="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&q=80"
  ctaText="Learn more"
  enableTilt={false}
  enableParallax={false}
/>`

const compactCode = `import { ShowcaseCardCompact, ShowcaseGrid } from "@/components/ui/showcase-card"

<ShowcaseGrid columns={3}>
  <ShowcaseCardCompact
    heading="Mountain Summit"
    description="Reaching new heights in design"
    imageUrl="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80"
  />
  <ShowcaseCardCompact
    heading="Ocean Depths"
    description="Diving deep into creativity"
    imageUrl="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&q=80"
  />
  <ShowcaseCardCompact
    heading="Forest Path"
    description="Finding your way forward"
    imageUrl="https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80"
  />
</ShowcaseGrid>`

export default function ShowcaseCardPage(): React.JSX.Element {
    return (
        <ComponentLayout
            title="Showcase Card"
            description="A premium showcase card component with 3D tilt effect, parallax image, and delightful micro-interactions. Perfect for portfolios, agency websites, and product showcases."
        >
            <Section title="Install">
                <InstallCommand component="showcase-card" />
            </Section>

            <Section title="Examples">
                <div className="space-y-12">

                    <div className="space-y-0">
                        <h3 className="text-xl font-medium mb-4">Default</h3>
                        <div className="p-8 bg-muted/30 rounded-t-xl rounded-b-none border-b border-border flex items-center justify-center min-h-[600px]">
                            <ShowcaseCard
                                tagline="Work fast. Live slow."
                                heading="Create your digital reality."
                                description="From nothing to everything, let's bring your vision to life."
                                imageUrl="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
                                ctaText="Send a message"

                                brandName="studio.design"
                                services={["web", "product", "brand"]}
                            />
                        </div>
                        <CodeBlock code={defaultCardCode} lang="tsx" className="rounded-t-none" />
                    </div>

                    <div className="space-y-0">
                        <h3 className="text-xl font-medium mb-4">Without 3D Effects</h3>
                        <div className="p-8 bg-muted/30 rounded-t-xl rounded-b-none border-b border-border flex items-center justify-center min-h-[600px]">
                            <ShowcaseCard
                                tagline="Simple & Clean"
                                heading="Minimal interaction."
                                description="A cleaner version without 3D effects for a more subtle experience."
                                imageUrl="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&q=80"
                                ctaText="Learn more"
                                enableTilt={false}
                                enableParallax={false}
                            />
                        </div>
                        <CodeBlock code={noTiltCode} lang="tsx" className="rounded-t-none" />
                    </div>

                    <div className="space-y-0">
                        <h3 className="text-xl font-medium mb-4">Compact Grid</h3>
                        <div className="p-8 bg-muted/30 rounded-t-xl rounded-b-none border-b border-border">
                            <ShowcaseGrid columns={3}>
                                <ShowcaseCardCompact
                                    heading="Mountain Summit"
                                    description="Reaching new heights in design"
                                    imageUrl="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80"
                                />
                                <ShowcaseCardCompact
                                    heading="Ocean Depths"
                                    description="Diving deep into creativity"
                                    imageUrl="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&q=80"
                                />
                                <ShowcaseCardCompact
                                    heading="Forest Path"
                                    description="Finding your way forward"
                                    imageUrl="https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80"
                                />
                            </ShowcaseGrid>
                        </div>
                        <CodeBlock code={compactCode} lang="tsx" className="rounded-t-none" />
                    </div>

                </div>
            </Section>

            <Section title="Features">
                <div className="grid grid-cols-1 divide-y border rounded-xl bg-muted/30">
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-medium text-sm">3D Tilt Effect</div>
                        <div className="text-sm text-muted-foreground">
                            Smooth perspective-based tilt that follows cursor movement with spring physics
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-medium text-sm">Image Parallax</div>
                        <div className="text-sm text-muted-foreground">
                            Hero image moves subtly in response to cursor position for depth
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-medium text-sm">Glow Effects</div>
                        <div className="text-sm text-muted-foreground">
                            Dynamic radial gradient glow follows cursor for premium feel
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-medium text-sm">Button Shine</div>
                        <div className="text-sm text-muted-foreground">
                            CTA button features a sweeping shine animation on hover
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-medium text-sm">Multiple Variants</div>
                        <div className="text-sm text-muted-foreground">
                            Choose from default, compact (for grids), or horizontal layouts
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-medium text-sm">Fully Responsive</div>
                        <div className="text-sm text-muted-foreground">
                            Adapts beautifully from mobile to desktop with optimized touch interactions
                        </div>
                    </div>
                </div>
            </Section>

            <Section title="Props">
                <div className="grid grid-cols-1 divide-y border rounded-xl bg-muted/30">
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">tagline</div>
                        <div className="text-sm text-muted-foreground">
                            Optional text displayed at the top of the image section
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">heading</div>
                        <div className="text-sm text-muted-foreground">
                            Main title text (required)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">description</div>
                        <div className="text-sm text-muted-foreground">
                            Supporting text below the heading
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">imageUrl</div>
                        <div className="text-sm text-muted-foreground">
                            URL for the hero image (required)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">ctaText</div>
                        <div className="text-sm text-muted-foreground">
                            Text for the call-to-action button
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">onCtaClick</div>
                        <div className="text-sm text-muted-foreground">
                            Click handler for the CTA button
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">brandName</div>
                        <div className="text-sm text-muted-foreground">
                            Brand or company name for the footer
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">services</div>
                        <div className="text-sm text-muted-foreground">
                            Array of service tags displayed in footer (e.g., ["web", "product"])
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">enableTilt</div>
                        <div className="text-sm text-muted-foreground">
                            Enable 3D tilt effect on hover (default: true)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">maxTilt</div>
                        <div className="text-sm text-muted-foreground">
                            Maximum tilt angle in degrees (default: 8)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">enableParallax</div>
                        <div className="text-sm text-muted-foreground">
                            Enable parallax effect on image (default: true)
                        </div>
                    </div>
                </div>
            </Section>

            <Section title="Variants">
                <div className="grid grid-cols-1 divide-y border rounded-xl bg-muted/30">
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">ShowcaseCard</div>
                        <div className="text-sm text-muted-foreground">
                            Default vertical card with full features, 3D tilt, and parallax
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">ShowcaseCardCompact</div>
                        <div className="text-sm text-muted-foreground">
                            Minimal card for grids, with hover scale and arrow indicator
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">ShowcaseGrid</div>
                        <div className="text-sm text-muted-foreground">
                            Responsive grid container for ShowcaseCardCompact items
                        </div>
                    </div>
                </div>
            </Section>
        </ComponentLayout>
    )
}
