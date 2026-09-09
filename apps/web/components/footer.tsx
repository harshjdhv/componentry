"use client";

import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import {
  LandingContent,
  landingGutterClass,
} from "@/components/landing/landing-frame";
import { ComponentryLogomark } from "@/components/logos/componentry-logomark";
import { components } from "@/registry";

const componentLinks = Object.values(components).sort((a, b) =>
  a.title.localeCompare(b.title),
);

const footerLinks = [
  { label: "Components", href: "/docs" },
  { label: "Blocks", href: "/blocks" },
  { label: "MCP", href: "/docs/mcp" },
  { label: "Sponsor", href: "https://github.com/sponsors/harshjdhv" },
  { label: "Developer", href: "https://harshjdhv.com" },
  { label: "Terms", href: "/terms-of-service" },
  { label: "Privacy", href: "/privacy-policy" },
];

const linkClass =
  "rounded-sm font-medium text-zinc-700 transition-colors hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring dark:text-zinc-300 dark:hover:text-zinc-50";
const socialClass =
  "inline-flex size-10 items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:text-zinc-400 dark:hover:bg-white/[0.06] dark:hover:text-zinc-50";

export function Footer() {
  return (
    <footer className="relative w-full border-t border-zinc-200/60 bg-white text-sm dark:border-white/[0.07] dark:bg-background">
      <div className={`mx-auto w-full ${landingGutterClass}`}>
        <LandingContent>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-12 pt-10 sm:pb-16 sm:pt-12">
            <Link href="/" className="group inline-flex h-8 items-center gap-1.5 rounded-md px-1 transition-colors duration-200 hover:bg-muted/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring dark:hover:bg-muted/40">
              <ComponentryLogomark className="size-5 text-zinc-900 transition-opacity group-hover:opacity-80 dark:text-white" />
              <span className="text-[16px] font-semibold font-display tracking-tight text-zinc-900 dark:text-white">COMPONENTRY</span>
            </Link>
            <nav aria-label="Social links" className="flex items-center gap-1">
              <a href="https://github.com/harshjdhv/componentry" target="_blank" rel="noreferrer" aria-label="Componentry on GitHub" className={socialClass}>
                <Github className="size-5" aria-hidden="true" />
              </a>
              <a href="https://linkedin.com/in/harshjdhv" target="_blank" rel="noreferrer" aria-label="Harsh Jadhav on LinkedIn" className={socialClass}>
                <Linkedin className="size-5" aria-hidden="true" />
              </a>
              <a href="https://x.com/harshjdhv" target="_blank" rel="noreferrer" aria-label="Harsh Jadhav on X" className={socialClass}>
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </nav>
          </div>

          <nav aria-labelledby="footer-components-heading" className="pb-10 sm:pb-14">
            <h2 id="footer-components-heading" className="mb-5 font-mono text-xs font-medium uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
              Components <span className="ml-1 tabular-nums">{componentLinks.length}</span>
            </h2>
            <ul className="grid grid-cols-2 gap-x-5 gap-y-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {componentLinks.map((component) => (
                <li key={component.slug} className="min-w-0">
                  <Link href={`/docs/components/${component.slug}`} className={`${linkClass} flex min-h-10 items-center py-2 leading-5`}>
                    {component.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-4 py-6 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              © {new Date().getFullYear()} Componentry. Built by{" "}
              <a href="https://harshjdhv.com" target="_blank" rel="noreferrer" className={linkClass}>Harsh Jadhav</a>.
            </p>
            <nav aria-label="Footer links" className="flex flex-wrap gap-x-5">
              {footerLinks.map((link) => (
                <Link key={link.label} href={link.href} {...(link.href.startsWith("https:") ? { target: "_blank", rel: "noreferrer" } : {})} className={`${linkClass} inline-flex min-h-10 items-center`}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </LandingContent>
      </div>
    </footer>
  );
}
