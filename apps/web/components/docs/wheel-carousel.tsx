import React from "react";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { LiveCodeBlock } from "@/components/live-code-block";
import {
  WheelCarouselLandscapePreview,
  WheelCarouselPreview,
} from "@/components/docs/previews/wheel-carousel-preview";
import { readComponentSource } from "@/lib/source-code";

const defaultCode = `import { WheelCarousel } from "@/components/ui/wheel-carousel"

<div className="h-[560px] w-full">
  <WheelCarousel />
</div>`;

const usageCode = `import {
  WheelCarousel,
  type WheelCarouselItem,
} from "@/components/ui/wheel-carousel"

const projects: WheelCarouselItem[] = [
  {
    label: "Canyon House",
    image: "/images/projects/canyon-house.jpg",
    imageAlt: "Modern concrete home built into a desert canyon",
  },
  {
    label: "Harbor Loft",
    image: "/images/projects/harbor-loft.jpg",
    imageAlt: "Bright coastal loft with large windows",
  },
  {
    label: "Glass Pavilion",
    image: "/images/projects/glass-pavilion.jpg",
    imageAlt: "Minimal glass pavilion surrounded by trees",
  },
]

<div className="h-[560px] w-full">
  <WheelCarousel items={projects} />
</div>`;

const rightSideCode = `import { WheelCarousel } from "@/components/ui/wheel-carousel"

<div className="h-[560px] w-full">
  <WheelCarousel
    photoSide="right"
    photoAspect="4/3"
    photoWidth={30}
    contentWidth={760}
    gap={24}
    radius={260}
    spacing={13}
    visibleItems={6}
    photoRadius={16}
    edgeFade
  />
</div>`;

export async function WheelCarouselDocs() {
  const sourceCode =
    (await readComponentSource("wheel-carousel")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Wheel Carousel"
      description="A cinematic, rotating-wheel picker with inertial drag and scroll controls, curved fading labels, and a crossfading image for the active item."
      preview={<WheelCarouselPreview />}
      previewCode={defaultCode}
      installPackageName="wheel-carousel"
      installDependencies="framer-motion next-themes clsx tailwind-merge"
      installSourceCode={sourceCode}
      installSourceFilename="components/ui/wheel-carousel.tsx"
      usageCode={<LiveCodeBlock defaultCode={usageCode} />}
      fullWidthPreview
      examples={[
        {
          title: "Right-side landscape image",
          preview: <WheelCarouselLandscapePreview />,
          code: rightSideCode,
        },
      ]}
      props={[
        {
          name: "items",
          type: "WheelCarouselItem[]",
          default: "Built-in demo set",
          description:
            "Your own option names and photos. Each entry takes a label and an image URL, plus an optional imageAlt.",
        },
        {
          name: "mode",
          type: '"system" | "light" | "dark" | "custom"',
          default: '"system"',
          description: "Use automatic, fixed, or custom color behavior.",
        },
        {
          name: "photoSide",
          type: '"left" | "right"',
          default: '"left"',
          description: "Side of the wheel used for the active image.",
        },
        {
          name: "photoWidth",
          type: "number",
          default: "24",
          description: "Image column width as a percentage.",
        },
        {
          name: "photoAspect",
          type: '"3/4" | "1/1" | "4/3" | "3/2"',
          default: '"3/4"',
          description: "Aspect ratio of the active image.",
        },
        {
          name: "photoRadius",
          type: "number",
          default: "14",
          description: "Corner radius of the active image in pixels.",
        },
        {
          name: "contentWidth",
          type: "number",
          default: "900",
          description: "Maximum inner content width in pixels.",
        },
        {
          name: "gap",
          type: "number",
          default: "0",
          description: "Space between the image column and the wheel in pixels.",
        },
        {
          name: "radius",
          type: "number",
          default: "320",
          description: "Radius of the label wheel in pixels.",
        },
        {
          name: "spacing",
          type: "number",
          default: "14",
          description: "Angular spacing between labels in degrees.",
        },
        {
          name: "visibleItems",
          type: "number",
          default: "7",
          description:
            "Number of labels visible on either side of the selection.",
        },
        {
          name: "apexInset",
          type: "number",
          default: "34",
          description: "Horizontal position of the wheel's selection point.",
        },
        {
          name: "snap",
          type: "boolean",
          default: "true",
          description: "Settles the wheel on the nearest whole item.",
        },
        {
          name: "momentum",
          type: "boolean",
          default: "true",
          description: "Preserves drag and wheel velocity after input ends.",
        },
        {
          name: "appear",
          type: "boolean",
          default: "true",
          description: "Plays an entrance animation on mount.",
        },
        {
          name: "crossfadeDuration",
          type: "number",
          default: "0.5",
          description: "Duration in seconds of the active image crossfade.",
        },
        {
          name: "scrollSpeed",
          type: "number",
          default: "0.008",
          description: "Rotation per wheel delta pixel.",
        },
        {
          name: "dragSpeed",
          type: "number",
          default: "0.02",
          description: "Rotation per pointer pixel dragged.",
        },
        {
          name: "background",
          type: "string",
          default: '"rgb(255, 246, 236)"',
          description: 'Canvas color in "custom" mode.',
        },
        {
          name: "panelColor",
          type: "string",
          description:
            'Image placeholder color in "custom" mode. Defaults to background.',
        },
        {
          name: "textColor",
          type: "string",
          default: '"rgba(180, 90, 20, 0.45)"',
          description: 'Inactive label color in "custom" mode.',
        },
        {
          name: "selectedColor",
          type: "string",
          default: '"rgb(180, 84, 30)"',
          description: 'Active label color in "custom" mode.',
        },
        {
          name: "showMarker",
          type: "boolean",
          default: "true",
          description: "Shows the dot marking the selection point.",
        },
        {
          name: "markerColor",
          type: "string",
          default: '"rgb(232, 121, 46)"',
          description: 'Selection dot color in "custom" mode.',
        },
        {
          name: "markerSize",
          type: "number",
          default: "16",
          description: "Selection dot diameter in pixels.",
        },
        {
          name: "markerGap",
          type: "number",
          default: "20",
          description: "Distance between the selection dot and the labels.",
        },
        {
          name: "edgeFade",
          type: "boolean",
          default: "true",
          description: "Fades labels at the top and bottom edges.",
        },
        {
          name: "edgeFadeSize",
          type: "number",
          default: "30",
          description: "Size of the edge fade as a percentage.",
        },
        {
          name: "activeIndex",
          type: "number",
          description: "Controlled active item index.",
        },
        {
          name: "initialIndex",
          type: "number",
          default: "0",
          description: "Initially selected item in uncontrolled usage.",
        },
        {
          name: "onActiveChange",
          type: "(item: WheelCarouselItem, index: number) => void",
          description: "Runs whenever the active item changes.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional classes for the outer carousel.",
        },
        {
          name: "photoClassName",
          type: "string",
          description: "Additional classes for the active image frame.",
        },
        {
          name: "itemClassName",
          type: "string",
          description: "Additional classes for each wheel label.",
        },
      ]}
    />
  );
}
