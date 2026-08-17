import { NewsletterEdition } from "@/types/newsletter";

/**
 * Edition #1 — recreated natively from the CFO AI Hub Beehiiv newsletter:
 * https://rahuls-newsletter-259caa.beehiiv.com/p/the-sec-just-started-checking-if-your-ai-claims-hold-up
 * (published Aug 12, 2026). Content, links, and structure pulled directly
 * from the source via the Beehiiv API — not a summary or excerpt.
 */
export const edition1: NewsletterEdition = {
  slug: "edition-1",
  editionNumber: 1,
  title: "OpenAI's CFO Is Seeking a Zero-Day Month-End Close",
  subtitle:
    "Plus: OpenAI's push for a same-day close, why 1 in 4 AI projects get shelved over cost, and three AP platforms tested head-to-head.",
  excerpt:
    "The SEC just started checking if your AI claims hold up. Plus: OpenAI's push for a same-day close, why 1 in 4 AI projects get shelved over cost, and three AP platforms tested head-to-head.",
  publishedAt: "2026-08-12",
  readTime: "2 min read",
  author: {
    name: "Rahul Jain",
    role: "CEO, Selona & Care By Tech",
    company: "CFO AI Hub",
    avatar: "/images/leaders/rahul-jain.png",
    linkedin: "https://uk.linkedin.com/in/rahul-jain-1320681",
  },
  coverImage: "/images/newsletter/edition-1-cover.jpg",

  storiesHeading: "Today in Finance AI",
  stories: [
    {
      headline: "AI cost overruns are now hitting the board level.",
      body: "A new Mavvrik/Benchmarkit report found 62% of organizations say an unexpected AI cost materially altered a business decision in the past year, and of those, 40% needed board escalation, 33% froze spending, and 25% delayed or killed an AI project outright. Token costs are the biggest driver of the surprise spend, and only 11% of finance teams can now forecast AI spend within 10%, down from 15% last year.",
      sourceLabel: "Mavvrik report via CFO Dive",
      sourceUrl: "https://www.cfodive.com/news/1-in-4-companies-delay-cancel-ai-projects-over-cost/827524/",
    },
    {
      headline: "OpenAI's CFO is chasing a \"zero-day close.\"",
      headlineUrl: "https://www.cfodive.com/news/openai-aiming-zero-day-close-cfo-says-ipo/827521/",
      body: "Sarah Friar wrote that closing the books in real time, alongside continuously updated forecasting, are her two core ambitions for building an \"AI-native\" finance function. The mechanics: connecting spend plans, general-ledger actuals, purchase orders and accruals into one continuously reconciled view instead of a month-end scramble.",
      sourceLabel: "CFO Dive",
      sourceUrl: "https://www.cfodive.com/news/openai-aiming-zero-day-close-cfo-says-ipo/827521/",
    },
    {
      headline: "The SEC has started auditing AI claims, not just AI use.",
      body: "Examiners are requesting information on AI-driven portfolio management, algorithmic trading models, and marketing claims, specifically checking whether firms can back up what they publicly say their AI does — the practice regulators call \"AI washing.\"",
      sourceLabel: "Red Oak analysis via fintech.global",
      sourceUrl: "https://fintech.global",
    },
  ],

  featured: {
    heading: "Your FP&A Team Doesn't Need More AI. It Needs Applied Intelligence.",
    paragraphs: [
      "Most finance teams have stopped debating whether to use AI and are stuck on how. GroByz founder Atul Kulshreshtha argues the real gap isn't tool access anymore, that part's commoditized, it's what he calls Applied Intelligence: algorithmic speed paired with a human who still owns the judgment call. Deloitte finds 87% of finance leaders expect AI to reshape workflows rather than cut headcount; Vena Solutions puts 70% of C-suites already carrying active AI mandates. The piece walks through three places this plays out in practice (rolling forecasts, capital allocation modeling, continuous fraud and anomaly monitoring) and the four things a CFO needs to own so the human stays the navigator, not the fallback.",
      "Both stats are attributed to named reports (Deloitte, Vena Solutions), not floating numbers. Same discipline the landing page still owes its own claims.",
    ],
    articleSlug: "from-artificial-intelligence-to-applied-intelligence-human-ai-finance",
    inlineLinks: [
      { label: "GroByz", url: "https://www.grobyz.com/" },
      { label: "Atul Kulshreshtha", url: "https://in.linkedin.com/in/atul-kulshreshtha" },
    ],
  },

  comparison: {
    heading: "AI in Accounts Payable: Pick by Problem, Not by Feature List",
    entries: [
      {
        name: "Neoflo",
        url: "https://neoflo.ai/",
        description:
          "Skips the software decision. Their team runs AP, AR, and close as a managed service, AI plus human \"Forward Deployed Accountants\" for exceptions, live in about 4 weeks on your existing ERP (SAP, Oracle, NetSuite, QuickBooks, Xero, Dynamics, Sage). Priced per invoice processed, not per seat. SOC 2 Type II and ISO 27001 certified.",
      },
      {
        name: "Stampli",
        url: "https://www.stampli.com/",
        description:
          "Run 3+ different ERPs and just need AP to connect to all of them without a rebuild. Broadest integration coverage of the three.",
      },
      {
        name: "Vic.ai",
        url: "https://vic.ai",
        description:
          "High invoice volume on one major ERP (NetSuite, SAP, Dynamics) and want the most autonomous processing money can buy. Enterprise pricing, 60–90 day procurement.",
      },
      {
        name: "Tipalti",
        url: "https://tipalti.com/en-eu/",
        description:
          "Your AP problem is actually cross-border payments and tax compliance wearing an AP costume. 200+ countries, built-in W-8/W-9 handling. Starts at $99/mo.",
      },
    ],
  },

  pollId: "1",

  ctaLabel: "Join CFO AI Hub",
  ctaHref: "/#apply",

  closingHeading: "That's it for this week.",
  closingText: "Keep executing, not just experimenting. See you next week.",
  signOff: "The CFO AI Hub Team",
};
