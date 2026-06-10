import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "A complete list of all pages available on thekavindu.lk.",
  keywords: ["Sitemap", "thekavindu.lk", "Kavindu Rasanjana", "All Pages"],
};

type SitemapLink = { label: string; href: string; description: string; external?: boolean };
type SitemapSection = { title: string; links: SitemapLink[] };

const sections: SitemapSection[] = [
  {
    title: "Main Pages",
    links: [
      { label: "Home", href: "/", description: "Portfolio overview, skills, and recent work." },
      { label: "About", href: "/about", description: "Background, experience, education, and certifications." },
      { label: "Projects", href: "/projects", description: "Selected real-world builds across web, mobile, and AI." },
      { label: "Services", href: "/services", description: "AI automation, web development, mobile apps, and integrations." },
      { label: "Blog", href: "/blog", description: "Articles on software development, AI, and automation." },
      { label: "Contact", href: "/contact", description: "Get in touch to discuss projects and collaborations." },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy", description: "How personal data is collected, used, and protected." },
      { label: "Terms & Conditions", href: "/terms", description: "Rules governing use of this website and professional services." },
    ],
  },
  {
    title: "Technical",
    links: [
      { label: "XML Sitemap", href: "/sitemap.xml", description: "Machine-readable sitemap for search engines.", external: true },
    ],
  },
];

export default function SitemapPage() {
  return (
    <main className="min-h-dvh space-y-10">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl">
          Sitemap
        </h1>
        <p className="max-w-2xl text-pretty text-muted-foreground md:text-lg">
          A complete list of all pages on{" "}
          <Link href="/" className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors">
            thekavindu.lk
          </Link>
          .
        </p>
      </div>

      <div className="space-y-10">
        {sections.map((section) => (
          <div key={section.title} className="space-y-4">
            <h2 className="text-lg font-semibold tracking-tight text-foreground border-b border-border pb-2">
              {section.title}
            </h2>
            <ul className="space-y-3">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="group flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4"
                  >
                    <span className="font-medium text-foreground group-hover:underline underline-offset-4 transition-colors min-w-[160px]">
                      {link.label}
                    </span>
                    <span className="text-sm text-muted-foreground">{link.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
