"use client";

import { useState } from "react";

import ContactSection from "@/components/section/contact-section";
import CourierPartnersSection from "@/components/section/courier-partners-section";
import HeroSection from "@/components/section/hero-section";

export default function HomeClient() {
  const [selectedCourier, setSelectedCourier] = useState<string | null>(null);

  return (
    <>
      <section id="hero">
        <HeroSection selectedCourier={selectedCourier} />
      </section>
      <section id="courier-partners">
        <CourierPartnersSection selectedCourier={selectedCourier} onSelect={setSelectedCourier} />
      </section>
      <section id="contact">
        <ContactSection />
      </section>
    </>
  );
}
