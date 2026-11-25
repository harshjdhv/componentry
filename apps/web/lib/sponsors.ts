/** Polar checkout for every sponsorship tier. */
export const sponsorHref =
  "https://polar.sh/checkout/polar_c_e9A0LLA2aX2Uh7lwbxLHFh0xQdgLgA49FO57w4NJpJN"

export const sponsorStats = [
  { value: "25k+", label: "Monthly visitors" },
  { value: "150k+", label: "Page views" },
  { value: "60+", label: "Free components" },
]

export type Sponsor = {
  name: string
  /** Monochrome logo (SVG works best); rendered as a mask so it follows the theme. */
  logo: string
  href: string
}

/**
 * Sponsors shown in the docs side column, by tier. Add an entry to fill a slot;
 * unfilled slots render as "Your logo here" and link to /sponsors.
 */
export const docsSponsors: { main: Sponsor[]; supporter: Sponsor[] } = {
  main: [],
  supporter: [],
}

export const docsSponsorSlots = { main: 1, supporter: 2 } as const
