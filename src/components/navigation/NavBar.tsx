"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ctaLinks, primaryNavLinks, siteConfig } from "@/lib/constants";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/85 backdrop-blur supports-[backdrop-filter]:bg-ink/70">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground"
          onClick={() => setIsOpen(false)}
        >
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 rounded-full bg-accent"
          />
          {siteConfig.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {primaryNavLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`text-sm font-medium transition-colors ${
                  isActive ? "text-foreground" : "text-foreground-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Button href={ctaLinks.demo.href} variant="primary" className="px-5 py-2.5">
            {ctaLinks.demo.label}
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-foreground"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span aria-hidden="true" className="relative block h-3 w-4">
              <span
                className={`absolute left-0 top-0 h-0.5 w-4 bg-current transition-transform ${
                  isOpen ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-4 bg-current transition-opacity ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-3 h-0.5 w-4 bg-current transition-transform ${
                  isOpen ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </Container>

      {isOpen ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-line bg-ink px-4 pb-6 pt-2 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {primaryNavLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-foreground-muted hover:bg-hover hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button
            href={ctaLinks.demo.href}
            variant="primary"
            className="mt-4 w-full"
          >
            {ctaLinks.demo.label}
          </Button>
        </nav>
      ) : null}
    </header>
  );
}
