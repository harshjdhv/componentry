
# Standard Protocol for Creating Component Documentation

This document outlines the **mandatory** workflow for adding or refactoring component documentation in the Componentry codebase. This system ensures:
1.  **Dynamic Source Code loading**: Documentation always reflects the actual component code.
2.  **Centralized Metadata**: All component details are managed in one place.
3.  **Consistent Design**: All pages use the standardized `DocsPageLayout`.
4.  **Production Safety**: Code works reliably in both Development and Production environments.

## Architecture Overview

The documentation system consists of 4 parts:
1.  **Metadata Registry** (`apps/web/registry/index.ts`): Defines the component's title, description, and category.
2.  **Docs Component Registry** (`apps/web/components/docs/registry.ts`): Maps slugs to the actual React component that renders the docs page.
3.  **Docs Content Component** (`apps/web/components/docs/your-component-slug.tsx`): An **Async Server Component** that fetches source code and renders the page layout.
4.  **Dynamic Page Route** (`apps/web/app/docs/components/[slug]/page.tsx`): The catch-all route that orchestrates everything.

---

## Step-by-Step Implementation Guide

### 1. Register Component Metadata
Open `apps/web/registry/index.ts`. Add your component to the `components` object.

```typescript
// apps/web/registry/index.ts

"your-component-slug": {
  title: "Your Component Name",
  description: "A brief, catchy description of what this component does.",
  category: "Components", // or "Text Animations", "Visual Effects", etc.
  slug: "your-component-slug",
},
```

### 2. Create the Docs Component
Create a new file: `apps/web/components/docs/your-component-slug.tsx`.

**CRITICAL RULES:**
*   This file must be an **Async Server Component** (`export async function...`).
*   **DO NOT** use `"use client"` at the top of this file.
*   Use `readComponentSource` to load the source code.

**Template:**

```tsx
import React from "react"
import { YourComponent } from "@workspace/ui/components/your-component"
import { DocsPageLayout } from "@/components/docs-page-layout"
import { readComponentSource } from "@/lib/source-code"

// Define usage examples as simple strings
const usageCode = `import { YourComponent } from "@/components/ui/your-component"

<YourComponent />`

export async function YourComponentDocs() {
    // This utility guarantees loading from the file system in DEV for live updates
    // and from bundled JSON in PROD for stability.
    const sourceCode = (await readComponentSource("your-component-slug")) || "// Unable to load source code"

    return (
        <DocsPageLayout
            title="Your Component Name"
            description="Same description as registry, or more detailed."
            // Preview Section
            preview={
                <div className="flex items-center justify-center min-h-[200px]">
                    <YourComponent />
                </div>
            }
            previewCode={usageCode}
            
            // Installation Section
            installPackageName="your-component-slug"
            installDependencies="framer-motion lucide-react" // Space-separated list of dependencies
            installSourceCode={sourceCode} // DYNAMIC SOURCE LOADING
            
            // Usage Section
            usageCode={usageCode}
            
            // Examples Section
            examples={[
                {
                    title: "Variant Example",
                    preview: <YourComponent variant="secondary" />,
                    code: `<YourComponent variant="secondary" />`
                }
            ]}
            
            // Props Table
            props={[
                { 
                    name: "className", 
                    type: "string", 
                    description: "Additional CSS classes." 
                },
                { 
                    name: "variant", 
                    type: "string", 
                    default: "primary",
                    description: "The visual style variant." 
                }
            ]}
        />
    )
}
```

### 3. Handle Client-Side Previews (If Needed)
If your component preview requires state (e.g., `useState`, `useEffect`, or interactive buttons):
1.  **DO NOT** put the state logic in the main `your-component-slug.tsx` file (since it must be a Server Component).
2.  Create a separate file: `apps/web/components/docs/previews/your-component-preview.tsx`.
3.  Add `"use client"` to the top of that preview file.
4.  Import the preview into your main docs component.

```tsx
// apps/web/components/docs/previews/your-component-preview.tsx
"use client"
import { useState } from "react"
// ...
export function YourComponentPreview() {
  const [active, setActive] = useState(false)
  return ...
}
```

```tsx
// apps/web/components/docs/your-component-slug.tsx
import { YourComponentPreview } from "@/components/docs/previews/your-component-preview"
// ...
preview={<YourComponentPreview />}
```

### 4. Register the Docs Component
Open `apps/web/components/docs/registry.ts`.

1.  Import your new component.
2.  Add it to the `docsRegistry` object.

```typescript
// apps/web/components/docs/registry.ts
import { YourComponentDocs } from "@/components/docs/your-component-slug";

export const docsRegistry: Record<string, any> = {
  // ...
  "your-component-slug": YourComponentDocs,
};
```

### 5. Cleanup
If there was an old static page at `apps/web/app/docs/components/your-component-slug/page.tsx`, **DELETE IT**. The dynamic route at `apps/web/app/docs/components/[slug]/page.tsx` will now handle rendering your new component.

---

## File Reference

*   **Layout Component**: `apps/web/components/docs-page-layout.tsx` - The UI shell for the docs.
*   **Source Loader**: `apps/web/lib/source-code.ts` - The utility for fetching code.
*   **Metadata Registry**: `apps/web/registry/index.ts` - Central metadata.
*   **Docs Registry**: `apps/web/components/docs/registry.ts` - Maps slugs to React components.
