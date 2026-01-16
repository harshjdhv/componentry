import type React from "react"
import type { Metadata } from "next"
import { AuthModal } from "@workspace/ui/components/auth-modal"
import { InstallCommand } from "@/components/install-command"
import { CodeBlock } from "@/components/code-block"
import { ComponentLayout, Section } from "@/components/component-layout"

export const metadata: Metadata = {
    title: "Auth Modal",
    description: "A premium, animated authentication modal with social login options.",
}

const basicCode = `import { AuthModal } from "@/components/ui/auth-modal"

export function AuthModalDemo() {
  return (
    <div className="flex items-center justify-center">
      <AuthModal />
    </div>
  )
}`



export default function AuthModalPage(): React.JSX.Element {
    return (
        <ComponentLayout
            title="Auth Modal"
            description="A sleek, high-conversion authentication modal with social login providers and email support."
        >
            <Section title="Install">
                <InstallCommand component="auth-modal" />
            </Section>

            <Section title="Examples">
                <div className="space-y-12">
                    <div className="space-y-0">
                        <h3 className="text-xl font-medium mb-4">Basic Usage</h3>
                        <div className="flex h-[400px] w-full items-center justify-center rounded-t-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
                            <AuthModal />
                        </div>
                        <CodeBlock code={basicCode} lang="tsx" className="rounded-t-none border-t-0" />
                    </div>


                </div>
            </Section>

            <Section title="Props">
                <div className="grid grid-cols-1 divide-y border rounded-xl bg-muted/30">
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">triggerText</div>
                        <div className="text-sm text-muted-foreground">
                            Text on the trigger button (default: &quot;Sign up / Sign in&quot;)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">onLogin</div>
                        <div className="text-sm text-muted-foreground">
                            Callback when a provider is selected
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">className</div>
                        <div className="text-sm text-muted-foreground">
                            Additional CSS classes for the trigger button
                        </div>
                    </div>
                </div>
            </Section>
        </ComponentLayout>
    )
}
