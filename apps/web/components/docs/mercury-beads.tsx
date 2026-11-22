import { MercuryBeads } from "@workspace/ui/components/mercury-beads";

import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";

const usageCode = `import { MercuryBeads } from "@/components/ui/mercury-beads"

<div className="relative h-[520px] w-full overflow-hidden">
  <MercuryBeads className="absolute inset-0" />
</div>`;

const slowCode = `import { MercuryBeads } from "@/components/ui/mercury-beads"

<MercuryBeads speed={0.5} />`;

const fastCode = `import { MercuryBeads } from "@/components/ui/mercury-beads"

<MercuryBeads speed={1.8} />`;

export async function MercuryBeadsDocs() {
  const sourceCode =
    (await readComponentSource("mercury-beads")) || "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Mercury Beads"
      description="Liquid metal droplets drifting, merging and separating under a chrome-like light."
      preview={
        <div className="relative h-[420px] w-full overflow-hidden rounded-lg">
          <MercuryBeads className="absolute inset-0" />
        </div>
      }
      previewCode={usageCode}
      installPackageName="mercury-beads"
      installSourceCode={sourceCode}
      usageCode={usageCode}
      installationNote="The component renders a WebGL canvas that fills its container, so give the parent an explicit height. If WebGL is unavailable it renders nothing rather than throwing."
      examples={[
        {
          title: "Slow",
          code: slowCode,
          preview: (
            <div className="relative h-[240px] w-full overflow-hidden rounded-lg">
              <MercuryBeads className="absolute inset-0" speed={0.5} />
            </div>
          ),
        },
        {
          title: "Fast",
          code: fastCode,
          preview: (
            <div className="relative h-[240px] w-full overflow-hidden rounded-lg">
              <MercuryBeads className="absolute inset-0" speed={1.8} />
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
