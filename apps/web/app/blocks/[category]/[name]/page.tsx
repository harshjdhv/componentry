import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { BlockDisplay } from "@/components/blocks/block-display";
import {
  getAllBlockStaticParams,
  getAllBlocks,
  getBlockCategoryHref,
} from "@/lib/blocks/registry";
import categories from "@/registry/generated/block-categories.json";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllBlockStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const item = getAllBlocks().find((block) => block.name === name);

  if (!item) return {};

  return {
    title: `${item.title} Block | Componentry`,
    description: item.description,
  };
}

export default async function BlockDetailPage({
  params,
}: {
  params: Promise<{ category: string; name: string }>;
}) {
  const { category, name } = await params;
  const block = getAllBlocks().find(
    (item) => item.name === name && item.categories.includes(category),
  );
  const categoryItem = categories.find((item) => item.name === category);

  if (!block || !categoryItem) notFound();

  return (
    <>
      <section className="screen-line-bottom py-3">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href={`/blocks/${category}`}
            className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            {categoryItem.title}
          </Link>
          <Link
            href={getBlockCategoryHref(block)}
            className="text-sm text-muted-foreground transition hover:text-foreground"
          >
            #{block.name}
          </Link>
        </div>
      </section>
      <BlockDisplay name={block.name} />
    </>
  );
}
