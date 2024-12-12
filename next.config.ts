import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          // "http://localhost:8000/api/:path*",
          "https://language-learning-backend-seven.vercel.app/api/:path*",
      },
    ];
  },
};

export default nextConfig;
