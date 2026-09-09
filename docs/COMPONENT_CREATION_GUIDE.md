# Creating a Componentry component

Componentry is a public component workshop. Keep each component understandable, copyable and focused on one useful idea. Read [the workshop guide](../agents/GUIDE.MD) before adding abstractions or variants.

## 1. Implement the source

Create `packages/ui/src/components/{slug}.tsx`.

- Use TypeScript, a small props interface and a `className` styling hook.
- Import `cn` from `@workspace/ui/lib/utils`.
- Use `"use client"` when the component needs hooks, event handlers or browser APIs.
- Prefer native controls. Give icon-only buttons an accessible name and `type="button"` unless they submit a form.
- Cover keyboard and touch behavior, visible focus and reduced motion.
- Clean up timers, listeners, observers and graphics resources.
- Add controlled/uncontrolled variants only when the component needs them.

The shared source is the authoritative implementation for both the website preview and installed components.

## 2. Generate the installable payload

```bash
node scripts/generate-registry.js my-component
```

The generator writes `apps/web/public/r/my-component.json` and adds the registry index entry. Review the title, description, dependencies and install files.

It transforms workspace imports into consumer paths, includes local helpers, and adds imported npm dependencies and known external type packages. Existing dependency version constraints and additional metadata are preserved. React, React DOM and `@/lib/utils` are provided by the initialized shadcn host. Assets, provider setup and global CSS requirements still need explicit documentation.

Do not hand-edit generated source inside JSON. Edit the component source, then regenerate:

```bash
pnpm registry:generate
pnpm registry:check
```

`registry:check` is read-only. It fails on stale component/block payloads, private imports, missing dependencies or helpers, invalid registry membership, and inconsistent documentation routes.

Twelve older unlisted entries only have source in their published payloads. They are explicitly listed in `scripts/lib/registry.js`; their JSON is their source of truth until they are restored to the UI package. Deleting an active component source must fail generation rather than silently falling back to a stale payload. Do not add new payload-only entries.

Block source and metadata live under `apps/web/registry/blocks/`. Generate blocks with `pnpm registry:blocks`; `node scripts/build-blocks-registry.js --check` checks all generated block artifacts without writing them.

## 3. Register metadata

Add an entry in `apps/web/registry/index.ts`:

```ts
"my-component": {
  title: "My Component",
  description: "What this component does.",
  category: "Components",
  slug: "my-component",
  addedAt: "2026-09-09", // Optional; use the actual publication date.
},
```

Categories are `Text Animations`, `Components`, `Hero Backgrounds`, `Visual Effects` and `ASCII Effects`. `addedAt` controls the temporary new badge. There is no `isNew` metadata field.

This registry supplies sidebar navigation, search, page metadata and the generated `llms.txt` catalog.

## 4. Write the docs

Create an async Server Component at `apps/web/components/docs/my-component.tsx`. Use `DocsPageLayout` and `readComponentSource("my-component")` so the displayed manual source matches the registry.

```tsx
import { MyComponent } from "@workspace/ui/components/my-component"
import { DocsPageLayout } from "@/components/docs-page-layout"
import { readComponentSource } from "@/lib/source-code"

const usageCode = `import { MyComponent } from "@/components/ui/my-component"

<MyComponent text="Hello" />`

export async function MyComponentDocs() {
  const sourceCode = await readComponentSource("my-component")
  return (
    <DocsPageLayout
      title="My Component"
      description="What it does and when to use it."
      preview={<MyComponent text="Hello" />}
      previewCode={usageCode}
      installPackageName="my-component"
      installSourceCode={sourceCode ?? "// Unable to load source code"}
      usageCode={usageCode}
      props={[
        { name: "text", type: "string", description: "Text to display." },
        { name: "className", type: "string", description: "Additional styles." },
      ]}
    />
  )
}
```

Every usage/example snippet should contain its imports and enough context to run. Avoid snippets that depend on an unexplained `items` or other variable from a different example. Explain required assets, providers, viewport/scroll containers and optional audio or graphics support in `installationNote` or `usageNote`. Show meaningful variants when they teach something; do not add filler examples or FAQs.

Use `installDependencies` for manual setup instructions. Keep it aligned with the generated item's dependencies. Installation commands use `apps/web/lib/install-command.ts`; do not introduce another command formatter in UI or Markdown exports.

If an interactive preview needs hooks, put it in a client component under `components/docs/previews/`. Keep the docs wrapper on the server. Use a dedicated `app/demo/{slug}/page.tsx` with an iframe for full-viewport experiences.

## 5. Register the docs import

In `apps/web/components/docs/lazy-registry.ts`:

```ts
"my-component": () =>
  import("@/components/docs/my-component").then((m) => ({
    default: m.MyComponentDocs,
  })),
```

The shared `app/docs/components/[slug]/page.tsx` generates the route. Metadata and docs-import keys must match exactly. Do not create another component route folder or edit sidebar entries manually.

## 6. Verify

```bash
pnpm registry:generate
pnpm registry:check
pnpm test
pnpm lint
pnpm --filter web exec next typegen
pnpm typecheck
pnpm build
REGISTRY_SMOKE_BROWSER=1 pnpm test:registry:install
```

Inspect `/docs/components/{slug}` at narrow and wide widths in both themes. Check the preview, manual source, CLI command, copied Markdown, usage, props and examples. Test keyboard traversal, activation, focus visibility, pointer/touch use, reduced motion and repeated interaction. Inspect browser errors and overflow.

The CI workflow runs registry/docs checks, regression tests, lint, type checking, a production build, and a fresh-consumer installation/browser smoke test. The smoke test samples different dependency/helper cases; it does not certify every component's accessibility or device behavior. Add a focused regression case when fixing a behavior that these checks would miss.
