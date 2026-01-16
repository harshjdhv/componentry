import * as React from "react"
import { GithubCalendar } from "@workspace/ui/components/github-calendar"
import { ComponentLayout, Section } from "@/components/component-layout"
import { InstallCommand } from "@/components/install-command"
import { CodeBlock } from "@/components/code-block"

export default function GithubCalendarPage() {
    return (
        <ComponentLayout
            title="Github Calendar"
            description="A premium, customizable visualization of GitHub contribution graphs."
        >
            <Section title="Install">
                <InstallCommand component="github-calendar" />
            </Section>

            <Section title="Examples">
                <div className="space-y-12">
                    {/* Default */}
                    <div className="space-y-4">
                        <div className="space-y-0">
                            <h3 className="text-xl font-medium mb-4">Default</h3>
                            <div className="p-8 bg-zinc-50 dark:bg-zinc-950 rounded-t-xl border flex flex-col items-center justify-center overflow-hidden">
                                <GithubCalendar username="harshjdhv" />
                            </div>
                            <CodeBlock
                                className="mt-0 rounded-t-none"
                                code={`import { GithubCalendar } from "@/components/ui/github-calendar"

<GithubCalendar username="harshjdhv" />`}
                                lang="tsx"
                            />
                        </div>
                    </div>

                    {/* Grayscale */}
                    <div className="space-y-4">
                        <div className="space-y-0">
                            <h3 className="text-xl font-medium mb-4">Grayscale</h3>
                            <div className="p-8 bg-zinc-50 dark:bg-zinc-950 rounded-t-xl border flex flex-col items-center justify-center overflow-hidden">
                                <GithubCalendar username="harshjdhv" colorSchema="gray" />
                            </div>
                            <CodeBlock
                                className="mt-0 rounded-t-none"
                                code={`import { GithubCalendar } from "@/components/ui/github-calendar"

<GithubCalendar username="harshjdhv" colorSchema="gray" />`}
                                lang="tsx"
                            />
                        </div>
                    </div>

                    {/* Minimal */}
                    <div className="space-y-4">
                        <div className="space-y-0">
                            <h3 className="text-xl font-medium mb-4">Minimal</h3>
                            <div className="p-8 bg-zinc-50 dark:bg-zinc-900 rounded-t-xl border flex flex-col items-center justify-center overflow-hidden">
                                <GithubCalendar username="harshjdhv" variant="minimal" colorSchema="blue" />
                            </div>
                            <CodeBlock
                                className="mt-0 rounded-t-none"
                                code={`import { GithubCalendar } from "@/components/ui/github-calendar"

<GithubCalendar username="harshjdhv" variant="minimal" colorSchema="blue" />`}
                                lang="tsx"
                            />
                        </div>
                    </div>

                    {/* Color Schema */}
                    <div className="space-y-4">
                        <div className="space-y-0">
                            <h3 className="text-xl font-medium mb-4">Color Schemas</h3>
                            <div className="p-8 bg-zinc-50 dark:bg-zinc-950 rounded-t-xl border flex flex-col items-center justify-center overflow-hidden gap-8">
                                <div className="w-full">
                                    <p className="mb-2 text-sm text-muted-foreground">Orange</p>
                                    <GithubCalendar username="harshjdhv" colorSchema="orange" showTotal={false} />
                                </div>
                            </div>
                            <CodeBlock
                                className="mt-0 rounded-t-none"
                                code={`import { GithubCalendar } from "@/components/ui/github-calendar"

<GithubCalendar username="harshjdhv" colorSchema="orange" />`}
                                lang="tsx"
                            />
                        </div>
                    </div>
                </div>
            </Section>

            <Section title="Props">
                <div className="grid grid-cols-1 divide-y border rounded-xl bg-muted/30">
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">username</div>
                        <div className="text-sm text-muted-foreground">The GitHub username to fetch contributions for. (Required)</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">variant</div>
                        <div className="text-sm text-muted-foreground">
                            Style variant: &quot;default&quot; | &quot;city-lights&quot; | &quot;minimal&quot;
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">colorSchema</div>
                        <div className="text-sm text-muted-foreground">
                            Color tint: &quot;green&quot; | &quot;blue&quot; | &quot;purple&quot; | &quot;orange&quot; | &quot;gray&quot;
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">showTotal</div>
                        <div className="text-sm text-muted-foreground">
                            Whether to show the total contributions count header. Default: true.
                        </div>
                    </div>
                </div>
            </Section>
        </ComponentLayout>
    )
}
