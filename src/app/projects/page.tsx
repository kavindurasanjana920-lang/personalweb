import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import ContactSection from "@/components/section/contact-section";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "A full list of projects.",
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

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[900px] mx-auto auto-rows-fr">
        {allProjects.map((project, id) => (
          <BlurFade
            key={project.title}
            delay={BLUR_FADE_DELAY * 2 + id * 0.05}
            className="h-full"
          >
            <ProjectCard
              href={project.href}
              title={project.title}
              description={project.description}
              dates={project.dates}
              tags={project.technologies}
              image={project.image}
              video={project.video}
              links={project.links}
            />
          </BlurFade>
        ))}
      </div>
      </section>

      <section id="contact" className="mt-8">
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}
