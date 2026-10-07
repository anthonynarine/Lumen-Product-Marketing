import type { Block } from "./types";

type ChapterBodyProps = {
  body: Block[];
};

export function ChapterBody({ body }: ChapterBodyProps) {
  return (
    <div className="flex flex-col gap-6">
      {body.map((block, index) => (
        <BlockRenderer key={index} block={block} />
      ))}
    </div>
  );
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.kind) {
    case "lede":
      return (
        <p className="text-base leading-relaxed text-foreground sm:text-lg">{block.text}</p>
      );

    case "p":
      return <p className="text-sm leading-7 text-foreground-muted sm:text-base">{block.text}</p>;

    case "h":
      return (
        <h2 className="mt-4 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          {block.text}
        </h2>
      );

    case "list":
      return (
        <ul className="flex flex-col gap-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-7 text-foreground-muted sm:text-base">
              <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "steps":
      return (
        <ol className="flex flex-col gap-4">
          {block.items.map((item, index) => (
            <li key={item} className="flex gap-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-ink-elevated font-mono text-xs text-accent">
                {index + 1}
              </span>
              <span className="text-sm leading-7 text-foreground-muted sm:text-base">{item}</span>
            </li>
          ))}
        </ol>
      );

    case "pair":
      return (
        <dl className="overflow-hidden rounded-xl border border-line-strong">
          {block.items.map((item, index) => (
            <div
              key={item.term}
              className={`flex flex-col gap-1 px-5 py-4 sm:px-6 ${index > 0 ? "border-t border-line" : ""}`}
            >
              <dt className="text-sm font-semibold text-foreground">{item.term}</dt>
              <dd className="text-sm leading-relaxed text-foreground-muted">{item.detail}</dd>
            </div>
          ))}
        </dl>
      );

    case "quote":
      return (
        <blockquote className="border-l-2 border-accent pl-5 text-base font-medium leading-relaxed text-foreground sm:text-lg">
          {block.text}
        </blockquote>
      );

    case "table":
      return (
        <div className="overflow-x-auto rounded-xl border border-line-strong">
          <table className="w-full min-w-[32rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-line-strong bg-ink-elevated">
                {block.head.map((heading) => (
                  <th
                    key={heading}
                    scope="col"
                    className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-accent"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]} className="border-b border-line last:border-b-0">
                  <th scope="row" className="px-5 py-3 text-sm font-medium text-foreground">
                    {row[0]}
                  </th>
                  <td className="px-5 py-3 text-sm leading-relaxed text-foreground-muted">{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "split":
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          {[block.left, block.right].map((column) => (
            <div key={column.title} className="rounded-xl border border-line-strong bg-ink-card p-5 sm:p-6">
              <h3 className="text-sm font-semibold text-foreground">{column.title}</h3>
              <ul className="mt-3 flex flex-col gap-2">
                {column.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-foreground-muted">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );

    case "note":
      return (
        <aside className="rounded-xl border border-line-strong bg-ink-card p-5 sm:p-6">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{block.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{block.text}</p>
        </aside>
      );
  }
}
