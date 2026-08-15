"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2, Loader2, Sparkles, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("CFO / VP Finance");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid work email.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: "Newsletter Subscriber",
          email,
          jobTitle: role,
          company: "Subscribed via Newsletter Hub",
          source: "newsletter-page",
        }),
      });

      if (res.ok) {
        setStatus("success");
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 },
          });
        } catch {
          // ignore confetti failure
        }
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error || "Failed to subscribe. Please try again.");
        setStatus("error");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again later.");
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-16">
      <div className="relative overflow-hidden bg-primary text-on-primary rounded-2xl p-8 sm:p-12 lg:p-16 border border-primary-container shadow-[0_12px_40px_rgba(0,19,86,0.12)]">
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-secondary-container text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Join 1,400+ Finance Leaders</span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display tracking-tight text-white mb-4">
            Get the Weekly CFO AI Briefing in Your Inbox
          </h3>

          <p className="text-sm sm:text-base text-on-primary/80 leading-relaxed mb-8 max-w-xl mx-auto">
            Every Friday morning: 1 tactical workflow teardown, 1 algorithmic governance checklist, and zero vendor marketing.
          </p>

          {status === "success" ? (
            <div className="p-6 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm text-center">
              <CheckCircle2 className="w-10 h-10 text-secondary-container mx-auto mb-2" />
              <h4 className="text-lg font-bold text-white mb-1">You're Subscribed!</h4>
              <p className="text-xs text-on-primary/80">
                You will receive our next executive intelligence briefing this Friday.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <div className="relative flex-grow">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-primary/50" />
                <input
                  type="email"
                  required
                  placeholder="Enter your corporate email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-on-primary/50 text-sm focus:outline-none focus:bg-white/15 focus:border-secondary-container transition-all"
                />
              </div>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="px-3 py-3 rounded-lg bg-white/10 border border-white/20 text-white text-xs sm:text-sm focus:outline-none focus:bg-white/15 focus:border-secondary-container transition-all"
              >
                <option value="CFO / VP Finance" className="text-on-surface">CFO / VP Finance</option>
                <option value="Head of FP&A" className="text-on-surface">Head of FP&A</option>
                <option value="Finance Controller" className="text-on-surface">Finance Controller</option>
                <option value="Treasurer" className="text-on-surface">Treasurer</option>
                <option value="Other Finance Leader" className="text-on-surface">Other</option>
              </select>

              <button
                type="submit"
                disabled={status === "loading"}
                className="px-6 py-3 rounded-lg bg-secondary-container text-on-secondary font-semibold text-sm hover:bg-secondary transition-all flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50 hover:shadow-lg active:translate-y-0"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe Free</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {status === "error" && errorMessage && (
            <p className="mt-3 text-xs text-error-container font-medium">{errorMessage}</p>
          )}

          <p className="mt-4 text-[11px] text-on-primary/50">
            No spam, no vendor pitches. Unsubscribe at any time with 1 click.
          </p>
        </div>
      </div>
    </section>
  );
}
