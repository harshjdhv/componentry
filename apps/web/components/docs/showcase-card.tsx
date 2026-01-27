import React from "react"
import {
    ShowcaseCard,
    ShowcaseCardCompact,
    ShowcaseGrid,
} from "@workspace/ui/components/showcase-card"
import { DocsPageLayout } from "@/components/docs-page-layout"
import { readComponentSource } from "@/lib/source-code"

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

export async function ShowcaseCardDocs() {
    const sourceCode = (await readComponentSource("showcase-card")) || "// Unable to load source code"

    return (
        <DocsPageLayout
            title="Showcase Card"
            description="A premium showcase card component with 3D tilt effect, parallax image, and delightful micro-interactions. Perfect for portfolios, agency websites, and product showcases."
            preview={
                <div className="flex w-full items-center justify-center p-8 min-h-[600px]">
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
            }
            previewCode={defaultCardCode}
            installPackageName="showcase-card"
            installDependencies="framer-motion clsx tailwind-merge"
            installSourceCode={sourceCode}
            usageCode={defaultCardCode}
            examples={[
                {
                    title: "Without 3D Effects",
                    preview: (
                        <div className="flex w-full items-center justify-center p-8 min-h-[600px]">
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
                    ),
                    code: noTiltCode,
                },
                {
                    title: "Compact Grid",
                    preview: (
                        <div className="flex w-full items-center justify-center p-8">
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
                    ),
                    code: compactCode,
                },
            ]}
            props={[
                {
                    name: "tagline",
                    type: "string",
                    description: "Optional text displayed at the top of the image section",
                },
                {
                    name: "heading",
                    type: "string",
                    description: "Main title text (required)",
                },
                {
                    name: "description",
                    type: "string",
                    description: "Supporting text below the heading",
                },
                {
                    name: "imageUrl",
                    type: "string",
                    description: "URL for the hero image (required)",
                },
                {
                    name: "ctaText",
                    type: "string",
                    description: "Text for the call-to-action button",
                },
                {
                    name: "onCtaClick",
                    type: "() => void",
                    description: "Click handler for the CTA button",
                },
                {
                    name: "brandName",
                    type: "string",
                    description: "Brand or company name for the footer",
                },
                {
                    name: "services",
                    type: "string[]",
                    description: "Array of service tags displayed in footer",
                },
                {
                    name: "enableTilt",
                    type: "boolean",
                    default: "true",
                    description: "Enable 3D tilt effect on hover",
                },
                {
                    name: "maxTilt",
                    type: "number",
                    default: "8",
                    description: "Maximum tilt angle in degrees",
                },
                {
                    name: "enableParallax",
                    type: "boolean",
                    default: "true",
                    description: "Enable parallax effect on image",
                },
            ]}
        />
    )
}
