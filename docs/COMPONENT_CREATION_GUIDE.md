# 🧩 Componentry - Complete Component Creation Guide

This guide documents the **complete workflow** for adding a new component to the Componentry library. Follow each step in order.

---

## 📁 Project Structure Overview

```
componentry/
├── packages/ui/                          # The shared UI library
│   └── src/
│       └── components/                   # ← STEP 1: Component source code
│           └── {component-name}.tsx
│
└── apps/web/                             # Documentation website
    ├── public/r/                         # ← STEP 2: Registry JSON files
    │   └── {component-name}.json
    │
    ├── registry/index.ts                 # ← STEP 3: Component metadata
    │
    ├── components/docs/                  # ← STEP 4: Documentation component
    │   ├── {component-name}.tsx
    │   ├── lazy-registry.ts              # ← STEP 5: Lazy import registry
    │   └── previews/                     # ← (Optional) Client-side previews
    │       └── {component-name}-preview.tsx
    │
    └── config/docs.ts                    # Auto-generates sidebar from registry
```

---

## 🚀 Step 1: Create the UI Component

**Location:** `packages/ui/src/components/{component-name}.tsx`

### Requirements
- Add `"use client"` at the top (required for React hooks)
- Import `cn` from `@workspace/ui/lib/utils`
- Define a TypeScript interface for props
- Always include `className?: string` prop
- Use `cn()` for combining classes

### Template

```tsx
"use client";

import { cn } from "@workspace/ui/lib/utils";
import { useEffect, useRef, useState } from "react";

interface MyComponentProps {
  /** Additional CSS classes for custom styling */
  className?: string;
  /** The primary text content */
  text: string;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Visual variant of the component */
  variant?: "default" | "secondary";
}

export function MyComponent({
  className,
  text,
  duration = 500,
  variant = "default",
}: MyComponentProps) {
  // Implementation...
  
  return (
    <div
      className={cn(
        "base-styles-here",
        variant === "secondary" && "secondary-styles",
        className
      )}
    >
      {text}
    </div>
  );
}
```

### Best Practices
- Use `ResizeObserver` for canvas/interactive elements
- Cleanup intervals/observers in `useEffect` return
- Support both controlled and uncontrolled patterns
- Keep animations smooth (use `requestAnimationFrame`)

---

## 📦 Step 2: Create the Registry JSON

**Location:** `apps/web/public/r/{component-name}.json`

This file allows users to install the component via CLI:
```bash
npx shadcn@latest add "https://componentry.fun/r/{component-name}.json"
```

### 🛠️ Automatic Generation (Recommended)

We have a helper script that automatically generates or updates the registry JSON file from your component source code.

Run this command from the project root:

```bash
node scripts/generate-registry.js {component-name}
```

**Example:**
```bash
node scripts/generate-registry.js scroll-based-velocity
```

This script handles all the tedious formatting rules for you:
- Reads the component source file
- Escapes all quotes and newlines correctly
- Updates import paths (e.g., changing `@workspace/ui/lib/utils` to `@/lib/utils`)
- Preserves existing metadata if the file already exists

### Manual Creation (Template)

If you prefer to create the file manually, follow this structure:

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "my-component",
  "type": "registry:ui",
  "title": "My Component",
  "description": "A brief description of what this component does.",
  "dependencies": ["framer-motion"],
  "devDependencies": [],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/my-component.tsx",
      "type": "registry:ui",
      "content": "\"use client\";\n\nimport { cn } from \"@/lib/utils\";\n..."
    }
  ],
  "tailwind": {},
  "cssVars": {},
  "meta": {}
}
```

### ⚠️ CRITICAL Rules for `content` Field (Manual Mode)

If doing this manually, you must ensure the `content` string follows these rules (which the script handles automatically):

1. **Replace import path**: Change `@workspace/ui/lib/utils` → `@/lib/utils`
2. **Escape all quotes**: Use `\"` instead of `"`
3. **Escape newlines**: Use `\n` for line breaks
4. **Include the `type` field** inside each file object

---

## 📋 Step 3: Add Component Metadata

**Location:** `apps/web/registry/index.ts`

This file defines metadata used for:
- SEO (title, description)
- Sidebar navigation
- Component categorization

### Add your component:

```typescript
export const components: Record<string, ComponentMetadata> = {
  // ... existing components
  
  "my-component": {
    title: "My Component",
    description: "A brief, catchy description for SEO and tooltips.",
    category: "Components", // Options: "Text Animations" | "Components" | "Hero Backgrounds" | "Visual Effects"
    slug: "my-component",
    isNew: true, // Optional: shows "NEW" badge
  },
};
```

### Categories

| Category | Use For |
|----------|---------|
| `"Text Animations"` | Text effects (HyperText, TrueFocus, TextAnimate) |
| `"Components"` | Interactive UI elements (Cards, Modals, Docks) |
| `"Hero Backgrounds"` | Full-page background effects |
| `"Visual Effects"` | Decorative effects (Blobs, Particles, Noise) |

---

## 📝 Step 4: Create Documentation Component

**Location:** `apps/web/components/docs/{component-name}.tsx`

### ⚠️ CRITICAL: This MUST be an Async Server Component

- **DO NOT** add `"use client"` to this file
- **DO** use `async function` and `await`
- **DO** use `readComponentSource()` for dynamic source loading

### Template

```tsx
import React from "react"
import { MyComponent } from "@workspace/ui/components/my-component"
import { DocsPageLayout } from "@/components/docs-page-layout"
import { readComponentSource } from "@/lib/source-code"

