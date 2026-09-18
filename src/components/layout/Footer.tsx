import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { footerNavLinks, siteConfig } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink">
      <Container className="flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <span aria-hidden="true" className="inline-block h-2.5 w-2.5 rounded-full bg-accent" />
            {siteConfig.name}
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
            {siteConfig.description}
          </p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-3 sm:flex sm:gap-10">
          {footerNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-foreground-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-line py-6 text-xs text-foreground-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {year} {siteConfig.name}. All rights reserved.
        </p>
        <p>
          This site is informational only and does not process, store, or transmit protected
          health information (PHI).
        </p>
      </Container>
    </footer>
  );
}
