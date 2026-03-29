export type ComponentCategory =
  | "Text Animations"
  | "Components"
  | "Hero Backgrounds"
  | "Visual Effects";

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
  // Text Animations
  "hyper-text": {
    title: "Hyper Text",
    description:
      "A text scramble effect that cycles through characters before revealing the final text. Inspired by cyberpunk and futuristic UIs.",
    category: "Text Animations",
    slug: "hyper-text",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/text-animations/hovereffect1.mov",
  },
  "text-animate": {
    title: "Text Animate",
    description: "Animate text characters with staggered delays and effects.",
    category: "Text Animations",
    slug: "text-animate",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/text-animations/textanimate.mov",
  },
  "mac-keyboard": {
    title: "Mac Keyboard",
    description: "A realistic Mac keyboard component with interactive keys and detailed styling.",
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
  "command-menu": {
    title: "Command Menu",
    description: "Fast, accessible, and composable command menu for React.",
    category: "Components",
    slug: "command-menu",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/component-animations/commandmenu.mov",
  },
  "flight-status-card": {
    title: "Flight Status Card",
    description: "A detailed card showing flight information with animations.",
    category: "Components",
    slug: "flight-status-card",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/component-animations/flightstuatscard.mov",
  },
  "magnetic-dock": {
    title: "Magnetic Dock",
    description: "MacOS style dock that scales items based on mouse proximity.",
    category: "Components",
    slug: "magnetic-dock",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/component-animations/magneticdock.mov",
  },
  "showcase-card": {
    title: "Showcase Card",
    description: "Card component for showcasing projects or features.",
    category: "Components",
    slug: "showcase-card",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/component-animations/showcasecard.mov",
  },
  "spotlight-card": {
    title: "Spotlight Card",
    description: "A card that reveals a spotlight effect on hover.",
    category: "Components",
    slug: "spotlight-card",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/component-animations/spotlightcard.mov",
  },
  "auth-modal": {
    title: "Auth Modal",
    description: "Beautiful authentication modal with transitions.",
    category: "Components",
    slug: "auth-modal",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/component-animations/authmodal.mov",
  },
  "testimonial-marquee": {
    title: "Testimonial Marquee",
    description: "Infinite scrolling marquee for testimonials.",
    category: "Components",
    slug: "testimonial-marquee",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/component-animations/testimonialmarquee.mov",
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
  "scrub-input": {
    title: "Scrub Input",
    description: "An inline interactive slider styled as a pill.",
    category: "Components",
    slug: "scrub-input",
    addedAt: "2026-02-27",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/component-animations/scrubinput.mp4",
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
  "layered-stack": {
    title: "Layered Stack",
    description: "A stack of layered cards that interact with mouse hover.",
    category: "Components",
    slug: "layered-stack",
    addedAt: "2026-03-15",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/component-animations/layeredstack.webm",
  },

  "split-flap-display": {
    title: "Split Flap Display",
    description: "A premium split-flap display component inspired by vintage departure boards.",
    category: "Components",
    slug: "split-flap-display",
    addedAt: "2026-03-27",
  },
  "eye-tracking": {
    title: "Eye Tracking",
    description: "Hyper-realistic eyes that follow your cursor with smooth spring physics, reactive pupils, blinking, and multiple stunning variants.",
    category: "Components",
    slug: "eye-tracking",
    addedAt: "2026-03-28",
  },
  "scratch-card": {
    title: "Scratch Card",
    description: "A premium scratch-to-reveal card with realistic metallic textures, canvas-based scratching, and multiple overlay styles.",
    category: "Components",
    slug: "scratch-card",
    addedAt: "2026-03-28",
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
  "infinite-image-field": {
    title: "Infinite Image Field",
    description:
      "An endless, cursor-driven photo canvas that tiles images infinitely and pans fluidly toward wherever you move your cursor.",
    category: "Visual Effects",
    slug: "infinite-image-field",
    addedAt: "2026-03-20",
  },
  "border-beam": {
    title: "Border Beam",
    description: "Animated beam of light traveling along the border.",
    category: "Visual Effects",
    slug: "border-beam",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/visual-effects/borderbeam.mov",
  },
  "dither-gradient": {
    title: "Dither Gradient",
    description: "Gradient background with dithering noise.",
    category: "Visual Effects",
    slug: "dither-gradient",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/visual-effects/dithergradient.mov",
  },
  "liquid-blob": {
    title: "Liquid Blob",
    description: "Animated liquid blob shape.",
    category: "Visual Effects",
    slug: "liquid-blob",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/visual-effects/liquidblob.mov",
  },
  "magnet-lines": {
    title: "Magnet Lines",
    description: "Lines that react to cursor movement like a magnetic field.",
    category: "Visual Effects",
    slug: "magnet-lines",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/visual-effects/magneticlines.mov",
  },
  "noise-texture": {
    title: "Noise Texture",
    description: "Subtle noise texture overlay.",
    category: "Visual Effects",
    slug: "noise-texture",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/visual-effects/noisetexture.mov",
  },
  "particle-galaxy": {
    title: "Particle Galaxy",
    description: "Interactive 3D particle system resembling a galaxy.",
    category: "Visual Effects",
    slug: "particle-galaxy",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/visual-effects/particlegalaxy.mov",
  },
  "pixel-canvas": {
    title: "Pixel Canvas",
    description: "Canvas where pixels react to interaction.",
    category: "Visual Effects",
    slug: "pixel-canvas",
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/visual-effects/pixelcanvas.mov",
  },
  "signature": {
    title: "Signature",
    description: "An animated SVG signature effect that draws out text as if hand-written.",
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
