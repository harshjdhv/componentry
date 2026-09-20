# Componentry search growth audit

Audit date: September 20, 2026. Scope: supplied Search Console screenshots, current local source, live HTTP/HTML checks, and a small search-result/competitor sample. No application code changed. This is a strategy and implementation specification, not a traffic forecast.

## Diagnosis

Componentry has brand discovery, but individual components account for little of the observed search traffic. The immediate opportunity is to make the existing components better answers to searches about specific visual effects, then connect them through useful collections.

From the supplied 28-day screenshots:

| Signal | Observation | Interpretation |
|---|---|---|
| Clicks | About 1,450, down 27% | Needs query-level comparison before attributing the decline |
| Impressions | About 13,000, up 90% | Visibility expanded; this alone does not prove better rankings |
| CTR / average position | 11.2% / 5.1 | Aggregates combine branded and non-branded searches |
| Homepage clicks | About 1,360, approximately 94% of total | Search acquisition is heavily concentrated on one page |
| Four obvious brand queries | 668 + 240 + 48 + 48 = 1,004 clicks | Roughly 69% of all clicks are explained by just four brand/typo queries |
| Indexing | 50 indexed, 25 not indexed | Need excluded URL examples and reasons; not every excluded URL should be indexed |
| Core Web Vitals | No data | Neither a pass nor a failure; field performance remains unmeasured here |

Using rounded totals and percentage changes, the previous period's aggregate CTR would have been approximately 29%. The current lower CTR could reflect broader non-brand exposure, weaker positions, reduced brand demand, or a changed query mix. Do not diagnose bad titles from aggregate CTR alone. The homepage decline and overall decline are similar, but causation needs the comparison export.

## Live technical findings

Checked all 54 sitemap URLs: homepage, docs, MCP, and 51 component pages. Every URL returned HTTP 200, had its own matching canonical, and lacked a robots noindex directive. A deliberately nonexistent component URL returned 404. These checks establish HTTP/HTML behavior, not Google's chosen canonical, rendered view, or actual indexing.

| Priority | Finding | Change and acceptance criteria |
|---|---|---|
| P0 | Live robots.txt blocks `/_next/` for wildcard, Googlebot, and Bingbot. Page scripts use `/_next/static/`. | Remove the broad asset block from `apps/web/app/robots.ts`. Verify CSS/JS URLs are crawlable and inspect Google's rendered HTML/resources after deployment. This is a confirmed configuration defect, not a proven cause of the click decline. |
| P1 | `/blocks`, `/sponsors`, `/privacy-policy`, and `/terms-of-service` inherit the homepage canonical. Several inherit homepage metadata; Blocks repeats the brand in its title. | Give distinct public pages intentional metadata and self-canonicals. Decide separately whether the Blocks teaser should be indexable. Do not canonicalize unrelated content to the homepage. Core component canonicals are already correct. |
| P1 | The sitemap assigns `new Date()` to every URL; all live entries share one timestamp. | Use meaningful per-page modification dates, or omit lastmod until those dates can be maintained accurately. Do not use new component publication dates as update dates. |
| P1 | `DocsPropItem.description` exists but `docs-props-table.tsx` does not render it. | Expose concise prop explanations in accessible HTML, e.g. under each prop name. Retain the compact layout; verify mobile readability. This improves documentation and makes existing knowledge available to readers and crawlers. |
| P1 | Sampled docs have an intro, installation, a minimal usage example, props, and previous/next navigation, but limited effect-specific explanation. | Enrich 8–10 proven/strategic component pages with real examples, troubleshooting, requirements, and relevant links. Keep demo/install prominent. |
| P2 | Root JSON-LD repeats a Home → Components breadcrumb on every page, including the homepage, and omits the actual component crumb. | Render breadcrumbs per route matching the visible hierarchy. Retain accurate source-code/entity schema without claiming special ranking benefits. |
| P2 | Root JSON-LD advertises `/docs?search=...`; inspected docs source has no query-string search handling. | Remove SearchAction unless the advertised URL is implemented and verified to show search results. |
| P2 | Demo routes have noindex but are also blocked by robots. Preview routes use the same broad blocking pattern. | If exclusion relies on noindex, let crawlers retrieve that directive. Review demo/preview route variants before changing rules; keep them out of the sitemap. |
| P3 | Five component pages have extra H1s from their previews. | Improve heading semantics in embedded demonstrations without degrading the component's standalone use. Multiple H1s are not evidence of a Google penalty. |

