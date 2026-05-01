export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  summary: string | null;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  meta_title: string | null;
  meta_description: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

interface PaginatedResponse<T> {
  data: T[];
}

interface AdminUser {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
}

interface AdminLoginResponse {
  token: string;
  user: AdminUser;
}

interface AdminMeResponse {
  user: AdminUser;
}

interface PublicPostsResponse {
  posts: BlogPost[];
}

interface PublicPostResponse {
  post: BlogPost;
}

export interface BlogPostPayload {
  title: string;
  slug?: string;
  summary?: string | null;
  excerpt?: string | null;
  content: string;
  cover_image?: string | null;
  is_published?: boolean;
  published_at?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
}

export const BLOG_ADMIN_TOKEN_KEY = "blog_admin_token";

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null;
}

function readString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function readBoolean(value: unknown): boolean | null {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "number") {
    return value !== 0;
  }

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "true" || normalized === "1") {
      return true;
    }
    if (normalized === "false" || normalized === "0") {
      return false;
    }
  }

  return null;
}

function normalizeSlug(value: unknown, title: string): string {
  const fromValue = typeof value === "string" ? value.trim() : "";
  let candidate = fromValue;

  if (candidate.startsWith("http://") || candidate.startsWith("https://")) {
    try {
      const url = new URL(candidate);
      candidate = url.pathname;
    } catch {
      candidate = fromValue;
    }
  }

  candidate = decodeURIComponent(candidate)
    .trim()
    .replace(/^\/+|\/+$/g, "");

  if (candidate.includes("/")) {
    candidate = candidate.split("/").filter(Boolean).pop() ?? candidate;
  }

  candidate = candidate
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (candidate) {
    return candidate;
  }

  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizePost(raw: unknown): BlogPost {
  const record = isRecord(raw) ? raw : {};
  const title = readString(record.title) ?? "Untitled";
  const summary = readString(record.summary) ?? readString(record.excerpt);
  const publishedAt = readString(record.published_at);
  const isPublished = readBoolean(record.is_published) ?? Boolean(publishedAt);

  return {
    id: typeof record.id === "number" ? record.id : 0,
    title,
    slug: normalizeSlug(record.slug, title),
    summary,
    excerpt: readString(record.excerpt) ?? summary,
    content: readString(record.content) ?? "",
    cover_image: readString(record.cover_image),
    meta_title: readString(record.meta_title),
    meta_description: readString(record.meta_description),
    is_published: isPublished,
    published_at: publishedAt,
    created_at: readString(record.created_at) ?? "",
    updated_at: readString(record.updated_at) ?? "",
  };
}

function extractPostList(raw: unknown): BlogPost[] {
  if (Array.isArray(raw)) {
    return raw.map(normalizePost);
  }

  if (!isRecord(raw)) {
    return [];
  }

  if (Array.isArray(raw.posts)) {
    return raw.posts.map(normalizePost);
  }

  if (Array.isArray(raw.data)) {
    return raw.data.map(normalizePost);
  }

  return [];
}

function extractSinglePost(raw: unknown): BlogPost | null {
  if (isRecord(raw)) {
    if (isRecord(raw.post)) {
      return normalizePost(raw.post);
    }

    if (isRecord(raw.data)) {
      return normalizePost(raw.data);
    }
  }

  if (isRecord(raw)) {
    return normalizePost(raw);
  }

  return null;
}

function normalizePayloadForApi(payload: BlogPostPayload): UnknownRecord {
  const normalized: UnknownRecord = {
    title: payload.title,
    content: payload.content,
    is_published: payload.is_published,
    published_at: payload.published_at,
  };

  if (payload.slug) {
    normalized.slug = payload.slug;
  }

  const excerpt = payload.excerpt ?? payload.summary ?? null;
  if (excerpt !== null) {
    normalized.excerpt = excerpt;
  }

  if (payload.cover_image !== undefined) {
    normalized.cover_image = payload.cover_image;
  }

  if (payload.meta_title !== undefined) {
    normalized.meta_title = payload.meta_title;
  }

  if (payload.meta_description !== undefined) {
    normalized.meta_description = payload.meta_description;
  }

  return normalized;
}

function getApiBaseUrl(): string {
  const value = process.env.NEXT_PUBLIC_LARAVEL_API_URL?.trim() ?? "";
  return value.replace(/\/+$/, "");
}

function buildApiUrl(path: string): string {
  const baseUrl = getApiBaseUrl();

  if (!baseUrl) {
    throw new Error("Missing NEXT_PUBLIC_LARAVEL_API_URL in your Next.js environment.");
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
}

async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(buildApiUrl(path), {
    ...options,
    headers,
    cache: "no-store",
  });

  const contentType = response.headers.get("content-type") ?? "";
  const body = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof body === "object" && body !== null && "message" in body
        ? String(body.message)
        : `API request failed (${response.status}).`;
    throw new Error(message);
  }

  return body as T;
}

