import Image from "next/image";

import { Badge } from "@/components/ui/badge";

const COURIER_LOGOS = [
  { src: "/couriers/domex.webp", alt: "Domex" },
  { src: "/couriers/citypak.png", darkSrc: "/Citypack.png", alt: "Citypak" },
  { src: "/couriers/fde.png", alt: "FDE" },
  { src: "/couriers/transex.png", alt: "TransEx" },
  { src: "/couriers/eagle.png", alt: "Eagle" },
  { src: "/couriers/kolibiyo.png", alt: "Kolibiyo" },
];

export default function CourierPartnersSection() {
  return (
    <section id="courier-partners" className="py-2">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center sm:gap-8">
        <Badge variant="outline" className="border-orange-500/25 text-orange-600 dark:text-orange-400">
          Courier Network
        </Badge>

        <h2 className="text-xl font-bold sm:text-2xl">Our Courier Partners</h2>

        <p className="text-muted-foreground max-w-2xl text-sm sm:text-base">
          Integrated with trusted courier services for fast, reliable delivery tracking.
        </p>

        <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {COURIER_LOGOS.map((logo) => (
            <div
              key={logo.src}
              className="relative flex min-h-24 items-center justify-center overflow-hidden rounded-xl border bg-background/85 p-3 shadow-sm"
            >
              {logo.darkSrc ? (
                <>
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={220}
                    height={90}
                    className="h-auto max-h-14 w-auto object-contain dark:hidden"
                  />
                  <Image
                    src={logo.darkSrc}
                    alt={logo.alt}
                    width={220}
                    height={90}
                    className="hidden h-auto max-h-14 w-auto object-contain dark:block"
                  />
                </>
              ) : (
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={220}
                  height={90}
                  className="h-auto max-h-14 w-auto object-contain"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