// Define example code snippets as strings
const importCode = `import { MyComponent } from "@/components/ui/my-component"`

const defaultCode = `import { MyComponent } from "@/components/ui/my-component"

<MyComponent text="Hello World" className="text-4xl" />`

const variantCode = `<MyComponent
  text="Secondary Style"
  variant="secondary"
  duration={1000}
/>`

export async function MyComponentDocs() {
  // Load source code dynamically (from public/r/*.json)
  const sourceCode = (await readComponentSource("my-component")) || "// Unable to load source code"

  return (
    <DocsPageLayout
      // Header
      title="My Component"
      description="A detailed description of what this component does and why developers would use it."
      
      // Main Preview Section
      preview={
        <MyComponent
          text="Demo Text"
          className="text-4xl font-bold text-foreground"
        />
      }
      previewCode={defaultCode}
      
      // Installation Section
      installPackageName="my-component"
      installDependencies="framer-motion clsx tailwind-merge"  // Space-separated list
      installSourceCode={sourceCode}  // Dynamic source from registry JSON
      installSourceFilename="components/ui/my-component.tsx"  // Optional: custom filename
      
      // Usage Section
      usageCode={importCode}
      
      // Examples Section
      examples={[
        {
          title: "Secondary Variant",
          preview: (
            <MyComponent
              text="Secondary Style"
              variant="secondary"
              className="text-3xl text-foreground"
            />
          ),
          code: variantCode,
        },
        {
          title: "Custom Duration",
          preview: (
            <MyComponent
              text="Slow Animation"
              duration={2000}
              className="text-3xl text-foreground"
            />
          ),
          code: `<MyComponent text="Slow Animation" duration={2000} />`,
        },
      ]}
      
      // Props Table
      props={[
        {
          name: "text",
          type: "string",
          description: "The text content to display.",
        },
        {
          name: "duration",
          type: "number",
          default: "500",
          description: "Animation duration in milliseconds.",
        },
        {
          name: "variant",
          type: '"default" | "secondary"',
          default: '"default"',
          description: "Visual style variant.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes for styling.",
        },
      ]}
    />
  )
}
```

### Props for DocsPageLayout

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | ✅ | Component name |
| `description` | `string` | ✅ | What the component does |
| `preview` | `ReactNode` | ✅ | Live component preview |
| `previewCode` | `string` | ✅ | Code for the preview |
| `installPackageName` | `string` | ✅ | Slug for CLI install |
| `installDependencies` | `string` | ❌ | Space-separated npm packages |
| `installSourceCode` | `string` | ❌ | Source code for manual install |
| `installSourceFilename` | `string` | ❌ | Target filename |
| `usageCode` | `string` | ✅ | Import statement example |
| `examples` | `ExampleItem[]` | ❌ | Additional examples |
| `props` | `PropItem[]` | ❌ | Props table data |
| `fullWidthPreview` | `boolean` | ❌ | Remove padding from preview |

---

## 🔗 Step 5: Register in Lazy Registry

**Location:** `apps/web/components/docs/lazy-registry.ts`

This is **CRITICAL for performance**. Components are lazy-loaded only when visited.

### Add your component:

```typescript
const docsImportMap: Record<string, () => Promise<...>> = {
  // ... existing components
  
  "my-component": () =>
    import("@/components/docs/my-component").then((m) => ({
      default: m.MyComponentDocs,
    })),
};
```

### Naming Convention
- File: `my-component.tsx`
- Export: `MyComponentDocs`
- Key: `"my-component"`

---

## 🖼️ (Optional) Step 6: Client-Side Preview Component

**When needed:** If your preview requires `useState`, `useEffect`, or user interaction.

**Location:** `apps/web/components/docs/previews/{component-name}-preview.tsx`

### Template

```tsx
"use client";

import * as React from "react";
import { MyComponent } from "@workspace/ui/components/my-component";
import { Button } from "@workspace/ui/components/button";

export function MyComponentPreview() {
  const [isActive, setIsActive] = React.useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <MyComponent text="Interactive Demo" variant={isActive ? "secondary" : "default"} />
      <Button onClick={() => setIsActive(!isActive)}>
        Toggle Variant
      </Button>
    </div>
  );
}
```

### Use in Docs Component

```tsx
import { MyComponentPreview } from "@/components/docs/previews/my-component-preview"

// In DocsPageLayout:
preview={<MyComponentPreview />}
```

### iframe Preview (for full-page components)

For components that need the full viewport (like `CollectionSurfer`):

1. Create a demo page at `app/demo/{component-name}/page.tsx`
2. Use the iframe preview wrapper:

```tsx
import { CollectionSurferPreview } from "@/components/docs/previews/collection-surfer-preview"

