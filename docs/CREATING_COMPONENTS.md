# Comprehensive Component Creation Guide

Follow this guide STRICTLY to ensure all components are high-quality, documented correctly, and integrated seamlessly into the documentation site.

## 1. Component Source
**Location**: `packages/ui/src/components/{name}.tsx`

*   **"use client"**: Required at the top.
*   **Imports**: Use `@workspace/ui/lib/utils` for `cn`.
*   **Props**:
    *   Must be strictly typed with an `interface`.
    *   Include `className` and `variant` (if applicable).
    *   Include granular configuration props (e.g., `speed`, `color`, `size`) rather than just "styles".
*   **Implementation**:
    *   Use `ResizeObserver` for canvas/interactive elements to support responsive layouts.
    *   Handle `width/height` props if passed, otherwise fallback to container size.
    *   Ensure strict linting compliance (no unused vars).

```tsx
"use client"

import { cn } from "@workspace/ui/lib/utils"
import { useEffect, useRef } from "react"

interface Props {
  className?: string
  variant?: "default" | "custom"
  // ... other props
}

export function Comp({ variant = "default", className, ...props }: Props) {
  // Implementation...
}
```

## 2. Registry File
**Location**: `apps/web/public/r/{name}.json`

*   **Structure**: Standard registry JSON.
*   **Content Processing**:
    *   Copy the full source code.
    *   **IMPORTANT**: Replace `@workspace/ui/lib/utils` with `@/lib/utils` in the `content` string.
    *   **IMPORTANT**: You MUST include `"type": "registry:ui"` inside the file object itself.
*   **Dependencies**: List strictly required npm packages (e.g., `framer-motion`, `three`).

```json
{
  "name": "comp-name",
  "type": "registry:ui",
  "files": [
    {
      "path": "components/ui/comp-name.tsx",
      "content": "...",
      "type": "registry:ui"
    }
  ]
}
```

## 3. Documentation Page
**Location**: `apps/web/app/docs/components/{name}/page.tsx`

This page MUST follow a strict structure to ensure the sidebar TOC works and the layout matches the rest of the site.

### Checklist
1.  **Metadata**: Export `metadata` object.
2.  **Layout**: Wrap content in `ComponentLayout`.
3.  **Sections**: Use the `Section` component for strict separation.
4.  **IDs**: **CRITICAL**: You MUST add `id="..."` to every `Section` for the right-side Table of Contents to work.
    *   `id="install"`
    *   `id="examples"`
    *   `id="props"`

### Template

```tsx
import type React from "react"
import type { Metadata } from "next"
import { Comp } from "@workspace/ui/components/comp"
import { InstallCommand } from "@/components/install-command"
import { CodeBlock } from "@/components/code-block"
import { ComponentLayout, Section } from "@/components/component-layout"

export const metadata: Metadata = {
  title: "Component Name",
  description: "Description for SEO and header.",
  alternates: { canonical: "https://componentry.fun/docs/components/comp" },
}

const exampleCode = `...`

export default function Page() {
  return (
    <ComponentLayout
      title="Component Name"
      description="A detailed description of what this component does."
    >
      {/* 1. INSTALL SECTION */}
      <Section title="Install" id="install">
        <InstallCommand component="comp-name" />
      </Section>

      {/* 2. EXAMPLES SECTION */}
      <Section title="Examples" id="examples">
        <div className="space-y-12">
          {/* Example Item */}
          <div className="space-y-0">
            <h3 className="text-xl font-medium mb-4">Default</h3>
            {/* Preview Container - Zero Gap with CodeBlock */}
            <div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-t-xl rounded-b-none border border-border bg-background shadow-sm">
              <Comp />
            </div>
            <CodeBlock code={exampleCode} lang="tsx" className="rounded-t-none" />
          </div>
        </div>
      </Section>

      {/* 3. PROPS SECTION */}
      <Section title="Props" id="props">
        <div className="grid grid-cols-1 divide-y border rounded-xl bg-muted/30">
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
            <div className="font-mono text-sm">propName</div>
            <div className="text-sm text-muted-foreground">Description (default: value)</div>
          </div>
        </div>
      </Section>
    </ComponentLayout>
  )
}
```

## 4. Register in Config
**Location**: `apps/web/config/docs.ts`

*   Add the component to the appropriate category (e.g., "Visual Effects", "Text Animations").

```ts
{
  title: "Component Name",
  href: "/docs/components/comp-name",
},
```
