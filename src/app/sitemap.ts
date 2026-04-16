import { MetadataRoute } from "next";
import { DATA } from "@/data/resume";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/projects",
    "/blog",
    "/contact",
    "/services",
  ].map((route) => ({
    url: `${DATA.url}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return [...routes];
}
