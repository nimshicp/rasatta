"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { Portfolio } from "@/components/Portfolio";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { WhyUs } from "@/components/WhyUs";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

import { Team } from "@/components/Team";

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, useGSAP);

    // Refresh ScrollTrigger after dynamic content loads to ensure correct measurements
    ScrollTrigger.refresh();
  }, []);

  return (
    <main className="flex min-h-screen flex-col w-full bg-black text-white relative">
      <Intro />

      {/* 
        The top sequence (Hero -> Portfolio) is tightly coupled.
        We wrap them in a master container to orchestrate their overlapping animation.
      */}
      <div id="hero-sequence" className="relative w-full">
        <Hero />
        <Portfolio />
      </div>

      <div className="relative z-20 bg-black">
        <About />
        <Services />
        <WhyUs />
        <Team />
        <Testimonials />
        <Footer />
      </div>

    </main>
  );
}
