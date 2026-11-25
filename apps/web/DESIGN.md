# Componentry design system

The rules the site follows. Written down so the next page does not have to
re-invent them. Values measured from paneloui.com and the existing features
section rather than guessed.

## Type

Inter for everything except code. `--font-sans` and `--font-display` both point
at one Inter loader; `--font-mono` is Geist Mono.

Tracking is *not* one global number — Inter needs more air as type gets smaller:

| role | size / line height | weight | tracking |
|---|---|---|---|
| display heading | 42 / 46 (32 / 36 on mobile) | 500 | −0.033em (−0.028em mobile) |
| section heading | 28 / 34 (24 / 30) | 500 | −0.025em (−0.022em) |
| card title | 15 / 22 | 500 | −0.01em |
| body / caption | 15 / 22 | 400 | normal |
| eyebrow | 11 / 16, uppercase | 500 mono | +0.14em |

Two-tone headings: the lead sentence in `zinc-950` / `zinc-50`, the continuation
in `neutral-500` / `neutral-400`. Never more than two tones.

These live in `apps/web/components/landing/type.ts` as `headingDisplay`,
`headingSection`, `headingMuted`, `bodyMuted`, `eyebrow`. Use them; do not
hand-write new sizes.

## Colour

Surfaces only, no decorative colour in chrome:

- page: white / `#0a0a0a`-equivalent dark
- card: white / `#161616`
- preview well: `#fafafa` / background
- hairlines: `rgb(10 10 10 / 0.055)` light, `rgb(255 255 255 / 0.07)` dark
- text: `zinc-950` / `zinc-50`, muted `neutral-500` / `neutral-400`

Colour belongs inside component previews, nowhere else.

## Cards

One recipe (`cardSurface` + `cardWell` in `type.ts`):

- 16px radius, 6px padding, white surface, **hairline ring as a shadow**, no
  drop shadow at rest.
- Inner preview well: 10px radius, `#fafafa`, inset hairline.
- Hover: `-translate-y-0.5` and a soft 18/48 shadow. Nothing else moves.
- Catalogue cards may use a slightly larger radius (18px) than landing cards,
  following Panelo.

## Motion

- Pressed buttons scale to 0.96; nothing else uses scale.
- Ease-out, under 300ms, cubic-bezier(0.23, 1, 0.32, 1).
- Animate transform and opacity only.
- Every animation respects `prefers-reduced-motion`.

## Layout

- Content rail 1360px; docs column pads 24/32/40px.
- 12-column grid, 12px gap for feature splits (7/5, 5/7).
- Section rhythm: 64–96px between sections, 24–32px between heading and body.

## Accessibility baseline

- One `<main>` per page, headings in order, no skipped levels.
- Visible focus ring on every interactive element; 40px minimum tap target.
- Decorative canvases are `aria-hidden`; interactive ones take focus and answer
  arrow keys.
- Never nested interactive elements — card links use a stretched pseudo-element
  rather than wrapping buttons in anchors.

## Known gaps

- Docs shell typography is aligned on `/docs` and component pages, but the legal,
  sponsors and collections pages still carry pre-redesign spacing.
- Component pages were not individually reviewed against these rules yet.
