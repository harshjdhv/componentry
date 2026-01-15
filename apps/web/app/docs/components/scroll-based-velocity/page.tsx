import type { Metadata } from "next";
import { ScrollBasedVelocity } from "@workspace/ui/components/scroll-based-velocity";
import { InstallCommand } from "@/components/install-command";
import { CodeBlock } from "@/components/code-block";
import { ComponentLayout, Section } from "@/components/component-layout";

export const metadata: Metadata = {
    title: "Scroll Based Velocity",
    description: "Text that scrolls across the screen and speeds up based on the user's scroll velocity.",
    alternates: {
        canonical: "https://componentry.fun/docs/components/scroll-based-velocity",
    },
};

const basicCode = `import { ScrollBasedVelocity } from "@/components/ui/scroll-based-velocity";

<ScrollBasedVelocity
  text="Velocity Scroll"
  default_velocity={5}
  className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-foreground drop-shadow-sm md:text-7xl md:leading-[5rem]"
/>`;

export default function ScrollBasedVelocityPage() {
    return (
        <ComponentLayout
            title="Scroll Based Velocity"
            description="Text that scrolls across the screen and speeds up based on the user's scroll velocity."
        >
            <Section title="Install">
                <InstallCommand component="scroll-based-velocity" />
            </Section>

            <Section title="Examples">
                <div className="space-y-12">
                    <div className="space-y-0">
                        <h3 className="text-xl font-medium mb-4">Basic</h3>
                        <div className="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-background border ring-1 ring-inset ring-border">
                            <ScrollBasedVelocity
                                text="Velocity Scroll"
                                default_velocity={5}
                                className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-foreground drop-shadow-sm md:text-7xl md:leading-[5rem]"
                            />
                        </div>
                        <CodeBlock code={basicCode} lang="tsx" className="rounded-t-none" />
                    </div>
                </div>
            </Section>

            <Section title="Props">
                <div className="grid grid-cols-1 divide-y border rounded-xl bg-muted/30">
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">text</div>
                        <div className="text-sm text-muted-foreground">
                            The text to display and scroll. (required)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">default_velocity</div>
                        <div className="text-sm text-muted-foreground">
                            The base speed of the scrolling. Default: 5
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">className</div>
                        <div className="text-sm text-muted-foreground">
                            Classes to style the text element.
                        </div>
                    </div>
                </div>
            </Section>
        </ComponentLayout>
    );
}
