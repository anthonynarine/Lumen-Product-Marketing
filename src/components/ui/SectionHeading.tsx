import { type ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";
  const mutedClass = tone === "dark" ? "text-foreground-muted" : "text-ink/60";
  const titleClass = tone === "dark" ? "text-foreground" : "text-ink";

  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${alignClass} ${className}`}>
      {eyebrow ? (
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </span>
      ) : null}
      <h2 className={`text-3xl font-semibold tracking-tight sm:text-4xl ${titleClass}`}>
        {title}
      </h2>
      {description ? (
        <p className={`text-base leading-relaxed sm:text-lg ${mutedClass}`}>{description}</p>
      ) : null}
    </div>
  );
}
