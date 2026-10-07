import Link from "next/link";
import { chapters, getChaptersByGroup } from "./chapters";

type ChapterNavProps = {
  activeSlug?: string;
  className?: string;
};

export function ChapterNav({ activeSlug, className = "" }: ChapterNavProps) {
  const groups = getChaptersByGroup();

  return (
    <nav aria-label="Handbook chapters" className={`flex flex-col gap-6 ${className}`}>
      <Link
        href="/security/handbook"
        className="text-xs font-semibold uppercase tracking-[0.2em] text-accent hover:underline hover:underline-offset-4"
      >
        &larr; All chapters
      </Link>

      {groups.map((entry) => (
        <div key={entry.group} className="flex flex-col gap-2">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground-muted">
            {entry.group}
          </h2>
          <ul className="flex flex-col gap-0.5">
            {entry.chapters.map((chapter) => {
              const isActive = chapter.slug === activeSlug;
              const number = chapters.indexOf(chapter) + 1;
              return (
                <li key={chapter.slug}>
                  <Link
                    href={`/security/handbook/${chapter.slug}`}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex gap-2.5 rounded-lg px-2.5 py-2 text-sm leading-snug transition-colors ${
                      isActive
                        ? "bg-hover text-foreground"
                        : "text-foreground-muted hover:bg-hover hover:text-foreground"
                    }`}
                  >
                    <span className="font-mono text-xs text-accent">{String(number).padStart(2, "0")}</span>
                    <span>{chapter.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
