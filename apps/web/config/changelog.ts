/**
 * Changelog for /docs/changelog, newest first, one entry per month.
 *
 * Curated from the history of `main`: write what changed for someone using
 * Componentry, not the commit log. Reference components by `component` slug so
 * the page links to them and picks up their title from the registry; a slug
 * that's no longer in the registry renders as plain text.
 */

export type ChangeKind = "new" | "improved" | "fixed" | "removed"

export interface ChangelogChange {
  kind: ChangeKind
  /** Registry slug. When set, the component's title leads the line and links to its page. */
  component?: string
  /** Omit on a "new" component line to use the component's registry description. */
  text?: string
  /** GitHub handles of outside contributors to credit. */
  by?: string[]
}

export interface ChangelogEntry {
  /** Anchor id, e.g. "2026-11". */
  id: string
  /** First day of the month the entry covers (YYYY-MM-DD). */
  date: string
  title: string
  summary: string
  changes: ChangelogChange[]
}

export const changelog: ChangelogEntry[] = [
  {
    id: "2026-11",
    date: "2026-11-01",
    title: "A new home for the docs",
    summary:
      "The docs moved onto one continuous surface, with the component list, the page and a sponsor column side by side. Two components were retired, and the site got a round of fixes.",
    changes: [
      {
        kind: "new",
        text: "A docs layout with a persistent sidebar that keeps its scroll position as you move between components.",
      },
      {
        kind: "new",
        text: "An Introduction page, a catalog of every component at /docs/components, and this changelog.",
      },
      {
        kind: "improved",
        component: "heatmap-logo",
        text: "has a live playground: drag the dials and copy the resulting props.",
      },
      {
        kind: "improved",
        text: "All Personalize panels now use one shared playground, and the preview toolbar matches it.",
      },
      {
        kind: "improved",
        component: "magnetic-dock",
        text: "uses real macOS icons and moves the way the macOS Dock does.",
      },
      {
        kind: "improved",
        component: "animated-gradient",
        text: "has preset swatches in place of variant tabs.",
      },
      {
        kind: "improved",
        text: "Install commands and props tables use the new two-layer surface, and the 404 page is now a draggable puzzle you put back together.",
      },
      {
        kind: "fixed",
        component: "image-ripple-effect",
        text: "no longer flickers on startup.",
      },
      {
        kind: "fixed",
        component: "github-calendar",
        text: "stopped depending on a contributions API that had shut down.",
      },
      {
        kind: "fixed",
        component: "magnetic-dock",
        text: "no longer adds a stray tab stop inside each item, and its server-rendered styles are clean.",
        by: ["fromapoc"],
      },
      {
        kind: "fixed",
        component: "heatmap-logo",
        text: "blends into any background colour.",
      },
      {
        kind: "removed",
        text: "Grain Gradient and Split Flap Display. Their old pages redirect to Dither Gradient and Flipping Word Swap.",
        by: ["fromapoc"],
      },
    ],
  },
  {
    id: "2026-10",
    date: "2026-10-01",
    title: "Lens Clock and Heatmap Logo",
    summary: "Two new pieces: a clock that pans across a big dial, and a logo that glows like hot metal.",
    changes: [
      {
        kind: "new",
        component: "lens-clock",
      },
      {
        kind: "new",
        component: "heatmap-logo",
      },
    ],
  },
  {
    id: "2026-09",
    date: "2026-09-01",
    title: "Collections",
    summary:
      "Components can now be browsed by collection. Three new components shipped, along with a refreshed landing page and brand.",
    changes: [
      {
        kind: "new",
        text: "Collections: themed sets of components, each on its own page.",
      },
      {
        kind: "new",
        component: "liquid-glass-carousel",
      },
      {
        kind: "new",
        component: "spectral-ribbon",
      },
      {
        kind: "new",
        component: "annotated-text",
      },
      {
        kind: "improved",
        text: "A refreshed landing page, header and brand assets, and clearer registry install commands.",
      },
      {
        kind: "improved",
        text: "Hover previews in the floating docs sidebar animate with transforms, so they stay smooth.",
        by: ["Moamal-2000"],
      },
    ],
  },
  {
    id: "2026-08",
    date: "2026-08-01",
    title: "A summer of components",
    summary:
      "The biggest month for new components so far, many of them from contributors.",
    changes: [
      { kind: "new", component: "text-morph", by: ["sorkhademanthan"] },
      { kind: "new", component: "aurora-flow", by: ["sorkhademanthan"] },
      { kind: "new", component: "flipping-word-swap", by: ["Nirvik30"] },
      { kind: "new", component: "hover-transition", by: ["sorkhademanthan"] },
      { kind: "new", component: "spiral-3d-slider", by: ["Nirvik30"] },
      { kind: "new", component: "wheel-carousel", by: ["Nirvik30"] },
      { kind: "new", component: "newsletter-bookshelf" },
      { kind: "new", component: "pixel-image-trail" },
      { kind: "new", component: "fisheye-infinite-grid" },
      { kind: "new", component: "case-study-flip-stack" },
      {
        kind: "improved",
        component: "dithered-logo",
        text: "processes images better and handles its state more reliably.",
      },
    ],
  },
  {
    id: "2026-07",
    date: "2026-07-01",
    title: "Shaders and blocks",
    summary:
      "A run of WebGL effects, plus a reorganised blocks library with new pricing sections.",
    changes: [
      { kind: "new", component: "ripple-transition" },
      { kind: "new", component: "dithered-logo" },
      { kind: "new", component: "prism-gradient" },
      { kind: "new", component: "scroll-tilted-grid" },
      { kind: "new", component: "ascii-effect", by: ["Dixith-dev"] },
      { kind: "new", text: "Pricing blocks, and blocks regrouped into clearer categories." },
      { kind: "new", text: "Previous and next links at the bottom of every component page." },
      {
        kind: "fixed",
        text: "The showcase no longer grows taller forever on some screen sizes, and enabled buttons show a pointer cursor.",
        by: ["Moamal-2000"],
      },
    ],
  },
  {
    id: "2026-06",
    date: "2026-06-01",
    title: "Blocks, sponsors and new heroes",
    summary:
      "A blocks registry for larger page sections, a sponsors page, and new hero backgrounds.",
    changes: [
      { kind: "new", component: "kinetic-text-reveal" },
      { kind: "new", component: "orbit-card-stack" },
      { kind: "new", component: "silk-aurora" },
      { kind: "new", component: "liquid-chrome" },
      { kind: "new", text: "A blocks registry, starting with the Gradient Hero block." },
      { kind: "new", text: "A Sponsors page, plus Privacy Policy and Terms of Service pages." },
      {
        kind: "improved",
        text: "Darker, more consistent dark theme colours, and component cards that expand with details on hover.",
      },
      {
        kind: "fixed",
        text: "Long component names no longer get cut off.",
        by: ["Krishang-Zinzuwadia"],
      },
    ],
  },
  {
    id: "2026-05",
    date: "2026-05-01",
    title: "Docs layout, take two",
    summary:
      "A rebuilt docs sidebar and page structure, with props tables and copy-as-Markdown on every page.",
    changes: [
      { kind: "improved", text: "A new docs sidebar and soft fades at the edges where content scrolls." },
      { kind: "new", text: "Props tables on component pages." },
      { kind: "new", text: "Every docs page can be copied as Markdown or opened in an AI assistant." },
      { kind: "improved", text: "A cleaner landing page and a new install command layout." },
    ],
  },
  {
    id: "2026-04",
    date: "2026-04-01",
    title: "Scroll cards and a music player",
    summary: "Two more scroll-driven card layouts, a music player, and graceful handling when WebGL fails.",
    changes: [
      { kind: "new", component: "scroll-split-card" },
      { kind: "new", component: "sticky-scroll-cards" },
      { kind: "new", component: "music-player" },
      {
        kind: "improved",
        text: "WebGL components fall back gracefully when the browser can't create a WebGL context.",
      },
    ],
  },
  {
    id: "2026-03",
    date: "2026-03-01",
    title: "MCP and a wave of new components",
    summary:
      "The registry became usable from AI editors over MCP, installs moved to the @componentry namespace, and new components shipped every week.",
    changes: [
      { kind: "new", text: "An MCP guide for connecting the registry to your editor's assistant." },
      { kind: "improved", text: "Install commands use the namespaced form, e.g. @componentry/text-morph." },
      { kind: "new", text: "Generated Open Graph images for every component page." },
      { kind: "new", component: "cursor-driven-particle-typography" },
      { kind: "new", component: "animated-gradient" },
      { kind: "new", component: "image-trail" },
      { kind: "new", component: "mac-keyboard" },
      { kind: "new", component: "layered-stack" },
      { kind: "new", component: "signature" },
      { kind: "new", component: "image-ripple-effect" },
      { kind: "new", component: "infinite-image-field" },
      { kind: "new", component: "eye-tracking" },
    ],
  },
  {
    id: "2026-02",
    date: "2026-02-01",
    title: "A shadcn-compatible registry",
    summary:
      "Every component became installable with the shadcn CLI. The docs gained video previews, playgrounds and a new landing page.",
    changes: [
      { kind: "new", text: "A shadcn-compatible registry: install any component with the shadcn CLI and own the source." },
      { kind: "new", text: "Video previews for components, which play on hover in the docs and sidebar." },
      { kind: "new", text: "Personalize playgrounds that let you tune a component and copy the code." },
      { kind: "new", component: "dither-prism-hero" },
      { kind: "new", component: "webgl-liquid" },
      { kind: "new", component: "closing-plasma" },
      { kind: "new", component: "scroll-choreography" },
      { kind: "new", component: "text-repel" },
      { kind: "new", component: "letter-cascade" },
      { kind: "new", text: "\"New\" badges on recently added components, and a Blocks landing page." },
      { kind: "improved", text: "Faster docs: components load lazily and highlighted code is cached." },
    ],
  },
  {
    id: "2026-01",
    date: "2026-01-01",
    title: "Filling out the library",
    summary:
      "Componentry grew from a handful of demos into a library, with a central registry generating each docs page.",
    changes: [
      { kind: "new", component: "circuit-board" },
      { kind: "new", component: "dither-gradient" },
      { kind: "new", component: "magnetic-dock" },
      { kind: "new", component: "hero-geometric" },
      { kind: "new", component: "scroll-based-velocity" },
      { kind: "new", component: "magnet-lines" },
      { kind: "new", component: "github-calendar" },
      { kind: "new", component: "collection-surfer" },
      { kind: "new", component: "pixel-canvas" },
      { kind: "new", component: "matrix-rain" },
      { kind: "new", text: "A central registry that generates every docs page and the navigation." },
      { kind: "new", text: "llms.txt for AI tools, and a page menu to copy a page or open it in an assistant." },
      { kind: "improved", text: "Sitemap, robots.txt and structured data for search engines." },
    ],
  },
  {
    id: "2025-12",
    date: "2025-12-01",
    title: "Componentry launches",
    summary:
      "The first version went live on 24 December: a docs site with search, syntax-highlighted code and the first components.",
    changes: [
      { kind: "new", component: "flight-status-card" },
      { kind: "new", text: "Docs with a sidebar, a table of contents and a ⌘K command menu to search." },
      { kind: "new", text: "Code blocks highlighted with Shiki, with line numbers and a copy button." },
    ],
  },
]
