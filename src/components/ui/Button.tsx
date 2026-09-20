import Link from "next/link";
import { type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "accent";

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
} & (
  | { href: string; onClick?: never; type?: never }
  | { href?: never; onClick: () => void; type?: "button" | "submit" }
);

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-button text-button-foreground hover:bg-button/90 border border-button",
  secondary:
    "bg-transparent text-foreground border border-line-strong hover:border-foreground/40 hover:bg-hover",
  ghost: "bg-transparent text-foreground-muted hover:text-foreground",
  accent:
    "bg-accent text-accent-foreground border border-accent hover:bg-accent/90 shadow-[0_10px_40px_-10px_rgb(var(--color-accent-rgb)/0.55)]",
};

export function Button({ href, onClick, children, variant = "primary", className = "", type = "button" }: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
