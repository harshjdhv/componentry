import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getComponent } from "@/registry";
import { getDocsImporter, getDocsSlugs } from "@/components/docs/lazy-registry";
import { DocsPageLayout } from "@/components/docs-page-layout";

// -----------------------------------------------------------------------------
// PERFORMANCE OPTIMIZATIONS:
// 1. generateStaticParams - Pre-builds ALL component pages at build time
// 2. Lazy imports - Only loads the specific component being viewed
// 3. Suspense - Allows streaming for heavy content
// -----------------------------------------------------------------------------

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

/**
 * Pre-generate all component pages at build time.
 * This is THE most important optimization - pages are served as static HTML.
 */
export async function generateStaticParams() {
    const slugs = getDocsSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const params = await props.params;
    const component = getComponent(params.slug);

    if (!component) {
        return {};
    }

    return {
        title: `${component.title} Component`,
        description: component.description,
        alternates: {
            canonical: `https://componentry.fun/docs/components/${component.slug}`,
        },
    };
}

// Loading skeleton for docs page
function DocsPageSkeleton() {
    return (
        <div className="space-y-16 animate-pulse">
            {/* Title skeleton */}
            <div className="space-y-6">
                <div className="h-12 w-64 bg-muted rounded" />
                <div className="h-6 w-96 bg-muted/50 rounded" />
            </div>

            {/* Preview skeleton */}
            <div className="h-[350px] w-full bg-muted/30 rounded-xl border border-border" />

            {/* Code block skeleton */}
            <div className="h-48 w-full bg-muted/20 rounded-xl border border-border" />
        </div>
    );
}

// Async component that loads the docs component
async function DocsContent({ slug }: { slug: string }) {
    const importer = getDocsImporter(slug);

    if (!importer) {
        return null;
    }

    // Dynamically import the component
    const docModule = await importer();
    const DocsComponent = "default" in docModule ? docModule.default : null;

    if (!DocsComponent) {
        return null;
    }

    return <DocsComponent />;
}

export default async function ComponentPage(props: PageProps) {
    const params = await props.params;
    const component = getComponent(params.slug);

    if (!component) {
        return notFound();
    }

    const importer = getDocsImporter(params.slug);

    // If we have a dedicated docs component, render it with Suspense
    if (importer) {
        return (
            <Suspense fallback={<DocsPageSkeleton />}>
                <DocsContent slug={params.slug} />
            </Suspense>
        );
    }

    // Fallback for components without dedicated docs
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
    );
}
