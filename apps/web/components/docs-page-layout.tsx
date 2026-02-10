// apps/web/components/docs-page-layout.tsx
import type React from "react"
import Link from "next/link"
import { Suspense } from "react"
import { Search, ChevronRight, Copy, Terminal } from "lucide-react"
import { InstallCommand } from "@/components/install-command"
import { CodeBlock } from "@/components/code-block"
import { Section } from "@/components/component-layout"
import { InstallationTabs } from "@/components/installation-tabs"
import { PageContextMenu } from "@/components/page-context-menu"
import { ComponentPreview } from "@/components/component-preview"
import { CommandMenu } from "@/components/command-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

export interface PropItem {
  name: string
  type: string
  default?: string
  description: string
}

export interface ExampleItem {
  title: string
  preview: React.ReactNode
  code: string
  fullWidth?: boolean
}

export interface DocsPageLayoutProps {
  title: string
  description: string
  preview: React.ReactNode
  previewCode: string
  installPackageName: string
  installDependencies?: string
  installSourceCode?: string
  installSourceFilename?: string
  usageCode: string | React.ReactNode
  examples?: ExampleItem[]
  props?: PropItem[]
  action?: React.ReactNode
  fullWidthPreview?: boolean
  unstyledPreview?: boolean
}

function CodeBlockSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={`h-48 w-full bg-muted/20 rounded-xl border border-border animate-pulse ${className || ""}`}
    />
  )
}

