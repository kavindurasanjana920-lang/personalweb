import type { Metadata } from "next";
import Link from "next/link";
import ContactSection from "@/components/section/contact-section";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for thekavindu.lk — how Kavindu Rasanjana collects, uses, and protects your personal data.",
  keywords: [
    "Privacy Policy",
    "thekavindu.lk",
    "Data Protection",
    "Cookie Policy",
    "GDPR",
    "Personal Data",
    "Kavindu Rasanjana",
  ],
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

export default function PrivacyPage() {
  return (
    <main className="min-h-dvh space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted-foreground">
          Last updated:{" "}
          <span className="font-medium text-foreground">{LAST_UPDATED}</span>
        </p>
        <p className="text-pretty text-muted-foreground md:text-lg max-w-2xl">
          This Privacy Policy describes how {OWNER} (&quot;I&quot;, &quot;me&quot;, or
          &quot;my&quot;) collects, uses, and shares information when you visit{" "}
          <Link href={SITE_URL} className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors">
            thekavindu.lk
          </Link>{" "}
          (the &quot;Website&quot;). By using this Website you agree to the practices
          described in this policy.
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
            <li><span className="font-medium text-foreground">You:</span> Any person who accesses or uses this Website.</li>
            <li><span className="font-medium text-foreground">Personal Data:</span> Any information that identifies or can identify a natural person directly or indirectly — for example, a name or email address.</li>
            <li><span className="font-medium text-foreground">Usage Data:</span> Data collected automatically when you browse the Website, such as IP address, browser type, pages visited, and time spent.</li>
            <li><span className="font-medium text-foreground">Cookies:</span> Small files placed on your device by a website. This Website uses localStorage equivalents and third-party analytics cookies.</li>
            <li><span className="font-medium text-foreground">Third-Party Services:</span> External platforms used to operate the Website, including Google Analytics (via Google Tag Manager) and Make.com for contact-form processing.</li>
          </ol>
        </SubSection>
      </Section>

      <Divider />

      {/* Collecting and Using Your Data */}
      <Section id="data-collection" title="Collecting and Using Your Personal Data">
        <SubSection title="Types of Data Collected">
          <p className="font-medium text-foreground">Personal Data (Contact Form)</p>
          <p>
            When you submit the contact form on the{" "}
            <Link href="/contact" className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors">Contact</Link>{" "}
            page, the following information is collected:
          </p>
          <ul className="list-disc list-outside space-y-1 pl-4">
            <li>Full name</li>
            <li>Email address</li>
            <li>Subject / project topic</li>
            <li>Message content</li>
          </ul>
          <p>
            This data is transmitted securely to a Make.com (Integromat) webhook hosted
            on EU servers (<code className="text-xs bg-muted px-1 py-0.5 rounded">hook.eu1.make.com</code>)
            and is used solely to respond to your enquiry. It is not stored in any
            database on this Website.
          </p>
        </SubSection>

        <SubSection title="Usage Data">
          <p>
            Usage Data is collected automatically when you visit the Website.
            This may include your IP address, browser type and version, the pages
            you visit, time and date of your visit, time spent on each page, and
            referral source. This data is collected by{" "}
            Google Tag Manager{" "}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">GTM-W83VHS8G</code>{" "}
            and processed by Google Analytics in accordance with{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
            >
              Google&apos;s Privacy Policy
            </a>
            .
          </p>
        </SubSection>

        <SubSection title="Cookies and Local Storage">
          <p>
            This Website uses browser <strong className="text-foreground">localStorage</strong> (not
            server-side cookies) to store:
          </p>
          <ul className="list-disc list-outside space-y-1 pl-4">
            <li>
              <span className="text-foreground font-medium">Theme preference</span> — whether
              you have selected dark or light mode.
            </li>
            <li>
              <span className="text-foreground font-medium">Cookie consent choice</span> — which
              categories of tracking you have accepted or rejected
              (key: <code className="text-xs bg-muted px-1 py-0.5 rounded">cookie_consent_v1</code>).
            </li>
          </ul>
          <p>
            Google Analytics (loaded via GTM) may also set its own cookies
            (<code className="text-xs bg-muted px-1 py-0.5 rounded">_ga</code>,{" "}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">_gid</code>) on your
            device only if you accept Analytics cookies via the consent banner.
            You can update your preferences at any time using the cookie icon
            in the bottom-left corner of the page.
          </p>
        </SubSection>
      </Section>

      <Divider />

      {/* Use of Personal Data */}
      <Section id="use-of-data" title="Use of Your Personal Data">
        <p>The data collected is used for the following purposes:</p>
        <ul className="list-disc list-outside space-y-2 pl-4">
          <li>
            <span className="text-foreground font-medium">To respond to enquiries</span> —
            contact-form submissions are used exclusively to reply to project
            or collaboration requests.
          </li>
          <li>
            <span className="text-foreground font-medium">To analyse site performance</span> —
            usage data helps understand which content is valuable and how
            visitors navigate the Website, so it can be improved over time.
          </li>
          <li>
            <span className="text-foreground font-medium">To remember your preferences</span> —
            localStorage values keep your theme and consent choices persistent
            across sessions without re-prompting.
          </li>
          <li>
            <span className="text-foreground font-medium">To comply with legal obligations</span> —
            data may be retained where required by applicable law.
          </li>
        </ul>
        <p>
          Your personal data is <strong className="text-foreground">never sold</strong>,
          rented, or shared with advertisers or marketing platforms.
        </p>
      </Section>

      <Divider />

      {/* Retention */}
      <Section id="retention" title="Retention of Your Personal Data">
        <p>
          Contact-form submissions are retained in Make.com for as long as
          necessary to fulfil the purpose for which they were collected (i.e.,
          responding to your message) and are deleted once the conversation is
          concluded, unless a longer retention period is required by law.
        </p>
        <p>
          Usage data collected by Google Analytics is retained according to the
          retention settings configured in the Google Analytics account
          (typically 14 months). LocalStorage data persists in your own browser
          indefinitely until you clear your browser data or revoke consent.
        </p>
      </Section>

      <Divider />

      {/* Transfer */}
      <Section id="transfer" title="Transfer of Your Personal Data">
        <p>
          Contact-form data is processed by Make.com on servers located in the
          European Union. Google Analytics processes usage data on servers
          operated by Google LLC, which may be located outside your country of
          residence. Google is certified under standard contractual clauses
          that provide adequate data-protection safeguards.
        </p>
        <p>
          By submitting the contact form or accepting analytics cookies, you
          consent to this transfer. If you are located in the EEA or another
          jurisdiction with data-transfer restrictions, you have the right to
          withdraw consent at any time by contacting me at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </Section>

      <Divider />

      {/* Delete */}
      <Section id="delete" title="Delete Your Personal Data">
        <p>
          You have the right to request deletion of any personal data I hold
          about you. To do so:
        </p>
        <ul className="list-disc list-outside space-y-1 pl-4">
          <li>
            Email{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
            >
              {CONTACT_EMAIL}
            </a>{" "}
            with the subject line &quot;Data Deletion Request&quot;.
          </li>
          <li>
            Clear your browser&apos;s localStorage to remove theme and consent
            data stored locally on your device.
          </li>
        </ul>
        <p>
          Requests will be acknowledged within 5 business days and fulfilled
          within 30 days where technically feasible.
        </p>
      </Section>

      <Divider />

      {/* Security */}
      <Section id="security" title="Security of Your Personal Data">
        <p>
          The Website is served over HTTPS with TLS encryption. Contact-form
          data is transmitted directly to Make.com over an encrypted connection
          and is not stored in any database on this Website&apos;s servers.
        </p>
        <p>
          While industry-standard measures are in place, no method of
          transmission over the internet is 100% secure. I cannot guarantee
          absolute security, but I am committed to protecting your data using
          commercially reasonable means.
        </p>
      </Section>

      <Divider />

      {/* Children's Privacy */}
      <Section id="children" title="Children's Privacy">
        <p>
          This Website is not directed at children under the age of 13 and does
          not knowingly collect personal data from minors. If you believe a
          child has submitted personal data through this Website, please contact
          me at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
          >
            {CONTACT_EMAIL}
          </a>{" "}
          and the data will be deleted promptly.
        </p>
      </Section>

      <Divider />

      {/* External Links */}
      <Section id="links" title="Links to Other Websites">
        <p>
          This Website contains links to external sites (GitHub, LinkedIn,
          project demos, etc.) that are not operated by me. Clicking a
          third-party link will take you to that site. I have no control over
          and assume no responsibility for the content, privacy policies, or
          practices of any third-party sites. I encourage you to review the
          privacy policy of every site you visit.
        </p>
      </Section>

      <Divider />

      {/* Changes */}
      <Section id="changes" title="Changes to This Privacy Policy">
        <p>
          This Privacy Policy may be updated from time to time. Changes become
          effective when the updated policy is posted on this page with a revised
          &quot;Last updated&quot; date. For material changes, a notice will be placed
          on the home page for a reasonable period.
        </p>
        <p>
          Your continued use of the Website after any change constitutes your
          acceptance of the revised policy.
        </p>
      </Section>

      <Divider />

      {/* Refund Policy */}
      <Section id="refund" title="Refund Policy">
        <p>
          For professional services (web development, AI automation, mobile
          apps, and product integrations) engaged through this Website:
        </p>
        <ul className="list-disc list-outside space-y-2 pl-4">
          <li>
            <span className="text-foreground font-medium">Discovery / consultation fees</span> —
            non-refundable once the session has taken place.
          </li>
          <li>
            <span className="text-foreground font-medium">Project deposits</span> — refundable
            within 7 days of payment if no development work has commenced.
            Once work begins, deposits are non-refundable.
          </li>
          <li>
            <span className="text-foreground font-medium">Milestone payments</span> — non-refundable
            once the corresponding deliverable has been reviewed and accepted
            by the client.
          </li>
          <li>
            <span className="text-foreground font-medium">Disputes</span> — if you are
            unsatisfied with a deliverable, contact me within 7 days of
            delivery and I will work to resolve the issue through reasonable
            revisions before any refund is considered.
          </li>
        </ul>
        <p>
          All refund requests must be sent to{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </Section>

      <Divider />

      {/* Contact */}
      <ContactSection />

    </main>
  );
}