preview={
  <CollectionSurferPreview
    src="/demo/collection-surfer"
    title="Collection Surfer Demo"
  />
}
fullWidthPreview  // Add this prop
```

---

## ✅ Verification Checklist

After completing all steps, verify:

- [ ] Component works in isolation (`packages/ui`)
- [ ] Registry JSON is valid (test with `cat public/r/my-component.json | jq`)
- [ ] Docs page loads at `/docs/components/my-component`
- [ ] Installation tabs show correct content (CLI and Manual)
- [ ] Source code displays with syntax highlighting
- [ ] Props table renders correctly
- [ ] Examples work and show code
- [ ] Sidebar shows the component under correct category
- [ ] No console errors

### Quick Test Commands

```bash
# Check TypeScript
cd apps/web && npx tsc --noEmit

# Start dev server
pnpm dev

# Visit docs page
open http://localhost:3000/docs/components/my-component
```

---

## 🔧 Common Issues & Solutions

### Issue: "Unable to load source code"
**Cause:** Registry JSON missing or malformed
**Fix:** Verify `public/r/{component-name}.json` exists and has valid JSON

### Issue: Component not in sidebar
**Cause:** Missing from `registry/index.ts`
**Fix:** Add metadata to the `components` object

### Issue: "Module not found" on docs page
**Cause:** Missing from `lazy-registry.ts`
**Fix:** Add dynamic import entry

### Issue: Preview not rendering
**Cause:** Using hooks in Server Component
**Fix:** Move interactive logic to a separate `"use client"` preview file

### Issue: Import path incorrect in install code
**Cause:** Forgot to replace `@workspace/ui` in JSON
**Fix:** Use `@/lib/utils` instead of `@workspace/ui/lib/utils`

---

## 📊 Architecture Diagram

```
User visits /docs/components/{slug}
                │
                ▼
┌─────────────────────────────────────┐
│ app/docs/components/[slug]/page.tsx │
│ (generateStaticParams for SSG)      │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│ components/docs/lazy-registry.ts    │
│ (Dynamic import on demand)          │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│ components/docs/{component}.tsx     │
│ (Async Server Component)            │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ readComponentSource()         │  │
│  │ (Loads from public/r/*.json)  │  │
│  └───────────────────────────────┘  │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│ components/docs-page-layout.tsx     │
│ (Renders sections with Suspense)    │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Preview + Code Block            │ │
│ │ Installation (CLI / Manual)     │ │
│ │ Usage Examples                  │ │
│ │ Props Table                     │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

---

## 🎨 Design Guidelines

### Component Styling
- Use Tailwind CSS exclusively
- Support both light and dark modes
- Use CSS variables from the theme (`--foreground`, `--background`, etc.)
- Allow full customization via `className` prop

### Animation Guidelines
- Use `framer-motion` for complex animations
- Keep animations under 300ms for UI feedback
- Use 500-1000ms for decorative animations
- Always respect `prefers-reduced-motion`

### Accessibility
- Support keyboard navigation
- Include proper ARIA labels
- Ensure sufficient color contrast
- Test with screen readers

---

## 📎 Quick Reference

### File Locations
| Purpose | Path |
|---------|------|
| UI Component | `packages/ui/src/components/{name}.tsx` |
| Registry JSON | `apps/web/public/r/{name}.json` |
| Metadata | `apps/web/registry/index.ts` |
| Docs Component | `apps/web/components/docs/{name}.tsx` |
| Lazy Registry | `apps/web/components/docs/lazy-registry.ts` |
| Client Preview | `apps/web/components/docs/previews/{name}-preview.tsx` |

### Import Patterns
```typescript
// In UI component (packages/ui)
import { cn } from "@workspace/ui/lib/utils"

// In docs component (apps/web)
import { MyComponent } from "@workspace/ui/components/my-component"
import { DocsPageLayout } from "@/components/docs-page-layout"
import { readComponentSource } from "@/lib/source-code"

// In registry JSON content
import { cn } from "@/lib/utils"  // NOTE: Different path!
```

---

## 🤖 AI Prompt Template

To have an AI create a new component, use this prompt:

```
Create a new Componentry UI component called "[COMPONENT_NAME]".

## Requirements
- Purpose: [WHAT IT DOES]
- Visual: [HOW IT LOOKS]
- Animation: [ANY ANIMATIONS]
- Props: [LIST PROPS]

## Create These Files
1. packages/ui/src/components/[slug].tsx - The component
2. apps/web/public/r/[slug].json - Registry JSON
3. apps/web/registry/index.ts - Add metadata entry
4. apps/web/components/docs/[slug].tsx - Docs component (async, no "use client")
5. apps/web/components/docs/lazy-registry.ts - Add import entry

## Category: [Text Animations | Components | Hero Backgrounds | Visual Effects]
## Dependencies: [framer-motion, lucide-react, etc.]

Refer to /docs/COMPONENT_CREATION_GUIDE.md for the complete workflow.
```

---

**Last updated:** February 2, 2026
