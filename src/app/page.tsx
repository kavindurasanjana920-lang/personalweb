/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import BlurFade from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import { ArrowRight, ArrowUpRight, BriefcaseBusiness } from "lucide-react";

const HackathonsSection = dynamic(() => import("@/components/section/hackathons-section"));
const ProjectsSection = dynamic(() => import("@/components/section/projects-section"));
const WorkSection = dynamic(() => import("@/components/section/work-section"));

export const metadata: Metadata = {
  title: {
    absolute: "Kavindu Rasanjana | Software Automation & AI Engineer",
  },
  description:
    "Kavindu Rasanjana is a Software Automation & AI Engineer based in Sri Lanka, specialising in scalable AI systems, workflow automation, full-stack web development, and production-ready mobile applications.",
  keywords: [
    "Kavindu Rasanjana",
    "Software Automation Engineer",
    "AI Engineer",
    "Machine Learning Engineer",
    "Sri Lanka",
    "Portfolio",
    "AI Automation",
    "Full Stack Developer",
    "Next.js Developer",
    "Workflow Automation",
    "Web Development Sri Lanka",
  ],
};

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 gap-y-6 flex flex-col md:flex-row justify-between">
            <div className="gap-2 flex flex-col order-2 md:order-1">
              <h1 className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl">
                {`Hi, I'm ${DATA.name.split(" ")[0]}`}
              </h1>
              <p className="text-muted-foreground max-w-[600px] md:text-lg lg:text-xl">
                {DATA.description}
              </p>
              <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
                <div className="flex flex-row gap-3 pt-1">
                  <Button asChild className="group px-4 sm:px-6">
                    <Link href="/contact">
                      Contact Me
                      <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="group px-4 sm:px-6">
                    <Link href="/services">
                      Services
                      <BriefcaseBusiness className="ml-2 size-4 transition-transform group-hover:scale-110" />
                    </Link>
                  </Button>
                </div>
              </BlurFade>
            </div>

            <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2 flex-none">
              <div className="size-24 md:size-32 border rounded-full shadow-lg ring-4 ring-muted overflow-hidden relative dark:hidden">
                <Image
                  src={DATA.avatarUrlLight ?? DATA.avatarUrl}
                  alt={`${DATA.name} - Software Engineer`}
                  fill
                  priority
                  className="object-cover rounded-full"
                  sizes="(max-width: 768px) 96px, 128px"
                />
              </div>
              <div className="hidden size-24 md:size-32 border rounded-full shadow-lg ring-4 ring-muted overflow-hidden relative dark:flex">
                <Image
                  src={DATA.avatarUrl}
                  alt={`${DATA.name} - Software Engineer`}
                  fill
                  priority
                  className="object-cover rounded-full"
                  sizes="(max-width: 768px) 96px, 128px"
                />
              </div>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold">About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <Markdown>
                {DATA.summary}
              </Markdown>
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <WorkSection />
          </BlurFade>
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          <div className="flex flex-col gap-8">
            {DATA.education.map((education, index) => (
              <BlurFade
                key={`${education.school}-${index}`}
                delay={BLUR_FADE_DELAY * 8 + index * 0.05}
              >
                <Link
                  href={education.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-x-3 justify-between group"
                >
                  <div className="flex items-center gap-x-3 flex-1 min-w-0">
                    {education.logoUrl ? (
                      <img
                        src={education.logoUrl}
                        alt={education.school}
                        loading="lazy"
                        className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none"
                      />
                    ) : (
                      <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none" />
                    )}
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <div className="font-semibold leading-none flex items-center gap-2">
                        {education.school}
                        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" aria-hidden />
                      </div>
                      <div className="font-sans text-sm text-muted-foreground">
                        {education.degree}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                    <span>
                      {education.start} - {education.end}
                    </span>
                  </div>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-2">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill.name} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <div className="border bg-background border-border ring-2 ring-border/20 rounded-xl h-8 w-fit px-4 flex items-center gap-2">
                  {skill.icon && <skill.icon className="size-4 rounded overflow-hidden object-contain" />}
                  <span className="text-foreground text-sm font-medium">{skill.name}</span>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <ProjectsSection />
        </BlurFade>
      </section>
      <section id="hackathons">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <HackathonsSection />
        </BlurFade>
      </section>
      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}
