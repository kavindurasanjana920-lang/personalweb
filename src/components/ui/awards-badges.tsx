import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Award {
  src: string;
  alt: string;
  href?: string;
  sizes: { sm: number; md: number; lg: number; xl: number };
}

const AWARDS: Award[] = [
  {
    src: "/bw_26_logo.png",
    alt: "BestWeb.LK 2026",
    href: "https://www.bestweb.lk",
    sizes: { sm: 40, md: 52, lg: 56, xl: 72 },
  },
  {
    src: "/topweb-logo.png",
    alt: "TopWeb.LK",
    href: "https://www.topweb.lk",
    sizes: { sm: 34, md: 44, lg: 48, xl: 62 },
  },
];

interface AwardsBadgesProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function AwardsBadges({ className, size = "lg" }: AwardsBadgesProps) {
  return (
    <div className={cn("flex flex-row items-center gap-4", className)}>
      {AWARDS.map((award) => {
        const sz = award.sizes[size];
        const img = (
          <Image
            src={award.src}
            alt={award.alt}
            width={sz}
            height={sz}
            className="object-contain drop-shadow-md"
            title={award.alt}
          />
        );

        return award.href ? (
          <Link
            key={award.alt}
            href={award.href}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-80 hover:opacity-100 transition-opacity"
          >
            {img}
          </Link>
        ) : (
          <div key={award.alt} className="opacity-80">
            {img}
          </div>
        );
      })}
    </div>
  );
}
