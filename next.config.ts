import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "media.beehiiv.com" },
    ],
  },
  async headers() {
    return [
      {
        // Course videos never change in place: a new version gets a new file
        // name, so browsers and the CDN can keep them for a year.
        source: "/course-videos/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
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
      // The 5 Nov poll ("current use of AI in finance") was replaced by the
      // AI ROI poll before it got any votes. Send anyone holding the old
      // link (e.g. a newsletter draft) to the replacement.
      {
        source: "/poll/current-ai-use-in-finance-2026",
        destination: "/poll/ai-roi-measurement-2026",
        permanent: false,
      },
      {
        source: "/polls/current-ai-use-in-finance-2026",
        destination: "/polls/ai-roi-measurement-2026",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
