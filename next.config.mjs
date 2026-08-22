import { withContentCollections } from "@content-collections/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  // The VM runs the app from a self-contained bundle built in CI: "standalone"
  // emits .next/standalone/server.js with only the traced runtime dependencies,
  // so the server never needs node_modules or a build step of its own.
  output: "standalone",

  async headers() {
    return [
      {
        // The admin pages are client components, so they cannot export metadata
        // and were inheriting the site-wide "index, follow". robots.txt no longer
        // advertises /admin/ either, so keeping crawlers out has to happen here.
        source: "/admin/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

// withContentCollections must be the outermost plugin
export default withContentCollections(nextConfig);
