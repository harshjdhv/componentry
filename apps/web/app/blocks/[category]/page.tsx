import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlockDisplay } from "@/components/blocks/block-display";
import { BlocksHeading } from "@/components/blocks/blocks-heading";
import { getAllBlocks } from "@/lib/blocks/registry";
import categories from "@/registry/generated/block-categories.json";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const item = categories.find((candidate) => candidate.name === category);

  if (!item) return {};

  return {
    title: `${item.title} Blocks | Componentry`,
    description: item.description,
  };
}

export default async function BlocksCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const item = categories.find((candidate) => candidate.name === category);

  if (!item) notFound();

  const blocks = getAllBlocks([category]);

  return (
    <>
      <div className="w-full">
        <BlocksHeading
          title={`${item.title} blocks.`}
          description={item.description}
        />
      </div>

      <div className="space-y-12">
        {blocks.map((block) => (
          <BlockDisplay key={block.name} name={block.name} />
        ))}
      </div>
    </>
  );
}
