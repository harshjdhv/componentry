export interface ComponentGuideSection {
  title: string
  body: string
  href?: string
  linkLabel?: string
}

export interface ComponentGuide {
  title: string
  description: string
  heading?: string
  tone?: "guide" | "credit"
  sections: ComponentGuideSection[]
  related: string[]
}

// Editorial guidance is kept separate from installable component metadata.
export const componentGuides: Record<string, ComponentGuide> = {
  "signature": {
    "title": "React Signature Animation — SVG Handwriting Effect",
    "description": "Animate handwritten text in React with an SVG signature effect. Install with shadcn CLI and customize the font, text, color, and timing.",
    "sections": [
      {
        "title": "When to use it",
        "body": "Use Signature for a name, a short sign-off, or a handwritten accent. It generates SVG paths from text; it does not capture handwriting or sign a document."
      },
      {
        "title": "Font loading and timing",
        "body": "Serve LastoriaBoldRegular.otf from your public directory, or pass fontUrl for another font asset. If no font loads, the component has no paths to draw. Duration applies to each character, and characters start 0.2 seconds apart, so longer phrases take longer to finish."
      },
      {
        "title": "Playing on entry",
        "body": "Set inView to start when the SVG enters the viewport. With inView enabled, once controls whether it can animate on later entries. Keep a readable text equivalent when the name conveys essential information."
      }
    ],
    "related": [
      "text-morph",
      "kinetic-text-reveal",
      "annotated-text"
    ]
  },
  "sticky-scroll-cards": {
    "title": "React Stacking Cards on Scroll",
    "description": "Build a scroll-driven image card stack in React. Install Sticky Scroll Cards, supply your own images, and understand its page-scroll setup.",
    "sections": [
      {
        "title": "Using your own cards",
        "body": "Pass cards as an array of objects with title and src. Each title is used for the image alternative text and the visible caption, so describe the image rather than numbering the cards."
      },
      {
        "title": "Page layout",
        "body": "The component uses viewport-height sticky sections, page-scroll progress, and a Lenis root wrapper. Give it room in a scrolling page. If your application already manages smooth scrolling, adapt the copied source to share that instance rather than mounting competing roots."
      },
      {
        "title": "Reduced motion",
        "body": "The source checks the reduced-motion preference and removes the card scale and rotation transforms, as well as its Lenis wrapper. The images and captions remain in the scroll sequence."
      }
    ],
    "related": [
      "case-study-flip-stack",
      "scroll-tilted-grid",
      "scroll-split-card"
    ]
  },
  "webgl-liquid": {
    "title": "React WebGL Liquid Background",
    "description": "Create a flowing liquid shader background in React with configurable colors, motion, grain, and reveal timing. Preview and install WebGL Liquid.",
    "sections": [
      {
        "title": "Building a hero",
        "body": "Use colorDeep, colorMid, and colorHighlight to set the palette, then tune speed and flowStrength for movement. Check the foreground text against both the darkest and brightest frames."
      },
      {
        "title": "Reveal timing",
        "body": "delayMs is measured in milliseconds, while revealDuration is measured in seconds. Disable reveal when the section should appear immediately instead of waiting for an entrance."
      },
      {
        "title": "Graphics support",
        "body": "This component renders a WebGL canvas and has a fallback for WebGL initialization failure. Test the page on the devices you support; stacking several animated canvases can change performance."
      }
    ],
    "related": [
      "silk-aurora",
      "animated-gradient",
      "grain-gradient"
    ]
  },
  "collection-surfer": {
    "title": "React 3D Scrolling Gallery — Collection Surfer",
    "description": "Build a full-page React image gallery with a looping 3D scroll scene and magnetic, uplift, or simple interaction variants.",
    "sections": [
      {
        "title": "Prepare the collection",
        "body": "Provide a non-empty items array. Each entry has a numeric id, an image URL, and a title. The source duplicates the items to keep the visual sequence looping."
      },
      {
        "title": "Give the scene its own page",
        "body": "Collection Surfer uses a fixed viewport scene and a 50,000px scroll spacer. It is designed as a page-level experience; use a dedicated route or iframe when embedding it into documentation."
      },
      {
        "title": "Choose the pointer behavior",
        "body": "The simple variant skips the mouse-position updates used by the interactive variants. Review the source and test the chosen variant on touch devices before using it as the only way to browse important content."
      }
    ],
    "related": [
      "scroll-tilted-grid",
      "fisheye-infinite-grid",
      "infinite-image-field"
    ]
  },
  "eye-tracking": {
    "title": "React Eyes That Follow the Cursor",
    "description": "Add animated eyes that follow the cursor in React. Customize eye size, colors, pupil movement, blinking, and the visual style.",
    "sections": [
      {
        "title": "A decorative reaction",
        "body": "Use the eyes as a playful detail in a hero, empty state, or illustration. Keep instructions and important feedback in text rather than relying on eye movement."
      },
      {
        "title": "Tune the expression",
        "body": "eyeSize and gap set the proportions, while pupilRange limits how far pupils can move. Try the realistic, cartoon, minimal, and cyber variants against the surrounding interface."
      },
      {
        "title": "Blinking",
        "body": "blinkInterval is measured in milliseconds; set it to 0 to disable periodic blinking. Check pointer and touch behavior separately, and provide your own motion policy if the surrounding product requires one."
      }
    ],
    "related": [
      "magnet-lines",
      "text-repel",
      "dithered-logo"
    ]
  },
  "circuit-board": {
    "title": "React Animated Circuit Board Diagram",
    "description": "Create a circuit-style diagram in React with positioned nodes, connections, status indicators, and animated pulses.",
    "sections": [
      {
        "title": "Describe the graph",
        "body": "Give each node a unique id and x/y coordinates. Connections refer to those ids with from and to. Keep node labels concise and make sure each connection points to an existing node."
      },
      {
        "title": "Fit the diagram",
        "body": "width and height define the diagram dimensions. Plan node positions within those bounds, then test the diagram at the width where it will actually appear."
      },
      {
        "title": "Explain the meaning",
        "body": "Use labels or accompanying text to explain a workflow. Animated pulses and color alone should not be the only way a reader understands a connection or status."
      }
    ],
    "related": [
      "animated-gradient",
      "magnet-lines",
      "eye-tracking"
    ]
  },
  "scroll-tilted-grid": {
    "title": "React Scroll Animation — Tilted Image Grid",
    "description": "Build a perspective image gallery in React with scroll-driven tilt, blur, optional looping, and configurable smooth scrolling.",
    "sections": [
      {
        "title": "Supply meaningful images",
        "body": "Pass images as objects with src and alt. Use alternative text that describes each image and choose a consistent aspectRatio for the gallery."
      },
      {
        "title": "Control the effect",
        "body": "perspective, maxTilt, and maxBlur tune the visual treatment. Start with restrained values when the images need to remain easy to inspect while scrolling."
      },
      {
        "title": "Use one scroll owner",
        "body": "Set smoothScroll to false if the application already supplies its own smooth-scroll setup. For a finite gallery, disable loop. Check the gallery in the actual page rather than only inside a preview."
      }
    ],
    "related": [
      "sticky-scroll-cards",
      "collection-surfer",
      "fisheye-infinite-grid"
    ]
  },
  "image-ripple-effect": {
    "title": "React Image Ripple Effect",
    "description": "Add interactive WebGL image ripples in React with a React Three Fiber canvas. Explore the preview, installation, source, and customization props.",
    "sections": [
      {
        "title": "Choose the image source",
        "body": "Use images hosted by your app or a server that allows cross-origin texture loading. A URL opening in a browser tab does not by itself prove it can be loaded as a WebGL texture."
      },
      {
        "title": "Fit the canvas",
        "body": "Give the effect a visible container with a defined size. If the image does not appear, check the image request, browser console, and graphics support before adjusting ripple settings."
      },
      {
        "title": "Keep the image useful",
        "body": "Treat the ripple as a visual enhancement. Keep important descriptions and navigation in ordinary HTML, and verify the interaction on the touch devices your audience uses."
      }
    ],
    "related": [
      "dithered-logo",
      "image-trail",
      "pixel-image-trail"
    ]
  },
  "dithered-logo": {
    "title": "React Dithered Logo — Interactive Particle Effect",
    "description": "Turn a logo image into a dithered particle canvas in React, with cursor ripples and controls for sampling, contrast, and appearance.",
    "sections": [
      {
        "title": "Start with a clear asset",
        "body": "Choose a recognizable logo with enough contrast to survive conversion into dots. The source samples image pixels, so try the real asset before choosing final settings."
      },
      {
        "title": "Image access",
        "body": "Serve the image locally or configure the remote server for cross-origin image access. Canvas pixel sampling can fail on an image that loads visually but does not permit cross-origin reading."
      },
      {
        "title": "Preserve the identity",
        "body": "Keep the company or product name available as text outside the decorative canvas. Use the particle effect to accompany a recognizable identity, especially on touch devices."
      }
    ],
    "related": [
      "image-ripple-effect",
      "cursor-driven-particle-typography",
      "pixel-canvas"
    ]
  },
  "text-morph": {
    "title": "React Text Morph Animation",
    "description": "Animate transitions between words in React with a fluid text morph that inherits your typography. Customize phrases, interval, and morph duration.",
    "sections": [
      {
        "title": "Write the sequence",
        "body": "Pass a words array of short words or phrases. The component filters blank entries and falls back to its default sequence if there are no usable values."
      },
      {
        "title": "Timing and typography",
        "body": "interval controls the resting time and morphDuration controls the transition; both are measured in milliseconds. The component inherits typography, so set font size and weight on it or its surrounding element."
      },
      {
        "title": "Content fit",
        "body": "Try the longest phrase at the narrowest supported width. Keep essential meaning in a stable sentence so visitors do not have to wait for a rotating phrase to understand the page."
      }
    ],
    "related": [
      "flipping-word-swap",
      "kinetic-text-reveal",
      "signature"
    ]
  },
  "liquid-glass-carousel": {
    "title": "React Liquid Glass Carousel",
    "description": "An infinite image carousel with a WebGL liquid-glass lens.",
    "heading": "Inspired by",
    "tone": "credit",
    "sections": [
      {
        "title": "",
        "body": "The glass lens and snap-scrolling row are from",
        "href": "https://github.com/Yousuf-developer/liquid-glass-carousel",
        "linkLabel": "Yousuf Soomro"
      }
    ],
    "related": [
      "wheel-carousel",
      "image-ripple-effect",
      "fisheye-infinite-grid"
    ]
  }
}
