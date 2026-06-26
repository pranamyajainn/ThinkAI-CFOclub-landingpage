"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Mail, User, Loader2, Sparkles, Check, ChevronRight, ChevronDown } from "lucide-react";
import confetti from "canvas-confetti";

interface ApplicantInfo {
  firstName: string;
  lastName: string;
  email: string;
  queueNo: number;
}

export default function WaitlistForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    companySize: "",
    aiChallenges: [] as string[],
    aiAspirations: [] as string[],
    agreed: false,
  });

  const handleCheckboxChange = (fieldName: "aiChallenges" | "aiAspirations", value: string, checked: boolean) => {
    setFormData((prev) => {
      const list = prev[fieldName];
      const updatedList = checked
        ? [...list, value]
        : list.filter((item) => item !== value);
      return { ...prev, [fieldName]: updatedList };
    });
  };

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [appliedInfo, setAppliedInfo] = useState<ApplicantInfo | null>(null);

  // Check if already applied on mount
  useEffect(() => {
    const saved = localStorage.getItem("selona_waitlist_applicant");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const timer = setTimeout(() => {
          setAppliedInfo(parsed);
        }, 0);
        return () => clearTimeout(timer);
      } catch (e) {
        console.error("Error reading waitlist storage", e);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const type = e.target.type;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrorMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Validation
    if (!formData.firstName.trim()) {
      setErrorMsg("Please enter your first name.");
      return;
    }
    if (!formData.lastName.trim()) {
      setErrorMsg("Please enter your last name.");
      return;
    }
    if (!formData.email.trim()) {
      setErrorMsg("Please enter your work email.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorMsg("Please enter a valid work email address.");
      return;
    }
    if (!formData.role) {
      setErrorMsg("Please select your current role.");
      return;
    }
    if (!formData.companySize) {
      setErrorMsg("Please select your company size.");
      return;
    }
    if (formData.aiChallenges.length === 0) {
      setErrorMsg("Please select at least one AI challenge.");
      return;
    }
    if (formData.aiAspirations.length === 0) {
      setErrorMsg("Please select at least one area where you would like AI to help.");
      return;
    }
    if (!formData.agreed) {
      setErrorMsg("You must agree to receive club updates to apply.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          role: formData.role,
          companySize: formData.companySize,
          aiChallenges: formData.aiChallenges,
          aiAspirations: formData.aiAspirations,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit. Please try again.");
      }

      // Success
      const info: ApplicantInfo = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        queueNo: data.queueNo || Math.floor(Math.random() * 200) + 300,
      };

      localStorage.setItem("selona_waitlist_applicant", JSON.stringify(info));
      setAppliedInfo(info);

      // Trigger Confetti
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 25, spread: 360, ticks: 50, zIndex: 100 };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 40 * (timeLeft / duration);
        // Orange & Navy confetti colors
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ["#fc853a", "#001356", "#b8c3ff"],
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ["#fc853a", "#001356", "#b8c3ff"],
        });
      }, 250);
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred. Please try again.";
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    localStorage.removeItem("selona_waitlist_applicant");
    setAppliedInfo(null);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      companySize: "",
      aiChallenges: [],
      aiAspirations: [],
      agreed: false,
    });
  };

  return (
    <section
      className="py-24 bg-gradient-to-b from-primary-container to-primary text-on-primary relative overflow-hidden"
      id="apply"
    >
      {/* Aurora glow effect inside waitlist */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-secondary-container/30 blur-[100px] animate-float"></div>
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-on-primary-container/20 blur-[100px] animate-float-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <AnimatePresence mode="wait">
          {!appliedInfo ? (
            <motion.div
              key="waitlist-form"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="max-w-xl mx-auto"
            >
              {/* Form Header */}
              <div className="text-center mb-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/40 border border-on-primary/10 text-xs font-semibold tracking-wider text-secondary-container mb-4">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  Executive Cohort Entry
                </span>
                <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-4">
                  Apply for Founding Membership
                </h2>
                <p className="font-sans text-sm md:text-base text-on-primary/80">
                  30 founding member seats. Founding rate. Closes when full.
                </p>
              </div>

              {/* Form Input fields */}
              <form onSubmit={handleSubmit} className="space-y-5 bg-primary/20 backdrop-blur-md p-8 rounded-2xl border border-on-primary/10 shadow-2xl">
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-500/15 border border-red-500/30 rounded-lg text-red-200 text-xs font-semibold text-center"
                  >
                    {errorMsg}
                  </motion.div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-on-primary/80 mb-1.5">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-primary/40" />
                      <input
                        type="text"
                        name="firstName"
                        placeholder="Jane"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full pl-9 pr-4 py-3 rounded-lg bg-surface-pure text-on-surface border border-surface-dim focus:ring-2 focus:ring-secondary-container outline-none transition-all text-sm font-semibold"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-on-primary/80 mb-1.5">
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-primary/40" />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full pl-9 pr-4 py-3 rounded-lg bg-surface-pure text-on-surface border border-surface-dim focus:ring-2 focus:ring-secondary-container outline-none transition-all text-sm font-semibold"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-primary/80 mb-1.5">
                    Work Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-primary/40" />
                    <input
                      type="email"
                      name="email"
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-9 pr-4 py-3 rounded-lg bg-surface-pure text-on-surface border border-surface-dim focus:ring-2 focus:ring-secondary-container outline-none transition-all text-sm font-semibold"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Role and Company Size dropdowns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-on-primary/80 mb-1.5">
                      Your Current Role
                    </label>
                    <div className="relative">
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-4 pr-10 py-3 rounded-lg bg-surface-pure text-on-surface border border-surface-dim focus:ring-2 focus:ring-secondary-container outline-none transition-all text-sm font-semibold appearance-none cursor-pointer"
                        disabled={isLoading}
                      >
                        <option value="" disabled>Select your role...</option>
                        <option value="CFO">CFO</option>
                        <option value="Finance Director">Finance Director</option>
                        <option value="Financial Controller">Financial Controller</option>
                        <option value="Head of Finance">Head of Finance</option>
                        <option value="Fractional CFO">Fractional CFO</option>
                        <option value="VP Finance">VP Finance</option>
                        <option value="Other">Other</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface/40 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-on-primary/80 mb-1.5">
                      Company Size
                    </label>
                    <div className="relative">
                      <select
                        name="companySize"
                        value={formData.companySize}
                        onChange={handleChange}
                        className="w-full px-4 pr-10 py-3 rounded-lg bg-surface-pure text-on-surface border border-surface-dim focus:ring-2 focus:ring-secondary-container outline-none transition-all text-sm font-semibold appearance-none cursor-pointer"
                        disabled={isLoading}
                      >
                        <option value="" disabled>Select company size...</option>
                        <option value="1–10 employees">1–10 employees</option>
                        <option value="11–50 employees">11–50 employees</option>
                        <option value="51–200 employees">51–200 employees</option>
                        <option value="201–1,000 employees">201–1,000 employees</option>
                        <option value="1,000+ employees">1,000+ employees</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface/40 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* AI Challenges checkboxes */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-on-primary/80">
                    Biggest AI challenge right now
                  </label>
                  <div className="grid grid-cols-1 gap-2 bg-primary/30 p-4 rounded-xl border border-on-primary/5">
                    {[
                      "Lack of knowledge or skills",
                      "No time to explore",
                      "Data security concerns",
                      "Unclear return on investment",
                      "Too many tools, don't know where to start"
                    ].map((item, idx) => (
                      <label key={idx} className="flex items-start gap-3 cursor-pointer select-none text-xs font-semibold text-on-primary/80">
                        <input
                          type="checkbox"
                          checked={formData.aiChallenges.includes(item)}
                          onChange={(e) => handleCheckboxChange("aiChallenges", item, e.target.checked)}
                          className="mt-0.5 w-4 h-4 rounded border-surface-dim bg-surface-pure accent-[#E8762B] cursor-pointer shrink-0"
                          disabled={isLoading}
                        />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* AI Aspirations checkboxes */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-on-primary/80">
                    Where would you most like AI to help?
                  </label>
                  <div className="grid grid-cols-1 gap-2 bg-primary/30 p-4 rounded-xl border border-on-primary/5">
                    {[
                      "Reducing manual data work",
                      "Automating reporting",
                      "Forecasting and scenario planning",
                      "Cost optimisation",
                      "Strategic decision making"
                    ].map((item, idx) => (
                      <label key={idx} className="flex items-start gap-3 cursor-pointer select-none text-xs font-semibold text-on-primary/80">
                        <input
                          type="checkbox"
                          checked={formData.aiAspirations.includes(item)}
                          onChange={(e) => handleCheckboxChange("aiAspirations", item, e.target.checked)}
                          className="mt-0.5 w-4 h-4 rounded border-surface-dim bg-surface-pure accent-[#E8762B] cursor-pointer shrink-0"
                          disabled={isLoading}
                        />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="agreed"
                    name="agreed"
                    checked={formData.agreed}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 rounded border-surface-dim bg-surface-pure accent-[#E8762B] cursor-pointer shrink-0"
                    disabled={isLoading}
                  />
                  <label
                    htmlFor="agreed"
                    className="text-xs text-on-primary/70 leading-relaxed cursor-pointer font-medium select-none"
                  >
                    I agree to receive monthly AI briefings, workshop updates, and membership notifications.
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-secondary-container hover:bg-secondary text-on-secondary rounded-xl font-bold text-base transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Validating Application...
                    </>
                  ) : (
                    <>
                      Apply for Membership
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-on-primary/60 mt-1 font-medium">
                  No spam. Your data stays private. We review all applications within 48 hours.
                </p>

                {/* Privacy Guarantee */}
                <div className="flex items-center justify-center gap-2 mt-4 text-on-primary/50 text-[10px] font-semibold">
                  <ShieldCheck className="w-4 h-4 text-secondary-container" />
                  <span>Your professional data is encrypted and remains strictly private.</span>
                </div>
              </form>
            </motion.div>
          ) : (
            /* Return applicant status dashboard - TOP 1% UX Detail */
            <motion.div
              key="waitlist-success"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto bg-surface text-on-surface rounded-2xl border border-surface-dim p-8 shadow-2xl relative"
            >
              {/* Reset Debug Button */}
              <button
                onClick={handleReset}
                className="absolute top-4 right-4 text-xs text-text-muted hover:text-primary underline font-medium"
              >
                Clear Submission (Demo Reset)
              </button>

              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 flex items-center justify-center mb-4 shadow-inner">
                  <Check className="w-7 h-7 stroke-[3]" />
                </div>
                <h3 className="font-display text-2xl font-bold text-primary mb-1">
                  Application Received
                </h3>
                <p className="text-xs text-text-muted font-semibold">
                  Thank you, {appliedInfo.firstName}. Your founding membership request is being evaluated.
                </p>
              </div>

              {/* Status Tracking Roster Card */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {/* Stats 1 */}
                <div className="p-4 bg-surface-container-low rounded-xl border border-surface-dim text-center">
                  <span className="text-[10px] text-text-muted font-bold block uppercase tracking-wider mb-1">
                    Queue Position
                  </span>
                  <span className="text-2xl font-display font-extrabold text-primary">
                    #{appliedInfo.queueNo}
                  </span>
                </div>
                {/* Stats 2 */}
                <div className="p-4 bg-surface-container-low rounded-xl border border-surface-dim text-center">
                  <span className="text-[10px] text-text-muted font-bold block uppercase tracking-wider mb-1">
                    Estimated Review
                  </span>
                  <span className="text-sm font-bold text-primary block mt-1.5">
                    24 - 48 Hours
                  </span>
                </div>
                {/* Stats 3 */}
                <div className="p-4 bg-surface-container-low rounded-xl border border-surface-dim text-center">
                  <span className="text-[10px] text-text-muted font-bold block uppercase tracking-wider mb-1">
                    Registered Email
                  </span>
                  <span className="text-xs font-semibold text-primary block truncate mt-2">
                    {appliedInfo.email}
                  </span>
                </div>
              </div>

              {/* Steps timeline indicator */}
              <div className="border-t border-surface-dim pt-6">
                <h4 className="text-xs font-bold text-primary mb-4 text-left">Application Pipeline</h4>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  {/* Step 1 */}
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center text-[10px] font-bold">1</span>
                    <span className="text-xs font-bold text-primary">Form Submitted</span>
                  </div>
                  <div className="hidden sm:block flex-1 h-0.5 bg-primary"></div>

                  {/* Step 2 */}
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-secondary-container text-on-secondary flex items-center justify-center text-[10px] font-bold animate-pulse">2</span>
                    <span className="text-xs font-bold text-secondary-container">Under Executive Audit</span>
                  </div>
                  <div className="hidden sm:block flex-1 h-0.5 bg-surface-dim"></div>

                  {/* Step 3 */}
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-surface-dim text-text-muted flex items-center justify-center text-[10px] font-bold">3</span>
                    <span className="text-xs font-bold text-text-muted">Direct Interview</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
