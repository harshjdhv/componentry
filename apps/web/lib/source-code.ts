// Cache for source code - persists across renders
const sourceCache = new Map<string, string | null>();

/**
 * Read component source code with caching.
 *
 * PERFORMANCE: Uses a simple in-memory cache to avoid
 * redundant dynamic imports and JSON parsing on repeated visits.
 */
export async function readComponentSource(
  componentName: string,
): Promise<string | null> {
  // Check cache first
  const cached = sourceCache.get(componentName);
  if (cached !== undefined) {
    return cached;
  }

  try {
    // Dynamic import the registry JSON
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const registry = (await import(`@/public/r/${componentName}.json`)) as any;

    let content: string | null = null;

    if (registry.files && registry.files.length > 0) {
      content = registry.files[0].content;
    } else if (
      registry.default &&
      registry.default.files &&
      registry.default.files.length > 0
    ) {
      content = registry.default.files[0].content;
    }

    // Cache the result
    sourceCache.set(componentName, content);
    return content;
  } catch (error) {
    console.error(`Error loading registry for ${componentName}:`, error);
    sourceCache.set(componentName, null);
    return null;
  }
}

/**
 * Pre-warm the source cache for a list of component names.
 * Call this at build time or on initial page load for commonly used components.
 */
export async function preloadComponentSources(
  componentNames: string[],
): Promise<void> {
  await Promise.all(componentNames.map((name) => readComponentSource(name)));
}
