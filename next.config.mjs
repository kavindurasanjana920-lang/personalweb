import { withContentCollections } from "@content-collections/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  // The VM runs the app from a self-contained bundle built in CI: "standalone"
  // emits .next/standalone/server.js with only the traced runtime dependencies,
  // so the server never needs node_modules or a build step of its own.
  output: "standalone",
};

// withContentCollections must be the outermost plugin
export default withContentCollections(nextConfig);
