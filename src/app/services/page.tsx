import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Code2,
  Layers3,
  LayoutGrid,
  MessageSquareCode,
  Rocket,
  Smartphone,
  Workflow,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import ContactSection from "@/components/section/contact-section";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const services = [
  {
    icon: Bot,
    title: "AI Automation",
    description:
      "Design and build automation systems that reduce manual work, connect tools, and keep operations moving with fewer bottlenecks.",
    points: ["Workflow automation", "AI-assisted operations", "System integration"],
  },
  {
    icon: Code2,
    title: "Full-Stack Web Development",
    description:
      "Create fast, maintainable web applications with clean interfaces, robust APIs, and production-ready architecture.",
    points: ["Modern frontend apps", "Scalable backend systems", "Database architectures"],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Develop powerful, native-quality mobile applications for iOS and Android that deliver seamless and engaging user experiences.",
    points: ["Custom iOS & Android apps", "High-performance UI", "End-to-end app delivery"],
  },
  {
    icon: Workflow,
    title: "Product Systems & Integrations",
    description:
      "Connect payment, analytics, CRM, and internal tools into one coherent product workflow that scales with the business.",
    points: ["Third-party APIs", "Payments", "Admin dashboards"],
  },
];

const process = [
  {
    icon: MessageSquareCode,
    title: "Discover",
    description:
      "Define the core problem, set project constraints, and map technical architecture with business needs before development work begins.",
  },
  {
    icon: Layers3,
    title: "Build",
    description:
      "Design a scalable system, implement the interface and ship in iterations with clear feedback loops to keep product outcomes aligned.",
  },
  {
    icon: Rocket,
    title: "Launch",
    description:
      "Deploy the application, refine infrastructure, and support the live solution so performance stays reliable and scaling works in real-world usage.",
  },
];

const techStack = [
  "React",
  "Next.js",
  "Laravel",
  "Python",
  "TensorFlow",
  "PyTorch",
  "Scikit-learn",
  "Keras",
  "Hugging Face",
  "OpenAI",
  "Agentic AI",
  "RAG AI",
  "Azure",
  "n8n",
  "Zapier",
  "Git",
  "Flutter",
  "WordPress",
  "MySQL",
  "Docker",
  "Kubernetes",
];

export default function ServicesPage() {
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <section>
        <div className="flex min-h-0 flex-col gap-y-4">
          <div className="space-y-5">
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl">
                Build, automate, and scale digital products.
              </h1>
              <p className="max-w-2xl text-pretty text-muted-foreground md:text-lg">
                I help teams and founders turn ideas into practical software by
                combining automation, product thinking, and production-ready engineering.
                From discovery to launch, each engagement is structured for fast delivery,
                clean architecture, and long-term maintainability.
              </p>
            </div>
            <div className="flex flex-row gap-3">
              <Button asChild className="group px-4 sm:px-6">
                <Link href="/contact">
                  Contact Me
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="group px-4 sm:px-6">
                <Link href="/projects">
                  View projects
                  <LayoutGrid className="ml-2 size-4 transition-transform group-hover:scale-110" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex min-h-0 flex-col gap-12 sm:gap-16">
            {services.map((service, index) => {
              const ServiceIcon = service.icon;

              return (
                <article key={service.title} className="relative isolate flex flex-col md:flex-row gap-6 md:gap-8 pb-12 sm:pb-16 border-b-2 border-border last:border-b-0 last:pb-0">
                  {/* Background Number Watermark */}
                  <div className="absolute top-0 right-0 sm:-top-2 sm:-right-4 text-6xl sm:text-7xl font-bold tracking-tighter text-muted-foreground/10 leading-none select-none pointer-events-none -z-10">
                    0{index + 1}
                  </div>

                  <div className="flex-none">
                    <div className="flex size-14 items-center justify-center rounded-full bg-foreground text-background backdrop-blur-md">
                      <ServiceIcon className="size-6" />
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-4 pt-1">
                    <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
                      {service.title}
                    </h3>
                    
                    <p className="max-w-2xl text-base text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                    
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 pt-2 max-w-2xl">
                      {service.points.map((point) => (
                        <li key={point} className="flex items-center gap-2.5 text-sm text-foreground/90">
                          <CheckCircle2 className="size-4 text-foreground/70" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
      </section>

      <section>
        <div className="flex min-h-0 flex-col gap-y-6">
          <div className="flex flex-col gap-y-4 items-center justify-center pb-8 pt-8">
            <div className="flex items-center w-full max-w-3xl mx-auto">
              <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
              <div className="border bg-foreground z-10 rounded-xl px-4 py-1.5 mx-4">
                <span className="text-background text-sm font-medium">Working Style</span>
              </div>
              <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
            </div>
            
            <div className="flex flex-col gap-y-3 items-center justify-center">
              <h2 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl">
                A simple process with clear outcomes
              </h2>
              <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center max-w-2xl">
                Discover, build, and launch—a predictable structured approach to turning ideas into production-ready software efficiently.
              </p>
            </div>
          </div>

          <div className="relative mt-4 grid gap-12 md:grid-cols-3 md:gap-8">
            {process.map((item, index) => {
              const ProcessIcon = item.icon;
              const isLast = index === process.length - 1;

              return (
                <div key={item.title} className="relative flex flex-col">
                  {/* Desktop Connecting Line */}
                  {!isLast && (
                    <div className="absolute left-1/2 top-6 -translate-y-1/2 hidden h-[2px] w-[calc(100%+2rem)] bg-border md:block" />
                  )}
                  
                  {/* Mobile Connecting Line */}
                  {!isLast && (
                    <div className="absolute left-[1.5rem] top-[3rem] -translate-x-1/2 block h-[calc(100%+1.5rem)] w-[2px] bg-border md:hidden" />
                  )}

                  <div className="relative flex flex-row md:flex-col md:items-center gap-6 md:gap-8">
                    <div className="relative z-10 flex size-12 flex-none items-center justify-center rounded-2xl bg-foreground text-background shadow-md ring-8 ring-background">
                      <ProcessIcon className="size-5" />
                    </div>
                  
                    <div className="flex flex-col space-y-2 pt-1 md:pt-0">
                      <div className="flex items-center gap-3 md:flex-col md:items-center md:gap-3">
                        <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground/50">
                          Step 0{index + 1}
                        </span>
                        <h3 className="text-xl font-bold tracking-tight text-foreground md:text-center">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-base leading-relaxed text-muted-foreground md:text-center">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section>
        <div className="flex min-h-0 flex-col gap-y-6">
          <div className="flex flex-col gap-y-4 items-center justify-center pb-8 pt-8">
            <div className="flex items-center w-full max-w-3xl mx-auto">
              <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
              <div className="border bg-foreground z-10 rounded-xl px-4 py-1.5 mx-4">
                <span className="text-background text-sm font-medium">Stack</span>
              </div>
              <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
            </div>

            <div className="flex flex-col gap-y-3 items-center justify-center">
              <h2 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl">
                Technologies I use to deliver reliable systems.
              </h2>
              <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center max-w-2xl">
                I work with a practical stack tuned for fast iteration, solid
                integrations, and maintainable delivery.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {techStack.map((tech) => (
              <div 
                key={tech} 
                className="border bg-background border-border ring-2 ring-border/20 rounded-xl h-8 w-fit px-4 flex items-center gap-2"
              >
                <span className="text-foreground text-sm font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact">
        <ContactSection />
      </section>
    </main>
  );
}