"use client";

import * as React from "react";
import {
  Check,
  ChevronRight,
  Copy,
  FileCode2,
  FileJson,
  FileText,
  Folder,
  FolderOpen,
  Monitor,
  Smartphone,
  Tablet,
  Terminal,
} from "lucide-react";

import type {
  BlockRegistryItem,
  FileTree,
  HighlightedBlockFile,
} from "@/lib/blocks/types";
import { cn } from "@/lib/utils";

type View = "preview" | "code";
type Size = "mobile" | "tablet" | "desktop";

const sizeClass: Record<Size, string> = {
  mobile: "max-w-[390px]",
  tablet: "max-w-[768px]",
  desktop: "max-w-full",
};

const sizeIcons = {
  mobile: Smartphone,
  tablet: Tablet,
  desktop: Monitor,
};

const viewerToolbarRail = "relative mx-auto w-full max-w-[1360px] px-4 md:px-3";
const viewerBodyRail = "relative mx-auto w-full max-w-[1360px] px-4 md:px-3";

function copyText(text: string) {
  return navigator.clipboard.writeText(text);
}

function getRegistryItemNamespace(item: string) {
  return `@componentry/${item}`;
}

function getFileName(path: string) {
  return path.split("/").filter(Boolean).at(-1) ?? path;
}

function getFileFolder(path: string) {
  const parts = path.split("/").filter(Boolean);
  return parts.length > 1 ? parts.slice(0, -1).join("/") : "root";
}

function FileIcon({ file }: { file: string }) {
  const extension = file.split(".").at(-1);
  const iconClassName = "size-4 shrink-0 text-current opacity-70";

  if (extension === "json") {
    return <FileJson className={iconClassName} />;
  }

  if (extension === "css" || extension === "md" || extension === "mdx") {
    return <FileText className={iconClassName} />;
  }

  return <FileCode2 className={iconClassName} />;
}

function FullScreenIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M15.5 21C16.8956 21 17.5933 21 18.1611 20.8278C19.4395 20.44 20.44 19.4395 20.8278 18.1611C21 17.5933 21 16.8956 21 15.5M21 8.5C21 7.10444 21 6.40666 20.8278 5.83886C20.44 4.56046 19.4395 3.56004 18.1611 3.17224C17.5933 3 16.8956 3 15.5 3M8.5 21C7.10444 21 6.40666 21 5.83886 20.8278C4.56046 20.44 3.56004 19.4395 3.17224 18.1611C3 17.5933 3 16.8956 3 15.5M3 8.5C3 7.10444 3 6.40666 3.17224 5.83886C3.56004 4.56046 4.56046 3.56004 5.83886 3.17224C6.40666 3 7.10444 3 8.5 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RefreshIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M20.4879 15C19.2524 18.4956 15.9187 21 12 21C7.02943 21 3 16.9706 3 12C3 7.02943 7.02943 3 12 3C15.7292 3 18.9286 5.26806 20.2941 8.5" />
      <path d="M15 9H18C19.4142 9 20.1213 9 20.5607 8.56066C21 8.12132 21 7.41421 21 6V3" />
    </svg>
  );
}

function CopyIconButton({
  text,
  label,
  className,
}: {
  text: string;
  label: string;
  className?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  return (
    <button
      type="button"
      aria-label={copied ? "Copied" : label}
      title={copied ? "Copied" : label}
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground",
        className,
      )}
      onClick={async () => {
        await copyText(text);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1400);
      }}
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
    </button>
  );
}

function CopyCommandButton({ command }: { command: string }) {
  const [copied, setCopied] = React.useState(false);
  const registryItem = command.replace("npx shadcn@latest add ", "");

  return (
    <button
      type="button"
      className="inline-flex h-8 w-fit items-center gap-1.5 rounded-md border border-line bg-background px-2 font-mono text-[0.8125rem] font-normal text-foreground transition hover:bg-muted"
      onClick={async () => {
        await copyText(command);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1400);
      }}
    >
      {copied ? (
        <Check className="size-4 text-muted-foreground" />
      ) : (
        <Terminal className="size-4 text-muted-foreground" />
      )}
      <span className="hidden sm:inline">
        <span className="text-muted-foreground">npx shadcn add</span>{" "}
        {registryItem}
      </span>
      <span className="sm:hidden">Install</span>
    </button>
  );
}

