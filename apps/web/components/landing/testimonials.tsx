"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const XIcon = () => (
  <svg className="size-3" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const DiscordIcon = () => (
  <svg className="size-3.5" viewBox="0 0 127.14 96.36" fill="currentColor">
    <path d="M107.7 8.07A105.15 105.15 0 0 0 81.47 0a72.06 72.06 0 0 0-3.36 6.83 97.68 97.68 0 0 0-29.11 0A72.37 72.37 0 0 0 45.64 0a105.89 105.89 0 0 0-26.25 8.09C2.79 32.65-1.71 56.6.54 80.21a105.73 105.73 0 0 0 32.17 16.15 77.7 77.7 0 0 0 6.89-11.11 68.42 68.42 0 0 1-10.85-5.18c.91-.66 1.8-1.34 2.66-2a75.57 75.57 0 0 0 64.32 0c.87.71 1.76 1.39 2.66 2a68.68 68.68 0 0 1-10.87 5.19 77 77 0 0 0 6.89 11.1 105.25 105.25 0 0 0 32.19-16.14c2.64-27.38-4.51-51.11-18.9-72.15ZM42.45 65.69C36.18 65.69 31 60 31 53s5-12.74 11.43-12.74S54 46 53.89 53s-5.05 12.69-11.44 12.69Zm42.24 0C78.41 65.69 73.25 60 73.25 53s5-12.74 11.44-12.74S96.23 46 96.12 53s-5.04 12.69-11.43 12.69Z" />
  </svg>
);

const VerifiedBadge = () => (
  <span className="flex text-info [&_svg]:size-3.5" aria-hidden>
    <svg viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M24 12a4.454 4.454 0 0 0-2.564-3.91 4.437 4.437 0 0 0-.948-4.578 4.436 4.436 0 0 0-4.577-.948A4.44 4.44 0 0 0 12 0a4.423 4.423 0 0 0-3.9 2.564 4.434 4.434 0 0 0-2.43-.178 4.425 4.425 0 0 0-2.158 1.126 4.42 4.42 0 0 0-1.12 2.156 4.42 4.42 0 0 0 .183 2.421A4.456 4.456 0 0 0 0 12a4.465 4.465 0 0 0 2.576 3.91 4.433 4.433 0 0 0 .936 4.577 4.459 4.459 0 0 0 4.577.95A4.454 4.454 0 0 0 12 24a4.439 4.439 0 0 0 3.91-2.563 4.26 4.26 0 0 0 5.526-5.526A4.453 4.453 0 0 0 24 12Zm-13.709 4.917-4.38-4.378 1.652-1.663 2.646 2.646L15.83 7.4l1.72 1.591-7.258 7.926Z"
      />
    </svg>
  </span>
);

type TestimonialSource = "x" | "discord";

interface Testimonial {
  quote: string;
  name: string;
  handle: string;
  initials: string;
  source: TestimonialSource;
  href?: string;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "very nice stuff!",
    name: "Pasquale Vitiello",
    handle: "@pacovitiello · Design Engineer @ Cal.com",
    initials: "PV",
    source: "x",
    avatar: "https://unavatar.io/x/pacovitiello",
    href: "https://x.com/pacovitiello/status/2012236042393280531?s=20",
  },
  {
    quote:
      "what is going on @shadcn? In just a few hours I've discovered a bunch of new shadcn libraries I had never seen before... componentry fun by @harshjdhv... I thought I'd caught them all!",
    name: "Ali Bey",
    handle: "@alibey_10",
    initials: "AB",
    source: "x",
    avatar: "https://unavatar.io/x/alibey_10",
    href: "https://x.com/alibey_10/status/2021668824978710994",
  },
  {
    quote:
      "updated my portfolio 404 page with @harshjdhv component. check out other components as well.",
    name: "Sahil",
    handle: "@sahilcodex",
    initials: "S",
    source: "x",
    avatar: "https://unavatar.io/x/sahilcodex",
    href: "https://x.com/sahilcodex/status/2073024534278734262",
  },
  {
    quote: "Top notch work.",
    name: "Mikhan",
    handle: "@mmikhan_",
    initials: "MK",
    source: "x",
    avatar: "https://unavatar.io/x/mmikhan_",
    href: "https://x.com/mmikhan_/status/2051626657731985898",
  },
  {
    quote:
      "particle typography — npx shadcn add @componentry/cursor-driven-particle-typography",
    name: "Ali Bey",
    handle: "@alibey_10",
    initials: "AB",
    source: "x",
    avatar: "https://unavatar.io/x/alibey_10",
  },
  {
    quote: "image ripple effect — another Componentry gem worth saving.",
    name: "Ali Bey",
    handle: "@alibey_10",
    initials: "AB",
    source: "x",
    avatar: "https://unavatar.io/x/alibey_10",
    href: "https://x.com/alibey_10/status/2035244381540618301",
  },
  {
    quote: "Congrats on the Vercel OSS program.",
    name: "Jalco",
    handle: "@jalcowastaken",
    initials: "J",
    source: "x",
    avatar: "https://unavatar.io/x/jalcowastaken",
    href: "https://x.com/jalcowastaken/status/2069298928772915391",
  },
  {
    quote:
      "love how it shows previews on hover in sidebar.. perfect enough spacing.. super clean",
    name: "Amitanshu Sahu",
    handle: "100xSchool Discord",
    initials: "AS",
    source: "discord",
  },
  {
    quote: "Loved it!! Great UI Library. Keep Building Man!!",
    name: "Tency テンシ",
    handle: "100xSchool Discord",
    initials: "T",
    source: "discord",
  },
  {
    quote: "you got a design eye @Harsh",
    name: "Community Member",
    handle: "100xSchool Discord",
    initials: "CM",
    source: "discord",
  },
];

