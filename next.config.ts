import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained Node output for the Docker runtime image
  // (dist/standalone/server.js — no node_modules needed at runtime).
  output: "standalone",
  // Cover filenames never change in place (rename on update), so cache them for a week.
  headers: async () => [
    {
      source: "/covers/:path*",
      headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
    },
  ],
};

export default nextConfig;
