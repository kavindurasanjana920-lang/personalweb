import type { Metadata } from "next";
import {
  BriefcaseBusiness,
  GraduationCap,
  Sparkles,
  Trophy,
  Wrench,
} from "lucide-react";

import ContactSection from "@/components/section/contact-section";
import { DATA } from "@/data/resume";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Kavindu Rasanjana, including experience, projects, skills, education, and certifications.",
  keywords: [
    "Kavindu Rasanjana",
    "About",
    "Software Engineer",
    "AI Engineer",
    "Experience",
    "Skills",
    "Education",
    "Certifications",
    "Sri Lanka Developer",
    "Portfolio",
  ],
};

export default function AboutPage() {
  const allProjects = [...DATA.projects, ...DATA.projectsPageOnly];

  const highlights = [
    {
      icon: BriefcaseBusiness,
      label: "Projects Completed",
      value: "10+",
      description: "Client and product builds across web, mobile, and automation.",
    },
    {
      icon: Wrench,
      label: "Core Skills",
      value: `${DATA.skills.length}`,
      description: "Practical tools used in production systems and workflows.",
    },
    {
      icon: GraduationCap,
      label: "Education",
      value: `${DATA.education.length}`,
      description: "Formal academic and professional learning milestones.",
    },
    {
      icon: Trophy,
      label: "Certifications",
      value: `${DATA.hackathons.length}`,
      description: "Hands-on courses and certifications supporting applied delivery.",
    },
  ];

  return (
    <section id="about-page" className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl">
          About Me: building practical, scalable software.
        </h1>
        <p className="max-w-2xl text-pretty text-muted-foreground md:text-lg">
          This page summarizes my portfolio content across services,
          projects, work experience, education, and certifications to present a
          clear view of technical depth and delivery impact.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card/30 p-6">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          <Sparkles className="size-3.5" />
          Profile Summary
        </div>
        <p className="max-w-none text-pretty leading-relaxed text-muted-foreground">
          I&apos;m currently working as a Software Automation Engineer while actively
          building and scaling real-world software solutions. I have completed my
          Bachelor&apos;s degree in Information Technology and have delivered 10+
          projects for international clients, including AI-powered FinTech
          platforms and cross-platform mobile applications. With strong
          experience in full-stack development, I continuously explore AI and
          machine learning to solve real-world problems and build scalable,
          impactful digital products.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {highlights.map((item) => {
          const ItemIcon = item.icon;

          return (
            <div
              key={item.label}
              className="group relative overflow-hidden rounded-2xl bg-secondary/50 p-5 transition-all hover:bg-secondary/80"
            >
              <div className="flex items-center justify-between">
                <ItemIcon className="size-5 text-primary opacity-80" />
                <span className="text-4xl font-black tracking-tighter text-foreground/5 opacity-50 transition-opacity group-hover:opacity-100">
                  {item.value.replace('+', '')}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold tracking-tight">{item.value}</p>
                <p className="mt-1 text-sm font-medium text-foreground">{item.label}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-5">
        <h2 className="text-xl font-bold tracking-tight">Experience Overview</h2>
        <div className="max-w-3xl space-y-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Since January 2024, I have delivered end-to-end web solutions as a Web
            Developer on Fiverr for international clients across FinTech,
            e-commerce, matrimony, and professional services, successfully
            managing 10+ live full-stack projects from client communication and
            scoping to final execution.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            I joined Parallax Tec as an Intern Software Engineer (Aug 2024-Aug
            2025), where I built and maintained scalable web applications using
            PHP, Laravel, WordPress, and MySQL, improved version-control
            workflows, and implemented Google Marketing Platform for data-driven
            optimization.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            As a Trainee Software Engineer (Aug 2025-Feb 2026), I contributed
            across the full SDLC by developing responsive React interfaces,
            robust Laravel backends, automation workflows with n8n, Meta
            Developer integrations, and monitoring systems for user behavior and
            sales pipelines.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Currently, as a Software Automation Engineer at Parallax Tec (Feb
            2026-Present), I design AI-driven automation pipelines and cloud-based
            workflows that reduce manual bottlenecks, transform complex business
            processes into self-regulating systems, and deliver scalable,
            low-touch technical solutions with long-term operational impact.
          </p>
        </div>
      </div>

      <ContactSection />
    </section>
  );
}
