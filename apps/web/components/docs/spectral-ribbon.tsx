import { SpectralRibbon } from "@workspace/ui/components/spectral-ribbon";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";

const usageCode = `import { SpectralRibbon } from "@/components/ui/spectral-ribbon"

<SpectralRibbon className="h-[560px] rounded-2xl" />`;

export async function SpectralRibbonDocs() {
  const sourceCode =
    (await readComponentSource("spectral-ribbon")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Spectral Ribbon"
      description="A soft spectral light ribbon on pure black — slow liquid motion and rainbow fringe."
      preview={
        <SpectralRibbon className="h-full w-full min-h-0" />
      }
      previewCode={usageCode}
      installPackageName="spectral-ribbon"
      installSourceCode={sourceCode}
      usageCode={usageCode}
      fullWidthPreview
      unstyledPreview
      props={[
        {
          name: "children",
          type: "ReactNode",
          description: "Content composed over the ribbon.",
        },
        {
          name: "speed",
          type: "number",
          default: "1",
          description: "Animation speed, 0 to 2. Zero freezes the frame.",
        },
        {
          name: "intensity",
          type: "number",
          default: "1",
          description: "Ribbon brightness, 0.25 to 2.",
        },
        {
          name: "thickness",
          type: "number",
          default: "1",
          description: "Ribbon thickness, 0.5 to 2.",
        },
        {
          name: "grain",
          type: "number",
          default: "0.45",
          description: "Film grain amount, 0 to 1.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional classes for the root container.",
        },
      ]}
    />
  );
}
