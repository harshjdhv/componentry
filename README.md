


<div align="center">
  <img src="apps/web/public/banner.png" alt="Componentry Banner" width="100%" />
</div>

<h1 align="center">Componentry</h1>

<p align="center">
  <strong>Beautiful, interactive UI components you can copy and paste into your apps.</strong>
</p>

<p align="center">
  Crafted with React, Tailwind CSS, and Framer Motion. Open source. Free forever.
</p>

<p align="center">
  <a href="https://componentry.dev">Documentation</a> ·
  <a href="https://componentry.dev/docs/components">Components</a> ·
  <a href="https://github.com/harshjdhv/componentry/issues">Report Bug</a> ·
  <a href="https://github.com/harshjdhv/componentry/issues">Request Feature</a>
</p>

<p align="center">
  <a href="https://vercel.com/open-source-program">
    <img alt="Vercel OSS Program" src="https://vercel.com/oss/program-badge-2026.svg" />
  </a>
</p>

<p align="center">
  <a href="https://github.com/harshjdhv/componentry/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" />
  </a>
  <a href="https://twitter.com/harshjdhv">
    <img src="https://img.shields.io/twitter/follow/harshjdhv?style=social" alt="Twitter" />
  </a>
</p>

---

## Introduction

Componentry is a collection of beautifully designed, interactive UI components built with React and Tailwind CSS. Just run the CLI command, add the component to your project, and start building.

### Why Componentry?

- **Copy & Paste** - Not a dependency. You own the code.
- **Interactive** - Cursor-following effects, 3D transforms, and smooth animations.
- **Customizable** - Built with Tailwind CSS. Easy to modify.
- **Accessible foundations** - Native controls and component-specific keyboard and motion support. Validate accessibility in your application.
- **Dark Mode** - All components support light and dark modes.
- **TypeScript** - Fully typed for the best developer experience.



## Quick Start

### Installation via CLI

The fastest way to add components is using the shadcn CLI:

```bash
npx shadcn@latest add @componentry/magnetic-dock
```


## Development

This project uses [Turborepo](https://turbo.build/repo) for monorepo management.

### Prerequisites

- Node.js 20+
- pnpm 10+

### Setup

```bash
# Clone the repository
git clone https://github.com/harshjdhv/componentry.git
cd componentry

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Project Structure

```
componentry/
├── apps/
│   └── web/                 # Documentation site (Next.js)
├── packages/
│   ├── ui/                  # Component library
│   ├── eslint-config/       # Shared ESLint configuration
│   └── typescript-config/   # Shared TypeScript configuration
└── turbo.json               # Turborepo configuration
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build all packages |
| `pnpm lint` | Run linting |
| `pnpm format` | Format code with Prettier |
| `pnpm registry:generate` | Regenerate component and block payloads |
| `pnpm registry:check` | Check registry freshness, dependencies and docs coverage |
| `pnpm test` | Run distribution regression tests |
| `pnpm typecheck` | Typecheck the web and UI workspaces |
| `pnpm test:registry:install` | Install and typecheck representative payloads in a fresh app |

## Contributing

We welcome contributions! Whether it's:

- Reporting a bug
- Submitting a fix
- Proposing new features
- Creating new components

See [the component creation guide](docs/COMPONENT_CREATION_GUIDE.md) for source, registry and documentation steps, and [the maintenance guide](docs/README.md) for validation commands.

### How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-component`)
3. Commit your changes (`git commit -m 'Add amazing component'`)
4. Push to the branch (`git push origin feature/amazing-component`)
5. Open a Pull Request

### Component Guidelines

When creating new components:

- Use TypeScript with proper type definitions
- Support both light and dark modes
- Include comprehensive props with sensible defaults
- Add smooth transitions and animations
- Write clear documentation with examples
- Follow existing code style and patterns

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [React 19](https://react.dev/)
- **Build**: [Turborepo](https://turbo.build/repo)
- **Package Manager**: [pnpm](https://pnpm.io/)

## License

MIT License - feel free to use these components in personal and commercial projects.

## Third-Party Licenses

Some components use third-party dependencies with separate license terms.

- `image-trail` and `layered-stack` require `gsap` (GSAP).
- If you use or redistribute those components, you are responsible for complying with GSAP's license terms.
- GSAP license: https://gsap.com/licensing/

See [LICENSE](./LICENSE) for more information.

## Acknowledgments

- Inspired by [shadcn/ui](https://ui.shadcn.com/)
- Built with [Tailwind CSS](https://tailwindcss.com/)
- Powered by [Vercel](https://vercel.com/)

<p align="center">
  <a href="https://star-history.dera.page/#harshjdhv/componentry&Date">
    <picture>
      <source
        media="(prefers-color-scheme: dark)"
        srcset="https://star-history.dera.page/svg?repos=harshjdhv/componentry&type=Date&theme=dark&legend=top-left"
      />
      <source
        media="(prefers-color-scheme: light)"
        srcset="https://star-history.dera.page/svg?repos=harshjdhv/componentry&type=Date&legend=top-left"
      />
      <img
        alt="Star History Chart"
        src="https://star-history.dera.page/svg?repos=harshjdhv/componentry&type=Date&legend=top-left"
      />
    </picture>
  </a>
</p>

---

<p align="center">
  Made with care by <a href="https://twitter.com/harshjdhv">Harsh Jadhav</a>
</p>
