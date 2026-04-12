import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
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
    <section id="projects-page">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="text-2xl font-semibold tracking-tight mb-2">
          Projects
          <span className="ml-2 bg-card border border-border rounded-md px-2 py-1 text-muted-foreground text-sm">
            {allProjects.length} items
          </span>
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          A complete view of my projects and product work.
        </p>
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
  );
}
