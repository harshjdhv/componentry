# Maintaining Componentry

Start with [the component creation guide](./COMPONENT_CREATION_GUIDE.md).

## Structure

- `packages/ui/src/components/`: reusable component source.
- `apps/web/components/docs/`: documentation and optional client previews.
- `apps/web/registry/index.ts`: component metadata used by navigation, search, SEO and `llms.txt`.
- `apps/web/components/docs/lazy-registry.ts`: documentation import map used by the shared `/docs/components/[slug]` route.
- `apps/web/public/r/`: installable shadcn registry payloads.
- `apps/web/registry/blocks/_registry.ts`: block definitions and source mappings.
- `scripts/`: generation, validation and fresh-consumer installation checks.

`@workspace/ui` is a private workspace package. Users install source through the shadcn registry; it is not an npm package release.

## Contributor workflow

1. Implement a component in `packages/ui/src/components/{slug}.tsx`.
2. Generate its payload with `node scripts/generate-registry.js {slug}`.
3. Add metadata in `apps/web/registry/index.ts`.
4. Add an async docs component and register its import in `lazy-registry.ts`.
5. Run the checks below, then verify the rendered preview and interaction.

Navigation and documentation routes are derived from metadata and the import map. Do not create a separate route or manually add sidebar entries.

```bash
pnpm install --frozen-lockfile
pnpm registry:generate
pnpm registry:check
pnpm test
pnpm lint
pnpm --filter web exec next typegen
pnpm typecheck
pnpm build
REGISTRY_SMOKE_BROWSER=1 pnpm test:registry:install
```

The consumer smoke test creates a temporary Next.js project, installs representative local registry payloads with the shadcn CLI, and checks TypeScript. The browser option also checks the installed dock's keyboard activation, focus labels, form behavior and reduced motion. It needs Chromium (`pnpm exec playwright install chromium`). It uses network access for npm installation and deletes its fixture afterward. Set `KEEP_REGISTRY_SMOKE=1` to retain the fixture for debugging.

## References

- [Component creation guide](./COMPONENT_CREATION_GUIDE.md)
- [Current architecture and remaining opportunities](./library-architecture-improvements.md)
- [Registry index submission notes](./SHADCN_REGISTRY_INDEX_SUBMISSION.md)
- [Historical performance analysis](./performance_analysis.md)
- [Website](https://componentry.dev)

Install a component with `npx shadcn@latest add @componentry/magnetic-dock`. The canonical registry URL is `https://componentry.dev/r/{name}.json`.
