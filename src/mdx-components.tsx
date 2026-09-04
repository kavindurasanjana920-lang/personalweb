import { CodeBlock } from "@/components/mdx/code-block";
import { MediaContainer } from "@/components/mdx/media-container";
import {
  TOC,
  Callout,
  StepCard,
  CTABox,
  FeatureGrid,
  CourierHeader,
  Comparison,
  FAQ,
  Figure,
} from "@/components/mdx/blog-ui";
import type { ComponentProps } from "react";

function TrackCTA({ href, children, official, officialHref }: { href: string; children: React.ReactNode; official?: string; officialHref?: string }) {
  return (
    <div className="not-prose my-6 flex flex-nowrap items-center gap-2">
      <a
        href={href}
        className="inline-flex items-center gap-1.5 rounded-md bg-brand px-3 py-1.5 text-xs font-semibold text-white no-underline transition-all hover:bg-brand-dark active:scale-95 whitespace-nowrap"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
      </a>
      {official && officialHref && (
        <a
          href={officialHref}
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground no-underline transition-colors hover:border-brand/40 hover:text-brand whitespace-nowrap"
          target="_blank"
          rel="noopener noreferrer"
        >
          {official}
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
        </a>
      )}
    </div>
  );
}

type CodeProps = ComponentProps<"code"> & {
  "data-language"?: string;
};

export const mdxComponents = {
  TrackCTA,
  MediaContainer,
  TOC,
  Callout,
  StepCard,
  CTABox,
  FeatureGrid,
  CourierHeader,
  Comparison,
  FAQ,
  Figure,
  pre: (props: ComponentProps<"pre">) => <CodeBlock {...props} />,
  hr: (props: ComponentProps<"hr">) => (
    <div className="my-10 flex w-full items-center" {...props}>
      <div
        className="flex-1 h-px bg-border"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        }}
      />
    </div>
  ),
  table: (props: ComponentProps<"table">) => (
    <div className="my-6 border border-border rounded-xl overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table
          className="m-0! w-full min-w-full border-separate border-spacing-0"
          {...props}
        />
      </div>
    </div>
  ),
  code: ({ children, ...props }: CodeProps) => {
    if (props["data-language"]) {
      return <code {...props}>{children}</code>;
    }
    return (
      <code
        className="px-1.5 py-0.5 rounded-md bg-muted/60 dark:bg-muted/40 text-sm font-mono text-foreground/90"
        {...props}
      >
        {children}
      </code>
    );
  },
} as const;

