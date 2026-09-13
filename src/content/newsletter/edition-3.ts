import { NewsletterEdition } from "@/types/newsletter";

/**
 * Edition #3 — recreated natively from the CFO AI Hub Beehiiv newsletter:
 * https://rahuls-newsletter-259caa.beehiiv.com/p/global-regulators-just-moved-in-sync-on-ai-oversight
 * (sent Sep 12, 2026). Content, links, and structure pulled directly from
 * the source via the Beehiiv API — not a summary or excerpt. The post also
 * included an "Upcoming Events" list, which isn't reproduced here since
 * those same 3 events are already promoted live (and auto-updating) on the
 * homepage via src/content/events.ts / EventsSection.
 */
export const edition3: NewsletterEdition = {
  slug: "edition-3",
  editionNumber: 3,
  title: "Global Regulators Just Moved in Sync on AI Oversight",
  subtitle:
    "Plus: why heavier AI token usage now correlates with 16.5% revenue growth, why AP automation stalls at 60-80%, and three integration tools picked by problem, not feature list.",
  excerpt:
    "Global regulators just moved in sync on AI oversight. Plus: why heavier AI token usage now correlates with 16.5% revenue growth, why AP automation stalls at 60-80%, and three integration tools picked by problem, not feature list.",
  publishedAt: "2026-09-12",
  readTime: "2 min read",
  author: {
    name: "Rahul Jain",
    role: "CEO, Selona & Care By Tech",
    company: "CFO AI Hub",
    avatar: "/images/leaders/rahul-jain.png",
    linkedin: "https://uk.linkedin.com/in/rahul-jain-1320681",
  },

  storiesHeading: "Today in Finance AI",
  stories: [
    {
      headline: "Global regulators just moved in sync on AI oversight.",
      headlineUrl: "https://qa-financial.com/september-roundup-of-regulatory-and-compliance-news/",
      body: "A September regulatory roundup covers ASIC naming AI a 2026-27 corporate priority, watching deepfakes, AI-driven customer decisions, and market integrity, while the EBA, EIOPA, and ESMA have jointly called for coordinated supervision of AI-related ICT risk, consultation open until Dec 31, public hearing Sept 29.",
      sourceLabel: "QA Financial",
      sourceUrl: "https://qa-financial.com/september-roundup-of-regulatory-and-compliance-news/",
    },
    {
      headline: "Token usage is starting to show up as a revenue signal, not just a cost line.",
      headlineUrl:
        "https://www.cfodive.com/news/spacex-acquisition-target-launches-cfo-council-to-crack-ais-roi-puzzle/824548/",
      body: "A BCG analysis found companies in the top quintile of AI token usage saw 16.5% median year-over-year revenue growth, against 5.1% for the lowest-usage group — real evidence heavier AI usage is starting to correlate with business outcomes, not just spend.",
      sourceLabel: "BCG via CFO Dive",
      sourceUrl:
        "https://www.cfodive.com/news/spacex-acquisition-target-launches-cfo-council-to-crack-ais-roi-puzzle/824548/",
    },
    {
      headline: "The automation ceiling in finance is real, and it's exactly what today's tool comparison is about.",
      headlineUrl: "https://cfotech.news/story/cfos-lack-data-trust-stalling-ai-adoption-in-finance",
      body: "Most AR automation software gets a team to 60-80% touchless processing, then stalls — the last 20-40% sits in an exception queue because no two customers pay the same way: different portals, different paperwork, different person to chase.",
      sourceLabel: "Fazeshift via CFOtech",
      sourceUrl: "https://cfotech.news/story/cfos-lack-data-trust-stalling-ai-adoption-in-finance",
    },
  ],

  featured: {
    heading: "Instant Foresight: How AI-Powered Predictive Models Solve the FP&A Weekend Scramble",
    paragraphs: [
      "An unexpected question on margin impact shouldn't derail an FP&A team's weekend or produce outdated Monday reports. Learn how predictive analytics automates data unification and sensitivity forecasting, equipping CFOs to respond to executive scenario requests with actionable, decision-ready data in under an hour.",
    ],
    articleSlug: "instant-foresight-ai-predictive-models-fpa-weekend-scramble",
  },

  comparison: {
    heading: "System Connectors & Integrations: Pick by Problem, Not by Feature List",
    entries: [
      {
        name: "Celigo",
        url: "https://www.celigo.com/",
        description:
          "Mid-market, ERP-centric (especially NetSuite), operations-focused, two-way sync. $600–$6,000/mo depending on transaction volume — the lowest-cost entry point of the three.",
      },
      {
        name: "Fivetran",
        url: "https://www.fivetran.com/",
        description:
          "One-directional only, moves ERP data into a warehouse (Snowflake, BigQuery) for reporting. Doesn't write back, ruled out if you need transactional sync. Consumption-based, SMB spend averages ~$30K/yr, enterprise ~$110K/yr.",
      },
      {
        name: "Workato",
        url: "https://www.workato.com/",
        description:
          "Enterprise-grade workflow automation across many apps at once, not just two-system sync. 1,200+ connectors, usage-based pricing, priced well above Celigo, built for automating a whole business process, not moving data.",
      },
    ],
  },

  pollId: "ai-priority-finance-function-2026",

  ctaLabel: "Join CFO AI Hub",
  ctaHref: "/#apply",

  closingHeading: "That's it for this week.",
  closingText: "Keep executing, not just experimenting. See you next week.",
  signOff: "The CFO AI Hub Team",
};
