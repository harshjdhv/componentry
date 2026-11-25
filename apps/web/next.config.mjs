import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"
import { parseEnv } from "node:util"
import nextEnv from "@next/env"

// Next.js only reads env files from apps/web, but this monorepo keeps a single
// .env at the repo root, so load those files here. A missing file is skipped
// (CI, Vercel) and already-set variables are never overridden.
//
// This can't use nextEnv.loadEnvConfig(repoRoot): Next has already called it for
// apps/web by the time this file runs, and it returns that cached result
// instead of reading a second directory.
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const mode = process.env.NODE_ENV === "production" ? "production" : "development"
const rootEnv = {}
for (const file of [`.env.${mode}.local`, ".env.local", `.env.${mode}`, ".env"]) {
  const filePath = path.join(repoRoot, file)
  if (!fs.existsSync(filePath)) continue
  for (const [key, value] of Object.entries(parseEnv(fs.readFileSync(filePath, "utf8")))) {
    if (process.env[key] === undefined && !(key in rootEnv)) rootEnv[key] = value
  }
}
Object.assign(process.env, rootEnv)
// Keep these when Next resets process.env (e.g. after an env file changes in dev).
nextEnv.updateInitialEnv(rootEnv)

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  // Components removed from the library leave indexed URLs behind. Without a
  // redirect those URLs 404 and take their rankings and inbound links with them.
  // Point each removed slug at the closest surviving component.
  async redirects() {
    return [
      {
        source: "/docs/components/grain-gradient",
        destination: "/docs/components/dither-gradient",
        permanent: true,
      },
      {
        source: "/docs/components/split-flap-display",
        destination: "/docs/components/flipping-word-swap",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
