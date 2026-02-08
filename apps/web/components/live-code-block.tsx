"use client";

import { useEffect, useState } from "react";
import { usePlaygroundStore } from "@/hooks/use-playground-store";
import { CodeBlock } from "@/components/code-block";

interface LiveCodeBlockProps {
    defaultCode: string;
    lang?: string;
}

export function LiveCodeBlock({ defaultCode, lang = "tsx" }: LiveCodeBlockProps) {
    const { code } = usePlaygroundStore();
    const [displayCode, setDisplayCode] = useState(defaultCode);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Initialize store with default if empty
        usePlaygroundStore.getState().setCode(defaultCode);
    }, [defaultCode]);

    useEffect(() => {
        if (code) {
            setDisplayCode(code);
        }
    }, [code]);

    if (!isMounted) {
        return <CodeBlock code={defaultCode} lang={lang} />;
    }

    return (
        <div className="relative group transition-all duration-300 min-h-[200px] border border-border rounded-lg overflow-hidden bg-zinc-950">
            <div className="absolute top-0 right-0 p-2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-black/50 backdrop-blur-sm rounded-bl-lg border-l border-b border-border">
                Real-time
            </div>
            <CodeBlock code={displayCode} lang={lang} className="min-h-[200px]" />
        </div>
    );
}
