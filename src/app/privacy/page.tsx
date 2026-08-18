import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy — CFO AI Hub",
  description: "How CFO AI Hub by Selona collects, uses, and protects your information.",
};

const h2 = "text-xl sm:text-2xl font-bold font-display text-primary mt-10 mb-3 first:mt-0";
const ul = "list-disc pl-5 space-y-2";

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="August 18, 2026">
      <p>
        CFO AI Hub (&quot;CFO AI Hub,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is operated by Selona.
        This Privacy Policy explains what information we collect when you visit cfoaihub.com
        (the &quot;Site&quot;), join our waitlist, subscribe to our newsletter, or otherwise interact with
        us, and how we use, store, and protect it.
      </p>

      <h2 className={h2}>1. Information We Collect</h2>
      <p>We collect information you provide directly to us, specifically:</p>
      <ul className={ul}>
        <li><strong>Waitlist signups:</strong> first name, last name, work email address, and your current role.</li>
        <li><strong>Newsletter subscriptions:</strong> email address and, optionally, your role.</li>
        <li><strong>Poll participation:</strong> your selected answer and self-reported role. Poll responses are recorded anonymously and are not linked to your name or email.</li>
      </ul>
      <p>
        We also automatically receive limited technical information common to any website visit — such
        as browser type, device type, and general usage data — collected by our hosting and
        infrastructure providers. We do not use third-party advertising trackers on this Site.
      </p>

      <h2 className={h2}>2. How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul className={ul}>
        <li>Manage the CFO AI Hub early-access waitlist and notify you when a spot opens;</li>
        <li>Send the newsletter and related briefings, workshop updates, and community communications you signed up for;</li>
        <li>Aggregate and display anonymous, non-identifying poll results (e.g. &quot;62% of respondents said...&quot;);</li>
        <li>Operate, maintain, and improve the Site; and</li>
        <li>Respond to questions you send us directly.</li>
      </ul>
      <p>We do not sell your personal information, and we do not share it with third parties for their own marketing purposes.</p>

      <h2 className={h2}>3. How We Store and Protect Your Information</h2>
      <p>
        Waitlist and subscriber information is stored using Google Firebase (Cloud Firestore)
        infrastructure. Data is transmitted over encrypted (HTTPS/TLS) connections. Access to stored
        data is restricted — our systems are configured so this information cannot be read back out
        through the Site itself, only through our own administrative access.
      </p>
      <p>
        No method of electronic storage or transmission is 100% secure, and we cannot guarantee
        absolute security, but we take reasonable, industry-standard measures to protect your
        information from unauthorized access, alteration, or disclosure.
      </p>

      <h2 className={h2}>4. Cookies and Local Storage</h2>
      <p>
        The Site uses your browser&apos;s local storage (not third-party tracking cookies) to remember
        things like whether you&apos;ve already joined the waitlist or voted in a poll, so you don&apos;t see
        the same form twice. This information stays on your device and is not used to track you across
        other websites.
      </p>

      <h2 className={h2}>5. Data Retention</h2>
      <p>
        We retain waitlist and subscriber information for as long as needed to operate the community
        and send the communications you signed up for, or until you ask us to delete it.
      </p>

      <h2 className={h2}>6. Your Rights and Choices</h2>
      <p>You can ask us at any time to:</p>
      <ul className={ul}>
        <li>Tell you what information we hold about you;</li>
        <li>Correct inaccurate information; or</li>
        <li>Delete your information and unsubscribe you from future communications.</li>
      </ul>
      <p>
        To make any of these requests, email us at{" "}
        <a href="mailto:contact@selona.ai" className="text-primary font-semibold hover:underline">
          contact@selona.ai
        </a>
        . Every email newsletter we send also includes a one-click unsubscribe link.
      </p>

      <h2 className={h2}>7. Children&apos;s Privacy</h2>
      <p>
        CFO AI Hub is intended for finance professionals and is not directed at, or knowingly collecting
        information from, anyone under the age of 18.
      </p>

      <h2 className={h2}>8. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. If we make material changes, we will
        update the &quot;Last updated&quot; date at the top of this page.
      </p>

      <h2 className={h2}>9. Contact Us</h2>
      <p>
        Questions about this Privacy Policy or how your information is handled? Reach us at{" "}
        <a href="mailto:contact@selona.ai" className="text-primary font-semibold hover:underline">
          contact@selona.ai
        </a>
        .
      </p>

      <p className="pt-6 border-t border-surface-dim text-xs text-text-muted">
        See also our{" "}
        <Link href="/terms" className="text-primary font-semibold hover:underline">
          Terms of Service
        </Link>
        .
      </p>
    </LegalPageLayout>
  );
}
