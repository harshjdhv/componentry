import React from "react"
import { LayeredStack } from "@workspace/ui/components/layered-stack"
import { DocsPageLayout } from "@/components/docs-page-layout"
import { readComponentSource } from "@/lib/source-code"

const images = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=1200&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1514906689926-25ba6dcb584b?w=900&h=1200&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1568557412756-7d219873dd11?w=900&h=1200&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581892805885-73bdd91beff0?w=900&h=1200&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=900&h=1200&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1610846202780-b4d9837371ea?w=900&h=1200&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1527630941-4a229fd674ab?w=900&h=1200&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1603786420263-ad59136a7409?w=900&h=1200&q=85&auto=format&fit=crop",
];

const defaultCode = `import { LayeredStack } from "@/components/ui/layered-stack"

const images = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=1200&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1514906689926-25ba6dcb584b?w=900&h=1200&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1568557412756-7d219873dd11?w=900&h=1200&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581892805885-73bdd91beff0?w=900&h=1200&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=900&h=1200&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1610846202780-b4d9837371ea?w=900&h=1200&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1527630941-4a229fd674ab?w=900&h=1200&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1603786420263-ad59136a7409?w=900&h=1200&q=85&auto=format&fit=crop",
];

export const Demo = () => {
    return (
        <LayeredStack className="w-full max-w-[920px] grid grid-cols-4 gap-4 p-8">
            {images.map((img, i) => (
                <img key={i} src={img} alt={\`Scientific element \${i}\`} className="object-cover w-full aspect-[250/320] shadow-xl" />
            ))}
        </LayeredStack>
    );
};`

export async function LayeredStackDocs() {
  const sourceCode = (await readComponentSource("layered-stack")) || "// Unable to load source code"

  return (
    <DocsPageLayout
      title="Layered Stack"
      description="A stack of layered cards that reset and spring out on mouse interactions."
      
      preview={
        <div className="flex w-full min-h-[500px] items-center justify-center p-8">
            <LayeredStack className="w-full max-w-[920px] grid grid-cols-4 gap-4 p-8">
                {images.map((img, i) => (
                    <img key={i} src={img} alt={`Project ${i + 1}`} className="object-cover w-full aspect-[250/320] shadow-xl" />
                ))}
            </LayeredStack>
        </div>
      }
      previewCode={defaultCode}
      
      installPackageName="layered-stack"
      installDependencies="gsap"
      installSourceCode={sourceCode}
      installSourceFilename="components/ui/layered-stack.tsx"
      
      usageCode={defaultCode}
      
      props={[
        {
          name: "children",
          type: "ReactNode",
          description: "The layered items inside the stack.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes for styling.",
        },
      ]}
    />
  )
}
