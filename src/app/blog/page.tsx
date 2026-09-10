/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import { allPosts } from "content-collections";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

const DESCRIPTION =
  "Guides on tracking parcels in Sri Lanka — Koombiyo, Domex, TransExpress, Royal Express and FDE, all from one page.";

export const metadata: Metadata = {
  title: "Blog",
  description: DESCRIPTION,
  openGraph: {
    title: "Blog",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description: DESCRIPTION,
  },
};

const BLUR_FADE_DELAY = 0.04;

/** The pillar guide is pinned to the top of the listing. */
const FEATURED_SLUG = "courier-tracking-sri-lanka";

export default function BlogPage() {
  const sortedPosts = [...allPosts].sort((a, b) => {
    const aSlug = a._meta.path.replace(/\.mdx$/, "");
    const bSlug = b._meta.path.replace(/\.mdx$/, "");

    // Pin the pillar guide first, then newest-first by publish date.
    if (aSlug === FEATURED_SLUG) return -1;
    if (bSlug === FEATURED_SLUG) return 1;

    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  return (
    <section id="blog">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="text-2xl font-semibold tracking-tight mb-2">
          Blog
          <span className="ml-2 bg-card border border-border rounded-md px-2 py-1 text-muted-foreground text-sm font-normal align-middle">
            {sortedPosts.length} posts
          </span>
        </h1>
        <p className="text-sm text-muted-foreground mb-8 max-w-xl">
          {DESCRIPTION}
        </p>
      </BlurFade>

      {sortedPosts.length > 0 ? (
        <div className="flex flex-col divide-y divide-border border-t border-border">
          {sortedPosts.map((post, id) => {
            const slug = post._meta.path.replace(/\.mdx$/, "");
            const isFeatured = slug === FEATURED_SLUG;

            return (
              <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.04} key={slug}>
                <Link
                  href={`/blog/${slug}`}
                  className="group flex items-start gap-4 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:gap-5"
                >
                  {/* Thumbnail */}
                  <div className="relative w-28 shrink-0 overflow-hidden rounded-lg border border-border bg-muted sm:w-44">
                    <div className="aspect-[16/10]">
                      {post.image ? (
                        <img
                          src={post.image}
                          alt=""
                          width={352}
                          height={220}
                          loading={id < 3 ? "eager" : "lazy"}
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-muted to-accent" />
                      )}
                    </div>
                  </div>

                  {/* Text */}
                  <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                    {isFeatured && (
                      <span className="w-fit rounded-md border border-brand-border bg-brand-surface px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand">
                        Start here
                      </span>
                    )}

                    <h2 className="text-balance text-base font-semibold leading-snug tracking-tight text-foreground sm:text-lg">
                      {post.title}
                      <ArrowUpRight
                        className="ml-0.5 inline-block size-4 shrink-0 -translate-y-px text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                        aria-hidden
                      />
                    </h2>

                    {post.summary && (
                      <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {post.summary}
                      </p>
                    )}

                    <time
                      dateTime={post.publishedAt}
                      className="mt-0.5 text-xs text-muted-foreground"
                    >
                      {formatDate(post.publishedAt)}
                    </time>
                  </div>
                </Link>
              </BlurFade>
            );
          })}
        </div>
      ) : (
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="flex flex-col items-center justify-center py-12 px-4 border border-border rounded-xl">
            <p className="text-muted-foreground text-center">
              No blog posts yet. Check back soon!
            </p>
          </div>
        </BlurFade>
      )}
    </section>
  );
}
