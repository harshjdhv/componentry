# Creating New Components for Componentry

This guide documents the complete process for adding new components to the Componentry UI library.

## 📁 Project Structure Overview

```
componentry/
├── packages/ui/                          # Core UI package
│   ├── components.json                   # shadcn/ui configuration
│   └── src/
│       └── components/                   # Component source files (.tsx)
│           ├── circuit-board.tsx
│           ├── showcase-card.tsx
│           └── ...
│
├── apps/web/                             # Documentation website
│   ├── public/r/                         # Registry JSON files (for installation)
│   │   ├── circuit-board.json
│   │   ├── showcase-card.json
│   │   └── ...
│   │
│   ├── config/
│   │   └── docs.ts                       # Sidebar navigation config
│   │
│   ├── components/                       # Shared docs components
│   │   ├── component-layout.tsx          # Layout wrapper for component pages
│   │   ├── install-command.tsx           # Package manager command generator
│   │   └── code-block.tsx                # Syntax-highlighted code display
│   │
│   └── app/docs/components/              # Component documentation pages
│       ├── circuit-board/page.tsx
│       ├── showcase-card/page.tsx
│       └── ...
│
└── docs/                                 # Internal documentation (this file)
```

---

## 🚀 Step-by-Step: Creating a New Component

### Step 1: Create the Component Source File

**Location:** `packages/ui/src/components/{component-name}.tsx`

**Key Requirements:**

1. **"use client" directive** - Add at the top for client-side components
2. **Import utilities** from `@workspace/ui/lib/utils` for `cn()` helper
3. **TypeScript interfaces** - Define props with JSDoc comments
4. **Export all variants** - Named exports at the bottom

**Example Structure:**

```tsx
"use client"

import * as React from "react"
import { motion } from "framer-motion"  // If using animations
import { cn } from "@workspace/ui/lib/utils"

// Define TypeScript interfaces with JSDoc comments
interface MyComponentProps {
  /** Description of this prop */
  title: string
  /** Optional prop with default */
  variant?: "default" | "compact"
  className?: string
  children?: React.ReactNode
}

// Main component function
function MyComponent({
  title,
  variant = "default",
  className,
  children,
}: MyComponentProps) {
  return (
    <div className={cn("base-classes", className)}>
      {/* Component implementation */}
    </div>
  )
}

// Export all components and types
export {
  MyComponent,
  type MyComponentProps,
}
```

**Reference Files:**
- `packages/ui/src/components/showcase-card.tsx` - Complex component with variants
- `packages/ui/src/components/circuit-board.tsx` - SVG-based interactive component
- `packages/ui/src/components/spotlight-card.tsx` - Multiple sub-components

---

### Step 2: Create the Registry JSON File

**Location:** `apps/web/public/r/{component-name}.json`

This file enables users to install your component via the shadcn CLI.

**Structure:**

```json
{
  "name": "my-component",
  "type": "registry:ui",
  "dependencies": ["framer-motion"],
  "registryDependencies": [],
  "description": "Brief description of the component.",
  "files": [
    {
      "path": "components/ui/my-component.tsx",
      "content": "// Full component source code here...",
      "type": "registry:ui"
    }
  ]
}
```

**Important Notes:**

1. **dependencies** - List npm packages required (e.g., `framer-motion`, `lucide-react`)
2. **registryDependencies** - List other components from this registry if dependent
3. **content** - The full component source, with `@workspace/ui/lib/utils` replaced with `@/lib/utils`

**Generating the JSON file programmatically:**

```bash
node -e "
const fs = require('fs');
const content = fs.readFileSync('packages/ui/src/components/my-component.tsx', 'utf8');
const registry = {
  name: 'my-component',
  type: 'registry:ui',
  dependencies: ['framer-motion'],
  registryDependencies: [],
  description: 'Description here.',
  files: [{
    path: 'components/ui/my-component.tsx',
    content: content.replace(/@workspace\/ui\/lib\/utils/g, '@/lib/utils'),
    type: 'registry:ui'
  }]
};
fs.writeFileSync('apps/web/public/r/my-component.json', JSON.stringify(registry, null, 2));
"
```

---

### Step 3: Create the Documentation Page

**Location:** `apps/web/app/docs/components/{component-name}/page.tsx`

**Required Structure:**

```tsx
import type React from "react"
import type { Metadata } from "next"
import { MyComponent } from "@workspace/ui/components/my-component"
import { InstallCommand } from "@/components/install-command"
import { CodeBlock } from "@/components/code-block"
import { ComponentLayout, Section } from "@/components/component-layout"

// SEO Metadata
export const metadata: Metadata = {
  title: "My Component",
  description: "Description for SEO. Free React component by Harsh Jadhav.",
  alternates: {
    canonical: "https://componentry.fun/docs/components/my-component",
  },
}

// Code examples as string constants
const basicCode = `import { MyComponent } from "@/components/ui/my-component"

