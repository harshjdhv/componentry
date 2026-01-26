
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getComponent } from "@/registry"
import { InstallCommand } from "@/components/install-command"
import { ComponentLayout, Section } from "@/components/component-layout"
import { InstallationTabs } from "@/components/installation-tabs"
import { docsRegistry } from "@/components/docs/registry"

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

    return (
        <ComponentLayout
            title={component.title}
            description={component.description}
        >
            {DocsComponent ? (
                <DocsComponent />
            ) : (
                <>
                    <div className="border border-border rounded-xl p-12 flex flex-col justify-center items-center bg-muted/20 min-h-[350px] gap-4">
                        <div className="text-center space-y-2">
                            <h3 className="text-lg font-medium">{component.title} Preview</h3>
                            <p className="text-sm text-muted-foreground">
                                Component preview will appear here.
                            </p>
                        </div>
                    </div>

                    <Section title="Installation">
                        <InstallationTabs
                            cliContent={<InstallCommand component={component.slug} />}
                            manualContent={
                                <div className="space-y-4">
                                    <div className="text-sm text-muted-foreground">
                                        Manual installation guide coming soon for {component.title}.
                                    </div>
                                </div>
                            }
                        />
                    </Section>

                    <Section title="Usage">
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <div className="p-8 bg-muted/30 rounded-xl border border-border flex items-center justify-center min-h-[200px]">
                                    <p className="text-muted-foreground text-sm">Usage examples coming soon.</p>
                                </div>
                            </div>
                        </div>
                    </Section>

                    <Section title="Props">
                        <div className="p-4 border rounded-xl bg-muted/30">
                            <p className="text-sm text-muted-foreground">API Reference coming soon.</p>
                        </div>
                    </Section>
                </>
            )}
        </ComponentLayout>
    )
}
