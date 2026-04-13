"use client";

import BlurFade from "@/components/magicui/blur-fade";
import {
  BlogPost,
  isBlogApiConfigured,
  publicGetPostBySlug,
  publicListPosts,
} from "@/lib/blog-api";
import { formatDate } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const BLUR_FADE_DELAY = 0.04;

function readSlugFromLocation(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  const params = new URLSearchParams(window.location.search);
  const querySlug = params.get("slug")?.trim();

  if (querySlug) {
    return decodeURIComponent(querySlug);
  }

  const segments = window.location.pathname.split("/").filter(Boolean);

  if (segments[0] !== "blog" || segments.length < 2) {
    return null;
  }

  return decodeURIComponent(segments[1]);
}

export default function BlogApiShell() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [locationReady, setLocationReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    setActiveSlug(readSlugFromLocation());
    setLocationReady(true);
  }, []);

  useEffect(() => {
    if (!locationReady) {
      return;
    }

    if (!isBlogApiConfigured()) {
      setError("Missing NEXT_PUBLIC_LARAVEL_API_URL in your Next.js environment.");
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    async function load(): Promise<void> {
      setIsLoading(true);
      setError(null);

      try {
        if (activeSlug) {
          const post = await publicGetPostBySlug(activeSlug);
          if (!cancelled) {
            setSelectedPost(post);
          }
          return;
        }

        const list = await publicListPosts();
        if (!cancelled) {
          setPosts(list);
          setSelectedPost(null);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load blog content right now."
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [locationReady, activeSlug]);

  return (
    <section id="blog">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold tracking-tight">Blog</h1>
          {selectedPost ? (
            <a
              href="/blog/"
              className="inline-flex items-center gap-1 rounded-lg border border-border px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Back to Blog"
            >
              <ChevronLeft className="size-3" />
              Back
            </a>
          ) : (
            <span className="rounded-md border border-border bg-card px-2 py-1 text-sm text-muted-foreground">
              {posts?.length ?? 0} posts
            </span>
          )}
        </div>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <p className="mt-2 mb-8 text-sm text-muted-foreground">
          Insights, technical lessons, and practical notes.
        </p>
      </BlurFade>

      {isLoading ? (
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <div className="rounded-xl border border-border px-4 py-6 text-sm text-muted-foreground">
            Loading blog content...
          </div>
        </BlurFade>
      ) : null}

      {!isLoading && error ? (
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <div className="rounded-xl border border-destructive/40 bg-destructive/5 px-4 py-6 text-sm text-destructive">
            {error}
          </div>
        </BlurFade>
      ) : null}

      {!isLoading && !error && selectedPost ? (
        <div className="space-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold tracking-tight leading-tight">
                {selectedPost.title}
              </h2>
              <p className="text-sm text-muted-foreground">
                {selectedPost.published_at
                  ? formatDate(selectedPost.published_at)
                  : "Draft"}
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <article className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {selectedPost.content}
              </ReactMarkdown>
            </article>
          </BlurFade>
        </div>
      ) : null}

      {!isLoading && !error && !selectedPost ? (
        (posts?.length ?? 0) > 0 ? (
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <div className="flex flex-col gap-5">
              {(posts ?? []).map((post, index) => (
                <BlurFade delay={BLUR_FADE_DELAY * 4 + index * 0.03} key={post.id}>
                  <a
                    href={`/blog/?slug=${encodeURIComponent(post.slug)}`}
                    className="group flex items-start gap-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <span className="mt-[5px] text-xs font-mono tabular-nums font-medium">
                      {String(index + 1).padStart(2, "0")}.
                    </span>
                    <div className="flex flex-1 flex-col gap-y-2">
                      <p className="text-lg font-medium tracking-tight">
                        <span className="transition-colors group-hover:text-foreground">
                          {post.title}
                          <ChevronRight
                            className="ml-1 inline-block size-4 -translate-x-2 stroke-3 text-muted-foreground opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                            aria-hidden
                          />
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {post.published_at ? formatDate(post.published_at) : "Draft"}
                      </p>
                    </div>
                  </a>
                </BlurFade>
              ))}
            </div>
          </BlurFade>
        ) : (
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <div className="rounded-xl border border-border px-4 py-10 text-center text-muted-foreground">
              No published blog posts yet.
            </div>
          </BlurFade>
        )
      ) : null}
    </section>
  );
}
