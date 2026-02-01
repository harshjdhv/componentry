import React from "react";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";
import { CollectionSurferPreview } from "@/components/docs/previews/collection-surfer-preview";

const importCode = `import { CollectionSurfer, CollectionItem } from "@/components/ui/collection-surfer"`;

const defaultCode = `import { CollectionSurfer, CollectionItem } from "@/components/ui/collection-surfer"

const ITEMS: CollectionItem[] = [
    { id: 1, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80", title: "HERITAGE 01" },
    { id: 2, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80", title: "HERITAGE 02" },
    { id: 3, image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80", title: "HERITAGE 03" },
    // ... more items
]

export default function Page() {
    return <CollectionSurfer items={ITEMS} variant="magnetic" />
}`;

const upliftCode = `import { CollectionSurfer, CollectionItem } from "@/components/ui/collection-surfer"

const ITEMS: CollectionItem[] = [
    // ... items
]

export default function Page() {
    return <CollectionSurfer items={ITEMS} variant="uplift" />
}`;

const simpleCode = `import { CollectionSurfer, CollectionItem } from "@/components/ui/collection-surfer"

const ITEMS: CollectionItem[] = [
    // ... items
]

export default function Page() {
    return <CollectionSurfer items={ITEMS} variant="simple" />
}`;

export async function CollectionSurferDocs() {
  const sourceCode =
    (await readComponentSource("collection-surfer")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Collection Surfer"
      description="A 3D scroll-driven collection viewer where items surf along a perspective track. Perfect for immersive showcases."
      fullWidthPreview
      preview={
        <CollectionSurferPreview
          src="/demo/collection-surfer"
          title="Collection Surfer - Magnetic Variant"
        />
      }
      previewCode={defaultCode}
      installPackageName="collection-surfer"
      installDependencies="framer-motion clsx tailwind-merge"
      installSourceCode={sourceCode}
      usageCode={importCode}
      examples={[
        {
          title: "Uplift",
          fullWidth: true,
          preview: (
            <CollectionSurferPreview
              src="/demo/collection-surfer/uplift"
              title="Uplift Variant"
            />
          ),
          code: upliftCode,
        },
        {
          title: "Simple",
          fullWidth: true,
          preview: (
            <CollectionSurferPreview
              src="/demo/collection-surfer/simple"
              title="Simple Variant"
            />
          ),
          code: simpleCode,
        },
      ]}
      props={[
        {
          name: "items",
          type: "CollectionItem[]",
          description:
            "Array of items to display. Each item must have id (number), image (string URL), and title (string).",
        },
        {
          name: "variant",
          type: '"magnetic" | "uplift" | "simple"',
          default: '"magnetic"',
          description:
            "Visual interaction style. 'magnetic' scales cards on hover, 'uplift' moves cards vertically, 'simple' has no hover effects.",
        },
      ]}
    />
  );
}
