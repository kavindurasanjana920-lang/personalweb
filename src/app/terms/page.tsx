import type { Metadata } from "next";
import Link from "next/link";
import ContactSection from "@/components/section/contact-section";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions for thekavindu.lk — the rules governing your use of Kavindu Rasanjana's website and professional services.",
};

const LAST_UPDATED = "June 3, 2026";
const SITE_URL = "https://thekavindu.lk";
const CONTACT_EMAIL = "info@thekavindu.lk";
const OWNER = "Kavindu Rasanjana";

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="space-y-4">
      <h2 className="text-xl font-bold tracking-tight text-foreground">{title}</h2>
      <div className="space-y-4 leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h3 className="text-base font-semibold tracking-tight text-foreground">{title}</h3>
      <div className="space-y-2 leading-relaxed text-muted-foreground">
        {children}
      </div>
    </div>
  );
}

function Divider() {
  return <div className="h-px w-full bg-border" />;
}

export default function TermsPage() {
  return (
    <main className="min-h-dvh space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl">
          Terms &amp; Conditions
        </h1>
        <p className="text-sm text-muted-foreground">
          Last updated:{" "}
          <span className="font-medium text-foreground">{LAST_UPDATED}</span>
        </p>
        <p className="text-pretty text-muted-foreground md:text-lg max-w-2xl">
          Please read these Terms and Conditions carefully before using{" "}
          <Link
            href={SITE_URL}
            className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
          >
            thekavindu.lk
          </Link>{" "}
          (the &quot;Website&quot;). By accessing or using the Website you agree
          to be bound by these terms. If you disagree with any part, please do
          not use the Website.
        </p>
      </div>

      <Divider />

      {/* Interpretation and Definitions */}
      <Section id="definitions" title="Interpretation and Definitions">
        <SubSection title="Interpretation">
          <p>
            Words with capitalised initial letters have meanings defined under
            the following conditions. These definitions apply equally whether
            they appear in singular or plural form.
          </p>
        </SubSection>
        <SubSection title="Definitions">
          <ol className="list-decimal list-outside space-y-2 pl-4">
            <li><span className="font-medium text-foreground">Website:</span> The personal portfolio and professional services site accessible at {SITE_URL}.</li>
            <li><span className="font-medium text-foreground">Owner / I / Me:</span> {OWNER}, the individual who operates this Website.</li>
            <li><span className="font-medium text-foreground">You / User:</span> Any person who accesses or uses the Website.</li>
            <li><span className="font-medium text-foreground">Services:</span> Professional engagements offered through this Website, including web development, AI automation, mobile application development, and product integrations.</li>
            <li><span className="font-medium text-foreground">Content:</span> All text, images, code, design, graphics, and other material published on the Website.</li>
            <li><span className="font-medium text-foreground">Third-Party Services:</span> External platforms integrated with this Website, including Google Analytics and Make.com.</li>
          </ol>
        </SubSection>
      </Section>

      <Divider />

      {/* Acknowledgement */}
      <Section id="acknowledgement" title="Acknowledgement">
        <p>
          These Terms and Conditions govern your use of this Website and form a
          legally binding agreement between you and {OWNER}. By accessing the
          Website you confirm that you are at least 13 years of age, have read
          and understood these Terms, and agree to be bound by them.
        </p>
        <p>
          These Terms apply to all visitors, browsers, and anyone else who
          accesses the Website. Your continued use of the Website following the
          posting of revised Terms constitutes your acceptance of the changes.
        </p>
      </Section>

      <Divider />

      {/* Website Use */}
      <Section id="use" title="Use of This Website">
        <p>
          This Website is provided for informational purposes — to showcase my
          professional portfolio, published work, and available services. You
          may browse the Website for personal, non-commercial use provided you
          do not:
        </p>
        <ul className="list-disc list-outside space-y-2 pl-4">
          <li>Attempt to gain unauthorised access to any part of the Website or its underlying infrastructure.</li>
          <li>Use automated tools (scrapers, bots, crawlers) to harvest content or data without prior written permission.</li>
          <li>Transmit any material that is harmful, offensive, unlawful, or otherwise objectionable through the contact form.</li>
          <li>Misrepresent your identity or affiliation when contacting me through this Website.</li>
          <li>Engage in any activity that interferes with or disrupts the Website or its hosting environment.</li>
        </ul>
        <p>
          I reserve the right to restrict or terminate access to the Website
          for any user who violates these conditions.
        </p>
      </Section>

      <Divider />

      {/* Intellectual Property */}
      <Section id="ip" title="Intellectual Property">
        <p>
          Unless otherwise stated, all Content on this Website — including but
          not limited to text, graphics, logos, icons, images, project
          screenshots, and code snippets — is the intellectual property of{" "}
          {OWNER} and is protected by applicable copyright and intellectual
          property laws.
        </p>
        <p>
          You may view and temporarily cache pages of the Website for personal
          use. You may <strong className="text-foreground">not</strong>:
        </p>
        <ul className="list-disc list-outside space-y-2 pl-4">
          <li>Reproduce, republish, or redistribute Content in any medium without written permission.</li>
          <li>Sell, sub-license, or otherwise exploit any Content for commercial purposes.</li>
          <li>Remove or alter any copyright, trade mark, or proprietary notice from Content.</li>
        </ul>
        <p>
          Project work displayed in the portfolio may include assets owned by
          third-party clients. Such assets remain the property of their
          respective owners.
        </p>
      </Section>

      <Divider />

      {/* Professional Services */}
      <Section id="services" title="Professional Services">
        <p>
          Enquiries submitted through the{" "}
          <Link href="/contact" className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors">
            Contact
          </Link>{" "}
          page do not constitute a binding contract. A formal engagement for
          Services commences only when both parties have agreed in writing
          (email or signed proposal) on scope, timeline, and fees.
        </p>
        <p>
          All Services are subject to a separate written agreement that will
          supersede these Terms with respect to the specific engagement. Where
          no such agreement exists, these Terms govern.
        </p>
        <SubSection title="Refund Policy">
          <ul className="list-disc list-outside space-y-2 pl-4">
            <li>
              <span className="font-medium text-foreground">Discovery / consultation fees</span> —
              non-refundable once the session has taken place.
            </li>
            <li>
              <span className="font-medium text-foreground">Project deposits</span> —
              refundable within 7 days of payment if no development work has
              commenced. Once work begins, deposits are non-refundable.
            </li>
            <li>
              <span className="font-medium text-foreground">Milestone payments</span> —
              non-refundable once the corresponding deliverable has been
              reviewed and accepted by the client.
            </li>
            <li>
              <span className="font-medium text-foreground">Disputes</span> —
              if you are unsatisfied with a deliverable, contact me within
              7 days of delivery and I will work to resolve the issue through
              reasonable revisions before any refund is considered.
            </li>
          </ul>
          <p>
            All refund requests must be submitted to{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </SubSection>
      </Section>

      <Divider />

      {/* Links to Other Websites */}
      <Section id="links" title="Links to Other Websites">
        <p>
          This Website contains links to third-party sites (GitHub, LinkedIn,
          project demos, client websites, and others) that are not operated by
          me. These links are provided for convenience and informational
          purposes only.
        </p>
        <p>
          I have no control over, and assume no responsibility for, the
          content, privacy policies, or practices of any third-party website.
          I strongly encourage you to review the terms and privacy policies of
          every external site you visit.
        </p>
      </Section>

      <Divider />

      {/* Disclaimer */}
      <Section id="disclaimer" title="&quot;As Is&quot; Disclaimer">
        <p>
          The Website and its Content are provided on an{" "}
          <strong className="text-foreground">&quot;AS IS&quot;</strong> and{" "}
          <strong className="text-foreground">&quot;AS AVAILABLE&quot;</strong>{" "}
          basis, without warranties of any kind, either express or implied,
          including but not limited to implied warranties of merchantability,
          fitness for a particular purpose, or non-infringement.
        </p>
        <p>
          I do not warrant that the Website will be uninterrupted, error-free,
          or free of viruses or other harmful components. Information published
          on the Website is provided in good faith but may not always be
          complete, accurate, or current.
        </p>
      </Section>

      <Divider />

      {/* Limitation of Liability */}
      <Section id="liability" title="Limitation of Liability">
        <p>
          To the maximum extent permitted by applicable law, {OWNER} shall not
          be liable for any indirect, incidental, special, consequential, or
          punitive damages — including but not limited to loss of profits, data,
          goodwill, or other intangible losses — arising from:
        </p>
        <ul className="list-disc list-outside space-y-2 pl-4">
          <li>Your use of, or inability to use, the Website or its Content.</li>
          <li>Any unauthorised access to or alteration of your transmissions or data.</li>
          <li>Any third-party content or conduct on or linked from the Website.</li>
          <li>Any errors or omissions in Content published on the Website.</li>
        </ul>
        <p>
          Some jurisdictions do not allow the exclusion of certain warranties
          or the limitation of liability for consequential or incidental
          damages, so the above limitations may not apply to you.
        </p>
      </Section>

      <Divider />

      {/* Governing Law */}
      <Section id="law" title="Governing Law">
        <p>
          These Terms shall be governed by and construed in accordance with the
          laws of Sri Lanka, without regard to its conflict-of-law provisions.
          Your use of the Website may also be subject to other local, national,
          or international laws.
        </p>
      </Section>

      <Divider />

      {/* Disputes */}
      <Section id="disputes" title="Disputes Resolution">
        <p>
          If you have a concern or dispute regarding these Terms or your use of
          the Website, you agree to first attempt to resolve it informally by
          contacting me at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
          >
            {CONTACT_EMAIL}
          </a>
          . I will make every reasonable effort to resolve the matter promptly.
        </p>
        <p>
          If informal resolution is not possible within 30 days, the dispute
          shall be referred to the appropriate courts or alternative dispute
          resolution mechanisms available under Sri Lankan law.
        </p>
      </Section>

      <Divider />

      {/* EU Users */}
      <Section id="eu" title="For European Union (EU) Users">
        <p>
          If you are a consumer residing in the European Union, you benefit
          from any mandatory provisions of the law of the country in which you
          reside. Nothing in these Terms limits or excludes rights you have
          under EU consumer protection legislation, including the right to
          withdraw from a service contract within 14 days where applicable.
        </p>
      </Section>

      <Divider />

      {/* Severability */}
      <Section id="severability" title="Severability and Waiver">
        <SubSection title="Severability">
          <p>
            If any provision of these Terms is found to be unenforceable or
            invalid under applicable law, that provision will be modified to
            the minimum extent necessary to make it enforceable, or removed if
            modification is not possible. The remaining provisions will
            continue in full force and effect.
          </p>
        </SubSection>
        <SubSection title="Waiver">
          <p>
            Failure to exercise or enforce any right or provision of these
            Terms shall not constitute a waiver of that right or provision.
            Any waiver must be made in writing and signed by {OWNER} to be
            effective.
          </p>
        </SubSection>
      </Section>

      <Divider />

      {/* Changes */}
      <Section id="changes" title="Changes to These Terms">
        <p>
          I reserve the right to update or replace these Terms at any time at
          my sole discretion. Changes become effective when the updated Terms
          are posted on this page with a revised &quot;Last updated&quot; date.
        </p>
        <p>
          For material changes, a notice will be placed on the home page for a
          reasonable period. Your continued use of the Website after any change
          constitutes acceptance of the revised Terms. If you do not agree to
          the new Terms, please stop using the Website.
        </p>
      </Section>

      <Divider />

      {/* Contact */}
      <ContactSection />
    </main>
  );
}
