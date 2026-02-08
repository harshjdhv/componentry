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
  isNew?: boolean;
}

export const components: Record<string, ComponentMetadata> = {
  // Text Animations
  "hyper-text": {
    title: "Hyper Text",
    description:
      "A text scramble effect that cycles through characters before revealing the final text. Inspired by cyberpunk and futuristic UIs.",
    category: "Text Animations",
    slug: "hyper-text",
  },
  "true-focus": {
    title: "True Focus",
    description:
      "Applies dynamic blur / clarity based over a series of words in order.",
    category: "Text Animations",
    slug: "true-focus",
  },
  "text-animate": {
    title: "Text Animate",
    description: "Animate text characters with staggered delays and effects.",
    category: "Text Animations",
    slug: "text-animate",
  },
  "scroll-based-velocity": {
    title: "Velocity Scroll",
    description: "Text that moves horizontally based on scroll speed.",
    category: "Text Animations",
    slug: "scroll-based-velocity",
  },

  // Components
  "circuit-board": {
    title: "Circuit Board",
    description:
      "Animated circuit board visualization with nodes and connections.",
    category: "Components",
    slug: "circuit-board",
  },
  "command-menu": {
    title: "Command Menu",
    description: "Fast, accessible, and composable command menu for React.",
    category: "Components",
    slug: "command-menu",
  },
  "flight-status-card": {
    title: "Flight Status Card",
    description: "A detailed card showing flight information with animations.",
    category: "Components",
    slug: "flight-status-card",
  },
  "magnetic-dock": {
    title: "Magnetic Dock",
    description: "MacOS style dock that scales items based on mouse proximity.",
    category: "Components",
    slug: "magnetic-dock",
  },
  "showcase-card": {
    title: "Showcase Card",
    description: "Card component for showcasing projects or features.",
    category: "Components",
    slug: "showcase-card",
  },
  "spotlight-card": {
    title: "Spotlight Card",
    description: "A card that reveals a spotlight effect on hover.",
    category: "Components",
    slug: "spotlight-card",
  },
  "auth-modal": {
    title: "Auth Modal",
    description: "Beautiful authentication modal with transitions.",
    category: "Components",
    slug: "auth-modal",
  },
  "testimonial-marquee": {
    title: "Testimonial Marquee",
    description: "Infinite scrolling marquee for testimonials.",
    category: "Components",
    slug: "testimonial-marquee",
  },
  "collection-surfer": {
    title: "Collection Surfer",
    description: "Smooth surfing interaction for browsing collections.",
    category: "Components",
    slug: "collection-surfer",
  },
  "github-calendar": {
    title: "Github Calendar",
    description: "GitHub-style contribution calendar heatmap.",
    category: "Components",
    slug: "github-calendar",
  },

  // Hero Backgrounds
  "hero-geometric": {
    title: "Hero Geometric",
    description: "Geometric shapes and patterns for hero sections.",
    category: "Hero Backgrounds",
    slug: "hero-geometric",
  },
  "dither-prism-hero": {
    title: "Dither Prism Hero",
    description:
      "Stunning WebGL hero with advanced dithering, prismatic refraction, holographic iridescence, and mouse-reactive effects.",
    category: "Hero Backgrounds",
    slug: "dither-prism-hero",
    isNew: true,
  },

  // Visual Effects
  "border-beam": {
    title: "Border Beam",
    description: "Animated beam of light traveling along the border.",
    category: "Visual Effects",
    slug: "border-beam",
  },
  "dither-gradient": {
    title: "Dither Gradient",
    description: "Gradient background with dithering noise.",
    category: "Visual Effects",
    slug: "dither-gradient",
  },
  "liquid-blob": {
    title: "Liquid Blob",
    description: "Animated liquid blob shape.",
    category: "Visual Effects",
    slug: "liquid-blob",
  },
  "magnet-lines": {
    title: "Magnet Lines",
    description: "Lines that react to cursor movement like a magnetic field.",
    category: "Visual Effects",
    slug: "magnet-lines",
  },
  "noise-texture": {
    title: "Noise Texture",
    description: "Subtle noise texture overlay.",
    category: "Visual Effects",
    slug: "noise-texture",
  },
  "particle-galaxy": {
    title: "Particle Galaxy",
    description: "Interactive 3D particle system resembling a galaxy.",
    category: "Visual Effects",
    slug: "particle-galaxy",
  },
  "pixel-canvas": {
    title: "Pixel Canvas",
    description: "Canvas where pixels react to interaction.",
    category: "Visual Effects",
    slug: "pixel-canvas",
  },
  "matrix-rain": {
    title: "Matrix Rain",
    description: "Classic Matrix digital rain effect.",
    category: "Visual Effects",
    slug: "matrix-rain",
  },
};

export function getComponent(slug: string) {
  return components[slug];
}
