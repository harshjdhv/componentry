// Install actual local payloads with shadcn into a fresh, disposable Next app.
// No Componentry workspace aliases, dependencies or node_modules are available.
import { mkdtemp, mkdir, writeFile, readFile, rm } from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { REGISTRY_DIR, validatePayload } = require("./lib/registry");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const webPackage = JSON.parse(
  await readFile(path.join(root, "apps/web/package.json"), "utf8"),
);
const uiPackage = JSON.parse(
  await readFile(path.join(root, "packages/ui/package.json"), "utf8"),
);
const items = [
  "spotlight-card",
  "circuit-board",
  "magnetic-dock",
  "webgl-liquid",
  "mac-keyboard",
  "image-trail",
  "collection-surfer",
  "pricing-01",
];
const fixture = await mkdtemp(path.join(tmpdir(), "componentry-registry-"));
const server = createServer(async (request, response) => {
  const slug = request.url?.match(/^\/r\/([a-z0-9-]+)\.json$/)?.[1];
  if (!slug || !items.includes(slug)) {
    response.writeHead(404).end();
    return;
  }
  try {
    const payload = await readFile(
      path.join(REGISTRY_DIR, `${slug}.json`),
      "utf8",
    );
    validatePayload(JSON.parse(payload));
    response
      .writeHead(200, { "Content-Type": "application/json" })
      .end(payload);
  } catch (error) {
    response.writeHead(500).end(String(error));
  }
});
function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: fixture,
      stdio: "inherit",
      env: { ...process.env, CI: "1", NEXT_TELEMETRY_DISABLED: "1" },
    });
    child.on("error", reject);
    child.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`${command} exited ${code}`)),
    );
  });
}
try {
  for (const directory of ["app", "lib"])
    await mkdir(path.join(fixture, directory), { recursive: true });
  await writeFile(
    path.join(fixture, "package.json"),
    JSON.stringify(
      {
        name: "componentry-registry-smoke",
        version: "0.0.0",
        private: true,
        dependencies: {
          next: webPackage.dependencies.next,
          react: webPackage.dependencies.react,
          "react-dom": webPackage.dependencies["react-dom"],
          clsx: uiPackage.dependencies.clsx,
          "tailwind-merge": uiPackage.dependencies["tailwind-merge"],
        },
        devDependencies: {
          typescript: webPackage.devDependencies.typescript,
          "@types/node": webPackage.devDependencies["@types/node"],
          "@types/react": webPackage.devDependencies["@types/react"],
          "@types/react-dom": webPackage.devDependencies["@types/react-dom"],
          tailwindcss: uiPackage.devDependencies.tailwindcss,
          "@tailwindcss/postcss":
            webPackage.devDependencies["@tailwindcss/postcss"],
        },
      },
      null,
      2,
    ),
  );
  await writeFile(
    path.join(fixture, "tsconfig.json"),
    JSON.stringify({
      compilerOptions: {
        target: "ES2020",
        lib: ["dom", "esnext"],
        strict: true,
        skipLibCheck: true,
        esModuleInterop: true,
        module: "esnext",
        moduleResolution: "bundler",
        jsx: "react-jsx",
        noEmit: true,
        baseUrl: ".",
        paths: { "@/*": ["./*"] },
      },
      include: ["**/*.ts", "**/*.tsx"],
      exclude: ["node_modules"],
    }),
  );
  await writeFile(
    path.join(fixture, "components.json"),
    JSON.stringify({
      $schema: "https://ui.shadcn.com/schema.json",
      style: "new-york",
      rsc: true,
      tsx: true,
      tailwind: {
        config: "",
        css: "app/globals.css",
        baseColor: "neutral",
        cssVariables: true,
      },
      aliases: {
        components: "@/components",
        utils: "@/lib/utils",
        ui: "@/components/ui",
        lib: "@/lib",
        hooks: "@/hooks",
      },
      iconLibrary: "lucide",
    }),
  );
  await writeFile(
    path.join(fixture, "postcss.config.mjs"),
    'export default { plugins: { "@tailwindcss/postcss": {} } };',
  );
  await writeFile(
    path.join(fixture, "app/globals.css"),
    '@import "tailwindcss";\nbody { background: white; color: #171717; } @media (prefers-color-scheme: dark) { body { background: #171717; color: white; } }\n',
  );
  await writeFile(
    path.join(fixture, "app/layout.tsx"),
    'import "./globals.css"; export default function Layout({children}: {children: React.ReactNode}) { return <html lang="en"><body>{children}</body></html> }',
  );
  await writeFile(
    path.join(fixture, "lib/utils.ts"),
    await readFile(path.join(root, "packages/ui/src/lib/utils.ts"), "utf8"),
  );
  await writeFile(
    path.join(fixture, "app/icon.svg"),
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>',
  );
  console.log(`[registry-smoke] Fresh consumer: ${fixture}`);
  await run("npm", ["install", "--no-audit", "--no-fund", "--ignore-scripts"]);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  await run("npx", [
    "--yes",
    "shadcn@4.21.0",
    "add",
    ...items.map((slug) => `${base}/r/${slug}.json`),
    "--yes",
    "--overwrite",
  ]);
  await run("npx", ["--no-install", "tsc", "--noEmit"]);
  // Exercise the installed dock, including form behavior, through real DOM events.
  await writeFile(
    path.join(fixture, "app/page.tsx"),
    `"use client";
import { useState } from "react";
import { MagneticDock, DockIconHome, DockIconSearch } from "@/components/ui/magnetic-dock";
export default function Page() {
  const [clicks, setClicks] = useState(0);
  const [submits, setSubmits] = useState(0);
  return <form style={{padding: "80px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 24}} onSubmit={(e) => { e.preventDefault(); setSubmits(n => n + 1); }}>
    <MagneticDock items={[{id: "home", label: "Home", isActive: true, icon: <DockIconHome />, onClick: () => setClicks(n => n + 1)}, {id: "search", label: "Search", icon: <DockIconSearch />}]}/>
    <p>Activations: <output aria-label="activations">{clicks}</output></p><p>Form submissions: <output aria-label="submissions">{submits}</output></p>
  </form>
}`,
  );
  if (process.env.REGISTRY_SMOKE_BROWSER === "1") {
    const { verifyDock } = await import("../tests/dock.browser.mjs");
    await verifyDock(fixture);
  }
  console.log(
    `[registry-smoke] Installed and typechecked ${items.length} representative entries.`,
  );
} finally {
  server.close();
  if (process.env.KEEP_REGISTRY_SMOKE === "1")
    console.log(`[registry-smoke] Kept fixture: ${fixture}`);
  else await rm(fixture, { recursive: true, force: true });
}
