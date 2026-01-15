import type { Metadata } from "next";
import { MagnetLines } from "@workspace/ui/components/magnet-lines";
import { InstallCommand } from "@/components/install-command";
import { CodeBlock } from "@/components/code-block";
import { ComponentLayout, Section } from "@/components/component-layout";

export const metadata: Metadata = {
    title: "Magnet Lines",
    description: "A grid of lines that rotate to face the cursor, creating a magnetic field effect.",
    alternates: {
        canonical: "https://componentry.fun/docs/components/magnet-lines",
    },
};

const basicCode = `import { MagnetLines } from "@/components/ui/magnet-lines";

<MagnetLines 
  rows={9}
  columns={9}
  containerSize="60vmin"
  lineColor="currentColor"
  lineWidth="0.8vmin"
  lineHeight="5vmin"
  baseAngle={0}
/>`;

export default function MagnetLinesPage() {
    return (
        <ComponentLayout
            title="Magnet Lines"
            description="A grid of lines that rotate to face the cursor, creating a magnetic field effect."
        >
            <Section title="Install">
                <InstallCommand component="magnet-lines" />
            </Section>

            <Section title="Examples">
                <div className="space-y-12">
                    <div className="space-y-0">
                        <h3 className="text-xl font-medium mb-4">Basic</h3>
                        <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-xl bg-background border ring-1 ring-inset ring-border">
                            <MagnetLines
                                rows={9}
                                columns={9}
                                containerSize="60vmin"
                                lineColor="currentColor"
                                lineWidth="0.8vmin"
                                lineHeight="5vmin"
                                baseAngle={0}
                                className="text-foreground"
                            />
                        </div>
                        <CodeBlock code={basicCode} lang="tsx" className="rounded-t-none" />
                    </div>
                </div>
            </Section>

            <Section title="Props">
                <div className="grid grid-cols-1 divide-y border rounded-xl bg-muted/30">
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">rows</div>
                        <div className="text-sm text-muted-foreground">
                            Number of rows in the grid. Default: 9
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">columns</div>
                        <div className="text-sm text-muted-foreground">
                            Number of columns in the grid. Default: 9
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">containerSize</div>
                        <div className="text-sm text-muted-foreground">
                            Size of the square container. Default: &quot;80vmin&quot;
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">lineColor</div>
                        <div className="text-sm text-muted-foreground">
                            Color of the lines. Default: &quot;#efefef&quot;
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">lineWidth</div>
                        <div className="text-sm text-muted-foreground">
                            Width (thickness) of each line. Default: &quot;1vmin&quot;
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">lineHeight</div>
                        <div className="text-sm text-muted-foreground">
                            Height (length) of each line. Default: &quot;6vmin&quot;
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">baseAngle</div>
                        <div className="text-sm text-muted-foreground">
                            Base rotation angle for the lines. Default: 0
                        </div>
                    </div>
                </div>
            </Section>
        </ComponentLayout>
    );
}
