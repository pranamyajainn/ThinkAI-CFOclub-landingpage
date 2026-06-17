"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Calculator,
  Brain,
  Sliders,
  CheckCircle2,
  Clock,
  TrendingUp,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type WorkflowType = "variance" | "forecasting" | "reconciliation";

interface PromptData {
  title: string;
  description: string;
  prompt: string;
  steps: string[];
  response: {
    status: string;
    details: string;
    metrics: string;
    savings: string;
  };
}

const Prompts: Record<WorkflowType, PromptData> = {
  variance: {
    title: "Variance Analysis",
    description: "Explain anomalies and SG&A budget variances.",
    prompt: `Analyze Q2 SG&A actuals vs forecast. Detail the $145,000 variance in digital advertising and evaluate its business impact.`,
    steps: [
      "Parsing ERP actual ledger logs...",
      "Consolidating sub-ledger marketing budgets...",
      "Correlating spend spikes with pipeline generation...",
    ],
    response: {
      status: "COMPLETED",
      details:
        "The $145K variance in digital advertising was driven by an unbudgeted customer acquisition campaign in May. However, CRM correlation shows this campaign generated 1,420 pipeline leads and $493,000 in booked annual recurring revenue (ARR) in Q2 alone.",
      metrics: "Campaign ROI: 3.4x | CAC: Decreased by 12%",
      savings: "Saved: 6.5 hours of manual data consolidation",
    },
  },
  forecasting: {
    title: "Scenario Forecasting",
    description: "Run supply chain disruption simulations.",
    prompt: `Simulate revenue impact if raw material imports face a 15% tariff in Q4. Model mitigation strategies using domestic vendor pricing.`,
    steps: [
      "Loading supply chain unit cost matrices...",
      "Executing Monte Carlo margin simulation (10,000 iterations)...",
      "Optimizing margin mitigation via alternative domestic logistics paths...",
    ],
    response: {
      status: "SIMULATED",
      details:
        "Without intervention, the tariff increases COGS by 3.2% and risks gross margins. However, our model demonstrates a 78% probability of preserving margins above 60% if production shifts 35% of parts to domestic vendors by Sept 1. Downside exposure is capped at $45,000.",
      metrics: "Mitigated Gross Margin: 61.2% | Downside Cap: $45K",
      savings: "Saved: 14 hours of spreadsheet macro adjustments",
    },
  },
  reconciliation: {
    title: "ERP/Stripe Reconciliation",
    description: "Audit ledger matching and identify anomalies.",
    prompt: `Match 15,000 Stripe transactions against internal NetSuite GL. Flag discrepancy matches above $5,000 threshold.`,
    steps: [
      "Ingesting Stripe transaction CSV logs...",
      "Pulling NetSuite ledger invoices...",
      "Matching transaction hashes and flagging discrepancies...",
    ],
    response: {
      status: "AUDITED",
      details:
        "Processed 14,281 entries. Flagged 2 high-priority variances: (1) Stripe Transaction tx_938102 ($6,420) has duplicate billing ID in NetSuite. (2) Invoice inv_0112 ($5,890) has a 4-day posting date mismatch between gateways.",
      metrics: "Match Rate: 99.986% | Discrepancies: 2",
      savings: "Saved: 22 hours of manual ledger auditing",
    },
  },
};

