"use client";

import { useEffect, useState } from "react";
import { useDialKitController } from "dialkit";
import {
  HoverTransition,
  hoverTransitionDirections,
  hoverTransitionEffects,
  type HoverTransitionDirection,
  type HoverTransitionEffect,
} from "@workspace/ui/components/hover-transition";
import { DocsPlayground, useLiveCode } from "@/components/docs-playground";

const PEOPLE = [
  {
    id: "tom",
    name: "Tom Mathews",
    role: "CEO",
    bio: "Leading the agency's mission to blend Indonesian creativity with cutting-edge AI automation that helps businesses work smarter and scale faster.",
    position: "0% 0%",
  },
  {
    id: "andrew",
    name: "Andrew Michel",
    role: "COO",
    bio: "Turning ambitious ideas into focused systems, strong teams, and repeatable operations that keep every project moving forward.",
    position: "33.333% 0%",
  },
  {
    id: "james",
    name: "James Smith",
    role: "CTO",
    bio: "Building reliable AI products that connect thoughtful engineering with simple, human-centered digital experiences.",
    position: "66.667% 0%",
  },
  {
    id: "marlen",
    name: "Marlen",
    role: "CMO",
    bio: "Shaping clear brand stories and campaigns that turn attention into lasting relationships between people and products.",
    position: "100% 0%",
  },
  {
    id: "sophie",
    name: "Sophie Laura",
    role: "Strategy Director",
    bio: "Finding the sharpest path through complex challenges and translating research into confident creative direction.",
    position: "0% 100%",
  },
  {
    id: "daniel",
    name: "Daniel Reed",
    role: "Product Director",
    bio: "Guiding products from first sketch to launch with a practical balance of customer insight, craft, and commercial impact.",
    position: "33.333% 100%",
  },
  {
    id: "amina",
    name: "Amina Yusuf",
    role: "Creative Director",
    bio: "Creating expressive visual systems where culture, technology, and meticulous art direction meet with purpose.",
    position: "66.667% 100%",
  },
  {
    id: "liam",
    name: "Liam Woods",
    role: "Studio Partner",
    bio: "Helping clients turn bold goals into enduring collaborations, measurable growth, and work the whole team is proud to share.",
    position: "100% 100%",
  },
] as const;

type Person = (typeof PEOPLE)[number];
type PersonId = Person["id"];

const EASINGS = {
  smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
  soft: "cubic-bezier(0.4, 0, 0.2, 1)",
  snappy: "cubic-bezier(0.16, 1, 0.3, 1)",
} as const;

type EasingName = keyof typeof EASINGS;

interface CardConfig {
  effect: HoverTransitionEffect;
  direction: HoverTransitionDirection;
  color: string;
}

const DEFAULT_CARDS: Record<PersonId, CardConfig> = {
  tom: { effect: "morph", direction: "center", color: "#dfff5f" },
  andrew: { effect: "diagonal", direction: "top-left", color: "#ff795f" },
  james: { effect: "strips", direction: "bottom", color: "#7c8cff" },
  marlen: { effect: "ripple", direction: "center", color: "#ff9bcb" },
  sophie: { effect: "curtain", direction: "top", color: "#56d6b0" },
  daniel: { effect: "slide", direction: "left", color: "#ffc857" },
  amina: { effect: "wipe", direction: "bottom-right", color: "#bba7ff" },
  liam: { effect: "parallax", direction: "top-right", color: "#62d6e8" },
};

/**
 * DialKit holds the selected card's settings; the other cards keep theirs in
 * local state. Picking a card (in the select or by clicking it) swaps them.
 */
const controls = {
  card: {
    type: "select" as const,
    options: PEOPLE.map((person) => ({ value: person.id, label: person.name })),
    default: "tom",
  },
  color: { type: "color" as const, default: DEFAULT_CARDS.tom.color },
  effect: {
    type: "select" as const,
    options: [...hoverTransitionEffects],
    default: DEFAULT_CARDS.tom.effect,
  },
  direction: {
    type: "select" as const,
    options: [...hoverTransitionDirections],
    default: DEFAULT_CARDS.tom.direction,
  },
  duration: [0.72, 0.15, 1.8, 0.05] as [number, number, number, number],
  easing: {
    type: "select" as const,
    options: Object.keys(EASINGS),
    default: "smooth",
  },
};