Relevant files: `apps/web/app/robots.ts`, `apps/web/app/sitemap.ts`, `apps/web/app/layout.tsx`, `apps/web/app/docs/components/[slug]/page.tsx`, `apps/web/components/seo/json-ld.tsx`, `apps/web/components/docs-props-table.tsx`, `apps/web/components/docs-page-layout.tsx`, and `apps/web/registry/index.ts`.

Preserve existing edits in docs/page.tsx, site-header.tsx, and registry/index.ts during implementation. No need for a homepage redesign to execute this plan.

## Search intent and existing pages

Candidate language below is based on component functionality and a limited search sample, not measured keyword volume. Validate against Search Console query/page data before choosing final wording. Keep the established URLs.

| Existing component | Search intent to investigate | Candidate title |
|---|---|---|
| Signature | Animated handwriting / signature text in React | React Signature Animation — SVG Handwriting Effect \| Componentry |
| Sticky Scroll Cards | Cards stacking and scaling on scroll | React Stacking Cards on Scroll \| Componentry |
| WebGL Liquid | Interactive liquid shader backgrounds | React WebGL Liquid Background \| Componentry |
| Scroll Tilted Grid | Scroll-driven perspective image grids | React Scroll Animation: Tilted Image Grid \| Componentry |
| Image Ripple Effect | Interactive image distortion/ripples | React Image Ripple Effect \| Componentry |
| Dithered Logo | Interactive logo particle effects | React Dithered Logo & Particle Effect \| Componentry |

Signature needs especially precise positioning: it animates text and should not target signature capture, signing documents, or signature-pad intent. Preserve expressive product names in the UI while adding clear functional wording in titles and introductory copy.

The first cohort should include WebGL Liquid, Sticky Scroll Cards, Signature, Collection Surfer, Eye Tracking, Circuit Board, and Scroll Tilted Grid because the supplied screenshots show some traction. Add Image Ripple Effect, Dithered Logo, and one text effect as strategic candidates; their demand is unverified.

## Programmatic SEO architecture

Use the Examples/Templates and Curation playbooks. The reusable data is Componentry's actual component implementations, examples, dependencies, props, and preview assets. Scale the publishing structure while reviewing the explanations for each component.

Start with four collections, expanding to six only where the inventory supports a useful selection:

| Proposed URL | Intent | Unique content required |
|---|---|---|
| `/collections/react-text-animations` | Compare text animation effects | Preview each effect; explain reveal, morph, handwriting, and cursor interaction use cases |
| `/collections/react-scroll-animations` | Find scroll-based effects | Compare stacks, grids, and transitions; explain page-height/container requirements |
| `/collections/react-animated-backgrounds` | Choose hero backgrounds | Explain visual differences, rendering technology, readability, and verified performance limitations |
| `/collections/react-image-effects` | Choose image interactions | Show ripple, trails, distortion, and grids with touch-behavior notes |
| `/collections/react-card-animations` | Choose card interactions | Publish only with enough distinctive examples and advice to differ from the scroll collection |
| `/collections/react-cursor-effects` | Find cursor-driven effects | Explain pointer requirements and actual mobile fallback behavior |

Create a collections index linked from `/docs`; link each collection to canonical component docs and link docs back to relevant collections. Add 3–5 genuinely related components based on behavior/use case, supplementing the existing category/alphabetical pagination. The homepage already contains crawlable component links, so this is an improvement in organization rather than an orphan-page rescue.

Do not publish React × Next.js × Tailwind × free × animated duplicates for each component. Cover compatible frameworks and installation on the existing component page. A separate guide is appropriate when it solves a different task with tested code.

Pilot guides after the first docs cohort:

- Building stacking cards on scroll in Next.js, using the existing component and real container setup.
- Animating SVG handwriting in React, including the font asset requirement.
- Choosing a React hero background, with original side-by-side demos and measured limitations where available.

Aceternity's React card collection provides a relevant competitive example: previews, explanations of interaction behavior, implementation advice, questions, and adjacent collections. React Bits and Motion also surface in the sampled effect queries. This is qualitative competition evidence, not a ranking report or backlink/authority comparison.

## Page templates and data contract

Component page order:

1. Functional title and a concise, specific explanation of what the effect does.
2. Live demo and installation command, retaining the existing emphasis.
3. A working usage example with realistic custom input.
4. Verified requirements: dependencies, required assets, client/server constraints, and framework setup.
5. Customization examples with rendered results and actual prop explanations.
6. Component-specific troubleshooting and limitations; state reduced-motion/touch support only after verifying source and behavior.
7. Related components and the appropriate collection.

