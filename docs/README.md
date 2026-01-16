# Componentry Internal Documentation

This directory contains internal documentation for maintaining and extending the Componentry UI library.

## 📄 Available Guides

| Document | Description |
|----------|-------------|
| [CREATING_COMPONENTS.md](./CREATING_COMPONENTS.md) | Complete guide for adding new components |

## 🏗️ Architecture Overview

```
componentry/
├── packages/ui/          # Core component library (publishable)
├── apps/web/             # Documentation website (Next.js)
└── docs/                 # Internal documentation (this folder)
```

### Key Concepts

1. **Monorepo Structure** - Uses pnpm workspaces with Turborepo
2. **Component Registry** - shadcn/ui compatible JSON files for easy installation
3. **Documentation Site** - Next.js App Router with MDX-free component pages

## 🚀 Quick Start for Contributors

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build
```

## 📦 Adding a New Component (Quick Steps)

1. **Create component:** `packages/ui/src/components/{name}.tsx`
2. **Create registry JSON:** `apps/web/public/r/{name}.json`
3. **Create docs page:** `apps/web/app/docs/components/{name}/page.tsx`
4. **Add to sidebar:** `apps/web/config/docs.ts`

See [CREATING_COMPONENTS.md](./CREATING_COMPONENTS.md) for detailed instructions.

## 🔗 Useful Links

- **Live Site:** https://componentry.fun
- **Registry URL:** https://componentry.fun/r/{component}.json
- **Install Example:** `pnpm dlx shadcn@latest add "https://componentry.fun/r/showcase-card.json"`

