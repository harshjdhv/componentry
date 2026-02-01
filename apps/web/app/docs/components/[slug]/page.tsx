
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getComponent } from "@/registry"
import { docsRegistry } from "@/components/docs/registry"
import { DocsPageLayout } from "@/components/docs-page-layout"

// -----------------------------------------------------------------------------
// NOTE: This entire file is structurally identical to hyper-text/page.tsx.
// It acts as a SHELL for all components. 
// Specific content (examples, props) are placeholders for now.
// -----------------------------------------------------------------------------

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const params = await props.params
    const component = getComponent(params.slug)


    if (!component) {
        return {}
    }

    return {
        title: `${component.title} Component`,
        description: component.description,
        alternates: {
            canonical: `https://componentry.fun/docs/components/${component.slug}`,
        },
    }
}

export default async function ComponentPage(props: PageProps) {
    const params = await props.params
    const component = getComponent(params.slug)
    const DocsComponent = docsRegistry[params.slug]

    if (!component) {
        return notFound()
    }

    if (DocsComponent) {
        return <DocsComponent />
    }

    return (
        <DocsPageLayout
            title={component.title}
            description={component.description}
            installPackageName={component.slug}
            preview={
                <div className="border border-border rounded-xl p-12 flex flex-col justify-center items-center bg-muted/20 min-h-[350px] gap-4">
                    <div className="text-center space-y-2">
                        <h3 className="text-lg font-medium">{component.title} Preview</h3>
                        <p className="text-sm text-muted-foreground">
                            Component preview will appear here.
                        </p>
                    </div>
                </div>
            }
            previewCode="// Preview code coming soon"
            usageCode="// Usage examples coming soon"
            examples={[]}
            props={[]}
        />
    )
}
