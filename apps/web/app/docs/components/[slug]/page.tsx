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

// Loading skeleton for the content column; the shell comes from the layout.
function DocsPageSkeleton() {
    return (
        <div className="animate-pulse space-y-4">
            <div className="h-4 w-40 rounded bg-zinc-100 dark:bg-zinc-800/60" />
            <div className="h-10 w-72 rounded-lg bg-zinc-100 dark:bg-zinc-800/60" />
            <div className="h-5 w-full max-w-xl rounded bg-zinc-100 dark:bg-zinc-800/40" />
            <div className="!mt-8 h-[440px] rounded-2xl bg-zinc-100 sm:h-[520px] xl:h-[580px] dark:bg-zinc-800/30" />
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
