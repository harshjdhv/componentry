import { cn } from "@/lib/utils"

export interface DocsPropItem {
  name: string
  type: string
  default?: string
  description: string
}

interface DocsPropsTableProps {
  props: DocsPropItem[]
  className?: string
}

export function DocsPropsTable({ props, className }: DocsPropsTableProps) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className="w-full table-fixed border-collapse text-left">
        <colgroup>
          <col className="w-[28%]" />
          <col className="w-[47%]" />
          <col className="w-[25%]" />
        </colgroup>
        <thead>
          <tr className="border-b border-zinc-200/80 dark:border-white/[0.08]">
            <th className="pb-2.5 pr-3 text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400 dark:text-zinc-500">
              Prop
            </th>
            <th className="pb-2.5 pr-3 text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400 dark:text-zinc-500">
              Type
            </th>
            <th className="pb-2.5 text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400 dark:text-zinc-500">
              Default
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr
              key={prop.name}
              className="border-b border-zinc-100 last:border-b-0 dark:border-white/[0.05]"
            >
              <td className="py-2.5 pr-3 align-top">
                <code className="inline-flex max-w-full break-all rounded-md bg-zinc-100 px-1.5 py-0.5 font-mono text-[12.5px] font-medium text-zinc-800 dark:bg-white/[0.06] dark:text-zinc-200">
                  {prop.name}
                </code>
              </td>
              <td className="py-2.5 pr-3 align-top">
                <code className="block break-words font-mono text-[12.5px] leading-snug text-zinc-500 dark:text-zinc-400">
                  {prop.type}
                </code>
                <p className="mt-1.5 text-pretty text-[13px] leading-5 text-zinc-500 dark:text-zinc-400">
                  {prop.description}
                </p>
              </td>
              <td className="py-2.5 align-top">
                {prop.default ? (
                  <code className="block break-words font-mono text-[12.5px] leading-snug tabular-nums text-zinc-500 line-clamp-2 dark:text-zinc-400">
                    {prop.default}
                  </code>
                ) : (
                  <span className="text-[12.5px] text-zinc-300 dark:text-zinc-600">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
