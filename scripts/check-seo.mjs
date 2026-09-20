import assert from "node:assert/strict"
import { chromium } from "playwright"

// Run with: node scripts/check-seo.mjs
// Override the target when needed: SEO_BASE_URL=http://localhost:3100 node scripts/check-seo.mjs
const base = process.env.SEO_BASE_URL || "http://localhost:3000"
const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || "chrome", headless: true })
try {
  const page = await browser.newPage()
  async function get(path) {
    const response = await fetch(new URL(path, base))
    assert.equal(response.status, 200, `${path}: HTTP status`)
    return response.text()
  }
  async function parse(path) {
    const html = await get(path)
    return page.evaluate((text) => {
      const doc = new DOMParser().parseFromString(text, "text/html")
      const readable = doc.body.cloneNode(true)
      readable.querySelectorAll("script, style").forEach((element) => element.remove())
      return {
        title: doc.title,
        canonical: doc.querySelector('link[rel="canonical"]')?.getAttribute("href"),
        robots: doc.querySelector('meta[name="robots"]')?.getAttribute("content"),
        description: doc.querySelector('meta[name="description"]')?.getAttribute("content"),
        schemas: [...doc.querySelectorAll('script[type="application/ld+json"]')].map((el) => JSON.parse(el.textContent)),
        links: [...doc.querySelectorAll("a[href]")].map((el) => el.getAttribute("href")),
        text: readable.textContent,
      }
    }, html)
  }
  const robots = await get("/robots.txt")
  assert(!/Disallow: \/(?:_next|demo|preview)/.test(robots), "rendering assets and noindex routes must be crawlable")
  const sitemap = await get("/sitemap.xml")
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])
  assert.equal(new Set(urls).size, urls.length, "unique sitemap URLs")
  assert(!sitemap.includes("<lastmod>"), "do not manufacture modification dates")
  assert.equal(urls.filter((url) => url.includes("/collections/")).length, 4)
  const pages = new Map()
  for (const url of urls) {
    const path = new URL(url).pathname
    const result = await parse(path)
    assert.equal(result.canonical, url, `${path}: self-canonical`)
    assert(!result.robots?.includes("noindex"), `${path}: indexable`)
    assert(result.title && result.description, `${path}: metadata`)
    assert(!JSON.stringify(result.schemas).includes('"SearchAction"'), `${path}: no unsupported search action`)
    pages.set(path, result)
  }
  for (const path of ["/sponsors", "/privacy-policy", "/terms-of-service", "/blocks"]) {
    assert.equal((await parse(path)).canonical, `https://componentry.dev${path}`)
  }
  for (const path of ["/demo/sticky-scroll-cards", "/preview", "/preview/pricing-01"]) {
    assert((await parse(path)).robots?.includes("noindex"), `${path}: excluded from indexing`)
    assert(!urls.includes(`https://componentry.dev${path}`))
  }
  assert(pages.get("/").links.includes("/collections"), "homepage footer links to collection index")
  const index = pages.get("/collections")
  for (const [path, result] of pages) {
    if (!path.startsWith("/collections/")) continue
    assert(index.links.includes(path), `${path}: linked from collection index`)
    const schema = result.schemas.find((item) => item["@type"] === "CollectionPage")
    assert(schema?.mainEntity.itemListElement.length >= 3, `${path}: substantive collection`)
    for (const entry of schema.mainEntity.itemListElement) {
      const componentPath = new URL(entry.url).pathname
      assert(pages.has(componentPath), `${path}: valid component ${componentPath}`)
      assert(result.links.includes(componentPath), `${path}: visible component link`)
    }
  }
  const signature = pages.get("/docs/components/signature")
  assert(signature.title.includes("SVG Handwriting Effect"))
  assert(signature.text.includes("Drawing duration per character"), "prop explanation in server HTML")
  assert(signature.text.includes("Font loading and timing"), "guidance in server HTML")
  const breadcrumb = signature.schemas.find((item) => item["@type"] === "BreadcrumbList")
  assert.equal(breadcrumb.itemListElement.at(-1).item, signature.canonical)
  const llms = await get("/llms.txt")
  assert(llms.includes("/collections/react-scroll-animations"), "collections available in text catalog")
  for (const path of ["/collections/does-not-exist", "/docs/components/does-not-exist"]) {
    assert.equal((await fetch(new URL(path, base))).status, 404, `${path}: real 404`)
  }
  console.log(`SEO checks passed: ${urls.length} sitemap URLs, metadata, crawl rules, collection links, structured data, noindex routes, and 404s.`)
} finally {
  await browser.close()
}
