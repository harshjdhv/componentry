import type { Metadata } from "next";
import { Fragment } from "react";
import { notFound } from "next/navigation";

import { BlockDisplay } from "@/components/blocks/block-display";
import { BlocksHeading } from "@/components/blocks/blocks-heading";
import { BlocksStripeDivider } from "@/components/blocks/blocks-list-decor";
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
      <div className="mx-auto w-full max-w-[1360px]">
        <BlocksHeading
          title={`${item.title} blocks.`}
          description={item.description}
        />
      </div>

      {blocks.map((block) => (
        <Fragment key={block.name}>
          <BlockDisplay name={block.name} />
          <BlocksStripeDivider />
        </Fragment>
      ))}
    </>
  );
}
