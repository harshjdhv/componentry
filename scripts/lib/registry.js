const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

const ROOT = path.resolve(__dirname, "../..");
const REGISTRY_DIR = path.join(ROOT, "apps/web/public/r");
const SOURCE_DIR = path.join(ROOT, "packages/ui/src");
const HOST_IMPORTS = new Set(["react", "react-dom"]);
const HOST_ALIASES = new Set(["@/lib/utils"]); // Supplied by shadcn init.
const TYPE_PACKAGES = {
  three: "@types/three",
  "opentype.js": "@types/opentype.js",
};

function importNodes(content, filename = "component.tsx") {
  const source = ts.createSourceFile(
    filename,
    content,
    ts.ScriptTarget.Latest,
    true,
  );
  const nodes = [];
  function visit(node) {
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      node.moduleSpecifier &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      nodes.push(node.moduleSpecifier);
    } else if (
      ts.isCallExpression(node) &&
      (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
        (ts.isIdentifier(node.expression) &&
          node.expression.text === "require")) &&
      node.arguments[0] &&
      ts.isStringLiteral(node.arguments[0])
    ) {
      nodes.push(node.arguments[0]);
    } else if (
      ts.isImportTypeNode(node) &&
      ts.isLiteralTypeNode(node.argument) &&
      ts.isStringLiteral(node.argument.literal)
    ) {
      nodes.push(node.argument.literal);
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  return { source, nodes };
}

function imports(content, filename) {
  return importNodes(content, filename).nodes.map((node) => node.text);
}

function normalizeContent(content, filename) {
  const { source, nodes } = importNodes(content, filename);
  let result = content;
  for (const node of [...nodes].sort((a, b) => b.pos - a.pos)) {
    const value = node.text
      .replace(/^@workspace\/ui\/components\//, "@/components/ui/")
      .replace(/^@workspace\/ui\/lib\//, "@/lib/")
      .replace(/^@workspace\/ui\/hooks\//, "@/hooks/")
      .replace(/^\.\.\/lib\/utils$/, "@/lib/utils");
    result =
      result.slice(0, node.getStart(source) + 1) +
      value +
      result.slice(node.end - 1);
  }
  return result;
}

function packageName(specifier) {
  return specifier.startsWith("@")
    ? specifier.split("/").slice(0, 2).join("/")
    : specifier.split("/")[0];
}
function dependencyName(dependency) {
  return dependency.replace(/@[^@/]+$/, "");
}
function addDependencies(existing = [], required) {
  const result = [...existing];
  for (const dependency of [...required].sort()) {
    if (!result.some((entry) => dependencyName(entry) === dependency))
      result.push(dependency);
  }
  return result;
}
function withDependencies(item) {
  const required = new Set();
  const types = new Set();
  for (const file of item.files) {
    for (const specifier of imports(file.content, file.path)) {
      if (
        specifier.startsWith(".") ||
        specifier.startsWith("@/") ||
        specifier.startsWith("@workspace/")
      )
        continue;
      const name = packageName(specifier);
      if (!HOST_IMPORTS.has(name)) required.add(name);
      if (TYPE_PACKAGES[name]) types.add(TYPE_PACKAGES[name]);
    }
  }
  const dependencies = addDependencies(item.dependencies, required);
  const devDependencies = addDependencies(item.devDependencies, types);
  return {
    ...item,
    ...(item.dependencies || dependencies.length ? { dependencies } : {}),
    ...(item.devDependencies || devDependencies.length
      ? { devDependencies }
      : {}),
  };
}
function targetPath(file) {
  return (file.target || file.path).replace(/^~\//, "");
}
function localImportPath(specifier, file) {
  if (specifier.startsWith("@/")) return specifier.slice(2);
  if (specifier.startsWith("."))
    return path.posix.normalize(
      path.posix.join(path.posix.dirname(targetPath(file)), specifier),
    );
  return null;
}
function resolveFile(target, files) {
  return files.find((file) =>
    [
      target,
      `${target}.tsx`,
      `${target}.ts`,
      `${target}/index.tsx`,
      `${target}/index.ts`,
    ].includes(targetPath(file)),
  );
}
function sourcePathForFile(file) {
  const target = targetPath(file);
  if (target.startsWith("components/ui/"))
    return path.join(
      SOURCE_DIR,
      "components",
      target.slice("components/ui/".length),
    );
  if (/^(lib|hooks)\//.test(target)) return path.join(SOURCE_DIR, target);
  return null;
}

function buildComponent(item) {
  const mainSource = path.join(SOURCE_DIR, "components", `${item.name}.tsx`);
  if (!fs.existsSync(mainSource)) {
    throw new Error(`${item.name}: missing canonical source ${mainSource}`);
  }
  if (!item.files.some((file) => sourcePathForFile(file) === mainSource)) {
    throw new Error(`${item.name}: payload is missing its main component file`);
  }
  const files = item.files.map((file) => {
    const source = sourcePathForFile(file);
    if (!source || !fs.existsSync(source))
      throw new Error(`${item.name}: missing source for ${file.path}`);
    return {
      ...file,
      content: normalizeContent(fs.readFileSync(source, "utf8"), source),
    };
  });
  // Bundle local helpers, including transitive helpers, without adding an app-only
  // dependency to the installed component. utils remains the shadcn host utility.
  for (const file of files) {
    for (const specifier of imports(file.content, file.path)) {
      if (specifier.startsWith("@workspace/"))
        throw new Error(
          `${item.name}: private workspace import in ${file.path}`,
        );
      if (HOST_ALIASES.has(specifier)) continue;
      const target = localImportPath(specifier, file);
      if (!target || resolveFile(target, files)) continue;
      const candidate = [".tsx", ".ts", ""].map((ext) => ({
        path: target + ext,
      }));
      const helper = candidate.find((entry) => {
        const source = sourcePathForFile(entry);
        return source && fs.existsSync(source) && fs.statSync(source).isFile();
      });
      if (!helper)
        throw new Error(
          `${item.name}: unresolved local import ${specifier} in ${file.path}`,
        );
      const source = sourcePathForFile(helper);
      files.push({
        ...helper,
        type: target.startsWith("lib/")
          ? "registry:lib"
          : target.startsWith("hooks/")
            ? "registry:hook"
            : "registry:ui",
        content: normalizeContent(fs.readFileSync(source, "utf8"), source),
      });
    }
  }
  return withDependencies({ ...item, files });
}

function validatePayload(item) {
  const declared = new Set(
    [...(item.dependencies || []), ...(item.devDependencies || [])].map(
      dependencyName,
    ),
  );
  const targets = new Set();
  for (const file of item.files) {
    const target = targetPath(file);
    if (
      path.posix.isAbsolute(target) ||
      target.split("/").includes("..") ||
      target.includes("\\")
    )
      throw new Error(`${item.name}: unsafe target ${target}`);
    if (targets.has(target))
      throw new Error(`${item.name}: duplicate target ${target}`);
    targets.add(target);
    if (typeof file.content !== "string" || !file.content.trim())
      throw new Error(`${item.name}: empty source in ${file.path}`);
    for (const specifier of imports(file.content, file.path)) {
      if (specifier.startsWith("@workspace/"))
        throw new Error(
          `${item.name}: private workspace import in ${file.path}`,
        );
      if (HOST_ALIASES.has(specifier)) continue;
      const target = localImportPath(specifier, file);
      if (target) {
        if (!resolveFile(target, item.files))
          throw new Error(`${item.name}: unresolved local import ${specifier}`);
      } else {
        const name = packageName(specifier);
        if (!HOST_IMPORTS.has(name) && !declared.has(name))
          throw new Error(`${item.name}: undeclared dependency ${name}`);
        if (TYPE_PACKAGES[name] && !declared.has(TYPE_PACKAGES[name]))
          throw new Error(
            `${item.name}: missing TypeScript dependency ${TYPE_PACKAGES[name]}`,
          );
      }
    }
  }
}
module.exports = {
  ROOT,
  REGISTRY_DIR,
  SOURCE_DIR,
  imports,
  normalizeContent,
  packageName,
  dependencyName,
  withDependencies,
  buildComponent,
  validatePayload,
  targetPath,
};
