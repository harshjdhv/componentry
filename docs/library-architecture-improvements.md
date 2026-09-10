# Componentry architecture

This document describes the current architecture. The earlier proposal for introducing centralized metadata, separate previews and dynamic docs routing has been implemented and is no longer a migration plan.

## Keep these boundaries

- Reusable source lives in the private `packages/ui` workspace.
- The Next.js website owns documentation layouts, previews and marketing pages.
- `apps/web/registry/index.ts` supplies component metadata, navigation, search and page metadata.
- `components/docs/lazy-registry.ts` maps component slugs to async documentation modules.
- One `[slug]` route handles component pages.
- Registry JSON is the distribution format for shadcn installations.
- Blocks have their own typed source registry and generated artifacts. The public `/blocks` page currently points to Componentry Pro.

## Distribution checks

The component and block generators support read-only freshness checks. Registry validation checks dependency declarations, internal imports, helper resolution, index membership and documentation coverage. A fresh-consumer smoke test installs representative payloads with the real CLI and typechecks them without workspace aliases. Its browser mode exercises the installed magnetic dock.

The public registry contains documented components and registered blocks. Older undocumented entries have been retired; component generation requires canonical source, and validation rejects entries without documentation or a block definition. Previously copied source continues to work, but retired registry URLs are no longer provided.

## Further improvements should follow evidence

- Add targeted interaction, accessibility or graphics regression tests when a component exposes a gap.
- Expand the consumer smoke sample when adding a new dependency or installation pattern.
- Document assets, themes and provider requirements next to the component that needs them.
- Introduce more documentation fields only when they answer a recurring user question.

A custom MCP server, multiple language/style variants, or a new documentation framework are product decisions, not prerequisites for reliable source distribution.
