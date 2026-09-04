import { withContentCollections } from "@content-collections/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  trailingSlash: true,
  async headers() {
    return [
      {
        // Blog artwork is versioned by filename — a changed image ships under
        // a new name — so it is safe to cache for a long time. Without this
        // these served with max-age=0 and were re-downloaded on every visit.
        source: "/blog/courier-tracking/:file*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

// withContentCollections must be the outermost plugin
export default withContentCollections(nextConfig);
