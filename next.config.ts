import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/poll/:pollId",
        destination: "/polls/:pollId",
      },
      {
        source: "/poll",
        destination: "/polls",
      },
    ];
  },
};

export default nextConfig;