export default function Playground() {
  const [activeTab, setActiveTab] = useState<"playground" | "calculator">("playground");
  const [activeWorkflow, setActiveWorkflow] = useState<WorkflowType>("variance");
  const [isRunning, setIsRunning] = useState(false);
  const [stepIndex, setStepIndex] = useState(-1);
  const [showResponse, setShowResponse] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Calculator states
  const [teamSize, setTeamSize] = useState(8);
  const [manualHours, setManualHours] = useState(40);

  // Recharts hydration safety
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Trigger simulated workflow execution
  const runWorkflow = () => {
    setIsRunning(true);
    setStepIndex(0);
    setShowResponse(false);
  };

  useEffect(() => {
    if (!isRunning) return;

    const steps = Prompts[activeWorkflow].steps;
    if (stepIndex < steps.length) {
      const timer = setTimeout(() => {
        setStepIndex((prev) => prev + 1);
      }, 1200);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsRunning(false);
        setShowResponse(true);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isRunning, stepIndex, activeWorkflow]);

  // Calculator calculations
  const hoursSaved = Math.round(teamSize * manualHours * 0.45); // 45% efficiency gains
  const annualDollarsSaved = hoursSaved * 12 * 75; // average senior accountant rate $75/hr

  // Data for Recharts comparison
  const chartData = [
    { name: "Month 1", Manual: teamSize * manualHours, AIEnhanced: Math.round(teamSize * manualHours * 0.7) },
    { name: "Month 2", Manual: teamSize * manualHours, AIEnhanced: Math.round(teamSize * manualHours * 0.6) },
    { name: "Month 3", Manual: teamSize * manualHours, AIEnhanced: Math.round(teamSize * manualHours * 0.55) },
    { name: "Month 4", Manual: teamSize * manualHours, AIEnhanced: Math.round(teamSize * manualHours * 0.55) },
    { name: "Month 5", Manual: teamSize * manualHours, AIEnhanced: Math.round(teamSize * manualHours * 0.55) },
    { name: "Month 6", Manual: teamSize * manualHours, AIEnhanced: Math.round(teamSize * manualHours * 0.55) },
  ];

  return (
    <section className="py-24 bg-surface-subtle border-y border-surface-dim/40 relative overflow-hidden" id="playground">
      {/* Visual Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-surface-dim to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-sans text-xs font-bold text-secondary-container uppercase tracking-wider mb-3 block">
            Exclusive Preview
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-primary mb-4">
            Financial Intelligence in Action
          </h2>
          <p className="font-sans text-lg text-on-surface-variant leading-relaxed">
            {"Don't take our word for it. Test our workflow templates or calculate how much time your team could recapture using custom-engineered AI."}
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-12">
          <div className="bg-surface-container/60 p-1.5 rounded-xl border border-surface-dim/70 flex gap-2">
            <button
              onClick={() => setActiveTab("playground")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === "playground"
                  ? "bg-surface-pure text-primary shadow-sm"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              <Brain className="w-4 h-4" />
              AI Prompt Playground
            </button>
            <button
              onClick={() => setActiveTab("calculator")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === "calculator"
                  ? "bg-surface-pure text-primary shadow-sm"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              <Calculator className="w-4 h-4" />
              ROI Impact Calculator
            </button>
          </div>
        </div>

        {/* Dynamic Tab Content Panel */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            {activeTab === "playground" ? (
              <motion.div
                key="playground"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid lg:grid-cols-12 gap-8 items-stretch"
              >
                {/* Workflow Selectors */}
                <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
                  {(Object.keys(Prompts) as WorkflowType[]).map((key) => {
                    const workflow = Prompts[key];
                    const isActive = activeWorkflow === key;
                    return (
                      <button
                        key={key}
                        onClick={() => {
                          setActiveWorkflow(key);
                          setIsRunning(false);
                          setStepIndex(-1);
                          setShowResponse(false);
                        }}
                        className={`text-left p-5 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 ${
                          isActive
                            ? "bg-surface-pure border-secondary-container shadow-[0_8px_30px_rgba(0,19,86,0.03)]"
                            : "bg-surface-pure/40 border-surface-dim hover:bg-surface-pure hover:border-surface-dim/80"
                        }`}
                      >
                        <h3 className={`font-display font-bold text-base mb-1 ${isActive ? "text-primary" : "text-on-surface"}`}>
                          {workflow.title}
                        </h3>
                        <p className="text-xs text-text-muted font-sans leading-normal">
                          {workflow.description}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Simulated Playground Editor */}
                <div className="lg:col-span-8 flex flex-col rounded-2xl bg-primary-container text-on-primary border border-primary/20 shadow-xl overflow-hidden relative">
                  {/* Console Header */}
                  <div className="px-5 py-4 bg-primary/40 flex items-center justify-between border-b border-primary/10">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                      <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                      <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                      <span className="text-xs text-on-primary/60 font-mono ml-2">financial_model.py</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-primary/60 text-on-primary/70 uppercase tracking-widest font-mono">
                      Stitch Engine v1.2
                    </span>
                  </div>

                  {/* Code Editor Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between font-mono text-sm leading-relaxed">
                    {/* Prompt Display */}
                    <div className="mb-6">
                      <span className="text-secondary-container font-semibold">&gt;&gt;&gt; USER_PROMPT:</span>
                      <p className="text-white bg-primary/25 p-3 rounded-lg border border-primary/10 mt-2 text-xs leading-relaxed">
                        {Prompts[activeWorkflow].prompt}
                      </p>
                    </div>

                    {/* Simulation Steps */}
                    <div className="flex-1 flex flex-col gap-2.5 py-4 border-t border-primary/10 my-2">
                      {stepIndex >= 0 && (
                        <div className="flex flex-col gap-2">
                          {Prompts[activeWorkflow].steps.slice(0, stepIndex + 1).map((step, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-on-primary/70">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span>{step}</span>
                            </div>
                          ))}
                          {isRunning && stepIndex < Prompts[activeWorkflow].steps.length && (
                            <div className="flex items-center gap-2 text-xs text-secondary-container">
                              <div className="w-2.5 h-2.5 border-2 border-secondary-container border-t-transparent rounded-full animate-spin"></div>
                              <span>Running models...</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* AI Output Result Card */}
                    <AnimatePresence>
                      {showResponse && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="bg-surface-pure text-on-surface p-5 rounded-xl border border-surface-dim shadow-lg"
                        >
                          <div className="flex items-center justify-between pb-3 border-b border-surface-subtle mb-3">
                            <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                              <Brain className="w-3.5 h-3.5 text-secondary-container" />
                              AI SYSTEM SUMMARY
                            </span>
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                              {Prompts[activeWorkflow].response.status}
                            </span>
                          </div>
                          <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                            {Prompts[activeWorkflow].response.details}
                          </p>
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-3 border-t border-surface-subtle gap-2">
                            <span className="text-[11px] font-bold text-primary">
                              {Prompts[activeWorkflow].response.metrics}
                            </span>
                            <span className="text-[10px] font-semibold text-secondary-container bg-secondary-container/5 px-2 py-1 rounded border border-secondary-container/10">
                              {Prompts[activeWorkflow].response.savings}
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Editor Footer / Run Trigger */}
                  <div className="px-6 py-4 bg-primary/30 flex items-center justify-between border-t border-primary/10">
                    <span className="text-[11px] text-on-primary/50 font-mono">Press Run to execute script</span>
                    <button
                      onClick={runWorkflow}
                      disabled={isRunning}
                      className="px-5 py-2.5 rounded-lg bg-secondary-container hover:bg-secondary text-on-secondary font-bold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      Run AI Tool
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="calculator"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid lg:grid-cols-12 gap-8 items-stretch"
              >
                {/* Sliders Container */}
                <div className="lg:col-span-5 bg-surface-pure rounded-2xl border border-surface-dim p-8 flex flex-col justify-between shadow-[0_10px_35px_rgba(0,19,86,0.02)]">
                  <div>
                    <h3 className="font-display font-bold text-lg text-primary mb-6 flex items-center gap-2">
                      <Sliders className="w-5 h-5 text-secondary-container" />
                      Configure Parameters
                    </h3>

                    {/* Team Size Slider */}
                    <div className="mb-8">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-semibold text-on-surface-variant">
                          Finance Team Size
                        </label>
                        <span className="text-sm font-bold text-primary">{teamSize} members</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="50"
                        value={teamSize}
                        onChange={(e) => setTeamSize(Number(e.target.value))}
                        className="w-full h-1.5 bg-surface-container rounded-lg appearance-none cursor-pointer accent-secondary-container"
                      />
                      <div className="flex justify-between text-[10px] text-text-muted mt-1 font-semibold">
                        <span>1</span>
                        <span>25</span>
                        <span>50</span>
                      </div>
                    </div>

                    {/* Manual Hours Slider */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-semibold text-on-surface-variant">
                          Manual Reporting Hours / Member / Mo
                        </label>
                        <span className="text-sm font-bold text-primary">{manualHours} hrs</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="80"
                        value={manualHours}
                        onChange={(e) => setManualHours(Number(e.target.value))}
                        className="w-full h-1.5 bg-surface-container rounded-lg appearance-none cursor-pointer accent-secondary-container"
                      />
                      <div className="flex justify-between text-[10px] text-text-muted mt-1 font-semibold">
                        <span>10 hrs</span>
                        <span>45 hrs</span>
                        <span>80 hrs</span>
                      </div>
                    </div>
                  </div>

                  {/* Summary Metric Counters */}
                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-surface-dim">
                    <div className="bg-surface-container-low p-4 rounded-xl border border-surface-dim/60">
                      <div className="flex items-center gap-1.5 text-text-muted text-[11px] font-semibold mb-1">
                        <Clock className="w-3.5 h-3.5 text-secondary-container" />
                        Time Recaptured
                      </div>
                      <div className="text-xl font-bold text-primary font-display">
                        {hoursSaved} hrs/mo
                      </div>
                    </div>

                    <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                      <div className="flex items-center gap-1.5 text-primary/75 text-[11px] font-semibold mb-1">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                        Annual Net Value
                      </div>
                      <div className="text-xl font-bold text-primary font-display text-gradient-primary">
                        ${annualDollarsSaved.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Graph Visualization Container */}
                <div className="lg:col-span-7 bg-surface-pure rounded-2xl border border-surface-dim p-6 flex flex-col justify-between shadow-[0_10px_35px_rgba(0,19,86,0.02)] min-h-[350px]">
                  <div className="flex items-center justify-between pb-4 border-b border-surface-dim mb-4">
                    <div>
                      <h4 className="text-sm font-bold text-primary">Hours Spent Consolidation</h4>
                      <p className="text-[11px] text-text-muted">Projections comparing manual tracking vs AI integration</p>
                    </div>
                    <div className="flex gap-4 text-[10px] font-bold">
                      <span className="flex items-center gap-1.5 text-text-muted">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span> Manual
                      </span>
                      <span className="flex items-center gap-1.5 text-secondary-container">
                        <span className="w-2.5 h-2.5 rounded-full bg-secondary-container"></span> AI-Optimized
                      </span>
                    </div>
                  </div>

                  {/* Chart Rendering */}
                  <div className="flex-1 w-full h-[280px]">
                    {mounted ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={chartData}
                          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="colorManual" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.15} />
                              <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.0} />
                            </linearGradient>
                            <linearGradient id="colorAI" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#fc853a" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="#fc853a" stopOpacity={0.0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                          <XAxis
                            dataKey="name"
                            stroke="#94a3b8"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis
                            stroke="#94a3b8"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#ffffff",
                              borderRadius: "8px",
                              border: "1px solid #e2e8f0",
                              fontSize: "11px",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="Manual"
                            stroke="#94a3b8"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorManual)"
                          />
                          <Area
                            type="monotone"
                            dataKey="AIEnhanced"
                            stroke="#fc853a"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorAI)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-text-muted">
                        Loading charts...
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-surface-dim text-center">
                    <p className="text-[11px] text-text-muted leading-relaxed">
                      *Estimates based on average CFO Intelligence workflows including invoice ingestion, automated GL mapping, and anomaly detection protocols.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
