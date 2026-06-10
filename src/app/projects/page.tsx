import BlurFade from "@/components/magicui/blur-fade";
import { ProjectsFilter } from "@/components/projects-filter";
import ContactSection from "@/components/section/contact-section";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore projects by Kavindu Rasanjana — real-world builds across web, mobile, AI automation, and product systems.",
  keywords: [
    "Kavindu Rasanjana Projects",
    "Web Development Projects",
    "AI Projects",
    "Mobile App Projects",
    "Software Portfolio",
    "Automation Projects",
    "Sri Lanka Developer",
    "Next.js Projects",
    "React Projects",
  ],
};

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsPage() {
  const allProjects = [...DATA.projects, ...DATA.projectsPageOnly];

  return (
    <main className="flex flex-col gap-14 min-h-dvh">
      <section id="projects-page">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl">
            Projects that ship real product outcomes.
          </h1>
          <p className="max-w-2xl text-pretty text-muted-foreground md:text-lg">
            A complete view of my end-to-end project work across products,
            automations, and scalable systems. This page includes {allProjects.length}
            builds with practical delivery details and implementation depth.
          </p>
        </div>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <ProjectsFilter projects={allProjects} />
      </BlurFade>
      </section>

      <section id="contact" className="mt-8">
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}
