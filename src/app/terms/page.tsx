import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Terms of Service — CFO AI Hub",
  description: "The terms that govern your use of CFO AI Hub by Selona.",
};

const h2 = "text-xl sm:text-2xl font-bold font-display text-primary mt-10 mb-3 first:mt-0";
const ul = "list-disc pl-5 space-y-2";

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated="August 18, 2026">
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your access to and use of cfoaihub.com and the
        CFO AI Hub newsletter, community, and related content (together, the &quot;Service&quot;), operated by
        Selona (&quot;Selona,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By using the Service — including joining the
        waitlist, subscribing to the newsletter, or voting in a poll — you agree to these Terms.
      </p>

      <h2 className={h2}>1. The Service</h2>
      <p>
        CFO AI Hub is a practitioner-built newsletter and community for finance leaders implementing
        AI. The Service currently includes editorial articles, periodic newsletter editions, community
        polls, and an early-access waitlist for future community features.
      </p>

      <h2 className={h2}>2. Eligibility</h2>
      <p>
        The Service is intended for finance and business professionals aged 18 or older. By using the
        Service you confirm that you meet this requirement and that any information you submit (such
        as your name, email, and role) is accurate.
      </p>

      <h2 className={h2}>3. Waitlist &amp; Early Access</h2>
      <p>
        Joining the waitlist registers your interest in early access to CFO AI Hub. It is not a purchase,
        contract, or guarantee of admission, a specific queue position, or a specific timeline. We may
        change the scope, features, availability, or timing of early access at any time.
      </p>

      <h2 className={h2}>4. Acceptable Use</h2>
      <p>When using the Service, you agree not to:</p>
      <ul className={ul}>
        <li>Submit false, misleading, or someone else&apos;s personal information;</li>
        <li>Attempt to disrupt, overload, or gain unauthorized access to the Service or its underlying systems;</li>
        <li>Use automated means (bots, scrapers) to submit waitlist entries or poll votes; or</li>
        <li>Use the Service for any unlawful purpose.</li>
      </ul>

      <h2 className={h2}>5. Intellectual Property</h2>
      <p>
        All content on the Service — articles, newsletter editions, graphics, logos, and the CFO AI Hub
        name and branding — is owned by Selona or its licensors and is protected by applicable
        intellectual property laws. You may share and quote our content with appropriate attribution,
        but may not reproduce it wholesale or use our branding without our written permission.
      </p>

      <h2 className={h2}>6. Third-Party Links</h2>
      <p>
        Articles and newsletter editions may link to third-party websites, tools, or vendors (for
        example, sources cited in our reporting, or comparison mentions). We don&apos;t control and aren&apos;t
        responsible for the content, accuracy, or practices of third-party sites. Inclusion of a link is
        not an endorsement.
      </p>

      <h2 className={h2}>7. Poll Participation</h2>
      <p>
        Polls reflect the self-reported opinions of respondents at a point in time and are provided for
        general benchmarking and discussion purposes only. Poll results are not scientific research and
        should not be relied on as such.
      </p>

      <h2 className={h2}>8. Disclaimers</h2>
      <p>
        The Service, including all articles, newsletter content, and poll data, is provided &quot;as is&quot;
        for general informational purposes only and does not constitute financial, legal, tax, or
        professional advice. You should consult a qualified professional before making decisions based
        on anything published through the Service.
      </p>
      <p>
        We make reasonable efforts to keep the Service accurate and available, but we do not warrant
        that it will be uninterrupted, error-free, or that any figures or claims cited from third-party
        sources are accurate.
      </p>

      <h2 className={h2}>9. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, Selona will not be liable for any indirect, incidental,
        or consequential damages arising from your use of, or inability to use, the Service.
      </p>

      <h2 className={h2}>10. Termination</h2>
      <p>
        You may unsubscribe or ask us to remove your information at any time (see our{" "}
        <Link href="/privacy" className="text-primary font-semibold hover:underline">
          Privacy Policy
        </Link>
        ). We may suspend or terminate access to the Service for anyone who violates these Terms.
      </p>

      <h2 className={h2}>11. Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. If we make material changes, we will update the
        &quot;Last updated&quot; date at the top of this page. Continued use of the Service after changes take
        effect constitutes acceptance of the updated Terms.
      </p>

      <h2 className={h2}>12. Governing Law</h2>
      <p>
        These Terms are governed by the laws of the jurisdiction in which Selona is established, without
        regard to conflict-of-law principles.
      </p>

      <h2 className={h2}>13. Contact Us</h2>
      <p>
        Questions about these Terms? Reach us at{" "}
        <a href="mailto:contact@selona.ai" className="text-primary font-semibold hover:underline">
          contact@selona.ai
        </a>
        .
      </p>

      <p className="pt-6 border-t border-surface-dim text-xs text-text-muted">
        See also our{" "}
        <Link href="/privacy" className="text-primary font-semibold hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
    </LegalPageLayout>
  );
}
