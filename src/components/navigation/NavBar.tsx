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
          className="flex items-center text-sm font-bold uppercase tracking-[0.28em] text-foreground"
          onClick={() => setIsOpen(false)}
          style={{
            animationName: "soft-pop",
            animationDuration: "1400ms",
            animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            animationFillMode: "both",
          }}
        >
          {siteConfig.name}
          <span className="text-accent">.</span>
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          <nav aria-label="Primary" className="flex items-center gap-8">
            {primaryNavLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`text-sm font-medium transition-colors ${
                    isActive ? "text-foreground" : "text-foreground-muted hover:text-foreground"
                  }`}
                  style={{
                    animationName: "soft-pop",
                    animationDuration: "1400ms",
                    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    animationFillMode: "both",
                    animationDelay: `${260 + index * 110}ms`,
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div
              style={{
                animationName: "soft-pop",
                animationDuration: "1400ms",
                animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                animationFillMode: "both",
                animationDelay: `${260 + primaryNavLinks.length * 110}ms`,
              }}
            >
              <ThemeToggle />
            </div>
            <div
              style={{
                animationName: "soft-pop",
                animationDuration: "1400ms",
                animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                animationFillMode: "both",
                animationDelay: `${260 + primaryNavLinks.length * 110 + 110}ms`,
              }}
            >
              <Button href={ctaLinks.demo.href} variant="accent" className="px-4 py-2 text-sm">
                {ctaLinks.demo.label}
              </Button>
            </div>
          </div>
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
            variant="accent"
            className="mt-4 w-full"
          >
            {ctaLinks.demo.label}
          </Button>
        </nav>
      ) : null}
    </header>
  );
}
