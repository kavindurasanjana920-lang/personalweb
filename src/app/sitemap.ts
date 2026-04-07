import { DATA } from "@/data/resume";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = DATA.url.replace(/\/$/, "");
  const siteImage = `${baseUrl}/dark.png`;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [siteImage],
    },
    {
      url: `${baseUrl}/search/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      images: [siteImage],
    },
    {
      url: `${baseUrl}/tracking/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      images: [siteImage],
    },
  ];

  return staticRoutes;
}
