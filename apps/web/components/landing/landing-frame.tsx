import { cn } from "@/lib/utils";

/**
 * Shared page rail. Header, footer, and every route use this so the logo
 * and page content share one left/right edge.
 *
 * Below 1360px the inset is 1.5rem. Above that it centers a 1360px column
 * with viewport-based padding (so split docs columns can match the logo).
 */
export const landingGutterClass =
  "px-[max(1.5rem,calc((100vw-1360px)/2))]";
export const landingGutterLeftClass =
  "pl-[max(1.5rem,calc((100vw-1360px)/2))]";
export const landingGutterLeftOffsetClass =
  "left-[max(1.5rem,calc((100vw-1360px)/2))]";

export function LandingGutter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(landingGutterClass, "w-full min-w-0", className)}>
      {children}
    </div>
  );
}

export function LandingContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("w-full min-w-0", className)}>
      {children}
    </div>
  );
}
