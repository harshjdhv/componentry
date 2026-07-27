"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

import categories from "@/registry/generated/block-categories.json";
import { cn } from "@/lib/utils";

export function BlocksNav() {
  const pathname = usePathname();
  const routeCategory = categories.find(
    (category) =>
      pathname === `/blocks/${category.name}` ||
      pathname.startsWith(`/blocks/${category.name}/`),
  )?.name;
  const [selectedCategory, setSelectedCategory] = React.useState(routeCategory);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    setSelectedCategory(routeCategory);
  }, [routeCategory]);

  return (
    <nav
      aria-label="Block categories"
      className="border-b border-line bg-background"
    >
      <div className="mx-auto w-full max-w-[1360px]">
        <motion.div
          layoutScroll
          className="no-scrollbar flex min-h-11 items-center justify-start gap-0.5 overflow-x-auto px-4 py-1.5 md:px-6 lg:justify-center"
        >
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/blocks/${category.name}`}
              aria-current={
                routeCategory === category.name ? "page" : undefined
              }
              onClick={() => setSelectedCategory(category.name)}
              className={cn(
                "relative isolate inline-flex h-8 shrink-0 items-center rounded-lg border border-transparent px-2.5 text-[13px] font-medium text-muted-foreground transition-colors duration-150 hover:bg-muted/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                selectedCategory === category.name && "text-foreground",
              )}
            >
              {selectedCategory === category.name && (
                <motion.span
                  layoutId="blocks-category-selection"
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-0 rounded-lg border border-line bg-muted/70 shadow-[inset_0_1px_0_rgb(255_255_255/0.06)]"
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { type: "spring", duration: 0.24, bounce: 0 }
                  }
                />
              )}
              <span className="relative z-10">{category.title}</span>
            </Link>
          ))}
        </motion.div>
      </div>
    </nav>
  );
}
