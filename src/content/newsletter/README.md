# CFO AI Hub — Newsletter Edition Content Architecture

This directory (`src/content/newsletter/`) contains all complete **newsletter editions** for the CFO AI Hub platform — the full periodic issue as published on Beehiiv, reproduced natively.

A newsletter edition is a bundle of several short items under one edition number (a news roundup, a featured article teaser, a comparison, a poll, closing notes). It is distinct from an **article** (`src/content/articles/`), which is a single standalone long-form piece with no edition number. A newsletter edition may *link to* an article, but never duplicates its content — the article stays the single source of truth at its own `/articles/[slug]` URL.

## How to add a new edition

1. Create `src/content/newsletter/edition-N.ts` following the shape in `src/types/newsletter.ts` (`NewsletterEdition`). `edition-1.ts` is a complete real example.
2. Register it in `src/content/newsletter/index.ts`, adding it to `allEditions` (newest first).
3. If the edition references a poll, use an existing poll id from `src/content/polls/` (or add a new poll there first) and set `pollId`.
4. If the edition features one of our own articles, set `featured.articleSlug` to that article's slug rather than re-typing its content.
5. Drop any cover/story images into `public/images/newsletter/` and reference them with a local `/images/newsletter/...` path — do not hotlink external CDNs (Next/Image will reject unconfigured remote hosts).

The edition will automatically appear on the `/newsletter` hub and get its own page at `/newsletter/[slug]`.
