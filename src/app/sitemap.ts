import { MetadataRoute } from "next";
import { DATA } from "@/data/resume";

export const revalidate = 3600; // regenerate sitemap at most once per hour

async function fetchPublishedSlugs(): Promise<{ slug: string; updated_at: string }[]> {
  const apiUrl = process.env.NEXT_PUBLIC_LARAVEL_API_URL?.trim().replace(/\/+$/, "");
  if (!apiUrl) return [];

  try {
    const res = await fetch(`${apiUrl}/posts`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];

    const data: unknown = await res.json();
    const list: unknown[] = Array.isArray(data)
      ? data
      : Array.isArray((data as Record<string, unknown>)?.posts)
        ? ((data as Record<string, unknown>).posts as unknown[])
        : Array.isArray((data as Record<string, unknown>)?.data)
          ? ((data as Record<string, unknown>).data as unknown[])
          : [];

    return list
      .map((p) => {
        const record = p as Record<string, unknown>;
        return {
          slug: typeof record.slug === "string" ? record.slug.trim() : "",
          updated_at: typeof record.updated_at === "string" ? record.updated_at : "",
        };
      })
      .filter((p) => p.slug.length > 0);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${DATA.url}`, lastModified: new Date().toISOString().split("T")[0], changeFrequency: "weekly", priority: 1 },
    { url: `${DATA.url}/about`, lastModified: new Date().toISOString().split("T")[0], changeFrequency: "monthly", priority: 0.8 },
    { url: `${DATA.url}/projects`, lastModified: new Date().toISOString().split("T")[0], changeFrequency: "weekly", priority: 0.8 },
    { url: `${DATA.url}/blog`, lastModified: new Date().toISOString().split("T")[0], changeFrequency: "daily", priority: 0.9 },
    { url: `${DATA.url}/contact`, lastModified: new Date().toISOString().split("T")[0], changeFrequency: "monthly", priority: 0.7 },
    { url: `${DATA.url}/services`, lastModified: new Date().toISOString().split("T")[0], changeFrequency: "monthly", priority: 0.8 },
  ];

  const posts = await fetchPublishedSlugs();

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${DATA.url}/blog/?slug=${encodeURIComponent(post.slug)}`,
    lastModified: post.updated_at
      ? new Date(post.updated_at).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
