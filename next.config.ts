import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "media.beehiiv.com" },
    ],
  },
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
  async redirects() {
    return [
      // /newsletter/[slug] used to serve standalone articles; those now
      // live at /articles/[slug]. /newsletter/[slug] is reserved for real
      // newsletter editions going forward, so these are explicit per-slug
      // redirects rather than a wildcard, to preserve inbound/SEO links
      // without breaking new edition URLs like /newsletter/edition-1.
      {
        source: "/newsletter/from-artificial-intelligence-to-applied-intelligence-human-ai-finance",
        destination: "/articles/from-artificial-intelligence-to-applied-intelligence-human-ai-finance",
        permanent: true,
      },
      {
        source: "/newsletter/making-tax-digital-permanent-operational-shift-midsize-uk",
        destination: "/articles/making-tax-digital-permanent-operational-shift-midsize-uk",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
