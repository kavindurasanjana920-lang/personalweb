"use client";

import { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { ProjectCard } from "@/components/project-card";

type ProjectLink = { type: string; href: string; icon?: React.ReactNode };
type Project = {
  title: string;
  href?: string;
  description: string;
  dates: string;
  technologies: string[];
  image?: string;
  video?: string;
  links?: ProjectLink[];
};

interface ProjectsFilterProps {
  projects: Project[];
}

export function ProjectsFilter({ projects }: ProjectsFilterProps) {
  const [selectedType, setSelectedType] = useState<string>("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const types = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      p.links?.forEach((l) => {
        if (l.type) set.add(l.type);
      });
    });
    return ["All", ...Array.from(set).sort()];
  }, [projects]);

  const filtered = useMemo(() => {
    if (selectedType === "All") return projects;
    return projects.filter((p) =>
      p.links?.some((l) => l.type === selectedType)
    );
  }, [projects, selectedType]);

  return (
    <div className="flex flex-col gap-6">
      {/* Filter dropdown */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "project" : "projects"}
          {selectedType !== "All" && ` · ${selectedType}`}
        </p>

        <div className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen((v) => !v)}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/40 px-3 py-1.5 text-sm text-foreground hover:bg-card transition-colors"
          >
            <span>{selectedType === "All" ? "All Types" : selectedType}</span>
            <ChevronDown
              className={`size-3.5 text-muted-foreground transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-1 z-20 min-w-[140px] rounded-lg border border-border bg-background shadow-lg overflow-hidden">
              {types.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setSelectedType(type);
                    setDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-muted ${
                    selectedType === type
                      ? "text-foreground font-medium bg-muted/60"
                      : "text-muted-foreground"
                  }`}
                >
                  {type === "All" ? "All Types" : type}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[900px] mx-auto auto-rows-fr w-full">
        {filtered.map((project) => (
          <ProjectCard
            key={project.title}
            href={project.href}
            title={project.title}
            description={project.description}
            dates={project.dates}
            tags={project.technologies}
            image={project.image}
            video={project.video}
            links={project.links}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-border px-4 py-10 text-center text-muted-foreground text-sm">
          No projects of this type yet.
        </div>
      )}
    </div>
  );
}
