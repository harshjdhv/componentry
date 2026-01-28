import type React from "react";
import { AuthModal } from "@workspace/ui/components/auth-modal";
import { DocsPageLayout } from "@/components/docs-page-layout"
import { readComponentSource } from "@/lib/source-code"

const basicCode = `import { AuthModal } from "@/components/ui/auth-modal"

export function AuthModalDemo() {
  return (
    <div className="flex items-center justify-center">
      <AuthModal />
    </div>
  )
}`;

export async function AuthModalDocs({ action }: { action?: React.ReactNode }) {
    const sourceCode = (await readComponentSource("auth-modal")) || "// Unable to load source code"

    return (
        <DocsPageLayout
            title="Auth Modal"
            description="An authentication modal with social login buttons and email form."
            action={action}
            preview={<AuthModal />}
            previewCode={basicCode}
            installPackageName="auth-modal"
            installDependencies="framer-motion clsx tailwind-merge lucide-react"
            installSourceCode={sourceCode}
            usageCode={basicCode}
            props={[
                {
                    name: "triggerText",
                    type: "string",
                    default: '"Sign up / Sign in"',
                    description: "Text on the trigger button.",
                },
                {
                    name: "onLogin",
                    type: "(provider: string) => void",
                    description: "Callback when a provider is selected.",
                },
                {
                    name: "className",
                    type: "string",
                    description: "Additional CSS classes for the trigger button.",
                },
            ]}
        />
    )
}
