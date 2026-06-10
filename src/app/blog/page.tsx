import BlogApiShell from "@/components/blog/blog-api-shell";
import ContactSection from "@/components/section/contact-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles and insights by Kavindu Rasanjana on software development, AI automation, engineering workflows, and tech.",
  keywords: [
    "Kavindu Rasanjana Blog",
    "Software Development Articles",
    "AI Engineering",
    "Automation Blog",
    "Tech Blog",
    "Next.js",
    "Sri Lanka Tech",
  ],
  openGraph: {
    title: "Blog",
    description:
      "Articles and insights by Kavindu Rasanjana on software development, AI automation, engineering workflows, and tech.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description:
      "Articles and insights by Kavindu Rasanjana on software development, AI automation, engineering workflows, and tech.",
  },
};

export default function BlogPage() {
  return (
    <>
      <BlogApiShell />
      <div className="mt-16">
        <ContactSection />
      </div>
    </>
  );
}
