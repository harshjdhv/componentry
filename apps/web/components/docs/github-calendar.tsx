import React from "react";
import { GithubCalendar } from "@workspace/ui/components/github-calendar";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";

const basicUsageCode = `import { GithubCalendar } from "@/components/ui/github-calendar"

<GithubCalendar username="harshjdhv" />`;

const grayscaleCode = `import { GithubCalendar } from "@/components/ui/github-calendar"

<GithubCalendar username="harshjdhv" colorSchema="gray" />`;

export async function GithubCalendarDocs() {
  const sourceCode =
    (await readComponentSource("github-calendar")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Github Calendar"
      description="A GitHub-style contribution calendar heatmap with a grayscale color scheme option."
      preview={
        <div className="flex items-center justify-center w-full p-4 md:p-8 overflow-hidden">
          <div className="scale-[0.55] md:scale-[0.7] origin-center">
            <GithubCalendar username="harshjdhv" />
          </div>
        </div>
      }
      previewCode={basicUsageCode}
      installPackageName="github-calendar"
      installDependencies="framer-motion clsx tailwind-merge"
      installSourceCode={sourceCode}
      usageCode={basicUsageCode}
      examples={[
        {
          title: "Grayscale",
          preview: (
            <div className="flex items-center justify-center w-full p-4 md:p-8 overflow-hidden">
              <div className="scale-[0.55] md:scale-[0.7] origin-center">
                <GithubCalendar username="harshjdhv" colorSchema="gray" />
              </div>
            </div>
          ),
          code: grayscaleCode,
        },
      ]}
      props={[
        {
          name: "username",
          type: "string",
          description:
            "The GitHub username to fetch contributions for. (Required)",
        },
        {
          name: "colorSchema",
          type: '"green" | "gray"',
          default: '"green"',
          description: "The color scheme for the contribution cells.",
        },
        {
          name: "showTotal",
          type: "boolean",
          default: "true",
          description: "Whether to show the total contributions count header.",
        },
      ]}
    />
  );
}
