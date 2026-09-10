# shadcn Registry Index Submission

This repository now exposes a namespaced registry at:

- `https://componentry.fun/r/registry.json`
- Example item: `https://componentry.fun/r/magnetic-dock.json`

## Goal

Get zero-config installs working:

```bash
npx shadcn@latest add @componentry/magnetic-dock
```

## Required change in `shadcn-ui/ui`

1. Open `apps/v4/registry/directory.json`.
2. Add an entry for Componentry (matching the current `registries.json` shape):

```json
{
  "name": "@componentry",
  "homepage": "https://componentry.fun",
  "url": "https://componentry.fun/r/{name}.json",
  "description": "Beautiful, interactive React + Tailwind components for modern product UIs.",
  "logo": "<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='120 120 272 272' fill='currentColor'><path d='M120 160Q120 120 160 120H260Q300 120 300 160V220H352Q392 220 392 260V352Q392 392 352 392H260Q220 392 220 352V292H160Q120 292 120 252Z'/></svg>"
}
```

3. Run:

```bash
pnpm registry:build
```

4. Commit generated index artifacts and open a PR.

## Suggested PR checklist

- [ ] `https://componentry.fun/r/registry.json` is publicly accessible.
- [ ] `https://componentry.fun/r/magnetic-dock.json` is publicly accessible.
- [ ] Local validation passes in this repo: `pnpm validate:registry`.
- [ ] Direct URL installation works:
      `npx shadcn@latest add https://componentry.fun/r/magnetic-dock.json`.
