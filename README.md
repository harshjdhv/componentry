<div align="center">
  <img src="apps/web/public/www.componentry.fun_.png" alt="Componentry Banner" width="100%" />
</div>

<h1 align="center">Componentry</h1>

<p align="center">
  <strong>Beautiful, interactive UI components you can copy and paste into your apps.</strong>
</p>

<p align="center">
  Crafted with React, Tailwind CSS, and Framer Motion. Open source. Free forever.
</p>

<p align="center">
  <a href="https://componentry.harshjdhv.com">Documentation</a> ·
  <a href="https://componentry.harshjdhv.com/docs/components">Components</a> ·
  <a href="https://github.com/harshjdhv/componentry/issues">Report Bug</a> ·
  <a href="https://github.com/harshjdhv/componentry/issues">Request Feature</a>
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

Componentry is a collection of beautifully designed, interactive UI components built with React and Tailwind CSS. Unlike traditional component libraries, Componentry gives you the actual source code - just copy, paste, and customize to match your brand.

### Why Componentry?

- **Copy & Paste** - Not a dependency. You own the code.
- **Interactive** - Cursor-following effects, 3D transforms, and smooth animations.
- **Customizable** - Built with Tailwind CSS. Easy to modify.
- **Accessible** - WAI-ARIA compliant components.
- **Dark Mode** - All components support light and dark modes.
- **TypeScript** - Fully typed for the best developer experience.

## Featured Components

| Component | Description |
|-----------|-------------|
| [Flight Status Card](https://componentry.harshjdhv.com/docs/components/flight-status-card) | Premium flight tracker with dot-matrix display and progress animation |
| [Spotlight Card](https://componentry.harshjdhv.com/docs/components/spotlight-card) | Interactive cards with cursor-following spotlight and 3D tilt effects |

## Quick Start

### Installation via CLI

The fastest way to add components is using the shadcn CLI:

```bash
npx shadcn@latest add https://componentry.harshjdhv.com/r/spotlight-card.json
```

### Manual Installation

1. Copy the component source code from the documentation
2. Paste it into your project's components directory
3. Install any required dependencies
4. Import and use the component

```tsx
import { SpotlightCard } from "@/components/ui/spotlight-card"

export default function Page() {
  return (
    <SpotlightCard className="w-96">
      <h2>Hello World</h2>
      <p>This card has a spotlight effect!</p>
    </SpotlightCard>
  )
}
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

## Contributing

We welcome contributions! Whether it's:

- Reporting a bug
- Submitting a fix
- Proposing new features
- Creating new components

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

See [LICENSE](./LICENSE) for more information.

## Acknowledgments

- Inspired by [shadcn/ui](https://ui.shadcn.com/)
- Built with [Tailwind CSS](https://tailwindcss.com/)
- Powered by [Vercel](https://vercel.com/)

---

<p align="center">
  Made with care by <a href="https://twitter.com/harshjdhv">Harsh Jadhav</a>
</p>
