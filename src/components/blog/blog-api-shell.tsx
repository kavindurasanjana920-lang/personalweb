"use client";

import BlurFade from "@/components/magicui/blur-fade";
import {
  BlogPost,
  isBlogApiConfigured,
  publicGetPostBySlug,
  publicListPosts,
} from "@/lib/blog-api";
import { formatDate } from "@/lib/utils";
import { Check, ChevronLeft, ChevronRight, Copy } from "lucide-react";
import {
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactNode,
  useEffect,
  useState,
} from "react";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const BLUR_FADE_DELAY = 0.04;

function getPostHref(slug: string): string {
  return `/blog/?slug=${encodeURIComponent(slug)}`;
}

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

function readNodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(readNodeText).join("");
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return readNodeText(node.props.children);
  }

  return "";
}

function MarkdownPre({ children, ...props }: ComponentPropsWithoutRef<"pre">) {
  const [copied, setCopied] = useState(false);
  const codeText = readNodeText(children).replace(/\n$/, "");

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setCopied(false);
    }, 1400);

    return () => window.clearTimeout(timeoutId);
  }, [copied]);

  async function copyCode(): Promise<void> {
    if (!codeText.trim()) {
      return;
    }

    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        className="code-copy-btn"
        onClick={() => void copyCode()}
        aria-label={copied ? "Code copied" : "Copy code"}
      >
        {copied ? <Check className="size-3" aria-hidden /> : <Copy className="size-3" aria-hidden />}
        {copied ? "Copied" : "Copy"}
      </button>
      <pre {...props}>{children}</pre>
    </div>
  );
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
          const [post, list] = await Promise.all([
            publicGetPostBySlug(activeSlug),
            publicListPosts().catch(() => []),
          ]);

          if (!cancelled) {
            setSelectedPost(post);
            setPosts(list);
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

  const currentPostIndex = selectedPost
    ? posts.findIndex((post) => post.slug === selectedPost.slug)
    : -1;

  const previousPost = currentPostIndex > 0 ? posts[currentPostIndex - 1] : null;
  const nextPost =
    currentPostIndex >= 0 && currentPostIndex < posts.length - 1
      ? posts[currentPostIndex + 1]
      : null;

  return (
    <section id="blog">
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
        <>
          <div className="flex justify-start gap-4 items-center">
            <a
              href="/blog/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg px-2 py-1 inline-flex items-center gap-1 mb-6 group"
              aria-label="Back to Blog"
            >
              <ChevronLeft className="size-3 group-hover:-translate-x-px transition-transform" />
              Back to Blog
            </a>
          </div>

          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <div className="flex flex-col gap-4">
              <h1 className="title font-semibold text-3xl md:text-4xl tracking-tighter leading-tight">
                {selectedPost.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                {selectedPost.published_at
                  ? formatDate(selectedPost.published_at)
                  : "Draft"}
              </p>
            </div>
          </BlurFade>

          <div className="my-6 flex w-full items-center">
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

          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <article className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeHighlight]}
                components={{
                  pre: MarkdownPre,
                }}
              >
                {selectedPost.content}
              </ReactMarkdown>
            </article>
          </BlurFade>

          <nav className="mt-12 pt-8 max-w-2xl">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              {previousPost ? (
                <a
                  href={getPostHref(previousPost.slug)}
                  className="group flex-1 flex flex-col gap-1 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                >
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <ChevronLeft className="size-3" />
                    Previous
                  </span>
                  <span className="text-sm font-medium group-hover:text-foreground transition-colors break-words">
                    {previousPost.title}
                  </span>
                </a>
              ) : (
                <div className="hidden sm:block flex-1" />
              )}

              {nextPost ? (
                <a
                  href={getPostHref(nextPost.slug)}
                  className="group flex-1 flex flex-col gap-1 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors text-right"
                >
                  <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                    Next
                    <ChevronRight className="size-3" />
                  </span>
                  <span className="text-sm font-medium group-hover:text-foreground transition-colors break-words">
                    {nextPost.title}
                  </span>
                </a>
              ) : (
                <div className="hidden sm:block flex-1" />
              )}
            </div>
          </nav>
        </>
      ) : null}

      {!isLoading && !error && !selectedPost ? (
        (posts?.length ?? 0) > 0 ? (
          <>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <h1 className="text-2xl font-semibold tracking-tight mb-2">
                Blog{" "}
                <span className="ml-1 bg-card border border-border rounded-md px-2 py-1 text-muted-foreground text-sm">
                  {posts.length} posts
                </span>
              </h1>
              <p className="text-sm text-muted-foreground mb-8">
                My thoughts on software development, life, and more.
              </p>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <div className="flex flex-col gap-5">
                {(posts ?? []).map((post, index) => (
                  <BlurFade delay={BLUR_FADE_DELAY * 3 + index * 0.05} key={post.id}>
                    <a
                      className="flex items-start gap-x-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      href={getPostHref(post.slug)}
                    >
                      <span className="text-xs font-mono tabular-nums font-medium mt-[5px]">
                        {String(index + 1).padStart(2, "0")}.
                      </span>
                      <div className="flex flex-col gap-y-2 flex-1">
                        <p className="tracking-tight text-lg font-medium">
                          <span className="group-hover:text-foreground transition-colors">
                            {post.title}
                            <ChevronRight
                              className="ml-1 inline-block size-4 stroke-3 text-muted-foreground opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
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
          </>
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
