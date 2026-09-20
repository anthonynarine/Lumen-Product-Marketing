export const siteConfig = {
  name: "Lumen",
  tagline: "Clinical reporting. Imaging. AI-guided knowledge. One connected diagnostic workflow.",
  description:
    "Lumen is a configurable clinical diagnostic platform connecting structured reporting, DICOM imaging, AI-assisted clinical knowledge, interoperability, and billing preparation.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export type NavLink = {
  href: string;
  label: string;
};

export const primaryNavLinks: NavLink[] = [
  { href: "/product", label: "Product" },
  { href: "/imaging", label: "Imaging" },
  { href: "/ai", label: "AI Knowledge" },
  { href: "/interoperability", label: "Interoperability" },
  { href: "/security", label: "Security" },
  { href: "/about", label: "About Us" },
];

export const footerNavLinks: NavLink[] = [
  ...primaryNavLinks,
  { href: "/contact", label: "Contact" },
];

export const ctaLinks = {
  demo: { href: "/contact", label: "Request a Demo" },
  explore: { href: "/product", label: "Explore the Platform" },
  contact: { href: "/contact", label: "Contact Lumen" },
} as const;
