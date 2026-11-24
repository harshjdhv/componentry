# Reference research — UI library sites

Measured with Playwright (computed styles), not estimated from screenshots.
Captured 2026-11-25.

## paneloui.com — the owner's primary reference

**Home, 12,334px tall.** Inter throughout.
H1: 42px / 46px line height, weight 500, letter-spacing −1.4px (**−0.033em**). This is
exactly the value the Componentry features section already uses, which confirms the
reference was copied faithfully rather than approximated.
Card radius: 12px on white cards, hairline ring, no drop shadow.
Link distribution: 42 links to `/components`, 11 to `/blog`, 6 to `#pricing`.
So the home page's job is to funnel into the component catalogue, with a blog
feeding it from the side.

**/components, 10,983px tall.**
H1: 28px / 34px, 500, −0.7px (**−0.025em**) — noticeably looser than the 42px title,
which is the correct optical adjustment rather than a single global tracking value.
Catalogue cards: radius **18px**, background `#fcfcfc` (not pure white), hairline
edge. Grouped by category with counts beside each group heading:
"Dashboard Pages 13", "Profile Pages 2", "Login Pages 3", "Sidebars 2",
"Elements 2", "Charts 8". Every card carries a name and a Pro badge.

## reactbits.dev

Geist, not Inter. H1: 28.86px, 500, −1.04px.
Section order on home: **What's inside → See them in action → One command, and the
code is yours → Build the whole product → Five free tools → Sponsors → Loved by
developers → Questions, answered → closing CTA.**
The structure is worth copying as a *sequence*: capability grid, then proof by
motion, then install friction removed, then breadth, then third-party credibility,
then objection handling. 215+ components claimed in the first card.
Link distribution: 25 `/backgrounds`, 15 `/animations`, 14 `/tools` — category
hubs do the heavy lifting for discovery.

## ui.shadcn.com

Geist. H1: 30px / 36px, **weight 600**, −0.75px. Total page height **1,024px** —
a single viewport. No feature grid, no testimonials, no FAQ. It works because the
brand is already established; the page only has to route people to the docs.
**Not a model for a library that still needs to explain itself.**

## magicui.design

Geist-family. Hero positions it as "UI library for **Design Engineers**" — the
closest positioning to Componentry's audience. 150+ components claimed. Live
announcement bar for the newest component ("Introducing Dither Field"), which is
exactly the launch-cadence signal Componentry currently lacks. Social proof is
GitHub stars (23.5k) and Discord count (179) in the header.

## ui.aceternity.com

H1 is a value proposition, not a product name: "The React component library for
beautiful **landing pages**." Second section sells **templates** — a monetisation
path Componentry doesn't have. Component previews are animated clips.

## originui.com → coss.com/ui

originui now redirects into coss ui. Positioning: "A modern React UI component
library… powered by Base UI and styled with Tailwind CSS. **Designed for developers
and AI**, with source code you can make your own." Ships `llms.txt`, "Copy Markdown"
on docs pages, and an MCP-friendly posture — the same bet Componentry makes with
MCP, stated far more prominently.

## motion-primitives.com

The most restrained of the set. Four-line hero: value, what it is, licence model,
audience. Two CTAs. No feature grid above the fold. Proof is the library itself.

## What this means for Componentry

1. **The features section typography is correct.** −0.033em at 42px matches Panelo
   exactly. Keep it, and derive every other size from it rather than inventing new
   tracking values: roughly −0.025em at 28px, −0.02em at 20px.
2. **Catalogue cards want more radius than landing cards.** Panelo uses 12px on the
   home and 18px on the catalogue. Componentry currently uses one radius everywhere.
3. **Category groupings with counts** are how these sites make 50+ components feel
   navigable. Componentry's /docs is a flat list.
4. **Every serious library here shows the newest component in the header.** That is
   the cheapest possible cadence signal.
5. **No site in this set invents numbers.** Where they show social proof it is a
   live star count or a real Discord figure. Componentry must hold the same line.
6. **shadcn's one-screen home is not a model.** It is earned by brand, not design.
