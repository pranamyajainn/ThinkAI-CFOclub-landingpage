import { NewsletterEdition } from "@/types/newsletter";

/**
 * Edition #2 — recreated natively from the CFO AI Hub Beehiiv newsletter:
 * https://rahuls-newsletter-259caa.beehiiv.com/p/your-ai-agent-just-spent-money-can-you-prove-you-approved-it
 * (sent Aug 27, 2026). Content, links, and structure pulled directly from
 * the source via the Beehiiv API — not a summary or excerpt.
 */
export const edition2: NewsletterEdition = {
  slug: "edition-2",
  editionNumber: 2,
  title: "Your AI Agent Just Spent Money. Can You Prove You Approved It?",
  subtitle:
    "Plus: why 92% of CFOs feel AI-ROI pressure but can't explain it to an auditor, Gartner's case for governance before scale, and three AP platforms picked by problem, not feature list.",
  excerpt:
    "Your AI agent can spend your company's money and still leave no clean proof you approved it. Plus: why 92% of CFOs feel AI-ROI pressure but can't explain it to an auditor, Gartner's case for governance before scale, and three AP platforms picked by problem, not feature list.",
  publishedAt: "2026-08-26",
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
      headline: "CFOs are being told to prove governance before scaling AI agents, not after.",
      headlineUrl:
        "https://www.gartner.com/en/newsroom/new/pr-q-a-new-vis-template/2026-08-20-gartner-says-cfos-mus-pilot-governance-first-before-scaling-ai-agents",
      body: "Gartner's finance practice says early AI agent pilots most often fail from unclear controls, not bad technology, and is telling CFOs to pilot governance, oversight, and traceability first, before rolling agents into higher-stakes work.",
      sourceLabel: "Gartner",
      sourceUrl:
        "https://www.gartner.com/en/newsroom/new/pr-q-a-new-vis-template/2026-08-20-gartner-says-cfos-mus-pilot-governance-first-before-scaling-ai-agents",
    },
    {
      headline: "92% of CFOs feel personal pressure to prove AI is paying off, but the accountability behind it is thin.",
      headlineUrl: "https://www.cfodive.com/news/92-cfos-top-finance-staff-pressure-show-roi-ai-avalara/825828/",
      body: "A new Avalara survey of 1,505 CFOs and senior finance executives found 44% aren't fully confident they could explain an AI agent's actions to an auditor or regulator, 76% say their organization lacks the in-house expertise to understand how their own AI operates, and 30% haven't updated internal controls in the past year.",
      sourceLabel: "Avalara via CFO Dive",
      sourceUrl: "https://www.cfodive.com/news/92-cfos-top-finance-staff-pressure-show-roi-ai-avalara/825828/",
    },
    {
      headline: "An AI agent can spend your company's money and still leave no clean proof you approved it.",
      headlineUrl: "https://fortune.com/2026/08/24/google-ai-agent-payment-protocol-gap/",
      body: "New reporting on Google's Agent Payments Protocol found a standing authorization token, granted weeks earlier, can still let an agent complete a purchase today even when the current instruction only said to search, not buy. For any finance agent with authority to route payments or update vendor records, that's the exact gap an auditor asks about first.",
      sourceLabel: "Fortune",
      sourceUrl: "https://fortune.com/2026/08/24/google-ai-agent-payment-protocol-gap/",
    },
  ],

  featured: {
    heading: "Making Tax Digital Isn't a Box You Tick Once. HMRC Is Watching Every Quarter After.",
    paragraphs: [
      "Most mid-size UK finance leaders think MTD is done. VAT MTD went live in 2022, the software got switched on, box ticked. It isn't done. MTD requires an unbroken digital link from transaction to VAT return, and the everyday habits inside a typical 100-300 person business — hand-keying PDF invoices, patching VAT totals in a side spreadsheet, fixing vendor reconciliations in Excel at month-end — all break that link. Penalties run up to £400 per return, plus a stacking £200 late-filing fine for every miss after the first.",
      "Mid-size companies get hit hardest: too much transaction volume for manual AP/AR to hold up under the digital-link rule, not enough volume to justify a dedicated compliance hire. The piece breaks down exactly where digital links quietly snap and what continuous, audit-proof AP/AR execution looks like instead.",
    ],
    articleSlug: "making-tax-digital-permanent-operational-shift-uk-mid-size",
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
