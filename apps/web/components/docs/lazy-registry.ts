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
  "mac-keyboard": () =>
    import("@/components/docs/mac-keyboard").then((m) => ({
      default: m.MacKeyboardDocs,
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
  "dither-prism-hero": () =>
    import("@/components/docs/dither-prism-hero").then((m) => ({
      default: m.DitherPrismHeroDocs,
    })),
  "webgl-liquid": () =>
    import("@/components/docs/webgl-liquid").then((m) => ({
      default: m.WebGLLiquidDocs,
    })),
  "closing-plasma": () =>
    import("@/components/docs/closing-plasma").then((m) => ({
      default: m.ClosingPlasmaDocs,
    })),
  "animated-gradient": () =>
    import("@/components/docs/animated-gradient").then((m) => ({
      default: m.AnimatedGradientDocs,
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
  "scrub-input": () =>
    import("@/components/docs/scrub-input").then((m) => ({
      default: m.ScrubInputDocs,
    })),
  "scroll-choreography": () =>
    import("@/components/docs/scroll-choreography").then((m) => ({
      default: m.ScrollChoreographyDocs,
    })),
  "letter-cascade": () =>
    import("@/components/docs/letter-cascade").then((m) => ({
      default: m.LetterCascadeDocs,
    })),
  "text-repel": () =>
    import("@/components/docs/text-repel").then((m) => ({
      default: m.TextRepelDocs,
    })),
  "cursor-driven-particle-typography": () =>
    import("@/components/docs/cursor-driven-particle-typography").then((m) => ({
      default: m.CursorDrivenParticleTypographyDocs,
    })),
  "image-trail": () =>
    import("@/components/docs/image-trail").then((m) => ({
      default: m.ImageTrailDocs,
    })),
  "image-ripple-effect": () =>
    import("@/components/docs/image-ripple-effect").then((m) => ({
      default: m.ImageRippleEffectDocs,
    })),
  "infinite-image-field": () =>
    import("@/components/docs/infinite-image-field").then((m) => ({
      default: m.InfiniteImageFieldDocs,
    })),
  "layered-stack": () =>
    import("@/components/docs/layered-stack").then((m) => ({
      default: m.LayeredStackDocs,
    })),
  "signature": () =>
    import("@/components/docs/signature").then((m) => ({
      default: m.SignatureDocs,
    })),
  "split-flap-display": () =>
    import("@/components/docs/split-flap-display").then((m) => ({
      default: m.SplitFlapDisplayDocs,
    })),
  "eye-tracking": () =>
    import("@/components/docs/eye-tracking").then((m) => ({
      default: m.EyeTrackingDocs,
    })),
  "scratch-card": () =>
    import("@/components/docs/scratch-card").then((m) => ({
      default: m.ScratchCardDocs,
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
