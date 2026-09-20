import { pageMetadata } from "@/lib/page-metadata";
import { ArrowUpRight } from "lucide-react";


export const dynamic = "force-static";

export const metadata = pageMetadata({
  title: "Pro Blocks",
  description: "A new library of production-ready blocks is coming soon to Componentry Pro.",
  path: "/blocks",
});

export default function BlocksPage() {
  return (
    <section className="relative flex min-h-[calc(100vh-3.5rem)] flex-col overflow-hidden">

      <div className="relative flex flex-1 items-center justify-center px-4 py-20 sm:px-8 sm:py-28">
        <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
          <p className="mb-5 text-sm font-medium tracking-tight text-muted-foreground">
            Componentry Pro
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-foreground sm:text-5xl md:text-6xl">
            A new home for Componentry blocks.
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
            A focused library of polished, production-ready blocks is coming
            soon to Componentry Pro.
          </p>

          <a
            href="https://pro.componentry.dev"
            className="mt-8 inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-foreground px-4 text-sm font-medium text-background transition-opacity duration-150 hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Visit Componentry Pro
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>

    </section>
  );
}