Example Signature description proposal: “Animate handwritten text in React with an SVG signature effect. Preview the animation, install with shadcn CLI, and customize text, color, and timing.”

A Signature explanation should clarify that it displays animated text, identify the required font asset, show timing and replay examples, and describe actual font-loading behavior. Do not fill every component page with the same generic React FAQ.

Collection page order: clear H1, short selection guide, actual preview gallery with descriptive links, differences and tradeoffs, a small number of useful questions, and related collections. Use a title such as `React Text Animation Components | Componentry`; write each collection description around its real contents.

Extend the existing registry/content system with editorial fields such as `seoTitle`, `seoDescription`, `collectionIds`, `relatedSlugs`, and truthful `updatedAt`, plus typed guidance/examples appropriate to the existing docs structure. Derive installation/props/dependencies from existing sources where practical. Avoid a second drifting copy of technical facts.

Keep SoftwareSourceCode for component pages; use route-specific BreadcrumbList and, where appropriate, CollectionPage/ItemList for collections. Markup must reflect visible content. Schema correctness is not a guarantee of rich results or AI citations.

Before a new collection is indexable, require a distinct intent, substantive selection advice, working examples, crawlable links, self-canonical, and a sitemap entry. Do not create empty collections merely to fill the taxonomy. One sitemap is sufficient at this scale.

## GEO / AEO

Make Componentry easy to discover, understand, cite, and use. Treat AI search discovery and MCP-assisted installation as related but separately measurable channels.

The site already serves a registry-derived `/llms.txt`, offers MCP documentation, and has a Markdown builder for docs. These are existing capabilities, not missing growth features. The largest opportunity is improving the factual explanations they can expose.

Publish direct answers with runnable examples, accurate compatibility and dependencies, explicit limitations, clear authorship, and source links. Maintain consistent Componentry naming across the website, repository, registries, and relevant listings. Keep machine-readable content synchronized with visible documentation.

Google explicitly says its AI search features do not require special schema, AI text files, or separate technical optimizations beyond established search requirements. No guaranteed citation/ranking benefit is claimed for llms.txt, FAQs, extra schema, or any particular word count. Other answer engines require separate observation; this audit does not establish their current crawl behavior or citations.

Use original examples and genuinely useful tutorials as linkable material. Potential distribution work includes contextual deep links from the README, registry listings, creator demos, and real projects using the components. No outreach, submissions, or messages were sent in this audit; no backlink profile was measured.

## Execution and measurement

Suggested sequence; timing is a delivery plan, not a ranking promise:

| Stage | Deliverable | Verification |
|---|---|---|
| Week 1 | Crawl-rule fix, intentional metadata/canonicals, honest sitemap dates, schema cleanup | HTTP/HTML checks; Search Console rendered inspection after deployment; inspect excluded-page reasons |
| Week 2 | Shared prop explanations and 8–10 enriched component pages | Run examples; check generated HTML, links, mobile readability, and copy/installation flows |
| Weeks 3–4 | Four substantive collections and contextual related links | Review intent overlap, crawlability, unique value, canonical and sitemap inclusion |
| Weeks 4–8 | Two or three original guides; refine the initial cohort | Compare non-brand query/page cohorts over sufficient post-recrawl time; expand only where useful |

Primary measurement: non-branded organic discovery of component/collection pages and meaningful usage actions. Define installation-command copy, source-code copy, and MCP setup interaction as adoption proxies, not proof of a successful installation. Attribute events to landing page, component slug, and available referrer; verify event wiring before reporting conversions.

Separate brand and typo queries from non-brand queries. Track clicks, impressions, CTR, and position by query/page cohort, country, and device. Record publication/deployment dates and compare 28-day periods while considering launch spikes and recrawl lag. Rising non-brand impressions can initially lower aggregate CTR.

For AI discovery, track observable AI referrers and maintain a small repeatable prompt set with dated, linked citation observations. Answer variability and missing referrers limit those measures. Neither traffic nor citations are guaranteed.

Needed to finish evidence-based prioritization:

- Search Console Performance exports for the latest 3 months and a previous-period comparison, with Queries and Pages and all four metrics; use query-by-page breakdowns for promising pages.
- Page indexing exclusion reasons and example URLs, especially for desired component pages.
- Available organic landing-page conversion/referral data.
- Mobile performance measurements on homepage, docs, and representative heavy demos; the screenshots contain no field CWV data.

