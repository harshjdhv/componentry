const fs = require("fs");
const path = require("path");
const vm = require("vm");
const ts = require("typescript");
const { withDependencies, validatePayload } = require("./lib/registry");
const check = process.argv.includes("--check");

const ROOT = path.join(__dirname, "..");
const WEB_DIR = path.join(ROOT, "apps/web");
const BLOCKS_REGISTRY_PATH = path.join(WEB_DIR, "registry/blocks/_registry.ts");
const PUBLIC_REGISTRY_DIR = path.join(WEB_DIR, "public/r");
const GENERATED_DIR = path.join(WEB_DIR, "registry/generated");
const REGISTRY_SOURCE_DIR = path.join(WEB_DIR, "registry");

const allowedFileTypes = new Set([
  "registry:component",
  "registry:page",
  "registry:lib",
  "registry:hook",
  "registry:style",
  "registry:ui",
]);

function readJson(filePath, fallback = null) {
  if (!fs.existsSync(filePath)) return fallback;
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function writeFile(filePath, content) {
  if (check) {
    if (!fs.existsSync(filePath) || fs.readFileSync(filePath, "utf8") !== content) {
      throw new Error(`Stale block output: ${path.relative(ROOT, filePath)}. Run pnpm registry:blocks.`);
    }
    return;
  }
  if (fs.existsSync(filePath) && fs.readFileSync(filePath, "utf8") === content) return;
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

function loadTypedRegistry() {
  const source = fs.readFileSync(BLOCKS_REGISTRY_PATH, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
    fileName: BLOCKS_REGISTRY_PATH,
  }).outputText;

  const sandbox = {
    exports: {},
    module: { exports: {} },
    require(id) {
      throw new Error(
        `Unexpected runtime import while loading registry: ${id}`,
      );
    },
  };

  vm.runInNewContext(output, sandbox, { filename: BLOCKS_REGISTRY_PATH });

  return {
    categories: sandbox.exports.blockCategories,
    blocks: sandbox.exports.blocks,
  };
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(`[blocks-registry] ${message}`);
  }
}

function validateRegistry({ categories, blocks }) {
  assert(Array.isArray(categories), "blockCategories must be an array.");
  assert(Array.isArray(blocks), "blocks must be an array.");

  const categoryNames = new Set();
  for (const category of categories) {
    assert(category && typeof category === "object", "Invalid category entry.");
    assert(typeof category.name === "string", "Category is missing name.");
    assert(
      typeof category.title === "string",
      `Category ${category.name} is missing title.`,
    );
    assert(
      typeof category.description === "string",
      `Category ${category.name} is missing description.`,
    );
    assert(
      !categoryNames.has(category.name),
      `Duplicate category ${category.name}.`,
    );
    categoryNames.add(category.name);
  }

  const blockNames = new Set();
  for (const block of blocks) {
    assert(block && typeof block === "object", "Invalid block entry.");
    assert(typeof block.name === "string", "Block is missing name.");
    assert(!blockNames.has(block.name), `Duplicate block ${block.name}.`);
    blockNames.add(block.name);
    assert(typeof block.title === "string", `${block.name} is missing title.`);
    assert(
      typeof block.description === "string",
      `${block.name} is missing description.`,
    );
    assert(
      block.type === "registry:block",
      `${block.name} must use type registry:block.`,
    );
    assert(
      Array.isArray(block.categories),
      `${block.name} must define categories.`,
    );
    assert(
      block.categories.length > 0,
      `${block.name} must have at least one category.`,
    );

    for (const category of block.categories) {
      assert(
        categoryNames.has(category),
        `${block.name} references unknown category ${category}.`,
      );
    }

    assert(Array.isArray(block.files), `${block.name} must define files.`);
    assert(
      block.files.length > 0,
      `${block.name} must include at least one file.`,
    );

    for (const file of block.files) {
      assert(
        typeof file.path === "string",
        `${block.name} has a file without path.`,
      );
      assert(
        allowedFileTypes.has(file.type),
        `${block.name} has unsupported file type ${file.type}.`,
      );

      const sourcePath = path.join(REGISTRY_SOURCE_DIR, file.path);
      assert(
        fs.existsSync(sourcePath),
        `${block.name} references missing file ${sourcePath}.`,
      );
    }
  }
}

