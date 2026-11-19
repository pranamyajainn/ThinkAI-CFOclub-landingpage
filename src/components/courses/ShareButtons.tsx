"use client";

import React, { useState } from "react";
import { Check, Link2, Mail } from "lucide-react";

interface ShareButtonsProps {
  path: string;
  title: string;
}

const btn =
  "inline-flex items-center gap-2 h-10 px-4 rounded-full border border-primary/10 bg-white text-sm font-semibold text-on-surface hover:border-primary/25 hover:bg-surface-container-low transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container";

export default function ShareButtons({ path, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  // Built at click time so the link always matches the site it was opened on.
  const url = () => `${window.location.origin}${path}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url());
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt("Copy this link:", url());
    }
  };

  const email = () => {
    const subject = encodeURIComponent(`${title} | Claude 101 from CFO AI Hub`);
    const body = encodeURIComponent(`I thought you might find this short video useful:\n\n${title}\n${url()}\n`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const linkedin = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url())}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button type="button" onClick={copy} className={btn} aria-live="polite">
        {copied ? <Check className="w-4 h-4 text-secondary" /> : <Link2 className="w-4 h-4 text-secondary" />}
        {copied ? "Link copied" : "Copy link"}
      </button>
      <button type="button" onClick={email} className={btn}>
        <Mail className="w-4 h-4 text-secondary" />
        Email
      </button>
      <button type="button" onClick={linkedin} className={btn} aria-label="Share on LinkedIn">
        <svg className="w-4 h-4 fill-[#0A66C2]" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
        <span className="hidden sm:inline">LinkedIn</span>
      </button>
    </div>
  );
}
