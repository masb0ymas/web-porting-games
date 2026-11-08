import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained Node output for the Docker runtime image
  // (dist/standalone/server.js — no node_modules needed at runtime).
  output: "standalone",
};

export default nextConfig;
