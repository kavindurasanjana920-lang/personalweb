import { DATA } from "@/data/resume";
import type { MetadataRoute } from "next";
import { allPosts } from "content-collections";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = DATA.url.replace(/\/$/, "");

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/search/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tracking/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = allPosts.map((post) => {
    const slug = post._meta.path.replace(/\.mdx$/, "");
    const lastModified = post.updatedAt ?? post.publishedAt;

    return {
      url: `${baseUrl}/blog/${slug}/`,
      lastModified: new Date(lastModified),
      changeFrequency: "monthly",
      priority: 0.8,
    };
  });

  return [...staticRoutes, ...blogRoutes];
}
