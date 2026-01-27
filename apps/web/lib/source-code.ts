export async function readComponentSource(
  componentName: string,
): Promise<string | null> {
  // --------------------------------------------------------------------------------
  // UNIVERSAL: USE BUNDLED REGISTRY JSON
  // --------------------------------------------------------------------------------
  // We use the dynamic import to load the registry JSON for both dev and prod.
  // Webpack/Next.js analyzes this dynamic import and bundles all matching files
  // from the @/public/r directory into the build. This guarantees consistency
  // across environments and eliminates finding files on the filesystem manually.
  try {
    // We cast to any because the JSON module structure isn't strictly typed here
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const registry = (await import(`@/public/r/${componentName}.json`)) as any;

    if (registry.files && registry.files.length > 0) {
      return registry.files[0].content;
    }

    // Handle "default" export if JSON import behaves that way in certain configs
    if (
      registry.default &&
      registry.default.files &&
      registry.default.files.length > 0
    ) {
      return registry.default.files[0].content;
    }
  } catch (error) {
    console.error(`Error loading registry for ${componentName}:`, error);
  }

  return null;
}
