const fs = require("fs")
const path = require("path")
const { validatePayload } = require("./lib/registry")

const ROOT = path.join(__dirname, "..")
const REGISTRY_DIR = path.join(ROOT, "apps/web/public/r")
const REGISTRY_INDEX_PATH = path.join(REGISTRY_DIR, "registry.json")
const DOCS_REGISTRY_PATH = path.join(ROOT, "apps/web/registry/index.ts")
const BLOCKS_REGISTRY_PATH = path.join(ROOT, "apps/web/registry/generated/blocks.json")

const REQUIRED_ALIASES = ["componentry", "componentryui", "ui", "cmp"]
const REGISTRY_SCHEMA_URL = "https://ui.shadcn.com/schema/registry.json"
const REGISTRY_ITEM_SCHEMA_URL = "https://ui.shadcn.com/schema/registry-item.json"

function fail(message) {
  console.error(`\n[registry-check] ${message}`)
  process.exit(1)
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"))
  } catch (error) {
    fail(`Failed to parse JSON at ${filePath}: ${error.message}`)
  }
}

function readDocsRegistrySlugs() {
  const { components } = require("./validate-docs").loadData(DOCS_REGISTRY_PATH)
  return new Set(Object.keys(components))
}

function readBlockRegistrySlugs() {
  if (!fs.existsSync(BLOCKS_REGISTRY_PATH)) {
    return new Set()
  }

  const blocks = readJson(BLOCKS_REGISTRY_PATH)
  if (!Array.isArray(blocks)) {
    fail(`${BLOCKS_REGISTRY_PATH} must contain an array.`)
  }

  return new Set(
    blocks
      .filter((block) => block && typeof block.name === "string")
      .map((block) => block.name)
  )
}

function normalizeIndexItems(rawItems) {
  const names = []
  for (const item of rawItems) {
    if (typeof item === "string") {
      names.push(item)
      continue
    }
    if (item && typeof item === "object" && typeof item.name === "string") {
      names.push(item.name)
      continue
    }
    fail("apps/web/public/r/registry.json has an invalid item entry.")
  }
  return names
}

function validateRegistryItemFile(slug) {
  const itemPath = path.join(REGISTRY_DIR, `${slug}.json`)
  if (!fs.existsSync(itemPath)) {
    fail(`Missing item file for "${slug}" at ${itemPath}`)
  }

  const item = readJson(itemPath)
  try { validatePayload(item) } catch (error) { fail(error.message) }

  if (item.$schema && item.$schema !== REGISTRY_ITEM_SCHEMA_URL) {
    fail(
      `${slug}.json has an unexpected $schema "${item.$schema}". Expected "${REGISTRY_ITEM_SCHEMA_URL}".`
    )
  }

  if (typeof item.name !== "string" || item.name.length === 0) {
    fail(`${slug}.json is missing a valid "name" field.`)
  }

  if (item.name !== slug) {
    fail(`${slug}.json has name "${item.name}" but file slug is "${slug}".`)
  }

  if (typeof item.type !== "string" || item.type.length === 0) {
    fail(`${slug}.json is missing a valid "type" field.`)
  }

  if (!Array.isArray(item.files) || item.files.length === 0) {
    fail(`${slug}.json must contain a non-empty "files" array.`)
  }

  for (const file of item.files) {
    if (!file || typeof file !== "object") {
      fail(`${slug}.json has an invalid file entry.`)
    }
    if (typeof file.path !== "string" || file.path.length === 0) {
      fail(`${slug}.json has a file entry with an invalid "path".`)
    }
    if (typeof file.type !== "string" || file.type.length === 0) {
      fail(`${slug}.json has a file entry with an invalid "type".`)
    }
  }
}

function main() {
  if (!fs.existsSync(REGISTRY_INDEX_PATH)) {
    fail(`Missing registry index file at ${REGISTRY_INDEX_PATH}`)
  }

  const registryIndex = readJson(REGISTRY_INDEX_PATH)

  if (registryIndex.$schema && registryIndex.$schema !== REGISTRY_SCHEMA_URL) {
    fail(
      `registry.json has an unexpected $schema "${registryIndex.$schema}". Expected "${REGISTRY_SCHEMA_URL}".`
    )
  }

  if (registryIndex.name !== "componentry") {
    fail(`registry.json name must be "componentry", found "${registryIndex.name ?? "undefined"}".`)
  }

  if (!Array.isArray(registryIndex.aliases)) {
    fail(`registry.json must include an "aliases" array.`)
  }

  for (const alias of REQUIRED_ALIASES) {
    if (!registryIndex.aliases.includes(alias)) {
      fail(`registry.json aliases must include "${alias}".`)
    }
  }

  if (!Array.isArray(registryIndex.items) || registryIndex.items.length === 0) {
    fail(`registry.json must include a non-empty "items" array.`)
  }

  const itemNames = normalizeIndexItems(registryIndex.items)
  const uniqueItemNames = new Set(itemNames)
  if (uniqueItemNames.size !== itemNames.length) {
    fail("registry.json contains duplicate entries in items[].")
  }

  const itemFiles = fs
    .readdirSync(REGISTRY_DIR)
    .filter((file) => file.endsWith(".json") && file !== "registry.json")
    .map((file) => file.replace(/\.json$/, ""))

  for (const fileSlug of itemFiles) {
    if (!uniqueItemNames.has(fileSlug)) {
      fail(`registry.json is missing "${fileSlug}" from items[].`)
    }
  }

  for (const slug of uniqueItemNames) {
    validateRegistryItemFile(slug)
  }

  const docsSlugs = readDocsRegistrySlugs()
  const blockSlugs = readBlockRegistrySlugs()
  try { require("./validate-docs").validateDocs(docsSlugs) } catch (error) { fail(error.message) }

  for (const slug of docsSlugs) {
    if (!uniqueItemNames.has(slug)) {
      fail(`apps/web/registry/index.ts slug "${slug}" is missing from registry.json items[].`)
    }
  }

  for (const slug of uniqueItemNames) {
    if (!docsSlugs.has(slug) && !blockSlugs.has(slug)) {
      fail(
        `registry.json item "${slug}" has no component documentation or block definition. Add the matching metadata.`
      )
    }
  }

  console.log(
    `[registry-check] OK - ${uniqueItemNames.size} items validated, ${docsSlugs.size} documented slugs checked.`
  )
}

main()
