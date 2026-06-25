import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FlickeringGridClient } from "@/components/flickering-grid-client";
import { CookieConsent } from "@/components/cookie-consent";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  keywords: [
    "Kavindu Rasanjana",
    "Kavindu",
    "Rasanjana",
    "Software Automation Engineer",
    "AI Engineer",
    "Machine Learning Engineer",
    "AI & ML Engineer",
    "Software Developer",
    "Software Engineer",
    "Workflow Automation",
    "AI Automation",
    "Best Portfolio",
    "Sri Lanka No 1 Software Engineer",
    "Sri Lanka No 1 AI Engineer",
    "Full Stack Developer",
    "AI Systems",
    "Next.js Developer",
    "React Developer",
    "Portfolio",
    "Sri Lanka",
    "Software Engineer"
  ],
  authors: [{ name: DATA.name, url: DATA.url }],
  creator: DATA.name,
  openGraph: {
    title: `${DATA.name} | Software Automation Engineer`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    images: [
      {
        url: "/kavindu-hero-light.webp",
        width: 1200,
        height: 630,
        alt: `${DATA.name} - Software Automation Engineer`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name} | Software Automation Engineer`,
    card: "summary_large_image",
    description: DATA.description,
    images: ["/kavindu-hero-light.webp"],
  },
  verification: {
    google: "nXCd38fL4hknFmhA4rdoFp88qv8WeB9dCmeVF9ZZi2A",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="alternate" type="application/rss+xml" title={`${DATA.name} — Blog`} href="/rss.xml" />
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-W83VHS8G');
            `,
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased relative",
          geist.variable,
          geistMono.variable
        )}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W83VHS8G"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <CookieConsent />
        <ThemeProvider attribute="class" defaultTheme="dark">
          <TooltipProvider delayDuration={0}>
            <div className="absolute inset-0 top-0 left-0 right-0 h-[100px] overflow-hidden z-0">
              <FlickeringGridClient
                className="h-full w-full"
                squareSize={2}
                gridGap={2}
                style={{
                  maskImage: "linear-gradient(to bottom, black, transparent)",
                  WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
                }}
              />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto py-12 pb-24 sm:py-24 px-6">
              {children}
              <footer className="mt-10 space-y-3 text-center text-xs text-muted-foreground/60">
                <div className="flex items-center justify-center gap-3">
                  <a href="/privacy" className="hover:text-muted-foreground transition-colors">Privacy Policy</a>
                  <span aria-hidden="true">&middot;</span>
                  <a href="/terms" className="hover:text-muted-foreground transition-colors">Terms &amp; Conditions</a>
                  <span aria-hidden="true">&middot;</span>
                  <a href="/help" className="hover:text-muted-foreground transition-colors">Help</a>
                  <span aria-hidden="true">&middot;</span>
                  <a href="/site-map" className="hover:text-muted-foreground transition-colors">Sitemap</a>
                </div>
                <div>
                  <span className="hidden sm:inline">&copy; {new Date().getFullYear()} {DATA.name} &middot; thekavindu.lk &middot; All rights reserved.</span>
                  <span className="sm:hidden">&copy; {new Date().getFullYear()} {DATA.name} &middot; All rights reserved.</span>
                </div>
              </footer>
            </div>
            {/* Fixed left-side badge — all screen sizes */}
            <a
              href="https://ebadge.bestweb.lk/api/v1/clicked/thekavindu.lk/TopWeb/2026-June/Qualified"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TopWeb.LK Winner Badge"
              className="fixed left-3 bottom-20 z-20 opacity-90 hover:opacity-100 transition-opacity lg:bottom-8 lg:left-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://ebadge.bestweb.lk/eBadgeSystem/domainNames/thekavindu.lk/TopWeb/2026-June/Qualified/image.png"
                alt="TopWeb.LK Winner 2026"
                width={80}
                height={80}
                className="w-[75px] h-[75px] lg:w-[90px] lg:h-[90px]"
              />
            </a>
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