function TestimonialCard({ item }: { item: Testimonial }) {
  const isX = item.source === "x";
  const content = (
    <div className="relative h-[188px] w-[330px] overflow-hidden rounded-xl bg-white/70 ring-1 ring-inset ring-black/[0.055] dark:bg-[#141414]/85 dark:ring-white/[0.07] sm:w-[360px]">
      <figure className="relative z-10 flex h-full flex-col">
        <blockquote className="grow px-4 py-3 text-[0.98rem] leading-6 text-pretty text-foreground">
          <p>&ldquo;{item.quote}&rdquo;</p>
        </blockquote>

        <figcaption className="grid grid-cols-[auto_1fr_auto] items-center gap-x-3.5 px-4 pb-3 pt-1">
          <div className="relative size-8 shrink-0">
            {item.avatar ? (
              <img
                className="size-8 select-none rounded-full object-cover"
                src={item.avatar}
                alt={item.name}
              />
            ) : (
              <div className="flex size-8 items-center justify-center rounded-full bg-zinc-100 text-[10px] font-bold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                {item.initials}
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-black/10 dark:ring-white/15" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-sm font-semibold leading-4.5 text-foreground">
              <span className="truncate">{item.name}</span>
              {isX && <VerifiedBadge />}
            </div>
            <div className="truncate text-xs leading-4 text-muted-foreground">
              {item.handle}
            </div>
          </div>

          <span
            className={cn(
              "self-start pt-0.5",
              isX
                ? "text-zinc-400 dark:text-zinc-500"
                : "text-indigo-400 dark:text-indigo-500",
            )}
          >
            {isX ? <XIcon /> : <DiscordIcon />}
          </span>
        </figcaption>
      </figure>
    </div>
  );

  if (!item.href) return content;

  return (
    <a href={item.href} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  );
}

function CarouselRow({
  items,
  direction = "left",
  duration = 38,
}: {
  items: Testimonial[];
  direction?: "left" | "right";
  duration?: number;
}) {
  let displayed = [...items];
  while (displayed.length < 10) displayed = [...displayed, ...items];

  const animation =
    direction === "left"
      ? "testimonial-marquee-left var(--testimonial-duration) linear infinite"
      : "testimonial-marquee-right var(--testimonial-duration) linear infinite";

  return (
    <div className="group/testimonial-row flex overflow-hidden [--testimonial-gap:0.5rem]">
      {[0, 1].map((clone) => (
        <div
          key={clone}
          aria-hidden={clone === 1}
          className="flex shrink-0 gap-[var(--testimonial-gap)] pr-[var(--testimonial-gap)] will-change-transform group-hover/testimonial-row:[animation-play-state:paused]"
          style={
            {
              "--testimonial-duration": `${duration}s`,
              animation,
              minWidth: "100%",
            } as React.CSSProperties
          }
        >
          {displayed.map((item, index) => (
            <TestimonialCard
              key={`${clone}-${item.name}-${index}`}
              item={item}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function Testimonials() {
  const topRow = testimonials.slice(0, 5);
  const bottomRow = testimonials.slice(5);

  return (
    <section className="w-full min-w-0 overflow-x-hidden pt-3 pb-24">
      <style>{`
        @keyframes testimonial-marquee-left {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-100%, 0, 0); }
        }

        @keyframes testimonial-marquee-right {
          from { transform: translate3d(-100%, 0, 0); }
          to { transform: translate3d(0, 0, 0); }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="mx-auto mb-7 max-w-[1360px] text-center"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
          Wall of love
        </p>
        <h2 className="text-balance text-3xl font-medium leading-[1.05] tracking-[-0.06em] text-zinc-950 dark:text-zinc-50 sm:text-4xl">
          Loved by builders with taste
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="relative flex flex-col gap-2 [mask-image:linear-gradient(to_right,transparent,black_2rem,black_calc(100%-2rem),transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_2rem,black_calc(100%-2rem),transparent)] sm:[mask-image:linear-gradient(to_right,transparent,black_5rem,black_calc(100%-5rem),transparent)] sm:[-webkit-mask-image:linear-gradient(to_right,transparent,black_5rem,black_calc(100%-5rem),transparent)]"
      >
        <CarouselRow items={topRow} direction="left" duration={42} />
        <CarouselRow items={bottomRow} direction="right" duration={36} />
      </motion.div>
    </section>
  );
}
