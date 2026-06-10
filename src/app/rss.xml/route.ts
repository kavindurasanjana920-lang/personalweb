import { DATA } from "@/data/resume";

export const revalidate = 3600;

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function fetchPosts(): Promise<
  { title: string; slug: string; summary: string | null; published_at: string | null; updated_at: string }[]
> {
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
        const r = p as Record<string, unknown>;
        return {
          title: typeof r.title === "string" ? r.title : "Untitled",
          slug: typeof r.slug === "string" ? r.slug.trim() : "",
          summary: typeof r.summary === "string" ? r.summary : typeof r.excerpt === "string" ? r.excerpt : null,
          published_at: typeof r.published_at === "string" ? r.published_at : null,
          updated_at: typeof r.updated_at === "string" ? r.updated_at : new Date().toISOString(),
        };
      })
      .filter((p) => p.slug.length > 0 && p.published_at);
  } catch {
    return [];
  }
}

export async function GET(): Promise<Response> {
  const posts = await fetchPosts();
  const siteUrl = DATA.url;
  const now = new Date().toUTCString();

  const items = posts
    .map((post) => {
      const postUrl = `${siteUrl}/blog/?slug=${encodeURIComponent(post.slug)}`;
      const pubDate = post.published_at ? new Date(post.published_at).toUTCString() : now;
      const description = post.summary ? escapeXml(post.summary) : "";

      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      ${description ? `<description>${description}</description>` : ""}
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(DATA.name)} — Blog</title>
    <link>${siteUrl}</link>
    <description>Articles on software development, AI automation, and engineering by ${escapeXml(DATA.name)}.</description>
    <language>en</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${siteUrl}/kavindu-hero-light.webp</url>
      <title>${escapeXml(DATA.name)} — Blog</title>
      <link>${siteUrl}</link>
    </image>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
