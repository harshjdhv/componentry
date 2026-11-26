import React from "react"
import { DocsPageLayout } from "@/components/docs-page-layout"
import { readComponentSource } from "@/lib/source-code"
import { ScrollChoreographyPreview } from "@/components/docs/previews/scroll-choreography-preview"


const defaultCode = `import { ScrollChoreography } from "@/components/ui/scroll-choreography"

const images = {
  topLeft: "https://images.unsplash.com/photo-1741454570867-4a10f31fc5e3?q=100&w=2832&fm=webp&auto=format&fit=crop",
  topRight: "https://images.unsplash.com/photo-1755456068400-fbcdce2f795a?q=100&w=2832&fm=webp&auto=format&fit=crop",
  bottomLeft: "https://images.unsplash.com/photo-1755456068249-13d384440902?q=100&w=2832&fm=webp&auto=format&fit=crop",
  bottomRight: "https://images.unsplash.com/photo-1741454570904-a22d9d6ea511?q=100&w=2832&fm=webp&auto=format&fit=crop",
}

export default function Demo() {
  return (
    <div className="w-full min-h-[600px]">
      <ScrollChoreography images={images} />
    </div>
  )
}`

export async function ScrollChoreographyDocs() {
    const sourceCode = (await readComponentSource("scroll-choreography")) || "// Unable to load source code"

    return (
        <DocsPageLayout
            title="Scroll Choreography"
            description="A smooth, scroll-driven image choreography component using Framer Motion. As you scroll, images move and stack gracefully before revealing a hero visual."

            preview={
                <ScrollChoreographyPreview
                    src="/demo/scroll-choreography"
                    title="Scroll Choreography Demo"
                />
            }
            previewCode={defaultCode}

            installPackageName="scroll-choreography"
            installDependencies="framer-motion clsx tailwind-merge"
            installSourceCode={sourceCode}
            installSourceFilename="components/ui/scroll-choreography.tsx"

            usageCode={defaultCode}
            fullWidthPreview={true}

            props={[
                {
                    name: "images",
                    type: "{ topLeft: string; topRight: string; bottomLeft: string; bottomRight: string; }",
                    description: "An object containing the image URLs for each of the four quadrants. Required.",
                },
                {
                    name: "className",
                    type: "string",
                    description: "Additional CSS classes for styling the container.",
                },
            ]}
        />
    )
}
