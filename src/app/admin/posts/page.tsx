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
  | "codeBlock";

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
    <section className="space-y-6 py-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Admin Posts</h1>
          <p className="text-sm text-muted-foreground">
            Manage your Laravel-backed blog posts directly from Next.js.
          </p>
        </div>
        <Button type="button" variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {error ? (
        <p className="rounded-md border border-destructive/40 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      <Card className="border border-border/80 p-1">
        <CardHeader className="space-y-2">
          <CardTitle className="text-xl tracking-tight">{headingText}</CardTitle>
          <CardDescription>
            Fill in the post details and save. Slug can be auto-generated by the API.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
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
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Post title"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="slug" className="text-sm font-medium">
                Slug (optional)
              </label>
              <input
                id="slug"
                value={formState.slug}
                onChange={(event) =>
                  setFormState((prev) => ({ ...prev, slug: event.target.value }))
                }
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="my-first-post"
              />
            </div>

            <div className="space-y-2">
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
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Short summary for previews"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">
                Content (Markdown)
              </label>
              <div className="flex flex-wrap gap-2">
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
              </div>
              <p className="text-xs text-muted-foreground">
                Select text and click a formatting button. Heading L and Heading M
                are two different font sizes in your blog view. Code Block inserts
                fenced markdown with language support.
              </p>
              <textarea
                id="content"
                ref={contentTextareaRef}
                rows={14}
                required
                value={formState.content}
                onChange={(event) =>
                  setFormState((prev) => ({ ...prev, content: event.target.value }))
                }
                className="w-full rounded-md border border-input bg-background px-3 py-2 font-mono text-sm outline-none ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="# Your post title"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex items-center gap-2 rounded-md border border-input px-3 py-2 text-sm">
                <input
                  type="checkbox"
                  checked={formState.isPublished}
                  onChange={(event) =>
                    setFormState((prev) => ({
                      ...prev,
                      isPublished: event.target.checked,
                    }))
                  }
                  className="size-4"
                />
                Publish now
              </label>

              <div className="space-y-2">
                <label htmlFor="publishedAt" className="text-sm font-medium">
                  Publish at (optional)
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
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Saving..."
                  : editingPostId
                    ? "Update Post"
                    : "Create Post"}
              </Button>
              {editingPostId ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  disabled={isSubmitting}
                >
                  Cancel Edit
                </Button>
              ) : null}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="border border-border/80 p-1">
        <CardHeader className="space-y-2">
          <CardTitle className="text-xl tracking-tight">Existing Posts</CardTitle>
          <CardDescription>
            Latest posts from your Laravel API.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {isLoadingPosts ? (
            <p className="rounded-md border border-border px-3 py-3 text-sm text-muted-foreground">
              Loading posts...
            </p>
          ) : null}

          {!isLoadingPosts && posts.length === 0 ? (
            <p className="rounded-md border border-border px-3 py-3 text-sm text-muted-foreground">
              No posts yet.
            </p>
          ) : null}

          {!isLoadingPosts && posts.length > 0
            ? posts.map((post) => (
                <div
                  key={post.id}
                  className="rounded-lg border border-border px-4 py-3"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-1">
                      <p className="font-medium tracking-tight">{post.title}</p>
                      <p className="text-xs text-muted-foreground">/{post.slug}</p>
                      <p className="text-xs text-muted-foreground">
                        {post.published_at
                          ? `Published ${formatDate(post.published_at)}`
                          : "Draft"}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <a href={`/blog/?slug=${encodeURIComponent(post.slug)}`}>
                        <Button type="button" variant="outline" size="sm">
                          View
                        </Button>
                      </a>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => startEdit(post)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => void handleDelete(post.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </CardContent>
      </Card>
    </section>
  );
}
