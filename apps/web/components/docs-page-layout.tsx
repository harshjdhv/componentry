"use client";

import type React from "react";
import { InstallCommand } from "@/components/install-command";
import { CodeBlock } from "@/components/code-block";
import { Section, ComponentLayout } from "@/components/component-layout";
import { InstallationTabs } from "@/components/installation-tabs";
import { PageContextMenu } from "@/components/page-context-menu";

import { ComponentPreview } from "@/components/component-preview";

export interface PropItem {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface ExampleItem {
  title: string;
  preview: React.ReactNode;
  code: string;
  /** If true, renders the preview without the ComponentPreview wrapper (for full-width components) */
  fullWidth?: boolean;
}

export interface DocsPageLayoutProps {
  title: string;
  description: string;

  /** The main component preview to be shown at the top */
  preview: React.ReactNode;
  /** The code for the main preview */
  previewCode: string;

  /** The name of the component for the CLI install command (e.g. "hyper-text") */
  installPackageName: string;
  /**
   * Manual installation: Dependencies to install
   * (e.g. "clsx tailwind-merge")
   */
  installDependencies?: string;
  /**
   * Manual installation: Source code to copy
   */
  installSourceCode?: string;
  /**
   * Manual installation: Filename for the source code
   * (e.g. "components/ui/hyper-text.tsx")
   */
  installSourceFilename?: string;

  /** Usage import code */
  usageCode: string;

  /** Additional examples */
  examples?: ExampleItem[];

  /** Props table data */
  props?: PropItem[];

  /** Action element (e.g. PageContextMenu) to be rendered in the header */
  action?: React.ReactNode;

  /** If true, renders the main preview without the ComponentPreview wrapper (for full-width components like CollectionSurfer) */
  fullWidthPreview?: boolean;
}

export function DocsPageLayout({
  title,
  description,
  preview,
  previewCode,
  installPackageName,
  installDependencies,
  installSourceCode,
  installSourceFilename,
  usageCode,
  examples = [],
  props = [],
  action,
  fullWidthPreview = false,
}: DocsPageLayoutProps) {
  // Generate the page context markdown automatically
  const pageContext = `
# ${title}

${description}

## Installation

### CLI
\`\`\`bash
npx shadcn@latest add "http://localhost:3000/r/${installPackageName}.json"
\`\`\`

### Manual
${
  installDependencies
    ? `1. Install dependencies
\`\`\`bash
npm install ${installDependencies}
\`\`\`
`
    : ""
}

${
  installSourceCode
    ? `${installDependencies ? "2" : "1"}. Copy source code
\`\`\`tsx
${installSourceCode}
\`\`\`
`
    : ""
}

## Usage
\`\`\`tsx
${usageCode}
\`\`\`

## Examples
${examples
  .map(
    (ex) => `
### ${ex.title}
\`\`\`tsx
${ex.code}
\`\`\`
`,
  )
  .join("\n")}
`;

  return (
    <ComponentLayout
      title={title}
      description={description}
      action={
        <div className="flex items-center gap-2">
          <PageContextMenu content={pageContext} />
          {action}
        </div>
      }
    >
      <div className="space-y-0">
        {fullWidthPreview ? (
          <div className="relative rounded-t-xl border border-border overflow-hidden">
            {preview}
          </div>
        ) : (
          <ComponentPreview>{preview}</ComponentPreview>
        )}
        <CodeBlock code={previewCode} lang="tsx" className="rounded-t-none" />
      </div>

      <Section title="Installation">
        <InstallationTabs
          cliContent={<InstallCommand component={installPackageName} />}
          manualContent={
            <div className="space-y-6">
              {installDependencies && (
                <div className="space-y-3">
                  <p className="text-base font-semibold">
                    1. Install dependencies
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Ensure you have the utility function{" "}
                    <code className="text-xs bg-muted px-1 py-0.5 rounded font-mono text-foreground">
                      cn
                    </code>{" "}
                    in{" "}
                    <code className="text-xs bg-muted px-1 py-0.5 rounded font-mono text-foreground">
                      lib/utils.ts
                    </code>
                  </p>
                  <CodeBlock
                    code={`npm install ${installDependencies}`}
                    lang="bash"
                  />
                </div>
              )}
              {installSourceCode && (
                <div className="space-y-3">
                  <p className="text-base font-semibold">
                    {installDependencies ? "2" : "1"}. Copy the source code
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Copy the following code to{" "}
                    <code className="text-xs bg-muted px-1 py-0.5 rounded font-mono text-foreground">
                      {installSourceFilename ||
                        `components/ui/${installPackageName}.tsx`}
                    </code>
                  </p>
                  <CodeBlock
                    code={installSourceCode}
                    lang="tsx"
                    filename={
                      installSourceFilename ||
                      `components/ui/${installPackageName}.tsx`
                    }
                  />
                </div>
              )}
            </div>
          }
        />
      </Section>

      <Section title="Usage">
        <CodeBlock code={usageCode} lang="tsx" />
      </Section>

      {examples.length > 0 && (
        <Section title="Examples">
          <div className="space-y-10">
            {examples.map((example, index) => (
              <div key={index} className="space-y-4">
                <h3 className="font-heading text-xl font-semibold tracking-tight">
                  {example.title}
                </h3>
                <div className="space-y-0">
                  {example.fullWidth ? (
                    <div className="relative rounded-t-xl border border-border overflow-hidden">
                      {example.preview}
                    </div>
                  ) : (
                    <ComponentPreview>{example.preview}</ComponentPreview>
                  )}
                  <CodeBlock
                    code={example.code}
                    lang="tsx"
                    className="rounded-t-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {props.length > 0 && (
        <Section title="Props">
          <div className="my-6 w-full overflow-y-auto rounded-lg border">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 w-[150px]">
                    Prop
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 w-[150px]">
                    Type
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 w-[150px]">
                    Default
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {props.map((prop, index) => (
                  <tr
                    key={index}
                    className="border-b transition-colors data-[state=selected]:bg-muted"
                  >
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-mono font-semibold text-foreground">
                      {prop.name}
                    </td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-mono text-muted-foreground">
                      {prop.type}
                    </td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-mono text-muted-foreground">
                      {prop.default || "-"}
                    </td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-muted-foreground">
                      {prop.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}
    </ComponentLayout>
  );
}
