# Component Guidelines

## 1. Source: `packages/ui/src/components/{name}.tsx`
- **"use client"** required.
- **Prop-driven**: No hardcoded content.
- **Variants**: 2-3 required (e.g. "default", "glass"). Controlled via props.

```tsx
"use client"
import { cn } from "@workspace/ui/lib/utils"

export interface Props { variant?: "default" | "glass", className?: string }
export function Comp({ variant = "default", className }: Props) {
  return <div className={cn(className)} />
}
```

## 2. Registry: `apps/web/public/r/{name}.json`
- **Content**: Full text of source file. Replace `@workspace/ui/lib/utils` → `@/lib/utils`.
- **Deps**: Only real npm packages.

```json
{
  "name": "comp-name",
  "type": "registry:ui",
  "files": [{ "path": "components/ui/comp-name.tsx", "content": "..." }]
}
```

## 3. Docs: `apps/web/app/docs/components/{name}/page.tsx`
- **Register**: Add to `apps/web/config/docs.ts`.
- **Visuals**: Show all 2-3 variants.
- **Layout**: ZERO GAP between Preview and Code.

```tsx
<div className="flex flex-col space-y-0">
  <div className="border p-4"><Comp /></div>
  <CodeBlock code={src} className="mt-0 rounded-t-none border-t-0" />
</div>
```
