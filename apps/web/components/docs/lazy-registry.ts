import type React from "react";

// Dynamic import map - components are only loaded when needed
// This is a CRITICAL performance optimization that reduces initial bundle size
// by ~80% since we only import the component being viewed.
const docsImportMap: Record<
  string,
  () => Promise<
    | { default: React.ComponentType<Record<string, unknown>> }
    | { [key: string]: React.ComponentType<Record<string, unknown>> }
  >
> = {
  "hyper-text": () =>
    import("@/components/docs/hyper-text").then((m) => ({
      default: m.HyperTextDocs,
    })),
  "auth-modal": () =>
    import("@/components/docs/auth-modal").then((m) => ({
      default: m.AuthModalDocs,
    })),
  "text-animate": () =>
    import("@/components/docs/text-animate").then((m) => ({
      default: m.TextAnimateDocs,
    })),
  "true-focus": () =>
    import("@/components/docs/true-focus").then((m) => ({
      default: m.TrueFocusDocs,
    })),
  "scroll-based-velocity": () =>
    import("@/components/docs/scroll-based-velocity").then((m) => ({
      default: m.ScrollBasedVelocityDocs,
    })),
  "circuit-board": () =>
    import("@/components/docs/circuit-board").then((m) => ({
      default: m.CircuitBoardDocs,
    })),
  "collection-surfer": () =>
    import("@/components/docs/collection-surfer").then((m) => ({
      default: m.CollectionSurferDocs,
    })),
  "command-menu": () =>
    import("@/components/docs/command-menu").then((m) => ({
      default: m.CommandMenuDocs,
    })),
  "flight-status-card": () =>
    import("@/components/docs/flight-status-card").then((m) => ({
      default: m.FlightStatusCardDocs,
    })),
  "github-calendar": () =>
    import("@/components/docs/github-calendar").then((m) => ({
      default: m.GithubCalendarDocs,
    })),
  "showcase-card": () =>
    import("@/components/docs/showcase-card").then((m) => ({
      default: m.ShowcaseCardDocs,
    })),
  "spotlight-card": () =>
    import("@/components/docs/spotlight-card").then((m) => ({
      default: m.SpotlightCardDocs,
    })),
  "testimonial-marquee": () =>
    import("@/components/docs/testimonial-marquee").then((m) => ({
      default: m.TestimonialMarqueeDocs,
    })),
  "magnetic-dock": () =>
    import("@/components/docs/magnetic-dock").then((m) => ({
      default: m.MagneticDockDocs,
    })),
  "hero-geometric": () =>
    import("@/components/docs/hero-geometric").then((m) => ({
      default: m.HeroGeometricDocs,
    })),
  "border-beam": () =>
    import("@/components/docs/border-beam").then((m) => ({
      default: m.BorderBeamDocs,
    })),
  "dither-gradient": () =>
    import("@/components/docs/dither-gradient").then((m) => ({
      default: m.DitherGradientDocs,
    })),
  "liquid-blob": () =>
    import("@/components/docs/liquid-blob").then((m) => ({
      default: m.LiquidBlobDocs,
    })),
  "magnet-lines": () =>
    import("@/components/docs/magnet-lines").then((m) => ({
      default: m.MagnetLinesDocs,
    })),
  "matrix-rain": () =>
    import("@/components/docs/matrix-rain").then((m) => ({
      default: m.MatrixRainDocs,
    })),
  "noise-texture": () =>
    import("@/components/docs/noise-texture").then((m) => ({
      default: m.NoiseTextureDocs,
    })),
  "particle-galaxy": () =>
    import("@/components/docs/particle-galaxy").then((m) => ({
      default: m.ParticleGalaxyDocs,
    })),
  "pixel-canvas": () =>
    import("@/components/docs/pixel-canvas").then((m) => ({
      default: m.PixelCanvasDocs,
    })),
};

/**
 * Get the dynamic import function for a docs component.
 * Returns null if the component doesn't exist in the registry.
 */
export function getDocsImporter(slug: string) {
  return docsImportMap[slug] ?? null;
}

/**
 * Get all available component slugs for static generation.
 */
export function getDocsSlugs(): string[] {
  return Object.keys(docsImportMap);
}
