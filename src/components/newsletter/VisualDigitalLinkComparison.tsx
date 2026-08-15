import React from "react";
import { XCircle, CheckCircle2, ArrowRight, ShieldAlert, ShieldCheck } from "lucide-react";

export default function VisualDigitalLinkComparison() {
  const manualSteps = [
    { title: "PDF Invoices via Email", desc: "Arrives in inbox as unstructured attachment" },
    { title: "Manual Keyboard Entry", desc: "Clerk re-types line totals into accounting software (❌ Digital Link Broken)" },
    { title: "Excel Side Spreadsheet", desc: "VAT numbers summarized on personal sheet (❌ Broken Link)" },
    { title: "Copy/Paste to VAT Return", desc: "Manual paste into HMRC portal box (❌ £400 Penalty Exposure)" },
  ];

  const automatedSteps = [
    { title: "Intake Machine-Read OCR", desc: "Instant automated extraction with 99.8% precision" },
    { title: "3-Way Match & PO Link", desc: "Deterministic matching against PO & Goods Received notes" },
    { title: "Continuous Ledger Sync", desc: "Zero manual data re-typing, unbroken cryptographic link" },
    { title: "1-Click Direct HMRC API", desc: "Automated submission with immutable audit trail (✅ 100% Compliant)" },
  ];

  return (
    <div className="my-12 rounded-2xl bg-surface-pure border border-surface-dim/80 p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
          Architecture Breakdown
        </span>
        <h3 className="text-xl sm:text-2xl font-bold font-display text-on-surface mt-2">
          Manual Process vs. Unbroken Digital Link
        </h3>
        <p className="text-xs sm:text-sm text-text-muted mt-1">
          Why human retyping triggers HMRC compliance penalties and how Neoflo eliminates the gap.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Left: Broken Digital Link */}
        <div className="rounded-xl bg-error-container/10 border border-error/30 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-error font-bold font-display text-sm uppercase tracking-wider mb-4 pb-3 border-b border-error/20">
              <ShieldAlert className="w-4 h-4" />
              <span>Legacy Manual Flow (Broken Link)</span>
            </div>
            <div className="space-y-4">
              {manualSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-error flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-on-surface">{step.title}</div>
                    <div className="text-[11px] text-text-muted leading-relaxed">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 pt-3 border-t border-error/20 text-xs font-semibold text-error text-center">
            ⚠️ Exposure: Up to £400 fine / return + late penalties
          </div>
        </div>

        {/* Right: Unbroken Digital Link */}
        <div className="rounded-xl bg-secondary-container/10 border border-secondary-container/30 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-secondary font-bold font-display text-sm uppercase tracking-wider mb-4 pb-3 border-b border-secondary-container/20">
              <ShieldCheck className="w-4 h-4" />
              <span>Neoflo Automated Flow (Compliant Link)</span>
            </div>
            <div className="space-y-4">
              {automatedSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-on-surface">{step.title}</div>
                    <div className="text-[11px] text-text-muted leading-relaxed">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 pt-3 border-t border-secondary-container/20 text-xs font-semibold text-secondary text-center">
            ✅ Result: Permanent continuous compliance without adding headcount
          </div>
        </div>
      </div>
    </div>
  );
}
