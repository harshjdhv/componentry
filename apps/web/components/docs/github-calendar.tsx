import React from "react";
import { GithubCalendar } from "@workspace/ui/components/github-calendar";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";

const basicUsageCode = `import { GithubCalendar } from "@/components/ui/github-calendar"

<GithubCalendar username="harshjdhv" />`;

const grayscaleCode = `import { GithubCalendar } from "@/components/ui/github-calendar"

<GithubCalendar username="harshjdhv" colorSchema="gray" />`;

const minimalCode = `import { GithubCalendar } from "@/components/ui/github-calendar"

<GithubCalendar username="harshjdhv" variant="minimal" colorSchema="blue" />`;

const colorSchemaCode = `import { GithubCalendar } from "@/components/ui/github-calendar"

<GithubCalendar username="harshjdhv" colorSchema="orange" />`;

export async function GithubCalendarDocs() {
  const sourceCode =
    (await readComponentSource("github-calendar")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Github Calendar"
      description="A premium, customizable visualization of GitHub contribution graphs with multiple color schemes and display variants."
      preview={
        <div className="flex items-center justify-center w-full p-4 md:p-8 overflow-hidden">
          <div className="scale-[0.65] md:scale-[0.85] origin-center">
            <GithubCalendar username="harshjdhv" />
          </div>
        </div>
      }
      previewCode={basicUsageCode}
      installPackageName="github-calendar"
      installDependencies="clsx tailwind-merge"
      installSourceCode={sourceCode}
      usageCode={basicUsageCode}
      examples={[
        {
          title: "Grayscale",
          preview: (
            <div className="flex items-center justify-center w-full p-4 md:p-8 overflow-hidden">
              <div className="scale-[0.65] md:scale-[0.85] origin-center">
                <GithubCalendar username="harshjdhv" colorSchema="gray" />
              </div>
            </div>
          ),
          code: grayscaleCode,
        },
        {
          title: "Minimal Variant",
          preview: (
            <div className="flex items-center justify-center w-full p-4 md:p-8 overflow-hidden">
              <div className="scale-[0.65] md:scale-[0.85] origin-center">
                <GithubCalendar
                  username="harshjdhv"
                  variant="minimal"
                  colorSchema="blue"
                />
              </div>
            </div>
          ),
          code: minimalCode,
        },
        {
          title: "Orange Color Schema",
          preview: (
            <div className="flex items-center justify-center w-full p-4 md:p-8 overflow-hidden">
              <div className="scale-[0.65] md:scale-[0.85] origin-center">
                <GithubCalendar
                  username="harshjdhv"
                  colorSchema="orange"
                  showTotal={false}
                />
              </div>
            </div>
          ),
          code: colorSchemaCode,
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
          name: "variant",
          type: '"default" | "city-lights" | "minimal"',
          default: '"default"',
          description: "The visual style variant of the calendar.",
        },
        {
          name: "colorSchema",
          type: '"green" | "blue" | "purple" | "orange" | "gray"',
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
