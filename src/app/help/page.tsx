import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  Code2,
  FileText,
  HelpCircle,
  LayoutGrid,
  Mail,
  MessageSquare,
  Rocket,
  User,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Help",
  description:
    "Find answers to common questions about Kavindu Rasanjana's portfolio, services, projects, and how to get in touch.",
  keywords: [
    "Help",
    "FAQ",
    "Kavindu Rasanjana Help",
    "Portfolio FAQ",
    "Software Engineer FAQ",
    "Contact Kavindu",
  ],
};

const faqs = [
  {
    q: "What services do you offer?",
    a: "I specialise in AI automation, workflow automation (Make.com, n8n, Zapier), full-stack web development (Next.js, Laravel), and mobile app development. Head to the Services page for a full breakdown.",
  },
  {
    q: "How can I hire you for a project?",
    a: "The quickest way is to visit the Contact page and fill in the form with your project details, goals, and rough timeline. I reply within 1–2 business days.",
  },
  {
    q: "Where can I see your previous work?",
    a: "The Projects page showcases selected products and real-world builds, including links to live demos and source code where available.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes — I work with clients globally. All communication is in English and I'm comfortable with async collaboration across time zones.",
  },
  {
    q: "What technologies do you work with?",
    a: "On the frontend: Next.js, React, TypeScript, Tailwind CSS. Backend: Laravel (PHP), Node.js. Mobile: React Native. AI/ML: Python, LangChain, OpenAI APIs. DevOps: Docker, nginx, DigitalOcean.",
  },
  {
    q: "How do I read your blog articles?",
    a: "Visit the Blog page to see all published articles. Click any title to open the full post. Articles cover software development, AI, automation, and engineering topics.",
  },
  {
    q: "Can I subscribe to updates?",
    a: "Yes — scroll to the bottom of any page to find the newsletter subscribe form. Enter your email to get notified when new articles or projects are published.",
  },
  {
    q: "Where is the sitemap?",
    a: "A human-readable sitemap listing all pages is available at /site-map. A machine-readable XML version is at /sitemap.xml.",
  },
];

const quickLinks = [
  { label: "Services", href: "/services", icon: Rocket, description: "View automation, AI, and development offerings" },
  { label: "Projects", href: "/projects", icon: LayoutGrid, description: "Explore selected products and builds" },
  { label: "Blog", href: "/blog", icon: BookOpen, description: "Read articles on software and AI" },
  { label: "About", href: "/about", icon: User, description: "Learn about my background and skills" },
  { label: "Contact", href: "/contact", icon: Mail, description: "Get in touch for project inquiries" },
  { label: "Sitemap", href: "/site-map", icon: FileText, description: "Browse all pages on this site" },
];

export default function HelpPage() {
  return (
    <section id="help" className="space-y-14">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-1 text-sm text-muted-foreground">
          <HelpCircle className="size-3.5" />
          Help Centre
        </div>
        <h1 className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl">
          How can I help?
        </h1>
        <p className="max-w-2xl text-pretty text-muted-foreground md:text-lg">
          Find answers to common questions, navigate the site, or reach out directly.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
          <LayoutGrid className="size-4 text-muted-foreground" />
          Quick Links
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {quickLinks.map(({ label, href, icon: Icon, description }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-start gap-3 rounded-xl border border-border bg-card/40 p-4 transition-colors hover:bg-card"
            >
              <div className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-foreground text-background">
                <Icon className="size-3.5" />
              </div>
              <div>
                <p className="font-medium group-hover:text-foreground transition-colors">{label}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
          <MessageSquare className="size-4 text-muted-foreground" />
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map(({ q, a }, i) => (
            <AccordionItem key={q} value={`faq-${i}`}>
              <AccordionTrigger className="text-left font-semibold">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="rounded-xl border border-border bg-card/30 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-foreground text-background">
          <Code2 className="size-4" />
        </div>
        <div className="flex-1">
          <p className="font-semibold">Still have questions?</p>
          <p className="text-sm text-muted-foreground mt-0.5">
            Can&apos;t find what you&apos;re looking for? Send me a message and I&apos;ll get back to you.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-80 shrink-0"
        >
          <Mail className="size-3.5" />
          Contact Me
        </Link>
      </div>

    </section>
  );
}
