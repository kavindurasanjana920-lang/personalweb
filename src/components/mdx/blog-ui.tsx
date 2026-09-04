/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Table of contents                                                   */
/* ------------------------------------------------------------------ */

export function TOC({ items }: { items: { href: string; label: string }[] }) {
  return (
    <nav
      aria-label="Table of contents"
      className="not-prose my-8 rounded-xl border border-brand-border bg-brand-surface p-5"
    >
      <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" />
          <line x1="3" y1="12" x2="3.01" y2="12" />
          <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
        On this page
      </p>
      <ol className="m-0 grid list-none gap-x-6 gap-y-2 p-0 sm:grid-cols-2">
        {items.map((item, i) => (
          <li key={item.href} className="m-0 flex items-baseline gap-2.5 p-0">
            <span className="shrink-0 text-[11px] font-semibold tabular-nums text-brand">
              {String(i + 1).padStart(2, "0")}
            </span>
            <a
              href={item.href}
              className="text-sm text-muted-foreground no-underline transition-colors hover:text-brand"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Callout                                                             */
/* ------------------------------------------------------------------ */

const calloutVariants = {
  tip: {
    wrap: "border-brand-border bg-brand-surface",
    badge: "bg-brand text-white",
    title: "text-foreground",
    icon: (
      <>
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
      </>
    ),
  },
  info: {
    wrap: "border-info-border bg-info-surface",
    badge: "bg-info text-white",
    title: "text-foreground",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </>
    ),
  },
  note: {
    wrap: "border-note-border bg-note-surface",
    badge: "bg-note text-white",
    title: "text-foreground",
    icon: (
      <>
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </>
    ),
  },
} as const;

export function Callout({
  variant = "tip",
  title,
  children,
}: {
  variant?: keyof typeof calloutVariants;
  title?: string;
  children: ReactNode;
}) {
  const v = calloutVariants[variant] ?? calloutVariants.tip;
  return (
    <div className={`not-prose my-6 flex gap-3.5 rounded-xl border p-4 sm:p-5 ${v.wrap}`}>
      <span className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg ${v.badge}`}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {v.icon}
        </svg>
      </span>
      <div className="min-w-0 flex-1">
        {title && <p className={`mb-1 text-sm font-semibold ${v.title}`}>{title}</p>}
        <div className="text-sm leading-relaxed text-muted-foreground [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step card                                                           */
/* ------------------------------------------------------------------ */

export function StepCard({
  number,
  total = 5,
  title,
  image,
  alt,
  children,
}: {
  number: number | string;
  total?: number;
  title: string;
  image?: string;
  alt?: string;
  children?: ReactNode;
}) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center gap-3 border-b border-brand-border bg-brand-surface px-4 py-3 sm:px-5">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand text-sm font-bold text-white">
          {number}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-brand">
            Step {number} of {total}
          </p>
          <p className="truncate text-sm font-semibold text-foreground">{title}</p>
        </div>
      </div>
      {children && (
        <div className="px-4 py-3.5 text-sm leading-relaxed text-muted-foreground sm:px-5 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
          {children}
        </div>
      )}
      {image && (
        <img
          src={image}
          alt={alt ?? title}
          width={1344}
          height={756}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full border-t border-border"
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CTA box                                                             */
/* ------------------------------------------------------------------ */

function CTAButtons({
  href,
  label,
  official,
  officialHref,
  className = "",
}: {
  href: string;
  label: string;
  official?: string;
  officialHref?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-white no-underline shadow-sm transition-all hover:bg-brand-dark active:scale-95"
      >
        {label}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </a>
      {official && officialHref && (
        <a
          href={officialHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-brand/40 bg-transparent px-3.5 py-2 text-xs font-semibold text-brand no-underline transition-colors hover:border-brand hover:bg-brand/10"
        >
          {official}
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </a>
      )}
    </div>
  );
}

export function CTABox({
  title,
  children,
  href,
  label,
  official,
  officialHref,
}: {
  title?: string;
  children?: ReactNode;
  href: string;
  label: string;
  official?: string;
  officialHref?: string;
}) {
  // MDX hands us whitespace-only children for a self-closing tag, so key the
  // bare-buttons variant off `title` alone rather than testing children.
  if (!title) {
    return (
      <CTAButtons
        href={href}
        label={label}
        official={official}
        officialHref={officialHref}
        className="not-prose my-6"
      />
    );
  }

  return (
    <div className="not-prose my-8 rounded-2xl border border-brand-border bg-brand-surface p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m7.5 4.27 9 5.15" />
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
          </svg>
        </span>
        <div className="min-w-0 flex-1">
          {title && <p className="text-base font-bold leading-snug text-foreground">{title}</p>}
          {children && (
            <div className="mt-1.5 text-sm leading-relaxed text-muted-foreground [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
              {children}
            </div>
          )}
          <CTAButtons
            href={href}
            label={label}
            official={official}
            officialHref={officialHref}
            className="mt-4"
          />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Feature grid                                                        */
/* ------------------------------------------------------------------ */

const featureIcons = {
  place: (
    <>
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  fast: (
    <>
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </>
  ),
  couriers: (
    <>
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </>
  ),
} as const;

export function FeatureGrid({
  items,
}: {
  items: { icon?: keyof typeof featureIcons; title: string; text: string }[];
}) {
  return (
    <div className="not-prose my-6 grid gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.title}
          className="rounded-xl border border-brand-border bg-brand-surface p-4"
        >
          <span className="mb-3 flex size-9 items-center justify-center rounded-lg bg-brand text-white">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {featureIcons[item.icon ?? "place"]}
            </svg>
          </span>
          <p className="text-sm font-semibold text-foreground">{item.title}</p>
          <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{item.text}</p>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Courier section header                                              */
/* ------------------------------------------------------------------ */

export function CourierHeader({
  id,
  name,
  tagline,
}: {
  id: string;
  name: string;
  tagline?: string;
}) {
  return (
    <div id={id} className="not-prose mt-12 scroll-mt-24">
      <div className="flex items-center gap-3 rounded-xl border border-brand-border bg-brand-surface px-4 py-3.5 sm:px-5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand text-white">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
            <path d="M15 18H9" />
            <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
            <circle cx="17" cy="18" r="2" />
            <circle cx="7" cy="18" r="2" />
          </svg>
        </span>
        <div className="min-w-0">
          <h2 className="m-0 text-lg font-bold leading-tight text-foreground sm:text-xl">{name}</h2>
          {tagline && <p className="m-0 mt-0.5 text-xs text-muted-foreground">{tagline}</p>}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Comparison grid                                                     */
/* ------------------------------------------------------------------ */

export function Comparison({
  leftTitle,
  left,
  rightTitle,
  right,
}: {
  leftTitle: string;
  left: string[];
  rightTitle: string;
  right: string[];
}) {
  return (
    <div className="not-prose my-6 grid gap-3 sm:grid-cols-2">
      <div className="rounded-xl border border-brand-border bg-brand-surface p-4 sm:p-5">
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
          <svg className="text-brand" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          {leftTitle}
        </p>
        <ul className="m-0 list-none space-y-2 p-0">
          {left.map((t) => (
            <li key={t} className="m-0 flex items-start gap-2 p-0 text-[13px] leading-relaxed text-muted-foreground">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-border bg-neutral-surface p-4 sm:p-5">
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
          {rightTitle}
        </p>
        <ul className="m-0 list-none space-y-2 p-0">
          {right.map((t) => (
            <li key={t} className="m-0 flex items-start gap-2 p-0 text-[13px] leading-relaxed text-muted-foreground">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ (with FAQPage schema)                                           */
/* ------------------------------------------------------------------ */

export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  }).replace(/</g, "\\u003c");

  return (
    <div className="not-prose my-6">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: schema }}
      />
      <div className="divide-y divide-border overflow-hidden rounded-xl border border-border">
        {items.map((item) => (
          <details key={item.q} className="group bg-card">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-brand-surface sm:px-5">
              {item.q}
              <svg
                className="size-4 shrink-0 text-brand transition-transform group-open:rotate-45"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
            </summary>
            <p className="m-0 px-4 pb-4 text-sm leading-relaxed text-muted-foreground sm:px-5">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero / inline figure                                                */
/* ------------------------------------------------------------------ */

export function Figure({
  src,
  alt,
  caption,
  priority = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
}) {
  return (
    <figure className="not-prose my-8">
      <img
        src={src}
        alt={alt}
        width={1344}
        height={756}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        className="block h-auto w-full rounded-xl border border-border"
      />
      {caption && (
        <figcaption className="mt-2.5 text-center text-xs text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
