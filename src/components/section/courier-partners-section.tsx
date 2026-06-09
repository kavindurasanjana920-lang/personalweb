"use client";

import Image from "next/image";

const COURIERS = [
  { id: "royal-express", src: "/couriers/eagle.png",    alt: "Royal Express" },
  { id: "citypak",       src: "/couriers/citypak.png",  darkSrc: "/Citypack.png", alt: "Citypak" },
  { id: "fardar",        src: "/couriers/kolibiyo.png", alt: "Fardar" },
  { id: "trans-express", src: "/couriers/domex.webp",   alt: "Trans Express" },
  { id: "koombiyo",      src: "/couriers/fde.png",      alt: "Koombiyo" },
  { id: "domex",         src: "/couriers/transex.png",  alt: "Domex" },
];

interface Props {
  selectedCourier: string | null;
  onSelect: (id: string) => void;
}

export default function CourierPartnersSection({ selectedCourier, onSelect }: Props) {
  const selected = selectedCourier;

  return (
    <section id="courier-partners" className="py-2">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center sm:gap-8">
        <h2 className="text-xl font-bold sm:text-2xl">Select Your Courier Partner</h2>

        <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {COURIERS.map((courier) => {
            const isSelected = selected === courier.id;
            return (
              <label
                key={courier.id}
                className={[
                  "relative flex min-h-24 cursor-pointer items-center justify-center rounded-xl border p-3 transition-all",
                  isSelected
                    ? "border-orange-500 bg-orange-500/5 ring-1 ring-orange-500"
                    : "border-border bg-background/85 hover:border-orange-500/40",
                ].join(" ")}
              >
                <input
                  type="radio"
                  name="courier"
                  value={courier.id}
                  checked={isSelected}
                  onChange={() => onSelect(courier.id)}
                  className="sr-only"
                />

                {/* Radio indicator */}
                <span
                  className={[
                    "absolute top-2.5 right-2.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 shadow-sm transition-all",
                    isSelected
                      ? "border-orange-500 bg-orange-500 shadow-orange-500/40 shadow-md"
                      : "border-foreground/50 bg-background/80",
                  ].join(" ")}
                >
                  {isSelected
                    ? <span className="size-2 rounded-full bg-white" />
                    : <span className="size-1.5 rounded-full bg-foreground/25" />
                  }
                </span>

                {courier.darkSrc ? (
                  <>
                    <Image
                      src={courier.src}
                      alt={courier.alt}
                      width={220}
                      height={90}
                      className="h-auto max-h-14 w-auto object-contain dark:hidden"
                    />
                    <Image
                      src={courier.darkSrc}
                      alt={courier.alt}
                      width={220}
                      height={90}
                      className="hidden h-auto max-h-14 w-auto object-contain dark:block"
                    />
                  </>
                ) : (
                  <Image
                    src={courier.src}
                    alt={courier.alt}
                    width={220}
                    height={90}
                    className="h-auto max-h-14 w-auto object-contain"
                  />
                )}
              </label>
            );
          })}
        </div>

        {selected && (
          <p className="text-sm text-muted-foreground">
            Searching with{" "}
            <span className="font-semibold text-orange-500">
              {COURIERS.find((c) => c.id === selected)?.alt}
            </span>
          </p>
        )}
      </div>
    </section>
  );
}
