import React from "react";
import { OrbitCardStack } from "@workspace/ui/components/orbit-card-stack";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";

const defaultCode = `import { OrbitCardStack } from "@/components/ui/orbit-card-stack"

<OrbitCardStack />`;

const importCode = `"use client";

import { useState } from "react";
import {
  OrbitCardStack,
  type OrbitStackItem,
} from "@/components/ui/orbit-card-stack";`;

const usageCode = `const team: OrbitStackItem[] = [
  {
    name: "Mira Vale",
    role: "Creative Lead",
    description: "Shapes visual systems with restraint and edge.",
    initials: "MV",
    stat: "Identity",
    accent: "#f8d66d",
    image: "/team/mira-vale.png",
  },
  {
    name: "Noor Kade",
    role: "Product Strategy",
    description: "Turns loose ideas into crisp product moves.",
    initials: "NK",
    stat: "Roadmap",
    accent: "#78dcca",
    image: "/team/noor-kade.png",
  },
  {
    name: "Ari Chen",
    role: "Founder",
    description: "Keeps the team pointed at the same signal.",
    initials: "AC",
    stat: "Vision",
    accent: "#f3f1ea",
    image: "/team/ari-chen.png",
  },
];

export default function TeamPreview() {
  const [activeMember, setActiveMember] = useState(team[2]!);

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-medium text-muted-foreground">
          Currently viewing
        </p>
        <h2 className="text-2xl font-semibold">{activeMember.name}</h2>
      </div>

      <div className="h-[540px] w-full">
        <OrbitCardStack
          items={team}
          defaultActiveIndex={2}
          spread={150}
          lift={40}
          onActiveChange={(item) => setActiveMember(item)}
        />
      </div>
    </section>
  );
}`;

export async function OrbitCardStackDocs() {
  const sourceCode =
    (await readComponentSource("orbit-card-stack")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Orbit Card Stack"
      description="A premium interactive card stack that collapses into a tight deck, fans out on hover, and lifts the active card above the rest without changing its color or angle."
      preview={
        <OrbitCardStack />
      }
      previewCode={defaultCode}
      installPackageName="orbit-card-stack"
      installDependencies="framer-motion lucide-react clsx tailwind-merge"
      installSourceCode={sourceCode}
      installSourceFilename="components/ui/orbit-card-stack.tsx"
      importCode={importCode}
      usageCode={usageCode}
      fullWidthPreview
      props={[
        {
          name: "items",
          type: "OrbitStackItem[]",
          description:
            "Cards shown in the stack. Each item can include an `image` path.",
        },
        {
          name: "defaultActiveIndex",
          type: "number",
          default: "2",
          description:
            "Card that sits at the front when the stack is collapsed.",
        },
        {
          name: "spread",
          type: "number",
          default: "168",
          description: "Horizontal fan distance in pixels.",
        },
        {
          name: "lift",
          type: "number",
          default: "34",
          description: "Vertical lift for hovered cards in pixels.",
        },
        {
          name: "onActiveChange",
          type: "(item: OrbitStackItem, index: number) => void",
          description: "Callback fired when the active card changes.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes for the outer stage.",
        },
        {
          name: "cardClassName",
          type: "string",
          description: "Additional CSS classes for each card.",
        },
      ]}
    />
  );
}
