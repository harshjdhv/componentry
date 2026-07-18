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
  "dithered-logo": () =>
    import("@/components/docs/dithered-logo").then((m) => ({
      default: m.DitheredLogoDocs,
    })),
  "bouncy-accordion": () =>
    import("@/components/docs/bouncy-accordion").then((m) => ({
      default: m.BouncyAccordionDocs,
    })),
  "sticky-scroll-cards": () =>
    import("@/components/docs/sticky-scroll-cards").then((m) => ({
      default: m.StickyScrollCardsDocs,
    })),
  "music-player": () =>
    import("@/components/docs/music-player").then((m) => ({
      default: m.MusicPlayerDocs,
    })),
  "scroll-split-card": () =>
    import("@/components/docs/scroll-split-card").then((m) => ({
      default: m.ScrollSplitCardDocs,
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
  "silk-aurora": () =>
    import("@/components/docs/silk-aurora").then((m) => ({
      default: m.SilkAuroraDocs,
    })),
  "closing-plasma": () =>
    import("@/components/docs/closing-plasma").then((m) => ({
      default: m.ClosingPlasmaDocs,
    })),
  "animated-gradient": () =>
    import("@/components/docs/animated-gradient").then((m) => ({
      default: m.AnimatedGradientDocs,
    })),
  "prism-gradient": () =>
    import("@/components/docs/prism-gradient").then((m) => ({
      default: m.PrismGradientDocs,
    })),
  "liquid-chrome": () =>
    import("@/components/docs/liquid-chrome").then((m) => ({
      default: m.LiquidChromeDocs,
    })),
  "dither-gradient": () =>
    import("@/components/docs/dither-gradient").then((m) => ({
      default: m.DitherGradientDocs,
    })),
  "magnet-lines": () =>
    import("@/components/docs/magnet-lines").then((m) => ({
      default: m.MagnetLinesDocs,
    })),
  "matrix-rain": () =>
    import("@/components/docs/matrix-rain").then((m) => ({
      default: m.MatrixRainDocs,
    })),
  "pixel-canvas": () =>
    import("@/components/docs/pixel-canvas").then((m) => ({
      default: m.PixelCanvasDocs,
    })),
  "scroll-choreography": () =>
    import("@/components/docs/scroll-choreography").then((m) => ({
      default: m.ScrollChoreographyDocs,
    })),
  "scroll-tilted-grid": () =>
    import("@/components/docs/scroll-tilted-grid").then((m) => ({
      default: m.ScrollTiltedGridDocs,
    })),
  "letter-cascade": () =>
    import("@/components/docs/letter-cascade").then((m) => ({
      default: m.LetterCascadeDocs,
    })),
  "text-repel": () =>
    import("@/components/docs/text-repel").then((m) => ({
      default: m.TextRepelDocs,
    })),
  "kinetic-text-reveal": () =>
    import("@/components/docs/kinetic-text-reveal").then((m) => ({
      default: m.KineticTextRevealDocs,
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
  "ripple-transition": () =>
    import("@/components/docs/ripple-transition").then((m) => ({
      default: m.RippleTransitionDocs,
    })),
  "infinite-image-field": () =>
    import("@/components/docs/infinite-image-field").then((m) => ({
      default: m.InfiniteImageFieldDocs,
    })),
  "layered-stack": () =>
    import("@/components/docs/layered-stack").then((m) => ({
      default: m.LayeredStackDocs,
    })),
  "orbit-card-stack": () =>
    import("@/components/docs/orbit-card-stack").then((m) => ({
      default: m.OrbitCardStackDocs,
    })),
  signature: () =>
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
  "color-picker": () =>
    import("@/components/docs/color-picker").then((m) => ({
      default: m.ColorPickerDocs,
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
