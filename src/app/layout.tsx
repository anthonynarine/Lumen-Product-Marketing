import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NavBar } from "@/components/navigation/NavBar";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/lib/constants";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Lumen | Clinical Diagnostic Reporting, Imaging & Workflow",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "clinical diagnostic reporting",
    "vascular ultrasound software",
    "DICOM imaging platform",
    "structured medical reporting",
    "HL7 interoperability",
    "clinical AI knowledge assistant",
  ],
  openGraph: {
    title: "Lumen | Clinical Diagnostic Reporting, Imaging & Workflow",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumen | Clinical Diagnostic Reporting, Imaging & Workflow",
    description: siteConfig.description,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          // Runs before paint to avoid a flash of the wrong theme for returning
          // light-mode visitors. Dark is the default when nothing is stored.
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('lumen-theme');if(t==='light'){document.documentElement.setAttribute('data-theme','light');}}catch(e){}`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-ink text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
        >
          Skip to main content
        </a>
        <NavBar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