export async function DocsPageLayout({
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
  unstyledPreview = false,
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
...
`

  return (
    <div className="flex flex-col lg:flex-row w-full h-full min-h-screen lg:h-screen bg-background text-foreground">
      
      {/* Left Column: Scrollable Content */}
      <div className="w-full lg:w-[45%] lg:min-w-[500px] h-full flex flex-col relative z-20">
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="p-8 lg:p-12 space-y-12 pb-24">
            
            {/* Minimal Nav Header / Breadcrumbs */}
             <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                <Link href="/docs" className="hover:text-foreground transition-colors">Components</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-foreground font-medium">{title}</span>
             </div>

            {/* Content Header */}
            <header className="space-y-8">
               <div className="space-y-4">
                  {/* Uppercase Label */}
                  <h1 className="text-sm font-mono uppercase tracking-widest text-muted-foreground/80">
                    {title}
                  </h1>
                  
                  {/* Big Description */}
                  <p className="text-3xl lg:text-4xl font-medium tracking-tight leading-tight text-foreground">
                    {description}
                  </p>
               </div>
               
               {/* Metadata / Dependencies */}
               <div className="space-y-6">
                  {installDependencies && (
                    <div className="space-y-3">
                       <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground/60 flex items-center gap-2">
                          Dependencies <Copy className="w-3 h-3" />
                       </h3>
                       <div className="flex flex-wrap gap-2">
                          {installDependencies.split(' ').map(dep => (
                            <div key={dep} className="px-2.5 py-1 rounded-full bg-muted/50 border border-border/50 text-xs font-mono text-foreground/80">
                               {dep}
                            </div>
                          ))}
                          {/* Always add framer-motion if implied */}
                          {!installDependencies.includes('framer-motion') && (
                              <div className="px-2.5 py-1 rounded-full bg-muted/50 border border-border/50 text-xs font-mono text-foreground/80">
                                  framer-motion
                              </div>
                          )}
                       </div>
                    </div>
                  )}

                  <div className="space-y-3">
                     <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground/60">
                        Interaction Type
                     </h3>
                     <p className="text-sm">
                        Scroll-driven animation
                     </p>
                  </div>
               </div>
            </header>

            {/* Installation */}
            <Section title="Installation">
              <InstallationTabs
                cliContent={<InstallCommand component={installPackageName} />}
                manualContent={
                  <div className="space-y-6">
                    {installSourceCode && (
                      <div className="space-y-3">
                        <p className="font-semibold text-sm">Copy source code</p>
                        <Suspense fallback={<CodeBlockSkeleton />}>
                          <CodeBlock
                            code={installSourceCode}
                            lang="tsx"
                            filename={installSourceFilename || `components/ui/${installPackageName}.tsx`}
                          />
                        </Suspense>
                      </div>
                    )}
                  </div>
                }
              />
            </Section>

            {/* Usage */}
             <Section title="Usage">
              <div className="space-y-4">
                 <Suspense fallback={<CodeBlockSkeleton />}>
                  {typeof usageCode === "string" ? (
                    <CodeBlock code={usageCode} lang="tsx" />
                  ) : (
                    usageCode
                  )}
                </Suspense>
              </div>
            </Section>

            {/* Props */}
            {props.length > 0 && (
              <Section title="Props">
                <div className="rounded-lg border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50 border-b">
                      <tr>
                        <th className="h-10 px-4 text-left font-medium text-muted-foreground w-1/4">Prop</th>
                        <th className="h-10 px-4 text-left font-medium text-muted-foreground w-1/4">Type</th>
                        <th className="h-10 px-4 text-left font-medium text-muted-foreground w-1/4">Default</th>
                        <th className="h-10 px-4 text-left font-medium text-muted-foreground">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {props.map((prop, i) => (
                        <tr key={i} className="hover:bg-muted/50 transition-colors">
                          <td className="p-4 font-mono font-semibold">{prop.name}</td>
                          <td className="p-4 font-mono text-muted-foreground break-all">{prop.type}</td>
                          <td className="p-4 font-mono text-muted-foreground">{prop.default || "-"}</td>
                          <td className="p-4 text-muted-foreground">{prop.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Section>
            )}

             {/* Examples */}
             {examples.length > 0 && (
                <Section title="Examples">
                  <div className="space-y-12">
                     {examples.map((ex, i) => (
                        <div key={i} className="space-y-4">
                           <h3 className="text-lg font-semibold">{ex.title}</h3>
                           <div className="border rounded-xl overflow-hidden bg-background">
                              <div className="p-8 flex justify-center bg-muted/20 min-h-[200px]">
                                {ex.preview}
                              </div>
                              <CodeBlock code={ex.code} lang="tsx" className="border-t rounded-t-none" />
                           </div>
                        </div>
                     ))}
                  </div>
                </Section>
             )}

            <div className="h-10" />
          </div>
        </div>
      </div>

      {/* Right Column: Sticky Preview */}
      <div className="flex-1 lg:h-full lg:sticky lg:top-0 order-first lg:order-last bg-background flex flex-col z-10">
        {/* We use a large padding to offset the card from the left side, mimicking the image */}
        <div className="relative w-full h-[400px] lg:h-full p-4 lg:p-2 lg:pl-0 overflow-hidden">
           
          {/* Floating Card Container */}
          <div className={cn(
             "relative w-full h-full rounded-2xl lg:rounded-[2rem] border border-border/50 shadow-2xl overflow-hidden bg-background flex flex-col",
             // "lg:ml-auto", // Push to right if needed, though w-full handles it
          )}>
               {/* Toolbar / Header of the preview card */}
               <div className="absolute top-6 right-6 z-20 flex gap-2">
                 <div className="bg-background/80 backdrop-blur-md border rounded-full px-2 py-1 flex items-center gap-1 shadow-sm">
                    <ThemeToggle />
                 </div>
               </div>
               
               {/* Content Area */}
               <div className={cn(
                 "w-full h-full overflow-auto flex bg-secondary/20", // Light contrasting bg
                 !fullWidthPreview && "items-center justify-center"
               )}>
                 <div className={cn(
                   "w-full",
                   fullWidthPreview ? "h-full" : "p-10 flex items-center justify-center"
                 )}>
                    {preview}
                 </div>
               </div>
          </div>

        </div>
      </div>
    </div>
  )
}
