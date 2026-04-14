"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  adminCreatePost,
  adminDeletePost,
  adminListPosts,
  adminLogout,
  adminMe,
  adminUpdatePost,
  BlogPost,
  BlogPostPayload,
  clearAdminToken,
  getStoredAdminToken,
  isBlogApiConfigured,
} from "@/lib/blog-api";
import { formatDate } from "@/lib/utils";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

interface PostFormState {
  title: string;
  slug: string;
  summary: string;
  content: string;
  isPublished: boolean;
  publishedAt: string;
}

const EMPTY_FORM: PostFormState = {
  title: "",
  slug: "",
  summary: "",
  content: "",
  isPublished: true,
  publishedAt: "",
};

function toDateTimeLocal(value: string | null): string {
  if (!value) {
    return "";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  const localDate = new Date(parsed.getTime() - parsed.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 16);
}

function toIsoOrNull(value: string): string | null {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed.toISOString();
}

type EditorAction =
  | "headingLarge"
  | "headingMedium"
  | "numberedList"
  | "bulletedList"
  | "highlight"
  | "bold"
  | "inlineCode"
  | "codeBlock"
  | "image";

interface EditorTransformResult {
  nextValue: string;
  selectionStart: number;
  selectionEnd: number;
}

function stripHeadingPrefix(value: string): string {
  return value.replace(/^#{1,6}\s+/, "").trim();
}

function stripListPrefix(value: string): string {
  return value.replace(/^\s*(?:[-*+]|\d+\.)\s+/, "").trim();
}

function wrapSelection(
  value: string,
  selectionStart: number,
  selectionEnd: number,
  before: string,
  after: string,
  fallbackText: string
): EditorTransformResult {
  const selectedText = value.slice(selectionStart, selectionEnd);
  const body = selectedText || fallbackText;
  const inserted = `${before}${body}${after}`;

  return {
    nextValue: `${value.slice(0, selectionStart)}${inserted}${value.slice(selectionEnd)}`,
    selectionStart: selectionStart + before.length,
    selectionEnd: selectionStart + before.length + body.length,
  };
}

function transformSelectedLines(
  value: string,
  selectionStart: number,
  selectionEnd: number,
  mapLine: (line: string, index: number) => string,
  fallbackLine: string
): EditorTransformResult {
  const selectedText = value.slice(selectionStart, selectionEnd);
  const lines = (selectedText || fallbackLine).split("\n");
  const transformed = lines.map((line, index) => mapLine(line, index)).join("\n");

  return {
    nextValue: `${value.slice(0, selectionStart)}${transformed}${value.slice(selectionEnd)}`,
    selectionStart,
    selectionEnd: selectionStart + transformed.length,
  };
}

function wrapCodeBlock(
  value: string,
  selectionStart: number,
  selectionEnd: number,
  language: string,
  fallbackCode: string
): EditorTransformResult {
  const selectedText = value.slice(selectionStart, selectionEnd);
  const body = selectedText || fallbackCode;

  const prefixNeedsGap = selectionStart > 0 && value[selectionStart - 1] !== "\n";
  const suffixNeedsGap = selectionEnd < value.length && value[selectionEnd] !== "\n";

  const prefix = prefixNeedsGap ? "\n\n" : "";
  const suffix = suffixNeedsGap ? "\n\n" : "\n";
  const opening = "```" + language + "\n";
  const closing = "\n```";
  const inserted = prefix + opening + body + closing + suffix;
  const start = selectionStart + prefix.length + opening.length;

  return {
    nextValue: `${value.slice(0, selectionStart)}${inserted}${value.slice(selectionEnd)}`,
    selectionStart: start,
    selectionEnd: start + body.length,
  };
}

export default function AdminPostsPage() {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [formState, setFormState] = useState<PostFormState>(EMPTY_FORM);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const contentTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const token = getStoredAdminToken();

    if (!token) {
      window.location.replace("/admin/login/");
      return;
    }

    adminMe(token)
      .then(() => {
        setAuthToken(token);
        setIsCheckingSession(false);
      })
      .catch(() => {
        clearAdminToken();
        window.location.replace("/admin/login/");
      });
  }, []);

  useEffect(() => {
    if (!authToken) {
      return;
    }

    const token = authToken;

    let cancelled = false;

    async function loadPosts(): Promise<void> {
      setIsLoadingPosts(true);
      setError(null);

      try {
        const data = await adminListPosts(token);
        if (!cancelled) {
          setPosts(data);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load posts right now."
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoadingPosts(false);
        }
      }
    }

    loadPosts();

    return () => {
      cancelled = true;
    };
  }, [authToken]);

  async function refreshPosts(tokenOverride?: string): Promise<void> {
    const token = tokenOverride ?? authToken;

    if (!token) {
      return;
    }

    const data = await adminListPosts(token);
    setPosts(data);
  }

  function resetForm(): void {
    setFormState(EMPTY_FORM);
    setEditingPostId(null);
  }

  function startEdit(post: BlogPost): void {
    setEditingPostId(post.id);
    setFormState({
      title: post.title,
      slug: post.slug,
      summary: post.summary ?? "",
      content: post.content,
      isPublished: post.is_published,
      publishedAt: toDateTimeLocal(post.published_at),
    });
  }

  function applyEditorAction(action: EditorAction): void {
    const textarea = contentTextareaRef.current;
    if (!textarea) {
      return;
    }

    const value = textarea.value;
    const selectionStart = textarea.selectionStart ?? 0;
    const selectionEnd = textarea.selectionEnd ?? selectionStart;

    let transformed: EditorTransformResult;

    switch (action) {
      case "headingLarge":
        transformed = transformSelectedLines(
          value,
          selectionStart,
          selectionEnd,
          (line) => `# ${stripHeadingPrefix(line) || "Heading"}`,
          "Heading"
        );
        break;
      case "headingMedium":
        transformed = transformSelectedLines(
          value,
          selectionStart,
          selectionEnd,
          (line) => `### ${stripHeadingPrefix(line) || "Subheading"}`,
          "Subheading"
        );
        break;
      case "numberedList":
        transformed = transformSelectedLines(
          value,
          selectionStart,
          selectionEnd,
          (line, index) => `${index + 1}. ${stripListPrefix(line) || "List item"}`,
          "List item"
        );
        break;
      case "bulletedList":
        transformed = transformSelectedLines(
          value,
          selectionStart,
          selectionEnd,
          (line) => `- ${stripListPrefix(line) || "List item"}`,
          "List item"
        );
        break;
      case "highlight":
        transformed = wrapSelection(
          value,
          selectionStart,
          selectionEnd,
          "<mark>",
          "</mark>",
          "highlight text"
        );
        break;
      case "bold":
        transformed = wrapSelection(
          value,
          selectionStart,
          selectionEnd,
          "**",
          "**",
          "bold text"
        );
        break;
      case "inlineCode":
        transformed = wrapSelection(
          value,
          selectionStart,
          selectionEnd,
          "`",
          "`",
          "main"
        );
        break;
      case "codeBlock":
        transformed = wrapCodeBlock(
          value,
          selectionStart,
          selectionEnd,
          "tsx",
          "// your code here"
        );
        break;
      case "image":
        transformed = wrapSelection(
          value,
          selectionStart,
          selectionEnd,
          "![",
          "](https://example.com/image.jpg)",
          "alt text"
        );
        break;
      default:
        return;
    }

    setFormState((prev) => ({ ...prev, content: transformed.nextValue }));

    requestAnimationFrame(() => {
      const editor = contentTextareaRef.current;
      if (!editor) {
        return;
      }

      editor.focus();
      editor.setSelectionRange(transformed.selectionStart, transformed.selectionEnd);
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (!authToken) {
      setError("Session expired. Please log in again.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    const payload: BlogPostPayload = {
      title: formState.title.trim(),
      content: formState.content,
      is_published: formState.isPublished,
      published_at: toIsoOrNull(formState.publishedAt),
    };

    const normalizedSlug = formState.slug.trim();
    if (normalizedSlug) {
      payload.slug = normalizedSlug;
    }

    const normalizedSummary = formState.summary.trim();
    payload.summary = normalizedSummary ? normalizedSummary : null;

    try {
      if (editingPostId) {
        await adminUpdatePost(authToken, editingPostId, payload);
      } else {
        await adminCreatePost(authToken, payload);
      }

      await refreshPosts(authToken);
      resetForm();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to save post right now."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(postId: number): Promise<void> {
    if (!authToken) {
      setError("Session expired. Please log in again.");
      return;
    }

    const confirmed = window.confirm("Delete this post permanently?");
    if (!confirmed) {
      return;
    }

    setError(null);

    try {
      await adminDeletePost(authToken, postId);
      await refreshPosts(authToken);

      if (editingPostId === postId) {
        resetForm();
      }
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Unable to delete post right now."
      );
    }
  }

  async function handleLogout(): Promise<void> {
    if (!authToken) {
      clearAdminToken();
      window.location.replace("/admin/login/");
      return;
    }

    try {
      await adminLogout(authToken);
    } catch {
      // Ignore API logout failure and clear local token anyway.
    } finally {
      clearAdminToken();
      window.location.replace("/admin/login/");
    }
  }

  const headingText = useMemo(
    () => (editingPostId ? "Edit Post" : "Create Post"),
    [editingPostId]
  );

  if (!isBlogApiConfigured()) {
    return (
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight">Admin Posts</h1>
        <p className="rounded-xl border border-destructive/40 bg-destructive/5 px-4 py-4 text-sm text-destructive">
          Missing NEXT_PUBLIC_LARAVEL_API_URL. Set it in your Next.js environment
          before using admin pages.
        </p>
      </section>
    );
  }

  if (isCheckingSession) {
    return (
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight">Admin Posts</h1>
        <p className="rounded-xl border border-border px-4 py-4 text-sm text-muted-foreground">
          Validating admin session...
        </p>
      </section>
    );
  }

  return (
    <section id="admin-posts" className="flex min-h-0 flex-col gap-y-8 pb-10">
      <div className="flex flex-col gap-y-4 sm:flex-row sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tighter">Admin Dashboard</h2>
          <p className="text-muted-foreground mt-1">
            Manage your Laravel-backed blog posts directly from Next.js.
          </p>
        </div>
        <Button type="button" variant="outline" onClick={handleLogout} className="w-fit">
          Sign Out
        </Button>
      </div>

      {error ? (
        <p className="rounded-lg border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive font-medium">
          {error}
        </p>
      ) : null}

      <div className="flex flex-col gap-y-12 mt-2">
        <div className="flex min-h-0 flex-col gap-y-6">
          <h2 className="text-xl font-bold">{headingText}</h2>
          <div className="border rounded-xl p-6 bg-card relative">
            <form className="flex min-h-0 flex-col gap-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-y-1.5">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <input
                id="title"
                required
                value={formState.title}
                onChange={(event) =>
                  setFormState((prev) => ({ ...prev, title: event.target.value }))
                }
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Post title"
              />
            </div>

            <div className="flex flex-col gap-y-1.5">
              <label htmlFor="slug" className="text-sm font-medium">
                Slug (optional)
              </label>
              <input
                id="slug"
                value={formState.slug}
                onChange={(event) =>
                  setFormState((prev) => ({ ...prev, slug: event.target.value }))
                }
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="my-first-post"
              />
            </div>

            <div className="flex flex-col gap-y-1.5">
              <label htmlFor="summary" className="text-sm font-medium">
                Summary (optional)
              </label>
              <textarea
                id="summary"
                rows={3}
                value={formState.summary}
                onChange={(event) =>
                  setFormState((prev) => ({ ...prev, summary: event.target.value }))
                }
                className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Short summary for previews"
              />
            </div>

            <div className="flex flex-col gap-y-1.5">
              <label htmlFor="content" className="text-sm font-medium">
                Content (Markdown)
              </label>
              <div className="flex flex-wrap gap-2 pb-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => applyEditorAction("headingLarge")}
                >
                  Heading L
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => applyEditorAction("headingMedium")}
                >
                  Heading M
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => applyEditorAction("numberedList")}
                >
                  Numbering
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => applyEditorAction("bulletedList")}
                >
                  Pointing
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => applyEditorAction("highlight")}
                >
                  Highlight
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => applyEditorAction("bold")}
                >
                  Bold
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => applyEditorAction("inlineCode")}
                >
                  Inline Code
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => applyEditorAction("codeBlock")}
                >
                  Code Block
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => applyEditorAction("image")}
                >
                  Image
                </Button>
              </div>
              <p className="text-xs text-muted-foreground pb-2">
                Select text and click a formatting button. Heading L and Heading M
                are two different font sizes in your blog view. Code Block inserts
                fenced markdown with language support.
              </p>
              <textarea
                id="content"
                ref={contentTextareaRef}
                rows={16}
                required
                value={formState.content}
                onChange={(event) =>
                  setFormState((prev) => ({ ...prev, content: event.target.value }))
                }
                className="flex min-h-[300px] w-full rounded-md border border-input bg-transparent px-4 py-3 font-mono text-sm leading-relaxed shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                placeholder="# Your post title"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 pt-4">
              <label className="flex items-center gap-3 rounded-lg border border-input bg-muted/20 px-4 py-3 text-sm font-medium hover:bg-muted/40 cursor-pointer transition-colors shadow-sm">
                <input
                  type="checkbox"
                  checked={formState.isPublished}
                  onChange={(event) =>
                    setFormState((prev) => ({
                      ...prev,
                      isPublished: event.target.checked,
                    }))
                  }
                  className="size-4.5 accent-primary cursor-pointer"
                />
                Publish immediately
              </label>

              <div className="flex flex-col gap-y-1.5">
                <label htmlFor="publishedAt" className="text-sm font-medium">
                  Schedule publish at (optional)
                </label>
                <input
                  id="publishedAt"
                  type="datetime-local"
                  value={formState.publishedAt}
                  onChange={(event) =>
                    setFormState((prev) => ({
                      ...prev,
                      publishedAt: event.target.value,
                    }))
                  }
                  className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-6 border-t border-border/40 mt-4">
              <Button type="submit" disabled={isSubmitting} className="w-fit">
                {isSubmitting
                  ? "Saving..."
                  : editingPostId
                    ? "Update Post"
                    : "Create New Post"}
              </Button>
              {editingPostId ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  disabled={isSubmitting}
                  className="w-fit"
                >
                  Cancel Edit
                </Button>
              ) : null}
            </div>
          </form>
        </div>
        </div>

        <div className="flex min-h-0 flex-col gap-y-6">
          <h2 className="text-xl font-bold tracking-tight">Your Posts</h2>
          <div className="flex flex-col gap-y-4">
            {isLoadingPosts ? (
              <div className="rounded-xl border border-border px-4 py-8 text-center text-sm text-muted-foreground">
                Loading posts...
              </div>
            ) : null}

            {!isLoadingPosts && posts.length === 0 ? (
              <div className="rounded-xl border border-border px-4 py-12 text-center text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">No posts yet</p>
                <p>Write your first post above to get started.</p>
              </div>
            ) : null}

            {!isLoadingPosts && posts.length > 0
              ? posts.map((post) => (
                  <div
                    key={post.id}
                    className="border rounded-xl p-5 bg-card flex flex-col gap-y-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex flex-col gap-y-1.5 flex-1 pr-4">
                      <div className="flex items-center gap-3">
                        <p className="font-semibold text-lg tracking-tight">{post.title}</p>
                        <span className={`px-2 py-0.5 text-[10px] font-medium rounded border ${post.is_published ? 'bg-green-500/10 text-green-600 border-green-500/20' : 'bg-amber-500/10 text-amber-600 border-amber-500/20'}`}>
                          {post.is_published ? "Live" : "Draft"}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        <span className="font-mono bg-muted/50 px-1 rounded border border-border/40">/{post.slug}</span>
                        <span>
                          {post.published_at
                            ? formatDate(post.published_at)
                            : "No publish date set"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a href={`/blog/?slug=${encodeURIComponent(post.slug)}`}>
                        <Button type="button" variant="outline" size="sm" className="h-8">
                          View
                        </Button>
                      </a>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="h-8"
                        onClick={() => startEdit(post)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="h-8"
                        onClick={() => void handleDelete(post.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </section>
  );
}
