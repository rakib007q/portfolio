import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { siteConfig } from "@/config/site.config";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const title = `${siteConfig.name} — Web Developer & SEO Professional`;
const description =
  "Rakibul Hasan builds fast, modern websites and helps businesses grow on Google. Web development, SEO, ecommerce and dropshipping store setup.";

export const viewport: Viewport = {
  themeColor: "#070B10",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: title,
    template: `%s | ${siteConfig.name}`,
  },
  description,
  keywords: [
    ...siteConfig.keywords,
    ...(siteConfig.locationKeyword ? [siteConfig.locationKeyword] : []),
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.siteUrl }],
  creator: siteConfig.name,
  alternates: { canonical: siteConfig.siteUrl },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    title,
    description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Rakibul Hasan — Web Developer & SEO Professional",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
  ...(siteConfig.googleSiteVerification
    ? { verification: { google: siteConfig.googleSiteVerification } }
    : {}),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: siteConfig.name,
      jobTitle: "Web Developer & SEO Professional",
      email: siteConfig.email,
      url: siteConfig.siteUrl,
      knowsAbout: [
        "Web Development",
        "SEO",
        "Ecommerce",
        "Dropshipping",
        "Next.js",
      ],
    },
    {
      "@type": "ProfessionalService",
      name: `${siteConfig.name} — Web Development & SEO`,
      url: siteConfig.siteUrl,
      email: siteConfig.email,
      description,
      areaServed: siteConfig.locationKeyword || "Worldwide",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: [
          "Custom Website Development",
          "Ecommerce Website Build",
          "SEO (on-page, technical, local)",
          "Website Speed Optimization",
          "Dropshipping Store Setup",
        ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${sora.variable} ${inter.variable} antialiased bg-[#070B10] text-[#E6EDF3]`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-[#14E3C6] focus:px-4 focus:py-2 focus:text-[#070B10] focus:font-semibold"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
