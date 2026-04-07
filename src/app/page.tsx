import HeroSection from "@/components/section/hero-section";
import CourierPartnersSection from "@/components/section/courier-partners-section";
import ContactSection from "@/components/section/contact-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trackmate - Courier Tracking Sri Lanka | Domex, TransExpress, Koombiyo, Royal Express",
  description:
    "Track parcels online with real-time courier updates. Find domex tracking, transexpress tracking, koombiyo tracking, fadar tracking, royal express tracking, pracle tracking, and courier tracking in one place.",
  keywords: [
    "domex tracking",
    "transexpress tracking",
    "koombiyo tracking",
    "fadar tracking",
    "royal express tracking",
    "pracle tracking",
    "courier tracking",
  ],
};

export default function Page() {
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <section id="hero">
        <HeroSection />
      </section>
      <section id="courier-partners">
        <CourierPartnersSection />
      </section>
      <section id="contact">
        <ContactSection />
      </section>
    </main>
  );
}