export function BlockViewer({
  item,
  tree,
  highlightedFiles,
}: {
  item: BlockRegistryItem;
  tree: FileTree[];
  highlightedFiles: HighlightedBlockFile[];
}) {
  const [view, setView] = React.useState<View>("preview");
  const [size, setSize] = React.useState<Size>("desktop");
  const [iframeKey, setIframeKey] = React.useState(0);
  const [activeFile, setActiveFile] = React.useState(
    highlightedFiles[0]?.target ?? "",
  );

  const file =
    highlightedFiles.find((candidate) => candidate.target === activeFile) ??
    highlightedFiles[0];
  const activeFileName = file ? getFileName(file.target) : "";
  const activeFileFolder = file ? getFileFolder(file.target) : "";
  const installCommand = `npx shadcn@latest add ${getRegistryItemNamespace(item.name)}`;
  const previewUrl = `/preview/${item.name}`;

  return (
    <section
      id={item.name}
      className="scroll-mt-20 overflow-x-clip bg-background"
    >
      <div>
        <div className={viewerToolbarRail}>
          <div className="flex w-full flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-line bg-background px-3 py-2">
            <SegmentedControl
              value={view}
              items={[
                { value: "preview", label: "Preview" },
                { value: "code", label: "Code" },
              ]}
              onValueChange={(value) => setView(value as View)}
            />

            <div className="ml-auto flex min-w-0 flex-wrap items-center gap-2">
              <div className="flex h-8 items-center rounded-md border border-line bg-background p-0.5">
                {(["mobile", "tablet", "desktop"] as const).map((value) => {
                  const Icon = sizeIcons[value];
                  return (
                    <button
                      key={value}
                      type="button"
                      aria-label={`${value} preview`}
                      title={`${value} preview`}
                      className={cn(
                        "inline-flex size-6 items-center justify-center rounded-sm text-muted-foreground transition hover:text-foreground",
                        size === value && "bg-muted text-foreground",
                      )}
                      onClick={() => {
                        setView("preview");
                        setSize(value);
                      }}
                    >
                      <Icon className="size-4" />
                    </button>
                  );
                })}
                <div className="mx-0.5 h-4 w-px bg-line" />
                <button
                  type="button"
                  aria-label="Open preview in new tab"
                  title="Open preview in new tab"
                  className="inline-flex size-6 items-center justify-center rounded-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  onClick={() =>
                    window.open(previewUrl, "_blank", "noopener,noreferrer")
                  }
                >
                  <FullScreenIcon className="size-4" />
                </button>
                <div className="mx-0.5 h-4 w-px bg-line" />
                <button
                  type="button"
                  aria-label="Refresh preview"
                  title="Refresh preview"
                  className="inline-flex size-6 items-center justify-center rounded-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  onClick={() => {
                    setView("preview");
                    setIframeKey((key) => key + 1);
                  }}
                >
                  <RefreshIcon className="size-4" />
                </button>
              </div>

              <div className="mx-1 hidden h-4 w-px bg-line lg:block" />

              <CopyCommandButton command={installCommand} />
            </div>
          </div>
        </div>

        {view === "preview" ? (
          <div className={viewerBodyRail}>
            <div
              className={cn(
                "overflow-hidden rounded-b-xl border border-line bg-muted/20",
                size !== "desktop" &&
                  "bg-[radial-gradient(circle,var(--color-line)_1px,transparent_1px)] [background-size:16px_16px]",
              )}
            >
              <div
                className={cn(
                  "relative mx-auto max-w-full overflow-hidden bg-background transition-[max-width] duration-300",
                  sizeClass[size],
                  size !== "desktop" && "my-2 rounded-xl border border-line",
                )}
              >
                <iframe
                  key={iframeKey}
                  src={previewUrl}
                  title={`${item.title} preview`}
                  className="block w-full border-0 bg-background"
                  style={{ height: item.meta?.iframeHeight ?? 780 }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        ) : file ? (
          <div className={viewerBodyRail}>
            <div
              data-block-code-viewer
              className="grid gap-2 overflow-hidden rounded-b-xl border border-line bg-zinc-100 p-2 dark:bg-[#09090b] lg:h-[720px] lg:grid-cols-[288px_minmax(0,1fr)]"
            >
              <div className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-black/[0.08] bg-zinc-50 p-1 dark:border-white/[0.08] dark:bg-[#18181b] max-lg:max-h-64">
                <div className="flex h-10 shrink-0 items-center gap-2 px-3 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  <Folder className="size-4" />
                  Files
                </div>

                <div className="min-h-0 flex-1 overflow-auto rounded-md border border-black/[0.08] bg-white py-1 dark:border-white/[0.08] dark:bg-[#09090b]">
                  {tree.map((item) => (
                    <FileTreeNode
                      key={item.path ?? item.name}
                      item={item}
                      depth={0}
                      activeFile={file.target}
                      onSelect={setActiveFile}
                    />
                  ))}
                </div>
              </div>

              <figure className="my-0 flex min-w-0 flex-col overflow-hidden rounded-lg border border-black/[0.08] bg-zinc-50 p-1 text-zinc-800 dark:border-white/[0.08] dark:bg-[#18181b] dark:text-zinc-200 max-lg:h-[560px]">
                <figcaption className="relative flex h-10 shrink-0 items-center gap-3 px-3 pr-11 font-mono text-sm text-zinc-600 dark:text-zinc-400">
                  <FileIcon file={file.target} />
                  <span className="min-w-0 truncate text-zinc-800 dark:text-zinc-300">
                    {activeFileName}
                  </span>
                  <span className="hidden min-w-0 truncate text-xs text-zinc-400 sm:block dark:text-zinc-500">
                    {activeFileFolder}
                  </span>
                  <CopyIconButton
                    text={file.content ?? ""}
                    label="Copy file"
                    className="absolute right-1.5 size-7 text-zinc-500 hover:bg-black/[0.05] hover:text-zinc-900 dark:hover:bg-white/[0.08] dark:hover:text-zinc-200"
                  />
                </figcaption>

                <div
                  data-code-block
                  data-block-code-panel
                  data-line-numbers="true"
                  className="min-h-0 flex-1 overflow-hidden rounded-md border border-black/[0.08] bg-white text-sm [--block-code-bg:#fff] [--code-number:rgba(113,113,122,0.55)] dark:border-white/[0.08] dark:bg-[#09090b] dark:[--block-code-bg:#09090b] dark:[--code-number:rgba(161,161,170,0.42)] [&_.shiki]:h-full [&_code]:min-w-full [&_pre]:h-full [&_pre]:overflow-auto [&_pre]:py-4"
                >
                  <div
                    key={file.target}
                    className="h-full [&_.shiki_[data-line]]:pr-4 [&_.shiki_[data-line]]:pl-4"
                    dangerouslySetInnerHTML={{
                      __html: file.highlightedContent,
                    }}
                  />
                </div>
              </figure>
            </div>
          </div>
        ) : (
          <div className={viewerBodyRail}>
            <div className="flex min-h-80 items-center justify-center rounded-b-xl border border-line bg-background text-sm text-muted-foreground">
              No files available.
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function FileTreeNode({
  item,
  depth,
  activeFile,
  onSelect,
}: {
  item: FileTree;
  depth: number;
  activeFile: string;
  onSelect: (file: string) => void;
}) {
  const [open, setOpen] = React.useState(true);

  if (item.children?.length) {
    const FolderIcon = open ? FolderOpen : Folder;

    return (
      <div>
        <button
          type="button"
          className="flex h-9 w-full min-w-0 items-center gap-2 px-3 text-left font-mono text-sm text-zinc-700 transition hover:bg-black/[0.05] hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/[0.06] dark:hover:text-zinc-100"
          style={{ paddingLeft: `${0.75 + depth * 0.85}rem` }}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <ChevronRight
            className={cn(
              "size-3.5 shrink-0 text-zinc-400 transition-transform dark:text-zinc-500",
              open && "rotate-90",
            )}
          />
          <FolderIcon className="size-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
          <span className="truncate">{item.name}</span>
        </button>
        {open &&
          item.children.map((child) => (
            <FileTreeNode
              key={child.path ?? `${item.name}/${child.name}`}
              item={child}
              depth={depth + 1}
              activeFile={activeFile}
              onSelect={onSelect}
            />
          ))}
      </div>
    );
  }

  const isActive = item.path === activeFile;

  return (
    <button
      type="button"
      title={item.path}
      className={cn(
        "group flex h-9 w-full min-w-0 items-center gap-2 px-3 text-left font-mono text-sm text-zinc-500 transition-[background-color,color]",
        "hover:bg-black/[0.05] hover:text-zinc-900 dark:hover:bg-white/[0.06] dark:hover:text-zinc-200",
        isActive &&
          "bg-zinc-100 text-zinc-900 dark:bg-[#1d1d20] dark:text-zinc-200",
      )}
      style={{ paddingLeft: `${0.75 + depth * 0.85}rem` }}
      onClick={() => item.path && onSelect(item.path)}
    >
      <FileIcon file={item.path ?? item.name} />
      <span className="min-w-0 flex-1 truncate">{item.name}</span>
    </button>
  );
}

function SegmentedControl({
  value,
  items,
  onValueChange,
}: {
  value: string;
  items: Array<{ value: string; label: string }>;
  onValueChange: (value: string) => void;
}) {
  return (
    <div className="flex h-8 items-center gap-0.5 rounded-md border border-line bg-muted/35 p-0.5">
      {items.map((item) => {
        return (
          <button
            key={item.value}
            type="button"
            className={cn(
              "inline-flex h-6 items-center justify-center rounded-sm px-2.5 text-sm font-medium text-muted-foreground transition-[color,background-color,box-shadow] hover:text-foreground",
              value === item.value &&
                "bg-foreground/[0.07] text-foreground shadow-sm ring-1 ring-line",
            )}
            onClick={() => onValueChange(item.value)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
