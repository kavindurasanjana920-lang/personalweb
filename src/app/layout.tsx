import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LoadingScreen } from "@/components/loading-screen";
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
        url: DATA.avatarUrl,
        width: 800,
        height: 600,
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
    images: [DATA.avatarUrl],
  },
  verification: {
    google: "V0-lY22n-zS1L8X1I60h_D_T-X_H1H_-P9lX-m-z-10", // Replace this with your actual Google Verification Tag if needed.
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
        <link rel="preload" href={DATA.avatarUrl} as="image" fetchPriority="high" />
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
        <LoadingScreen />
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
              <footer className="mt-10 space-y-2 text-center text-xs text-muted-foreground/60">
                <div className="flex items-center justify-center gap-3">
                  <a href="/privacy" className="hover:text-muted-foreground transition-colors">Privacy Policy</a>
                  <span aria-hidden="true">&middot;</span>
                  <a href="/terms" className="hover:text-muted-foreground transition-colors">Terms &amp; Conditions</a>
                  <span aria-hidden="true">&middot;</span>
                  <a href="/sitemap.xml" className="hover:text-muted-foreground transition-colors">Sitemap</a>
                </div>
                <div>
                  <span className="hidden sm:inline">&copy; {new Date().getFullYear()} {DATA.name} &middot; thekavindu.lk &middot; All rights reserved.</span>
                  <span className="sm:hidden">&copy; {new Date().getFullYear()} {DATA.name} &middot; All rights reserved.</span>
                </div>
              </footer>
            </div>
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
