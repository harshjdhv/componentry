"use client"

import * as React from "react"
import { CopyButton } from "@/components/copy-button"
import { useDocStore } from "@/hooks/use-doc-store"

interface DynamicCodeBlockProps {
  originalCode: string;
  defaultHtml: string;
  variantHtmls: string[];
  className?: string;
  variantCodes?: string[];
  variantTitles?: string[];
}

export function DynamicCodeBlock({
  originalCode,
  defaultHtml,
  variantHtmls,
  className,
  variantCodes = []
}: DynamicCodeBlockProps) {
  const { activeVariantIndex } = useDocStore()

  // Determine which HTML to show
  const htmlToRender = activeVariantIndex === -1
    ? defaultHtml
    : (variantHtmls[activeVariantIndex] || defaultHtml);

  // Determine which raw code to use for copy button
  const rawCodeToUse = activeVariantIndex === -1
    ? originalCode
    : (variantCodes[activeVariantIndex] || originalCode);

  return (
    <div
      className={`relative text-sm w-full border border-border overflow-hidden bg-zinc-100 dark:bg-[#191919] ${className?.includes('h-full') ? 'flex flex-col ' : ''}${className || "rounded-xl"}`}
    >
      <style>{`
        .shiki {
          counter-reset: line;
        }
        .shiki code {
          display: grid;
        }
        /* Hide line numbers as requested for Usage block */
        .shiki [data-line]::before {
          content: none;
          display: none;
        }
        .shiki,
        .shiki span {
          background-color: transparent !important;
        }
        .dark .shiki,
        .dark .shiki span {
          color: var(--shiki-dark) !important;
          background-color: transparent !important;
        }
        
        /* Hide scrollbars for the tab header */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>



      <div className={`relative group ${className?.includes('h-full') ? 'flex-1 min-h-0 flex flex-col' : 'h-full'}`}>
        <CopyButton code={rawCodeToUse.trim()} />
        <div
          className={`[&_pre]:p-4 [&_pre]:overflow-x-auto overflow-auto ${className?.includes('max-h-none') ? (className?.includes('h-full') ? 'flex-1 min-h-0' : 'h-full') : 'max-h-[500px]'}`}
          dangerouslySetInnerHTML={{ __html: htmlToRender }}
        />
      </div>
    </div>
  );
}
