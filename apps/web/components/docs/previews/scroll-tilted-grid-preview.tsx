import { cn } from "@/lib/utils";

interface ScrollTiltedGridPreviewProps {
  src: string;
  title: string;
  className?: string;
}

export function ScrollTiltedGridPreview({
  src,
  title,
  className,
}: ScrollTiltedGridPreviewProps) {
  return (
    <div
      className={cn(
        "relative h-full min-h-[640px] w-full overflow-hidden",
        className,
      )}
    >
      <iframe
        src={src}
        title={title}
        loading="lazy"
        className="h-full w-full border-0 bg-transparent"
      />
    </div>
  );
}