function generateCode(
  selectedCard: PersonId,
  card: CardConfig,
  timing: { duration: number; easing: EasingName },
) {
  const person = PEOPLE.find((item) => item.id === selectedCard)!;
  const initials = person.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return `"use client"

import { HoverTransition } from "@/components/ui/hover-transition"

function DefaultCard() {
  return (
    <article className="relative flex h-full flex-col justify-between overflow-hidden bg-[#ece9e1] p-6 text-[#151515]">
      <span className="text-xs font-medium uppercase tracking-[0.16em] text-black/50">
        ${person.role}
      </span>
      <div aria-hidden="true" className="absolute inset-0 grid place-items-center text-[9rem] font-semibold tracking-[-0.08em] text-black/[0.06]">
        ${initials}
      </div>
      <div className="relative">
        <h3 className="text-3xl font-medium tracking-[-0.05em]">${person.name}</h3>
        <p className="mt-1 text-sm text-black/55">Hover to meet the team.</p>
      </div>
    </article>
  )
}

function HoverCard() {
  return (
    <article className="flex h-full flex-col justify-between p-6 text-[#111]" style={{ backgroundColor: "${card.color}" }}>
      <p className="max-w-[24ch] text-xl font-medium leading-tight tracking-[-0.035em]">
        ${person.bio}
      </p>
      <div>
        <p className="font-semibold">${person.name}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.12em] text-black/55">
          ${person.role}
        </p>
      </div>
    </article>
  )
}

export default function HoverTransitionDemo() {
  return (
    <HoverTransition
      effect="${card.effect}"
      direction="${card.direction}"
      duration={${timing.duration}}
      easing="${EASINGS[timing.easing]}"
      defaultComponent={<DefaultCard />}
      hoverComponent={<HoverCard />}
      className="aspect-[4/5] w-full max-w-sm rounded-3xl"
    />
  )
}`;
}

function PortraitCard({
  person,
  effect,
}: {
  person: Person;
  effect: HoverTransitionEffect;
}) {
  return (
    <article
      className="relative h-full w-full overflow-hidden bg-[#f8f8f5] bg-[length:400%_200%] bg-no-repeat"
      style={{
        backgroundImage: "url('/images/hover-transition-team.jpg')",
        backgroundPosition: person.position,
      }}
    >
      <div className="absolute inset-x-0 bottom-0 px-[clamp(10px,5cqw,18px)] pb-[clamp(10px,5cqw,18px)] text-[#151515]">
        <p className="text-[clamp(14px,7cqw,24px)] font-medium leading-none tracking-[-0.04em]">
          {person.name}
        </p>
        <p className="mt-1 text-[clamp(9px,3.2cqw,12px)] uppercase leading-none tracking-[-0.02em] text-black/60">
          {person.role}
        </p>
      </div>
      <div className="absolute inset-x-[clamp(10px,5cqw,18px)] top-[clamp(10px,5cqw,18px)] flex justify-end font-mono text-[clamp(8px,3cqw,10px)] uppercase tracking-[0.08em] text-black/55">
        <span>{effect}</span>
      </div>
    </article>
  );
}

