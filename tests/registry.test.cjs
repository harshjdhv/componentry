const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const {
  ROOT,
  REGISTRY_DIR,
  buildComponent,
  validatePayload,
  imports,
  normalizeContent,
} = require("../scripts/lib/registry");
const read = (name) =>
  JSON.parse(fs.readFileSync(path.join(REGISTRY_DIR, `${name}.json`), "utf8"));

test("installation rejects private aliases, missing dependencies and helpers", () => {
  const valid = read("magnetic-dock");
  assert.doesNotThrow(() => validatePayload(valid));
  const privateImport = structuredClone(valid);
  privateImport.files[0].content +=
    '\nimport { cn } from "@workspace/ui/lib/utils"';
  assert.throws(() => validatePayload(privateImport), /private workspace/);
  assert.throws(
    () => validatePayload({ ...valid, dependencies: [] }),
    /undeclared dependency framer-motion/,
  );
  const webgl = read("webgl-liquid");
  assert.throws(
    () => validatePayload({ ...webgl, files: webgl.files.slice(0, 1) }),
    /unresolved local import/,
  );
});

test("generation recovers canonical source and dependency declarations", () => {
  const current = read("magnetic-dock");
  assert.throws(
    () => buildComponent({ ...current, files: [] }),
    /missing its main component file/,
  );
  const stale = structuredClone(current);
  stale.files[0].content = "// stale source";
  stale.dependencies = [];
  const rebuilt = buildComponent(stale);
  assert.equal(rebuilt.files[0].content, current.files[0].content);
  assert.ok(rebuilt.dependencies.includes("framer-motion"));
  assert.throws(
    () => buildComponent({ ...current, name: "missing-canonical-source" }),
    /missing canonical source/,
  );
});

test("normalization includes dynamic/type imports without rewriting prose", () => {
  const content =
    '// @workspace/ui/lib/utils is a workspace alias\nimport type { X } from "@workspace/ui/lib/utils"; const x = import("@workspace/ui/lib/ease"); type T = import("three").Vector3';
  const result = normalizeContent(content, "test.tsx");
  assert.ok(result.startsWith("// @workspace/ui/lib/utils"));
  assert.deepEqual(imports(result, "test.tsx"), [
    "@/lib/utils",
    "@/lib/ease",
    "three",
  ]);
});

function loadTs(relative, env = {}) {
  const filename = path.join(ROOT, relative);
  const source = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  const exports = {};
  vm.runInNewContext(source, {
    exports,
    process: { env },
    require: (id) => {
      if (id === "./install-command")
        return loadTs("apps/web/lib/install-command.ts", env);
      throw new Error(`Unexpected import ${id}`);
    },
  });
  return exports;
}

test("UI and Markdown install commands share namespace and package-manager handling", () => {
  const { getInstallCommand } = loadTs("apps/web/lib/install-command.ts");
  assert.equal(
    getInstallCommand("magnetic-dock"),
    "npx shadcn@latest add @componentry/magnetic-dock",
  );
  assert.equal(
    getInstallCommand("@custom/dock", "pnpm"),
    "pnpm dlx shadcn@latest add @custom/dock",
  );
  assert.equal(
    getInstallCommand("https://example.com/r/dock.json", "bun"),
    "bunx --bun shadcn@latest add https://example.com/r/dock.json",
  );
  const { buildDocsPageMarkdown } = loadTs(
    "apps/web/lib/docs-page-markdown.ts",
    { NEXT_PUBLIC_REGISTRY_NAMESPACE: "@custom" },
  );
  const markdown = buildDocsPageMarkdown({
    title: "Dock",
    description: "Dock",
    installPackageName: "magnetic-dock",
    usageCode: "<Dock />",
    props: [
      { name: "side", type: '"top" | "bottom"', description: "Placement" },
    ],
  });
  assert.ok(markdown.includes("npx shadcn@latest add @custom/magnetic-dock"));
  assert.ok(markdown.includes('"top" \\| "bottom"'));
  assert.ok(!markdown.includes("npx componentry@latest"));
});

test("Closing Plasma consumes custom props while forwarding HTML attributes", () => {
  const { createRequire } = require("node:module");
  const uiRequire = createRequire(path.join(ROOT, "packages/ui/package.json"));
  function loadUi(relative) {
    const filename = path.join(ROOT, "packages/ui/src", relative);
    const exports = {};
    const output = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
    }).outputText;
    vm.runInNewContext(output, {
      exports,
      require: (id) =>
        id === "@workspace/ui/lib/utils"
          ? loadUi("lib/utils.ts")
          : uiRequire(id),
    });
    return exports;
  }
  const React = uiRequire("react");
  const { renderToStaticMarkup } = uiRequire("react-dom/server");
  const { ClosingPlasma } = loadUi("components/closing-plasma.tsx");
  const markup = renderToStaticMarkup(
    React.createElement(ClosingPlasma, {
      themeMode: "light",
      id: "plasma",
      "aria-label": "Background",
    }),
  );
  assert.ok(markup.includes('id="plasma"'));
  assert.ok(markup.includes('aria-label="Background"'));
  assert.ok(
    !/thememode/i.test(markup),
    "Custom component props must not leak to the DOM",
  );
});
