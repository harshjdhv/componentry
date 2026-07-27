export function BlocksStripeDivider() {
  return (
    <div className="mx-auto w-full max-w-[1360px]">
      <div className="relative h-12 overflow-hidden border-t border-line bg-muted/25">
        <div className="diagonal-stripes absolute inset-x-0 top-px bottom-0 [--pattern-foreground:var(--color-line)]/70" />
      </div>
    </div>
  );
}

export function BlocksListFooter() {
  return (
    <div className="p-2">
      <div className="relative border border-line p-4">
        <p className="font-mono text-sm tracking-[0.08em] text-muted-foreground uppercase">
          More blocks on the way...
        </p>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          We are building this library as a living catalog, so the showcase will
          keep expanding with sharper layouts, richer commerce patterns, and
          cleaner application surfaces.
        </p>

        <div className="pointer-events-none *:absolute *:size-2 *:border *:border-line *:bg-background">
          <div className="-top-[4.5px] -left-[4.5px]" />
          <div className="-top-[4.5px] -right-[4.5px]" />
          <div className="-bottom-[4.5px] -left-[4.5px]" />
          <div className="-right-[4.5px] -bottom-[4.5px]" />
        </div>
      </div>
    </div>
  );
}
