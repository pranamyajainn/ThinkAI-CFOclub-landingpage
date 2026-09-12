import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import ProblemSolution from "@/components/ProblemSolution";
import Playground from "@/components/Playground";
import Features from "@/components/Features";
import WhatWeCover from "@/components/WhatWeCover";
import EventsSection from "@/components/EventsSection";
import AboutUs from "@/components/AboutUs";
import WaitlistForm from "@/components/WaitlistForm";
import Footer from "@/components/Footer";

// The homepage is statically generated, so without this the "next event"
// shown in the Hero banner and Events section would be frozen at whatever
// was true at the last deploy. This makes Next.js re-check event dates
// against the current date at most once an hour, in the background, with
// no redeploy needed — see src/content/events.ts for the date logic.
export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-full min-h-screen">
        <Hero />
        <Ticker />
        <ProblemSolution />
        <Playground />
        <Features />
        <WhatWeCover />
        <EventsSection />
        <AboutUs />
        <WaitlistForm />
      </main>
      <Footer />
    </>
  );
}
