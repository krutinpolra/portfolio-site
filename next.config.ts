import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  outputFileTracingIncludes: {
    '/api/ai/chat': ['./portfolio-knowledge/**/*.md'],
  },
};

export default nextConfig;
