export function BlocksHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="px-4 py-12 md:px-3 lg:py-16">
      <h1 className="inline-block text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-foreground sm:text-4xl">
        {title}
      </h1>
      <p className="mt-1.5 max-w-2xl text-pretty text-sm font-medium tracking-tight text-muted-foreground sm:text-base">
        {description}
      </p>
    </section>
  );
}