function normalizeAliasTarget(target) {
  if (!target) return target;

  return target.replace(
    /^@(components|ui|hooks|lib)\/(.+)$/,
    (_, type, rest) => {
      if (type === "components") return `components/${rest}`;
      if (type === "ui") return `components/ui/${rest}`;
      if (type === "hooks") return `hooks/${rest}`;
      if (type === "lib") return `lib/${rest}`;
      return target;
    },
  );
}

function getDefaultTarget(file) {
  const fileName = file.path.split("/").pop();
  if (file.type === "registry:ui") return `components/ui/${fileName}`;
  if (file.type === "registry:hook") return `hooks/${fileName}`;
  if (file.type === "registry:lib") return `lib/${fileName}`;
  if (file.type === "registry:page") return `app/${fileName}`;
  return `components/${fileName}`;
}

function normalizeFile(file) {
  return {
    ...file,
    target: normalizeAliasTarget(file.target || getDefaultTarget(file)),
  };
}

function fixInstallImport(content) {
  return content
    .replaceAll("@workspace/ui/components/", "@/components/")
    .replaceAll("@workspace/ui/lib/", "@/lib/")
    .replaceAll("@/registry/components/", "@/components/")
    .replaceAll("@/registry/hooks/", "@/hooks/")
    .replaceAll("@/registry/lib/", "@/lib/");
}

function readInstallFile(block, file) {
  const sourcePath = path.join(REGISTRY_SOURCE_DIR, file.path);
  let content = fs.readFileSync(sourcePath, "utf8");

  if (file.type !== "registry:page") {
    content = content.replaceAll("export default", "export");
  }

  return {
    ...normalizeFile(file),
    path: path.relative(WEB_DIR, sourcePath),
    content: fixInstallImport(content),
  };
}

function buildIndexBlock(block) {
  return {
    ...block,
    files: block.files.map(normalizeFile),
  };
}

function buildGeneratedIndex(blocks) {
  const imports = blocks
    .map((block, index) => {
      const firstFile = block.files[0];
      const importPath = `@/registry/${firstFile.path.replace(/\.tsx?$/, "")}`;
      return `import Block${index} from "${importPath}"`;
    })
    .join("\n");

  const entries = blocks
    .map((block, index) => {
      return `  "${block.name}": {
    ...blocks[${index}]!,
    component: Block${index},
  },`;
    })
    .join("\n");

  return `// This file is autogenerated by scripts/build-blocks-registry.js.
// Do not edit this file directly.

import type * as React from "react"

import blocks from "./blocks.json"

${imports}

export const blockIndex = {
${entries}
} as const satisfies Record<
  string,
  (typeof blocks)[number] & { component: React.ComponentType }
>

export type BlockIndexName = keyof typeof blockIndex
`;
}

function main() {
  const source = loadTypedRegistry();
  validateRegistry(source);

  const blocks = source.blocks.map(buildIndexBlock);
  const publicBlocks = source.blocks.map((block) => withDependencies({
    ...block,
    files: block.files.map((file) => readInstallFile(block, file)),
  }));
  for (const block of publicBlocks) validatePayload(block);

  const existingRegistry = readJson(
    path.join(PUBLIC_REGISTRY_DIR, "registry.json"),
    {
      $schema: "https://ui.shadcn.com/schema/registry.json",
      name: "componentry",
      homepage: "https://componentry.fun",
      aliases: ["componentry", "componentryui", "ui", "cmp"],
      items: [],
    },
  );
  const existingItems = Array.isArray(existingRegistry.items)
    ? existingRegistry.items.filter((item) => item.type !== "registry:block")
    : [];

  writeJson(path.join(PUBLIC_REGISTRY_DIR, "registry.json"), {
    ...existingRegistry,
    items: [
      ...existingItems,
      ...blocks.map((block) => ({ name: block.name, type: block.type })),
    ],
  });

  for (const block of publicBlocks) {
    writeJson(path.join(PUBLIC_REGISTRY_DIR, `${block.name}.json`), {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      ...block,
    });
  }

  writeJson(path.join(GENERATED_DIR, "blocks.json"), blocks);
  writeJson(
    path.join(GENERATED_DIR, "block-categories.json"),
    source.categories,
  );
  writeFile(
    path.join(GENERATED_DIR, "block-index.tsx"),
    buildGeneratedIndex(blocks),
  );

  console.log(`[blocks-registry] ${check ? "Checked" : "Built"} ${blocks.length} blocks.`);
}

main();