Prioritize pages with relevant non-brand impressions and positions near the first page, then inspect intent and competing results. No keyword search volumes, keyword difficulty scores, traffic multipliers, or exact recovery dates have been invented.

## Sources and limitations

- [Componentry homepage](https://componentry.dev/), [robots.txt](https://componentry.dev/robots.txt), [sitemap](https://componentry.dev/sitemap.xml), and [llms.txt](https://componentry.dev/llms.txt): fetched during this audit.
- [Signature documentation](https://componentry.dev/docs/components/signature) and [Sticky Scroll Cards documentation](https://componentry.dev/docs/components/sticky-scroll-cards): sampled content inspection.
- [Google JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics): crawlable rendering resources.
- [Google canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls): canonicalization background; findings above come from actual HTML.
- [Google sitemap modification guidance](https://developers.google.com/search/blog/2014/10/best-practices-for-xml-sitemaps-rssatom): meaningful modification timestamps.
- [Google noindex guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing): crawlers must be able to retrieve noindex.
- [Google AI features guidance](https://developers.google.com/search/docs/appearance/ai-features): eligibility, readable content, and no special AI markup requirement.
- [Aceternity React card collection](https://ui.aceternity.com/card), [React Bits](https://github.com/DavidHDev/react-bits), and [Motion scroll documentation](https://motion.dev/docs/react-scroll-animations): qualitative competitive sample.

The screenshots are a historical snapshot, not current authenticated Search Console access. This audit did not inspect Google's rendered pages, private analytics, Bing indexing, backlink quality, actual AI citation frequency, or field/lab performance. HTTP success and canonical correctness do not establish indexation or ranking.

## Implementation progress — September 20, 2026

Implemented locally after approval to start:

- Allowed rendering assets and demo/preview crawling; retained demo/preview noindex metadata.
- Removed synthetic sitemap modification dates.
- Added self-canonicals and page-specific social/search metadata to Blocks, Sponsors, Privacy, and Terms.
- Removed the unsupported SearchAction and global breadcrumb. Component docs and collections now render route-specific breadcrumbs.
- Exposed prop explanations and dependency lists in the shared docs layout.
- Added source-reviewed guidance, related component links, and descriptive search metadata for Signature, Sticky Scroll Cards, WebGL Liquid, Collection Surfer, Eye Tracking, Circuit Board, Scroll Tilted Grid, Image Ripple Effect, Dithered Logo, and Text Morph.
- Corrected Signature's font/timing documentation and added a custom-card usage example for Sticky Scroll Cards.
- Added `/collections` and four collection pages for text, scroll, backgrounds, and image effects. They use existing preview media, selection advice, component links, and CollectionPage/ItemList schema.
- Linked collections from docs, the footer, relevant component pages, the sitemap, and llms.txt. The Markdown builder includes component guidance and collection links.
- Added `scripts/check-seo.mjs`, run against a local production server, covering sitemap URLs, metadata, crawl rules, structured data, collection/component links, noindex routes, and 404s.

Validation: production build, web lint/type checks, registry generation checks and validation, and six regression tests passed. The production SEO smoke check covered all 59 sitemap URLs. Signature docs and the scroll collection were checked at 390px and 1440px in light and dark themes for overflow and navigation, with no page JavaScript errors. These are sampled browser checks, not an accessibility/performance certification of every existing component.

Remaining: deployment and Google's rendered/indexing verification; query-level Search Console prioritization; organic adoption-event attribution; original standalone tutorials; further coverage of the other component pages. Existing component preview heading semantics and legacy nested Blocks route metadata remain separate follow-ups. No commit, push, or deployment was performed.

Re-run the production SEO check:

```bash
pnpm --filter web build
pnpm --filter web exec next start -p 3000
# In a second terminal:
node scripts/check-seo.mjs
```

### Docs navigation refinement

Removed the added “Keep exploring” section from individual component docs and the “Explore collections by effect” link from `/docs` at the user's request. Component guidance, collection pages, footer discovery, sitemap entries, and llms.txt remain. The SEO check now verifies collection discovery through the homepage footer rather than requiring links in the docs experience.

The SEO check defaults to `http://localhost:3000`; no `.env` entry is required. To check a different running server, supply `SEO_BASE_URL` inline when running the script. This variable only selects the test target and does not change production canonical URLs.