function PersonDetails({
  person,
  color,
  effect,
}: {
  person: Person;
  color: string;
  effect: HoverTransitionEffect;
}) {
  return (
    <article
      className="flex h-full w-full flex-col justify-between p-[clamp(12px,5cqw,22px)] text-[#111]"
      style={{
        backgroundColor: color,
        backgroundImage:
          "radial-gradient(circle at 85% 5%, rgba(255,255,255,.42), transparent 34%), linear-gradient(145deg, rgba(255,255,255,.12), transparent 58%)",
      }}
    >
      <div>
        <div className="flex translate-y-2 justify-end blur-[2px] opacity-0 transition-[transform,filter,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[active=true]/hover-card:translate-y-0 group-data-[active=true]/hover-card:blur-none group-data-[active=true]/hover-card:opacity-100 group-data-[active=true]/hover-card:delay-75 motion-reduce:translate-y-0 motion-reduce:blur-none motion-reduce:opacity-100 motion-reduce:transition-none font-mono text-[clamp(8px,3cqw,10px)] uppercase tracking-[0.1em] text-black/55">
          <span>{effect}</span>
        </div>
        <p className="mt-[clamp(14px,6cqw,28px)] max-w-[29ch] translate-y-3 blur-[3px] opacity-0 transition-[transform,filter,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[active=true]/hover-card:translate-y-0 group-data-[active=true]/hover-card:blur-none group-data-[active=true]/hover-card:opacity-100 group-data-[active=true]/hover-card:delay-100 motion-reduce:translate-y-0 motion-reduce:blur-none motion-reduce:opacity-100 motion-reduce:transition-none text-[clamp(12px,5.2cqw,19px)] font-medium leading-[1.18] tracking-[-0.035em]">
          {person.bio}
        </p>
      </div>
      <div className="translate-y-3 blur-[2px] opacity-0 transition-[transform,filter,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[active=true]/hover-card:translate-y-0 group-data-[active=true]/hover-card:blur-none group-data-[active=true]/hover-card:opacity-100 group-data-[active=true]/hover-card:delay-150 motion-reduce:translate-y-0 motion-reduce:blur-none motion-reduce:opacity-100 motion-reduce:transition-none">
        <p className="text-[clamp(12px,5cqw,17px)] font-semibold leading-none tracking-[-0.035em]">
          {person.name}
        </p>
        <p className="mt-1 text-[clamp(8px,3cqw,10px)] uppercase tracking-[0.08em] text-black/55">
          {person.role}
        </p>
      </div>
    </article>
  );
}


export function HoverTransitionPlayground() {
  const dial = useDialKitController("Hover Transition", controls, {
    id: "hover-transition",
  });
  const values = dial.values;
  const selected = values.card as PersonId;
  const effect = values.effect as HoverTransitionEffect;
  const direction = values.direction as HoverTransitionDirection;
  const color = values.color;
  const timing = {
    duration: values.duration,
    easing: values.easing as EasingName,
  };

  const [cards, setCards] = useState(DEFAULT_CARDS);
  // The card whose settings DialKit currently holds.
  const [syncedCard, setSyncedCard] = useState<PersonId>(selected);
  const live: CardConfig = { effect, direction, color };
  const shown = { ...cards, [syncedCard]: live };

  useEffect(() => {
    if (selected === syncedCard) return;
    // Save the outgoing card's settings, then load the new card's into DialKit.
    setCards((prev) => ({
      ...prev,
      [syncedCard]: { effect, direction, color },
    }));
    setSyncedCard(selected);
    dial.setValues(cards[selected]);
  }, [selected, syncedCard, effect, direction, color, cards, dial]);

  useLiveCode(generateCode(syncedCard, live, timing));

  return (
    <DocsPlayground className="flex min-h-[520px] items-center overflow-hidden py-8 [container-type:size] sm:py-12">
      <div
        className="flex w-full snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-smooth px-4 py-2 [scroll-padding-inline:1rem] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:gap-4 sm:px-6 sm:[scroll-padding-inline:1.5rem] lg:px-8 lg:[scroll-padding-inline:2rem]"
        aria-label="Team hover transitions"
      >
        {PEOPLE.map((person) => {
          const card = shown[person.id];
          return (
            <HoverTransition
              key={person.id}
              effect={card.effect}
              direction={card.direction}
              duration={timing.duration}
              easing={EASINGS[timing.easing]}
              label={`${person.name}, ${person.role}`}
              onClick={() => dial.setValues({ card: person.id })}
              defaultComponent={
                <PortraitCard person={person} effect={card.effect} />
              }
              hoverComponent={
                <PersonDetails
                  person={person}
                  color={card.color}
                  effect={card.effect}
                />
              }
              className="group/hover-card aspect-[.795] w-[clamp(260px,38cqw,390px)] shrink-0 snap-start rounded-[clamp(18px,2cqw,26px)] bg-[#f8f8f5] ring-1 ring-black/10 [container-type:inline-size] dark:ring-white/10"
            />
          );
        })}
      </div>
    </DocsPlayground>
  );
}