<MyComponent title="Hello World" />`

export default function MyComponentPage(): React.JSX.Element {
  return (
    <ComponentLayout
      title="My Component"
      description="A brief description of what this component does."
    >
      {/* Install Section */}
      <Section title="Install">
        <InstallCommand component="my-component" />
      </Section>

      {/* Examples Section */}
      <Section title="Examples">
        <div className="space-y-12">
          <div className="space-y-0">
            <h3 className="text-xl font-medium mb-4">Basic</h3>
            <div className="p-8 bg-muted/30 rounded-t-xl border-b border-border flex items-center justify-center">
              <MyComponent title="Hello World" />
            </div>
            <CodeBlock code={basicCode} lang="tsx" className="rounded-t-none" />
          </div>
        </div>
      </Section>

      {/* Props Section */}
      <Section title="Props">
        <div className="grid grid-cols-1 divide-y border rounded-xl bg-muted/30">
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
            <div className="font-mono text-sm">title</div>
            <div className="text-sm text-muted-foreground">
              The main title text (required)
            </div>
          </div>
          {/* More props... */}
        </div>
      </Section>
    </ComponentLayout>
  )
}
```

**Reference Files:**
- `apps/web/app/docs/components/showcase-card/page.tsx`
- `apps/web/app/docs/components/circuit-board/page.tsx`
- `apps/web/app/docs/components/spotlight-card/page.tsx`

---

### Step 4: Add to Sidebar Navigation

**Location:** `apps/web/config/docs.ts`

Add your component to the appropriate section:

```typescript
export const docsConfig = {
  nav: [
    {
      title: "Components",
      items: [
        // Existing components...
        {
          title: "My Component",
          href: "/docs/components/my-component",
        },
      ],
    },
  ],
}
```

---

## 📝 Documentation Page Sections

### Required Sections

| Section | Purpose |
|---------|---------|
| **Install** | `<InstallCommand>` with component name |
| **Examples** | Live demos with code snippets |
| **Props** | Table of all component props |

### Optional Sections

| Section | Purpose |
|---------|---------|
| **Features** | Key capabilities list |
| **Variants** | Different component versions |
| **Usage Notes** | Best practices, accessibility |

---

## ⚠️ Important Considerations

### Server vs Client Components

Next.js App Router uses Server Components by default. Be aware:

- ❌ **Cannot pass functions** as props from Server to Client components
- ✅ Remove `onClick` handlers from documentation examples, or
- ✅ Create a wrapper Client Component for interactive demos

### Code Example Strings

When creating code example strings:

```tsx
// ✅ Good - escaped properly for template literals
const code = `<MyComponent prop="value" />`

// ❌ Bad - unescaped characters can break
const code = `<MyComponent prop='value' \n nested={true} />`
```

### Image URLs

For demo images, use reliable sources:
- Unsplash: `https://images.unsplash.com/photo-{id}?w=800&q=80`
- Placeholder: `https://picsum.photos/800/600`

---

## 🎨 Component Design Guidelines

### Micro-interactions

Premium components should include:
- Hover effects (scale, shadow, glow)
- Smooth transitions (use `transition-all duration-300`)
- Spring physics for natural feel (Framer Motion: `{ damping: 25, stiffness: 150 }`)

### Theme Awareness

Support both light and dark modes:

```tsx
const [isDark, setIsDark] = React.useState(true)

React.useEffect(() => {
  const checkTheme = () => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    setIsDark(isDarkMode)
  }
  checkTheme()
  
  const observer = new MutationObserver(checkTheme)
  observer.observe(document.documentElement, { 
    attributes: true, 
    attributeFilter: ["class"] 
  })
  
  return () => observer.disconnect()
}, [])
```

### Responsive Design

Always include responsive breakpoints:

```tsx
className="text-sm sm:text-base lg:text-lg"
className="p-4 sm:p-6 lg:p-8"
className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
```

---

## ✅ Pre-Launch Checklist

Before considering a component complete:

- [ ] Component source file created in `packages/ui/src/components/`
- [ ] Registry JSON file created in `apps/web/public/r/`
- [ ] Documentation page created in `apps/web/app/docs/components/`
- [ ] Added to sidebar navigation in `apps/web/config/docs.ts`
- [ ] Tested with `pnpm run dev`
- [ ] Verified installation command works
- [ ] All examples render without errors
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] Light/dark mode tested
- [ ] Props table complete with descriptions

---

## 🔗 Quick Reference

| Task | File Location |
|------|---------------|
| Component source | `packages/ui/src/components/{name}.tsx` |
| Registry JSON | `apps/web/public/r/{name}.json` |
| Docs page | `apps/web/app/docs/components/{name}/page.tsx` |
| Sidebar nav | `apps/web/config/docs.ts` |
| Layout wrapper | `apps/web/components/component-layout.tsx` |
| Install command | `apps/web/components/install-command.tsx` |
| Code block | `apps/web/components/code-block.tsx` |
| Utils (cn) | `packages/ui/src/lib/utils.ts` |

---

## 📚 Example Components to Study

| Component | Complexity | Key Features |
|-----------|------------|--------------|
| `border-beam` | Simple | CSS animations, minimal props |
| `showcase-card` | Medium | Multiple variants, 3D effects |
| `circuit-board` | Complex | SVG rendering, connection logic |
| `spotlight-card` | Complex | Multiple exports, cursor tracking |
| `flight-status-card` | Advanced | Many sub-states, real data |

---

*Last updated: January 2026*
