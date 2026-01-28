import React from "react";
import { MagnetLinesDemo } from "@/components/docs/previews/magnet-lines-preview";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";

const basicUsageCode = `import { MagnetLines } from "@/components/ui/magnet-lines"

<MagnetLines 
  rows={9}
  columns={9}
  containerSize="60vmin"
  lineColor="currentColor"
  lineWidth="0.8vmin"
  lineHeight="5vmin"
  baseAngle={0}
/>`;

export async function MagnetLinesDocs() {
  const sourceCode =
    (await readComponentSource("magnet-lines")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Magnet Lines"
      description="A grid of lines that rotate to face the cursor, creating a magnetic field effect. Perfect for interactive backgrounds and hero sections."
      preview={<MagnetLinesDemo />}
      previewCode={basicUsageCode}
      installPackageName="magnet-lines"
      installDependencies="clsx tailwind-merge"
      installSourceCode={sourceCode}
      usageCode={basicUsageCode}
      fullWidthPreview={true}
      props={[
        {
          name: "rows",
          type: "number",
          default: "9",
          description: "Number of rows in the grid.",
        },
        {
          name: "columns",
          type: "number",
          default: "9",
          description: "Number of columns in the grid.",
        },
        {
          name: "containerSize",
          type: "string",
          default: '"80vmin"',
          description: "Size of the square container.",
        },
        {
          name: "lineColor",
          type: "string",
          default: '"#efefef"',
          description: "Color of the lines.",
        },
        {
          name: "lineWidth",
          type: "string",
          default: '"1vmin"',
          description: "Width (thickness) of each line.",
        },
        {
          name: "lineHeight",
          type: "string",
          default: '"6vmin"',
          description: "Height (length) of each line.",
        },
        {
          name: "baseAngle",
          type: "number",
          default: "0",
          description: "Base rotation angle for the lines.",
        },
      ]}
    />
  );
}
