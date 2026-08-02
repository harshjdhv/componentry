export type ComponentCategory =
  | "Text Animations"
  | "Components"
  | "Hero Backgrounds"
  | "Visual Effects"
  | "ASCII Effects";

export interface ComponentMetadata {
  title: string;
  description: string;
  category: ComponentCategory;
  slug: string;
  addedAt?: string;
  previewVideo?: string;
}

const NEW_BADGE_DURATION_MS = 5 * 24 * 60 * 60 * 1000; // 5 days

export function isNewComponent(component: ComponentMetadata): boolean {
  if (!component.addedAt) return false;
  const addedTime = new Date(component.addedAt).getTime();
  return Date.now() - addedTime < NEW_BADGE_DURATION_MS;
}

export const components: Record<string, ComponentMetadata> = {
  "dithered-logo": {
    title: "Dithered Logo",
    description:
      "An interactive particle logo that turns image assets into a dithered canvas field with cursor ripples.",
    category: "Visual Effects",
    slug: "dithered-logo",
    addedAt: "2026-07-08",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/visual-effects/ditheredlogo.webm",
  },
  "sticky-scroll-cards": {
    title: "Sticky Scroll Cards",
    description:
      "A scroll-driven card stack where images pin and scale as you scroll, creating a layered depth effect.",
    category: "Components",
    slug: "sticky-scroll-cards",
    addedAt: "2026-04-10",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/component-animations/stickyscrollcards.webm",
  },
  "music-player": {
    title: "Music Player",
    description:
      "A fun interactive vinyl record music player with swinging tonearm.",
    category: "Components",
    slug: "music-player",
    addedAt: "2026-04-03",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/component-animations/musicplayer.webm",
  },
  "scroll-split-card": {
    title: "Scroll Split Card",
    description:
      "A scroll-driven interactive card that splits into three panels and flips.",
    category: "Components",
    slug: "scroll-split-card",
    addedAt: "2026-04-03",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/component-animations/scrollsplitcard.webm",
  },
  "mac-keyboard": {
    title: "Mac Keyboard",
    description:
      "A realistic Mac keyboard component with interactive keys and detailed styling.",
    category: "Components",
    slug: "mac-keyboard",
    addedAt: "2026-03-13",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/component-animations/mackeyboard.webm",
  },
  "scroll-based-velocity": {
    title: "Velocity Scroll",
    description: "Text that moves horizontally based on scroll speed.",
    category: "Text Animations",
    slug: "scroll-based-velocity",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/text-animations/scrollvelocity.mov",
  },
  "letter-cascade": {
    title: "Letter Cascade",
    description:
      "Kinetic text animation where letters scatter outward with spring physics and blur, then elegantly reassemble.",
    category: "Text Animations",
    slug: "letter-cascade",
    addedAt: "2026-02-28",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/text-animations/lettercascade.webm",
  },
  "text-repel": {
    title: "Text Repel",
    description:
      "Physics-based text where each letter reacts to cursor proximity with spring dynamics, creating an interactive magnetic force-field effect.",
    category: "Text Animations",
    slug: "text-repel",
    addedAt: "2026-02-28",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/text-animations/textrepel.webm",
  },
  "text-morph": {
    title: "Text Morph",
    description:
      "Fluid word transitions that blend blurred silhouettes through a crisp SVG alpha threshold.",
    category: "Text Animations",
    slug: "text-morph",
    addedAt: "2026-08-02",
  },
  "kinetic-text-reveal": {
    title: "Kinetic Text Reveal",
    description:
      "Directional text reveal with soft blur and configurable word, character, or line stagger timing.",
    category: "Text Animations",
    slug: "kinetic-text-reveal",
    addedAt: "2026-06-07",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/text-animations/kinetictextreveal.webm",
  },
  "cursor-driven-particle-typography": {
    title: "Particle Typography",
    description:
      "Renders dynamic typography constructed entirely from particles that elegantly disperse and reassemble upon cursor interaction using spring physics.",
    category: "Text Animations",
    slug: "cursor-driven-particle-typography",
    addedAt: "2026-03-01",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/text-animations/cursordrivenparticletypography.webm",
  },
  // Components
  "circuit-board": {
    title: "Circuit Board",
    description:
      "Animated circuit board visualization with nodes and connections.",
    category: "Components",
    slug: "circuit-board",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/component-animations/circuitboard.mov",
  },
  "flight-status-card": {
    title: "Flight Status Card",
    description: "A detailed card showing flight information with animations.",
    category: "Components",
    slug: "flight-status-card",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/component-animations/flightstatuscard.webm",
  },
  "magnetic-dock": {
    title: "Magnetic Dock",
    description: "MacOS style dock that scales items based on mouse proximity.",
    category: "Components",
    slug: "magnetic-dock",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/component-animations/magneticdock.mov",
  },
  "collection-surfer": {
    title: "Collection Surfer",
    description: "Smooth surfing interaction for browsing collections.",
    category: "Components",
    slug: "collection-surfer",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/component-animations/collectionsurfer.mov",
  },
  "github-calendar": {
    title: "Github Calendar",
    description: "GitHub-style contribution calendar heatmap.",
    category: "Components",
    slug: "github-calendar",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/component-animations/githubcalendar.mov",
  },
  "scroll-choreography": {
    title: "Scroll Choreography",
    description:
      "A smooth, scroll-driven image choreography component using Framer Motion.",
    category: "Components",
    slug: "scroll-choreography",
    addedAt: "2026-02-28",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/component-animations/scrollchoreography.webm",
  },
  "scroll-tilted-grid": {
    title: "Scroll Tilted Grid",
    description:
      "A cinematic image grid that tilts and resolves into focus as each frame crosses the viewport.",
    category: "Components",
    slug: "scroll-tilted-grid",
    addedAt: "2026-07-17",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/component-animations/scrolltiltedgrid.webm",
  },
  "layered-stack": {
    title: "Layered Stack",
    description: "A stack of layered cards that interact with mouse hover.",
    category: "Components",
    slug: "layered-stack",
    addedAt: "2026-03-15",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/component-animations/layeredstack.webm",
  },
  "orbit-card-stack": {
    title: "Orbit Card Stack",
    description:
      "Premium hover card deck that fans outward and lifts the active card without changing its color or angle.",
    category: "Components",
    slug: "orbit-card-stack",
    addedAt: "2026-06-07",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/component-animations/orbitcardstack.webm",
  },

  "split-flap-display": {
    title: "Split Flap Display",
    description:
      "A premium split-flap display component inspired by vintage departure boards.",
    category: "Components",
    slug: "split-flap-display",
    addedAt: "2026-03-27",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/component-animations/splitflapdisplay.webm",
  },
  "eye-tracking": {
    title: "Eye Tracking",
    description:
      "Hyper-realistic eyes that follow your cursor with smooth spring physics, reactive pupils, blinking, and multiple stunning variants.",
    category: "Components",
    slug: "eye-tracking",
    addedAt: "2026-03-28",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/component-animations/eyetracking.webm",
  },
  // Hero Backgrounds
  "hero-geometric": {
    title: "Hero Geometric",
    description: "Geometric shapes and patterns for hero sections.",
    category: "Hero Backgrounds",
    slug: "hero-geometric",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/hero-backgrounds/herogeometric.mov",
  },
  "dither-prism-hero": {
    title: "Dither Prism Hero",
    description:
      "Stunning WebGL hero with advanced dithering, prismatic refraction, holographic iridescence, and center-focused energy.",
    category: "Hero Backgrounds",
    slug: "dither-prism-hero",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/hero-backgrounds/ditherprismhero.mov",
  },
  "webgl-liquid": {
    title: "WebGL Liquid",
    description:
      "Cinematic liquid shader hero with premium gradients, configurable reveal timing, and advanced flow controls.",
    category: "Hero Backgrounds",
    slug: "webgl-liquid",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/hero-backgrounds/webglliquid.mov",
  },
  "silk-aurora": {
    title: "Silk Aurora",
    description:
      "Premium WebGL hero background with satin-dark aurora ribbons, pearlescent highlights, fine grain, and cursor depth.",
    category: "Hero Backgrounds",
    slug: "silk-aurora",
    addedAt: "2026-06-09",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/hero-backgrounds/silkaurora.webm",
  },
  "closing-plasma": {
    title: "Closing Plasma",
    description:
      "Plasma field tailored for footer and CTA sections with premium atmospheric motion.",
    category: "Hero Backgrounds",
    slug: "closing-plasma",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/hero-backgrounds/closingplasma.mov",
  },

  "animated-gradient": {
    title: "Animated Gradient",
    description:
      "A beautiful, animated, and customizable WebGL gradient with noise capabilities.",
    category: "Hero Backgrounds",
    slug: "animated-gradient",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/hero-backgrounds/animatedgradient.webm",
  },
  "prism-gradient": {
    title: "Prism Gradient",
    description:
      "A theme-aware WebGL prism field with liquid checkered motion, electric-blue refraction, and tactile grain.",
    category: "Hero Backgrounds",
    slug: "prism-gradient",
    addedAt: "2026-07-13",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/hero-backgrounds/prismgradient.webm",
  },
  "liquid-chrome": {
    title: "Liquid Chrome",
    description: "Premium fluid liquid metal shader background effect.",
    category: "Hero Backgrounds",
    slug: "liquid-chrome",
    addedAt: "2026-06-24",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/hero-backgrounds/liquidchrome.webm",
  },
  // ASCII Effects
  "ascii-effect": {
    title: "ASCII Effect",
    description: "Render images as responsive ASCII artwork with image, flow, and glitch variations.",
    category: "ASCII Effects",
    slug: "ascii-effect",
    addedAt: "2026-07-21",
  },
  // Visual Effects
  "image-trail": {
    title: "Image Trail",
    description:
      "Leaves a trail of images behind the cursor with a premium delay fade.",
    category: "Visual Effects",
    slug: "image-trail",
    addedAt: "2026-03-09",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/visual-effects/imagetrail.webm",
  },
  "image-ripple-effect": {
    title: "Image Ripple Effect",
    description:
      "WebGL-powered cursor ripples that displace layered image cards in real time.",
    category: "Visual Effects",
    slug: "image-ripple-effect",
    addedAt: "2026-03-19",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/visual-effects/imagerippleeffect.webm",
  },
  "ripple-transition": {
    title: "Ripple Transition",
    description:
      "WebGL image transitions with noisy refractive waves, chromatic edges, glow, and click-triggered ripple origins.",
    category: "Visual Effects",
    slug: "ripple-transition",
    addedAt: "2026-07-07",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/visual-effects/rippletransition.webm",
  },
  "infinite-image-field": {
    title: "Infinite Image Field",
    description:
      "An endless, cursor-driven photo canvas that tiles images infinitely and pans fluidly toward wherever you move your cursor.",
    category: "Visual Effects",
    slug: "infinite-image-field",
    addedAt: "2026-03-20",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/visual-effects/infiniteimagefield.webm",
  },
  "dither-gradient": {
    title: "Dither Gradient",
    description: "Gradient background with dithering noise.",
    category: "Visual Effects",
    slug: "dither-gradient",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/visual-effects/dithergradient.mov",
  },
  "magnet-lines": {
    title: "Magnet Lines",
    description: "Lines that react to cursor movement like a magnetic field.",
    category: "Visual Effects",
    slug: "magnet-lines",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/visual-effects/magneticlines.mov",
  },
  "pixel-canvas": {
    title: "Pixel Canvas",
    description: "Canvas where pixels react to interaction.",
    category: "Visual Effects",
    slug: "pixel-canvas",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/visual-effects/pixelcanvas.mov",
  },
  signature: {
    title: "Signature",
    description:
      "An animated SVG signature effect that draws out text as if hand-written.",
    category: "Components",
    slug: "signature",
    addedAt: "2026-03-17",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/component-animations/signature.webm",
  },
  "matrix-rain": {
    title: "Matrix Rain",
    description: "Classic Matrix digital rain effect.",
    category: "Visual Effects",
    slug: "matrix-rain",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/visual-effects/matrixrain.mov",
  },
};

export function getComponent(slug: string) {
  return components[slug];
}
