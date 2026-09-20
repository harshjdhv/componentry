export interface ComponentCollection {
  slug: string
  title: string
  description: string
  guideHeading: string
  guide: string
  entries: { slug: string; heading: string; reason: string }[]
  question: string
  answer: string
}

export const componentCollections: ComponentCollection[] = [
  {
    "slug": "react-text-animations",
    "title": "React text animations",
    "description": "Choose a text effect for a headline, a changing phrase, or a handwritten sign-off. Compare live examples and install the React component you want to customize.",
    "guideHeading": "Choose by how the text changes",
    "guide": "Use a reveal when a phrase should appear once, a morph when the words themselves change, and handwriting for a short personal detail. Keep essential information readable independently of the animation.",
    "entries": [
      {
        "slug": "signature",
        "heading": "A handwritten sign-off",
        "reason": "Draw SVG text using a font asset. A good fit for a name or short sign-off; this displays text rather than collecting a signature."
      },
      {
        "slug": "text-morph",
        "heading": "A rotating phrase",
        "reason": "Blend between words while inheriting the surrounding typography. Keep phrases short enough for your narrowest layout."
      },
      {
        "slug": "kinetic-text-reveal",
        "heading": "An entrance for a headline",
        "reason": "Reveal a headline with coordinated motion. Choose this when the text stays the same after its entrance."
      },
      {
        "slug": "text-repel",
        "heading": "A pointer interaction",
        "reason": "Letters react to the nearby cursor. Use it as an optional detail around text that remains understandable without pointer movement."
      }
    ],
    "question": "Where should animated text live?",
    "answer": "Use animation sparingly in headings and short phrases. Keep long explanations in ordinary text, and verify the chosen effect with reduced motion enabled."
  },
  {
    "slug": "react-scroll-animations",
    "title": "React scroll animations",
    "description": "Explore stacking cards, perspective image grids, and full-page galleries driven by scrolling. Each example links to its React source, installation command, and API.",
    "guideHeading": "Choose the right scroll structure",
    "guide": "A card stack tells a sequential story, a tilted grid shows a collection, and a full-page gallery creates an immersive browsing experience. Decide how much page space the interaction should occupy before choosing an effect.",
    "entries": [
      {
        "slug": "sticky-scroll-cards",
        "heading": "A sequence of images",
        "reason": "Images pin and scale into a layered stack. This component uses page scrolling and includes its own smooth-scroll wrapper."
      },
      {
        "slug": "scroll-tilted-grid",
        "heading": "A gallery with perspective",
        "reason": "Images tilt as they move through the viewport. The smoothScroll option lets you avoid adding another Lenis root when your app already has one."
      },
      {
        "slug": "collection-surfer",
        "heading": "A dedicated gallery route",
        "reason": "A fixed 3D scene advances with page scroll. It reserves a long scroll area, so give it a dedicated route rather than a small card container."
      },
      {
        "slug": "case-study-flip-stack",
        "heading": "An editorial case-study sequence",
        "reason": "Cards fold upward to reveal the next story. Choose this when each item needs more editorial context than an image alone."
      }
    ],
    "question": "Why can sticky effects behave differently inside a layout?",
    "answer": "An ancestor with overflow can change the scrolling context used by sticky positioning. Check the component in the actual page layout, with its intended scroll space, before embedding it in a constrained panel."
  },
  {
    "slug": "react-animated-backgrounds",
    "title": "React animated backgrounds",
    "description": "Compare liquid fields, auroras, and gradients for React hero sections. Preview the visual treatment, then open the component docs for its controls and source.",
    "guideHeading": "Choose a background around your content",
    "guide": "Start with the text and actions the section must communicate. A liquid field brings visible movement; softer gradients and auroras can leave more room for the content. Check contrast across the full animation rather than one still frame.",
    "entries": [
      {
        "slug": "webgl-liquid",
        "heading": "A flowing liquid field",
        "reason": "A WebGL shader with controls for deep, mid, and highlight colors, speed, and flow strength. It includes a fallback when WebGL initialization fails."
      },
      {
        "slug": "silk-aurora",
        "heading": "A soft aurora treatment",
        "reason": "Layer an atmospheric aurora behind a hero. Compare the preview with your own heading length and foreground colors."
      },
      {
        "slug": "animated-gradient",
        "heading": "A moving gradient",
        "reason": "Use a gradient-led treatment when a section needs color and movement without a recognizable scene."
      },
      {
        "slug": "grain-gradient",
        "heading": "A textured color field",
        "reason": "A breathing field of color with film grain and soft shadows. Use the controls to tune texture to the surrounding page."
      }
    ],
    "question": "How should I check a background before shipping?",
    "answer": "Try it on a phone and a lower-powered device, inspect text contrast, and verify what happens when animation or graphics support is limited. Rendering technology and fallback behavior differ between components; a preview is not a performance guarantee."
  },
  {
    "slug": "react-image-effects",
    "title": "React image effects",
    "description": "Explore ripples, image trails, particle logos, and interactive grids. Compare the treatment that fits your images, then install and adapt the source.",
    "guideHeading": "Choose by what the image needs to do",
    "guide": "Use distortion to add texture to a prominent image, a trail to respond to movement, and a grid when visitors need to browse several images. Keep navigation and essential image content usable without hover.",
    "entries": [
      {
        "slug": "image-ripple-effect",
        "heading": "A ripple across an image",
        "reason": "A WebGL displacement effect built with React Three Fiber. Image textures hosted elsewhere need to permit cross-origin loading."
      },
      {
        "slug": "dithered-logo",
        "heading": "A logo made of particles",
        "reason": "Convert an image into a dithered canvas field with cursor ripples. Start with a clear image asset and tune the sampling controls."
      },
      {
        "slug": "image-trail",
        "heading": "Images following movement",
        "reason": "Use an image trail as an expressive pointer-driven detail. Keep important content available outside the interaction."
      },
      {
        "slug": "fisheye-infinite-grid",
        "heading": "An exploratory image grid",
        "reason": "Browse a field of images with a fisheye treatment. Choose a grid when the collection itself is the main attraction."
      }
    ],
    "question": "What image assets should I use?",
    "answer": "Use assets you are allowed to publish, sized for their actual display. For canvas and WebGL effects, verify cross-origin access or serve images from your own public directory. Test touch behavior separately from the desktop pointer preview."
  }
]

export function getComponentCollections(slug: string) {
  return componentCollections.filter((collection) => collection.entries.some((entry) => entry.slug === slug))
}
