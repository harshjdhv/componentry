import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getComponent } from "@/registry";
import { getDocsImporter, getDocsSlugs } from "@/components/docs/lazy-registry";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { componentGuides } from "@/lib/component-guides";

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

export const dynamicParams = false;

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

    const guide = componentGuides[component.slug];
    const description = guide?.description ?? component.description;
    const title = guide?.title ?? `${component.title} React Component`;
    const componentUrl = absoluteUrl(`/docs/components/${component.slug}`);
    const ogImageUrl = absoluteUrl(`/docs/components/${component.slug}/opengraph-image`);

    return {
        title: { absolute: `${title} | Componentry` },
        description,
        keywords: [
            component.title,
            `${component.title} component`,
            `${component.title} React component`,
            `${component.title} Tailwind component`,
            component.category,
            "Componentry",
            "React UI component",
            "animated UI component",
            "copy paste component",
        ],
        alternates: {
            canonical: componentUrl,
        },
        openGraph: {
            title: `${title} | Componentry`,
            description,
            url: componentUrl,
            type: "article",
            siteName: siteConfig.name,
            images: [{ url: ogImageUrl, width: 1200, height: 630, alt: `${component.title} Component` }],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${title} | Componentry`,
            description,
            images: [ogImageUrl],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
    };
}

// Loading skeleton for docs page
function DocsPageSkeleton() {
    return (
        <div className="flex flex-col lg:flex-row w-full h-full min-h-screen lg:h-screen bg-white dark:bg-background overflow-hidden">
            {/* Left Column: Scrollable Content Skeleton */}
            <div className="w-full lg:basis-1/2 lg:max-w-1/2 h-full flex flex-col relative z-20 bg-white dark:bg-background">
                <div className="pointer-events-none absolute inset-x-0 top-0 z-30 hidden h-[150px] select-none bg-[linear-gradient(to_top,transparent,#ffffff)] backdrop-blur-[4px] [mask-image:linear-gradient(to_bottom,#000_50%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,#000_50%,transparent)] lg:block dark:bg-[linear-gradient(to_top,transparent,var(--background))]" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[150px] select-none bg-[linear-gradient(to_bottom,transparent,#ffffff)] backdrop-blur-[4px] [mask-image:linear-gradient(to_top,#000_50%,transparent)] [-webkit-mask-image:linear-gradient(to_top,#000_50%,transparent)] dark:bg-[linear-gradient(to_bottom,transparent,var(--background))]" />

                <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <div className="w-full animate-pulse space-y-20 px-6 pt-32 pb-40 sm:px-8 lg:px-8 lg:pt-48 xl:px-10">

                        {/* Header Section */}
                        <div className="space-y-10">
                            <div className="space-y-6">
                                <div className="h-12 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
                                <div className="h-6 w-full bg-zinc-200 dark:bg-zinc-800/50 rounded-lg" />
                                <div className="h-6 w-2/3 bg-zinc-200 dark:bg-zinc-800/50 rounded-lg" />
                            </div>
                        </div>

                        {/* Installation Section */}
                        <div className="space-y-6">
                            <div className="h-8 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
                            <div className="h-16 w-full bg-zinc-200 dark:bg-zinc-800/30 rounded-xl" />
                        </div>

                        {/* Usage Section */}
                        <div className="space-y-6">
                            <div className="h-8 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
                            <div className="h-48 w-full bg-zinc-200 dark:bg-zinc-800/30 rounded-xl border border-zinc-200 dark:border-zinc-800" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Sticky Preview Skeleton */}
            <div className="flex-1 lg:basis-1/2 lg:max-w-1/2 lg:h-full lg:sticky lg:top-0 order-first lg:order-last bg-white dark:bg-[#121212] flex flex-col z-10">
                <div className="relative w-full h-[400px] lg:h-full p-4 lg:pt-3 lg:pb-3 lg:pr-3 lg:pl-1.5 overflow-hidden bg-white dark:bg-[#121212]">
                    <div className="w-full h-full bg-[#f7f7f7] dark:bg-zinc-800/20 rounded-xl border border-zinc-200 dark:border-zinc-800 animate-pulse" />
                </div>
            </div>
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
        const componentUrl = absoluteUrl(`/docs/components/${component.slug}`);
        const componentJsonLd = {
            "@context": "https://schema.org",
            "@type": "SoftwareSourceCode",
            name: `${component.title} React Component`,
            description: component.description,
            url: componentUrl,
            codeRepository: siteConfig.repository,
            programmingLanguage: ["TypeScript", "React", "CSS"],
            runtimePlatform: "React",
            applicationCategory: "DeveloperApplication",
            isPartOf: {
                "@type": "SoftwareSourceCode",
                name: siteConfig.name,
                url: siteConfig.url,
            },
            author: {
                "@type": "Person",
                name: siteConfig.author.name,
                url: siteConfig.author.twitter,
            },
            license: "https://opensource.org/licenses/MIT",
            keywords: [
                component.title,
                component.category,
                "React component",
                "Tailwind CSS",
                "Framer Motion",
                "Componentry",
            ].join(", "),
        };

        return (
            <>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(componentJsonLd) }}
                />
                <Suspense fallback={<DocsPageSkeleton />}>
                    <DocsContent slug={params.slug} />
                </Suspense>
            </>
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
