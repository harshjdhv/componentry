import { DocsPageLayout } from "@/components/docs-page-layout";
import { ScrollTiltedGridPreview } from "@/components/docs/previews/scroll-tilted-grid-preview";
import { readComponentSource } from "@/lib/source-code";

const defaultCode = `import { ScrollTiltedGrid } from "@/components/ui/scroll-tilted-grid"

const images = [
  {
    src: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=85",
    alt: "Curved concrete facade in soft daylight",
  },
  {
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
    alt: "Sunlit modern interior with warm timber details",
  },
  {
    src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=85",
    alt: "Minimal white house framed by a clear sky",
  },
  {
    src: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=85",
    alt: "Quiet residential facade surrounded by trees",
  },
]

export default function Gallery() {
  return <ScrollTiltedGrid images={images} />
}`;

export async function ScrollTiltedGridDocs() {
  const sourceCode =
    (await readComponentSource("scroll-tilted-grid")) ||
    "Unable to load source code";

  return (
    <DocsPageLayout
      title="Scroll Tilted Grid"
      description="A cinematic two-column image gallery that tilts, softens, and resolves into focus as each frame crosses the viewport. Smooth scrolling and a reduced-motion fallback are built in."
      preview={
        <ScrollTiltedGridPreview
          src="/demo/scroll-tilted-grid"
          title="Scroll Tilted Grid Demo"
        />
      }
      previewCode={defaultCode}
      installPackageName="scroll-tilted-grid"
      installDependencies="framer-motion lenis clsx tailwind-merge"
      installSourceCode={sourceCode}
      installSourceFilename="components/ui/scroll-tilted-grid.tsx"
      usageCode={defaultCode}
      fullWidthPreview
      props={[
        {
          name: "images",
          type: "readonly ScrollTiltedGridImage[]",
          description:
            "Required images to render. Each item includes a src and descriptive alt text.",
        },
        {
          name: "loop",
          type: "boolean",
          default: "false",
          description:
            "Appends additional image cycles as the sentinel approaches.",
        },
        {
          name: "initialCycles",
          type: "number",
          default: "2",
          description:
            "Initial number of cycles rendered when looping is enabled.",
        },
        {
          name: "maxCycles",
          type: "number",
          default: "4",
          description: "Maximum number of cycles retained in the gallery.",
        },
        {
          name: "smoothScroll",
          type: "boolean",
          default: "true",
          description:
            "Enables Lenis smoothing. Disable when the app already owns a smooth-scroll provider.",
        },
        {
          name: "aspectRatio",
          type: "string",
          default: '"4 / 5"',
          description: "CSS aspect ratio used by every image frame.",
        },
        {
          name: "perspective",
          type: "number",
          default: "1000",
          description: "Perspective depth in pixels applied to each frame.",
        },
        {
          name: "maxTilt",
          type: "number",
          default: "62",
          description: "Maximum rotateX angle at the entry and exit positions.",
        },
        {
          name: "maxBlur",
          type: "number",
          default: "7",
          description:
            "Maximum blur in pixels away from the viewport focus point.",
        },
        {
          name: "rounded",
          type: "string",
          default: '"0.25rem"',
          description: "CSS border radius applied to every image frame.",
        },
        {
          name: "sectionPadding",
          type: "string",
          default: '"18vh"',
          description: "Top and bottom breathing room around the image grid.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional classes applied to the gallery section.",
        },
      ]}
    />
  );
}
