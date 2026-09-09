const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const { ROOT } = require("./lib/registry");

function loadData(filename) {
  const source = fs.readFileSync(filename, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;
  const exports = {};
  vm.runInNewContext(
    output,
    {
      exports,
      require: () => {
        throw new Error(`Unexpected runtime import in ${filename}`);
      },
    },
    { filename },
  );
  return exports;
}
function validateDocs(slugs) {
  const web = path.join(ROOT, "apps/web");
  const { components } = loadData(path.join(web, "registry/index.ts"));
  const lazy = loadData(path.join(web, "components/docs/lazy-registry.ts"));
  const docsSlugs = new Set(lazy.getDocsSlugs());
  if (
    [...slugs].some((slug) => !docsSlugs.has(slug)) ||
    [...docsSlugs].some((slug) => !slugs.has(slug))
  ) {
    throw new Error(
      "Docs metadata and lazy imports must contain the same slugs.",
    );
  }
  for (const slug of slugs) {
    const metadata = components[slug];
    if (
      metadata.slug !== slug ||
      !metadata.title?.trim() ||
      !metadata.description?.trim()
    )
      throw new Error(`${slug}: incomplete or mismatched metadata`);
    const importer = lazy.getDocsImporter(slug).toString();
    const modulePath = importer.match(/@\/components\/docs\/[^"']+/)?.[0];
    if (!modulePath) throw new Error(`${slug}: cannot resolve docs importer`);
    const file = path.join(web, `${modulePath.slice(2)}.tsx`);
    if (!fs.existsSync(file))
      throw new Error(`${slug}: missing docs module ${file}`);
    const source = fs.readFileSync(file, "utf8");
    const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
    let layout;
    function visit(node) {
      if (
        (ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) &&
        node.tagName.getText(ast) === "DocsPageLayout"
      )
        layout = node;
      ts.forEachChild(node, visit);
    }
    visit(ast);
    if (!layout) throw new Error(`${slug}: missing DocsPageLayout`);
    const attrs = new Map(
      layout.attributes.properties
        .filter(ts.isJsxAttribute)
        .map((attr) => [attr.name.getText(ast), attr]),
    );
    for (const name of [
      "title",
      "description",
      "preview",
      "previewCode",
      "usageCode",
      "props",
      "installPackageName",
      "installSourceCode",
    ]) {
      if (!attrs.has(name))
        throw new Error(`${slug}: missing documentation field ${name}`);
    }
    if (attrs.get("installPackageName").initializer?.text !== slug)
      throw new Error(`${slug}: installation slug does not match docs route`);
    if (!source.includes(`readComponentSource("${slug}")`))
      throw new Error(`${slug}: docs must read the matching registry source`);
  }
  console.log(
    `[docs-check] ${slugs.size} routes have matching metadata, imports, source, installation, previews, usage and props.`,
  );
}
module.exports = { loadData, validateDocs };
