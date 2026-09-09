const fs = require("node:fs");
const path = require("node:path");
const {
  REGISTRY_DIR,
  buildComponent,
  validatePayload,
} = require("./lib/registry");

const args = process.argv.slice(2);
const check = args.includes("--check");
const all = args.includes("--all") || check;
const slug = args.find((arg) => !arg.startsWith("--"));
if (
  (!all && !slug) ||
  (slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) ||
  args.some(
    (arg) =>
      arg.startsWith("--") && !["--all", "--check", "--write"].includes(arg),
  )
) {
  console.error(
    "Usage: node scripts/generate-registry.js <slug> | --all [--check]",
  );
  process.exit(1);
}
try {
  const names = all
    ? fs
        .readdirSync(REGISTRY_DIR)
        .filter((file) => file.endsWith(".json") && file !== "registry.json")
        .map((file) => file.slice(0, -5))
        .sort()
    : [slug];
  const outputs = new Map();
  for (const name of names) {
    const filename = path.join(REGISTRY_DIR, `${name}.json`);
    const item = fs.existsSync(filename)
      ? JSON.parse(fs.readFileSync(filename, "utf8"))
      : {
          $schema: "https://ui.shadcn.com/schema/registry-item.json",
          name,
          type: "registry:ui",
          title: name
            .split("-")
            .map((word) => word[0].toUpperCase() + word.slice(1))
            .join(" "),
          description: `Component for ${name}`,
          dependencies: [],
          devDependencies: [],
          registryDependencies: [],
          files: [{ path: `components/ui/${name}.tsx`, type: "registry:ui" }],
        };
    if (item.type === "registry:block") continue;
    const generated = buildComponent(item);
    validatePayload(generated);
    if (JSON.stringify(item) !== JSON.stringify(generated))
      outputs.set(filename, `${JSON.stringify(generated, null, 2)}\n`);
  }
  const indexPath = path.join(REGISTRY_DIR, "registry.json");
  const index = JSON.parse(fs.readFileSync(indexPath, "utf8"));
  const existing = new Set(
    index.items.map((item) => (typeof item === "string" ? item : item.name)),
  );
  const missing = names.filter((name) => !existing.has(name));
  if (missing.length) {
    index.items.push(...missing.map((name) => ({ name, type: "registry:ui" })));
    outputs.set(indexPath, `${JSON.stringify(index, null, 2)}\n`);
  }
  if (check && outputs.size)
    throw new Error(
      `Stale registry output: ${[...outputs.keys()].map((file) => path.basename(file)).join(", ")}. Run pnpm registry:generate.`,
    );
  if (!check)
    for (const [filename, content] of outputs)
      fs.writeFileSync(filename, content);
  console.log(
    `[registry-generate] ${check ? "Checked" : "Generated"} ${names.length} entries (${outputs.size} changed).`,
  );
} catch (error) {
  console.error(`[registry-generate] ${error.message}`);
  process.exit(1);
}
