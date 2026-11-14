import { pageMetadata } from "@/lib/page-metadata";

export const dynamic = "force-static";

export const metadata = pageMetadata({
  title: "Blocks — Coming Soon",
  description: "200+ ready-to-use blocks for your next project. Coming soon to Componentry.",
  path: "/blocks",
});

export default function BlocksPage() {
  return (
    <section className="relative flex min-h-[calc(100svh-3.5rem)] flex-col overflow-hidden">
      <div className="relative flex flex-1 items-center justify-center py-20 sm:py-28">
        <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
          <h1 className="text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-foreground sm:text-5xl md:text-6xl">
            200+ blocks coming soon.
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
            Ready-to-use blocks for your next project. We're working on them.
          </p>
          <a
            href="https://x.com/harshjdhv"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-foreground px-4 text-sm font-medium text-background transition-opacity duration-150 hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
          >
            <svg className="size-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Follow on X
          </a>
        </div>
      </div>
    </section>
  );
}
