import Link from "next/link";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function ContactSection() {
  return (
    <div className="border rounded-xl p-10 relative">
      <Button 
        asChild 
        className="absolute -top-4 border bg-foreground text-background z-10 rounded-full px-5 py-1.5 left-1/2 -translate-x-1/2 group h-auto"
      >
        <Link href="/contact">
          <span className="text-sm font-medium">Contact Me</span>
          <ArrowRight className="ml-2 size-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
      <div className="absolute inset-0 top-0 left-0 right-0 h-1/2 rounded-xl overflow-hidden">
        <FlickeringGrid
          className="h-full w-full"
          squareSize={2}
          gridGap={2}
          style={{
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
      </div>
      <div className="relative flex flex-col items-center gap-6 text-center pt-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Get in Touch
          </h2>
          <p className="mx-auto max-w-lg text-muted-foreground text-balance text-base mb-2">
            Want to discuss a project, ask a question, or just say hi? Head over to my contact page to get in touch—I'd love to hear from you.
          </p>
        </div>
      </div>
    </div>
  );
}

