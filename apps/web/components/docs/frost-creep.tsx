import { FrostCreep } from "@workspace/ui/components/frost-creep";

import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";

const usageCode = `import { FrostCreep } from "@/components/ui/frost-creep"

<div className="relative h-[520px] w-full overflow-hidden">
  <FrostCreep className="absolute inset-0" />
</div>`;

const slowCode = `import { FrostCreep } from "@/components/ui/frost-creep"

<FrostCreep speed={0.5} />`;

const fastCode = `import { FrostCreep } from "@/components/ui/frost-creep"

<FrostCreep speed={1.8} />`;

export async function FrostCreepDocs() {
  const sourceCode =
    (await readComponentSource("frost-creep")) || "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Frost Creep"
      description="Dendritic ice advancing from the edges of the pane — sharp at the frame, thinning toward the centre."
      preview={
        <div className="relative h-[420px] w-full overflow-hidden rounded-lg">
          <FrostCreep className="absolute inset-0" />
        </div>
      }
      previewCode={usageCode}
      installPackageName="frost-creep"
      installSourceCode={sourceCode}
      usageCode={usageCode}
      installationNote="The component renders a WebGL canvas that fills its container, so give the parent an explicit height. If WebGL is unavailable it renders nothing rather than throwing."
      examples={[
        {
          title: "Slow",
          code: slowCode,
          preview: (
            <div className="relative h-[240px] w-full overflow-hidden rounded-lg">
              <FrostCreep className="absolute inset-0" speed={0.5} />
            </div>
          ),
        },
        {
          title: "Fast",
          code: fastCode,
          preview: (
            <div className="relative h-[240px] w-full overflow-hidden rounded-lg">
              <FrostCreep className="absolute inset-0" speed={1.8} />
            </div>
          ),
        },
      ]}
      props={[
        {
          name: "speed",
          type: "number",
          default: "1",
          description: "Animation speed multiplier.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional styles. The canvas fills its parent, so set a height there.",
        },
      ]}
    />
  );
}
