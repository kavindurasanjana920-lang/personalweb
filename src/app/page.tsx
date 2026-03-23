import HeroSection from "@/components/section/hero-section";
import CourierPartnersSection from "@/components/section/courier-partners-section";
import ContactSection from "@/components/section/contact-section";

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
