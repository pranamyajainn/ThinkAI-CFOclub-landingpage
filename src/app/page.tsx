import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import ProblemSolution from "@/components/ProblemSolution";
import Playground from "@/components/Playground";
import Features from "@/components/Features";
import WhatWeCover from "@/components/WhatWeCover";
import WaitlistForm from "@/components/WaitlistForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-full min-h-screen pt-2">
        <Hero />
        <Ticker />
        <ProblemSolution />
        <Playground />
        <Features />
        <WhatWeCover />
        <WaitlistForm />
      </main>
      <Footer />
    </>
  );
}
