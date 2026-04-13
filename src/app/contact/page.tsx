import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";

import ContactForm from "@/components/section/contact-form";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch to discuss projects, collaborations, and product ideas.",
};

export default function ContactPage() {
  return (
    <section id="contact-page" className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl">
          Let&apos;s build something impactful together.
        </h1>
        <p className="max-w-2xl text-pretty text-muted-foreground md:text-lg">
          Whether you need AI automation, a full-stack product, or a mobile app,
          I&apos;m happy to discuss your goals and map a practical implementation plan.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <a
          href={`mailto:${DATA.contact.email}`}
          className="group rounded-xl border border-border bg-card/40 p-5 transition-colors hover:bg-card"
        >
          <div className="mb-3 inline-flex size-10 items-center justify-center rounded-lg bg-foreground text-background">
            <Mail className="size-4" />
          </div>
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="mt-1 font-medium text-foreground break-all">{DATA.contact.email}</p>
        </a>

        <a
          href={`tel:${DATA.contact.tel}`}
          className="group rounded-xl border border-border bg-card/40 p-5 transition-colors hover:bg-card"
        >
          <div className="mb-3 inline-flex size-10 items-center justify-center rounded-lg bg-foreground text-background">
            <Phone className="size-4" />
          </div>
          <p className="text-sm text-muted-foreground">Phone</p>
          <p className="mt-1 font-medium text-foreground">{DATA.contact.tel}</p>
        </a>
      </div>

      <div className="space-y-4 rounded-xl border border-border bg-card/30 p-6">
        <h2 className="text-xl font-bold tracking-tight">Send a Message</h2>
        <p className="text-muted-foreground">
          Share project details, goals, or timelines and I will get back to you.
        </p>
        <ContactForm />
      </div>

    </section>
  );
}