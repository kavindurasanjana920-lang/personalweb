import { Search } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import Glow from "@/components/ui/glow";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className }: HeroSectionProps) {
  return (
    <section className={cn("group relative isolate overflow-visible pt-6", className)}>
      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-8">
          <div className="flex flex-col items-center gap-1">
            <Image
              src="/light.png"
              alt="Trackmate logo"
              width={220}
              height={220}
              className="block h-auto w-[180px] dark:hidden"
              priority
            />
            <Image
              src="/dark.png"
              alt="Trackmate logo"
              width={220}
              height={220}
              className="hidden h-auto w-[180px] dark:block"
              priority
            />
          </div>

          <h1 className="max-w-[18ch] text-4xl leading-[1.12] font-semibold text-balance sm:text-5xl md:text-6xl">
            Track Your Packages
          </h1>

          <p className="text-muted-foreground max-w-[740px] text-base font-medium text-balance sm:text-lg md:text-xl">
            Enter your tracking number to get real-time updates.
          </p>

          <div className="w-full max-w-2xl rounded-2xl border bg-background/90 p-2 backdrop-blur">
            <div className="flex items-center gap-2">
              <div className="grid h-12 w-12 place-items-center text-muted-foreground">
                <Search className="size-5" />
              </div>
              <input
                type="text"
                readOnly
                value="Enter tracking number..."
                aria-label="Tracking number"
                className="h-12 flex-1 bg-transparent text-base text-muted-foreground outline-none"
              />
              <Button className="h-12 rounded-xl bg-orange-500 px-5 text-white hover:bg-orange-500/90">
                <Search className="size-5" />
              </Button>
            </div>
          </div>

        </div>
      </div>
          <div className="pointer-events-none absolute top-[42%] left-1/2 z-0 h-[430px] w-[100vw] max-w-[1100px] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 group-hover:opacity-100 overflow-x-clip sm:w-full sm:overflow-visible">
            <Glow variant="center" />
          </div>
    </section>
  );
}