export function isBlogApiConfigured(): boolean {
  return getApiBaseUrl().length > 0;
}

export function getStoredAdminToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(BLOG_ADMIN_TOKEN_KEY);
}

export function storeAdminToken(token: string): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(BLOG_ADMIN_TOKEN_KEY, token);
}

export function clearAdminToken(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(BLOG_ADMIN_TOKEN_KEY);
}

export async function publicListPosts(): Promise<BlogPost[]> {
  const response = await apiRequest<PublicPostsResponse | PaginatedResponse<BlogPost> | unknown>("/posts");
  return extractPostList(response);
}

export async function publicGetPostBySlug(slug: string): Promise<BlogPost> {
  const response = await apiRequest<PublicPostResponse | { data: BlogPost } | unknown>(
    `/posts/${encodeURIComponent(slug)}`
  );

  const post = extractSinglePost(response);
  if (!post) {
    throw new Error("Blog post not found.");
  }

  return post;
}

export async function adminLogin(
  email: string,
  password: string
): Promise<AdminLoginResponse> {
  return apiRequest<AdminLoginResponse>("/admin/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function adminMe(token: string): Promise<AdminMeResponse> {
  return apiRequest<AdminMeResponse>("/admin/me", { method: "GET" }, token);
}

export async function adminLogout(token: string): Promise<void> {
  await apiRequest<{ message: string }>("/admin/logout", { method: "POST" }, token);
}

export async function adminListPosts(token: string): Promise<BlogPost[]> {
  const response = await apiRequest<PaginatedResponse<BlogPost> | { data: BlogPost[] } | unknown>(
    "/admin/posts",
    { method: "GET" },
    token
  );

  return extractPostList(response);
}

export async function adminCreatePost(
  token: string,
  payload: BlogPostPayload
): Promise<BlogPost> {
  const response = await apiRequest<{ data: BlogPost } | BlogPost | unknown>(
    "/admin/posts",
    {
      method: "POST",
      body: JSON.stringify(normalizePayloadForApi(payload)),
    },
    token
  );

  const post = extractSinglePost(response);
  if (!post) {
    throw new Error("Unexpected API response when creating post.");
  }

  return post;
}

export async function adminUpdatePost(
  token: string,
  postId: number,
  payload: BlogPostPayload
): Promise<BlogPost> {
  const response = await apiRequest<{ data: BlogPost } | BlogPost | unknown>(
    `/admin/posts/${postId}`,
    {
      method: "PUT",
      body: JSON.stringify(normalizePayloadForApi(payload)),
    },
    token
  );

  const post = extractSinglePost(response);
  if (!post) {
    throw new Error("Unexpected API response when updating post.");
  }

  return post;
}

export async function adminDeletePost(token: string, postId: number): Promise<void> {
  await apiRequest<void>(`/admin/posts/${postId}`, { method: "DELETE" }, token);
}
