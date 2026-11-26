import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";
import { Spiral3DSlider } from "@workspace/ui/components/spiral-3d-slider";

const slides = [
  {
    src: "/images/spiral-3d-slider/red-echo.jpg",
    alt: "Red fashion portrait swept through a long exposure",
  },
  {
    src: "/images/spiral-3d-slider/blue-profile.jpg",
    alt: "Profile illuminated by vivid blue motion trails",
  },
  {
    src: "/images/spiral-3d-slider/ghosted-portrait.jpg",
    alt: "Portrait fragmented by layered horizontal motion",
  },
  {
    src: "/images/spiral-3d-slider/teal-echo.jpg",
    alt: "Teal portrait captured with an expressive camera blur",
  },
  {
    src: "/images/spiral-3d-slider/camera-reflection.jpg",
    alt: "Monochrome photographer reflected through moving glass",
  },
  {
    src: "/images/spiral-3d-slider/orange-haze.jpg",
    alt: "Warm portrait dissolving through a soft orange exposure",
  },
  {
    src: "/images/spiral-3d-slider/blue-double.jpg",
    alt: "Blue studio portrait split into a double exposure",
  },
  {
    src: "/images/spiral-3d-slider/dark-glitch.jpg",
    alt: "Editorial portrait crossed by dark crimson light trails",
  },
  {
    src: "/images/spiral-3d-slider/red-blue-figure.jpg",
    alt: "Figure lit by saturated red and electric blue light",
  },
  {
    src: "/images/spiral-3d-slider/green-portrait.jpg",
    alt: "Shadowed portrait traced by muted green light",
  },
  {
    src: "/images/spiral-3d-slider/silver-motion.jpg",
    alt: "Silver portrait stretched into a quiet horizontal blur",
  },
  {
    src: "/images/spiral-3d-slider/crimson-profile.jpg",
    alt: "Crimson profile emerging from a green studio shadow",
  },
  {
    src: "/images/spiral-3d-slider/blue-motion.jpg",
    alt: "Blue portrait stretched through a long exposure",
  },
  {
    src: "/images/spiral-3d-slider/prism-portrait.jpg",
    alt: "Portrait washed in green light and a magenta prism haze",
  },
  {
    src: "/images/spiral-3d-slider/white-motion.jpg",
    alt: "White-clad figure swept into a luminous studio motion",
  },
  {
    src: "/images/spiral-3d-slider/visor-portrait.jpg",
    alt: "Portrait distorted through a translucent silver visor",
  },
];

const defaultCode = `import { Spiral3DSlider } from "@/components/ui/spiral-3d-slider"

const slides = [
  { src: "/images/gallery/photo-01.jpg", alt: "Describe the first image" },
  { src: "/images/gallery/photo-02.jpg", alt: "Describe the second image" },
]

<Spiral3DSlider items={slides} />`;

const usageCode = `"use client"

import {
  Spiral3DSlider,
  type Spiral3DSlide,
} from "@/components/ui/spiral-3d-slider"

// Add your own files to public/images/gallery, or use remote image URLs.
const slides: Spiral3DSlide[] = [
  { src: "/images/gallery/photo-01.jpg", alt: "Describe the first image" },
  { src: "/images/gallery/photo-02.jpg", alt: "Describe the second image" },
  { src: "/images/gallery/photo-03.jpg", alt: "Describe the third image" },
  { src: "/images/gallery/photo-04.jpg", alt: "Describe the fourth image" },
  { src: "/images/gallery/photo-05.jpg", alt: "Describe the fifth image" },
  { src: "https://example.com/photo-06.jpg", alt: "Remote images work too" },
]

export default function Gallery() {
  return (
    <Spiral3DSlider
      items={slides}
      autoRotate
      autoSpeed={0.13}
      className="min-h-[430px]"
    />
  )
}`;

export async function Spiral3DSliderDocs() {
  const sourceCode =
    (await readComponentSource("spiral-3d-slider")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Spiral 3D Slider"
      description="A compact, autoplaying image gallery that responds to scroll while flowing along a smooth 3D spiral."
      preview={
        <Spiral3DSlider
          items={slides}
          className="h-full min-h-0"
          ariaLabel="Cinematic editorial gallery"
        />
      }
      previewCode={defaultCode}
      installPackageName="spiral-3d-slider"
      installDependencies="@react-three/fiber three clsx tailwind-merge"
      installSourceCode={sourceCode}
      installSourceFilename="components/ui/spiral-3d-slider.tsx"
      usageCode={usageCode}
      usageNote={
        <p className="text-sm leading-6 text-muted-foreground">
          Replace the example paths with your own local files or remote image
          URLs. Every image should include meaningful alternative text.
        </p>
      }
      fullWidthPreview
      props={[
        {
          name: "items",
          type: "Spiral3DSlide[]",
          description: "Images arranged along the 3D spiral.",
        },
        {
          name: "radius",
          type: "number",
          default: "235",
          description: "Maximum horizontal radius of the spiral in pixels.",
        },
        {
          name: "verticalGap",
          type: "number",
          default: "64",
          description: "Vertical pitch between neighboring images.",
        },
        {
          name: "cardWidth",
          type: "number",
          default: "255",
          description: "Maximum width of each image plane in pixels.",
        },
        {
          name: "cardAspectRatio",
          type: "number",
          default: "1.5",
          description: "Width divided by height for every image plane.",
        },
        {
          name: "autoRotate",
          type: "boolean",
          default: "true",
          description: "Automatically advances the spiral while it is idle.",
        },
        {
          name: "autoSpeed",
          type: "number",
          default: "0.13",
          description: "Automatic movement measured in slides per second.",
        },
        {
          name: "scrollSensitivity",
          type: "number",
          default: "0.0024",
          description: "Amount of spiral movement produced by scrolling.",
        },
        {
          name: "smoothing",
          type: "number",
          default: "0.065",
          description: "Interpolation strength used for smooth movement.",
        },
        {
          name: "blurStrength",
          type: "number",
          default: "1.65",
          description: "Maximum blur applied as images move away from focus.",
        },
        {
          name: "bend",
          type: "number",
          default: "0.17",
          description:
            "Amount each segmented image plane curves into the spiral.",
        },
        {
          name: "fov",
          type: "number",
          default: "44",
          description: "Perspective camera field of view in degrees.",
        },
        {
          name: "ariaLabel",
          type: "string",
          default: '"Spiral image gallery"',
          description: "Accessible name for the gallery region.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional classes for the scene.",
        },
      ]}
    />
  );
}
