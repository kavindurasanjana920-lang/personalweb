"use client";

import { Phone, Search } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Glow from "@/components/ui/glow";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  className?: string;
  selectedCourier?: string | null;
}

export default function HeroSection({ className, selectedCourier }: HeroSectionProps) {
  const router = useRouter();
  const phoneRef = useRef<HTMLInputElement>(null);
  const [phoneError, setPhoneError] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const rawWaybill = formData.get("q");
    const searchInput = typeof rawWaybill === "string" ? rawWaybill : "";

    const waybillId = searchInput.trim().toUpperCase();
    if (!waybillId) return;

    if (selectedCourier === "koombiyo") {
      const rawPhone = formData.get("phone");
      const phone = typeof rawPhone === "string" ? rawPhone.trim() : "";
      if (!phone) {
        setPhoneError(true);
        phoneRef.current?.focus();
        return;
      }
      setPhoneError(false);
      const params = new URLSearchParams({ q: waybillId, courier: "koombiyo", phone });
      const target = `/search/?${params.toString()}`;
      router.push(target);
      setTimeout(() => { if (window.location.pathname !== "/search/") window.location.href = target; }, 120);
      return;
    }

    setPhoneError(false);
    const params = new URLSearchParams({ q: waybillId });
    if (selectedCourier) params.set("courier", selectedCourier);
    const target = `/search/?${params.toString()}`;
    router.push(target);
    setTimeout(() => { if (window.location.pathname !== "/search/") window.location.href = target; }, 120);
  };

  const isKoombiyo = selectedCourier === "koombiyo";

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

          <form
            onSubmit={handleSearch}
            action="/search/"
            method="GET"
            className="w-full max-w-2xl space-y-3"
          >
            <div className="rounded-2xl border bg-background/90 p-2 backdrop-blur">
              <div className="relative z-20 flex items-center gap-2 pointer-events-auto">
                <div className="grid h-12 w-12 place-items-center text-muted-foreground">
                  <Search className="size-5" />
                </div>
                <input
                  type="text"
                  name="q"
                  placeholder="Enter tracking number..."
                  aria-label="Tracking number"
                  autoComplete="off"
                  spellCheck={false}
                  className="h-12 flex-1 bg-transparent text-base outline-none pointer-events-auto"
                />
                <Button
                  type="submit"
                  className="h-12 rounded-xl bg-orange-500 px-5 text-white hover:bg-orange-500/90"
                >
                  <Search className="size-5" />
                </Button>
              </div>
            </div>

            <div className={[
              "rounded-2xl border p-2 backdrop-blur transition-colors",
              isKoombiyo
                ? phoneError
                  ? "border-red-400 bg-red-50/80 dark:bg-red-950/30"
                  : "border-orange-400 bg-background/90"
                : "bg-background/90",
            ].join(" ")}>
              <div className="relative z-20 flex items-center gap-2 pointer-events-auto">
                <div className={[
                  "grid h-12 w-12 place-items-center transition-colors",
                  phoneError ? "text-red-400" : isKoombiyo ? "text-orange-500" : "text-muted-foreground",
                ].join(" ")}>
                  <Phone className="size-5" />
                </div>
                <input
                  ref={phoneRef}
                  type="tel"
                  name="phone"
                  placeholder={
                    isKoombiyo
                      ? phoneError
                        ? "Phone number is required for Koombiyo"
                        : "Enter phone number (required for Koombiyo)"
                      : "Phone number (Koombiyo only)"
                  }
                  aria-label="Phone number"
                  autoComplete="tel"
                  onChange={() => { if (phoneError) setPhoneError(false); }}
                  className={[
                    "h-12 flex-1 bg-transparent text-base outline-none pointer-events-auto transition-opacity",
                    phoneError ? "placeholder:text-red-400 text-red-600 dark:text-red-400" : "",
                    isKoombiyo ? "opacity-100" : "opacity-40",
                  ].join(" ")}
                  disabled={!isKoombiyo}
                />
              </div>
            </div>
            {phoneError && (
              <p className="text-sm font-medium text-red-500 text-left pl-1">
                Phone number is required to track with Koombiyo
              </p>
            )}
          </form>
        </div>
      </div>
      <div className="pointer-events-none absolute top-[42%] left-1/2 z-0 h-[430px] w-[100vw] max-w-[1100px] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 group-hover:opacity-100 overflow-x-clip sm:w-full sm:overflow-visible">
        <Glow variant="center" />
      </div>
    </section>
  );
}