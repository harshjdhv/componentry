"use client";

import { useEffect, useState } from "react";
import { usePlaygroundStore } from "@/hooks/use-playground-store";
import { CopyButton } from "@/components/copy-button";
import { ensureImportSpacing } from "@/lib/split-import";

interface LiveCodeBlockProps {
    defaultCode: string;
    lang?: string;
}

export function LiveCodeBlock({ defaultCode, lang = "tsx" }: LiveCodeBlockProps) {
    const spacedDefault = ensureImportSpacing(defaultCode);
    const { code } = usePlaygroundStore();
    const [displayCode, setDisplayCode] = useState(spacedDefault);
    const [html, setHtml] = useState("");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Seed the default only if a playground hasn't already pushed generated code.
        const store = usePlaygroundStore.getState();
        if (!store.code) store.setCode(spacedDefault);
    }, [spacedDefault]);

    useEffect(() => {
        if (code) {
            setDisplayCode(ensureImportSpacing(code));
        }
    }, [code]);

    useEffect(() => {
        let active = true;
        const fetchHtml = async () => {
            try {
                const response = await fetch("/api/docs/source", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ code: displayCode, lang }),
                });
                if (!response.ok) return;
                const data = await response.json();
                if (active && data.html) {
                    setHtml(data.html);
                }
            } catch (e) {
                console.error("Failed to fetch highlighted code", e);
            }
        };
        fetchHtml();
        return () => { active = false; };
    }, [displayCode, lang]);

    if (!isMounted) {
        return (
            <div className="relative text-sm w-full overflow-hidden rounded-xl bg-zinc-100/70 dark:bg-white/[0.035] min-h-[200px]">
                <div className="h-full flex items-center justify-center p-4">
                    <pre className="text-muted-foreground w-full overflow-x-auto whitespace-pre"><code>{spacedDefault}</code></pre>
                </div>
            </div>
        );
    }

    return (
        <div className="relative text-sm w-full overflow-hidden rounded-xl bg-zinc-100/70 dark:bg-white/[0.035] min-h-[200px] flex flex-col" data-code-block>
            <CopyButton code={displayCode.trim()} />
            <div
                className="flex-1 min-h-[200px] [&_pre]:p-4 [&_pre]:pr-12 [&_pre]:overflow-x-auto [&_pre]:!overflow-y-hidden [&_pre]:whitespace-pre [&_.shiki_[data-line]]:min-h-[1.25em] overflow-auto"
                dangerouslySetInnerHTML={{ __html: html || `<pre><code>${displayCode.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>` }}
            />
        </div>
    );
}
