"use client";

import { useEffect, useState } from "react";
import {
  BriefcaseBusinessIcon,
  FolderKanbanIcon,
  MailIcon,
  UserIcon,
  XIcon,
} from "lucide-react";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuSocial = Object.entries(DATA.contact.social).find(
    ([name, social]) => social.navbar && name.toLowerCase() === "menu"
  );
  const MenuIcon = menuSocial?.[1].icon;

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  const menuItems = [
    {
      label: "Services",
      href: "/#services",
      icon: BriefcaseBusinessIcon,
      description: "Explore automation, AI, and full-stack solutions.",
    },
    {
      label: "Projects",
      href: "/#projects",
      icon: FolderKanbanIcon,
      description: "See selected products and real-world builds.",
    },
    {
      label: "About",
      href: "/#about",
      icon: UserIcon,
      description: "Get to know my background and core strengths.",
    },
    {
      label: "Contact",
      href: "/#contact",
      icon: MailIcon,
      description: "Reach out for collaboration and project inquiries.",
    },
  ];

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30">
      <div
        className={`pointer-events-auto fixed inset-0 z-40 bg-orange-60/75 dark:bg-background/60 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-x-0 bottom-0 mx-auto flex w-full max-w-2xl flex-col rounded-t-3xl border border-border bg-background px-6 pt-6 pb-24 shadow-2xl transition-transform duration-300 ${
            isMenuOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex justify-end">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border bg-card text-foreground hover:bg-muted transition-colors"
            >
              <XIcon className="size-5" />
            </button>
          </div>
          <div className="flex items-start justify-center pt-4 pb-4">
            <div className="grid w-full gap-8 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
              <div className="rounded-2xl border border-border/60 bg-card/70 p-6">
                <p className="text-2xl font-semibold tracking-tight">Menu</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Quick navigation across key pages of this portfolio website.
                </p>
                <div className="mt-8 hidden space-y-3 md:block">
                  <p className="text-xl font-semibold">Kavindu Portfolio</p>
                  <p className="text-muted-foreground leading-relaxed">
                    Building scalable AI systems, automation workflows, and
                    production-ready digital products.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {menuItems.map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="group -mx-2 block rounded-xl pl-3 pr-2 py-2 transition-colors hover:bg-muted/90 dark:hover:bg-muted/60"
                    >
                      <div className="flex items-start gap-3">
                        <ItemIcon className="mt-1 size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        <div>
                          <p className="font-semibold leading-none group-hover:text-primary transition-colors">
                            {item.label}
                          </p>
                          <p className="mt-2 text-muted-foreground leading-relaxed group-hover:text-foreground/90 transition-colors">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dock className="z-50 pointer-events-auto relative h-14 p-2 w-fit mx-auto flex gap-2 border bg-card/90 backdrop-blur-3xl shadow-[0_0_10px_3px] shadow-primary/5">
        {DATA.navbar.map((item) => {
          const isExternal = item.href.startsWith("http");
          return (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <a
                  href={item.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                >
                  <DockIcon className="rounded-3xl cursor-pointer size-full bg-background p-0 text-muted-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border transition-colors">
                    <item.icon className="size-full rounded-sm overflow-hidden object-contain" />
                  </DockIcon>
                </a>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                sideOffset={8}
                className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
              >
                <p>{item.label}</p>
                <TooltipArrow className="fill-primary" />
              </TooltipContent>
            </Tooltip>
          );
        })}
        <Separator
          orientation="vertical"
          className="h-2/3 m-auto w-px bg-border"
        />
        {Object.entries(DATA.contact.social)
          .filter(
            ([name, social]) => social.navbar && name.toLowerCase() !== "menu"
          )
          .map(([name, social], index) => {
            const isExternal = social.url.startsWith("http");
            const IconComponent = social.icon;
            return (
              <Tooltip key={`social-${name}-${index}`}>
                <TooltipTrigger asChild>
                  <a
                    href={social.url}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                  >
                    <DockIcon className="rounded-3xl cursor-pointer size-full bg-background p-0 text-muted-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border transition-colors">
                      <IconComponent className="size-full rounded-sm overflow-hidden object-contain" />
                    </DockIcon>
                  </a>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  sideOffset={8}
                  className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
                >
                  <p>{name}</p>
                  <TooltipArrow className="fill-primary" />
                </TooltipContent>
              </Tooltip>
            );
          })}
        <Separator
          orientation="vertical"
          className="h-2/3 m-auto w-px bg-border"
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <DockIcon className="rounded-3xl cursor-pointer size-full bg-background p-0 text-muted-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border transition-colors">
              <ModeToggle className="size-full cursor-pointer" />
            </DockIcon>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            sideOffset={8}
            className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
          >
            <p>Theme</p>
            <TooltipArrow className="fill-primary" />
          </TooltipContent>
        </Tooltip>
        {menuSocial ? (
          <>
            <Separator
              orientation="vertical"
              className="h-2/3 m-auto w-px bg-border"
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  aria-label="Toggle menu"
                  aria-expanded={isMenuOpen}
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                >
                  <DockIcon className="rounded-3xl cursor-pointer size-full bg-background p-0 text-muted-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border transition-colors">
                    {MenuIcon ? (
                      <MenuIcon className="size-full rounded-sm overflow-hidden object-contain" />
                    ) : null}
                  </DockIcon>
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                sideOffset={8}
                className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
              >
                <p>{menuSocial[0]}</p>
                <TooltipArrow className="fill-primary" />
              </TooltipContent>
            </Tooltip>
          </>
        ) : null}
      </Dock>
    </div>
  );
}
